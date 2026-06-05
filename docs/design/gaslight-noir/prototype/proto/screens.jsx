/* ════════════════════════════════════════════════════════════════
   Panels — Masthead, Phase stepper, Narrative, Evidence, Dossier,
   Locations. Presentational; state comes from props.
   ════════════════════════════════════════════════════════════════ */
const { useState, useEffect, useRef } = React;
const A = window.PROTO.active;

/* ── Masthead ──────────────────────────────────────────────────── */
function Masthead({ onCases, onMusic, onSettings }) {
  return (
    <header className="masthead">
      <div className="mh-top">
        <span className="mh-dateline"><QuillIcon size={12} /> {A.dateline}</span>
        <div className="mh-actions">
          <button className="mh-btn" onClick={onCases}>☰ Fälle</button>
          <button className="mh-btn" onClick={onMusic}>▶ Musik</button>
          <button className="mh-btn" onClick={onSettings}>Einstellungen</button>
        </div>
      </div>
      <div className="mh-center">
        <span className="mh-kicker">{A.kicker} · 1881</span>
        <div className="mh-title">{A.title}</div>
        <span className="mh-seal"><WaxSeal size={46} /></span>
      </div>
      <div className="mh-ornament"><span>{A.ornament}</span></div>
    </header>
  );
}

/* ── Phase stepper ─────────────────────────────────────────────── */
function PhaseBar({ phaseIndex, pct }) {
  const phases = window.PROTO.phases;
  return (
    <div className="phasebar">
      <span className="phasebar-label">Ermittlungsakte</span>
      <div className="stepper">
        {phases.map((p, i) => {
          const done = i < phaseIndex, current = i === phaseIndex;
          return (
            <div key={p.id} className={`step ${done ? 'done' : ''} ${current ? 'current' : ''}`}>
              <div className="step-node-wrap">
                <div className="step-node" />
                <span className="step-label">{p.short}</span>
              </div>
              {i < phases.length - 1 && <div className="step-line" />}
            </div>
          );
        })}
      </div>
      <span className="phasebar-pct">{pct}%</span>
    </div>
  );
}

/* ── Narrative thread ──────────────────────────────────────────── */
function Narrative({ thread, typing, onAction, onAccuse }) {
  const chatRef = useRef(null);
  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [thread.length, typing]);

  return (
    <>
      <div className="quick-actions">
        <button className="qbtn" onClick={() => onAction('room')}>Raum untersuchen</button>
        <button className="qbtn" onClick={() => onAction('watson')}>Watson befragen</button>
        <button className="qbtn" onClick={() => onAction('deduce')}>Schlussfolgerung</button>
        <button className="qbtn accent" onClick={() => onAction('hint')}>▶ Watson-Hint</button>
        <button className="qbtn accent" onClick={() => onAction('irregulars')}>▶ Irregulars</button>
        <button className="qbtn danger" onClick={onAccuse}>Anklage erheben</button>
      </div>

      <div className="chat" ref={chatRef}>
        {thread.map((m, i) => <ThreadMsg key={i} m={m} />)}
        {typing && (
          <div className="typing fadein">
            <div className="tdot" /><div className="tdot" /><div className="tdot" />
            <span className="tl">Watson schreibt</span>
          </div>
        )}
      </div>

      <div className="input-bar">
        <textarea className="input-field" rows="1" placeholder="Ihre Anweisung, mein Herr…"
          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); onAction('free'); } }} />
        <button className="send-btn" onClick={() => onAction('free')}>Senden</button>
      </div>
    </>
  );
}

function ThreadMsg({ m }) {
  if (m.who === 'system')
    return <div className="msg msg-system fadein"><span className="msg-body">— {m.text} —</span></div>;

  if (m.who === 'secured')
    return (
      <div className="msg msg-secured fadein">
        <div className="msg-speaker">Watson notiert</div>
        <div className="msg-body"><span className="sec-stamp">Beweis gesichert</span><span>{m.text}</span></div>
      </div>
    );

  const label = m.who === 'player' ? 'Holmes' : m.who === 'holmes' ? 'Sherlock Holmes' : 'Dr. Watson';
  return (
    <div className={`msg msg-${m.who} fadein`}>
      <div className="msg-speaker">{label}</div>
      <div className="msg-body" dangerouslySetInnerHTML={{ __html: m.text }} />
    </div>
  );
}

