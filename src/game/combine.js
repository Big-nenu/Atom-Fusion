// ============================================================
// Motor de combinación (función pura).
// NO conoce ninguna receta específica: lee el diccionario
// declarativo de recipes.js. Así se mantiene a prueba de
// crecimiento del contenido.
// ============================================================

import { RECIPES } from '../data/recipes.js'

// Contar cuántas veces aparece cada partícula en una lista.
export function countsOf(list) {
  const counts = {}
  for (const id of list) {
    counts[id] = (counts[id] || 0) + 1
  }
  return counts
}

// ¿El multiconjunto `needle` cabe dentro de `haystack`?
// (cada cantidad de needle <= cantidad de haystack)
export function isSubset(needle, haystack) {
  for (const key in needle) {
    if ((haystack[key] || 0) < needle[key]) return false
  }
  return true
}

// ¿El multiconjunto `a` es EXACTAMENTE igual a `b`?
export function isExactlyEqual(a, b) {
  const keys = new Set([...Object.keys(a), ...Object.keys(b)])
  for (const key of keys) {
    if ((a[key] || 0) !== (b[key] || 0)) return false
  }
  return true
}

// Buscar una receta que coincida de forma exacta con el contenido.
export function findExactRecipe(contents) {
  const multiset = countsOf(contents)
  for (const recipe of RECIPES) {
    if (isExactlyEqual(multiset, recipe.ingredients)) return recipe
  }
  return null
}

// ¿El contenido actual podría llegar a completar al menos una receta
// añadiendo más piezas? (es un subconjunto de alguna receta)
export function isContinuable(contents) {
  const multiset = countsOf(contents)
  for (const recipe of RECIPES) {
    // El contenido debe caber dentro de los ingredientes de la receta.
    if (isSubset(multiset, recipe.ingredients)) return true
  }
  return false
}

// Decidir qué ocurre con el contenido de la "olla".
// Retorna un objeto con:
//   type: 'fuse'       -> hay receta exacta, produce `result` con `recipe`
//   type: 'incomplete' -> aún se pueden añadir más piezas (subconjunto de alguna receta)
//   type: 'invalid'    -> no forma ni continuará ninguna receta (expulsar)
export function resolveRecipe(contents) {
  if (contents.length === 0) return { type: 'empty' }

  const exact = findExactRecipe(contents)
  if (exact) {
    return { type: 'fuse', recipe: exact, result: exact.result }
  }

  if (isContinuable(contents)) {
    return { type: 'incomplete' }
  }

  return { type: 'invalid' }
}

// Receta del inventario necesaria para desbloquear cada nivel extra.
export function recipesThatProduce(particleId) {
  return RECIPES.filter((r) => r.result === particleId)
}