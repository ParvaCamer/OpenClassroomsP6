let myBoard = new board(10, 10, 10);
myBoard.drawBoard();

let Diluc = new Character("Diluc", 200, "images/perso1.png");
let Childe = new Character("Childe", 180, "images/perso2.png");
let Razor = new Character("Razor", 192, "images/perso3.png");
let Jean = new Character("Jean", 170);
let Chongyun = new Character("Chongyun", 166);
let Xiangling = new Character("Xiangling", 176);
let Parva = new Character("Parva", 160);

let playerOnBoard = [Diluc, Childe]

playerOnBoard[0].spotPlayer();
playerOnBoard[1].spotPlayer();
playerOnBoard[0].notAround();

let weapon0 = new Weapon("Épée de vagabond", "ÉpéeDeNoob", 10, "images/arme1.png");
let weapon1 = new Weapon("Ombre immaculée", "Ombre", 40, "images/arme2.png");
let weapon2 = new Weapon("Épée du faucon", "Faucon", 28, "images/arme3.png");
let weapon3 = new Weapon("Lance de jade ailée", "JadeAilée", 30, "images/arme4.png");
let weapon4 = new Weapon("Fléau du dragon", "Dragon", 32, "images/arme5.png");
let weapon5 = new Weapon("Lance de la voûte d'Azur", "VoûteAzur", 24, "images/arme6.png");
let weapon6 = new Weapon("Mort-du-loup", "MortDuLoup", 36, "images/arme7.png");
let weapon7 = new Weapon("La Flûte", "Flûte", 14, "images/arme8.png");

// affichage des armes aléatoires sur le board //
let allWeapons = [
  weapon1,
  weapon2,
  weapon3,
  weapon4,
  weapon5,
  weapon6,
  weapon7,
];
let weaponOnBoard = [];

function randomWeapon(nbOfWeapon) {
  for (let i = 0; i < nbOfWeapon; i++) {
    let random = Math.floor(Math.random() * allWeapons.length);
    let aWeapon = allWeapons[random];
    allWeapons.splice(random, 1);
    weaponOnBoard.push(aWeapon);
  }
  weaponOnBoard.forEach(function (oneWeapon) {
    return oneWeapon.spotWeapons();
  });
}

randomWeapon(3);

async function letsGo() {
  let playersWhoPlay = [Diluc, Childe];
  playersWhoPlay[0].setOrder(1)
  playersWhoPlay[1].setOrder(2)
  playersWhoPlay[0].addWeapon(weapon0)
  playersWhoPlay[1].addWeapon(weapon0)
  let numberOfTurn = 0;
  let weCanPlay = true;
  let playerOne = null;
  let playerTwo = null;
  while (numberOfTurn < 10 && weCanPlay === true) {
    console.log("Nouveau tour")
    for (let i = 0; i < playersWhoPlay.length; i++) {
      if (weCanPlay) {
        await playersWhoPlay[i].movePlayer(weaponOnBoard, playersWhoPlay[i === 1 ? 0 : 1])
        weCanPlay = playersWhoPlay[i].isFrontOfPlayer(playersWhoPlay[i === 1 ? 0 : 1])
        if (weCanPlay === false) {
          playerOne = playersWhoPlay[i]
          playerTwo = playersWhoPlay[i === 1 ? 0 : 1]
        }
      }
    }
    numberOfTurn++;
    console.log("Nombre de tours : ", numberOfTurn)
  }
  if (numberOfTurn < 10) {
    console.log("Start combat !")
    fight(playerOne, playerTwo)
  } else {
    console.log("Partie terminée ! Nombre de tours : ", numberOfTurn)
  }
}

letsGo()