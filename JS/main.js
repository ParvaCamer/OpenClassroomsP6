let myBoard = new board(10, 10, 10);
myBoard.drawBoard();

let Diluc = new Character("Diluc", 200);
let Childe = new Character("Childe", 180);
let Razor = new Character("Razor", 192);
let Jean = new Character("Jean", 170);
let Chongyun = new Character("Chongyun", 166);
let Xiangling = new Character("Xiangling", 176);
let Parva = new Character("Parva", 160);

Diluc.spotPlayer();
Razor.spotPlayer();
Diluc.notAround();

let weapon0 = new Weapon(1, "Épée de vagabond", "ÉpéeDeNoob", 10);
let weapon1 = new Weapon(2, "Ombre immaculée", "Ombre", 40);
let weapon2 = new Weapon(3, "Épée du faucon", "Faucon", 28);
let weapon3 = new Weapon(4, "Lance de jade ailée", "JadeAilée", 30);
let weapon4 = new Weapon(5, "Fléau du dragon", "Dragon", 32);
let weapon5 = new Weapon(6, "Lance de la voûte d'Azur", "VoûteAzur", 24);
let weapon6 = new Weapon(7, "Mort-du-loup", "MortDuLoup", 36);
let weapon7 = new Weapon(8, "La Flûte", "Flûte", 14);

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
  let playersWhoPlay = [Diluc, Razor];
  let numberOfTurn = 0;
  let weCanPlay = true;
  let playerOne = null
  let playerTwo = null
  while (numberOfTurn < 10 && weCanPlay === true) {
    console.log("Nouveau tour")
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