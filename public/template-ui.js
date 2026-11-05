(function () {
  'use strict'

  var TEMPLATE_KEY = 'nidoHrTemplatesV1'
  var INSTANCE_KEY = 'nidoHrTemplateInstancesV1'

  function uid(prefix) {
    return prefix + '-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 7)
  }

  function node(tag, className, text) {
    var element = document.createElement(tag)
    if (className) element.className = className
    if (text !== undefined) element.textContent = text
    return element
  }

  function button(text, action, className) {
    var control = node('button', className || 'btn line', text)
    control.type = 'button'
    control.addEventListener('click', action)
    return control
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
    } catch (error) {}
  }

  function defaults() {
    return [
      {
        id: 'tpl-onboarding',
        type: 'procedura',
        title: 'Onboarding nuovo ingresso',
        description: 'Flusso completo dalla conferma dell’avvio al check finale.',
        objective: 'Preparare il nuovo ingresso, coordinare tutor e accessi e registrare un esito motivato.',
        owner: 'HR',
        materials: ['Scheda Onboard', 'Agenda della settimana', 'Stato degli accessi', 'Nido Pack'],
        notes: 'Non inserire password nei documenti condivisi. La pubblicazione su Nido Today avviene solo dopo esito positivo.',
        steps: [
          'Conferma sede, data, ruolo e tutor',
          'Invia la raccolta dati e verifica i documenti richiesti',
          'Richiedi gli account e registra soltanto lo stato degli accessi',
          'Condividi agenda, scheda Onboard e messaggio con il tutor',
          'Esegui i check previsti durante la settimana',
          'Verifica le valutazioni e registra esito e motivazione',
        ],
      },
      {
        id: 'tpl-screening',
        type: 'attività',
        title: 'Screening CV e anagrafica',
        description: 'Attività pronta da inserire in agenda e collegare alla gestione candidature.',
        objective: 'Valutare i profili in ingresso e mantenere N-Space HR aggiornato.',
        owner: 'HR',
        materials: ['CV candidato', 'Posizione aperta', 'N-Space HR'],
        notes: 'Registra fatti e informazioni coerenti con i requisiti del ruolo.',
        steps: ['Leggi il CV', 'Confronta il profilo con il ruolo', 'Crea o aggiorna l’anagrafica', 'Registra esito e prossimo passo'],
        task: { category: 'Recruiting', priority: 100, duration: 60, day: 'auto', status: 'da pianificare', procedure: 'p2' },
      },
      {
        id: 'tpl-colloquio',
        type: 'checklist',
        title: 'Colloquio di primo livello',
        description: 'Checklist riutilizzabile per preparazione, conduzione e chiusura.',
        objective: 'Condurre un colloquio strutturato e registrare una decisione verificabile.',
        owner: 'HR',
        materials: ['CV', 'Report The Job Game', 'Griglia Nido Bias Free'],
        notes: 'Usa le stesse domande chiave per tutti e annota fatti, esempi e frasi testuali.',
        steps: ['Rileggi CV e report', 'Prepara i punti da approfondire', 'Conduci apertura e domande strategiche', 'Verifica esempi concreti', 'Registra la valutazione', 'Comunica il prossimo passo'],
      },
      {
        id: 'tpl-week',
        type: 'pianificazione',
        title: 'Settimana HR · osservazione e onboarding',
        description: 'Pianificazione completa della prima settimana del percorso HR.',
        objective: 'Bilanciare attività operative, formazione, affiancamento e recap.',
        owner: 'HR con tutor',
        materials: ['Procedure HR', 'Nido Guida', 'New Workers', 'Materiali The Job Game'],
        notes: 'La pausa 13:00–14:00 resta esclusa. Durate e priorità possono essere adattate con il tutor.',
        steps: ['Carica il preset della settimana 1', 'Controlla conflitti e capacità', 'Conferma gli slot con il tutor', 'Aggiorna lo stato ogni giorno', 'Completa il recap del venerdì'],
        week: 1,
      },
      {
        id: 'tpl-report',
        type: 'documento',
        title: 'Scheda esito colloquio',
        description: 'Documento interno compilabile per rendere tracciabile la valutazione.',
        objective: 'Raccogliere dati, fatti osservabili, decisione e prossimo passo.',
        owner: 'HR',
        materials: ['CV', 'Note colloquio', 'Report The Job Game'],
        notes: 'Candidato:\\nRuolo:\\nData:\\nFatti osservati:\\nPunti da approfondire:\\nEsito:\\nMotivazione:\\nProssimo passo:',
        steps: ['Compila dati e ruolo', 'Riporta fatti osservabili', 'Confronta con la griglia', 'Registra esito e motivazione', 'Definisci il prossimo passo'],
      },
    ]
  }

  var templates = read(TEMPLATE_KEY, null)
  if (!Array.isArray(templates) || !templates.length) {
    templates = defaults()
    write(TEMPLATE_KEY, templates)
  }
  var instances = read(INSTANCE_KEY, [])
  if (!Array.isArray(instances)) instances = []

  function createDialog(id, title) {
    var dialog = document.getElementById(id)
    if (dialog) return dialog
    dialog = node('dialog', 'dialog-shell')
    dialog.id = id
    var head = node('div', 'dialog-head')
    head.appendChild(node('h2', '', title))
    var close = button('×', function () { dialog.close() }, 'dialog-close')
    close.setAttribute('aria-label', 'Chiudi')
    head.appendChild(close)
    dialog.appendChild(head)
    dialog.appendChild(node('div', 'dialog-body'))
    document.body.appendChild(dialog)
    return dialog
  }

  function field(label, value, multiline) {
    var wrapper = node('label', 'ops-field')
    wrapper.appendChild(node('span', '', label))
    var input = node(multiline ? 'textarea' : 'input')
    input.value = value || ''
    wrapper.appendChild(input)
    return { wrapper: wrapper, input: input }
  }

  function openTemplateEditor(template) {
    var dialog = createDialog('templateEditorDialog', 'Modifica template')
    dialog.querySelector('.dialog-head h2').textContent = 'Modifica template'
    var body = dialog.querySelector('.dialog-body')
    body.innerHTML = ''
    var form = node('form', 'template-editor')
    var title = field('Titolo', template.title)
    var description = field('Descrizione', template.description, true)
    var objective = field('Obiettivo', template.objective, true)
    var owner = field('Responsabile', template.owner)
    var materials = field('Materiali · uno per riga', (template.materials || []).join('\n'), true)
    var notes = field('Note e campi compilabili', template.notes, true)
    var steps = field('Passaggi · uno per riga', (template.steps || []).join('\n'), true)
    ;[title, description, objective, owner, materials, notes, steps].forEach(function (item) {
      form.appendChild(item.wrapper)
    })
    var actions = node('div', 'ops-actions')
    actions.appendChild(button('Salva template', function (event) {
      event.preventDefault()
      template.title = title.input.value.trim()
      template.description = description.input.value.trim()
      template.objective = objective.input.value.trim()
      template.owner = owner.input.value.trim()
      template.materials = materials.input.value.split('\n').map(function (item) { return item.trim() }).filter(Boolean)
      template.notes = notes.input.value.trim()
      template.steps = steps.input.value.split('\n').map(function (item) { return item.trim() }).filter(Boolean)
      write(TEMPLATE_KEY, templates)
      render()
      dialog.close()
    }, 'btn lime'))
    form.appendChild(actions)
    body.appendChild(form)
    dialog.showModal()
  }

  function openInstance(instance) {
    var dialog = createDialog('templateInstanceDialog', instance.title)
    dialog.querySelector('.dialog-head h2').textContent = instance.title
    var body = dialog.querySelector('.dialog-body')
    body.innerHTML = ''
    var title = field('Titolo', instance.title)
    var objective = field('Obiettivo', instance.objective, true)
    var owner = field('Responsabile', instance.owner)
    var materials = field('Materiali', (instance.materials || []).join('\n'), true)
    var notes = field('Note e campi compilabili', instance.notes, true)
    ;[title, objective, owner, materials, notes].forEach(function (item) {
      body.appendChild(item.wrapper)
    })
    body.appendChild(node('h3', '', 'Passaggi'))
    var list = node('div', 'template-step-list')
    ;(instance.steps || []).forEach(function (step, index) {
      var label = node('label', 'template-step')
      var checkbox = node('input')
      checkbox.type = 'checkbox'
      checkbox.checked = (instance.completed || []).indexOf(index) > -1
      checkbox.addEventListener('change', function () {
        instance.completed = instance.completed || []
        if (checkbox.checked && instance.completed.indexOf(index) === -1) instance.completed.push(index)
        if (!checkbox.checked) instance.completed = instance.completed.filter(function (item) { return item !== index })
        write(INSTANCE_KEY, instances)
        render()
      })
      label.appendChild(checkbox)
      label.appendChild(node('span', '', (index + 1) + ' · ' + step))
      list.appendChild(label)
    })
    body.appendChild(list)
    var actions = node('div', 'ops-actions')
    actions.appendChild(button('Salva modifiche', function () {
      instance.title = title.input.value.trim()
      instance.objective = objective.input.value.trim()
      instance.owner = owner.input.value.trim()
      instance.materials = materials.input.value.split('\n').map(function (item) { return item.trim() }).filter(Boolean)
      instance.notes = notes.input.value
      write(INSTANCE_KEY, instances)
      render()
      dialog.close()
    }, 'btn lime'))
    actions.appendChild(button('Duplica flusso', function () {
      var copy = JSON.parse(JSON.stringify(instance))
      copy.id = uid('flow')
      copy.title += ' · copia'
      copy.completed = []
      instances.push(copy)
      write(INSTANCE_KEY, instances)
      render()
      dialog.close()
    }, 'btn line'))
    body.appendChild(actions)
    dialog.showModal()
  }

  function useTemplate(template) {
    if (template.type === 'attività' && window.HRPlanner && !window.HRLearningMode) {
      var task = Object.assign({}, template.task || {}, {
        name: template.title,
        description: template.description,
        owner: template.owner,
        checklist: (template.steps || []).map(function (step) { return { text: step, done: false } }),
      })
      window.HRPlanner.createTask(task)
      window.goId('pTasks')
      return
    }
    if (template.type === 'pianificazione' && window.HRPlanner && !window.HRLearningMode) {
      window.HRPlanner.loadWeek(template.week || 1)
      window.goId('pPlan')
      return
    }
    var instance = {
      id: uid('flow'),
      templateId: template.id,
      type: template.type,
      title: template.title,
      description: template.description,
      objective: template.objective,
      owner: template.owner,
      materials: (template.materials || []).slice(),
      notes: template.notes,
      steps: (template.steps || []).slice(),
      completed: [],
      createdAt: new Date().toISOString(),
    }
    instances.push(instance)
    write(INSTANCE_KEY, instances)
    render()
    openInstance(instance)
  }

  function duplicateTemplate(template) {
    var copy = JSON.parse(JSON.stringify(template))
    copy.id = uid('tpl')
    copy.title += ' · copia'
    templates.push(copy)
    write(TEMPLATE_KEY, templates)
    render()
  }

  function renderTemplateCard(template) {
    var card = node('div', 'card template-card')
    card.appendChild(node('span', 'template-type', template.type))
    card.appendChild(node('h3', '', template.title))
    card.appendChild(node('p', 'activity-desc', template.description))
    card.appendChild(node('div', 'ops-note', (template.steps || []).length + ' passaggi · responsabile ' + template.owner))
    var actions = node('div', 'ops-actions')
    actions.appendChild(button('Usa template', function () { useTemplate(template) }, 'btn lime'))
    actions.appendChild(button('Duplica', function () { duplicateTemplate(template) }, 'btn line'))
    actions.appendChild(button('Modifica', function () { openTemplateEditor(template) }, 'btn line'))
    card.appendChild(actions)
    return card
  }

  function renderInstanceCard(instance) {
    var card = node('div', 'card template-card instance-card')
    var complete = (instance.completed || []).length
    card.appendChild(node('span', 'template-type', instance.type))
    card.appendChild(node('h3', '', instance.title))
    card.appendChild(node('p', 'activity-desc', instance.objective))
    card.appendChild(node('div', 'template-progress', complete + '/' + (instance.steps || []).length + ' passaggi completati'))
    var progress = node('div', 'check-progress')
    var fill = node('i')
    fill.style.width = (instance.steps.length ? Math.round(complete / instance.steps.length * 100) : 0) + '%'
    progress.appendChild(fill)
    card.appendChild(progress)
    card.appendChild(button('Apri e continua', function () { openInstance(instance) }, 'btn lime'))
    return card
  }

  function render() {
    var library = document.getElementById('templateLibrary')
    var flows = document.getElementById('templateInstances')
    var customProcedures = document.getElementById('customProcedureHub')
    var checklistHub = document.getElementById('templateChecklistHub')
    if (library) {
      library.innerHTML = ''
      templates
        .filter(function (template) {
          return !window.HRLearningMode || ['attività', 'pianificazione'].indexOf(template.type) === -1
        })
        .forEach(function (template) { library.appendChild(renderTemplateCard(template)) })
    }
    if (flows) {
      flows.innerHTML = ''
      if (!instances.length) flows.appendChild(node('div', 'empty-state', 'Nessun flusso creato. Scegli “Usa template” per iniziare.'))
      instances.forEach(function (instance) { flows.appendChild(renderInstanceCard(instance)) })
    }
    if (customProcedures) {
      customProcedures.innerHTML = ''
      instances.filter(function (item) { return item.type === 'procedura' }).forEach(function (instance) {
        customProcedures.appendChild(renderInstanceCard(instance))
      })
      if (!customProcedures.children.length) customProcedures.appendChild(node('div', 'empty-state', 'Nessuna procedura personalizzata.'))
    }
    if (checklistHub) {
      checklistHub.innerHTML = ''
      instances.filter(function (item) { return item.type === 'checklist' }).forEach(function (instance) {
        checklistHub.appendChild(renderInstanceCard(instance))
      })
      if (!checklistHub.children.length) checklistHub.appendChild(node('div', 'empty-state', 'Nessuna checklist creata dai template.'))
    }
  }

  window.HRTemplates = {
    getSearchEntries: function () {
      return templates.map(function (template) {
        if (window.HRLearningMode && ['attività', 'pianificazione'].indexOf(template.type) > -1) return null
        return {
          category: 'Template',
          title: template.title,
          text: template.description + ' ' + template.objective,
          open: function () {
            window.goId('pDocuments')
            setTimeout(function () { openTemplateEditor(template) }, 50)
          },
        }
      }).filter(Boolean).concat(instances.map(function (instance) {
        return {
          category: 'Flussi salvati',
          title: instance.title,
          text: instance.objective,
          open: function () { openInstance(instance) },
        }
      }))
    },
  }

  render()
})()
