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
        console.log("Les joueurs : ", players)
        this.launchFight()
    }

    displayButtons(turnPlayer) {
        $('#btn_attack').remove()
        $('#btn_defense').remove()
        let $btn_attack = $('<button class="button1" id="btn_attack"> Attaquer </button>')
        let $btn_defense = $('<button class ="button2" id="btn_defense"> Défendre </button>')

        $('#weaponDamageJ' + turnPlayer).append($btn_attack)
        $('#weaponDamageJ' + turnPlayer).append($btn_defense)
        let that = this
        let defense = $('#btn_defense').on("click", function () {
            // Le reste est à faire ici !
            that.displayButtons(turnPlayer === 1 ? 2 : 1)
            this.removeEventListener("click", defense);
        })
        let attack = $('#btn_attack').on("click", function () {
            // Le reste est à faire ici !
            that.displayButtons(turnPlayer === 1 ? 2 : 1)
            this.removeEventListener("click", attack);
        })
    }

    launchFight() {
        let playerTurn = 1
        let enemy = this.players[0]
        this.displayButtons(1)
        while (this.players[0].isAlive() && this.players[1].isAlive()) {
            enemy.loseHp(this.players[playerTurn].weapon.damage)
            enemy = this.players[playerTurn]
            playerTurn = playerTurn === 1 ? 0 : 1
            this.players[playerTurn].loseHp(500)
        }
    }
}