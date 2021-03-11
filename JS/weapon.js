class Weapon {
    constructor(id, name, classAttribute, damage) {
        this.id = id;
        this.name = name
        this.classAttribute = classAttribute;
        this.damage = damage
        this.position = 0
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