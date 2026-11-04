(function () {
  'use strict'

  var KEY = 'nidoHrLearningProgressV1'
  var areas = [
    ['Talent Acquisition', 'pAreaTA', 'Selezione, candidature, colloqui e comunicazioni'],
    ['Employer Branding', 'pAreaEB', 'EVP, attrazione e candidate experience'],
    ['Payroll & Administration', 'pAreaPayroll', 'Contratti, time-off, busta paga e compliance'],
    ['Onboarding', 'pAreaOnboarding', 'Nuovi ingressi, tutor, accessi e Nido Test'],
    ['Training & Development', 'pAreaTraining', 'Formazione, Academy, Role Play ed eventi'],
    ['Performance Management', 'pAreaPerformance', 'Forte, valutazioni e sviluppo'],
    ['People & Culture', 'pAreaPeople', 'Cultura, clima, conflitti e uscite'],
    ['HR Operations', 'pAreaOps', 'Governance, documenti e checklist'],
    ['The Job Game', 'pAreaJG', 'Test, psicotrappole e psicosoluzioni'],
  ]
  var stages = [
    {
      id: 'foundation',
      title: 'Livello 1 · Fondamenti aziendali',
      description: 'Comprendi cultura, struttura della guida e percorso formativo.',
      items: [
        { id: 'values', area: 'people', type: 'Procedura', title: 'Valori e Cultura', target: 'p12' },
        { id: 'evolution', area: 'onboarding', type: 'Materiale', title: 'NIDO HR EVOLUTION PATH', resource: '/documenti/nido-hr-evolution-path.pdf' },
        { id: 'guide', area: 'operations', type: 'Materiale', title: 'Istruzioni della Guida HR', resource: '/documenti/istruzioni-guida-hr.pdf' },
      ],
    },
    {
      id: 'talent',
      title: 'Livello 2 · Selezione e candidati',
      description: 'Impara il flusso dalla posizione aperta alla comunicazione dell’esito.',
      items: [
        { id: 'ads', area: 'talent', type: 'Procedura', title: 'Talent Acquisition e annunci', target: 'p1' },
        { id: 'candidates', area: 'talent', type: 'Procedura', title: 'Gestione candidature', target: 'p2' },
        { id: 'interviews', area: 'talent', type: 'Procedura', title: 'Colloqui di livello 1 e 2', target: 'p3' },
        { id: 'bias', area: 'talent', type: 'Procedura', title: 'Valutazione Nido Bias Free', target: 'p4' },
        { id: 'emails', area: 'talent', type: 'Procedura', title: 'Comunicazioni e-mail', target: 'p5' },
        { id: 'raffica', area: 'talent', type: 'Materiale', title: 'Foglio Raffica', resource: '/documenti/foglio-raffica.pdf' },
      ],
    },
    {
      id: 'brand-test',
      title: 'Livello 3 · Employer Brand e valutazione attitudinale',
      description: 'Collega attrazione, candidate experience e lettura del test.',
      items: [
        { id: 'brand', area: 'employer', type: 'Procedura', title: 'Employer Branding', target: 'p8' },
        { id: 'jobgame', area: 'jobgame', type: 'Procedura', title: 'The Job Game', target: 'pj1' },
        { id: 'traps', area: 'jobgame', type: 'Procedura', title: 'Psicotrappole', target: 'pj2' },
        { id: 'solutions', area: 'jobgame', type: 'Procedura', title: 'Psicosoluzioni', target: 'pj3' },
      ],
    },
    {
      id: 'onboarding',
      title: 'Livello 4 · Onboarding',
      description: 'Prepara ingresso, tutor, accessi, settimana test e comunicazioni.',
      items: [
        { id: 'onboarding-procedure', area: 'onboarding', type: 'Procedura', title: 'Onboarding e Nido Test', target: 'p6' },
        { id: 'onboard-realestate', area: 'onboarding', type: 'Materiale', title: 'Da Onboard a Real Estate', resource: '/documenti/da-onboard-a-real-estate.pdf' },
        { id: 'data-email', area: 'onboarding', type: 'Template', title: 'E-mail raccolta dati', text: 'email-raccolta-dati' },
        { id: 'tutor-sheet', area: 'onboarding', type: 'Template', title: 'Scheda Onboard tutor', text: 'scheda-onboard-tutor' },
        { id: 'tutor-message', area: 'onboarding', type: 'Template', title: 'Messaggio standard tutor', text: 'messaggio-standard-tutor' },
      ],
    },
    {
      id: 'development',
      title: 'Livello 5 · Formazione e sviluppo',
      description: 'Studia Academy, materiali dei livelli, Role Play ed eventi formativi.',
      items: [
        { id: 'training', area: 'training', type: 'Procedura', title: 'Formazione ed Eventi', target: 'p10' },
        { id: 'level1', area: 'training', type: 'Materiale', title: 'Materiale Level 1', resource: '/documenti/materiale-level-1.pdf' },
        { id: 'level2', area: 'training', type: 'Materiale', title: 'Materiale Level 2', resource: '/documenti/materiale-level-2.pdf' },
        { id: 'level3', area: 'training', type: 'Materiale', title: 'Materiale Level 3', resource: '/documenti/materiale-level-3.pdf' },
      ],
    },
    {
      id: 'advanced',
      title: 'Livello 6 · Performance e operazioni HR',
      description: 'Completa la formazione con performance, amministrazione, governance e people operations.',
      items: [
        { id: 'forte', area: 'performance', type: 'Procedura', title: 'Sistema Forte', target: 'pF' },
        { id: 'academy', area: 'performance', type: 'Procedura', title: 'Forte e Nido Academy', target: 'p9' },
        { id: 'contracts', area: 'payroll', type: 'Procedura', title: 'Contratti, compensi e dotazioni', target: 'p7' },
        { id: 'timeoff', area: 'payroll', type: 'Procedura', title: 'Time-Off', target: 'p11' },
        { id: 'payroll', area: 'payroll', type: 'Procedura', title: 'Lettura busta paga', target: 'pB' },
        { id: 'transparency', area: 'payroll', type: 'Procedura', title: 'Trasparenza salariale', target: 'p15' },
        { id: 'governance', area: 'operations', type: 'Procedura', title: 'Governance e clima', target: 'pG' },
        { id: 'climate', area: 'people', type: 'Materiale', title: 'Questionario clima', resource: '/documenti/questionario-clima.pdf' },
        { id: 'conflicts', area: 'people', type: 'Procedura', title: 'Risoluzione conflitti', target: 'p13' },
        { id: 'exit', area: 'people', type: 'Procedura', title: 'Nido Exit', target: 'p14' },
      ],
    },
  ]

  function node(tag, className, text) {
    var element = document.createElement(tag)
    if (className) element.className = className
    if (text !== undefined) element.textContent = text
    return element
  }

  function read() {
    try {
      return JSON.parse(localStorage.getItem(KEY) || '{}')
    } catch (error) {
      return {}
    }
  }

  function write(value) {
    try {
      localStorage.setItem(KEY, JSON.stringify(value))
    } catch (error) {}
  }

  var completed = read()

  function allItems() {
    return stages.reduce(function (items, stage) { return items.concat(stage.items) }, [])
  }

  function openItem(item) {
    if (item.target) window.goId(item.target)
    if (item.resource && window.HRResources) window.HRResources.open(item.resource, item.title)
    if (item.text && window.HRText) window.HRText.open(item.text)
  }

  function stageProgress(stage) {
    var done = stage.items.filter(function (item) { return completed[item.id] }).length
    return { done: done, total: stage.items.length }
  }

  function currentItem() {
    return allItems().find(function (item) { return !completed[item.id] })
  }

  function renderAreaProgress() {
    document.querySelectorAll('[data-learning-area]').forEach(function (box) {
      var area = box.dataset.learningArea
      var items = allItems().filter(function (item) { return item.area === area })
      var done = items.filter(function (item) { return completed[item.id] }).length
      var percentage = items.length ? Math.round(done / items.length * 100) : 0
      box.innerHTML = ''
      var top = node('div', 'procedure-guide-head')
      top.appendChild(node('b', '', 'Formazione area'))
      top.appendChild(node('span', '', done + '/' + items.length + ' · ' + percentage + '%'))
      box.appendChild(top)
      var progress = node('div', 'procedure-progress')
      var bar = node('i')
      bar.style.width = percentage + '%'
      progress.appendChild(bar)
      box.appendChild(progress)
    })
  }

  function render() {
    var map = document.getElementById('learningMap')
    if (!map) return
    map.innerHTML = ''
    var firstIncomplete = currentItem()
    stages.forEach(function (stage, stageIndex) {
      var progressData = stageProgress(stage)
      var card = node('div', 'learning-level')
      var isCurrentStage = stage.items.some(function (item) { return firstIncomplete && item.id === firstIncomplete.id })
      if (isCurrentStage) {
        card.classList.add('current')
      }
      var head = node('div', 'learning-level-head')
      var intro = node('div')
      intro.appendChild(node('span', 'section-label', 'Fase ' + (stageIndex + 1)))
      intro.appendChild(node('h2', '', stage.title))
      intro.appendChild(node('p', 'activity-desc', stage.description))
      head.appendChild(intro)
      var state = progressData.done === progressData.total
        ? 'Completata'
        : progressData.done > 0 || isCurrentStage
          ? 'In corso'
          : 'Da fare'
      head.appendChild(node('span', 'tag' + (state === 'Completata' ? ' lime' : ''), state))
      card.appendChild(head)
      var progress = node('div', 'procedure-progress')
      var bar = node('i')
      bar.style.width = Math.round(progressData.done / progressData.total * 100) + '%'
      progress.appendChild(bar)
      card.appendChild(progress)
      var list = node('div', 'learning-items')
      stage.items.forEach(function (item) {
        var row = node('label', 'learning-item' + (completed[item.id] ? ' done' : ''))
        if (firstIncomplete && firstIncomplete.id === item.id) row.classList.add('current')
        var checkbox = node('input')
        checkbox.type = 'checkbox'
        checkbox.checked = !!completed[item.id]
        checkbox.addEventListener('change', function () {
          completed[item.id] = checkbox.checked
          write(completed)
          render()
        })
        var content = node('div')
        content.appendChild(node('b', '', item.title))
        content.appendChild(node('span', 'ops-note', item.type))
        var open = node('button', 'btn line', 'Apri')
        open.type = 'button'
        open.addEventListener('click', function (event) {
          event.preventDefault()
          openItem(item)
        })
        row.appendChild(checkbox)
        row.appendChild(content)
        row.appendChild(open)
        list.appendChild(row)
      })
      card.appendChild(list)
      map.appendChild(card)
    })
    var items = allItems()
    var done = items.filter(function (item) { return completed[item.id] }).length
    var percentage = Math.round(done / items.length * 100)
    var overall = document.getElementById('learningOverall')
    if (overall) {
      overall.style.setProperty('--progress', percentage + '%')
      var overallValue = overall.querySelector('b')
      if (overallValue) overallValue.textContent = percentage + '%'
    }
    var completedEl = document.getElementById('learningCompleted')
    if (completedEl) completedEl.textContent = done
    var totalEl = document.getElementById('learningTotal')
    if (totalEl) totalEl.textContent = items.length
    var resume = document.getElementById('resumeLearning')
    if (resume) {
      resume.textContent = firstIncomplete ? 'Riprendi: ' + firstIncomplete.title : 'Percorso completato'
      resume.disabled = !firstIncomplete
    }
    renderAreaProgress()
  }

  var resumeLearning = document.getElementById('resumeLearning')
  if (resumeLearning) {
    resumeLearning.addEventListener('click', function () {
      var item = currentItem()
      if (item) openItem(item)
    })
  }

  window.HRLearning = {
    getSearchEntries: function () {
      return areas.map(function (area) {
        return {
          category: 'Aree HR',
          title: area[0],
          text: area[2],
          open: function () { window.goId(area[1]) },
        }
      }).concat(allItems().map(function (item) {
        return {
          category: 'Formazione',
          title: item.title,
          text: item.type,
          open: function () { openItem(item) },
        }
      }))
    },
  }

  document.body.classList.add('learning-mode')
  render()
})()
