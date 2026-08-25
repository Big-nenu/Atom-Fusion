# ⚛️ Alquimia de Partículas

Juego web interactivo (mobile-first) de **síntesis de partículas y física**.
Arrastra partículas a la *Zona de Fusión* central para combinarlas y
descubrir nuevas estructuras, llenando tu **Libro de descubiertas**.

## 🚀 Ejecutar

```bash
npm install      # solo la primera vez
npm run dev      # http://localhost:5173
npm run build    # build de producción en /dist
```

## 🧩 Mecánicas

- **Inventario inferior**: partículas descubiertas (recursos infinitos).
  Toca una para copiarla al tablero.
- **Tablero**: arrastra las piezas sueltas.
- **Zona de Fusión** (circulo central): suelta piezas ahí. Cuando el
  contenido coincide *exactamente* con una receta → **fusión** con
  animación y nuevo descubrimiento. Si el contenido no forma ni podrá
  formar receta → **expulsión** de vuelta al tablero con destello de error.
- **Libro de descubiertas** (📖): muestra lo descubierto, lo pendiente ("???")
  y las recetas de cada partícula.

### Progreso (niveles)

1. **Partículas elementales**: Quark Up, Quark Down, Electrón, Fotón (iniciales).
2. **Compuestas**: 2↑ + ↓ = Protón · ↑ + 2↓ = Neutrón
3. **Núcleos**: 2 Protón + 2 Neutrón = Núcleo de Helio
4. **Átomos**: Protón + Electrón = Hidrógeno · Núcleo He + 2e = Oxígeno
5. **Moléculas**: 2 Hidrógeno + 1 Oxígeno = Agua (H₂O)

## 🗂️ Arquitectura

- **React + Vite** · estado declarativo · DOM arrastrable (pointer events; sin Canvas).
- `src/data/particles.js` — diccionario declarativo de partículas.
- `src/data/recipes.js` — **diccionario declarativo de recetas** (añadir una
  receta = añadir una línea, sin tocar el motor).
- `src/game/combine.js` — **motor de combinación puro y genérico** (match de
  multiconjuntos contra el diccionario).
- `src/components/` — Draggable, ParticleChip, FusionZone, Inventory, Encyclopedia.
- `src/App.jsx` — estado central y resolución automática de la olla.
