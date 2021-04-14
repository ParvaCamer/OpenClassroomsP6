class fight {

    constructor(players) {
        this.players = players;
        this.launchFight(players[0], players[1]);
    }

    launchFight(playerWhoPlay, enemy) {
        $('#btn_attack').remove()
        $('#btn_defense').remove()
        if (playerWhoPlay.weapon.hasAllFightingEffect()) {
            playerWhoPlay.weapon.doEffect()
        }
        if (enemy.weapon.hasAllFightingEffect()) {
            enemy.weapon.doEffect()
        }

        if (playerWhoPlay.isAlive() && enemy.isAlive()) {
            let $btn_attack = $('<button class="button1" id="btn_attack"> Attaquer </button>')
            let $btn_defense = $('<button class ="button2" id="btn_defense"> Défendre </button>')

            $('#place_btn' + playerWhoPlay.order).append($btn_attack)
            $('#place_btn' + playerWhoPlay.order).append($btn_defense)
            let that = this
            let defense = $('#btn_defense').on("click", function () {
                playerWhoPlay.setDefenseMode()
                this.removeEventListener("click", defense);
                that.launchFight(enemy, playerWhoPlay)
            })
            let attack = $('#btn_attack').on("click", function () {
                enemy.loseHp(playerWhoPlay.getDamages(), playerWhoPlay.sendEffects())
                this.removeEventListener("click", attack);
                $('#healthJ' + enemy.order).animate({ "value": enemy.PV }, 800, "swing")
                that.launchFight(enemy, playerWhoPlay)
            })
        } else {
            alert("Le combat est fini !")

        }
    }
}