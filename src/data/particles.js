// ============================================================
// Diccionario declarativo de partículas (contenido del juego)
// Cada partícula: id único, nombre, símbolo, categoría,
// nivel de descubrimiento, color y emoji visual.
// ============================================================

export const LEVEL_NAMES = {
  1: 'Partículas elementales',
  2: 'Partículas compuestas',
  3: 'Núcleos atómicos',
  4: 'Átomos',
  5: 'Moléculas',
}

export const PARTICLES = {
  // ---- Nivel 1: dado al inicio ----
  up: {
    id: 'up',
    name: 'Quark Up',
    symbol: '↑',
    category: 'elemental',
    level: 1,
    color: '#e91e63',
    emoji: '🔴',
    description: 'Quark con carga +2/3. Ladrillo fundamental de la materia.',
  },
  down: {
    id: 'down',
    name: 'Quark Down',
    symbol: '↓',
    category: 'elemental',
    level: 1,
    color: '#3f51b5',
    emoji: '🔵',
    description: 'Quark con carga −1/3. Pareja del quark up.',
  },
  electron: {
    id: 'electron',
    name: 'Electrón',
    symbol: 'e⁻',
    category: 'elemental',
    level: 1,
    color: '#00bcd4',
    emoji: '⚡',
    description: 'Partícula elemental con carga negativa.',
  },
  photon: {
    id: 'photon',
    name: 'Fotón',
    symbol: 'γ',
    category: 'elemental',
    level: 1,
    color: '#ffc107',
    emoji: '✨',
    description: 'Cuantum de luz. Sin masa y siempre veloz.',
  },

  // ---- Nivel 2: compuestas ----
  proton: {
    id: 'proton',
    name: 'Protón',
    symbol: 'p⁺',
    category: 'compuesta',
    level: 2,
    color: '#f44336',
    emoji: '🧱',
    description: 'Compuesto por 2 quarks up y 1 down. Carga positiva.',
  },
  neutron: {
    id: 'neutron',
    name: 'Neutrón',
    symbol: 'n⁰',
    category: 'compuesta',
    level: 2,
    color: '#9e9e9e',
    emoji: '🪨',
    description: 'Compuesto por 1 quark up y 2 down. Carga neutra.',
  },

  // ---- Nivel 3: núcleos ----
  helium_nucleus: {
    id: 'helium_nucleus',
    name: 'Núcleo de Helio',
    symbol: '⁴He',
    category: 'nucleo',
    level: 3,
    color: '#673ab7',
    emoji: '🎯',
    description: 'Núcleo alfa: 2 protones y 2 neutrones unidos.',
  },

  // ---- Nivel 4: átomos ----
  hydrogen: {
    id: 'hydrogen',
    name: 'Hidrógeno',
    symbol: 'H',
    category: 'atomo',
    level: 4,
    color: '#4caf50',
    emoji: '💧',
    description: 'El átomo más simple: un protón y un electrón.',
  },
  oxygen: {
    id: 'oxygen',
    name: 'Oxígeno',
    symbol: 'O',
    category: 'atomo',
    level: 4,
    color: '#f06292',
    emoji: '🌬️',
    description: 'Átomo esencial para la respiración y las moléculas de la vida.',
  },

  // ---- Nivel 5: moléculas ----
  water: {
    id: 'water',
    name: 'Agua',
    symbol: 'H₂O',
    category: 'molécula',
    level: 5,
    color: '#29b6f6',
    emoji: '💦',
    description: '2 átomos de Hidrógeno + 1 de Oxígeno. ¡La molécula de la vida!',
  },
}

export const ALL_PARTICLE_IDS = Object.keys(PARTICLES)

// Las que el jugador tiene al empezar.
export const STARTING_PARTICLE_IDS = ['up', 'down', 'electron', 'photon']