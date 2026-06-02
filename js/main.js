import { swords } from './swords.js'
import { player, initPlayer } from './state.js'
import { bosses } from './bosses.js'

document.addEventListener('DOMContentLoaded', () => {

    // function
    function enhancementSword(player) {
        while(true) {

            const sword = player.sword
            const question = prompt('Кузнец: вы хотите зайти в кузницу для прокачки меча? (Да/нет)')
            
            if(question === null || question.toLowerCase() === 'нет') {
                alert('Кузнец: До скорой встречи!')
                break
            }

            if(question.toLowerCase() === 'да') {

                if(sword.level >= sword.maxLevel) {
                    alert('Кузнец: Уровень меча, достигнут максимального уровня!')
                    continue
                }

                const confirmUpgrade = prompt(`Вы хотите прокачать ${sword.name} до ${sword.level + 1} уровня, за ${sword.upgradeCost} золота?`)
                if(confirmUpgrade !== null && confirmUpgrade.toLowerCase() === 'да') {
                    
                    if(player.gold >= sword.upgradeCost) {
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
        while(true) {
            let itemMenu = "=! ЛАВКА МЕЧЕЙ !=\n"
            itemMenu += `Ваше золото: ${player.gold}\n\n`
            itemMenu += `Список мечей:\n`

            swords.forEach((sword, index) => {
                itemMenu += `${index + 1}. ${sword.name}, стоимость ${sword.price} золота.\n`
            })

            itemMenu += "\nВыберите предмет который вы  хотите купить(либо для выхода с лавки нажмите отмена, или  введите exit):"

            const input = prompt(itemMenu)

            if(input === null || input.toLowerCase() === 'exit') {
                alert('Продавец: До скорой встречи!')
                break
            }

            const itemNumber = parseInt(input)

            if(isNaN(itemNumber) || itemNumber < 1 || itemNumber > swords.length) {
                alert('Продавец: Такого предмета у нас нет... Выберите из списка.')
                continue
            }

            const selectedSword = swords[itemNumber - 1]

            if(player.gold >= selectedSword.price) {
                player.gold -= selectedSword.price

                player.sword = { ...selectedSword}

                alert(`Продавец: Спасибо за покупку, жду тебя снова! (Вы купили ${selectedSword.name} за ${selectedSword.price} золота.`)
                break
            } else {
                alert(`Продавец: У вас недостаточно золота... Предмет стоит ${selectedSword.price} золота, вы же даете мне ${player.gold} золота...`)
            }
            
        }
    }

    function updateSword(player) {
        while(true) {
            const question = prompt(`
                ============\n
                1. Кузница мечей(прокачка)\n
                2. Купить новый меч за золото\n
                \n
                У вас ${player.gold} золота!\n
                Для  выхода нажмите отмена, либо введите exit
                `)

                if(question === null || question.toLowerCase() === 'exit') {
                    break
                }

                let number = parseInt(question)

                if(question > 2 || question < 1) {
                    alert('Введите от 1 до 2!')
                }

                switch(number) {
                    case 1:
                        enhancementSword(player)
                        break

                    case 2:
                        buySword(player)
                        break
                }

        }

    }

    function updateHP(player) {
        while(true) {
            let question = prompt(`
                ===! БОЛЬНИЦА !===\n\n
                1. Излечить здоровье\n
                2. Увеличить максимальное здоровье\n
                Для  выхода нажмите отмена, либо введите exit
                `)

            if(question === null || question.toLowerCase() === 'exit') {
                alert('Доктор: Жаль... Будем вас ждать!')
                break
            }

            const number = parseInt(question)

            if(isNaN(number) || number > 2 || number < 1) {
                alert('Доктор: Извините, что-что? Не услышал. (Введите что хотите сделать из списка, 1 до 2)')
                continue
            }

            if(number === 1) {
                const hpCost = 3
                
                if(player.hp >= player.max_hp) {
                    alert('Доктор: Вы же полностью здоровы...')
                    continue
                }

                const hpMissing = player.max_hp - player.hp
                const totalCost = hpMissing * hpCost

                question = prompt(`Доктор: У вас ${player.hp} здоровья из ${player.max_hp}. За лечение ${hpMissing} здоровья, обойдется в ${totalCost} золота! Вы согласны? (да/нет)`)

                if(question === null || question.toLowerCase() === 'нет') {
                    alert('Доктор: Знаю цены жмут... До скорой встречи!')
                    continue
                }

                if(question.toLowerCase() === 'да') {
                    if(player.gold >= totalCost) {
                        player.gold -= totalCost
                        player.hp += hpMissing

                        alert(`Доктор: Вы полностью излечились, ваше здоровье ${player.hp}/${player.max_hp}%`)
                        continue
                    }

                else if(player.gold >= hpCost) {
                    const allGoldHP = Math.floor(player.gold / hpCost)
                    const priceCure = allGoldHP * hpCost
                    
                    question = prompt(`Доктор: Вам не хватает на полное лечение, но хватает на излечение ${allGoldHP} здоровья, за ${priceCure} золота... Вы согласны? (да/нет)`)
                    
                    if(question === null || question.toLowerCase() === 'нет') {
                        alert('Доктор: Бывает... До скорой встречи!')
                        continue
                    }

                    if(question.toLowerCase() === 'да') {
                        player.gold -= priceCure
                        player.hp += allGoldHP

                        alert(`Доктор: Мы вас вылечили! У вас ${player.hp}/${player.max_hp} здоровья!`)
                        continue
                    }

                    
                }
                }   
            
            }

            if(number === 2) {
                question = prompt(`Доктор: Здравствуйте, увеличение максимального здоровья на ${player.upgradeMaxHp} единиц, будет стоить ${player.upgradeMaxHpCost} золота. Вы согласны?(Да/нет)`)

                if(question === null || question.toLowerCase() === 'нет') {
                    alert('Доктор: До скорой встречи!')
                    break
                }

                if(question.toLowerCase() === 'да') {
                    if(player.gold >= player.upgradeMaxHpCost) {
                        player.gold -= player.upgradeMaxHpCost
                        player.max_hp += player.upgradeMaxHp

                        alert(`Доктор: Ваше максимальное здоровье увеличено на ${player.upgradeMaxHp} единиц, ваше здоровье ${player.hp}/${player.max_hp}`)
                        continue
                    } else {
                        alert('Доктор: У вас недостаточно золота...')
                    }
                    
                }
            }
        }
    }

    function checkProfile(player) {
    const playerInfo = 
    `
    ==============\n
    ВАШ ПРОФИЛЬ \n
    1. Имя: ${player.name}\n
    2. Здоровье: ${player.hp}\n
    3. Меч: ${player.sword.name}, урон: ${player.sword.damage}\n
    4. Золото: ${player.gold}\n
    ==============
    `

    alert(playerInfo)
    }

    function fightBoss(player, bosses) {
    while(true) {
        let bossList = `===! СПИСОК ДОСТУПНЫХ БОССОВ !===\n`
        bossList += `Ваше здоровье: ${player.hp}/${player.max_hp}\n\n`
        
        bosses.forEach((boss, index) => {
            bossList += `${index + 1}. ${boss.name}, здоровье - ${boss.maxHp}, урон - ${boss.damage}\n`
        }) 

        bossList += `\nВыберите босса со списка, что бы начать бой, либо нажмите отмена для выхода или введите exit.`
        
        const input = prompt(bossList)

        if(input === null || input.toLowerCase() === 'exit') {
            alert('Вы сбежали обратно в город как трус...')
            break
        }

        let number = parseInt(input) - 1

        if(isNaN(number) || number >= bosses.length || number < 0) {
            alert('Такого босса - нет.')
            continue
        }

        if(player.hp <= 0) {
            alert('Вы мертвы. Сходите в больницу полечиться.')
            break
        }

        startFight(player, bosses[number])

    }
    }

    function startFight(player, boss) {
        boss.hp = boss.maxHp

        alert(`Бой начался! Вы напали на босса ${boss.name}`)

        while(player.hp > 0 && boss.hp > 0) {

            let playerDmg = player.sword.damage
            let isCrit = false

            if(Math.random() < 0.30) {
                playerDmg += player.sword.criticalDamage
                isCrit = true
            }

            boss.hp -= playerDmg

            let playerAttackLog = `Вы  ударили ${boss.name}, своим ${player.sword.name} и нанесли ${playerDmg} урона!`
            if(isCrit) playerAttackLog = `КРИТИЧЕСКИЙ УДАР! ` + playerAttackLog

            alert(`${playerAttackLog}\nУ босса осталось: ${Math.max(0, boss.hp)}/${boss.maxHp} ХП.`)

            if(boss.hp < 0) {
                player.gold += boss.reward
                alert(`ВЫ УБИЛИ БОССА ${boss.name}! Вы получили ${boss.reward} золота.`)
                return
            }

            player.hp -= boss.damage
            alert(`${boss.name} бьет в ответ и наносит вам ${boss.damage} урона!\nУ вас осталось: ${Math.max(0, player.hp)}/${player.max_hp} ХП.`)

            if(player.hp < 0) {
                player.hp = 0
                alert(`Вы погибли в бою с ${boss.name}, вы ничего не потеряли, но имеет ${player.hp} здоровья. Срочно обратитесь в больницу.`)
                return
            }
        }
    }

    function shopItem() {
        alert('Данный раздел в разработке...')
        return
    }

    function updatePlayer(player) {
        while(true) {
            const question = prompt(`
                =========\n
                1. Магазин предметов(в разработке)\n
                2. Улучшение меча\n
                3. Больница\n
                Для выхода нажмите отмена, либо введите exit
                =========
                `)

                if(question === null || question.toLowerCase() === 'exit') {
                    break
                }

                let number = parseInt(question)

                if(isNaN(number)) {
                    alert('К сожалению программа не распознала ваше сообщение, введите от 1 до 3!')
                    continue
                }

                if(number > 3 || number < 1) {
                    alert('Введите от 1 до 3!')
                    continue
                }

                switch(number) {
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

    let name = null
    let game = true

    while(true) {
    const userName = prompt("Введите ваше имя(для выхода из игры введите exit, или нажмите отмена) :")
    if(userName.toLowerCase() === "exit" || userName === null) {
        alert("Жаль... Ждем вашего возращения!")
        game = false
        break
    }


    if(userName.length < 3) {
        alert("Имя должно быть не менее 3 символов!")
        continue
    }

    alert(`Добро пожаловать, ${userName} !`)
    name = userName
    break
    }

    initPlayer(name)

    if(game === true) {
    while(true) {
        const question = prompt("Что хотите(для выхода из игры exit или отмена): \n1. Посмотреть профиль\n2. Сразиться с боссом\n3. Улучшение")
        
        if(question === null || question.toLowerCase() === "exit") {
        alert(`Ждем вашего возращения, ${name} удачи!`)
        break
        } 
        
        let numberList = parseInt(question)
        
        switch(numberList) {
        case 1:
            checkProfile(player)
            break

        case 2:
            fightBoss(player, bosses)
            break
            
        case 3:
            updatePlayer(player)
            break
            
        }
        }
    }
})