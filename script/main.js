import { swords, updateSword } from './swords.js'
import { player, initPlayer, resetGame } from './state.js'
import { bosses, startFight, fightBoss } from './bosses.js'
import { checkPromocode } from './promocode.js'
import { items } from '.item.js'


// Меню больницы, лечение, увеличение макс. здоровья ХП \\


// Конец меню больницы \\

// Главное меню, функции 
function checkProfile(player) {
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
                travelingSeller()
                break
        }
    }


}

function settings() {
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
// Конец главного меню, функций \\


function updatePlayer(player) {
    while (true) {
        const question = prompt(`
                =========\n
                1. Продавцы(NEW)\n
                2. Кузница, магазин мечей\n
                3. Больница\n
                4. Настройки \n
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

            case 4: 
                settings()
                break
        }
    }
}





// Приветственное сообщение, главный алерт при заходе на сайт
let name = null
let game = true

while (true) {
    const userName = prompt("Введите ваше имя(для выхода из игры введите exit, или нажмите отмена) :")
    if (userName.toLowerCase() === "exit" || userName === null) {
        alert("Жаль... Ждем вашего возращения!")
        game = false
        break
    }


    if (userName.length < 3) {
        alert("Имя должно быть не менее 3 символов!")
        continue
    }

    alert(`Добро пожаловать, ${userName} !`)
    name = userName
    break
}

initPlayer(name)
// Конец приветственного алерта \\

// Главное меню игры \\
if (game === true) {
    while (true) {
        const question = prompt("Что хотите(для выхода из игры exit или отмена): \n1. Посмотреть профиль\n2. Сразиться с боссом\n3. Прокачка персонажа")

        if (question === null || question.toLowerCase() === "exit") {
            alert(`Ждем вашего возращения, ${name} удачи!`)
            break
        }

        let numberList = parseInt(question)

        switch (numberList) {
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

// Конец главного меню игры \\