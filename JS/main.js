let myBoard = new board(10, 10, 10);
myBoard.drawBoard();

let Diluc = new Character("Diluc", 200, 3)
let Childe = new Character("Childe", 180, 3)
let Razor = new Character("Razor", 192, 3)
let Jean = new Character("Jean", 170, 3)
let Chongyun = new Character("Chongyun", 166, 3)
let Xiangling = new Character("Xiangling", 176, 3)
let Parva = new Character("Parva", 160, 3)

Diluc.spotPlayer()
Razor.spotPlayer()
Diluc.notAround()

let weapon0 = new Weapon("Épée de vagabond", "ÉpéeDeNoob")
let weapon1 = new Weapon("Ombre immaculée", "Ombre")
let weapon2 = new Weapon("Épée du faucon", "Faucon")
let weapon3 = new Weapon("Lance de jade ailée", "JadeAilée")
let weapon4 = new Weapon("Fléau du dragon", "Dragon")
let weapon5 = new Weapon("Lance de la voûte d'Azur", "VoûteAzur")
let weapon6 = new Weapon("Mort-du-loup", "MortDuLoup")
let weapon7 = new Weapon("La Flûte", "Flûte")

weapon1.spotWeapons()
weapon2.spotWeapons()

let playersWhoPlay = [
    Diluc,
    Razor
  ]
  
let playerNumberToPlay = {
  value: 0,
  letMeKnow() {
	if (this.setting === 2) {
      this.setting = 0
	  numberOfTurn.setting++;
    }else{
		playersWhoPlay[this.setting].movePlayer();
	}
  },
  get setting() {
    return this.value;
  },
  set setting(value) {
    this.value = value;
    this.letMeKnow();
  }
}

let numberOfTurn = {
  value: 0,
  letMeKnow() {
	if (this.setting === 999) {
		console.log("FIN DE LA PARTIE")
		playersWhoPlay = []
    }
  },
  get setting() {
    return this.value;
  },
  set setting(value) {
    this.value = value;
    this.letMeKnow();
  }
}

playersWhoPlay[0].movePlayer();
