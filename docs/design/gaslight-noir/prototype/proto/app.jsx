/* ════════════════════════════════════════════════════════════════
   App shell — navigation, demo state, device frame, prototype chrome.
   No real game logic: scripted beats stand in for the live AI.
   ════════════════════════════════════════════════════════════════ */
const { useState: uS } = React;

function App() {
  const [device, setDevice] = uS('desktop');     // desktop | mobile
  const [view, setView]     = uS('splash');       // splash | app
  const [tab, setTab]       = uS('narrative');    // narrative | evidence | casefile | locations
  const [sideTab, setSide]  = uS('casefile');     // desktop sidebar folder
  const [overlay, setOverlay] = uS(null);         // null | cases | verdict | result | settings | music
  const [evDetail, setEvDetail] = uS(null);       // evidence id
  const [accused, setAccused] = uS(null);

  const [thread, setThread] = uS(window.PROTO.thread.slice());
  const [secured, setSecured] = uS(window.PROTO.secured.slice());
  const [phaseIndex, setPhase] = uS(1);
  const [typing, setTyping] = uS(false);

  const isMobile = device === 'mobile';
  const pct = Math.min(99, 18 + secured.length * 13 + phaseIndex * 6);

  /* scripted narrative actions */
  function doAction(kind) {
    if (kind === 'free') return; // demo: free text is inert
    if (kind === 'hint') {
      pushThread({ who: 'watson', text: '<em>Der Boden des Zimmers verrät mehr als die Wände, Holmes. Knien Sie sich, wenn ich bitten darf.</em>' });
      return;
    }
    if (kind === 'irregulars') {
      pushThread({ who: 'watson', text: "Wiggins kratzte sich den Kopf. „Ey Mr. Holmes, der Cab-Fahrer der Nacht — groß wie ein Baum. Nie vorher in der Gegend gesehen.\"" });
      return;
    }
    const r = window.PROTO.responses[kind];
    if (!r) return;
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      pushThread({ who: r.who, text: r.text });
      if (r.secures && !secured.includes(r.secures)) {
        const ev = window.PROTO.evidence.find(e => e.id === r.secures);
        setSecured(s => [...s, r.secures]);
        setPhase(p => Math.min(window.PROTO.phases.length - 1, p + 1));
        setTimeout(() => pushThread({ who: 'secured', text: ev.title }), 450);
      }
    }, 1100);
  }
  function pushThread(m) { setThread(t => [...t, m]); }

  function travel(loc) {
    setTab('narrative');
    pushThread({ who: 'player', text: `Ich reise nach ${loc.name}. ${loc.action}.` });
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      pushThread({ who: 'watson', text: `<em>Die Droschke hielt vor ${loc.name}. Holmes sprang heraus, ehe das Pferd zum Stehen kam.</em>` });
    }, 1000);
  }

  function startCase(c) { setView('app'); setOverlay(null); }

  /* ── panels ── */
  const panels = {
    narrative: <Narrative thread={thread} typing={typing} onAction={doAction} onAccuse={() => setOverlay('verdict')} />,
    evidence:  <div className="sidebar-body" style={{ flex: 1 }}><EvidencePanel securedIds={secured} onOpen={setEvDetail} /></div>,
    casefile:  <div className="sidebar-body" style={{ flex: 1 }}><Dossier /></div>,
    locations: <div className="sidebar-body" style={{ flex: 1 }}><Locations onTravel={travel} /></div>
  };

  return (
    <div id="proto-root">
      <div id="proto-stage">
        <div className={`${isMobile ? 'frame-mobile' : 'frame-desktop'}`}>
          <div className={`app grain ${isMobile ? 'is-mobile' : ''}`}>

            {view === 'splash' && <Splash onStart={startCase} />}

            <Masthead
              onCases={() => setOverlay('cases')}
              onMusic={() => setOverlay('music')}
              onSettings={() => setOverlay('settings')} />
            <PhaseBar phaseIndex={phaseIndex} pct={pct} />

            <div className="content">
              {/* Desktop dossier sidebar */}
              {!isMobile && (
                <div className="sidebar">
                  <div className="sidebar-folder-tab">
                    {[['casefile', 'Akte'], ['evidence', 'Beweise'], ['locations', 'Orte']].map(([k, l]) => (
                      <div key={k} className={`folder-tab ${sideTab === k ? 'on' : ''}`} onClick={() => setSide(k)}>{l}</div>
                    ))}
                  </div>
                  {sideTab === 'casefile' && <div className="sidebar-body"><Dossier /></div>}
                  {sideTab === 'evidence' && <div className="sidebar-body"><EvidencePanel securedIds={secured} onOpen={setEvDetail} /></div>}
                  {sideTab === 'locations' && <div className="sidebar-body"><Locations onTravel={travel} /></div>}
                </div>
              )}

              {/* Main column */}
              <div className="main">
                {/* Mobile tab row */}
                <div className="tabrow">
                  {[['narrative', 'Bericht'], ['evidence', 'Beweise'], ['casefile', 'Akte'], ['locations', 'Orte']].map(([k, l]) => (
                    <button key={k} className={`tab-btn ${tab === k ? 'on' : ''}`} onClick={() => setTab(k)}>
                      {l}{k === 'evidence' && <span className="tab-badge">{secured.length}</span>}
                    </button>
                  ))}
                </div>

                {/* On desktop the main column always shows the narrative;
                    on mobile it follows the active tab. */}
                {isMobile ? panels[tab] : panels.narrative}
              </div>
            </div>

            {/* overlays (scoped inside the app frame) */}
            {overlay === 'cases'   && <CaseSelector onClose={() => setOverlay(null)} onPick={() => setOverlay(null)} />}
            {overlay === 'verdict' && <Verdict onClose={() => setOverlay(null)} onSubmit={(name) => { setAccused(name); setOverlay('result'); }} />}
            {overlay === 'result'  && <VerdictResult accused={accused} onClose={() => setOverlay(null)} />}
            {(overlay === 'settings' || overlay === 'music') && <SimpleOverlay kind={overlay} onClose={() => setOverlay(null)} />}
            {evDetail && <EvidenceDetail id={evDetail} onClose={() => setEvDetail(null)} />}
          </div>
        </div>
      </div>

      {/* PROTOTYPE CHROME */}
      <div className="proto-bar">
        <span className="pb-brand"><WaxSeal size={22} /> <b>BakerstreetRPG</b> · Redesign-Prototyp</span>
        <span className="pb-spacer" />
        <span className="proto-hint">Ansicht:</span>
        <div className="proto-seg">
          <button className={device === 'desktop' ? 'on' : ''} onClick={() => setDevice('desktop')}>Desktop</button>
          <button className={device === 'mobile' ? 'on' : ''} onClick={() => setDevice('mobile')}>Mobil</button>
        </div>
        <div className="proto-seg">
          <button className="pb-btn" onClick={() => setView('splash')}>Splash</button>
          <button className="pb-btn" onClick={() => { setView('app'); setEvDetail(null); setOverlay('verdict'); }}>Verdict</button>
          <button className="pb-btn" onClick={() => { setThread(window.PROTO.thread.slice()); setSecured(window.PROTO.secured.slice()); setPhase(1); setOverlay(null); setView('app'); }}>Reset</button>
        </div>
      </div>
    </div>
  );
}

