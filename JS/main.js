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
playerOnBoard[0].notAround(playerOnBoard[1]);

let weapon = new Weapon("Épée de vagabond", "ÉpéeDeNoob1", 10, "images/arme1.png", "addHp");
let weapon0 = new Weapon("Épée de vagabond", "ÉpéeDeNoob", 10, "images/arme1.png", "addHp");
let weapon1 = new Weapon("Ombre immaculée", "Ombre", 36, "images/arme2.png", "addHp");
let weapon2 = new Weapon("Épée du faucon", "Faucon", 28, "images/arme3.png", "criticalHit");
let weapon3 = new Weapon("Lance de jade ailée", "JadeAilée", 30, "images/arme4.png", "moreAtq");
let weapon4 = new Weapon("Fléau du dragon", "Dragon", 14, "images/arme5.png", "oneShot");
let weapon5 = new Weapon("Lance de la voûte d'Azur", "VoûteAzur", 24, "images/arme6.png", "addHp"); //garder addHp
let weapon6 = new Weapon("Mort-du-loup", "MortDuLoup", 50, "images/arme7.png", "canBeKilled");
let weapon7 = new Weapon("La Flûte", "Flûte", 18, "images/arme8.png", "sleeping");

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
  weaponOnBoard.push(weapon)
  weaponOnBoard.push(weapon0)
  let playersWhoPlay = [Diluc, Childe];
  playersWhoPlay[0].setOrder(1)
  playersWhoPlay[1].setOrder(2)
  playersWhoPlay[0].addWeapon(weapon)
  playersWhoPlay[1].addWeapon(weapon0)
  let numberOfTurn = 0;
  let weCanPlay = true;
  let playerOne = null;
  let playerTwo = null;
  while (numberOfTurn < 10 && weCanPlay === true) {
    for (let i = 0; i < playersWhoPlay.length; i++) {
      if (weCanPlay) {
        await playersWhoPlay[i].movePlayer(weaponOnBoard)
        weCanPlay = playersWhoPlay[i].isFrontOfPlayer(playersWhoPlay[i === 1 ? 0 : 1])
        if (weCanPlay === false) {
          playerOne = playersWhoPlay[i]
          playerTwo = playersWhoPlay[i === 1 ? 0 : 1]
        }
      }
    }
    numberOfTurn++;
  }
  if (numberOfTurn < 10) {
    let theFight = new fight(playersWhoPlay)
  } else {
    console.log("Partie terminée ! Nombre de tours : ", numberOfTurn)
  }
}

letsGo()