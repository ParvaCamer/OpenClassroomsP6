class Character {
    constructor(classAttribute, PV, srcImg) {
        this.classAttribute = classAttribute;
        this.PV = PV;
        this.srcImg = srcImg;
        this.defend = false; // true pour attaque - false pour défense
        this.position = -1;
        this.positionToClick = [];
        this.order = 0;
        this.weapon = null;
    }

    setOrder(order) {
        this.order = order
        $('#nameJ' + order).text(this.classAttribute)
        $('#imgPlayerJ' + order).attr("src", this.srcImg)
        $('#currentHpJ' + order).text(this.PV)
        $('#totalHpJ' + order).text(this.PV)
    }

    loseHp(value) {
        console.log("Le joueur", this.classAttribute, " a perdu", value, " points de vie")
        if (this.defend === true) { //si il est en position défense
            value = value / 2;
            this.PV -= value
            this.defend = false
        } else {
            this.PV -= value // si il est en position attaque
        }
        $('#currentHpJ' + this.order).text(this.PV)
    }

    setDefenseMode() {
        this.defend = true;
    }

    isAlive() {
        return this.PV > 0
    }

    // fait apparaître les joueurs //
    spotPlayer() {
        for (let p = 0; p < 1; p++) {
            let random = Math.floor(Math.random() * 100);
            let littleBox = $("#" + random);

            if (
                littleBox.hasClass("casePlayer") || littleBox.hasClass("caseObstacle")) {
                p--;
            } else {
                littleBox.addClass("casePlayer");
                littleBox.addClass(this.classAttribute);
                this.position = random;
            }
        }
    }

    // pour que les joueurs n'apparaissent pas à côté //
    notAround(otherPlayer) {
        let players = $('.casePlayer')
        let otherPosition = otherPlayer.position
        let actualPosition = this.position
        let coordinatesToCheck = [actualPosition + 1, actualPosition - 1, actualPosition + 10, actualPosition - 10]
        if (coordinatesToCheck.includes(otherPosition)) {
            players.removeClass('.casePlayer')
            players.removeClass(this.classAttribute)
            this.spotPlayer()
        }
    }

    setPlayerPosition(positionCase) {
        let newPosition = $("#" + positionCase);
        newPosition.addClass("casePlayer");
        newPosition.addClass(this.classAttribute);

        let oldPosition = $("#" + this.position);
        oldPosition.removeClass("casePlayer");
        oldPosition.removeClass(this.classAttribute);

        this.position = positionCase;
    }

    movePlayer(allWeaponsOnBoard) {

        console.log("TOUR DE " + this.classAttribute);
        return new Promise(resolve => {
            this.showCasesToMoove();
            let that = this;
            const elements = document.getElementsByClassName("caseVide");
            var myHandler = function (event) {
                let valueOfCaseClicked = parseInt($(this).attr("id"));
                if (that.positionToClick.includes(valueOfCaseClicked) === true && that.position !== valueOfCaseClicked) {
                    that.canPlay = false
                    that.setPlayerPosition(valueOfCaseClicked);
                    that.takeWeapon(allWeaponsOnBoard);

                    Array.from(elements).forEach(function (element) {
                        element.removeEventListener("click", myHandler);
                    });

                    this.removeEventListener("click", myHandler);
                    Array.from(that.positionToClick).forEach(function (position) {
                        $('#' + position).removeClass("cellToClick")
                    })
                    resolve()
                } else {
                }
            };
            Array.from(elements).forEach(function (element) {
                element.addEventListener("click", myHandler);
            });
        })
    }

    // affiche les déplacements disponibles //
    showCasesToMoove() {
        let position = this.position;
        this.positionToClick = [];
        let obstacleBefore = false
        for (let i = 0; i <= 3; i++) {// pour aller à droite
            let positionCounted = position + i
            let checkCase = $("#" + positionCounted)
            if (checkCase.hasClass("casePlayer") && i !== 0) {
                obstacleBefore = true
            }
            if (checkCase.hasClass("caseObstacle") === false && obstacleBefore === false) {
                checkCase.addClass("cellToClick");
                this.positionToClick.push(position + i);
                if ((positionCounted + 1) % 10 === 0) {
                    obstacleBefore = true
                }
            } else {
                obstacleBefore = true
            }
        }
        obstacleBefore = false
        for (let i = 0; i <= 3; i++) {// pour aller à gauche
            let positionCounted = position - i
            let checkCase = $("#" + positionCounted)
            if (checkCase.hasClass("casePlayer") && i !== 0) {
                obstacleBefore = true
            }
            if (checkCase.hasClass("caseObstacle") === false && obstacleBefore === false) {
                checkCase.addClass("cellToClick");
                this.positionToClick.push(position - i);
                if (positionCounted % 10 === 0) {
                    obstacleBefore = true
                }
            } else {
                obstacleBefore = true
            }
        }
        obstacleBefore = false
        for (let i = 0; i <= 30; i += 10) {// pour aller en haut
            let positionCounted = position + i
            let checkCase = $("#" + positionCounted)
            if (checkCase.hasClass("casePlayer") && i !== 0) {
                obstacleBefore = true
            }
            if (checkCase.hasClass("caseObstacle") === false && obstacleBefore === false) {
                checkCase.addClass("cellToClick");
                this.positionToClick.push(position + i);
            } else {
                obstacleBefore = true
            }
        }
        obstacleBefore = false
        for (let i = 0; i <= 30; i += 10) {// pour aller en bas
            let positionCounted = position - i
            let checkCase = $("#" + positionCounted)
            if (checkCase.hasClass("casePlayer") && i !== 0) {
                obstacleBefore = true
            }
            if (checkCase.hasClass("caseObstacle") === false && obstacleBefore === false) {
                checkCase.addClass("cellToClick");
                this.positionToClick.push(position - i);
            } else {
                obstacleBefore = true
            }
        }
    }

    takeWeapon(allWeapons) {
        let weaponCase = $("#" + this.position);
        let hasWeapon = weaponCase.hasClass("weaponBox");

        if (hasWeapon) {
            console.log("une arme se situe sur cette case");
            let theWeapon = {};
            let that = this;
            allWeapons.forEach(function (weapon) {
                console.log(weapon);
                if (weapon.position === that.position) {
                    theWeapon = weapon;
                }
            });
            this.switchWeapon(weaponCase, theWeapon);
        }
    }

    switchWeapon(weaponCase, weapon) {
        console.log(weaponCase);
        weaponCase.removeClass(weapon.classAttribute);
        $('#' + this.position).addClass(this.weapon.classAttribute)

        this.addWeapon(weapon);
    }

    addWeapon(weapon) {
        this.weapon = weapon;
        this.weapon.addOwner(this); //ajout de l'arme au personnage désigné
        $('#weaponDamageJ' + this.order).text(weapon.damage)
        $('#weaponNameJ' + this.order).text(weapon.name)
        $('#imgWeaponJ' + this.order).attr("src", weapon.srcImg)
        console.log("Arme ajoutée " + weapon.name + " à " + this.classAttribute);
    }

    isFrontOfPlayer(otherPlayer) {
        let otherPosition = otherPlayer.position
        let actualPosition = this.position
        let coordinatesToCheck = [actualPosition + 1, actualPosition - 1, actualPosition + 10, actualPosition - 10]
        if (coordinatesToCheck.includes(otherPosition)) {
            return false
        }
        return true
    }
}
