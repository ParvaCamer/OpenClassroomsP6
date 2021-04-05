class fight {

    constructor(players) {
        this.players = players
        this.launchFight(players[0], players[1])
    }

    launchFight(playerWhoPlay, enemy) {
        $('#btn_attack').remove()
        $('#btn_defense').remove()
        if (playerWhoPlay.isAlive() && enemy.isAlive()) {
            let $btn_attack = $('<button class="button1" id="btn_attack"> Attaquer </button>')
            let $btn_defense = $('<button class ="button2" id="btn_defense"> Défendre </button>')

            $('#weaponDamageJ' + playerWhoPlay.order).append($btn_attack)
            $('#weaponDamageJ' + playerWhoPlay.order).append($btn_defense)
            let that = this
            let defense = $('#btn_defense').on("click", function () {
                playerWhoPlay.setDefenseMode()
                this.removeEventListener("click", defense);
                that.launchFight(enemy, playerWhoPlay)
            })
            let attack = $('#btn_attack').on("click", function () {
                enemy.loseHp(playerWhoPlay.weapon.damage)
                this.removeEventListener("click", attack);
                that.launchFight(enemy, playerWhoPlay)
            })
            playerWhoPlay.weapon.damage = playerWhoPlay.weapon.beginingDamage //pour remettre les dégâts de base de l'arme Faucon
        } else {
            alert("Le combat est fini !")

        }
    }
}