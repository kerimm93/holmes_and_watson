/* ════════════════════════════════════════════════════════════════
   Overlays & full screens — Splash, Case selector, Evidence detail,
   Verdict (accusation + result reveal).
   ════════════════════════════════════════════════════════════════ */

/* ── Splash / opening case shelf ───────────────────────────────── */
function Splash({ onStart }) {
  const cases = window.PROTO.cases;
  const statusMeta = {
    active:    { cls: 'cs-active',    label: 'Aktiv' },
    available: { cls: 'cs-available', label: 'Verfügbar' },
    locked:    { cls: 'cs-locked',    label: 'Versiegelt' }
  };
  return (
    <div className="splash grain fadein">
      <div className="splash-inner">
        <div className="splash-seal"><WaxSeal size={76} /></div>
        <div className="splash-kicker">Baker Street · London · 1881</div>
        <div className="splash-title">Sherlock Holmes</div>
        <div className="splash-sub">Interaktive Detektivspiele</div>
        <div className="splash-rule"><RuleOrnament /></div>

        <div className="splash-shelf-label">Aktenfach — wählen Sie einen Fall</div>
        <div className="case-shelf">
          {cases.map(c => {
            const m = statusMeta[c.status];
            const locked = c.status === 'locked';
            return (
              <div key={c.id} className={`case-folder ${c.status === 'active' ? 'active' : ''} ${locked ? 'locked' : ''}`}
                onClick={() => !locked && onStart(c)}>
                <div className="case-spine">{c.year}</div>
                <div className="case-content">
                  <div className="case-name">{c.title}</div>
                  <div className="case-orig">{c.original} · {c.type}</div>
                  <div className="case-teaser">{c.teaser}</div>
                  <span className={`case-status ${m.cls}`}>
                    {locked && <LockIcon size={9} />}{m.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="splash-foot spin-quote">„Das Spiel ist im Gange, Watson."</div>
      </div>
    </div>
  );
}

/* ── In-app case selector overlay ──────────────────────────────── */
function CaseSelector({ onClose, onPick }) {
  const cases = window.PROTO.cases;
  return (
    <div className="overlay" onClick={onClose}>
      <div className="cs-box" onClick={e => e.stopPropagation()}>
        <div className="cs-head" style={{ justifyContent: 'space-between' }}>
          <span>Aktenfach — Fälle auswählen</span>
          <button className="ev-detail-head edh-x" style={{ color: 'var(--paper-aged)' }} onClick={onClose}>✕</button>
        </div>
        <div className="cs-body">
          {cases.map(c => {
            const locked = c.status === 'locked';
            return (
              <div key={c.id} className={`case-folder ${c.status === 'active' ? 'active' : ''} ${locked ? 'locked' : ''}`}
                style={{ boxShadow: '3px 4px 0 var(--shadow)' }}
                onClick={() => !locked && onPick(c)}>
                <div className="case-spine">{c.year}</div>
                <div className="case-content">
                  <div className="case-name">{c.title}</div>
                  <div className="case-orig">{c.type} · {c.original}</div>
                  <span className={`case-status ${c.status === 'active' ? 'cs-active' : locked ? 'cs-locked' : 'cs-available'}`}>
                    {locked && <LockIcon size={9} />}{c.status === 'active' ? 'Aktiv' : locked ? 'Versiegelt' : 'Verfügbar'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ── Evidence detail (Asservat) ────────────────────────────────── */
function EvidenceDetail({ id, onClose }) {
  const e = window.PROTO.evidence.find(x => x.id === id);
  if (!e) return null;
  const labels = { physical: 'Sachbeweis', testimony: 'Zeugenaussage', document: 'Dokument' };
  return (
    <div className="overlay" onClick={onClose}>
      <div className="ev-detail-card" onClick={ev => ev.stopPropagation()}>
        <div className="ev-detail-head">
          <span className="edh-ref">ASSERVAT · {e.ref}</span>
          <button className="edh-x" onClick={onClose}>✕</button>
        </div>
        <div className="ev-detail-body">
          <div className="ev-detail-plate">
            <div className="plate-glyph"><EvidenceGlyph tag={e.tag} size={26} /></div>
            <div className="plate-cap">Beweisstück · fotografische Platte</div>
          </div>
          <div className="ev-detail-title">{e.title}</div>
          <div className="ev-detail-meta">
            <span>{labels[e.tag]}</span><span>· Fundort: {e.loc}</span>
          </div>
          <div className="ev-detail-desc">{e.desc}</div>
          <div className="ev-detail-note">
            <span className="note-label">Watsons Randnotiz</span>{e.note}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Verdict: accusation form ──────────────────────────────────── */
function Verdict({ onClose, onSubmit }) {
  const [sel, setSel] = useState(null);
  const [theory, setTheory] = useState('');
  const suspects = window.PROTO.suspects;
  return (
    <div className="overlay" onClick={onClose}>
      <div className="verdict-box" onClick={e => e.stopPropagation()}>
        <div className="verdict-head"><WaxSeal size={40} />Anklage erheben</div>
        <div className="verdict-body">
          <p className="verdict-prompt">Wen halten Sie für schuldig, mein Herr? Wägen Sie Beweis gegen Beweis — eine Anklage lässt sich nicht zurücknehmen.</p>
          <span className="verdict-label">Ihr Verdächtiger</span>
          <div className="accuse-grid">
            {suspects.map((s, i) => (
              <div key={i} className={`accuse-card ${sel === s.name ? 'sel' : ''}`} onClick={() => setSel(s.name)}>
                <SuspectPortrait variant={i} size={84} />
                <div className="ac-name">{s.name}</div>
                <div className="ac-role">{s.role.split(',')[0]}</div>
              </div>
            ))}
          </div>
          <span className="verdict-label">Ihre Theorie (kurz)</span>
          <textarea className="verdict-theory" placeholder="Ich behaupte, dass…"
            value={theory} onChange={e => setTheory(e.target.value)} />
          <div className="btn-row">
            <button className="btn-primary" disabled={!sel} onClick={() => onSubmit(sel)}>Anklage vortragen</button>
            <button className="btn-ghost" onClick={onClose}>Noch nicht bereit</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Verdict: result reveal ────────────────────────────────────── */
function VerdictResult({ accused, onClose }) {
  const suspect = window.PROTO.suspects.find(s => s.name === accused);
  const correct = suspect && suspect.culprit;
  return (
    <div className="overlay" onClick={onClose}>
      <div className="verdict-box" onClick={e => e.stopPropagation()}>
        <div className="verdict-result">
          <div className="vr-seal"><WaxSeal size={68} broken={!correct} /></div>
          <div className={`vr-verdict ${correct ? 'solved' : 'wrong'}`}>{correct ? 'Fall gelöst' : 'Fehlschluss'}</div>
          <div className="vr-stamp" style={{ color: correct ? 'var(--verdigris)' : 'var(--blood)', borderColor: correct ? 'var(--verdigris)' : 'var(--blood)' }}>
            {correct ? 'Akte geschlossen' : 'Akte bleibt offen'}
          </div>
          {correct ? (
            <>
              <div className="vr-text">Sie klagten <strong>Jefferson Hope</strong> an — und Sie hatten recht. Der Cab-Fahrer aus Nevada verfolgte Drebber und Stangerson zwanzig Jahre lang, um den Tod von Lucy und John Ferrier zu rächen.</div>
              <div className="vr-text">Holmes nickte langsam. „Sie haben den Faden gefunden, Watson. Das Unmögliche ausgeschlossen — was übrig blieb, war die Wahrheit."</div>
              <div className="vr-meta">Methode: Vergiftung · zwei Pillen, eine tödlich · Motiv: Rache</div>
            </>
          ) : (
            <>
              <div className="vr-text">Sie klagten <strong>{accused}</strong> an. Doch die Indizien tragen diese Anklage nicht — der wahre Täter ist noch auf freiem Fuß.</div>
              <div className="vr-text">Holmes legte die Fingerspitzen aneinander. „Voreilig, mein Freund. Kehren wir zu den Beweisen zurück."</div>
            </>
          )}
          <div className="btn-row">
            <button className="btn-primary" style={{ background: correct ? 'var(--verdigris)' : 'var(--blood)' }} onClick={onClose}>
              {correct ? 'Zur Fallübersicht' : 'Weiter ermitteln'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Splash, CaseSelector, EvidenceDetail, Verdict, VerdictResult });
