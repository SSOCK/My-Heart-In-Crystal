export const BASE = {
  DEFAULT: '/assets/bases/base.glb',
  ONE: '/assets/bases/base1.glb',
} as const;

export const BOTTOM = {
  DEFAULT: { name: 'default', path: '/assets/bottoms/bottom.glb' },
  ONE: { name: 'snow', path: '/assets/bottoms/bottom1.glb' },
  TWO: { name: 'grass', path: '/assets/bottoms/bottom2.glb' },
  THREE: { name: 'tree', path: '/assets/bottoms/bottom3.glb' },
} as const;

export const DECO = {
  PRESENT: {
    name: 'giftBox',
    fileName: '/assets/models/ribbonBox.glb',
  },
  FISHBREAD: {
    name: 'fishBread',
    fileName: '/assets/models/fishBread.glb',
  },
  GINGERBREAD: {
    name: 'gingerBread',
    fileName: '/assets/models/gingerBread.glb',
  },
  CHEST: { name: 'chest', fileName: '/assets/models/chest.glb' },
  DDONG: { name: 'poop', fileName: '/assets/models/ddong.glb' },
  MINISNOWMAN: {
    name: 'miniSnowMan',
    fileName: '/assets/models/miniSnowMan.glb',
  },
  SOCKS: { name: 'socks', fileName: '/assets/models/socks.glb' },
} as const;

export const SENTIMENT = {
  positive: '/assets/flakes/heart.glb',
  neutral: '/assets/flakes/star.glb',
  negative: '/assets/flakes/water.glb',
} as const;

export type Sentiment = keyof typeof SENTIMENT;

export const GROUND = {
  WINTER: '/assets/grounds/winter.glb',
} as const;

export const MAIN_DECORATION = {
  BANANA_CAT: { name: 'bananaCat', path: '/assets/sprites/bananaCat.glb' },
  DUCK: { name: 'duck', path: '/assets/sprites/bcduck.glb' },
  GLASSES_DUCK: {
    name: 'glassesDuck',
    path: '/assets/sprites/bcduck_glasses.glb',
  },
  SANTACLAUS: { name: 'santa', path: '/assets/sprites/santa.glb' },
  SNOWMAN: { name: 'snowMan', path: '/assets/sprites/snowman.glb' },
  TREE: { name: 'tree', path: '/assets/sprites/tree.glb' },
  TUX: { name: 'tux', path: '/assets/sprites/tux.glb' },
} as const;

export const SNOW_FLAKE = {
  ONE: '/assets/flakes/snowFlake01.glb',
  TWO: '/assets/flakes/snowFlake02.glb',
  THREE: '/assets/flakes/snowFlake03.glb',
} as const;

export const DECO_TYPE = {
  MAIN: 'MainDeco',
  SUB: 'SubDeco',
  BASE: 'Base',
  BOTTOM: 'Bottom',
} as const;

export const ETC = {
  NEW: '/assets/etcs/new.glb',
} as const;

export const ENVIRONMENTS = {
  MOON: '/assets/environments/moon.glb',
  TREE: '/assets/environments/spruce.glb',
  HOUSE: '/assets/environments/house.glb',
} as const;
