import { useRef } from 'react'

// ============================================================
// Contenedor arrastrable que usan las partículas del tablero.
// - Usa Pointer Events (funcionan para mouse Y táctil).
// - El movimiento en vivo se aplica vía `transform` en un ref,
//   por lo que NO re-renderiza React a cada píxel (rendimiento).
// - `touch-action: none` evita que el navegador robe el gesto
//   a su scroll/resize en móvil.
// - Al soltar, llama a `onRelease(pos)` donde pos incluye
//   las coordenadas del puntero y el centro del elemento.
// ============================================================

export default function Draggable({
  children,
  className = '',
  style,
  disabled = false,
  onRelease,
  dataTestId,
}) {
  const ref = useRef(null)
  const dragRef = useRef({ dragging: false })

  function onPointerDown(e) {
    if (disabled) return
    e.preventDefault()
    const el = ref.current
    if (el.setPointerCapture) {
      try {
        el.setPointerCapture(e.pointerId)
      } catch (_) {
        /* noop */
      }
    }
    dragRef.current = {
      dragging: true,
      startX: e.clientX,
      startY: e.clientY,
    }
    el.classList.add('dragging')
  }

  function onPointerMove(e) {
    const d = dragRef.current
    if (!d.dragging) return
    const dx = e.clientX - d.startX
    const dy = e.clientY - d.startY
    ref.current.style.transform = `translate(${dx}px, ${dy}px) scale(1.12)`
  }

  function endDrag(e) {
    const d = dragRef.current
    if (!d.dragging) return
    const el = ref.current
    // Medir el centro ANTES de quitar el transform: así refleja la posición
    // visual real durante el arrastre (y no la posición de reposo original,
    // que haría imposible soltar piezas dentro de la Zona de Fusión).
    const rect = el.getBoundingClientRect()
    el.classList.remove('dragging')
    el.style.transform = ''

    dragRef.current.dragging = false
    if (onRelease) {
      onRelease({
        pointerX: e.clientX,
        pointerY: e.clientY,
        // Centro visual real de la pieza al soltar, útil para el hit-test de la olla.
        centerX: rect.left + el.offsetWidth / 2,
        centerY: rect.top + el.offsetHeight / 2,
      })
    }
  }

  return (
    <div
      ref={ref}
      data-testid={dataTestId}
      className={`draggable ${className}`}
      style={{
        position: 'absolute',
        touchAction: 'none',
        willChange: 'transform',
        ...style,
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
    >
      {children}
    </div>
  )
}