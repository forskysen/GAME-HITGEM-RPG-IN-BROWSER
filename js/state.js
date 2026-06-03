import { swordS } from "./swords.js"

const defaultPlayer = {
  name: '',
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

export function initPlayer(name) {
  player.name = name
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