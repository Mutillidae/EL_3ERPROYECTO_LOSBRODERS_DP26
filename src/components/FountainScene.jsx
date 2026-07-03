export default function FountainScene() {
  return (
    <div className="fountain-scene">
      <svg width="380" height="380" viewBox="0 0 380 380">
        <circle cx="190" cy="170" r="150" fill="rgba(255,255,255,0.10)" />
        <circle cx="190" cy="170" r="150" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="6" />
        <circle cx="190" cy="170" r="120" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="3" />

        {/* stylized face */}
        <ellipse cx="190" cy="150" rx="78" ry="88" fill="rgba(255,255,255,0.28)" />
        <circle cx="160" cy="140" r="9" fill="rgba(20,50,80,0.55)" />
        <circle cx="220" cy="140" r="9" fill="rgba(20,50,80,0.55)" />
        <path d="M150 190 Q190 220 230 190" stroke="rgba(20,50,80,0.5)" strokeWidth="6" fill="none" strokeLinecap="round" />
        <path d="M120 100 Q190 60 260 100 Q250 80 190 75 Q130 80 120 100 Z" fill="rgba(255,255,255,0.35)" />

        {/* water column */}
        <rect x="182" y="230" width="16" height="110" fill="rgba(255,255,255,0.25)" />
        <ellipse cx="190" cy="340" rx="60" ry="14" fill="rgba(255,255,255,0.2)" />
      </svg>
      <div className="fountain-watermark">Potosí</div>
    </div>
  )
}
