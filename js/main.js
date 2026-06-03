export { checkProfile, fightBoss, updatePlayer, settings} from './utilits.js'
export { player } from './state.js'
export { items } from './items.js'

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

if (game === true) {
    initPlayer(name)
    while (true) {
        const question = prompt("Что хотите(для выхода из игры exit или отмена): \n1. Посмотреть профиль\n2. Сразиться с боссом\n3. Улучшение\n4. Инвентарь\n5. Настройки")

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
                fightBoss(player, bosses, items)
                break

            case 3:
                updatePlayer(player)
                break

            case 4:
                checkInventory()
                break

            case 5:
                settings()
        }
    }
}