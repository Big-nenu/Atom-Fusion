// ============================================================
// Diccionario declarativo de recetas de combinación.
// Cada receta: ingredients (multiconjunto de partícula -> cantidad)
// y result (id de la partícula producida).
//
// REGLA 1: una combinación produce UN único resultado.
// REGLA 2: la fusión ocurre cuando el contenido de la "olla"
//          coincide EXACTAMENTE con una receta.
// Añadir una partícula nueva = añadir una línea aquí, sin tocar
// el motor de combinación (game/combine.js).
// ============================================================

export const RECIPES = [
  // ---- Nivel 2: compuestas ----
  { id: 'r_proton', ingredients: { up: 2, down: 1 }, result: 'proton' },
  { id: 'r_neutron', ingredients: { up: 1, down: 2 }, result: 'neutron' },

  // ---- Nivel 3: núcleo atómico ----
  {
    id: 'r_helium_nucleus',
    ingredients: { proton: 2, neutron: 2 },
    result: 'helium_nucleus',
  },

  // ---- Nivel 4: átomos ----
  { id: 'r_hydrogen', ingredients: { proton: 1, electron: 1 }, result: 'hydrogen' },
  {
    id: 'r_oxygen',
    ingredients: { helium_nucleus: 2, electron: 2 },
    result: 'oxygen',
  },

  // ---- Nivel 5: moléculas ----
  { id: 'r_water', ingredients: { hydrogen: 2, oxygen: 1 }, result: 'water' },
]