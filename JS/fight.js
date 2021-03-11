function fight(playerOne, playerTwo) {
    let theChoosenOne = playerOne
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
            this.ennemy.damage = this.ennemy.damage / 2;
        }
    }
}
