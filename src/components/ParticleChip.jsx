// ============================================================
// Representación visual uniforme de una partícula.
// Un círculo de color con el símbolo y una etiqueta con el nombre.
// ============================================================

export default function ParticleChip({ particle, size = 56, compact = false }) {
  return (
    <div
      className="particle-chip"
      style={{
        '--pc': particle.color,
        width: size,
        height: size,
      }}
    >
      <span className="chip-emoji">{particle.emoji}</span>
      <span className="chip-symbol">{particle.symbol}</span>
      {!compact && <span className="chip-name">{particle.name}</span>}
    </div>
  )
}