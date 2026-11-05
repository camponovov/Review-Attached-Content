(function () {
  'use strict'

  var PROCEDURE_IDS = [
    'p1', 'p2', 'p3', 'p4', 'p5', 'p8', 'p12', 'p7', 'p11', 'pB', 'pF',
    'pG', 'p13', 'p14', 'p15', 'p6', 'p9', 'p10', 'pj1', 'pj2', 'pj3',
  ]
  var PROGRESS_KEY = 'nidoHrProcedureProgressV1'
  var TEXT_RESOURCES = {
    'email-raccolta-dati': {
      title: 'Messaggio raccolta dati · Onboard',
      text: 'Ciao X,\n\nti scrivo per richiederti le informazioni necessarie per procedere con l’attivazione dei tuoi account aziendali e per la gestione delle pratiche relative al tuo inserimento.\n\nTi chiedo cortesemente di inviarmi:\n\n- La copia di un documento d’identità in corso di validità;\n- L’indirizzo esatto di residenza (e di domicilio, se differente);\n- I tuoi recapiti personali (numero di cellulare e indirizzo e-mail);\n- Un contatto di emergenza (nome, cognome, numero di telefono e rapporto con la persona, es. genitore, partner, ecc.);\n- Il tuo codice IBAN personale.\n\nNe approfitto per confermarti il nostro incontro di XX.\n\nA presto,\n\nHR de Il Nido Immobiliare',
    },
    'email-raccolta-dati-corporate': {
      title: 'E-mail raccolta dati · Corporate',
      text: 'Ciao [NOME],\n\ncon questa e-mail ti diamo ufficialmente il benvenuto in [NOME AZIENDA]!\n\nSiamo felici di averti nella nostra squadra e non vediamo l’ora di iniziare questo percorso insieme.\n\nINFORMAZIONI SULL’INSERIMENTO\n- Ruolo: [RUOLO / MANSIONE]\n- Tipologia di rapporto: [CONTRATTO / TIROCINIO / APPRENDISTATO / ALTRO]\n- Data prevista di inizio: [DATA]\n- Sede di lavoro: [SEDE]\n- Referente aziendale: [NOME E COGNOME]\n- Tutor (se previsto): [NOME E COGNOME]\n- Orario di lavoro: [ORARIO / MONTE ORE SETTIMANALE]\n\n[EVENTUALI INFORMAZIONI PERSONALIZZATE SULL’INGRESSO, SULLA FORMAZIONE O SULL’ORGANIZZAZIONE DELLE PRIME GIORNATE.]\n\nDOCUMENTAZIONE E DATI NECESSARI PER L’ATTIVAZIONE\nPer poter procedere con l’attivazione del rapporto di lavoro e con gli adempimenti amministrativi necessari, ti chiediamo gentilmente di inviarci quanto segue.\n\n1. DOCUMENTI PERSONALI\n- Copia di un documento d’identità in corso di validità (fronte e retro).\n- Copia del codice fiscale o della tessera sanitaria.\n- Eventuale permesso di soggiorno in corso di validità, se applicabile.\n\n2. DATI ANAGRAFICI E RECAPITI\n- Indirizzo completo di residenza (via, numero civico, CAP, Comune e Provincia).\n- Indirizzo di domicilio, se diverso dalla residenza.\n- Numero di cellulare.\n- Indirizzo e-mail personale.\n- Luogo e data di nascita.\n- Cittadinanza.\n\n3. INFORMAZIONI FORMATIVE E PROFESSIONALI\n- Titolo di studio conseguito, specificando istituto/università, luogo e data di conseguimento.\n- Eventuali qualifiche, attestati o certificazioni professionali rilevanti.\n- Eventuale documentazione relativa alla cessazione di precedenti rapporti di lavoro, se necessaria.\n- Scheda Anagrafico-Professionale (SAP), ove richiesta per la tipologia di inserimento.\n\nPer ottenere la SAP, se necessaria, puoi:\n- Online: scaricarla tramite il portale regionale Lavoro per Te Toscana, accedendo con SPID, CIE o CNS.\n- Tramite il Centro per l’Impiego: richiederla direttamente presso il CPI di riferimento, eventualmente fissando un appuntamento.\n\n4. DATI PER L’ACCREDITO\n- Codice IBAN del conto corrente sul quale desideri ricevere gli accrediti.\n- Intestatario del conto corrente (se diverso dal lavoratore).\n\n5. CONTATTO DI EMERGENZA\n- Nome e cognome.\n- Numero di telefono.\n- Rapporto di parentela o relazione (es. genitore, partner, familiare).\n\n6. ULTERIORI INFORMAZIONI\n[INSERIRE EVENTUALI ULTERIORI DATI O DOCUMENTI NECESSARI IN BASE ALLA TIPOLOGIA CONTRATTUALE.]\n\nCOME INVIARE LA DOCUMENTAZIONE\nPuoi rispondere direttamente a questa e-mail, inserendo le informazioni richieste nel testo e allegando i relativi documenti.\n\nTi chiediamo, se possibile, di inviarci tutto entro il [DATA DI SCADENZA], così da consentirci di completare per tempo le procedure amministrative e organizzare al meglio il tuo ingresso in azienda.\n\nPer qualsiasi dubbio o necessità di supporto, non esitare a contattarci: saremo felici di aiutarti.\n\nAncora benvenuto/a in [NOME AZIENDA]!\n\nA presto,\n\n[NOME E COGNOME]\n[RUOLO AZIENDALE]\n[NOME AZIENDA]\n[RECAPITO TELEFONICO]\n[INDIRIZZO E-MAIL]',
    },
    'messaggio-benvenuto-onboard': {
      title: 'Benvenuto/a · avvio onboarding dopo Check Academy',
      text: 'Benvenuto/a al Nido Immobiliare!\n\nSiamo entusiasti di darti il benvenuto nel nostro team e di iniziare insieme questo nuovo percorso professionale.\n\nIl Nido Immobiliare è una delle principali agenzie immobiliari della Toscana, con sedi strategiche a Pistoia, Agliana e Quarrata.\n\nI nostri valori\nLa nostra missione è fare felici i clienti e supportarli nel percorso di compravendita. Per questo, la nostra visione aziendale è quella di una vera e propria famiglia, che accoglie tutte le persone che vogliono migliorare e crescere.\n\nLa prima impressione è importante!\nIn agenzia, l’aspetto è una parte fondamentale nel comunicare professionalità e competenza ai nostri clienti, e per questo cerchiamo di mantenere uno stile elegante e curato.\n\nIl tuo ruolo nel nostro successo\nAnche se sei appena entrato a far parte del nostro team, il tuo contributo è fondamentale per il successo dell’azienda. Crediamo che ogni nuovo membro porti con sé nuove idee, energie e prospettive che arricchiscono la nostra squadra e ci aiutano a crescere insieme.\n\nProgramma della prima giornata di lunedì (xxx)\nPer farti conoscere meglio la nostra realtà, abbiamo organizzato le seguenti attività per la tua prima giornata:\n- Presentazione del percorso formativo: illustreremo il percorso di formazione e crescita professionale che abbiamo pianificato per te.\n- Incontro con i colleghi: avrai l’opportunità di conoscere i membri del team.\n- Pranzo in agenzia: concluderemo la mattinata con un pranzo offerto dall’agenzia, un momento per conoscersi meglio e favorire lo spirito di squadra.\n\nSiamo certi che insieme raggiungeremo grandi traguardi e non vediamo l’ora di iniziare questa avventura con te!\n\nBenvenuto/a a bordo!\n\n✨\n\nHR de il Nido Immobiliare',
    },
    'ticket-elia-account': {
      title: 'Dati per ticket account · Elia',
      text: 'Ciao Elia,\nper il ticket di creazione/attivazione degli account aziendali:\n\nNome e Cognome: [NOME E COGNOME]\nNumero di telefono: [NUMERO]\nE-mail personale: [E-MAIL]\nUfficio di riferimento: [UFFICIO]\nTutor: [NOME TUTOR]',
    },
    'agenda-pippo-realsmart': {
      title: 'Dati per agenda Real Smart · Pippo',
      text: 'Ciao Pippo,\nper la creazione dell’agenda della prima settimana su Real Smart:\n\nNome e Cognome: [NOME E COGNOME]\nNumero di telefono: [NUMERO]\nE-mail personale: [E-MAIL]\nUfficio di riferimento: [UFFICIO]\nTutor: [NOME TUTOR]',
    },
    'scheda-onboard-tutor': {
      title: 'Scheda Onboard per il tutor',
      text: 'SCHEDA ONBOARD · USO INTERNO\n\nNome e cognome: [Nome]\nRuolo / percorso: [Ruolo]\nSede: [Sede]\nData di avvio: [Data]\n      Tutor: [Tutor]\n\nAgenda della settimana: [Link o riferimento]\nObiettivi e attività previste: [Sintesi]\nAccessi — solo stato, mai password:\n- Real Smart: [Richiesto / Attivo / Bloccato]\n- Google Drive / N-Space: [Richiesto / Attivo / Bloccato]\n- Forte: [Predisposto / Attivo / Bloccato]\n- Origin: [Predisposto / Attivo / Bloccato]\n\nOsservazioni per l’affiancamento: [Fatti osservabili, non dati personali]\nCheck tutor: [Martedì 18:00] [Giovedì 18:00]\nValutazioni: [Nido Academy] [Forte Academy] [Checklist Forte]\nEsito finale e motivazione: [Da compilare venerdì]',
    },
    'messaggio-standard-tutor': {
      title: 'Messaggio standard per il tutor',
      text: 'Ciao [Nome Tutor],\nti confermo l’avvio di [Nome Onboard] per [Ruolo/Percorso] presso [Sede] da [Data].\n\nQui trovi la scheda Onboard e l’agenda della settimana: [Link/Riferimento].\nTi chiediamo di seguire i check previsti, annotare fatti osservabili e completare le valutazioni in Nido Academy, Forte Academy e la checklist finale su Forte.\n\nNella scheda trovi soltanto lo stato degli accessi: le password non devono essere condivise. Per eventuali blocchi usa i referenti indicati nella procedura.\n\nGrazie.',
    },
  }
  var DOCUMENTS = [
    ['NIDO HR EVOLUTION PATH','Percorso formativo mensile HR','Pianificazione e sviluppo','Da verificare','Non dichiarata','/documenti/nido-hr-evolution-path.pdf'],
    ['Da Onboard a Real Estate','Completamento del percorso formativo','Onboarding','Da verificare','Non dichiarata','/documenti/da-onboard-a-real-estate.pdf'],
    ['Foglio Raffica','Domande opzionali per il colloquio','Talent Acquisition','Da verificare','Non dichiarata','/documenti/foglio-raffica.pdf'],
    ['Materiale Step 1','Materiale Academy Property Finder','Learning & Development','Da verificare','Non dichiarata','/documenti/materiale-level-1.pdf'],
    ['Materiale Step 2','Materiale Academy Listing Advisor','Learning & Development','Da verificare','Non dichiarata','/documenti/materiale-level-2.pdf'],
    ['Materiale Step 3','Materiale Academy Buy Advisor','Learning & Development','Da verificare','Non dichiarata','/documenti/materiale-level-3.pdf'],
    ['Questionario clima','Raccolta strutturata sul clima aziendale','People & Culture','Da verificare','Non dichiarata','/documenti/questionario-clima.pdf'],
    ['Checklist uscita','Controlli del processo Nido Exit','Uscita','Da verificare','Non dichiarata','/documenti/checklist-uscita.html'],
    ['Modulo Nido Exit','Modulo operativo per l’uscita','Uscita','Da verificare','Non dichiarata','/documenti/modulo-nido-exit.html'],
    ['E-mail raccolta dati','Template copiabile per l’avvio','Onboarding','Da verificare','Non dichiarata','text:email-raccolta-dati'],
    ['Messaggio benvenuto Onboard','Template da inviare dopo Check Academy per avvio onboarding','Onboarding','Da verificare','Non dichiarata','text:messaggio-benvenuto-onboard'],
    ['Dati ticket account · Elia','Promemoria dati necessari per ticket di creazione account','Onboarding','Da verificare','Non dichiarata','text:ticket-elia-account'],
    ['Dati agenda Real Smart · Pippo','Promemoria dati necessari per creare agenda Real Smart','Onboarding','Da verificare','Non dichiarata','text:agenda-pippo-realsmart'],
    ['Scheda Onboard tutor','Scheda interna per tutor e accessi','Onboarding','Da verificare','Non dichiarata','text:scheda-onboard-tutor'],
    ['Messaggio standard tutor','Comunicazione pronta per il tutor','Onboarding','Da verificare','Non dichiarata','text:messaggio-standard-tutor'],
    ['Istruzioni Guida HR','Istruzioni per utilizzare il sistema','Sistema','Generato e verificato','Sistema 1.0','/documenti/istruzioni-guida-hr.pdf'],
    ['Checklist controllo processo HR','Controlli trasversali del processo','Sistema','Generato e verificato','Sistema 1.0','/documenti/checklist-controllo-processo-hr.pdf'],
    ['Modelli operativi HR','Raccolta dei template copiabili','Sistema','Generato e verificato','Sistema 1.0','/documenti/modelli-operativi-hr.pdf'],
    ['Riepilogo processo HR','Sintesi delle fasi e delle dipendenze','Sistema','Generato e verificato','Sistema 1.0','/documenti/riepilogo-processo-hr.pdf'],
    ['Psicosoluzioni · Autosabotaggio','Approfondimento The Job Game','The Job Game','Ricevuto · da verificare','Non dichiarata','/documenti/the-job-game/autosabotaggio.pdf'],
    ['Psicosoluzioni · Conoscenza definitiva','Approfondimento The Job Game','The Job Game','Ricevuto · da verificare','Non dichiarata','/documenti/the-job-game/conoscenza-definitiva.pdf'],
    ['Psicosoluzioni · Difendersi preventivamente','Approfondimento The Job Game','The Job Game','Ricevuto · da verificare','Non dichiarata','/documenti/the-job-game/difendersi-preventivamente.pdf'],
    ['Psicosoluzioni · Aiuto che danneggia','Esercizi The Job Game','The Job Game','Ricevuto · da verificare','Non dichiarata','/documenti/the-job-game/aiuto-che-danneggia.pdf'],
    ['Psicosoluzioni · Rimandare','Approfondimento The Job Game','The Job Game','Ricevuto · da verificare','Non dichiarata','/documenti/the-job-game/rimandare.pdf'],
    ['Psicosoluzioni · Silenzio assoluto','Approfondimento The Job Game','The Job Game','Ricevuto · da verificare','Non dichiarata','/documenti/the-job-game/silenzio-assoluto.pdf'],
    ['Torneo Padel · programma','Programma edizione precedente','Eventi','Ricevuto · da verificare','Non dichiarata','/documenti/Programma_Torneo_Padel.pdf'],
    ['Torneo Padel · segnapunti','Materiale edizione precedente','Eventi','Ricevuto · da verificare','Non dichiarata','/documenti/NIDO_PADEL_Segnapunti.pdf'],
    ['Torneo Padel · materiale v2','Materiale edizione precedente','Eventi','Ricevuto · da verificare','Non dichiarata','/documenti/NIDO_PADEL_v2.pdf'],
    ['Checklist raccolta dati Onboard','Checklist ufficiale richiamata dalla procedura','Onboarding','Mancante','Non disponibile',''],
    ['Procedura Banca Dati HR e profili','Procedura ufficiale per dati e profili','Sistemi HR','Mancante','Non disponibile',''],
  ]
  var DEPENDENCIES = [
    {
      title: 'Badge agenti · Canva',
      status: 'Dipendenza esterna non verificata',
      need: 'Esportazione ufficiale PDF o PNG del modello badge, più indicazione dei campi modificabili.',
    },
    {
      title: 'Presentazione Nido R(Evolution) · Canva',
      status: 'Dipendenza esterna non verificata',
      need: 'Esportazione ufficiale PDF o PPT della presentazione, con conferma della versione approvata.',
    },
    {
      title: 'One Stop / N-Space HR',
      status: 'Accesso autenticato non disponibile',
      need: 'URL di login e profilo test read-only senza dati personali, oppure schermate/video anonimizzati del flusso.',
    },
    {
      title: 'Forte, Origin e Nido Academy',
      status: 'Flussi privati non eseguibili',
      need: 'Profilo test read-only o export anonimizzato delle schermate citate nelle procedure.',
    },
    {
      title: 'Programmazione compleanni · Nido Today',
      status: 'Automazione non integrata',
      need: 'API, webhook o procedura ufficiale di programmazione; in assenza di integrazione il controllo resta manuale.',
    },
    {
      title: 'Stato di approvazione dei documenti',
      status: 'Stato e versione non confermati',
      need: 'Per ogni file: Approvato, Obsoleto o Da verificare. Non servono password né dati personali.',
    },
  ]

  function byId(id) {
    return document.getElementById(id)
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

  function plain(text) {
    return (text || '').replace(/\s+/g, ' ').trim()
  }

  function createDialog(id, title) {
    var dialog = byId(id)
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
    dialog.addEventListener('click', function (event) {
      if (event.target === dialog) dialog.close()
    })
    document.body.appendChild(dialog)
    return dialog
  }

  function copyText(text, control) {
    var original = control.textContent
    function done() {
      control.textContent = 'Testo copiato'
      control.classList.add('copied')
      setTimeout(function () {
        control.textContent = original
        control.classList.remove('copied')
      }, 1600)
    }
    function fallback() {
      var area = node('textarea')
      area.value = text
      document.body.appendChild(area)
      area.select()
      document.execCommand('copy')
      area.remove()
      done()
    }
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(done).catch(function () {
        fallback()
      })
    } else fallback()
  }

  function appendTemplateText(container, text) {
    var preview = node('div', 'message-preview')
    text.split(/(\[[^\]]+\])/g).forEach(function (part) {
      preview.appendChild(
        /^\[[^\]]+\]$/.test(part) ? node('mark', 'pill', part) : document.createTextNode(part),
      )
    })
    container.appendChild(preview)
  }

  function openTextResource(key) {
    var resource = TEXT_RESOURCES[key]
    if (!resource) return
    var dialog = createDialog('textResourceDialog', resource.title)
    dialog.querySelector('.dialog-head h2').textContent = resource.title
    var body = dialog.querySelector('.dialog-body')
    body.innerHTML = ''
    body.appendChild(node('p', 'ops-note', 'I campi tra parentesi quadre devono essere personalizzati prima dell’invio.'))
    appendTemplateText(body, resource.text)
    var actions = node('div', 'ops-actions')
    var copy = button('Copia testo', function () { copyText(resource.text, copy) }, 'btn lime')
    actions.appendChild(copy)
    body.appendChild(actions)
    dialog.showModal()
  }

  window.HRText = { open: openTextResource }

  function openResource(url, title) {
    var dialog = createDialog('resourceDialog', title || 'Risorsa')
    dialog.querySelector('.dialog-head h2').textContent = title || 'Risorsa'
    var body = dialog.querySelector('.dialog-body')
    body.innerHTML = ''
    if (url.indexOf('mailto:') === 0) {
      var address = url.replace('mailto:', '')
      body.appendChild(node('p', '', 'Contatto operativo: ' + address))
      var copyAddress = button('Copia indirizzo', function () {
        copyText(address, copyAddress)
      }, 'btn lime')
      body.appendChild(copyAddress)
    } else {
      var dependency = null
      if (url.indexOf('mcjfmarekyu81po') > -1) dependency = DEPENDENCIES[0]
      if (url.indexOf('xc228yaletu2y7q') > -1) dependency = DEPENDENCIES[1]
      if (url.indexOf('nspace-one-stop-dashboard') > -1) dependency = DEPENDENCIES[2]
      if (dependency) {
        var diagnostic = node('div', 'ops-alert')
        diagnostic.appendChild(node('strong', '', dependency.status))
        diagnostic.appendChild(node('div', '', 'Materiale necessario: ' + dependency.need))
        body.appendChild(diagnostic)
      }
      body.appendChild(node('p', 'ops-note', 'L’anteprima incorporata non è disponibile. Apri la risorsa direttamente oppure copia il link per ritrovarla su Google Drive.'))
      var actions = node('div', 'ops-actions')
      var open = node('a', 'btn lime', 'Apri risorsa')
      open.href = url
      open.target = '_blank'
      open.rel = 'noopener noreferrer'
      actions.appendChild(open)
      var copyLink = button('Copia link', function () {
        copyText(new URL(url, window.location.href).href, copyLink)
      }, 'btn line')
      actions.appendChild(copyLink)
      var driveSearch = node('a', 'btn line', 'Cerca il titolo su Google Drive')
      driveSearch.href = 'https://drive.google.com/drive/u/0/search?q=' + encodeURIComponent(title || url)
      driveSearch.target = '_blank'
      driveSearch.rel = 'noopener noreferrer'
      actions.appendChild(driveSearch)
      body.appendChild(actions)
    }
    dialog.showModal()
  }

  window.HRResources = { open: openResource }

  function renderDocumentInventory() {
    var inventory = byId('documentInventory')
    if (inventory) {
      var table = node('table')
      var head = node('tr')
      ;['Nome','Scopo','Fase','Stato','Versione','Azione'].forEach(function (label) {
        head.appendChild(node('th', '', label))
      })
      table.appendChild(head)
      DOCUMENTS.forEach(function (item) {
        var row = node('tr')
        item.slice(0, 5).forEach(function (value) { row.appendChild(node('td', '', value)) })
        var action = node('td')
        if (item[5]) {
          action.appendChild(button('Apri', function () {
            if (item[5].indexOf('text:') === 0) openTextResource(item[5].slice(5))
            else openResource(item[5], item[0])
          }, 'btn line'))
        } else {
          action.appendChild(node('span', 'tag hot', 'Materiale richiesto'))
        }
        row.appendChild(action)
        table.appendChild(row)
      })
      inventory.innerHTML = ''
      inventory.appendChild(table)
    }
    var dependencies = byId('dependencyInventory')
    if (dependencies) {
      dependencies.innerHTML = ''
      DEPENDENCIES.forEach(function (item) {
        var card = node('div', 'card document-card missing')
        card.appendChild(node('h3', '', item.title))
        card.appendChild(node('div', 'tag hot', item.status))
        card.appendChild(node('p', 'activity-desc', item.need))
        dependencies.appendChild(card)
      })
    }
  }

  function procedureLabel(element) {
    if (element.tagName === 'DETAILS') {
      var summary = element.querySelector('summary')
      return plain(summary ? summary.textContent : '')
    }
    var heading = element.matches('h2,h3') ? element : element.querySelector('h2,h3')
    return plain(heading ? heading.textContent : '')
  }

  var procedureProgress = read(PROGRESS_KEY, {})

  function enhanceProcedure(panel) {
    if (!panel || panel.dataset.procedureEnhanced) return
    panel.dataset.procedureEnhanced = 'true'
    var candidates = Array.prototype.slice.call(
      panel.querySelectorAll(':scope > h2, :scope > details'),
    ).filter(function (element) {
      return procedureLabel(element)
    }).slice(0, 12)
    if (!candidates.length) {
      candidates = Array.prototype.slice.call(panel.querySelectorAll(':scope > .card'))
        .filter(function (element) { return procedureLabel(element) })
        .slice(0, 8)
    }
    if (!candidates.length) {
      candidates = Array.prototype.slice.call(panel.querySelectorAll('details'))
        .filter(function (element) { return procedureLabel(element) })
        .slice(0, 12)
    }
    if (!candidates.length) return

    var saved = Array.isArray(procedureProgress[panel.id])
      ? procedureProgress[panel.id]
      : []
    var guide = node('div', 'procedure-guide')
    var head = node('div', 'procedure-guide-head')
    var intro = node('div')
    intro.appendChild(node('span', 'section-label', 'Percorso operativo'))
    intro.appendChild(node('h2', '', 'Segui i passaggi in ordine'))
    var lead = panel.querySelector(':scope > .lead')
    intro.appendChild(
      node(
        'p',
        'objective',
        'Obiettivo: ' + plain(lead ? lead.textContent : panel.dataset.t),
      ),
    )
    head.appendChild(intro)
    var resume = button('Riprendi', function () {
      var current = candidates.find(function (_, index) {
        return saved.indexOf(index) === -1
      }) || candidates[0]
      current.scrollIntoView({ behavior: 'smooth', block: 'start' })
      if (current.tagName === 'DETAILS') current.open = true
    }, 'btn line resume-btn')
    head.appendChild(resume)
    guide.appendChild(head)
    var progress = node('div', 'procedure-progress')
    var bar = node('i')
    progress.appendChild(bar)
    guide.appendChild(progress)
    var steps = node('div', 'procedure-steps')
    guide.appendChild(steps)
    var meta = node('div', 'procedure-meta')
    var materialCount = panel.querySelectorAll('[data-link],a[href]').length
    var noteCount = panel.querySelectorAll('.tip,.web').length
    meta.appendChild(node('span', 'tag', materialCount + ' materiali o collegamenti'))
    meta.appendChild(node('span', 'tag', noteCount + ' note operative'))
    guide.appendChild(meta)

    function update() {
      steps.innerHTML = ''
      var completed = 0
      var currentFound = false
      candidates.forEach(function (target, index) {
        var done = saved.indexOf(index) > -1
        if (done) completed += 1
        var row = node('label', 'procedure-step' + (done ? ' done' : ''))
        if (!done && !currentFound) {
          row.classList.add('current')
          currentFound = true
        }
        var checkbox = node('input')
        checkbox.type = 'checkbox'
        checkbox.checked = done
        checkbox.addEventListener('change', function () {
          if (checkbox.checked && saved.indexOf(index) === -1) saved.push(index)
          if (!checkbox.checked) saved = saved.filter(function (item) { return item !== index })
          procedureProgress[panel.id] = saved
          write(PROGRESS_KEY, procedureProgress)
          update()
          renderProcedureProgress()
        })
        row.appendChild(checkbox)
        row.appendChild(node('span', '', (index + 1) + ' · ' + procedureLabel(target)))
        var open = button('Apri', function (event) {
          event.preventDefault()
          target.scrollIntoView({ behavior: 'smooth', block: 'start' })
          if (target.tagName === 'DETAILS') target.open = true
        }, 'btn line')
        row.appendChild(open)
        steps.appendChild(row)
      })
      var percentage = Math.round(completed / candidates.length * 100)
      bar.style.width = percentage + '%'
      guide.dataset.completed = String(completed)
      guide.dataset.total = String(candidates.length)
      resume.textContent = completed === candidates.length ? 'Rivedi procedura' : 'Riprendi'
    }

    var anchor = lead || panel.querySelector(':scope > h1')
    if (anchor && anchor.nextSibling) panel.insertBefore(guide, anchor.nextSibling)
    else panel.insertBefore(guide, panel.firstChild)
    update()
  }

  function renderProcedureProgress() {
    var box = byId('procedureProgressHub')
    if (!box) return
    box.innerHTML = ''
    var rows = PROCEDURE_IDS.map(function (id) {
      var panel = byId(id)
      var guide = panel && panel.querySelector('.procedure-guide')
      if (!panel || !guide) return null
      return {
        id: id,
        title: panel.dataset.t,
        complete: Number(guide.dataset.completed || 0),
        total: Number(guide.dataset.total || 0),
      }
    }).filter(Boolean)
    rows.forEach(function (item) {
      var row = node('div', 'dash-item')
      var content = node('div')
      content.appendChild(node('b', '', item.title))
      content.appendChild(
        node('small', '', item.complete + '/' + item.total + ' passaggi completati'),
      )
      row.appendChild(content)
      row.appendChild(button('Apri', function () { window.goId(item.id) }, 'btn line'))
      box.appendChild(row)
    })
  }

  function taskChecklistProgress(task) {
    var checklist = task.checklist || []
    var completed = checklist.filter(function (item) { return item.done }).length
    return { completed: completed, total: checklist.length }
  }

  function taskMeta(task) {
    var parts = [task.category]
    if (task.owner) parts.push(task.owner)
    if (task.deadline) {
      parts.push('scadenza ' + new Date(task.deadline + 'T12:00:00').toLocaleDateString('it-IT'))
    }
    return parts.join(' · ')
  }

  function renderActivities() {
    if (!window.HRPlanner) return
    var tasks = window.HRPlanner.getTasks()
    var hub = byId('activityHub')
    var checklistHub = byId('checklistHub')
    if (hub) hub.innerHTML = ''
    if (checklistHub) checklistHub.innerHTML = ''
    tasks.forEach(function (task) {
      var progress = taskChecklistProgress(task)
      if (hub) {
        var card = node('div', 'card activity-card' + (task.status === 'completata' ? ' done' : ''))
        var head = node('div', 'activity-head')
        var title = node('div')
        title.appendChild(node('h3', '', task.name))
        title.appendChild(node('div', 'ops-note', taskMeta(task)))
        head.appendChild(title)
        var status = node('span', 'tag')
        status.appendChild(node('i', 'status-dot ' + task.status.replace(/\s+/g, '-')))
        status.appendChild(document.createTextNode(task.status))
        head.appendChild(status)
        card.appendChild(head)
        if (task.description) card.appendChild(node('p', 'activity-desc', task.description))
        var tags = node('div', 'task-meta')
        tags.appendChild(node('span', 'tag', 'priorità ' + task.priority))
        if (task.day && task.day !== 'auto') tags.appendChild(node('span', 'tag', task.day))
        if (task.start) tags.appendChild(node('span', 'tag', task.start))
        card.appendChild(tags)
        if (progress.total) {
          var progressBar = node('div', 'check-progress')
          var fill = node('i')
          fill.style.width = Math.round(progress.completed / progress.total * 100) + '%'
          progressBar.appendChild(fill)
          card.appendChild(progressBar)
          ;(task.checklist || []).forEach(function (item, index) {
            var label = node('label', 'mini-check')
            var checkbox = node('input')
            checkbox.type = 'checkbox'
            checkbox.checked = item.done
            checkbox.addEventListener('change', function () {
              window.HRPlanner.toggleCheck(task.id, index)
            })
            label.appendChild(checkbox)
            label.appendChild(node('span', '', item.text))
            card.appendChild(label)
          })
        }
        var actions = node('div', 'ops-actions')
        actions.appendChild(button('Modifica', function () {
          window.HRPlanner.editTask(task)
        }, 'btn line'))
        actions.appendChild(button(
          task.status === 'completata' ? 'Riapri' : 'Completa',
          function () { window.HRPlanner.completeTask(task.id) },
          'btn lime',
        ))
        if (task.procedure) {
          actions.appendChild(button('Procedura', function () {
            window.goId(task.procedure)
          }, 'btn line'))
        }
        card.appendChild(actions)
        hub.appendChild(card)
      }
      if (checklistHub && progress.total) {
        var row = node('div', 'dash-item')
        var content = node('div')
        content.appendChild(node('b', '', task.name))
        content.appendChild(
          node('small', '', progress.completed + '/' + progress.total + ' passaggi'),
        )
        row.appendChild(content)
        row.appendChild(button('Apri', function () { window.goId('pTasks') }, 'btn line'))
        checklistHub.appendChild(row)
      }
    })
    if (hub && !tasks.length) hub.appendChild(node('div', 'empty-state', 'Nessuna attività presente.'))
    if (checklistHub && !checklistHub.children.length) {
      checklistHub.appendChild(node('div', 'empty-state', 'Nessuna checklist collegata alle attività.'))
    }
  }

  function dayName(date) {
    return ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'][date.getDay()]
  }

  function dashboardRow(task) {
    var row = node('div', 'dash-item')
    var content = node('div')
    content.appendChild(node('b', '', task.name))
    content.appendChild(
      node('small', '', (task.start ? task.start + ' · ' : '') + taskMeta(task)),
    )
    row.appendChild(content)
    row.appendChild(button('Apri', function () { window.HRPlanner.editTask(task) }, 'btn line'))
    return row
  }

  function renderDashboard() {
    if (!window.HRPlanner || !byId('dashNext')) return
    var tasks = window.HRPlanner.getTasks()
    var now = new Date()
    byId('todayDate').textContent = now.toLocaleDateString('it-IT', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
    var active = tasks.filter(function (task) { return task.status !== 'completata' })
    var today = active.filter(function (task) {
      return task.frequency === 'giornaliera' || task.day === dayName(now)
    }).sort(function (a, b) {
      return (a.start || '99:99').localeCompare(b.start || '99:99') || b.priority - a.priority
    })
    var priorities = active.slice().sort(function (a, b) {
      var urgency = { alta: 4, media: 3, normale: 2, bassa: 1 }
      return (urgency[b.urgency] || 0) - (urgency[a.urgency] || 0) || b.priority - a.priority
    }).slice(0, 4)
    var deadlines = active.filter(function (task) { return task.deadline }).sort(function (a, b) {
      return a.deadline.localeCompare(b.deadline)
    }).slice(0, 4)
    var next = today[0] || priorities[0]
    var nextBox = byId('dashNext')
    nextBox.innerHTML = ''
    if (next) {
      nextBox.appendChild(node('h2', '', next.name))
      nextBox.appendChild(node('p', 'activity-desc', taskMeta(next)))
      var actions = node('div', 'ops-actions')
      actions.appendChild(button('Inizia', function () {
        window.HRPlanner.editTask(next)
      }, 'btn lime'))
      if (next.procedure) {
        actions.appendChild(button('Apri procedura', function () {
          window.goId(next.procedure)
        }, 'btn line'))
      }
      nextBox.appendChild(actions)
    } else {
      nextBox.appendChild(node('div', 'empty-state', 'Non ci sono attività aperte.'))
    }
    function fillList(id, items, empty) {
      var box = byId(id)
      box.innerHTML = ''
      if (!items.length) box.appendChild(node('div', 'empty-state', empty))
      items.forEach(function (task) { box.appendChild(dashboardRow(task)) })
    }
    fillList('dashToday', today.slice(0, 6), 'Nessuna attività prevista per oggi.')
    fillList('dashPriorities', priorities, 'Nessuna priorità aperta.')
    fillList('dashDeadlines', deadlines, 'Nessuna scadenza impostata.')
    var completed = tasks.filter(function (task) { return task.status === 'completata' }).length
    var percentage = tasks.length ? Math.round(completed / tasks.length * 100) : 0
    byId('dashCompleted').textContent = completed
    byId('dashTotal').textContent = tasks.length
    byId('dashProgress').style.setProperty('--progress', percentage + '%')
    byId('dashProgress').querySelector('b').textContent = percentage + '%'
  }

  var searchTasks = []

  function searchIndex() {
    var entries = []
    PROCEDURE_IDS.forEach(function (id) {
      var panel = byId(id)
      if (!panel) return
      entries.push({
        category: 'Procedure',
        title: panel.dataset.t,
        text: plain(panel.textContent).slice(0, 260),
        open: function () { window.goId(id) },
      })
    })
    if (!window.HRLearningMode) searchTasks.forEach(function (task) {
      entries.push({
        category: 'Attività',
        title: task.name,
        text: taskMeta(task) + ' ' + (task.description || ''),
        open: function () {
          window.goId('pTasks')
          setTimeout(function () {
            var titles = document.querySelectorAll('#activityHub h3')
            Array.prototype.some.call(titles, function (title) {
              if (title.textContent !== task.name) return false
              title.closest('.activity-card').scrollIntoView({ behavior: 'smooth', block: 'center' })
              return true
            })
          }, 50)
        },
      })
    })
    Array.prototype.forEach.call(byId('pDocuments').querySelectorAll('a'), function (link) {
      entries.push({
        category: 'Documenti',
        title: plain(link.textContent),
        text: plain(link.closest('.document-card').textContent),
        open: function () { openResource(link.href, plain(link.textContent)) },
      })
    })
    entries.push({
      category: 'Checklist',
      title: 'Compleanni · Nido Today',
      text: 'Preparazione programmazione verifica compleanni',
      open: function () { window.goId('pBirth') },
    })
    Object.keys(TEXT_RESOURCES).forEach(function (key) {
      var resource = TEXT_RESOURCES[key]
      entries.push({
        category: 'Template testuali',
        title: resource.title,
        text: resource.text,
        open: function () { openTextResource(key) },
      })
    })
    if (window.HRTemplates) {
      entries = entries.concat(window.HRTemplates.getSearchEntries())
    }
    if (window.HRLearning) {
      entries = entries.concat(window.HRLearning.getSearchEntries())
    }
    return entries
  }

  function setupSearch() {
    var input = byId('globalSearch')
    var results = byId('searchResults')
    function render() {
      var query = plain(input.value).toLowerCase()
      results.innerHTML = ''
      if (query.length < 2) {
        results.hidden = true
        return
      }
      var matches = searchIndex().filter(function (item) {
        return (item.title + ' ' + item.text).toLowerCase().indexOf(query) > -1
      }).slice(0, 24)
      var grouped = {}
      matches.forEach(function (item) {
        if (!grouped[item.category]) grouped[item.category] = []
        grouped[item.category].push(item)
      })
      Object.keys(grouped).forEach(function (category) {
        var group = node('div', 'search-group')
        group.appendChild(node('h3', '', category))
        grouped[category].forEach(function (item) {
          var control = node('button', 'search-result')
          control.type = 'button'
          control.appendChild(node('b', '', item.title))
          control.appendChild(node('span', '', item.text))
          control.addEventListener('click', function () {
            item.open()
            input.value = ''
            results.hidden = true
          })
          group.appendChild(control)
        })
        results.appendChild(group)
      })
      if (!matches.length) {
        results.appendChild(node('div', 'empty-state', 'Nessun risultato. Prova con un termine più specifico.'))
      }
      results.hidden = false
    }
    input.addEventListener('input', render)
    input.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        input.value = ''
        results.hidden = true
      }
    })
    document.addEventListener('click', function (event) {
      if (!event.target.closest('.search-wrap')) results.hidden = true
    })
  }

  function refreshTasks() {
    searchTasks = window.HRPlanner ? window.HRPlanner.getTasks() : []
    renderActivities()
    renderDashboard()
  }

  PROCEDURE_IDS.forEach(function (id) { enhanceProcedure(byId(id)) })
  renderDocumentInventory()
  renderProcedureProgress()
  setupSearch()
  refreshTasks()
  document.addEventListener('hr:tasks-updated', refreshTasks)
  document.querySelectorAll('[data-open-task]').forEach(function (control) {
    control.addEventListener('click', function () {
      setTimeout(function () {
        var form = byId('taskForm')
        form.closest('details').open = true
        byId('taskName').focus()
      }, 50)
    })
  })
  document.addEventListener('click', function (event) {
    var textControl = event.target.closest && event.target.closest('[data-text-resource]')
    if (textControl) {
      event.preventDefault()
      openTextResource(textControl.dataset.textResource)
      return
    }
    var link = event.target.closest && event.target.closest('a[href]')
    if (!link || link.getAttribute('href') === '#' || link.dataset.allowDownload) return
    var href = link.getAttribute('href')
    if (href.indexOf('/guida-hr.html#') === 0) {
      event.preventDefault()
      window.goId(href.split('#')[1])
      return
    }
    if (href.charAt(0) === '#' && byId(href.slice(1))) return
    event.preventDefault()
    openResource(link.href, plain(link.textContent))
  }, true)
})()
