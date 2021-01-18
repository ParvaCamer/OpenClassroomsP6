class Weapon {
    constructor(name, classAttribute) {
        this.name = name
        this.classAttribute = classAttribute;
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
            }
        }
    }
}