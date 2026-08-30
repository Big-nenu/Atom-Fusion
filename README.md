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
  **Toca una para enviarla directo a la Zona de Fusión**.
- **Tablero / Zona de Espera**: arrastra las piezas sueltas, o **tócalas para
  reintroducirlas directo a la Zona de Fusión** (si hay espacio).
- **Zona de Fusión** (círculo central): admite **hasta 5 piezas simultáneas**.
  Suelta piezas ahí o tócalas en el inventario. Cuando el contenido coincide
  *exactamente* con una receta → **fusión** con animación y nuevo descubrimiento.
  Si el contenido no forma ni podrá formar receta → **expulsión** de vuelta al
  tablero con destello de error.
- **Tap to Remove**: toca una pieza concreta dentro de la Zona para retirarla
  y devolverla al tablero. El botón *Vaciar* limpia todo de golpe.
- **Libro de descubiertas** (📖): muestra lo descubierto, lo pendiente ("???"),
  las recetas de cada partícula y sus **tarjetas de lore** astrofísico.
- **Antimateria**: el Positrón (e⁺, antipartícula del electrón) viene
  desbloqueado. Combinar un Electrón con un Positrón provoca su **aniquilación**
  y produce un Fotón de energía radiante.

### Progreso (niveles)

1. **Partículas elementales**: Quark Up, Quark Down, Electrón, Fotón,
   **Positrón** (iniciales). Al tener el positrón puedes experimentar con la
   **aniquilación**: Electrón + Positrón → Fotón (la masa se convierte en energía).
2. **Compuestas**: 2↑ + ↓ = Protón · ↑ + 2↓ = Neutrón
3. **Núcleos**: 2 Protón + 2 Neutrón = Núcleo de Helio (⁴He)
4. **Átomos** (ciclo estelar):
   - 2 ⁴He = **Berilio** (Be) — quema de helio
   - Be + ⁴He = **Carbono** (C) — triple alfa
   - C + ⁴He = **Oxígeno** (O) — quema de carbono
   - Protón + Electrón = Hidrógeno (H)
5. **Moléculas**: 2 H + 1 O = Agua (H₂O) · C + 2 O = CO₂ (Dióxido de Carbono) ·
   C + 4 H = CH₄ (Metano) · 3 O = O₃ (Ozono)

## 🗂️ Arquitectura

- **React + Vite** · estado declarativo · DOM arrastrable (pointer events; sin Canvas).
- `src/data/particles.js` — diccionario declarativo de partículas.
- `src/data/recipes.js` — **diccionario declarativo de recetas** (añadir una
  receta = añadir una línea, sin tocar el motor).
- `src/game/combine.js` — **motor de combinación puro y genérico** (match de
  multiconjuntos contra el diccionario).
- `src/components/` — Draggable, ParticleChip, FusionZone, Inventory, Encyclopedia.
- `src/App.jsx` — estado central y resolución automática de la olla.
