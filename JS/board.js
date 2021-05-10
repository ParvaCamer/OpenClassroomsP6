class board {
  constructor(width, oneCase, obstacle) {
    this.width = width;
    this.oneCase = oneCase;
    this.obstacle = obstacle;
  }

  drawBoard() {
    let bigBox = $("tbody");

    for (let i = 0; i < this.width; i++) { // pour faire les lignes
      let line = $("<tr></tr>");

      for (let j = 0; j < this.oneCase; j++) { // pour faire les cases
        let littleBox = $("<td></td>");
        littleBox.addClass("caseVide");
        line.append(littleBox);

        if (i == 0) { // pour donner un id à chaque case
          littleBox.attr("id", j);
        } else {
          littleBox.attr("id", (this.width - 1) * i + j + i);
        }
      }
      bigBox.append(line);
    }
    for (let o = 0; o < this.obstacle; o++) { // pour mettre les obstacles
      let random = Math.floor(Math.random() * 100);
      let box = $("#" + random);
      if (box.hasClass("caseVide")) { // pour donner la classe "caseObstacle" aux cases obstacles
        box.removeClass("caseVide");
        box.addClass("caseObstacle");
      } else if (box.hasClass("caseObstacle")) {
        o--
      } else {
        box.hasClass("caseObstacle");
      }
    }
  }
}