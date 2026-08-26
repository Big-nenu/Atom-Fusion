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

function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val))
}

export default function App() {
  const [discovered, setDiscovered] = useState(() => {
    const saved = localStorage.getItem('atom-fusion-discovered')
    if (saved) {
      try { return new Set(JSON.parse(saved)) } catch (e) { console.error(e) }
    }
    return new Set(STARTING_PARTICLE_IDS)
  })
  const [board, setBoard] = useState([])
  const [zone, setZone] = useState([])
  const [zoneFx, setZoneFx] = useState(null)
  const [toast, setToast] = useState(null)
  const [showEncyclopedia, setShowEncyclopedia] = useState(false)

  const nextId = useRef(1)
  const boardRef = useRef(null)
  const zoneRef = useRef(null)
  const fxTimer = useRef(null)
  const toastTimer = useRef(null)
  const latestZone = useRef([])
  const rejectTimer = useRef(null)
  const initialized = useRef(false)

  useEffect(() => {
    localStorage.setItem('atom-fusion-discovered', JSON.stringify([...discovered]))
  }, [discovered])

  const discoveredCount = ALL_PARTICLE_IDS.filter((id) => discovered.has(id)).length
  const total = ALL_PARTICLE_IDS.length

  function getSpawnPos() {
    const el = boardRef.current
    const w = el?.clientWidth || 360
    const h = el?.clientHeight || 300
    const cx = w / 2
    const cy = h / 2
    const minRadius = 140 
    let x, y, attempts = 0
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

  function clearBoard() { setBoard([]) }

  function unlock(particleId) {
    setDiscovered((prev) => prev.has(particleId) ? prev : new Set(prev).add(particleId))
  }

  function notify(msg) {
    clearTimeout(toastTimer.current)
    setToast({ id: Date.now(), msg })
    toastTimer.current = setTimeout(() => setToast(null), 3000)
  }

  function handleDrop(localId, pos) {
    try {
      const item = board.find((i) => i.localId === localId)
      if (!item) return
      const zoneRect = zoneRef.current?.getBoundingClientRect()
      let inZone = false
      if (zoneRect) {
        inZone = pos.centerX >= zoneRect.left && pos.centerX <= zoneRect.right && 
                 pos.centerY >= zoneRect.top && pos.centerY <= zoneRect.bottom
      }
      if (inZone) {
        setBoard((prev) => prev.filter((i) => i.localId !== localId))
        setZone((prev) => [...prev, item.particleId])
      } else {
        setBoard((prev) => prev.map((p) => {
          if (p.localId === localId) {
            const br = boardRef.current?.getBoundingClientRect()
            const offX = br?.left || 0
            const offY = br?.top || 0
            let fX = pos.centerX - offX - 30
            let fY = pos.centerY - offY - 30
            const w = br?.width || 360, h = br?.height || 300
            fX = clamp(fX, 0, w - 60)
            fY = clamp(fY, 0, h - 60)
            let attempts = 0, overlapped = true
            while (overlapped && attempts < 5) {
              overlapped = prev.some(o => o.localId !== localId && Math.hypot(fX - o.x, fY - o.y) < 65)
              if (overlapped) {
                fX = clamp(fX + (Math.random() - 0.5) * 40, 0, w - 60)
                fY = clamp(fY + (Math.random() - 0.5) * 40, 0, h - 60)
              }
              attempts++
            }
            return { ...p, x: fX, y: fY }
          }
          return p
        }))
      }
    } catch (e) {
      console.error(e)
      setBoard(prev => prev.map(p => p.localId === localId ? { ...p, x: pos.centerX - 30, y: pos.centerY - 30 } : p))
    }
  }

  // Devuelve al tablero todo lo que haya en la olla (expulsión tras error
  // y botón "Vaciar"). Usa `latestZone` (ref sincronizado con `zone` en cada
  // render) para evitar capturar closures obsoletos en timers diferidos.
  function rejectZone() {
    if (fxTimer.current) clearTimeout(fxTimer.current)
    if (rejectTimer.current) clearTimeout(rejectTimer.current)
    const contents = latestZone.current
    latestZone.current = []
    if (contents.length > 0) spawnMany(contents)
    setZone([])
    setZoneFx(null)
  }

  function clearZone() {
    rejectZone()
  }

  useEffect(() => {
    latestZone.current = zone
    if (zone.length < 2) return

    const currentZone = [...zone]
    const outcome = resolveRecipe(currentZone)

    if (outcome.type === 'invalid') {
      // ERROR INSTANTÁNEO: Sin timers, respuesta inmediata
      setZoneFx({ type: 'error' })
      notify('La fusión falló...')
      rejectTimer.current = setTimeout(rejectZone, 400)
    } else if (outcome.type === 'fuse') {
      // ÉXITO RÁPIDO: Solo un pequeño delay visual para el efecto
      fxTimer.current = setTimeout(() => {
        const pid = outcome.result
        setZoneFx({ type: 'fuse', result: pid })
        unlock(pid)
        notify(`¡Fusionado: ${PARTICLES[pid].name}!`)
        latestZone.current = []
        setZone([])
        spawn(pid)
      }, 200)
    } else {
      // Incompleto: no hacemos nada, esperamos más piezas
      setZoneFx(null)
    }

    return () => {
      if (fxTimer.current) clearTimeout(fxTimer.current)
      if (rejectTimer.current) clearTimeout(rejectTimer.current)
    }
  }, [zone])

  useEffect(() => {
    // StrictMode (solo desarrollo) monta dos veces; este guard evita que el
    // spawn inicial se duplique (10 piezas en vez de 5).
    if (initialized.current) return
    initialized.current = true
    spawnMany(['up', 'up', 'down', 'electron', 'photon'])
  }, [])

  return (
    <div className="app">
      <header className="app-header">
        <h1>⚛️ Atom-Fusion</h1>
        <div className="header-right">
          <span className="progress">{discoveredCount} / {total}</span>
          <button className="mini-ency" onClick={clearBoard} title="Limpiar">🧹</button>
          <button className="mini-ency" onClick={() => setShowEncyclopedia(true)}>📖</button>
        </div>
      </header>
      <main className="board" ref={boardRef}>
        {board.map((piece) => (
          <Draggable key={piece.localId} style={{ left: piece.x, top: piece.y }} onRelease={(pos) => handleDrop(piece.localId, pos)}>
            <ParticleChip particle={PARTICLES[piece.particleId]} size={58} compact />
          </Draggable>
        ))}
        <FusionZone ref={zoneRef} contents={zone} onClear={clearZone} fx={zoneFx} />
      </main>
      <Inventory discovered={discovered} onSpawn={spawn} onOpenEncyclopedia={() => setShowEncyclopedia(true)} />
      {toast && <div className="toast">{toast.msg}</div>}
      {showEncyclopedia && <Encyclopedia discovered={discovered} onClose={() => setShowEncyclopedia(false)} />}
    </div>
  )
}
