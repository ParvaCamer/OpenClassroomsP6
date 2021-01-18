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
  let isGameOver = false;
  let playerNumberToPlay = 0;
  let numberOfTurn = 0
  
  while (isGameOver === false) {
    playersWhoPlay[playerNumberToPlay].movePlayer();
    playerNumberToPlay += 1;
    if (playerNumberToPlay === 2) {
      playerNumberToPlay = 0
      numberOfTurn += 1;
    }
    if (numberOfTurn === 5) {
      isGameOver = true
    }
  }