class Weapon {
    constructor(name, classAttribute, damage, srcImg, effect = null) {
        this.character = null
        this.name = name
        this.classAttribute = classAttribute;
        this.srcImg = srcImg
        this.damage = damage
        this.beginingDamage = damage
        this.position = -1
        this.effect = effect
        this.effects = {
            addHp: {
                isBegginingTurn: true,
                isEndingTurn: false,
                stat: "PV",
                changement: 10
            },
            maledictionHp: {
                isBegginingTurn: false,
                isEndingTurn: true,
                stat: "PV",
                changement: -50
            },
            criticalHit: {
                isBegginingTurn: true,
                isEndingTurn: false,
                stat: "damage",
                changement: 14
            },
            canBeKilled: {
                isBegginingTurn: true,
                isEndingTurn: false,
                stat: "PV",
                changement: 0
            },
            sleeping: {
                isBegginingTurn: true,
                isEndingTurn: false,
                stat: "damage",
                changement: 0
            },
            oneShot: {
                isBegginingTurn: true,
                isEndingTurn: false,
                stat: "damage",
                changement: 9986
            },
            moreAtq: {
                isBegginingTurn: true,
                isEndingTurn: false,
                stat: "PV",
                changement: 20
            }
        }
    }

    hasBegginingEffect() {
        return this.effects[this.effect].isBegginingTurn
    }

    hasEndingEffect() {
        return this.effects[this.effect].isEndingTurn
    }

    doEffect() {
        let effect = this.effects[this.effect]
        this.character[this.effect](effect.changement)
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