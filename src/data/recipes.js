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
  // ---- Aniquilación ----
  // Electrón + Positrón se aniquilan y convierten su masa en un fotón de energía.
  { id: 'r_annihilation', ingredients: { electron: 1, positron: 1 }, result: 'photon' },

  // ---- Nivel 2: compuestas ----
  { id: 'r_proton', ingredients: { up: 2, down: 1 }, result: 'proton' },
  { id: 'r_neutron', ingredients: { up: 1, down: 2 }, result: 'neutron' },

  // ---- Nivel 3: núcleo atómico ----
  {
    id: 'r_helium_nucleus',
    ingredients: { proton: 2, neutron: 2 },
    result: 'helium_nucleus',
  },
  // Quema de helio: 2 núcleos de helio -> Berilio (⁸Be)
  { id: 'r_beryllium', ingredients: { helium_nucleus: 2 }, result: 'beryllium' },

  // ---- Nivel 4: átomos ----
  { id: 'r_hydrogen', ingredients: { proton: 1, electron: 1 }, result: 'hydrogen' },
  // Triple alfa: Berilio captura otro helio -> Carbono-12
  { id: 'r_carbon', ingredients: { beryllium: 1, helium_nucleus: 1 }, result: 'carbon' },
  // Quema de carbono: Carbono + Helio -> Oxígeno-16
  { id: 'r_oxygen', ingredients: { carbon: 1, helium_nucleus: 1 }, result: 'oxygen' },

  // ---- Nivel 5: moléculas ----
  { id: 'r_water', ingredients: { hydrogen: 2, oxygen: 1 }, result: 'water' },
  { id: 'r_carbon_dioxide', ingredients: { carbon: 1, oxygen: 2 }, result: 'carbon_dioxide' },
  { id: 'r_methane', ingredients: { carbon: 1, hydrogen: 4 }, result: 'methane' },
  { id: 'r_ozone', ingredients: { oxygen: 3 }, result: 'ozone' },
]