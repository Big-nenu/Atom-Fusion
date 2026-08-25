import { PARTICLES, ALL_PARTICLE_IDS, LEVEL_NAMES } from '../data/particles.js'
import { RECIPES } from '../data/recipes.js'
import { countsOf } from '../game/combine.js'

// ============================================================
// Enciclopedia / Libro de descubiertas.
// Muestra las partículas descubiertas (con su receta) y las que
// faltan por desbloquear como "???".
// ============================================================

export default function Encyclopedia({ discovered, onClose }) {
  const discoveredCount = ALL_PARTICLE_IDS.filter((id) => discovered.has(id)).length
  const total = ALL_PARTICLE_IDS.length

  const byLevel = {}
  for (const id of ALL_PARTICLE_IDS) {
    const p = PARTICLES[id]
    ;(byLevel[p.level] = byLevel[p.level] || []).push(id)
  }

  return (
    <div className="encyclopedia-overlay" data-testid="encyclopedia" onClick={onClose}>
      <div className="encyclopedia" onClick={(e) => e.stopPropagation()}>
        <header className="ency-header">
          <h2>📖 Libro de descubiertas</h2>
          <span className="ency-progress">
            {discoveredCount} / {total}
          </span>
          <button type="button" className="ency-close" onClick={onClose} aria-label="Cerrar">
            ✕
          </button>
        </header>

        <div className="ency-body">
          {Object.keys(LEVEL_NAMES).map((lv) => {
            const ids = byLevel[lv] || []
            if (ids.length === 0) return null
            return (
              <section key={lv} className="ency-level">
                <h3>{LEVEL_NAMES[lv]}</h3>
                <div className="ency-grid">
                  {ids.map((id) => {
                    const p = PARTICLES[id]
                    const unlocked = discovered.has(id)
                    const recipe = RECIPES.find((r) => r.result === id)
                    return (
                      <article
                        key={id}
                        className={`ency-card${unlocked ? '' : ' locked'}`}
                        data-testid={`ency-${id}`}
                      >
                        {unlocked ? (
                          <>
                            <span className="ency-card-emoji">{p.emoji}</span>
                            <strong>{p.name}</strong>
                            <em className="ency-symbol">{p.symbol}</em>
                            <p className="ency-desc">{p.description}</p>
                            {recipe && (
                              <div className="ency-recipe">
                                {Object.entries(countsOf(
                                  Object.entries(recipe.ingredients).flatMap(([ing, n]) =>
                                    Array(n).fill(ing)
                                  )
                                )).map(([ing, n]) => (
                                  <span key={ing}>
                                    {n > 1 && `${n}×`}
                                    {PARTICLES[ing].symbol}
                                  </span>
                                ))}
                              </div>
                            )}
                          </>
                        ) : (
                          <>
                            <span className="ency-card-emoji">❔</span>
                            <strong>???</strong>
                            <p className="ency-desc">Descúbrelo combinando partículas.</p>
                          </>
                        )}
                      </article>
                    )
                  })}
                </div>
              </section>
            )
          })}
        </div>
      </div>
    </div>
  )
}