class Character {
  constructor(classAttribute, PV, PM) {
    this.classAttribute = classAttribute;
    this.PV = PV;
    this.PM = PM;
    this.position = -1;
    this.positionToClick = [];
  }

  spotPlayer() {
    for (let p = 0; p < 1; p++) {
      let random = Math.floor(Math.random() * 100);
      let littleBox = $("#" + random);

      if (littleBox.hasClass("casePlayer") || littleBox.hasClass("caseObstacle")) {
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
    let idPlayer1 = $(".Diluc").attr("id"); // l'id des joueurs
    let idPlayer2 = $(".Razor").attr("id");
    let stringPlayer1 = parseInt(idPlayer1); // convertit l'id en entier
    let stringPlayer2 = parseInt(idPlayer2);

    let left = stringPlayer1 - 1, right = stringPlayer1 + 1, top = stringPlayer1 - 10, bot = stringPlayer1 + 10;

    if (left == stringPlayer2 || right == stringPlayer2 || top == stringPlayer2 || bot == stringPlayer2) {
      players.removeClass("Diluc");
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

  movePlayer() {
    this.showCasesToMoove();
    let that = this;
    var elements = document.getElementsByClassName("caseVide");

    var myHandler = function (event) {
      let valueOfCaseClicked = parseInt($(this).attr("id"));
      console.log("TOUR DE " + that.classAttribute);
      if (that.positionToClick.includes(valueOfCaseClicked) === true) {
        console.log("Le joueur peut se déplacer sur cette case");
        that.setPlayerPosition(valueOfCaseClicked);

        Array.from(elements).forEach(function (element) {
          element.removeEventListener("click", myHandler);
        });

        this.removeEventListener("click", myHandler);
        playerNumberToPlay.setting++;
      } else {
        console.log("Le joueur ne peut pas se déplacer sur cette case.");
      }
    };

    Array.from(elements).forEach(function (element) {
      element.addEventListener("click", myHandler);
    });
  }

  showCasesToMoove() {
    let position = this.position;
    for (let i = 0; i < 4; i++) {
      $("#" + position + i).addClass("cellToClick");
      this.positionToClick.push(position + i);
    }
    for (let i = 0; i < 4; i++) {
      $("#" + position - i).addClass("cellToClick");
      this.positionToClick.push(position - i);
    }
    for (let i = 0; i < 40; i += 10) {
      $("#" + position + i).addClass("cellToClick");
      this.positionToClick.push(position + i);
    }
    for (let i = 0; i < 4; i += 10) {
      $("#" + position - i).addClass("cellToClick");
      this.positionToClick.push(position - i);
    }
  }
}
