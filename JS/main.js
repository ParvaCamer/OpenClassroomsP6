let myBoard = new board(10, 10, 10);
myBoard.drawBoard();

let Diluc = new Character("Diluc", 200)
let Childe = new Character("Childe", 180)
let Razor = new Character("Razor", 192)
let Jean = new Character("Jean", 170)
let Chongyun = new Character("Chongyun", 166)
let Xiangling = new Character("Xiangling", 176)
let Parva = new Character("Parva", 160)

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

let allWeapons = [
    weapon1.classAttribute,
    weapon2.classAttribute,
    weapon3.classAttribute,
    weapon4.classAttribute,
    weapon5.classAttribute,
    weapon6.classAttribute,
    weapon7.classAttribute  
]
let weaponOnBoard = []
function randomWeapon() {
    for (let i = 0; i < 3; i++) {
      let random = Math.floor(Math.random() * allWeapons.length);
      let aWeapon = allWeapons[random];
      allWeapons.splice(random, 1)
      weaponOnBoard.push(aWeapon)
      console.log(aWeapon) 
      console.log(allWeapons)
      console.log(weaponOnBoard)
    } 
}
randomWeapon()
Diluc.addWeapon(weapon0)
weaponOnBoard[0].spotWeapons()
// weapon1.spotWeapons()
// weapon2.spotWeapons()

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
	if (this.setting === 99) {
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
