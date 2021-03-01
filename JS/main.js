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
// Diluc.beginFight();

let weapon0 = new Weapon("Épée de vagabond", "ÉpéeDeNoob", 10);
let weapon1 = new Weapon("Ombre immaculée", "Ombre", 40);
let weapon2 = new Weapon("Épée du faucon", "Faucon", 28);
let weapon3 = new Weapon("Lance de jade ailée", "JadeAilée", 30);
let weapon4 = new Weapon("Fléau du dragon", "Dragon", 32);
let weapon5 = new Weapon("Lance de la voûte d'Azur", "VoûteAzur", 24);
let weapon6 = new Weapon("Mort-du-loup", "MortDuLoup", 36);
let weapon7 = new Weapon("La Flûte", "Flûte", 14);

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
Diluc.addWeapon(weapon0);
Razor.addWeapon(weapon0);

function letsGo() {
  let playersWhoPlay = [Diluc, Razor];
  let numberOfTurn = 0;
  let weCanPlay = true;
  while (numberOfTurn < 10 || weCanPlay == true) {

    for (let i = 0; i <= playersWhoPlay.length; i++) {
      playersWhoPlay[i].movePlayer(weaponOnBoard);
    } numberOfTurn++;
    playersWhoPlay = [];
  }
}
letsGo()


// let playerNumberToPlay = {
//   value: 0,
//   letMeKnow() {
//     if (this.setting === 2) {
//       this.setting = 0;
//       numberOfTurn.setting++;
//     } else {
//       console.log(weaponOnBoard);
//       playersWhoPlay[this.setting].movePlayer(weaponOnBoard);
//     }
//   },
//   get setting() {
//     return this.value;
//   },
//   set setting(value) {
//     this.value = value;
//     this.letMeKnow();
//   },
// };

// let numberOfTurn = {
//   value: 0,
//   letMeKnow() {
//     if (this.setting === 10) {
//       alert("FIN DE LA PARTIE");
//       playersWhoPlay = [];
//     }
//   },
//   get setting() {
//     return this.value;
//   },
//   set setting(value) {
//     this.value = value;
//     this.letMeKnow();
//   },
// };

playersWhoPlay[0].movePlayer();
