// ОТОБРАЖЕНИЕ ПРОФИЛЯ

import { player } from "./state"
import { bosses } from "./bosses"
import { sword } from "./swords"

export function checkProfile(player) {
    const playerInfo =
        `
    ==============\n
    ВАШ ПРОФИЛЬ \n
    1. Имя: ${player.name}\n
    2. Здоровье: ${player.hp}\n
    3. Меч: ${player.sword.name}, урон: ${player.sword.damage}, уровень: ${player.sword.level}\n
    4. Золото: ${player.gold}\n\n

    ==============
    `

    alert(playerInfo)
}

// БОСС ФАЙТ

export function fightBoss(player, bosses, items) {
    while (true) {
        let bossList = `===! СПИСОК ДОСТУПНЫХ БОССОВ !===\n`
        bossList += `Ваше здоровье: ${player.hp}/${player.max_hp}\n\n`

        bosses.forEach((boss, index) => {
            bossList += `${index + 1}. ${boss.name}, здоровье - ${boss.maxHp}, урон - ${boss.damage}\n`
        })

        bossList += `\nВыберите босса со списка, что бы начать бой, либо нажмите отмена для выхода или введите exit.`

        const input = prompt(bossList)

        if (input === null || input.toLowerCase() === 'exit') {
            alert('Вы сбежали обратно в город как трус...')
            break
        }

        let number = parseInt(input) - 1

        if (isNaN(number) || number >= bosses.length || number < 0) {
            alert('Такого босса - нет.')
            continue
        }

        if (player.hp <= 0) {
            alert('Вы мертвы. Сходите в больницу полечиться.')
            break
        }

        startFight(player, bosses[number], items)
    }
}

function startFight(player, boss, items) {
    const currentBoss = { ...boss }
    currentBoss.hp = currentBoss.maxHp

    alert(`Бой начался! Вы напали на босса ${currentBoss.name}`)

    while (player.hp > 0 && currentBoss.hp > 0) {

        let playerDmg = player.sword.damage
        let isCrit = false

        if (Math.random() < 0.30) {
            playerDmg += player.sword.criticalDamage
            isCrit = true
        }

        currentBoss.hp -= playerDmg

        let playerAttackLog = `Вы ударили ${currentBoss.name}, своим ${player.sword.name} и нанесли ${playerDmg} урона!`
        if (isCrit) playerAttackLog = `КРИТИЧЕСКИЙ УДАР! ` + playerAttackLog

        alert(`${playerAttackLog}\nУ босса осталось: ${Math.max(0, currentBoss.hp)}/${currentBoss.maxHp} ХП.`)

        if (currentBoss.hp <= 0) {
            player.gold += currentBoss.reward
            let winMessage = `ВЫ УБИЛИ БОССА ${currentBoss.name}! Вы получили ${currentBoss.reward} золота.\n`

            let droppedPotionName = null
            if (currentBoss.id <= 2) {
                if (Math.random() < 0.40) droppedPotionName = 'potionHeal1lvl'
            } else if (currentBoss.id <= 5) {
                if (Math.random() < 0.50) droppedPotionName = 'potionHeal2lvl'
            } else if (currentBoss.id <= 7) {
                if (Math.random() < 0.60) droppedPotionName = 'potionHeal3lvl'
            } else {
                droppedPotionName = 'potionHeal4lvl'
            }

            if (droppedPotionName) {
                const potionTemplate = items.find(item => item.name === droppedPotionName)
                if (potionTemplate) {
                    player.inventory.push({ ...potionTemplate })
                    winMessage += `🧪 Дроп: Найдено "${potionTemplate.title}"!`
                }
            }

            alert(winMessage)
            return
        }

        const protection = player.equippedArmor ? player.equippedArmor.protection : 0
        const finalBossDamage = Math.max(0, currentBoss.damage - protection)
        
        player.hp -= finalBossDamage

        alert(`${currentBoss.name} бьет в ответ и наносит вам ${finalBossDamage} урона! (Защита поглотила: ${protection})\nУ вас осталось: ${Math.max(0, player.hp)}/${player.max_hp} ХП.`)

        if (player.hp <= 0) {
            player.hp = 0
            alert(`Вы погибли в бою с ${currentBoss.name}, вы ничего не потеряли, но имеете ${player.hp} здоровья. Срочно обратитесь в больницу.`)
            return
        }
    }
}

