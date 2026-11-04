(function (root, factory) {
  var api = factory()
  if (typeof module === 'object' && module.exports) module.exports = api
  root.PlannerCore = api
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  var WORK_DAYS = ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì']
  var DAYS = WORK_DAYS.concat(['Sabato', 'Domenica'])
  var DAY_MINUTES = 8 * 60
  var WEEK_MINUTES = DAY_MINUTES * WORK_DAYS.length

  function number(value, fallback) {
    var parsed = Number(value)
    return Number.isFinite(parsed) ? parsed : fallback
  }

  function occurrences(frequency) {
    return frequency === 'giornaliera' ? 5 : 1
  }

  function demandMinutes(task) {
    return Math.max(0, number(task.duration, 0)) * occurrences(task.frequency)
  }

  function urgencyMultiplier(task, now) {
    var urgency = task.urgency || 'normale'
    var multiplier = urgency === 'alta' ? 1.5 : urgency === 'media' ? 1.2 : 1
    if (!task.deadline) return multiplier
    var due = new Date(task.deadline + 'T23:59:59')
    var today = now || new Date()
    var days = (due.getTime() - today.getTime()) / 86400000
    if (days < 0) return Math.max(multiplier, 1.8)
    if (days <= 2) return Math.max(multiplier, 1.5)
    return multiplier
  }

  function allocateWeighted(tasks, capacity, now) {
    var allocations = {}
    var remaining = tasks
      .filter(function (task) {
        return demandMinutes(task) > 0
      })
      .map(function (task) {
        return {
          task: task,
          cap: demandMinutes(task),
          weight: Math.max(1, number(task.priority, 1)) * urgencyMultiplier(task, now),
        }
      })
    var left = Math.max(0, capacity)

    while (left > 0.01 && remaining.length) {
      var totalWeight = remaining.reduce(function (sum, item) {
        return sum + item.weight
      }, 0)
      var capped = []
      remaining.forEach(function (item) {
        var share = left * (item.weight / totalWeight)
        var already = allocations[item.task.id] || 0
        var available = item.cap - already
        if (share >= available) {
          allocations[item.task.id] = already + available
          left -= available
          capped.push(item.task.id)
        }
      })
      if (!capped.length) {
        remaining.forEach(function (item) {
          allocations[item.task.id] =
            (allocations[item.task.id] || 0) + left * (item.weight / totalWeight)
        })
        left = 0
      } else {
        remaining = remaining.filter(function (item) {
          return capped.indexOf(item.task.id) === -1
        })
      }
    }
    return allocations
  }

  function compute(tasks, bufferPerDay, now) {
    var buffer = Math.max(0, number(bufferPerDay, 0)) * WORK_DAYS.length
    var usable = Math.max(0, WEEK_MINUTES - buffer)
    var active = tasks.filter(function (task) {
      return !task.deleted
    })
    var fixed = active.filter(function (task) {
      return task.fixed
    })
    var flexible = active.filter(function (task) {
      return !task.fixed
    })
    var fixedDemand = fixed.reduce(function (sum, task) {
      return sum + demandMinutes(task)
    }, 0)
    var flexibleDemand = flexible.reduce(function (sum, task) {
      return sum + demandMinutes(task)
    }, 0)
    var allocations = {}
    var fixedLeft = usable
    fixed
      .slice()
      .sort(function (a, b) {
        return urgencyMultiplier(b, now) - urgencyMultiplier(a, now)
      })
      .forEach(function (task) {
        var demand = demandMinutes(task)
        allocations[task.id] = demand <= fixedLeft ? demand : 0
        if (demand <= fixedLeft) fixedLeft -= demand
      })
    var fixedAllocated = fixed.reduce(function (sum, task) {
      return sum + (allocations[task.id] || 0)
    }, 0)
    var residual = Math.max(0, usable - fixedAllocated)
    var flexAllocations =
      flexibleDemand <= residual
        ? flexible.reduce(function (result, task) {
            result[task.id] = demandMinutes(task)
            return result
          }, {})
        : allocateWeighted(flexible, residual, now)
    Object.keys(flexAllocations).forEach(function (id) {
      allocations[id] = flexAllocations[id]
    })

    var priorityTotal = flexible.reduce(function (sum, task) {
      return sum + Math.max(1, number(task.priority, 1))
    }, 0)
    var shares = {}
    flexible.forEach(function (task) {
      shares[task.id] = priorityTotal
        ? (Math.max(1, number(task.priority, 1)) / priorityTotal) * 100
        : 0
    })

    var demand = fixedDemand + flexibleDemand
    var planned = Object.keys(allocations).reduce(function (sum, id) {
      return sum + allocations[id]
    }, 0)
    return {
      dayMinutes: DAY_MINUTES,
      weekMinutes: WEEK_MINUTES,
      bufferMinutes: buffer,
      usableMinutes: usable,
      fixedDemand: fixedDemand,
      fixedAllocated: fixedAllocated,
      flexibleDemand: flexibleDemand,
      demandMinutes: demand,
      plannedMinutes: planned,
      freeMinutes: Math.max(0, usable - planned),
      overloadMinutes: Math.max(0, demand - usable),
      allocations: allocations,
      shares: shares,
      unknownDuration: active.filter(function (task) {
        return demandMinutes(task) === 0
      }),
    }
  }

  function timeLabel(minutes) {
    var value = Math.max(0, Math.round(number(minutes, 0)))
    var hours = Math.floor(value / 60)
    var mins = value % 60
    return hours + 'h ' + String(mins).padStart(2, '0') + 'm'
  }

  function endTimeSkippingLunch(start, duration) {
    if (!start) return ''
    var parts = start.split(':').map(Number)
    var current = parts[0] * 60 + parts[1]
    var remaining = Math.max(0, number(duration, 0))
    if (current >= 13 * 60 && current < 14 * 60) return null
    while (remaining > 0) {
      if (current === 13 * 60) current = 14 * 60
      current += 1
      remaining -= 1
    }
    if (current > 18 * 60) return null
    var hours = Math.floor(current / 60)
    var mins = current % 60
    return String(hours).padStart(2, '0') + ':' + String(mins).padStart(2, '0')
  }

  return {
    DAYS: DAYS,
    WORK_DAYS: WORK_DAYS,
    DAY_MINUTES: DAY_MINUTES,
    WEEK_MINUTES: WEEK_MINUTES,
    occurrences: occurrences,
    demandMinutes: demandMinutes,
    urgencyMultiplier: urgencyMultiplier,
    compute: compute,
    timeLabel: timeLabel,
    endTimeSkippingLunch: endTimeSkippingLunch,
  }
})
