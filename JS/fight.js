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
                that.launchFight(enemy, playerWhoPlay)
            })
        } else {
            document.getElementById("texte").innerHTML += "- Le combat est fini ! " + playerWhoPlay.classAttribute + " gagne la partie. \n"
            document.getElementById("texte").scrollTop = document.getElementById("texte").scrollHeight;
            let $btn_replay = $('<button id ="btn_replay" onclick="switchPage()"> Rejouer une partie ? </button>')
            $('#placeBtnReplay').append($btn_replay)
        }
    }

}
function switchPage() {
    window.location = "index.html"
}