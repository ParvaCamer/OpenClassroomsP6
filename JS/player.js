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
        this.hasAlreadyBonus = false; // pour le bonus Hp et CC
    }

    getDamages() {
        // Calcul des dégâts
        let multiplicator = 1
        let chanceOfCritical = Math.floor(Math.random() * 100);

        if (this.isCritical === true) {
            chanceOfCritical = 100;
            let chanceOfCriticalWithWeapon = Math.floor(Math.random() * 2);
            if (chanceOfCriticalWithWeapon === 0) {
                multiplicator = 2
                document.getElementById("texte").innerHTML += "- " + this.classAttribute + " envoie un Coup critique grâce au Faucon !! \n"
                document.getElementById("texte").scrollTop = document.getElementById("texte").scrollHeight;
            }
        }
        if (chanceOfCritical <= this.critical) {
            multiplicator = 1.5
            document.getElementById("texte").innerHTML += "- " + this.classAttribute + " frappe avec un Coup critique ! \n"
            document.getElementById("texte").scrollTop = document.getElementById("texte").scrollHeight;
        } else {
            document.getElementById("texte").innerHTML += "- Au tour de " + this.classAttribute + " d'attaquer. C'est un coup normal. \n"
            document.getElementById("texte").scrollTop = document.getElementById("texte").scrollHeight;
        }

        console.log("Pour le joueur", this.classAttribute, "les effets :", this.effects)

        // On gère ici l'effet de sommeil
        if (this.effects.sleeping !== null) {
            if (this.effects.sleeping.turns !== 0) {
                this.effects.sleeping.turns -= 1
                this.sendFire = false;
                document.getElementById("texte").innerHTML += "- Tour restant de l'effet sommeil : " + this.effects.sleeping.turns + ". \n"
                document.getElementById("texte").scrollTop = document.getElementById("texte").scrollHeight;
                return 0
            } else {
                this.effects.sleeping = null;
                this.sendFire = true;
            }
        }

        // On gère ici l'effet de brûlure
        if (this.effects.fire !== null) {
            if (this.effects.fire.turns !== 0) {
                this.effects.fire.turns -= 1
                this.PV -= 5
                $('#currentHpJ' + this.order).text(this.PV)
                document.getElementById("texte").innerHTML += "- Tour restant de l'effet de brûlure : " + this.effects.fire.turns + ". \n"
                document.getElementById("texte").scrollTop = document.getElementById("texte").scrollHeight;
            } else {
                this.effects.fire = null
            }
        }

        // On gère le gain d'attaque
        if (this.gainATQ === true) {
            let chanceOfGain = Math.floor(Math.random() * 5)
            if (chanceOfGain === 0) {
                multiplicator = 1.8
                this.PV -= 20
                document.getElementById("texte").innerHTML += "- " + this.classAttribute + " obtient un gain de puissance mais perd des Hp. \n"
                document.getElementById("texte").scrollTop = document.getElementById("texte").scrollHeight;
                $('#currentHpJ' + this.order).text(this.PV)
            } else {
                document.getElementById("texte").innerHTML += "- Le gain de puissance n'a pas fonctionné ! \n"
                document.getElementById("texte").scrollTop = document.getElementById("texte").scrollHeight;
            }
        }

        // Mise en place du "one shot"
        if (this.canOneShot === true) {
            let chanceOfOneShot = Math.floor(Math.random() * 5);
            if (chanceOfOneShot === 0) {
                document.getElementById("texte").innerHTML += "- C'est un one-shot ! \n"
                document.getElementById("texte").scrollTop = document.getElementById("texte").scrollHeight;
                return -1
            } else if (chanceOfOneShot === 3 || chanceOfOneShot === 4) {
                document.getElementById("texte").innerHTML += "- C'est un suicide. " + this.classAttribute + " est mort. \n"
                document.getElementById("texte").scrollTop = document.getElementById("texte").scrollHeight;
                this.PV = 0
                $('#currentHpJ' + this.order).text(this.PV)
            }
        }

        // On fait la fonction attaque et défense
        if (this.canDoBoth === true) {
            let chanceOfDoingBoth = Math.floor(Math.random() * 3);
            if (chanceOfDoingBoth === 0) {
                this.defend = true
                document.getElementById("texte").innerHTML += "- " + this.classAttribute + " attaque et se met en mode défense. \n"
                document.getElementById("texte").scrollTop = document.getElementById("texte").scrollHeight;
            }
        }

        // Ici on calcule les dégâts de l'arme lorsqu'ils sont optimisés par le personnage
        // qui possède bien la comp passive pour booster ses dégâts
        let weaponDamages = this.weapon.damage
        if (this.hasBestWeaponToWear === true) {
            weaponDamages = weaponDamages + Math.round(weaponDamages * this.percentBoost / 100)
            $('#weaponDamageJ' + this.order).text(weaponDamages)
            document.getElementById("texte").innerHTML += "- " + this.weapon.name + " éveille les dommages de son porteur. \n"
            document.getElementById("texte").scrollTop = document.getElementById("texte").scrollHeight;
        }

        return weaponDamages * multiplicator
    }

    /*****************/
    /* Enchantements */
    /*     Armes     */
    /*****************/

    addHp(value) {
        document.getElementById("texte").innerHTML += "- " + this.classAttribute + " gagne " + value + " HP. \n";
        this.PV += value;
        if (this.PV > this.totalPV) {
            document.getElementById("texte").innerHTML += "- ATTENTION : Overheal " + this.PV + " > " + this.totalPV + ".\n";
            this.PV = this.totalPV;
        }
        $('#currentHpJ' + this.order).text(this.PV)
        document.getElementById("texte").scrollTop = document.getElementById("texte").scrollHeight;
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
            document.getElementById("texte").innerHTML += "- " + this.classAttribute + " s'est fait one-shot. \n"
            document.getElementById("texte").scrollTop = document.getElementById("texte").scrollHeight;
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
        }
    }

    sendEffects() {
        // On voit si on doit envoyer la fatigue
        if (this.sendSleep === true) {
            let chanceOfSleeping = Math.floor(Math.random() * 5);
            if (chanceOfSleeping == 0) {
                document.getElementById("texte").innerHTML += "- " + this.classAttribute + " endors l'adversaire pendant 2 tours ! \n"
                return {
                    "type": "sleeping",
                    "sleeping": {
                        "turns": 2
                    },
                }
            } else {
                document.getElementById("texte").innerHTML += "- Le sort a raté, l'endormissement n'est pas envoyé ! \n"
                return null
            }
        }
        // On voit si on doit envoyer la brûlure
        if (this.sendFire === true) {
            let chanceOfBurning = Math.floor(Math.random() * 6);
            if (chanceOfBurning == 0) {
                document.getElementById("texte").innerHTML += "- " + this.classAttribute + " brûle l'adversaire pendant 3 tours ! \n"
                document.getElementById("texte").scrollTop = document.getElementById("texte").scrollHeight;
                return {
                    "type": "fire",
                    "fire": {
                        "turns": 3
                    },
                }
            } else {
                document.getElementById("texte").innerHTML += "- Le sort a raté, la brûlure n'est pas envoyée ! \n"
                document.getElementById("texte").scrollTop = document.getElementById("texte").scrollHeight;
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
                document.getElementById("texte").innerHTML += "- " + this.classAttribute + " a ramassé une arme favorite. " + this.classAttribute + " obtient un bonus de " + this.bonusHp + " Hp et de " + this.percentBoost + " Coup Critique ! \n";
                document.getElementById("texte").scrollTop = document.getElementById("texte").scrollHeight;
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
                document.getElementById("texte").scrollTop = document.getElementById("texte").scrollHeight;
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
