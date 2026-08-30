import { PARTICLES, ALL_PARTICLE_IDS } from '../data/particles.js'
import ParticleChip from './ParticleChip.jsx'

// ============================================================
// Inventario inferior. Muestra todas las partículas descubiertas.
// Tocar una de ellas la envía directamente a la Zona de Fusión.
// Las no descubiertas aparecen bloqueadas con "?".
// ============================================================

export default function Inventory({ discovered, onAddToZone, onOpenEncyclopedia }) {
  return (
    <nav className="inventory" aria-label="Inventario de partículas">
      <div className="inventory-scroll">
        {ALL_PARTICLE_IDS.map((id) => {
          const p = PARTICLES[id]
          const unlocked = discovered.has(id)
          return (
            <button
              key={id}
              type="button"
              className={`inv-item${unlocked ? '' : ' inv-locked'}`}
              disabled={!unlocked}
              data-testid={`inventory-${id}`}
              onClick={() => unlocked && onAddToZone(id)}
            >
              <ParticleChip particle={p} size={48} compact />
              <span className="inv-label">{p.symbol}</span>
            </button>
          )
        })}
        <button
          type="button"
          className="inv-item inv-ency"
          data-testid="open-encyclopedia"
          onClick={onOpenEncyclopedia}
        >
          <span className="ency-emoji">📖</span>
          <span className="inv-label">Libro</span>
        </button>
      </div>
    </nav>
  )
}