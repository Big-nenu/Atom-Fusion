import { useEffect, useRef, useState } from 'react'
import {
  PARTICLES,
  ALL_PARTICLE_IDS,
  STARTING_PARTICLE_IDS,
} from './data/particles.js'
import { resolveRecipe } from './game/combine.js'
import Draggable from './components/Draggable.jsx'
import ParticleChip from './components/ParticleChip.jsx'
import FusionZone from './components/FusionZone.jsx'
import Inventory from './components/Inventory.jsx'
import Encyclopedia from './components/Encyclopedia.jsx'

export default function App() {
  // ---- Estado central ----
  const [discovered, setDiscovered] = useState(() => {
    const saved = localStorage.getItem('atom-fusion-discovered')
    if (saved) {
      try {
        return new Set(JSON.parse(saved))
      } catch (e) {
        console.error('Error loading progress:', e)
      }
    }
    return new Set(STARTING_PARTICLE_IDS)
  })
  const [board, setBoard] = useState([]) // piezas sueltas: {localId, particleId, x, y}
  const [zone, setZone] = useState([]) // contenido de la olla: [particleId, ...]
  const [zoneFx, setZoneFx] = useState(null) // {type:'fuse'|'error', result?}
  const [toast, setToast] = useState(null) // {id, msg}
  const [showEncyclopedia, setShowEncyclopedia] = useState(false)

  // ---- Refs ----
  const nextId = useRef(1)
  const boardRef = useRef(null)
  const zoneRef = useRef(null)
  const fxTimer = useRef(null)
  const toastTimer = useRef(null)
  const latestZone = useRef([])

  // Persistencia de descubrimientos
  useEffect(() => {
    localStorage.setItem('atom-fusion-discovered', JSON.stringify([...discovered]))
  }, [discovered])

  const discoveredCount = ALL_PARTICLE_IDS.filter((id) => discovered.has(id)).length
  const total = ALL_PARTICLE_IDS.length

  // ---- Utilidades ----
  function getSpawnPos() {
    const el = boardRef.current
    const w = el?.clientWidth || 360
    const h = el?.clientHeight || 300
    const cx = w / 2
    const cy = h / 2

    // Evitar que aparezcan sobre la zona de fusión (aproximadamente el centro)
    // Radio de seguridad para no solapar con FusionZone
    const minRadius = 140 

    let x, y
    let attempts = 0
    do {
      const r = Math.max(minRadius, 130 + (Math.random() * Math.min(w, h)) / 2)
      const ang = Math.random() * Math.PI * 2
      x = clamp(cx + Math.cos(ang) * r, 46, w - 46)
      y = clamp(cy + Math.sin(ang) * r, 60, h - 60)
      attempts++
    } while (attempts < 10 && Math.hypot(x - cx, y - cy) < minRadius)

    return { x, y }
  }

  function spawn(particleId, pos) {
    const localId = nextId.current++
    const p = pos || getSpawnPos()
    setBoard((b) => [...b, { localId, particleId, ...p }])
  }

  function spawnMany(particleIds) {
    if (!particleIds || particleIds.length === 0) return
    const newPieces = particleIds.map((id) => ({
      localId: nextId.current++,
      particleId: id,
      ...getSpawnPos(),
    }))
    setBoard((b) => [...b, ...newPieces])
  }

  function clearBoard() {
    setBoard([])
  }

  function unlock(particleId) {
    setDiscovered((prev) => {
      if (prev.has(particleId)) return prev
      return new Set(prev).add(particleId)
    })
  }

  function notify(msg) {
    clearTimeout(toastTimer.current)
    setToast({ id: Date.now(), msg })
    toastTimer.current = setTimeout(() => setToast(null), 2200)
  }

  function clearFxTimer() {
    clearTimeout(fxTimer.current)
  }

  function clamp(v, min, max) {
    return Math.max(min, Math.min(max, v))
  }
// ---- Resolución automática del contenido de la olla ----
  useEffect(() => {
    latestZone.current = zone
    if (zone.length === 0) return

    const res = resolveRecipe(zone)
    clearFxTimer()

    if (res.type === 'fuse') {
      const name = PARTICLES[res.result].name
      setZone([])
      unlock(res.result)
      spawn(res.result)
      setZoneFx({ type: 'fuse', result: res.result })
      notify(`Nuevo descubrimiento: ${name}`)
      fxTimer.current = setTimeout(() => setZoneFx(null), 900)
    } else if (res.type === 'invalid') {
      setZoneFx({ type: 'error' })
      fxTimer.current = setTimeout(() => {
        setZoneFx(null)
        spawnMany(latestZone.current)
        setZone([])
      }, 850)
    }
    // 'incomplete' -> se esperan más piezas, sin hacer nada aún.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zone])

  function handleDrop(localId, pos) {
    const item = board.find((i) => i.localId === localId)
    if (!item) return

    const zoneRect = zoneRef.current?.getBoundingClientRect()
    let inZone = false
    if (zoneRect) {
      inZone =
        pos.pointerX >= zoneRect.left &&
        pos.pointerX <= zoneRect.right &&
        pos.pointerY >= zoneRect.top &&
        pos.pointerY <= zoneRect.bottom
    }
    if (!inZone) return // volver a su sitio (snap back)

    setBoard((prev) => prev.filter((i) => i.localId !== localId))
    setZone((prev) => [...prev, item.particleId])
  }

  function clearZone() {
    clearFxTimer()
    if (zone.length > 0) {
      spawnMany(zone)
      setZone([])
      setZoneFx(null)
    }
  }  // ---- Núcleo inicial del tablero (una sola vez, aunque StrictMode
  //      re-monte el componente en desarrollo) ----
  const didInit = useRef(false)
  useEffect(() => {
    if (didInit.current) return
    didInit.current = true
    spawnMany(['up', 'up', 'down', 'electron', 'photon'])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="app">
      <header className="app-header">
        <h1>⚛️ Atom-Fusion</h1>
        <div className="header-right">
          <span className="progress" data-testid="progress">
            {discoveredCount} / {total}
          </span>
          <button
            type="button"
            className="mini-ency"
            title="Limpiar tablero"
            onClick={clearBoard}
            aria-label="Limpiar tablero"
          >
            🧹
          </button>
          <button
            type="button"
            className="mini-ency"
            data-testid="open-encyclopedia"
            onClick={() => setShowEncyclopedia(true)}
            aria-label="Abrir enciclopedia"
          >
            📖
          </button>
        </div>
      </header>

      <main className="board" ref={boardRef}>
        {board.map((piece) => {
          const p = PARTICLES[piece.particleId]
          return (
            <Draggable
              key={piece.localId}
              dataTestId={`board-${piece.particleId}-${piece.localId}`}
              style={{ left: piece.x, top: piece.y }}
              onRelease={(pos) => handleDrop(piece.localId, pos)}
            >
              <ParticleChip particle={p} size={58} compact />
            </Draggable>
          )
        })}

        <FusionZone ref={zoneRef} contents={zone} onClear={clearZone} fx={zoneFx} />
      </main>

      <Inventory
        discovered={discovered}
        onSpawn={spawn}
        onOpenEncyclopedia={() => setShowEncyclopedia(true)}
      />

      {toast && (
        <div className="toast" key={toast.id} data-testid="toast">
          {toast.msg}
        </div>
      )}

      {showEncyclopedia && (
        <Encyclopedia
          discovered={discovered}
          onClose={() => setShowEncyclopedia(false)}
        />
      )}
    </div>
  )
}