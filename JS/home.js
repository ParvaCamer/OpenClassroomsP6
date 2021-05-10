let playerOnBoard = [];

function getID(value) {
    switch (value) {
        case 1:
            playerOnBoard.push("Diluc")
            break;
        case 2:
            playerOnBoard.push("Childe")
            break;
        case 3:
            playerOnBoard.push("Razor")
            break;
        case 4:
            playerOnBoard.push("Jean")
            break;
        case 5:
            playerOnBoard.push("Chongyun")
            break;
        case 6:
            playerOnBoard.push("Xiangling")
            break;
        case 7:
            playerOnBoard.push("Albedo")
            break;
    }
    if (playerOnBoard[0] === playerOnBoard[1]) {
        playerOnBoard.splice(1, 1)
        alert("Merci de ne pas choisir le même personnage.")
    }
    if (playerOnBoard.length === 2) {
        let $btn_play = $('<button class="btn_play" onclick="visitPage()"> Lancer la partie </a></button>')
        $('.placeBtnPlay').append($btn_play)
    }
}
function visitPage() {
    window.location = "home.html?player1=" + playerOnBoard[0] + "&player2=" + playerOnBoard[1]
}