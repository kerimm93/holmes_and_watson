/* ════════════════════════════════════════════════════════════════
   BakerstreetRPG — Prototype dummy data
   Sourced from the real case file (study-in-scarlet.json) so the
   redesign reads with authentic content. NO game logic lives here.
   ════════════════════════════════════════════════════════════════ */
window.PROTO = {

  /* ── Case shelf (registry.json, trimmed) ─────────────────────── */
  cases: [
    { id: 'scarlet',   title: 'Eine Studie in Scharlachrot', original: 'A Study in Scarlet',
      year: 1887, type: 'Roman', status: 'active',
      teaser: 'Ein Toter ohne Wunde. Ein Wort in Blut: RACHE.' },
    { id: 'sign-four', title: 'Das Zeichen der Vier', original: 'The Sign of the Four',
      year: 1890, type: 'Roman', status: 'available',
      teaser: 'Eine Perle pro Jahr. Und ein Pakt, der nie vergeben wurde.' },
    { id: 'hound',     title: 'Der Hund der Baskervilles', original: 'The Hound of the Baskervilles',
      year: 1902, type: 'Roman', status: 'available',
      teaser: 'Ein Fluch über dem Moor. Und Pfotenabdrücke, riesengroß.' },
    { id: 'bohemia',   title: 'Ein Skandal in Böhmen', original: 'A Scandal in Bohemia',
      year: 1891, type: 'Erzählung', status: 'available',
      teaser: 'Die eine Frau, die Sherlock Holmes überlistete.' },
    { id: 'speckled',  title: 'Das gesprenkelte Band', original: 'The Speckled Band',
      year: 1892, type: 'Erzählung', status: 'locked',
      teaser: 'Versiegelt — schließen Sie zunächst einen Fall ab.' },
    { id: 'valley',    title: 'Das Tal der Angst', original: 'The Valley of Fear',
      year: 1915, type: 'Roman', status: 'locked',
      teaser: 'Versiegelt — schließen Sie zunächst einen Fall ab.' }
  ],

  /* ── Active case meta ────────────────────────────────────────── */
  active: {
    title: 'Eine Studie in Scharlachrot',
    kicker: 'Ein Watson-Bericht · Baker Street',
    ornament: 'Das Spiel ist im Gange',
    dateline: 'London · März 1881',
    deck: 'Sonderausgabe · Scotland Yard bittet um Diskretion',
    byline: 'Niedergeschrieben von Dr. John H. Watson, M.D.',
    summary: [
      'Es war im März des Jahres 1881, als ich in die Baker Street 221B einzog, um mit meinem merkwürdigen Mitbewohner Sherlock Holmes das Quartier zu teilen. Die Stille unserer Tage wurde jäh unterbrochen, als Inspektor Gregson von Scotland Yard erschien.',
      'In einem leerstehenden Haus in der Brixton Road, Nummer 3 Lauriston Gardens, fand man die Leiche eines Herrn. Der Mann war wohlgekleidet, von stattlicher Gestalt, etwa fünfzig Jahre alt. Keine Wunden, doch der Raum war mit Blutspritzern übersät.',
      'Und an der Wand, mit Blut geschrieben, das einzige Wort: <strong>RACHE.</strong>'
    ],
    quote: 'Wenn du das Unmögliche ausgeschlossen hast, muss das, was übrig bleibt, die Wahrheit sein.'
  },

  /* ── Investigation phases (study-in-scarlet.json) ────────────── */
  phases: [
    { id: 'crime_scene',  label: 'Tatortbesichtigung',     short: 'Tatort' },
    { id: 'first_leads',  label: 'Erste Ermittlungen',     short: 'Spuren' },
    { id: 'deep_inquiry', label: 'Tiefe Ermittlung',       short: 'Verhör' },
    { id: 'closing_in',   label: 'Schlinge zieht sich zu', short: 'Indizien' },
    { id: 'ready',        label: 'Bereit zur Anklage',     short: 'Anklage' }
  ],

  /* ── Evidence catalogue ──────────────────────────────────────── */
  evidence: [
    { id: 'e1', tag: 'physical',  title: 'Blutspuren ohne Wunde', loc: '3 Lauriston Gardens',
      ref: 'ASS-001',
      desc: 'Reichlich Blut im Zimmer, das nicht vom Opfer stammt. Der Täter hatte Nasenbluten aus Aufregung.',
      note: 'Holmes kniete sich, betrachtete die Tropfen lange und murmelte: „Das Blut ist nicht das seine."' },
    { id: 'e2', tag: 'physical',  title: 'Schrift: RACHE', loc: '3 Lauriston Gardens',
      ref: 'ASS-002',
      desc: 'In deutschem Stil mit Blut an die Wand geschrieben. Nicht „Rachel", sondern das deutsche Wort für Rache.',
      note: 'Lestrade hielt es für einen abgebrochenen Frauennamen. Holmes wusste es besser.' },
    { id: 'e4', tag: 'physical',  title: 'Asche: Trichinopoly-Zigarre', loc: '3 Lauriston Gardens',
      ref: 'ASS-004',
      desc: 'Asche einer langen Trichinopoly-Zigarre am Tatort, in einer Ecke des Zimmers.',
      note: 'Holmes hat eine Monographie über 140 Tabaksorten verfasst. Diese kannte er sofort.' },
    { id: 'e5', tag: 'physical',  title: 'Kutschspuren im Schlamm', loc: 'Gartenweg',
      ref: 'ASS-005',
      desc: 'Vierrädriges Gefährt, ein Pferd mit drei neuen und einem alten Hufeisen.',
      note: 'Eine Droschke, kein Privatwagen. Der Fahrer wartete im Regen.' },
    { id: 'e8', tag: 'testimony', title: 'Aussage: Charpentier-Streit', loc: 'Charpentier-Pension',
      ref: 'ASS-008',
      desc: 'Arthur Charpentier stritt lautstark mit Drebber, der seine Schwester Alice belästigt hatte.',
      note: 'Mrs. Charpentier wusste mehr, als sie zunächst zugeben wollte.' },
    { id: 'e9', tag: 'document',  title: 'Telegramm aus Cleveland', loc: 'Scotland Yard',
      ref: 'ASS-009',
      desc: 'Gregsons Anfrage an die Polizei von Cleveland bestätigt: ein „J.H." ist in Europa unterwegs.',
      note: 'Die Initialen bedeuteten Gregson nichts. Holmes lächelte nur.' }
  ],

  /* secured-evidence ids in the demo start-state */
  secured: ['e1', 'e2'],

  deductions: [
    'Der Täter ist über sechs Fuß groß — abzulesen an der Höhe der Wandschrift.',
    'Er kam in einer Droschke und ist selbst der Kutscher.',
    'Das Motiv ist Rache, nicht Raub — die Wertsachen blieben unberührt.'
  ],

  /* ── Suspects ────────────────────────────────────────────────── */
  suspects: [
    { name: 'Jefferson Hope', role: 'Cab-Fahrer, früherer Grubenbauingenieur', status: 'free',
      detail: 'Aus Nevada. Fährt Droschke in London. Verfolgt Drebber und Stangerson seit zwanzig Jahren.',
      culprit: true },
    { name: 'Arthur Charpentier', role: 'Marineleutnant', status: 'free',
      detail: 'Sohn der Vermieterin. Stritt mit dem Opfer wegen Belästigung seiner Schwester Alice.',
      culprit: false },
    { name: 'Tobias Gregson', role: 'Inspektor, Scotland Yard', status: 'cleared',
      detail: 'Kompetent, aber konventionell. Verhaftete Charpentier voreilig.',
      culprit: false }
  ],

  facts: [
    ['Tatort',        '3 Lauriston Gardens, Brixton Road'],
    ['Opfer',         'Enoch J. Drebber, US-Staatsbürger'],
    ['Todesursache',  'Vergiftung — kein sichtbares Trauma'],
    ['Blut am Tatort','Reichlich; nicht vom Opfer'],
    ['Inschrift',     '„RACHE" — in Blut an der Wand'],
    ['Täter-Größe',   'Über 6 Fuß (Fußspuren)'],
    ['Kutsche',       'Vierrädrig; ein altes Hufeisen']
  ],

  /* ── Locations ───────────────────────────────────────────────── */
  locations: [
    { id: 'l1', name: 'Baker Street 221B', district: 'Marylebone', locked: false,
      desc: 'Heimstätte von Holmes und Watson. Laboratorium, Archiv, Denkraum.', action: 'Ermittlungen besprechen' },
    { id: 'l2', name: '3 Lauriston Gardens', district: 'Brixton', locked: false,
      desc: 'Das leerstehende Haus, in dem Drebbers Leiche gefunden wurde.', action: 'Tatort inspizieren' },
    { id: 'l3', name: 'Scotland Yard', district: 'Westminster', locked: false,
      desc: 'Sitz der Metropolitanpolizei. Gregson und Lestrade.', action: 'Gregson befragen' },
    { id: 'l4', name: "Halliday's Private Hotel", district: 'Little George St.', locked: false,
      desc: 'Hotel, in dem Stangersons Leiche gefunden wurde.', action: 'Zimmer untersuchen' },
    { id: 'l5', name: 'Opiumhöhle, Upper Swandam Lane', district: 'City-Rand', locked: true,
      desc: 'Treffpunkt der Londoner Unterwelt.', action: 'Verkleidet eintreten' },
    { id: 'l6', name: 'Charpentier-Pension', district: 'Camberwell', locked: false,
      desc: 'Die Pension, in der Drebber logiert hatte.', action: 'Mrs. Charpentier befragen' }
  ],

  /* ── Scripted narrative beats (replace the live AI in the proto) ─ */
  thread: [
    { who: 'system', text: 'Ermittlung fortgesetzt · Bisher 2 Beweise gesichert' },
    { who: 'watson', text: 'Es war ein trüber Morgen, als die Droschke uns zur Brixton Road brachte. Holmes hatte während der ganzen Fahrt kein Wort gesprochen, nur an seinen Fingernägeln genagt und aus dem Fenster gestarrt.' },
    { who: 'watson', text: 'Das Haus, Nummer 3 Lauriston Gardens, trug ein unheilvolles Aussehen. Gregson erwartete uns bereits an der Tür, das Notizbuch in der Hand und ein selbstgefälliges Lächeln im Gesicht.' },
    { who: 'holmes', text: 'Bevor wir eintreten — niemand soll den Gartenweg betreten haben?' }
  ],

  /* responses keyed to quick actions in the demo */
  responses: {
    room: { who: 'watson', secures: 'e4',
      text: 'Holmes warf sich auf Hände und Knie und kroch über den Boden wie ein Spürhund. In der Ecke, dem Fenster gegenüber, fand er ein Häufchen grauer Asche. „Trichinopoly", sagte er bestimmt, „eine indische Zigarre. Unser Mann nahm sich Zeit zum Rauchen — er war seiner Sache sehr sicher."' },
    watson: { who: 'watson',
      text: 'Ah, mein lieber Holmes, ich teile Ihre Zuversicht. Doch der Tote gibt seine Geheimnisse nicht leicht preis. Vielleicht sollten wir zunächst die Anwesenden befragen, ehe wir Schlüsse ziehen — der Mensch verrät sich schneller als der Stein.' },
    deduce: { who: 'holmes',
      text: 'Aus dem, was wir gesehen haben, ergibt sich bereits ein Bild: ein Mann über sechs Fuß, im besten Alter, mit kleinen Füßen für seine Größe, in schweren Stiefeln, der Trichinopoly-Zigarren raucht. Er kam mit dem Opfer in einer Droschke. Sein Gesicht war rötlich, und die Fingernägel seiner rechten Hand auffallend lang. Es sind nur Kleinigkeiten — aber es gibt nichts Wichtigeres als Kleinigkeiten.' }
  }
};