/* ── Evidence panel ────────────────────────────────────────────── */
function EvidencePanel({ securedIds, onOpen }) {
  const all = window.PROTO.evidence;
  const secured = all.filter(e => securedIds.includes(e.id));
  return (
    <div className="fadein">
      <div className="section-head">
        <EvidenceGlyph tag="physical" size={15} /> Asservatenkammer
        <span className="sh-count">{secured.length} / {all.length} gesichert</span>
      </div>
      <div className="ev-grid">
        {secured.map(e => <EvidenceCard key={e.id} e={e} onOpen={onOpen} />)}
      </div>

      <div className="deduction-board">
        <div className="section-head">Schlussfolgerungskette</div>
        {window.PROTO.deductions.map((d, i) => (
          <div className="ded-entry" key={i}><span className="ded-no">{String(i + 1).padStart(2, '0')}</span>{d}</div>
        ))}
      </div>
    </div>
  );
}

function EvidenceCard({ e, onOpen }) {
  const labels = { physical: 'Sachbeweis', testimony: 'Aussage', document: 'Dokument' };
  return (
    <div className="ev-card" onClick={() => onOpen(e.id)}>
      <div className="ev-glyph"><EvidenceGlyph tag={e.tag} size={18} /></div>
      <div className="ev-top">
        <span className="ev-ref">{e.ref}</span>
        <span className={`ev-tag tag-${e.tag}`}>{labels[e.tag]}</span>
      </div>
      <div className="ev-title">{e.title}</div>
      <div className="ev-desc">{e.desc}</div>
      <span className="ev-secured-stamp">Gesichert</span>
    </div>
  );
}

/* ── Dossier / Casefile panel ──────────────────────────────────── */
function Dossier() {
  return (
    <div className="fadein">
      <div className="dossier-illu">
        <div className="illu-mark">
          <SuspectPortrait variant={1} size={84} />
          <SuspectPortrait variant={2} size={84} />
        </div>
        <div className="dossier-illu-cap">Holmes & Watson · Sidney Paget, The Strand, 1891</div>
      </div>

      <div className="dossier-title">Der Fall Brixton Road</div>
      <div className="dossier-deck">{A.deck}</div>
      <div className="dossier-byline">{A.byline}</div>

      <div className="dossier-prose">
        {A.summary.map((p, i) => <p key={i} dangerouslySetInnerHTML={{ __html: p }} />)}
      </div>

      <div className="pull-quote">„{A.quote}"</div>

      <div className="section-head" style={{ marginTop: 18 }}>Verdächtige Personen</div>
      {window.PROTO.suspects.map((s, i) => <SuspectCard key={i} s={s} variant={i} />)}

      <div className="section-head" style={{ marginTop: 18 }}>Bekannte Tatortbefunde</div>
      <div className="facts-table">
        {window.PROTO.facts.map((f, i) => (
          <div className="fact-row" key={i}><span className="fact-key">{f[0]}</span><span className="fact-val">{f[1]}</span></div>
        ))}
      </div>
    </div>
  );
}

function SuspectCard({ s, variant }) {
  return (
    <div className="suspect-card">
      <div className="suspect-port"><SuspectPortrait variant={variant} size={74} cleared={s.status === 'cleared'} /></div>
      <div className="suspect-info">
        <div className="suspect-name">{s.name}</div>
        <div className="suspect-role">{s.role}</div>
        <div className="suspect-detail">{s.detail}</div>
        <span className={`suspect-status status-${s.status}`}>{s.status === 'free' ? 'Verdächtig' : 'Entlastet'}</span>
      </div>
    </div>
  );
}

/* ── Locations panel ───────────────────────────────────────────── */
function Locations({ onTravel }) {
  return (
    <div className="fadein">
      <div className="loc-map-head">
        <CompassRose size={48} />
        <div>
          <div className="section-head" style={{ border: 'none', margin: 0, padding: 0 }}>Karte des Handlungsgebiets</div>
          <div style={{ fontFamily: 'var(--font-type)', fontSize: 9, letterSpacing: 1, textTransform: 'uppercase', color: 'var(--ink-ghost)', marginTop: 3 }}>London · Bacon's Atlas, 1888</div>
        </div>
      </div>
      {window.PROTO.locations.map(loc => (
        <div key={loc.id} className={`loc-card ${loc.locked ? 'locked' : ''}`} onClick={() => !loc.locked && onTravel(loc)}>
          <div className="loc-head">
            <span className="loc-name"><PinIcon size={13} /> {loc.name}</span>
            <span className="loc-district">{loc.district}</span>
          </div>
          <div className="loc-desc">{loc.desc}</div>
          <div className="loc-action">
            {loc.locked ? <><LockIcon size={11} /> Gesperrt — mehr Beweise benötigt</> : <>↳ {loc.action}</>}
          </div>
        </div>
      ))}
    </div>
  );
}

Object.assign(window, { Masthead, PhaseBar, Narrative, EvidencePanel, Dossier, Locations });
