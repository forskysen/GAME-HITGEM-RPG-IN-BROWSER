export function alchemistSeller(player, items) {
    const potions = items.filter(item => item.type === 'potion')

    while (true) {
        let alchemistShop = '==! Алхимический магазин !==\n'
        alchemistShop += `Ваше золото: ${player.gold} 💰\n\n`
        alchemistShop += 'Выберите товар для покупки:\n'

        potions.forEach((potion, index) => {
            alchemistShop += `${index + 1}. ${potion.title} — ${potion.price} золота\n`
        })
        alchemistShop += `${potions.length + 1}. Выйти из магазина\n\n`
        alchemistShop += 'Введите номер товара:'

        const input = prompt(alchemistShop)

        if (input === null) {
            alert('Вы вышли из магазина.')
            break
        }

        const choice = parseInt(input.trim())

        if (choice === potions.length + 1) {
            alert('До свидания! Возвращайтесь еще.')
            break
        }

        if (isNaN(choice) || choice < 1 || choice > potions.length) {
            alert('Неверный ввод! Пожалуйста, выберите номер из списка.')
            continue
        }

        const selectedPotion = potions[choice - 1]

        if (player.gold < selectedPotion.price) {
            alert(`Недостаточно золота! У вас ${player.gold}, а нужно ${selectedPotion.price}.`)
        } else {
            player.gold -= selectedPotion.price
            player.inventory.push({ ...selectedPotion }) 

            alert(`Вы успешно купили: "${selectedPotion.title}"!`)
        }
    }
}

export function travelingSeller(player, items) {
    const availableItems = items.filter(item => item.type === 'potion')

    const chance = Math.floor(Math.random() * 100) + 1
    if (chance === 1) {
        const exclusiveArmor = items.find(item => item.type === 'exclusive')
        if (exclusiveArmor) {
            availableItems.push(exclusiveArmor)
        }
    }

    while (true) {
        let sellerShop = '==! Странствующий торговец !==\n'
        sellerShop += `Ваше золото: ${player.gold}\n\n`
        sellerShop += 'Что вас интересует?\n'

        availableItems.forEach((item, index) => {
            const prefix = item.type === 'exclusive' ? '[РЕДКОЕ] ' : ''
            sellerShop += `${index + 1}. ${prefix}${item.title} — ${item.price} золота\n`
        })
        sellerShop += `${availableItems.length + 1}. Выйти\n\n`
        sellerShop += 'Введите номер товара:'

        const input = prompt(sellerShop)

        if (input === null) {
            alert('Вы отошли от торговца.')
            break
        }

        const choice = parseInt(input.trim())

        if (choice === availableItems.length + 1) {
            alert('Торговец скрылся в тумане...')
            break
        }

        if (isNaN(choice) || choice < 1 || choice > availableItems.length) {
            alert('Неверный ввод!')
            continue
        }

        const selectedItem = availableItems[choice - 1]

        if (player.gold < selectedItem.price) {
            alert(`Недостаточно золота! Нужно ${selectedItem.price}.`)
        } else {
            player.gold -= selectedItem.price
            
            if (selectedItem.type === 'armor') {
                player.equippedArmor = { ...selectedItem }
                alert(`Вы успешно купили и НАДЕЛИ: "${selectedItem.title}"!`)
                
                availableItems.splice(choice - 1, 1)
            } else {
                player.inventory.push({ ...selectedItem })
                alert(`Вы успешно купили: "${selectedItem.title}"!`)
            }
        }
    }
}