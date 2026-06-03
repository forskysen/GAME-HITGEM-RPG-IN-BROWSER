import { player, saveGame } from "./state.js";

const promocodes = [
    {
        code: '002FREEGOLD',
        rewardGold: 500
    }
];

export function checkPromocode() {
    const userEnter = prompt('Введите промокод: ')
    const foundPromo = promocodes.find(promo => promo.code === userEnter);

    if (!foundPromo) {
        alert('К сожалению, такого промокода не существует...');
        return; 
    }

    if (player.activatedPromos.includes(userEnter)) {
        alert('Вы уже активировали этот промокод!');
        return;
    }

    player.gold += foundPromo.rewardGold;
    
    player.activatedPromos.push(userEnter);
    
    if (typeof saveGame === 'function') saveGame(); 

    alert(`Промокод успешно активирован! Вы получили ${foundPromo.rewardGold} золота.`);
}