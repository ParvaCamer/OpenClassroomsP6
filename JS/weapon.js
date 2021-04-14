class Weapon {
    constructor(name, classAttribute, damage, srcImg, effect = null, type, description = null) {
        this.character = null;
        this.name = name;
        this.classAttribute = classAttribute;
        this.srcImg = srcImg;
        this.damage = damage;
        this.position = -1;
        this.effect = effect;
        this.effects = {
            addHp: {
                isBegginingTurn: true,
                isEndingTurn: false,
                allFightingEffect: false,
                stat: "PV",
                changement: 10
            },
            criticalHit: {
                isBegginingTurn: false,
                isEndingTurn: false,
                allFightingEffect: true,
                stat: "damage",
                changement: 14
            },
            canBeKilled: {
                isBegginingTurn: true,
                isEndingTurn: false,
                allFightingEffect: false,
                stat: "PV",
                changement: 0
            },
            sleeping: {
                isBegginingTurn: false,
                isEndingTurn: false,
                allFightingEffect: true,
                stat: "damage",
                changement: 0
            },
            fire: {
                isBegginingTurn: false,
                isEndingTurn: false,
                allFightingEffect: true,
                stat: "damage",
                changement: 5
            },
            oneShot: {
                isBegginingTurn: false,
                isEndingTurn: false,
                allFightingEffect: true,
                stat: null,
                changement: null
            },
            moreAtq: {
                isBegginingTurn: false,
                isEndingTurn: false,
                allFightingEffect: true,
                stat: "PV",
                changement: 20
            },
            defendAndAttack: {
                isBegginingTurn: false,
                isEndingTurn: false,
                allFightingEffect: true,
                stat: "PV",
                changement: null
            }
        };
        this.type = type;
        this.description = description
    }

    powerUp() {
        return this.bonus[this.bonusWeapon].upDamage
    }

    hasAllFightingEffect() {
        if (this.effect !== null) {
            return this.effects[this.effect].allFightingEffect
        } else {
            return false
        }
    }

    hasBegginingEffect() {
        if (this.effect !== null) {
            return this.effects[this.effect].isBegginingTurn
        } else {
            return false
        }
    }

    hasEndingEffect() {
        if (this.effect !== null) {
            return this.effects[this.effect].isEndingTurn
        } else {
            return false
        }
    }

    doEffect() {
        if (this.effect !== null) {
            let effect = this.effects[this.effect]
            this.character[this.effect](effect.changement)
        }
    }

    spotWeapons() {
        for (let w = 0; w < 1; w++) {
            let random = Math.floor(Math.random() * 100);
            let weaponBox = $('#' + random);

            if (weaponBox.hasClass("weaponBox") || weaponBox.hasClass("casePlayer") || weaponBox.hasClass("caseObstacle")) {
                w--
            } else {
                weaponBox.addClass("weaponBox")
                weaponBox.addClass(this.classAttribute)
                this.position = random
            }
        }
    }

    // ajoute les caractéristiques du personnage désigné
    addOwner(character) {
        this.character = character
    }
}