// ПРОКАЧКА ПЕРСОНАЖА

export function updatePlayer(player) {
    while (true) {
        const question = prompt(`
                =========\n
                1. Продавцы(NEW)\n
                2. Кузница, магазин мечей\n
                3. Больница\n
                Для выхода нажмите отмена, либо введите exit
                =========
                `)

        if (question === null || question.toLowerCase() === 'exit') {
            break
        }

        let number = parseInt(question)

        if (isNaN(number)) {
            alert('К сожалению программа не распознала ваше сообщение, введите от 1 до 4!')
            continue
        }

        if (number > 4 || number < 1) {
            alert('Введите от 1 до 4!')
            continue
        }

        switch (number) {
            case 1:
                shopItem(player)
                break

            case 2:
                updateSword(player)
                break

            case 3:
                updateHP(player)
                break

        }
    }
}

// Продавцы
function shopItem() {
    while(true) {
        let shop = `==! ДОСТУПНЫЕ ПРОДАВЦЫ !==\n\n`

        shop += `1. Алхимик\n`
        shop += `2. Странствующий торговец\n\n`

        shop += 'Выберите действие с списка, или нажмите отмена для выхода'

        const input = prompt(shop)

        if(input === null || input.toLowerCase() === 'exit') {
            break
        }

        const number = parseInt(input)

        if(isNaN(number) || number < 1 || number > 2) {
            alert('Выберите действие со списка! От 1 до 2!')
            continue
        }

        switch(number) {
            case 1:
                alchemistSeller(player, items)
                break

            case 2:
                travelingSeller(player, items)
                break
        }
    }
}

// Саб. улучшения персонажа

// Кузнец, магазин мечей
function updateSword(player) {
    while (true) {
        const question = prompt(`
                ============\n
                1. Кузница мечей(прокачка)\n
                2. Купить новый меч за золото\n
                \n
                У вас ${player.gold} золота!\n
                Для  выхода нажмите отмена, либо введите exit
                `)

        if (question === null || question.toLowerCase() === 'exit') {
            break
        }

        let number = parseInt(question)

        if (question > 2 || question < 1) {
            alert('Введите от 1 до 2!')
        }

        switch (number) {
            case 1:
                enhancementSword(player)
                break

            case 2:
                buySword(player)
                break
        }
    }
}

function enhancementSword(player) {
    while (true) {

        const sword = player.sword
        const question = prompt('Кузнец: вы хотите зайти в кузницу для прокачки меча? (Да/нет)')

        if (question === null || question.toLowerCase() === 'нет') {
            alert('Кузнец: До скорой встречи!')
            break
        }

        if (question.toLowerCase() === 'да') {

            if (sword.level >= sword.maxLevel) {
                alert('Кузнец: Уровень меча, достигнут максимального уровня!')
                continue
            }

            const confirmUpgrade = prompt(`Вы хотите прокачать ${sword.name} до ${sword.level + 1} уровня, за ${sword.upgradeCost} золота?`)
            if (confirmUpgrade !== null && confirmUpgrade.toLowerCase() === 'да') {

                if (player.gold >= sword.upgradeCost) {
                    player.gold -= sword.upgradeCost

                    sword.level = sword.level + 1
                    sword.damage += sword.upgradeDamage
                    sword.criticalDamage += sword.upgradeCriticalDamage

                    sword.upgradeCost += sword.eachUpgradeCost
                    alert(`Кузнец: ${sword.name} был успешно прокачан до ${sword.level} уровня!\n Следующее улучшение будет стоить ${sword.upgradeCost} золота`)
                } else {
                    alert(`Кузнец: У вас недостаточно золота! Для прокачки нужно ${sword.upgradeCost} золота, у вас-же ${player.gold}`)
                }
            }
        }
    }
}

