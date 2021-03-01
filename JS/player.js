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
    this.showCasesToMoove();
    let that = this;
    var elements = document.getElementsByClassName("caseVide");

    var myHandler = function (event) {
      let valueOfCaseClicked = parseInt($(this).attr("id"));
      console.log("TOUR DE " + that.classAttribute);
      if (that.positionToClick.includes(valueOfCaseClicked) === true && that.position !== valueOfCaseClicked) {
        console.log("Le joueur peut se déplacer sur cette case");
        console.log($(this));
        that.setPlayerPosition(valueOfCaseClicked);
        that.takeWeapon(allWeaponsOnBoard);

        Array.from(elements).forEach(function (element) {
          element.removeEventListener("click", myHandler);
        });

        this.removeEventListener("click", myHandler);
        // playerNumberToPlay.setting++;
      } else {
        console.log("Le joueur ne peut pas se déplacer sur cette case.");
      }
    };
    Array.from(elements).forEach(function (element) {
      element.addEventListener("click", myHandler);
    });
    // this.beginFight()
  }

  showCasesToMoove() {
    let position = this.position;
    this.positionToClick = [];
    for (let i = 0; i <= 3; i++) {// pour aller à droite
      $("#" + position + i).addClass("cellToClick");
      this.positionToClick.push(position + i);
    }
    for (let i = 0; i <= 3; i++) {// pour aller à gauche
      $("#" + position - i).addClass("cellToClick");
      this.positionToClick.push(position - i);
    }
    for (let i = 0; i <= 30; i += 10) {// pour aller en haut
      $("#" + position + i).addClass("cellToClick");
      this.positionToClick.push(position + i);
    }
    for (let i = 0; i <= 30; i += 10) {// pour aller en bas
      $("#" + position - i).addClass("cellToClick");
      this.positionToClick.push(position - i);
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

  // beginFight() {
  //   let onePlayer = parseInt($(".Razor").attr("id"));
  //   let posPlayer = this.position;

  //   let left = posPlayer - 1,
  //     right = posPlayer + 1,
  //     top = posPlayer - 10,
  //     bot = posPlayer + 10;
  //   console.log("id Razor : " + onePlayer);
  //   console.log("id gauche : " + left);
  //   console.log("id droite : " + right);
  //   console.log("id haut : " + top);
  //   console.log("id bas : " + bot);
  //   console.log("id du joueur : " + posPlayer)

  //   if (left == onePlayer - 1 || right == onePlayer + 1 || top == onePlayer - 10 || bot == onePlayer + 10) {
  //     console.log("bien vu chacal") //vu que le joueur change tout les tours, ça marche pas mdr
  //   }
  // }
}
