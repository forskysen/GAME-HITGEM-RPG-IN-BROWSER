export const bosses = [
    {
        id: 1,
        name: "Гоблин-разбойник",
        hp: 60,
        maxHp: 60,
        damage: 4,
        reward: 50
    },

    {
        id: 2,
        name: "Червь породитель",
        hp: 140,
        maxHp: 140,
        damage: 8,
        reward: 120
    },

    {
        id: 3,
        name: "Каменный голем",
        hp: 320,
        maxHp: 320,
        damage: 14,
        reward: 280
    },

    {
        id: 4,
        name: "Глаз светолучный",
        hp: 650,
        maxHp: 650,
        damage: 22,
        reward: 600
    },

    {
        id: 5,
        name: "Некромант бездны",
        hp: 1200,
        maxHp: 1200,
        damage: 38,
        reward: 1300
    },

    {
        id: 6,
        name: "Падший рыцарь",
        hp: 2400,
        maxHp: 2400,
        damage: 65,
        reward: 2500
    },

    {
        id: 7,
        name: "Древний Дракон",
        hp: 5000,
        maxHp: 5000,
        damage: 120,
        reward: 5500
    },

    {
        id: 8,
        name: "Владыка преисподней",
        hp: 11000,
        maxHp: 11000,
        damage: 230,
        reward: 12000
    },

    {
        id: 9,
        name: "Матрица судьбы",
        hp: 25000,
        maxHp: 25000,
        damage: 450,
        reward: 99999
    }
]

export function fightBoss(player, bosses) {
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

        startFight(player, bosses[number])

    }
}

export function startFight(player, boss) {
    boss.hp = boss.maxHp

    alert(`Бой начался! Вы напали на босса ${boss.name}`)

    while (player.hp > 0 && boss.hp > 0) {

        let playerDmg = player.sword.damage
        let isCrit = false

        if (Math.random() < 0.30) {
            playerDmg += player.sword.criticalDamage
            isCrit = true
        }

        boss.hp -= playerDmg

        let playerAttackLog = `Вы  ударили ${boss.name}, своим ${player.sword.name} и нанесли ${playerDmg} урона!`
        if (isCrit) playerAttackLog = `КРИТИЧЕСКИЙ УДАР! ` + playerAttackLog

        alert(`${playerAttackLog}\nУ босса осталось: ${Math.max(0, boss.hp)}/${boss.maxHp} ХП.`)

        if (boss.hp < 0) {
            player.gold += boss.reward
            alert(`ВЫ УБИЛИ БОССА ${boss.name}! Вы получили ${boss.reward} золота.`)
            return
        }

        player.hp -= boss.damage
        alert(`${boss.name} бьет в ответ и наносит вам ${boss.damage} урона!\nУ вас осталось: ${Math.max(0, player.hp)}/${player.max_hp} ХП.`)

        if (player.hp < 0) {
            player.hp = 0
            alert(`Вы погибли в бою с ${boss.name}, вы ничего не потеряли, но имеет ${player.hp} здоровья. Срочно обратитесь в больницу.`)
            return
        }
    }
}