/* lightweight stand-ins for settings/music overlays */
function SimpleOverlay({ kind, onClose }) {
  const isSettings = kind === 'settings';
  return (
    <div className="overlay" onClick={onClose}>
      <div className="cs-box" style={{ maxWidth: 400 }} onClick={e => e.stopPropagation()}>
        <div className="cs-head" style={{ justifyContent: 'space-between', fontSize: 15 }}>
          <span>{isSettings ? 'Einstellungen des Berichterstatters' : 'Atmosphärische Begleitung'}</span>
          <button className="edh-x" style={{ color: 'var(--paper-aged)', background: 'none', border: 'none', fontFamily: 'var(--font-type)', cursor: 'pointer' }} onClick={onClose}>✕</button>
        </div>
        <div className="cs-body" style={{ gap: 14 }}>
          {isSettings ? (
            <>
              <Field label="OpenAI API-Schlüssel" placeholder="sk-…" />
              <Field label="KI-Modell" value="GPT-4o (empfohlen)" select />
              <Field label="Antwortsprache" value="Deutsch (Standard)" select />
              <p style={{ fontFamily: 'var(--font-type)', fontSize: 10, color: 'var(--ink-ghost)', lineHeight: 1.5 }}>
                Im Prototyp ohne Funktion — diese Felder bilden nur den bestehenden Einstellungs-Dialog ab.
              </p>
            </>
          ) : (
            <>
              <span className="verdict-label">Prozeduraler Klang (offline)</span>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {['I · Kaminfeuer', 'II · Regen', 'III · Baker Street'].map((t, i) => (
                  <span key={i} className={`case-status ${i === 0 ? 'cs-active' : 'cs-available'}`} style={{ cursor: 'pointer' }}>{t}</span>
                ))}
              </div>
              <span className="verdict-label" style={{ marginTop: 6 }}>Lautstärke</span>
              <input type="range" defaultValue="50" style={{ accentColor: 'var(--ink)', width: '100%' }} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
function Field({ label, placeholder, value, select }) {
  return (
    <div>
      <span className="verdict-label">{label}</span>
      <div style={{ background: 'var(--paper-dark)', border: '1px solid var(--rule)', padding: '9px 11px', fontFamily: 'var(--font-type)', fontSize: 12, color: value ? 'var(--ink)' : 'var(--ink-ghost)' }}>
        {value || placeholder}{select && <span style={{ float: 'right' }}>▾</span>}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
