// function fight(playerOne, playerTwo) {
//
//
//     if (theChoosenOne == playerOne) {
//         this.ennemy = playerTwo;
//     } else if (theChoosenOne == playerTwo) {
//         this.ennemy = playerOne;
//     }
// }
//
// function attack() {
//     if (theChoosenOne.action == 1) {
//         theChoosenOne.action = 2;
//     }
//
//     if (this.ennemy.PV > 0) {
//         this.ennemy.PV = this.ennemy.PV - theChoosenOne.damage;
//     } else if ((this.ennemy.PV = 0)) {
//         alert("Partie terminée ! \n" + this.ennemy.classAttribute + " est mort !");
//     }
// }
//
// function defense() {
//     if (theChoosenOne.action == 1) {//ici en attaque
//         theChoosenOne.action = 2; // passe en défense
//     }
// }
//
// function displayButton(player) { // affiche les boutons
//     let $btn_attack = $('<button class=" " id="btn_attack"> Attaquer </button>')
//     let $btn_defense = $('<button class =" " id="btn_defense"> Défendre </button>')
//
//     $('#weaponDamageJ' + player).append($btn_attack)
//     $('#weaponDamageJ' + player).append($btn_defense)
// }


class fight {

    constructor(players) {
        this.players = players
        console.log("Les joueurs : ", players[0], players[1])
        this.launchFight(players[0], players[1])
    }

    launchFight(playerWhoPlay, enemy) {
        $('#btn_attack').remove()
        $('#btn_defense').remove()
        if (playerWhoPlay.isAlive() && enemy.isAlive()) {
            let $btn_attack = $('<button class="button1" id="btn_attack"> Attaquer </button>')
            let $btn_defense = $('<button class ="button2" id="btn_defense"> Défendre </button>')

            console.log('joueur qui joue :', playerWhoPlay.classAttribute)
            console.log("ennemi : ", enemy.classAttribute)

            $('#weaponDamageJ' + playerWhoPlay.order).append($btn_attack)
            $('#weaponDamageJ' + playerWhoPlay.order).append($btn_defense)
            let that = this
            let defense = $('#btn_defense').on("click", function () {
                playerWhoPlay.setDefenseMode()
                console.log("le joueur", playerWhoPlay.classAttribute, "est en position de défense", playerWhoPlay.defend)
                this.removeEventListener("click", defense);
                that.launchFight(enemy, playerWhoPlay)
            })
            let attack = $('#btn_attack').on("click", function () {
                // Le reste est à faire ici !
                enemy.loseHp(playerWhoPlay.weapon.damage)
                this.removeEventListener("click", attack);
                that.launchFight(enemy, playerWhoPlay)
            })
        } else {
            alert("Le combat est fini !")

        }
    }
}