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
  positron: {
    id: 'positron',
    name: 'Positrón',
    symbol: 'e⁺',
    category: 'antimateria',
    level: 1,
    color: '#ff4081',
    emoji: '⚡️',
    description: 'La antipartícula del electrón: misma masa, carga positiva.',
    lore: 'El positrón es la imagen especular del electrón: existe, pero con carga opuesta. Cuando una partícula y su antipartícula se encuentran, ambas se aniquilan convirtiendo toda su masa en energía (rayos gamma). Los positrones también se producen en el centro de las estrellas y en rayos cósmicos.',
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
  beryllium: {
    id: 'beryllium',
    name: 'Berilio',
    symbol: 'Be',
    category: 'atomo',
    level: 4,
    color: '#8e24aa',
    emoji: '💠',
    description: 'Primer escalón de la quema de helio: dos núcleos de helio que se fusionan en el corazón estelar.',
    lore: 'Cuando el núcleo de una estrella se queda sin hidrógeno, empieza a quemar helio. Dos núcleos de ⁴He se fusionan y dan un núcleo de berilio (⁸Be), tan inestable que se auto-destruye al instante... a menos que capture otro helio justo antes.',
  },
  carbon: {
    id: 'carbon',
    name: 'Carbono',
    symbol: 'C',
    category: 'atomo',
    level: 4,
    color: '#455a64',
    emoji: '⚫',
    description: 'Núcleo C-12 (6 protones y 6 neutrones), forjado por fusión estelar. Base de la química orgánica.',
    lore: 'La "triple alfa": el berilio recién formado captura de inmediato un tercer núcleo de helio y produce carbono-12. Es el origen de todo el carbono del universo, y con él el del oxígeno y de la vida.',
  },
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
  carbon_dioxide: {
    id: 'carbon_dioxide',
    name: 'Dióxido de Carbono',
    symbol: 'CO₂',
    category: 'molécula',
    level: 5,
    color: '#bdbdbd',
    emoji: '🌫️',
    description: '1 átomo de Carbono + 2 de Oxígeno. Gas de efecto invernadero.',
    lore: 'En las estrellas muy masivas, el carbono quemado acaba combinándose con oxígeno y esparciéndose como CO₂ por el espacio. En la Tierra, ese mismo gas regula el clima (efecto invernadero) y es vital para la fotosíntesis.',
  },
  methane: {
    id: 'methane',
    name: 'Metano',
    symbol: 'CH₄',
    category: 'molécula',
    level: 5,
    color: '#ff7043',
    emoji: '🔥',
    description: '1 átomo de Carbono + 4 de Hidrógeno. Gas combustible natural.',
    lore: 'Una molécula de carbono que atrapa cuatro hidrógenos. Es el gas más abundante en la atmósfera de lunas como Titán y aparece en el medio interestelar: un puente entre la astrofísica y el gas natural terrestre.',
  },
  ozone: {
    id: 'ozone',
    name: 'Ozono',
    symbol: 'O₃',
    category: 'molécula',
    level: 5,
    color: '#4fc3f7',
    emoji: '🛡️',
    description: '3 átomos de Oxígeno unidos. Nos protege de los rayos UV.',
    lore: 'Tres átomos de oxígeno unidos. En la alta atmósfera forma la capa de ozono que bloquea la radiación ultravioleta del Sol; sin ella, la vida en la superficie de la Tierra no podría existir.',
  },
}

export const ALL_PARTICLE_IDS = Object.keys(PARTICLES)

// Las que el jugador tiene al empezar.
export const STARTING_PARTICLE_IDS = ['up', 'down', 'electron', 'photon', 'positron']