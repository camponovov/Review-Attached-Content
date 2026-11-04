(function () {
  'use strict'

  if (!window.PlannerCore) return
  var Core = window.PlannerCore
  var TASK_KEY = 'nidoHrPlannerTasksV1'
  var BUFFER_KEY = 'nidoHrPlannerBufferV1'
  var BIRTHDAY_KEY = 'nidoHrBirthdaysV1'
  var BIRTHDAY_TEMPLATE_KEY = 'nidoHrBirthdayTemplateV1'
  var WEEK_KEY = 'nidoHrPlannerWeekV1'
  var plannerView = 'week'

  function byId(id) {
    return document.getElementById(id)
  }

  function read(key, fallback) {
    try {
      var value = localStorage.getItem(key)
      return value === null ? fallback : JSON.parse(value)
    } catch (error) {
      return fallback
    }
  }

  function write(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value))
      return true
    } catch (error) {
      return false
    }
  }

  function uid(prefix) {
    return prefix + '-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 7)
  }

  function node(tag, className, text) {
    var element = document.createElement(tag)
    if (className) element.className = className
    if (text !== undefined) element.textContent = text
    return element
  }

  function button(text, action, className, title) {
    var element = node('button', className || '', text)
    element.type = 'button'
    if (title) element.title = title
    element.addEventListener('click', action)
    return element
  }

  function procedureFor(item) {
    if (item.procedure) return item.procedure
    if (item.category === 'Colloqui') return 'p3'
    if (item.category === 'Onboarding') return 'p6'
    if (item.category === 'Academy e Forte') return 'p9'
    if (item.category === 'The Job Game') return 'pj1'
    if (item.category === 'Recruiting') return 'p2'
    return ''
  }

  function checklistFor(item) {
    if (item.checklist) return item.checklist
    if (/Screening CV/.test(item.name)) {
      return [
        { text: 'Valuta il CV rispetto al ruolo', done: false },
        { text: 'Crea o aggiorna l’anagrafica', done: false },
      ]
    }
    if (/contatto candidati/.test(item.name)) {
      return [
        { text: 'Contatta il candidato', done: false },
        { text: 'Registra esito e prossimo passo', done: false },
      ]
    }
    if (/Checklist e recap/.test(item.name)) {
      return [
        { text: 'Completa la checklist giornaliera', done: false },
        { text: 'Invia il recap delle attività', done: false },
      ]
    }
    return []
  }

  function defaultTasks(week) {
    var currentWeek = Number(week) || 1
    var tutorMode = currentWeek < 3
      ? 'con tutor in affiancamento'
      : 'conduzione assistita; tutor disponibile'
    var source = [
      { name: 'Screening CV e creazione anagrafiche', category: 'Recruiting', frequency: 'giornaliera', priority: 100, duration: 60, start: currentWeek === 1 ? '11:00' : '09:00', fixed: true },
      { name: 'Gestione e contatto candidati per fissare il primo livello', category: 'Recruiting', frequency: 'giornaliera', priority: 100, duration: 60, start: '14:00', fixed: true },
      { name: 'Organizzazione e conduzione colloqui · ' + tutorMode, category: 'Colloqui', frequency: 'giornaliera', priority: 95, duration: 60, start: '16:00', fixed: true },
      { name: 'Follow-up e memo ai candidati non raggiunti', category: 'Recruiting', frequency: 'giornaliera', priority: 85, duration: 50, start: '17:00', fixed: true, delegable: true },
      { name: 'Checklist e recap giornaliero', category: 'Pianificazione', frequency: 'giornaliera', priority: 90, duration: 10, start: '17:50', fixed: true },
      { name: 'Sales Strategy e formazione ricorrente', category: 'Formazione', frequency: 'giornaliera', priority: 70, duration: 60, start: '12:00', fixed: true },
    ]
    if (currentWeek === 1) {
      source = source.concat([
        { name: 'Onboarding e conoscenza del percorso HR', category: 'Onboarding', day: 'Lunedì', priority: 100, duration: 120, start: '09:00', fixed: true },
        { name: 'Studio procedure HR, onboarding commerciale e New Workers', category: 'Formazione', day: 'Martedì', priority: 95, duration: 120, start: '09:00', fixed: true },
        { name: 'Studio Nido Guida: organigramma, responsabilità e mentalità', category: 'Formazione', day: 'Mercoledì', priority: 90, duration: 120, start: '09:00', fixed: true },
        { name: 'Formazione Recruiting Strategico', category: 'Formazione', day: 'Giovedì', priority: 85, duration: 120, start: '09:00', fixed: true },
        { name: 'Lettura guidata The Job Game', category: 'The Job Game', day: 'Venerdì', priority: 90, duration: 120, start: '09:00', fixed: true },
        { name: 'Role Play con tutor', category: 'Formazione', day: 'Martedì', priority: 80, duration: 60, start: '15:00', fixed: true },
        { name: 'Role Play con tutor', category: 'Formazione', day: 'Mercoledì', priority: 80, duration: 60, start: '15:00', fixed: true },
        { name: 'Role Play con tutor', category: 'Formazione', day: 'Venerdì', priority: 80, duration: 60, start: '15:00', fixed: true },
      ])
    } else {
      source = source.concat([
        { name: currentWeek === 4 ? 'Check Talent Acquisition · presentazione progetto HR' : 'Check Talent Acquisition', category: currentWeek === 4 ? 'Progetto HR' : 'Pianificazione', day: 'Lunedì', priority: currentWeek === 4 ? 100 : 95, urgency: currentWeek === 4 ? 'alta' : 'normale', duration: 60, start: '10:00', fixed: true },
        { name: 'Messaggi ai candidati che non proseguono', category: 'Comunicazioni', frequency: 'giornaliera', priority: 85, duration: 45, start: '11:15', fixed: true, delegable: true },
        { name: 'Role Play sulla lettura del questionario attitudinale', category: 'The Job Game', day: 'Martedì', priority: 90, duration: 60, start: '15:00', fixed: true },
        { name: 'Role Play sulla lettura del questionario attitudinale', category: 'The Job Game', day: 'Giovedì', priority: 90, duration: 60, start: '15:00', fixed: true },
        { name: 'Classe Live The Job Game', category: 'The Job Game', day: 'Giovedì', priority: 90, duration: 60, start: '10:00', fixed: true },
        { name: 'Affiancamento lettura The Job Game', category: 'The Job Game', day: 'Venerdì', priority: 90, duration: 60, start: '10:00', fixed: true },
        { name: 'Check Nido Academy con tutor', category: 'Academy e Forte', day: 'Venerdì', priority: 90, duration: 60, start: '15:00', fixed: true },
      ])
      if (currentWeek === 2) {
        source.push(
          { name: 'Studio Psicotrappole e Psicosoluzioni, video recruiting e lettura test', category: 'Formazione', day: 'Martedì', priority: 95, duration: 60, start: '10:00', fixed: true },
          { name: 'Avvio progetto di miglioramento HR con tutor', category: 'Progetto HR', day: 'Lunedì', priority: 90, urgency: 'media', duration: 60, start: '15:00', fixed: true },
        )
      }
      if (currentWeek === 3) {
        source.push(
          { name: 'Studio Psicotrappole, lettura test e video dedicati', category: 'Formazione', day: 'Martedì', priority: 90, duration: 60, start: '10:00', fixed: true },
          { name: 'Sviluppo progetto di miglioramento HR', category: 'Progetto HR', day: 'Lunedì', priority: 85, urgency: 'media', duration: 60, start: '15:00', fixed: true },
          { name: 'Osservazione colloqui di secondo livello', category: 'Colloqui', day: 'Mercoledì', priority: 85, duration: 60, start: '15:00', fixed: true },
        )
      }
      if (currentWeek === 4) {
        source.push(
          { name: 'Studio Dialogo Strategico e formazione Stefano Bartoli', category: 'Formazione', day: 'Martedì', priority: 90, duration: 60, start: '10:00', fixed: true },
          { name: 'Consolidamento lettura test attitudinali', category: 'The Job Game', day: 'Mercoledì', priority: 90, duration: 60, start: '10:00', fixed: true },
          { name: 'Osservazione colloqui di secondo livello', category: 'Colloqui', day: 'Mercoledì', priority: 85, duration: 60, start: '15:00', fixed: true },
        )
      }
    }
    return source.map(function (item, index) {
      return {
        id: 'week-' + currentWeek + '-' + index,
        name: item.name,
        category: item.category,
        frequency: item.frequency || 'settimanale',
        priority: item.priority || 1,
        urgency: item.urgency || 'normale',
        deadline: '',
        duration: item.duration || 0,
        actual: 0,
        day: item.day || 'auto',
        start: item.start || '',
        status: 'pianificata',
        fixed: !!item.fixed,
        delegable: !!item.delegable,
        description: item.description || '',
        owner: item.owner || 'HR',
        procedure: procedureFor(item),
        checklist: checklistFor(item),
      }
    })
  }

  var tasks = read(TASK_KEY, null)
  if (!Array.isArray(tasks)) {
    tasks = defaultTasks(1)
    write(TASK_KEY, tasks)
  } else if (tasks.length && tasks.every(function (task) { return /^source-/.test(task.id) })) {
    tasks = defaultTasks(1)
    write(TASK_KEY, tasks)
  }
  tasks = tasks.map(function (task) {
    task.description = task.description || ''
    task.owner = task.owner || 'HR'
    task.procedure = procedureFor(task)
    task.checklist = checklistFor(task).map(function (item) {
      return typeof item === 'string' ? { text: item, done: false } : item
    })
    return task
  })
  var birthdays = read(BIRTHDAY_KEY, [])
  if (!Array.isArray(birthdays)) birthdays = []

  function saveTasks() {
    write(TASK_KEY, tasks)
  }

  function minutes(value) {
    return Math.max(0, Number(value) || 0)
  }

  function dateState(task) {
    if (!task.deadline || task.status === 'completata') return ''
    var due = new Date(task.deadline + 'T23:59:59')
    var diff = (due.getTime() - Date.now()) / 86400000
    if (diff < 0) return 'in ritardo'
    if (diff <= 2) return 'in scadenza'
    return ''
  }

  function resetTaskForm() {
    byId('taskForm').reset()
    byId('taskId').value = ''
    byId('taskPriority').value = '1'
    byId('priorityValue').textContent = '1'
    byId('taskDuration').value = '0'
    byId('taskActual').value = '0'
    byId('taskDay').value = 'auto'
    byId('taskUrgency').value = 'normale'
    byId('taskFrequency').value = 'da definire'
    byId('taskStatus').value = 'da pianificare'
    byId('taskDescription').value = ''
    byId('taskOwner').value = ''
    byId('taskProcedure').value = ''
    byId('taskChecklist').value = ''
  }

  function editTask(task) {
    if (window.goId) window.goId('pPlan')
    byId('taskId').value = task.id
    byId('taskName').value = task.name
    byId('taskCategory').value = task.category
    byId('taskPriority').value = task.priority
    byId('priorityValue').textContent = task.priority
    byId('taskUrgency').value = task.urgency
    byId('taskDeadline').value = task.deadline || ''
    byId('taskFrequency').value = task.frequency
    byId('taskDuration').value = task.duration
    byId('taskActual').value = task.actual || 0
    byId('taskDay').value = task.day
    byId('taskStart').value = task.start || ''
    byId('taskStatus').value = task.status
    byId('taskFixed').checked = !!task.fixed
    byId('taskDelegable').checked = !!task.delegable
    byId('taskDescription').value = task.description || ''
    byId('taskOwner').value = task.owner || ''
    byId('taskProcedure').value = task.procedure || ''
    byId('taskChecklist').value = (task.checklist || []).map(function (item) { return item.text }).join('\n')
    byId('taskForm').closest('details').open = true
    byId('taskForm').scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  function taskFromForm() {
    var id = byId('taskId').value || uid('task')
    var previous = tasks.find(function (item) { return item.id === id })
    var existingChecks = previous ? previous.checklist || [] : []
    var checklist = byId('taskChecklist').value
      .split('\n')
      .map(function (item) { return item.trim() })
      .filter(Boolean)
      .map(function (text) {
        var existing = existingChecks.find(function (item) { return item.text === text })
        return { text: text, done: existing ? !!existing.done : false }
      })
    return {
      id: id,
      name: byId('taskName').value.trim(),
      category: byId('taskCategory').value.trim(),
      priority: Number(byId('taskPriority').value),
      urgency: byId('taskUrgency').value,
      deadline: byId('taskDeadline').value,
      frequency: byId('taskFrequency').value,
      duration: minutes(byId('taskDuration').value),
      actual: minutes(byId('taskActual').value),
      day: byId('taskDay').value,
      start: byId('taskStart').value,
      status: byId('taskStatus').value,
      fixed: byId('taskFixed').checked,
      delegable: byId('taskDelegable').checked,
      description: byId('taskDescription').value.trim(),
      owner: byId('taskOwner').value.trim(),
      procedure: byId('taskProcedure').value,
      checklist: checklist,
    }
  }

  function validateTime(task) {
    if (!task.start || !task.duration) return true
    var parts = task.start.split(':').map(Number)
    var start = parts[0] * 60 + parts[1]
    if (start < 9 * 60 || start >= 18 * 60 || (start >= 13 * 60 && start < 14 * 60)) {
      window.alert('L’orario deve essere compreso tra 09:00 e 18:00 e non può iniziare nella pausa 13:00–14:00.')
      return false
    }
    var perOccurrence =
      task.frequency === 'giornaliera'
        ? task.duration
        : task.duration
    if (!Core.endTimeSkippingLunch(task.start, perOccurrence)) {
      window.alert('La durata supera le 18:00 oppure entra in conflitto con la giornata disponibile.')
      return false
    }
    return true
  }

  function makeTag(text, type) {
    return node('span', 'tag' + (type ? ' ' + type : ''), text)
  }

  function renderTasks(plan) {
    var list = byId('taskList')
    list.innerHTML = ''
    if (!tasks.length) {
      list.appendChild(node('div', 'card', 'Nessuna attività. Usa il modulo per aggiungerne una.'))
      return
    }
    tasks.forEach(function (task) {
      var row = node('div', 'task-row' + (task.status === 'completata' ? ' done' : ''))
      var content = node('div')
      content.appendChild(node('div', 'task-title', task.name))
      content.appendChild(node('div', 'ops-note', task.category + (task.owner ? ' · ' + task.owner : '')))
      if (task.description) content.appendChild(node('div', 'activity-desc', task.description))
      var meta = node('div', 'task-meta')
      var share =
        plan.shares[task.id] === undefined
          ? 'vincolo fisso'
          : 'quota importanza ' + plan.shares[task.id].toFixed(1) + '%'
      meta.appendChild(makeTag(share, task.fixed ? 'lime' : ''))
      meta.appendChild(makeTag('priorità ' + task.priority))
      meta.appendChild(makeTag('urgenza ' + task.urgency, task.urgency === 'alta' ? 'hot' : ''))
      meta.appendChild(makeTag(task.frequency))
      meta.appendChild(
        makeTag(
          task.duration
            ? 'richiesta ' + Core.timeLabel(Core.demandMinutes(task))
            : 'durata da definire',
        ),
      )
      meta.appendChild(makeTag('assegnata ' + Core.timeLabel(plan.allocations[task.id] || 0)))
      meta.appendChild(makeTag(task.status, task.status === 'completata' ? 'lime' : ''))
      if (task.delegable) meta.appendChild(makeTag('delegabile', 'lime'))
      if (task.procedure) meta.appendChild(makeTag('procedura collegata'))
      var date = dateState(task)
      if (date) meta.appendChild(makeTag(date, date === 'in ritardo' ? 'late' : 'hot'))
      content.appendChild(meta)

      var controls = node('div', 'task-buttons')
      controls.appendChild(
        button('−', function () {
          task.priority = Math.max(1, Number(task.priority) - 1)
          saveTasks()
          renderPlanner()
        }, '', 'Riduci importanza'),
      )
      controls.appendChild(
        button('+', function () {
          task.priority = Math.min(100, Number(task.priority) + 1)
          saveTasks()
          renderPlanner()
        }, '', 'Aumenta importanza'),
      )
      controls.appendChild(button('Modifica', function () { editTask(task) }))
      controls.appendChild(
        button(task.status === 'completata' ? 'Riapri' : 'Completa', function () {
          task.status = task.status === 'completata' ? 'pianificata' : 'completata'
          saveTasks()
          renderPlanner()
        }),
      )
      controls.appendChild(
        button('Elimina', function () {
          if (!window.confirm('Eliminare questa attività?')) return
          tasks = tasks.filter(function (item) { return item.id !== task.id })
          saveTasks()
          renderPlanner()
        }),
      )
      row.appendChild(content)
      row.appendChild(controls)
      list.appendChild(row)
    })
  }

  function parseClock(value) {
    if (!value) return null
    var parts = value.split(':').map(Number)
    return parts[0] * 60 + parts[1]
  }

  function buildSchedule(plan, bufferPerDay) {
    var days = {}
    Core.DAYS.forEach(function (day) {
      days[day] = { used: 0, entries: [] }
      if (bufferPerDay > 0) {
        days[day].entries.push({
          name: 'Buffer imprevisti',
          minutes: bufferPerDay,
          buffer: true,
          status: '',
          start: '',
        })
      }
    })
    var unassigned = []
    tasks.forEach(function (task) {
      var allocated = plan.allocations[task.id] || 0
      if (!allocated) {
        unassigned.push(task)
        return
      }
      var targets
      if (task.frequency === 'giornaliera') {
        targets = Core.WORK_DAYS.slice()
      } else if (task.day !== 'auto') {
        targets = [task.day]
      } else {
        var best = Core.WORK_DAYS.slice().sort(function (a, b) {
          return days[a].used - days[b].used
        })[0]
        targets = [best]
      }
      var portion = allocated / targets.length
      targets.forEach(function (day) {
        var end = task.start ? Core.endTimeSkippingLunch(task.start, portion) : ''
        var entry = {
          id: task.id,
          name: task.name,
          category: task.category,
          minutes: portion,
          start: task.start,
          end: end,
          fixed: task.fixed,
          status: task.status,
          conflict: task.start && !end,
        }
        days[day].entries.push(entry)
        days[day].used += portion
      })
    })

    Core.DAYS.forEach(function (day) {
      var timed = days[day].entries.filter(function (entry) { return entry.start && entry.end })
      timed.forEach(function (entry, index) {
        var start = parseClock(entry.start)
        var end = parseClock(entry.end)
        timed.forEach(function (other, otherIndex) {
          if (index === otherIndex) return
          var otherStart = parseClock(other.start)
          var otherEnd = parseClock(other.end)
          if (start < otherEnd && end > otherStart) {
            entry.conflict = true
            other.conflict = true
          }
        })
      })
    })
    return { days: days, unassigned: unassigned }
  }

  function renderSchedule(plan, bufferPerDay) {
    var result = buildSchedule(plan, bufferPerDay)
    var board = byId('agendaBoard')
    board.innerHTML = ''
    var selectedDays =
      plannerView === 'day' ? [byId('dayViewSelect').value] : Core.DAYS
    var grid = node('div', 'agenda-board')
    selectedDays.forEach(function (day) {
      var data = result.days[day]
      var weekend = Core.WORK_DAYS.indexOf(day) === -1
      var card = node('div', 'agenda-day' + (weekend ? ' weekend' : ''))
      card.appendChild(node('h3', '', day))
      var usableDay = Core.DAY_MINUTES - bufferPerDay
      var capText = weekend
        ? Core.timeLabel(data.used) + ' pianificate · giorno facoltativo'
        : Core.timeLabel(data.used) +
          ' pianificate · ' +
          Core.timeLabel(Math.max(0, usableDay - data.used)) +
          ' libere'
      if (data.used > usableDay) capText += ' · sovraccarico ' + Core.timeLabel(data.used - usableDay)
      card.appendChild(node('div', 'day-cap', capText))
      data.entries
        .sort(function (a, b) { return (a.start || '99:99').localeCompare(b.start || '99:99') })
        .forEach(function (entry) {
          var classes = 'agenda-block'
          var category = (entry.category || '').toLowerCase()
          if (category.indexOf('recruit') > -1) classes += ' cat-recruiting'
          if (category.indexOf('colloqu') > -1) classes += ' cat-colloqui'
          if (category.indexOf('formaz') > -1) classes += ' cat-formazione'
          if (category.indexOf('academy') > -1) classes += ' cat-academy'
          if (category.indexOf('progetto') > -1) classes += ' cat-progetto'
          if (category.indexOf('comunic') > -1) classes += ' cat-comunicazioni'
          if (entry.fixed) classes += ' fixed'
          if (entry.buffer) classes += ' buffer'
          if (entry.status === 'completata') classes += ' done'
          if (entry.conflict || (!weekend && data.used > usableDay)) classes += ' conflict'
          var block = node('div', classes)
          block.appendChild(node('b', '', entry.name))
          var line = Core.timeLabel(entry.minutes)
          if (entry.start) line = entry.start + (entry.end ? '–' + entry.end : '') + ' · ' + line
          block.appendChild(node('div', '', line))
          card.appendChild(block)
        })
      grid.appendChild(card)
    })
    board.appendChild(grid)
    if (result.unassigned.length) {
      var unassigned = node('div', 'agenda-unassigned')
      unassigned.appendChild(node('h3', '', 'Attività non collocate'))
      result.unassigned.forEach(function (task) {
        unassigned.appendChild(
          node(
            'div',
            'agenda-block' + (task.duration ? ' conflict' : ''),
            task.name + (task.duration ? ' · capacità insufficiente' : ' · durata da definire'),
          ),
        )
      })
      board.appendChild(unassigned)
    }
  }

  function renderSuggestions(plan) {
    var box = byId('plannerSuggestions')
    box.innerHTML = ''
    var details = node('details')
    details.open = plan.overloadMinutes > 0
    details.appendChild(node('summary', '', 'Riequilibrio, raggruppamento e delega'))
    var inside = node('div', 'in')
    if (plan.overloadMinutes > 0) {
      inside.appendChild(
        node(
          'p',
          '',
          'Servono ' +
            Core.timeLabel(plan.overloadMinutes) +
            ' aggiuntive oppure una riprogrammazione. Le durate non sono state compresse.',
        ),
      )
    } else {
      inside.appendChild(node('p', '', 'Il carico noto rientra nella capacità disponibile.'))
    }
    var keep = tasks.filter(function (task) {
      return task.fixed || task.urgency === 'alta' || dateState(task)
    })
    var move = tasks.filter(function (task) {
      return !task.fixed && task.urgency !== 'alta' && task.status !== 'completata'
    })
    var delegate = tasks.filter(function (task) { return task.delegable })
    var scope = tasks.filter(function (task) {
      return (plan.allocations[task.id] || 0) + 0.5 < Core.demandMinutes(task)
    })
    function section(title, items, empty) {
      inside.appendChild(node('h3', '', title))
      if (!items.length) {
        inside.appendChild(node('p', 'ops-note', empty))
        return
      }
      var list = node('ul')
      items.forEach(function (task) { list.appendChild(node('li', '', task.name)) })
      inside.appendChild(list)
    }
    section('1 · Da mantenere', keep, 'Nessuna attività marcata come fissa, urgente o in scadenza.')
    section('2 · Riprogrammabili', move, 'Nessuna attività flessibile disponibile.')
    section('3 · Delegabili', delegate, 'Nessuna attività indicata come delegabile.')
    section('4 · Ambito o scadenza da rivedere', scope, 'Nessuna attività parzialmente allocata.')

    var grouped = {}
    tasks.forEach(function (task) {
      if (!grouped[task.category]) grouped[task.category] = []
      grouped[task.category].push(task)
    })
    var batches = Object.keys(grouped).filter(function (category) {
      return grouped[category].length > 1
    })
    inside.appendChild(node('h3', '', 'Attività raggruppabili'))
    inside.appendChild(
      node(
        'p',
        'ops-note',
        batches.length
          ? 'Categorie con più attività da valutare in blocchi consecutivi: ' + batches.join(', ') + '.'
          : 'Nessuna categoria contiene più attività.',
      ),
    )
    details.appendChild(inside)
    box.appendChild(details)
  }

  function renderPlanner() {
    var bufferPerDay = minutes(byId('bufferMinutes').value)
    write(BUFFER_KEY, bufferPerDay)
    var plan = Core.compute(tasks, bufferPerDay)
    byId('weekCapacity').textContent = Core.timeLabel(plan.weekMinutes)
    byId('plannedTime').textContent = Core.timeLabel(plan.plannedMinutes)
    byId('freeTime').textContent = Core.timeLabel(plan.freeMinutes)
    byId('actualTime').textContent = Core.timeLabel(
      tasks.reduce(function (sum, task) { return sum + minutes(task.actual) }, 0),
    )
    var alert = byId('plannerAlert')
    alert.className = 'ops-alert' + (plan.overloadMinutes ? '' : ' ok')
    var message = plan.overloadMinutes
      ? 'Sovraccarico: la domanda supera la capacità di ' +
        Core.timeLabel(plan.overloadMinutes) +
        '. Le durate non sono compresse: gli impegni fissi che non entrano restano non collocati; il tempo flessibile è ripartito per importanza, urgenza e scadenza.'
      : 'Capacità rispettata. Restano ' + Core.timeLabel(plan.freeMinutes) + ' disponibili.'
    if (plan.unknownDuration.length) {
      message +=
        ' ' +
        plan.unknownDuration.length +
        ' attività non sono conteggiate perché la durata è ancora da definire.'
    }
    alert.textContent = message
    renderTasks(plan)
    renderSchedule(plan, bufferPerDay)
    renderSuggestions(plan)
    document.dispatchEvent(new CustomEvent('hr:tasks-updated'))
  }

  byId('taskPriority').addEventListener('input', function () {
    byId('priorityValue').textContent = this.value
  })
  byId('taskForm').addEventListener('submit', function (event) {
    event.preventDefault()
    var task = taskFromForm()
    if (!task.name || !task.category || !validateTime(task)) return
    var index = tasks.findIndex(function (item) { return item.id === task.id })
    if (index >= 0) tasks[index] = task
    else tasks.push(task)
    saveTasks()
    resetTaskForm()
    renderPlanner()
  })
  byId('cancelTaskEdit').addEventListener('click', resetTaskForm)
  byId('bufferMinutes').value = read(BUFFER_KEY, 0)
  byId('bufferMinutes').addEventListener('input', renderPlanner)
  byId('plannerViewTabs').querySelectorAll('button').forEach(function (control) {
    control.addEventListener('click', function () {
      plannerView = control.dataset.view
      byId('plannerViewTabs').querySelectorAll('button').forEach(function (item) {
        item.classList.toggle('on', item === control)
      })
      byId('dayViewSelect').hidden = plannerView !== 'day'
      renderPlanner()
    })
  })
  byId('dayViewSelect').hidden = true
  byId('dayViewSelect').addEventListener('change', renderPlanner)
  byId('plannerWeek').value = String(read(WEEK_KEY, 1))
  byId('loadWeekPreset').addEventListener('click', function () {
    var week = Number(byId('plannerWeek').value)
    if (!window.confirm('Sostituire le attività correnti con il preset della settimana ' + week + '?')) return
    tasks = defaultTasks(week)
    write(WEEK_KEY, week)
    saveTasks()
    resetTaskForm()
    renderPlanner()
  })

  window.HRPlanner = {
    getTasks: function () { return tasks.slice() },
    editTask: editTask,
    completeTask: function (id) {
      var task = tasks.find(function (item) { return item.id === id })
      if (!task) return
      task.status = task.status === 'completata' ? 'pianificata' : 'completata'
      saveTasks()
      renderPlanner()
    },
    toggleCheck: function (id, index) {
      var task = tasks.find(function (item) { return item.id === id })
      if (!task || !task.checklist[index]) return
      task.checklist[index].done = !task.checklist[index].done
      saveTasks()
      renderPlanner()
    },
    removeTask: function (id) {
      tasks = tasks.filter(function (item) { return item.id !== id })
      saveTasks()
      renderPlanner()
    },
    createTask: function (task) {
      var item = Object.assign({
        id: uid('task'),
        name: 'Nuova attività',
        category: 'Pianificazione',
        priority: 50,
        urgency: 'normale',
        deadline: '',
        frequency: 'settimanale',
        duration: 60,
        actual: 0,
        day: 'auto',
        start: '',
        status: 'da pianificare',
        fixed: false,
        delegable: false,
        description: '',
        owner: 'HR',
        procedure: '',
        checklist: [],
      }, task || {})
      item.id = uid('task')
      item.checklist = (item.checklist || []).map(function (entry) {
        return typeof entry === 'string' ? { text: entry, done: false } : entry
      })
      tasks.push(item)
      saveTasks()
      renderPlanner()
      return item.id
    },
    loadWeek: function (week) {
      tasks = defaultTasks(Number(week) || 1)
      write(WEEK_KEY, Number(week) || 1)
      saveTasks()
      renderPlanner()
    },
  }

  function birthdayTemplate() {
    return byId('birthdayTemplate').value
  }

  function birthdayMessage(name, shortName) {
    return birthdayTemplate()
      .replace(/\[Nome completo\]/g, name || '[Nome completo]')
      .replace(/\[Nome breve\]/g, shortName || '[Nome breve]')
  }

  function updateBirthdayPreview() {
    byId('birthdayPreview').textContent = birthdayMessage(
      byId('birthdayName').value.trim(),
      byId('birthdayShort').value.trim(),
    )
  }

  function copyText(text, control) {
    var original = control.textContent
    function done() {
      control.textContent = 'Copiato!'
      setTimeout(function () { control.textContent = original }, 1400)
    }
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(done).catch(function () {
        fallbackCopy(text)
        done()
      })
    } else {
      fallbackCopy(text)
      done()
    }
  }

  function fallbackCopy(text) {
    var area = document.createElement('textarea')
    area.value = text
    document.body.appendChild(area)
    area.select()
    document.execCommand('copy')
    area.remove()
  }

  function resetBirthdayForm() {
    byId('birthdayForm').reset()
    byId('birthdayId').value = ''
    byId('birthdayStatus').value = 'da programmare'
    updateBirthdayPreview()
  }

  function editBirthday(item) {
    byId('birthdayId').value = item.id
    byId('birthdayName').value = item.name
    byId('birthdayShort').value = item.shortName
    byId('birthdayDate').value = item.date
    byId('birthdayStatus').value = item.status
    byId('birthCheckDate').checked = item.checks.date
    byId('birthCheckName').checked = item.checks.name
    byId('birthCheckMessage').checked = item.checks.message
    byId('birthCheckScheduled').checked = item.checks.scheduled
    byId('birthCheckVerified').checked = item.checks.verified
    updateBirthdayPreview()
    byId('birthdayForm').scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  function renderBirthdays() {
    var list = byId('birthdayList')
    list.innerHTML = ''
    if (!birthdays.length) {
      list.appendChild(node('div', 'card', 'Nessun promemoria salvato.'))
      return
    }
    birthdays
      .slice()
      .sort(function (a, b) { return a.date.localeCompare(b.date) })
      .forEach(function (item) {
        var checks = Object.keys(item.checks).filter(function (key) { return item.checks[key] }).length
        var overdue =
          item.date &&
          new Date(item.date + 'T23:59:59').getTime() < Date.now() &&
          item.status !== 'verificato'
        var card = node('div', 'birth-card' + (overdue ? ' overdue' : ''))
        var head = node('div', 'birth-head')
        var title = node('div')
        title.appendChild(node('h3', '', item.name))
        title.appendChild(
          node(
            'div',
            'ops-note',
            new Date(item.date + 'T12:00:00').toLocaleDateString('it-IT') +
              ' · ' +
              item.status +
              (overdue ? ' · da verificare' : ''),
          ),
        )
        var controls = node('div', 'task-buttons')
        controls.appendChild(button('Copia', function () {
          copyText(birthdayMessage(item.name, item.shortName), controls.firstChild)
        }))
        controls.appendChild(button('Modifica', function () { editBirthday(item) }))
        controls.appendChild(button('Elimina', function () {
          if (!window.confirm('Eliminare questo promemoria?')) return
          birthdays = birthdays.filter(function (birthday) { return birthday.id !== item.id })
          write(BIRTHDAY_KEY, birthdays)
          renderBirthdays()
        }))
        head.appendChild(title)
        head.appendChild(controls)
        card.appendChild(head)
        var progress = node('div', 'birth-progress')
        var bar = node('i')
        bar.style.width = checks / 5 * 100 + '%'
        progress.appendChild(bar)
        card.appendChild(progress)
        card.appendChild(node('div', 'ops-note', checks + '/5 passaggi completati'))
        list.appendChild(card)
      })
  }

  byId('birthdayTemplate').value = read(
    BIRTHDAY_TEMPLATE_KEY,
    byId('birthdayTemplate').value,
  )
  byId('birthdayTemplate').addEventListener('input', function () {
    write(BIRTHDAY_TEMPLATE_KEY, this.value)
    updateBirthdayPreview()
  })
  byId('birthdayName').addEventListener('input', updateBirthdayPreview)
  byId('birthdayShort').addEventListener('input', updateBirthdayPreview)
  byId('previewBirthday').addEventListener('click', updateBirthdayPreview)
  byId('copyBirthday').addEventListener('click', function () {
    copyText(byId('birthdayPreview').textContent, this)
  })
  byId('cancelBirthdayEdit').addEventListener('click', resetBirthdayForm)
  byId('birthdayForm').addEventListener('submit', function (event) {
    event.preventDefault()
    var checks = {
      date: byId('birthCheckDate').checked,
      name: byId('birthCheckName').checked,
      message: byId('birthCheckMessage').checked,
      scheduled: byId('birthCheckScheduled').checked,
      verified: byId('birthCheckVerified').checked,
    }
    var item = {
      id: byId('birthdayId').value || uid('birthday'),
      name: byId('birthdayName').value.trim(),
      shortName: byId('birthdayShort').value.trim(),
      date: byId('birthdayDate').value,
      status: byId('birthdayStatus').value,
      checks: checks,
    }
    if (!item.name || !item.shortName || !item.date) return
    if (item.status === 'verificato' && !checks.verified) {
      window.alert('Per usare lo stato “Verificato” completa anche il controllo della programmazione.')
      return
    }
    var index = birthdays.findIndex(function (birthday) { return birthday.id === item.id })
    if (index >= 0) birthdays[index] = item
    else birthdays.push(item)
    write(BIRTHDAY_KEY, birthdays)
    resetBirthdayForm()
    renderBirthdays()
  })

  updateBirthdayPreview()
  renderBirthdays()
  renderPlanner()
})()
