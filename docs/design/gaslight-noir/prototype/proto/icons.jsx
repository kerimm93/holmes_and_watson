/* ════════════════════════════════════════════════════════════════
   Ornaments & marks — the recurring visual vocabulary of the redesign.
   Pure SVG, inherit currentColor. Figural art is placeholder silhouette.
   ════════════════════════════════════════════════════════════════ */

/* Wax-seal monogram — the app's brand mark. Appears on splash, masthead,
   verdict. Scalable; `broken` cracks it for the "case closed" moment. */
function WaxSeal({ size = 64, broken = false }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
      <defs>
        <radialGradient id="wax" cx="38%" cy="34%" r="72%">
          <stop offset="0%" stopColor="#9a2424" />
          <stop offset="55%" stopColor="#6b1010" />
          <stop offset="100%" stopColor="#430a0a" />
        </radialGradient>
      </defs>
      <path fill="url(#wax)" d="M50 4c4 6 11 5 16 9s5 11 10 15 12 4 14 10-2 12-1 18 5 11 2 17-11 4-15 9-5 12-11 14-11-3-17-3-12 5-18 3-6-9-11-13-13-4-15-10 4-12 3-18-5-11-2-17 11-5 15-9 4-12 10-15 11 2 16-9z"/>
      <circle cx="50" cy="50" r="30" fill="none" stroke="#430a0a" strokeWidth="1.5" opacity="0.6"/>
      <circle cx="50" cy="50" r="34" fill="none" stroke="#9a2424" strokeWidth="0.75" opacity="0.4"/>
      <text x="50" y="62" textAnchor="middle" fontFamily="'Playfair Display', serif"
        fontSize="34" fontStyle="italic" fontWeight="900" fill="#f2ead8" opacity="0.92">SH</text>
      {broken && (
        <path d="M50 16 L46 38 L54 52 L44 70 L52 84" fill="none"
          stroke="#430a0a" strokeWidth="2.5" strokeLinejoin="round" opacity="0.85"/>
      )}
    </svg>
  );
}

/* Thin filigree divider with a centred diamond — used between sections */
function RuleOrnament({ color = 'currentColor' }) {
  return (
    <svg width="180" height="12" viewBox="0 0 180 12" aria-hidden="true" style={{ color }}>
      <line x1="0" y1="6" x2="78" y2="6" stroke="currentColor" strokeWidth="1"/>
      <line x1="102" y1="6" x2="180" y2="6" stroke="currentColor" strokeWidth="1"/>
      <path d="M90 1 L96 6 L90 11 L84 6 Z" fill="currentColor"/>
      <circle cx="78" cy="6" r="1.5" fill="currentColor"/>
      <circle cx="102" cy="6" r="1.5" fill="currentColor"/>
    </svg>
  );
}

/* Evidence-type glyphs, stamped on Asservat cards */
function EvidenceGlyph({ tag, size = 20 }) {
  const c = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none',
    stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' };
  if (tag === 'physical') // magnifier over a footprint
    return (<svg {...c}><circle cx="10" cy="10" r="6"/><line x1="14.5" y1="14.5" x2="20" y2="20"/><circle cx="10" cy="9" r="1.6"/></svg>);
  if (tag === 'testimony') // speech / quotation
    return (<svg {...c}><path d="M4 5h16v10H9l-4 4V5z"/><line x1="8" y1="9" x2="16" y2="9"/><line x1="8" y1="12" x2="13" y2="12"/></svg>);
  if (tag === 'document') // folded telegram
    return (<svg {...c}><path d="M6 3h9l3 3v15H6z"/><path d="M15 3v3h3"/><line x1="9" y1="11" x2="15" y2="11"/><line x1="9" y1="14" x2="15" y2="14"/></svg>);
  return null;
}

/* Suspect portrait — engraving-style placeholder silhouette in an oval frame.
   `variant` shifts the silhouette so the three suspects read differently. */
function SuspectPortrait({ variant = 0, size = 72, cleared = false }) {
  const hats = [
    <path key="h" d="M30 40 q20 -22 40 0 q4 -3 8 0 q-6 6 -8 10 l-40 0 q-2 -6 0 -10z" fill="#1c1510" opacity="0.9"/>, // bowler
    <path key="c" d="M34 40 l32 0 l4 -22 l-40 0z M28 40 l44 0 0 4 -44 0z" fill="#1c1510" opacity="0.9"/>, // top hat
    <path key="d" d="M30 40 q20 -16 40 0 l0 4 q-20 -10 -40 0z M44 24 l12 0 0 6 -12 0z" fill="#1c1510" opacity="0.9"/> // deerstalker-ish
  ];
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
      <rect width="100" height="100" fill="#d8cdb0"/>
      <ellipse cx="50" cy="54" rx="30" ry="36" fill="#c2b48f" stroke="#5a4530" strokeWidth="1"/>
      <g style={{ filter: cleared ? 'grayscale(1)' : 'none', opacity: cleared ? 0.55 : 1 }}>
        <path d="M50 50 q14 0 16 18 q2 14 -2 20 l-28 0 q-4 -6 -2 -20 q2 -18 16 -18z" fill="#2a2018"/>
        <circle cx="50" cy="44" r="15" fill="#34281d"/>
        {hats[variant % 3]}
      </g>
      <ellipse cx="50" cy="54" rx="30" ry="36" fill="none" stroke="#1c1510" strokeWidth="2" opacity="0.25"/>
    </svg>
  );
}

/* Compass rose for the locations map header */
function CompassRose({ size = 56 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true" style={{ opacity: 0.5 }}>
      <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="1"/>
      <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.5"/>
      <path d="M50 8 L56 50 L50 56 L44 50 Z" fill="currentColor"/>
      <path d="M50 92 L44 50 L50 44 L56 50 Z" fill="currentColor" opacity="0.4"/>
      <path d="M8 50 L50 44 L56 50 L50 56 Z" fill="currentColor" opacity="0.4"/>
      <path d="M92 50 L50 56 L44 50 L50 44 Z" fill="currentColor" opacity="0.4"/>
      <text x="50" y="22" textAnchor="middle" fontFamily="serif" fontSize="9" fill="currentColor">N</text>
    </svg>
  );
}

/* Small inline marks */
function PinIcon({ size = 14 }) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 21s7-6.5 7-12a7 7 0 10-14 0c0 5.5 7 12 7 12z"/><circle cx="12" cy="9" r="2.4"/></svg>);
}
function LockIcon({ size = 13 }) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><rect x="5" y="11" width="14" height="9" rx="1"/><path d="M8 11V8a4 4 0 018 0v3"/></svg>);
}
function QuillIcon({ size = 14 }) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20 4C12 6 7 12 5 20l3-1c2-6 6-10 12-12z"/><path d="M9 15l5-5"/></svg>);
}

Object.assign(window, { WaxSeal, RuleOrnament, EvidenceGlyph, SuspectPortrait, CompassRose, PinIcon, LockIcon, QuillIcon });
