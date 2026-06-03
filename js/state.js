import { swords } from "./swords.js"

export function initPlayer(name) {
  player.name = name
}

const defaultPlayer = {
  name: name,
  hp: 100,
  max_hp: 100,
  upgradeMaxHpCost: 200,
  upgradeMaxHp: 20,
  sword: swords[0], 
  equippedArmor: null,
  gold: 0,
  activatedPromos: [],
  inventory: []
}

const savedPlayer = localStorage.getItem('rpg_player');
const savedSwords = localStorage.getItem('rpg_swords');

export let player = JSON.parse(savedPlayer) || defaultPlayer;

if (savedSwords) {
  swords = JSON.parse(savedSwords);
}

export function saveGame() {
  localStorage.setItem('rpg_player', JSON.stringify(player));
  localStorage.setItem('rpg_swords', JSON.stringify(swords));
  console.log('Игра успешно сохранена!');
}

export function resetGame() {
  localStorage.removeItem('rpg_player');
  localStorage.removeItem('rpg_swords');
  location.reload();
}