function buySword(player) {
    while (true) {
        let itemMenu = "=! ЛАВКА МЕЧЕЙ !=\n"
        itemMenu += `Ваше золото: ${player.gold}\n\n`
        itemMenu += `Список мечей:\n`

        swords.forEach((sword, index) => {
            itemMenu += `${index + 1}. ${sword.name}, стоимость ${sword.price} золота.\n`
        })

        itemMenu += "\nВыберите предмет который вы  хотите купить(либо для выхода с лавки нажмите отмена, или  введите exit):"

        const input = prompt(itemMenu)

        if (input === null || input.toLowerCase() === 'exit') {
            alert('Продавец: До скорой встречи!')
            break
        }

        const itemNumber = parseInt(input)

        if (isNaN(itemNumber) || itemNumber < 1 || itemNumber > swords.length) {
            alert('Продавец: Такого предмета у нас нет... Выберите из списка.')
            continue
        }

        const selectedSword = swords[itemNumber - 1]

        if (player.gold >= selectedSword.price) {
            player.gold -= selectedSword.price

            player.sword = { ...selectedSword }

            alert(`Продавец: Спасибо за покупку, жду тебя снова! (Вы купили ${selectedSword.name} за ${selectedSword.price} золота.`)
            break
        } else {
            alert(`Продавец: У вас недостаточно золота... Предмет стоит ${selectedSword.price} золота, вы же даете мне ${player.gold} золота...`)
        }

    }
}

// Больница

function updateHP(player) {
    while (true) {
        let question = prompt(`
                ===! БОЛЬНИЦА !===\n\n
                1. Излечить здоровье\n
                2. Увеличить максимальное здоровье\n
                Для  выхода нажмите отмена, либо введите exit
                `)

        if (question === null || question.toLowerCase() === 'exit') {
            alert('Доктор: Жаль... Будем вас ждать!')
            break
        }

        const number = parseInt(question)

        if (isNaN(number) || number > 2 || number < 1) {
            alert('Доктор: Извините, что-что? Не услышал. (Введите что хотите сделать из списка, 1 до 2)')
            continue
        }

        if (number === 1) {
            const hpCost = 1.5

            if (player.hp >= player.max_hp) {
                alert('Доктор: Вы же полностью здоровы...')
                continue
            }

            const hpMissing = player.max_hp - player.hp
            const totalCost = hpMissing * hpCost

            question = prompt(`Доктор: У вас ${player.hp} здоровья из ${player.max_hp}. За лечение ${hpMissing} здоровья, обойдется в ${totalCost} золота! Вы согласны? (да/нет)`)

            if (question === null || question.toLowerCase() === 'нет') {
                alert('Доктор: Знаю цены жмут... До скорой встречи!')
                continue
            }

            if (question.toLowerCase() === 'да') {
                if (player.gold >= totalCost) {
                    player.gold -= totalCost
                    player.hp += hpMissing

                    alert(`Доктор: Вы полностью излечились, ваше здоровье ${player.hp}/${player.max_hp}%`)
                    continue
                }

                else if (player.gold >= hpCost) {
                    const allGoldHP = Math.floor(player.gold / hpCost)
                    const priceCure = allGoldHP * hpCost

                    question = prompt(`Доктор: Вам не хватает на полное лечение, но хватает на излечение ${allGoldHP} здоровья, за ${priceCure} золота... Вы согласны? (да/нет)`)

                    if (question === null || question.toLowerCase() === 'нет') {
                        alert('Доктор: Бывает... До скорой встречи!')
                        continue
                    }

                    if (question.toLowerCase() === 'да') {
                        player.gold -= priceCure
                        player.hp += allGoldHP

                        alert(`Доктор: Мы вас вылечили! У вас ${player.hp}/${player.max_hp} здоровья!`)
                        continue
                    }


                }
            }

        }

        if (number === 2) {
            question = prompt(`Доктор: Здравствуйте, увеличение максимального здоровья на ${player.upgradeMaxHp} единиц, будет стоить ${player.upgradeMaxHpCost} золота. Вы согласны?(Да/нет)`)

            if (question === null || question.toLowerCase() === 'нет') {
                alert('Доктор: До скорой встречи!')
                break
            }

            if (question.toLowerCase() === 'да') {
                if (player.gold >= player.upgradeMaxHpCost) {
                    player.gold -= player.upgradeMaxHpCost
                    player.max_hp += player.upgradeMaxHp

                    player.upgradeMaxHp = player.upgradeMaxHp * 1.5
                    player.upgradeMaxHpCost = player.upgradeMaxHpCost * 1.5

                    alert(`Доктор: Ваше максимальное здоровье увеличено на ${player.upgradeMaxHp} единиц, ваше здоровье ${player.hp}/${player.max_hp}`)
                    continue
                } else {
                    alert('Доктор: У вас недостаточно золота...')
                }

            }
        }
    }
}

