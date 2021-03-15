function fight(playerOne, playerTwo) {

    if (theChoosenOne == playerOne) {
        this.ennemy = playerTwo;
    } else if (theChoosenOne == playerTwo) {
        this.ennemy = playerOne;
    }

    function attack() {
        if (theChoosenOne.action == 1) {
            theChoosenOne.action = 2;
        }

        if (this.ennemy.PV > 0) {
            this.ennemy.PV = this.ennemy.PV - theChoosenOne.damage;
        } else if ((this.ennemy.PV = 0)) {
            alert("Partie terminée ! \n" + this.ennemy.classAttribute + " est mort !");
        }
    }

    function defense() {
        if (theChoosenOne.action == 1) {//ici en attaque
            theChoosenOne.action = 2; // passe en défense
        }
    }

    function displayButton(player) { // affiche les boutons
        let $btn_attack = $('<button class=" " id="btn_attack"> Attaquer </button>')
        let $btn_defense = $('<button class =" " id="btn_defense"> Défendre </button>')

        $('#weaponDamageJ' + player).append($btn_attack)
        $('#weaponDamageJ' + player).append($btn_defense)
    }
}
