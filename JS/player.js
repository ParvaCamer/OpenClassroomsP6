class Character {
    constructor(classAttribute, PV, srcImg, critical, typeOfWeapon, percentBoost, bonusHp) {
        this.classAttribute = classAttribute;
        this.PV = PV;
        this.totalPV = PV;
        this.srcImg = srcImg;
        this.defend = false; // true pour attaque - false pour défense
        this.position = -1;
        this.positionToClick = [];
        this.order = 0;
        this.weapon = null;
        this.isCritical = false;
        this.critical = critical;
        this.canOneShot = false;
        this.sendSleep = false;
        this.sendFire = false;
        this.gainATQ = false;
        this.canDoBoth = false;
        this.effects = {
            "sleeping": null,
            "heal": null,
            "fire": null
        };
        this.typeOfWeapon = typeOfWeapon;
        this.hasBestWeaponToWear = false;
        this.percentBoost = percentBoost;
        this.bonusHp = bonusHp;
        this.hasAlreadyBonus = false;
    }

    getDamages() {


        // Calcul des dégâts
        let multiplicator = 1
        let chanceOfCritical = Math.floor(Math.random() * 100);
        if (chanceOfCritical <= this.critical) {
            multiplicator = 1.5
            console.log("Coup critique naturel !", chanceOfCritical, "/", this.critical)
        } else if (this.isCritical === true) {
            let chanceOfCriticalWithWeapon = Math.floor(Math.random() * 2);
            if (chanceOfCriticalWithWeapon === 0) {
                multiplicator = 2
                console.log("C'est un coup critique !!!!")
            }
        } else {
            console.log("C'est un coup normal !", chanceOfCritical, "/", this.critical)
        }

        console.log("Pour le joueur", this.classAttribute, "les effets :", this.effects)
        // On gère ici l'effet de sommeil
        if (this.effects.sleeping !== null) {
            if (this.effects.sleeping.turns !== 0) {
                this.effects.sleeping.turns -= 1
                return 0
            } else {
                this.effects.sleeping = null
            }
        }

        // On gère ici l'effet de brûlure
        if (this.effects.fire !== null) {
            if (this.effects.fire.turns !== 0) {
                this.effects.fire.turns -= 1
                this.PV -= 5
                $('#currentHpJ' + this.order).text(this.PV)
            } else {
                this.effects.fire = null
            }
        }

        // On gère le gain d'attaque
        if (this.gainATQ === true) {
            let chanceOfGain = Math.floor(Math.random() * 5)
            console.log(chanceOfGain)
            if (chanceOfGain === 0) {
                multiplicator = 1.8
                this.PV -= 20
                console.log(this.classAttribute, "obtient un gain de puissance mais perd des Hp")
                $('#currentHpJ' + this.order).text(this.PV)
            } else {
                console.log("Le gain de puissance n'a pas fonctionné !")
            }
        }

        // Mise en place du "one shot"
        if (this.canOneShot === true) {
            let chanceOfOneShot = Math.floor(Math.random() * 5);
            console.log(chanceOfOneShot)
            if (chanceOfOneShot === 0) {
                console.log("C'est un one-shot")
                return -1
            } else if (chanceOfOneShot === 3 || chanceOfOneShot === 4) {
                console.log("C'est un suicide.", this.classAttribute, "est mort")
                this.PV = 0
                $('#currentHpJ' + this.order).text(this.PV)
            }
        }

        // On fait la fonction attaque et défense
        if (this.canDoBoth === true) {
            let chanceOfDoingBoth = Math.floor(Math.random() * 3);
            console.log(chanceOfDoingBoth)
            if (chanceOfDoingBoth === 0) {
                this.defend = true
            }
        }

        // Ici on calcule les dégâts de l'arme lorsqu'ils sont optimisés par le personnage
        // qui possède bien la comp passive pour booster ses dégâts
        let weaponDamages = this.weapon.damage
        if (this.hasBestWeaponToWear === true) {
            console.log("Le personnage a son arme de prédilection !!!!")
            console.log("Les dommages avant :", weaponDamages)
            weaponDamages = weaponDamages + Math.round(weaponDamages * this.percentBoost / 100)
            console.log("Les dommages après :", weaponDamages)
        }

        return weaponDamages * multiplicator
    }

    /*****************/
    /* Enchantements */
    /*     Armes     */
    /*****************/

    addHp(value) {
        console.log("Le joueur", this.classAttribute, "obtient un changement de", value, "sur la statistique HP");
        this.PV += value;
        if (this.PV > this.totalPV) {
            console.log("ATTENTION : Overheal", this.PV, ">", this.totalPV);
            this.PV = this.totalPV;
        }
        $('#currentHpJ' + this.order).text(this.PV)
    }

    criticalHit(value) {
        this.isCritical = true;
    }

    sleeping() {
        this.sendSleep = true;
    }

    fire() {
        this.sendFire = true;
    }

    moreAtq() {
        this.gainATQ = true;
    }

    oneShot(value) {
        this.canOneShot = true;
    }

    defendAndAttack() {
        this.canDoBoth = true;
    }

    /***************************************/

    setOrder(order) {
        this.order = order
        $('#nameJ' + order).text(this.classAttribute)
        $('#imgPlayerJ' + order).attr("src", this.srcImg)
        $('#currentHpJ' + order).text(this.PV)
        $('#totalHpJ' + order).text(this.PV)
        $('#criticalStrikeJ' + order).text(this.critical)
    }

    loseHp(value, effects) {
        console.log("Effets avant combat de ", this.classAttribute, ":", this.effects)
        console.log("Effet reçu de l'adversaire :", effects)
        // On se sert dans les effets !
        if (effects !== null) {
            let typeOfEffect = effects.type
            this.effects[typeOfEffect] = effects[typeOfEffect]
            console.log("Après modification pour", this.classAttribute, ":", this.effects)
        }

        // On vérifie qu'on se fait pas "one-shot"
        if (value === -1) {
            console.log(this.classAttribute, "s'est fait one-shot")
            this.PV = 0;
            $('#currentHpJ' + this.order).text(this.PV)
        } else {
            // On lance les effets d'avant combat ici
            if (this.weapon.hasBegginingEffect()) {
                console.log("Effet lancé au début du tour")
                this.weapon.doEffect()
            }
            if (this.defend === true) { //si il est en position défense
                value = value / 2;
                this.PV -= Math.round(value)
                this.defend = false
            } else {
                this.PV -= Math.round(value) // si il est en position attaque
            }
            if (this.PV < 0) {
                this.PV = 0
            }
            $('#currentHpJ' + this.order).text(this.PV)
            // On lance les effets d'après combat ici
            if (this.weapon.hasEndingEffect()) {
                console.log("Effet lancé au fin du tour")
                this.weapon.doEffect()
            }
        }
    }

    sendEffects() {
        // On voit si on doit envoyer la fatigue
        if (this.sendSleep === true) {
            let chanceOfSleeping = Math.floor(Math.random() * 4);
            console.log("Chance d'endormir :", chanceOfSleeping)
            if (chanceOfSleeping == 0) {
                console.log(this.classAttribute, "endors l'adversaire !")
                return {
                    "type": "sleeping",
                    "sleeping": {
                        "turns": 2
                    },
                }
            } else {
                console.log("Le sort a raté, l'endormissement n'est pas envoyé !")
                return null
            }
        }
        // On voit si on doit envoyer la brûlure
        if (this.sendFire === true) {
            let chanceOfBurning = Math.floor(Math.random() * 6);
            console.log("Chance de brûler :", chanceOfBurning)
            if (chanceOfBurning == 0) {
                console.log(this.classAttribute, "brûle l'adversaire !")
                return {
                    "type": "fire",
                    "fire": {
                        "turns": 3
                    },
                }
            } else {
                console.log("Le sort a raté, la brûlure n'est pas envoyée !")
                return null
            }
        }
        return null
    }


    setDefenseMode() {
        this.defend = true;
    }

    isAlive() {
        return this.PV > 0
    }

    // fait apparaître les joueurs //
    spotPlayer(otherPlayer) {
        for (let p = 0; p < 1; p++) {
            let random1 = Math.floor(Math.random() * 100);
            let random2 = Math.floor(Math.random() * 100);
            let littleBox = $("#" + random1);
            while (random1 === random2 || random1 === random2 - 1 || random1 === random2 + 1 || random1 === random2 - 10 || random1 === random2 + 10) {
                random2 = Math.floor(Math.random() * 10);
            }
            let littleBox2 = $('#' + random2);

            if (littleBox.hasClass("casePlayer") || littleBox.hasClass("caseObstacle") || littleBox2.hasClass("casePlayer") || littleBox2.hasClass("caseObstacle")) {
                p--;
            } else {
                littleBox.addClass("casePlayer");
                littleBox.addClass(this.classAttribute);
                littleBox2.addClass("casePlayer")
                littleBox2.addClass(otherPlayer.classAttribute);
                this.position = random1;
                otherPlayer.position = random2;
            }
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

        return new Promise(resolve => {
            this.showCasesToMoove();
            let that = this;
            const elements = document.getElementsByClassName("caseVide");
            var myHandler = function (event) {
                let valueOfCaseClicked = parseInt($(this).attr("id"));
                if (that.positionToClick.includes(valueOfCaseClicked) === true && that.position !== valueOfCaseClicked) {
                    that.canPlay = false
                    that.setPlayerPosition(valueOfCaseClicked);
                    that.takeWeapon(allWeaponsOnBoard, that.position);

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
            let theWeapon = {};
            let that = this;
            allWeapons.forEach(function (weapon) {
                if (weapon.position === that.position) {
                    theWeapon = weapon;
                    weapon.position = -1
                }
                if (that.weapon.classAttribute === weapon.classAttribute) {
                    weapon.position = that.position
                }
            });
            // On vérifie si c'est son arme de prédilection !
            if (theWeapon.type === this.typeOfWeapon) {
                this.hasBestWeaponToWear = true
            } else {
                this.hasBestWeaponToWear = false
            }

            // On ajoute le bonus Hp si c'est la bonne arme
            if (this.hasBestWeaponToWear === true && this.hasAlreadyBonus === false) {
                this.PV += this.bonusHp
                this.totalPV = this.PV
                $('#currentHpJ' + this.order).text(this.PV)
                $('#totalHpJ' + this.order).text(this.totalPV)
                this.critical = Math.round(this.critical * 1.5)
                $('#criticalStrikeJ' + this.order).text(this.critical)
                $('#awakeJ' + this.order).text(this.weapon.description)
                this.hasAlreadyBonus = true
                document.getElementById("texte").innerHTML += "- " + this.classAttribute + " a ramassé une arme favorite. " + this.classAttribute + " obtient un bonus de " + this.bonusHp + " Hp et de " + this.percentBoost + " Coup Critique !" + "\n";
            } else if (this.hasBestWeaponToWear === false && this.hasAlreadyBonus === true) {
                this.PV -= this.bonusHp
                this.totalPV = this.PV
                $('#currentHpJ' + this.order).text(this.PV)
                $('#totalHpJ' + this.order).text(this.totalPV)
                this.critical = Math.round(this.critical / 1.5)
                $('#criticalStrikeJ' + this.order).text(this.critical)
                $('#awakeJ' + this.order).text(this.weapon.description)
                this.hasAlreadyBonus = false
                document.getElementById("texte").innerHTML += "- " + this.classAttribute + " a perdu son arme, les bonus sont perdus. \n"
            }
            this.switchWeapon(weaponCase, theWeapon);
        }
    }

    switchWeapon(weaponCase, weapon) {
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
        $('#awakeJ' + this.order).text(weapon.description)
    }

    // Pour le lancement du combat
    isFrontOfPlayer(otherPlayer) {
        let otherPosition = otherPlayer.position
        let actualPosition = this.position
        let coordinatesToCheck = [actualPosition + 1, actualPosition - 1, actualPosition + 10, actualPosition - 10]
        return !coordinatesToCheck.includes(otherPosition);
    }
}
