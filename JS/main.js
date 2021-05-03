let myBoard = new board(10, 10, 10);


// var paramsString = "q=URLUtils.searchParams&player1=unwhisky&player2=justeundoigt";
// var searchParams = new URLSearchParams(paramsString)
// for (let p of searchParams) {
//   console.log(p)
// }
let apparaitjoueur = false;
function dispFile(contents) {
  document.getElementById('contents').innerHTML = contents
}
function clickElem(elem) {
  var eventMouse = document.createEvent("MouseEvents")
  eventMouse.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
  elem.dispatchEvent(eventMouse)
}
function openFile(func) {
  apparaitjoueur = true
  readFile = function (e) {
    var file = e.target.files[0];
    if (!file) {
      return;
    }
    var reader = new FileReader();
    reader.onload = function (e) {
      var contents = e.target.result;
      fileInput.func(contents)
      document.body.removeChild(fileInput)
    }
    reader.readAsText(file)
  }
  fileInput = document.createElement("input")
  fileInput.type = 'file'
  fileInput.style.display = 'none'
  fileInput.onchange = readFile
  fileInput.func = func
  document.body.appendChild(fileInput)
  clickElem(fileInput) //faire une promise ? et dessiner le tableau après avoir résolu
  myBoard.drawBoard();
}


let Diluc = new Character("Diluc", 200, "images/perso1.png", 10, "espadon", 6, 85);
let Childe = new Character("Childe", 180, "images/perso2.png", 16, "lance", 12, 95);
let Razor = new Character("Razor", 192, "images/perso3.png", 13, "espadon", 9, 88);
let Jean = new Character("Jean", 170, "images/perso4.png", 21, "épée", 16, 100);
let Chongyun = new Character("Chongyun", 166, "images/perso5.png", 23, "espadon", 17, 105);
let Xiangling = new Character("Xiangling", 176, "images/perso6.png", 18, "lance", 14, 97);
let Albedo = new Character("Albedo", 160, "images/perso7.png", 25, "épée", 20, 110);

let playerOnBoard = [];

function getID(value) {
  switch (value) {
    case 1:
      playerOnBoard.push(Diluc)
      console.log(playerOnBoard)
      break;
    case 2:
      playerOnBoard.push(Childe)
      console.log(playerOnBoard)
      break;
    case 3:
      playerOnBoard.push(Razor)
      console.log(playerOnBoard)
      break;
    case 4:
      playerOnBoard.push(Jean)
      console.log(playerOnBoard)
      break;
    case 5:
      playerOnBoard.push(Chongyun)
      console.log(playerOnBoard)
      break;
    case 6:
      playerOnBoard.push(Xiangling)
      console.log(playerOnBoard)
      break;
    case 7:
      playerOnBoard.push(Albedo)
      console.log(playerOnBoard)
      break;
  }
  if (playerOnBoard.length === 2) {
    let $btn_play = $('<button class="btn_play" onClick="openFile(dispFile)"> Lancer la partie </button>')
    $('.placeBtnPlay').append($btn_play)
  }
}
function dessinejoueur() {
  if (apparaitjoueur) {
    playerOnBoard[0].spotPlayer(playerOnBoard[1]);
    randomWeapon(3)
    let element = document.getElementById('texte');
    element.innerHTML += "- Invocation de " + playerOnBoard[0].classAttribute + ". Armes favorites : " + playerOnBoard[0].typeOfWeapon + "\n";
    element.innerHTML += "- Invocation de " + playerOnBoard[1].classAttribute + ". Armes favorites : " + playerOnBoard[1].typeOfWeapon + "\n";
    element.innerHTML += "- Les armes : " + weaponOnBoard[0].name + " (" + weaponOnBoard[0].type + ")" + " / " + weaponOnBoard[1].name + " (" + weaponOnBoard[1].type + ")" + " / " + weaponOnBoard[2].name + " (" + weaponOnBoard[2].type + ")" + " apparaissent sur le terrain." + "\n";

  } console.log(playerOnBoard)
}


let weapon = new Weapon("Épée de vagabond", "ÉpéeDeNoob1", 10, "images/arme1.png", null, "épée de base", "Aucun");
let weapon0 = new Weapon("Épée de vagabond", "ÉpéeDeNoob", 10, "images/arme1.png", null, "épée de base", "Aucun");
let weapon1 = new Weapon("Ombre immaculée", "Ombre", 25, "images/arme2.png", "addHp", "espadon", "Ajout d'hp");
let weapon2 = new Weapon("Épée du faucon", "Faucon", 20, "images/arme3.png", "criticalHit", "épée", "Coup critique");
let weapon3 = new Weapon("Lance de jade ailée", "JadeAilée", 31, "images/arme4.png", "moreAtq", "lance", "Attaque+");
let weapon4 = new Weapon("Fléau du dragon", "Dragon", 18, "images/arme5.png", "fire", "lance", "Embrasement");
let weapon5 = new Weapon("Lance de la voûte d'Azur", "VoûteAzur", 23, "images/arme6.png", "defendAndAttack", "lance", "ATQ & DEF");
let weapon6 = new Weapon("Mort-du-loup", "MortDuLoup", 43, "images/arme7.png", "oneShot", "espadon", "Pile ou face");
let weapon7 = new Weapon("La Flûte", "Flûte", 22, "images/arme8.png", "sleeping", "épée", "Sommeil");

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

// randomWeapon(3);

async function letsGo() {
  weaponOnBoard.push(weapon)
  weaponOnBoard.push(weapon0)
  let playersWhoPlay = [Xiangling, Albedo];
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
      if (weCanPlay === true) {
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
    document.getElementById("texte").innerHTML += "- Début du combat ! \n"
    document.getElementById("texte").scrollTop = document.getElementById("texte").scrollHeight;
    let theFight = new fight(playersWhoPlay)
  } else {
    document.getElementById("texte").innerHTML += "Partie terminée ! Nombre de tours : " + numberOfTurn
    document.getElementById("texte").scrollTop = document.getElementById("texte").scrollHeight;
  }
}

letsGo()