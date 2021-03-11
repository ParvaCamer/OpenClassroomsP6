class Character {
    constructor(classAttribute, PV, action) {
        this.classAttribute = classAttribute;
        this.PV = PV;
        this.action = 1; // 1 pour attaque - 2 pour défense
        this.position = -1;
        this.positionToClick = [];
    }

    spotPlayer() {
        for (let p = 0; p < 1; p++) {
            let random = Math.floor(Math.random() * 100);
            let littleBox = $("#" + random);

            if (
                littleBox.hasClass("casePlayer") ||
                littleBox.hasClass("caseObstacle")
            ) {
                p--;
            } else {
                littleBox.addClass("casePlayer");
                littleBox.addClass(this.classAttribute);
                this.position = random;
            }
        }
    }

    notAround() {
        // mettre que ça sera la classe du joueur 1 et 2 cliqué après évènement html
        let players = $(".casePlayer");
        let stringPlayer1 = parseInt($(".Diluc").attr("id")); // convertit l'id en entier
        let stringPlayer2 = parseInt($(".Razor").attr("id"));

        let left = stringPlayer1 - 1,
            right = stringPlayer1 + 1,
            top = stringPlayer1 - 10,
            bot = stringPlayer1 + 10;

        if (left == stringPlayer2 || right == stringPlayer2 || top == stringPlayer2 || bot == stringPlayer2) {
            players.removeClass(this.classAttribute);
            this.spotPlayer();
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
                    console.log("Le joueur peut se déplacer sur cette case");
                    console.log($(this));
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
                    console.log("Le joueur ne peut pas se déplacer sur cette case.");
                }
            };
            Array.from(elements).forEach(function (element) {
                element.addEventListener("click", myHandler);
            });
        })
    }

    showCasesToMoove() {
        let position = this.position;
        this.positionToClick = [];
        let obstacleBefore = false
        for (let i = 0; i <= 3; i++) {// pour aller à droite
            let positionCounted = position + i
            let checkCase = $("#" + positionCounted)
            if (checkCase.hasClass("caseObstacle") === false && obstacleBefore === false || positionCounted % 10 === 9) {
                checkCase.addClass("cellToClick");
                this.positionToClick.push(position + i);
            } else {
                obstacleBefore = true
            }
        }
        obstacleBefore = false
        for (let i = 0; i <= 3; i++) {// pour aller à gauche
            let positionCounted = position - i
            let checkCase = $("#" + positionCounted)
            if (checkCase.hasClass("caseObstacle") === false && obstacleBefore === false || positionCounted % 10 === 9) {
                checkCase.addClass("cellToClick");
                this.positionToClick.push(position - i);
            } else {
                obstacleBefore = true
            }
        }
        obstacleBefore = false
        for (let i = 0; i <= 30; i += 10) {// pour aller en haut
            let positionCounted = position + i
            let checkCase = $("#" + positionCounted)
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
            if (checkCase.hasClass("caseObstacle") === false && obstacleBefore === false) {
                checkCase.addClass("cellToClick");
                this.positionToClick.push(position - i);
            } else {
                obstacleBefore = true
            }
        }
        console.log(this.positionToClick);
    }

    addWeapon(weapon) {
        this.weapon = weapon;
        this.weapon.addOwner(this); //ajout de l'arme au personnage désigné

        console.log("Arme ajoutée " + weapon.name + " à " + this.classAttribute);
    }

    switchWeapon(player, weaponCase, weapon) {
        console.log(weaponCase);
        weaponCase.removeClass(weapon.classAttribute);
        weaponCase.removeClass("weaponBox");

        this.addWeapon(weapon);
    }

    takeWeapon(allWeapons) {
        let player = $("." + this.classAttribute);
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
            this.switchWeapon(player, weaponCase, theWeapon);
        }
    }

    isFrontOfPlayer(otherPlayer) {
        let otherPosition = otherPlayer.position
        let actualPosition = this.position
        console.log("Joueur " + this.classAttribute + " en position : ", actualPosition)
        console.log("Joueur " + otherPlayer.classAttribute + " en position : ", otherPosition)
        let coordinatesToCheck = [actualPosition + 1, actualPosition - 1, actualPosition + 10, actualPosition - 10]
        if (coordinatesToCheck.includes(otherPosition)) {
            return false
        }
        return true
    }
}
