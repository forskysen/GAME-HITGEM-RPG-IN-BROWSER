export const swords = [
  {
      id: 1,
      name: "Начальный меч",
      damage: 6,
      criticalDamage: 9,
      level: 1,
      maxLevel: 3,
      upgradeCost: 100,
      eachUpgradeCost: 100,
      upgradeDamage: 3,
      upgradeCriticalDamage: 5,
      price: 0
  },
  {
      id: 2,
      name: "Ржавый тесак",
      damage: 12,
      criticalDamage: 16,
      level: 1,
      maxLevel: 3,
      upgradeCost: 150,
      eachUpgradeCost: 120,
      upgradeDamage: 5,
      upgradeCriticalDamage: 8,
      price: 150
  },
  {
      id: 3,
      name: "Стальной гладиус",
      damage: 22,
      criticalDamage: 30,
      level: 1,
      maxLevel: 4,
      upgradeCost: 250,
      eachUpgradeCost: 150,
      upgradeDamage: 8,
      upgradeCriticalDamage: 12,
      price: 450
  },
  {
      id: 4,
      name: "Алмазный меч",
      damage: 38,
      criticalDamage: 55,
      level: 1,
      maxLevel: 4,
      upgradeCost: 400,
      eachUpgradeCost: 250,
      upgradeDamage: 12,
      upgradeCriticalDamage: 20,
      price: 900
  },
  {
      id: 5,
      name: "Теневой кинжал",
      damage: 55,
      criticalDamage: 90,
      level: 1,
      maxLevel: 5,
      upgradeCost: 600,
      eachUpgradeCost: 350,
      upgradeDamage: 18,
      upgradeCriticalDamage: 35,
      price: 1800
  },
  {
      id: 6,
      name: "Подземельный меч",
      damage: 85,
      criticalDamage: 130,
      level: 1,
      maxLevel: 5,
      upgradeCost: 900,
      eachUpgradeCost: 500,
      upgradeDamage: 25,
      upgradeCriticalDamage: 45,
      price: 3500
  },
  {
      id: 7,
      name: "Клинок вечного пламени",
      damage: 130,
      criticalDamage: 200,
      level: 1,
      maxLevel: 5,
      upgradeCost: 1500,
      eachUpgradeCost: 800,
      upgradeDamage: 40,
      upgradeCriticalDamage: 65,
      price: 6500
  },
  {
      id: 8,
      name: "Убийца драконов",
      damage: 210,
      criticalDamage: 320,
      level: 1,
      maxLevel: 6,
      upgradeCost: 2500,
      eachUpgradeCost: 1200,
      upgradeDamage: 60,
      upgradeCriticalDamage: 95,
      price: 12000
  },
  {
      id: 9,
      name: "Световой каратель",
      damage: 340,
      criticalDamage: 500,
      level: 1,
      maxLevel: 6,
      upgradeCost: 4000,
      eachUpgradeCost: 2000,
      upgradeDamage: 95,
      upgradeCriticalDamage: 150,
      price: 22000
  },
  {
      id: 10,
      name: "Меч Истинного Повелителя",
      damage: 550,
      criticalDamage: 850,
      level: 1,
      maxLevel: 10,
      upgradeCost: 8000,
      eachUpgradeCost: 4000,
      upgradeDamage: 150,
      upgradeCriticalDamage: 250,
      price: 50000
  }
]

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

export function updateSword(player) {
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