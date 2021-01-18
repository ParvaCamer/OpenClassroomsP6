class Character {
  constructor(classAttribute, PV, PM) {
    this.classAttribute = classAttribute;
    this.PV = PV;
    this.PM = PM;
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
      }
    }
  }

  notAround() {
    for (let i = 0; i < 1; i++) {
      // mettre que ça sera la classe du joueur 1 et 2 cliqué après évènement html
      let players = $('.casePlayer')
      let idPlayer1 = $('.Diluc').attr('id') // l'id des joueurs 
      let idPlayer2 = $('.Razor').attr('id') 
      let stringPlayer1 = parseInt(idPlayer1) // convertit l'id en entier
      let stringPlayer2 = parseInt(idPlayer2)

      let left = stringPlayer1 -1, right = stringPlayer1 +1, top = stringPlayer1 -10, bot = stringPlayer1 +10;

        if (left == stringPlayer2 || right == stringPlayer2 || top == stringPlayer2 || bot == stringPlayer2) {
          players.removeClass("Diluc")
          players.removeClass(this.classAttribute)
          this.spotPlayer()
        }
    }
  }

  movePlayer() {
    let players = $('.casePlayer')
    for (let m = 0; m < this.PM; m++) {
      
    }
  }
}
