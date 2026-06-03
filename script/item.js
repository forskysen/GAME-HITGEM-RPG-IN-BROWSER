import { player, saveGame } from "./state.js";

const items = [
    {
        id: 1,
        name: 'potionHeal1lvl',
        type: 'potion',
        title: 'Зелье лечения 1 уровня (восстанавливает 50 здоровья)',
        price: 100
    },
    {
        id: 2,
        name: 'potionHeal2lvl',
        type: 'potion',
        title: 'Зелье лечения 2 уровня (восстанавливает 120 здоровья)',
        price: 220
    },
    {
        id: 3,
        name: 'potionHeal3lvl',
        type: 'potion',
        title: 'Зелье лечения 3 уровня (восстанавливает 250 здоровья)',
        price: 450
    },
    {
        id: 4,
        name: 'potionHeal4lvl',
        type: 'potion',
        title: 'Зелье лечения 4 уровня (восстанавливает 500 здоровья)',
        price: 850
    },
    {
        id: 5,
        name: 'hpBoostHeart',
        title: 'Сердце ярника(увеличивает максимальное ХП на 20)',
        price: null
    },
]
