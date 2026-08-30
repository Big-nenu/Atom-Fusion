import { forwardRef } from 'react'
import { PARTICLES } from '../data/particles.js'
import ParticleChip from './ParticleChip.jsx'

// ============================================================
// La "olla / Zona de Fusión": círculo central donde se arrastran
// las partículas sueltas. Cuando su contenido coincide
// EXACTAMENTE con una receta, dispara la fusión (fx.type='fuse').
// Si el contenido es inválido, muestra un flash rojo (fx.type='error').
// ============================================================

const FusionZone = forwardRef(function FusionZone(
  { contents, onClear, fx, onRemovePiece },
  zoneRef
) {
  const hasItems = contents.length > 0

  return (
    <section
      ref={zoneRef}
      className={`fusion-zone${fx && fx.type === 'error' ? ' zone-error' : ''}${
        fx && fx.type === 'fuse' ? ' zone-fuse' : ''
      }`}
      aria-label="Zona de fusión"
    >
      <div className="zone-inner">
        <span className="zone-caption">Zona de Fusión</span>

        {hasItems ? (
          <div className="zone-contents">
            {contents.map((id, i) => (
              <button
                type="button"
                key={`${id}-${i}`}
                className="zone-piece"
                onClick={() => onRemovePiece && onRemovePiece(i)}
                aria-label={`Quitar ${PARTICLES[id]?.name} de la zona`}
                title="Tocar para quitar"
              >
                <ParticleChip particle={PARTICLES[id]} size={46} compact />
              </button>
            ))}
          </div>
        ) : (
          <span className="zone-empty">Arrastra aquí o toca en el inventario</span>
        )}

        {fx && fx.type === 'fuse' && (
          <div className="zone-fx fuse-fx">💥 {PARTICLES[fx.result]?.name}</div>
        )}
        {fx && fx.type === 'error' && <div className="zone-fx error-fx">╳ No produce nada</div>}

        {hasItems && (
          <button
            type="button"
            className="zone-clear"
            onClick={onClear}
            aria-label="Vaciar la zona de fusión"
          >
            ⟲ Vaciar
          </button>
        )}
      </div>
    </section>
  )
})

export default FusionZone