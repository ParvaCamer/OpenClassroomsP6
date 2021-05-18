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
                allFightingEffect: true,
                stat: "PV",
                changement: 15
            },
            criticalHit: {
                allFightingEffect: true,
                stat: "damage",
                changement: 14
            },
            sleeping: {
                allFightingEffect: true,
                stat: "damage",
                changement: 0
            },
            fire: {
                allFightingEffect: true,
                stat: "damage",
                changement: 5
            },
            oneShot: {
                allFightingEffect: true,
                stat: null,
                changement: null
            },
            moreAtq: {
                allFightingEffect: true,
                stat: "PV",
                changement: 20
            },
            defendAndAttack: {
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