// Инвентарь

export function checkInventory(player) {
    while (true) {
        if (player.inventory.length === 0) {
            alert('🎒 Ваш инвентарь пуст!')
            break
        }

        let menu = '==! Ваш инвентарь !==\n'
        menu += `Здоровье: ${player.hp}/${player.max_hp}\n`
        if (player.equippedArmor) {
            menu += `Надета броня: ${player.equippedArmor.title} (+${player.equippedArmor.protection} защиты)\n`
        }
        menu += '-----------------------\n'

        player.inventory.forEach((item, index) => {
            menu += `${index + 1}. ${item.title}\n`
        })
        menu += `${player.inventory.length + 1}. Закрыть рюкзак\n\n`
        menu += 'Выберите номер предмета, чтобы использовать его:'

        const input = prompt(menu)

        if (input === null) {
            break
        }

        const choice = parseInt(input.trim())

        if (choice === player.inventory.length + 1) {
            break
        }

        if (isNaN(choice) || choice < 1 || choice > player.inventory.length) {
            alert('❌ Неверный ввод!')
            continue
        }

        const selectedIndex = choice - 1
        const item = player.inventory[selectedIndex]

        if (item.type === 'potion') {
            if (player.hp >= player.max_hp) {
                alert('У вас уже максимальное здоровье!')
                continue
            }

            player.hp += item.healAmount
            if (player.hp > player.max_hp) {
                player.hp = player.max_hp
            }

            alert(`Вы использовали "${item.title}".\nВаше здоровье: ${player.hp}/${player.max_hp}`)
            player.inventory.splice(selectedIndex, 1)

        } else {
            alert(`Предмет "${item.title}" нельзя использовать прямо из рюкзака.`)
        }
    }
}

// Настройки

export function settings() {
    while(true) {
        const question= prompt(`
            ==! НАСТРОЙКИ !==\n\n
            1. Система промокода(ввести промокод)\n
            9. Удалить профиль(DANGER!)\n\n

            ==! Выберите действие со списка, для выхода нажмите отмена, или введите exit !==
        `)

        if(question === null || question.toLowerCase() === 'exit') {
            break
        }

        number = parseInt(question)

        if(isNaN(number)) {
            alert('Система не распознала ваше сообщение.')
            continue
        } 

        if(number !== 1 || number !== 9) {
            alert('Выберите действие со списка!')
            continue
        }

        switch(number) {
            case 1:
                checkPromocode()
                break

            case 9:
                const userConfirm = prompt('Вы уверены, что хотите сбросить игровой прогресс?(да/нет)')

                if(userConfirm === null || userConfirm.toLowerCase() === 'нет') {
                    continue
                } else if(userConfirm === 'да') {
                    resetGame()
                } else {
                    alert('Система не распознала, ваше сообщение.')
                    continue
                }

        }
    }

}