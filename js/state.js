import { swords } from './swords.js'

export const player = {
  name: '',
  hp: 100,
  max_hp: 100,
  upgradeMaxHpCost: 200,
  upgradeMaxHp: 20,
  sword: swords[0],
  gold: 0
}

export function initPlayer(name) {
  player.name = name
}