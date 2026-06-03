

export function travelingSeller(player) {

}

export function alchemistSeller(player, items) {
    while(true) {
        let shopText = `==! ЛАВКА АЛХИМИКА !==\n`
        shopText += `=======================\n`
        shopText += `Ваше золото: ${player.gold} голды\n`
        shopText += `В инвентаре: \n`
        shopText += `   - Зел. 1 лвл: ${player.inventory.potionHeal1lvl} шт.\n`
        shopText += `   - Зел. 2 лвл: ${player.inventory.potionHeal2lvl} шт.\n`
        shopText += `   - Зел. 3 лвл: ${player.inventory.potionHeal3lvl} шт.\n`
        shopText += `   - Зел. 4 лвл: ${player.inventory.potionHeal4lvl} шт.\n`
        shopText += `=======================\n\n`
        shopText += `ТОВАРЫ НА ПРОДАЖУ:\n`

        items.forEach(item => {
            const canBuy = player.gold >= item.price ? '✅' : '❌'
            
            shopText += `[ID: ${item.id}] ${canBuy} ${item.title}\n`
            shopText += `   Цена: ${item.price} золота\n\n`
            
        })

        shopText += `=======================\n`
        shopText += `Введите ID зелья, чтобы купить его!`

        const shopAlchemist = prompt(shopText)

        if(shopAlchemist === null || shopAlchemist) {
            break
        }

        if(shopAlchemist < 1 || shopAlchemist > items.length) {
            alert('Алхимик: Такого предмета - нет.')
        }

        
    }

}