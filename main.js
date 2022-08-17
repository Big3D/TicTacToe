const X_IMAGE_URL =
  "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1083533/x.png";
const O_IMAGE_URL =
  "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1083533/circle.png";
let playerTurn = true;
let compTurn = false;
let compFirstTurn = false;
let xPlayer = [];
let oComp = [];
let endGame = false;
let winNumbers = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let boardNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8];

// allow the player to click on a space to start the game
// after clicking a space the computer will take about 5 sec and choose a spot
// then allow the players turn, again each turn toggles 2 booleans
// there will be 2 arrays handled, one for computer and one for player. If either array contains specific numbers then that player wins

function onClick(event) {
  // Element that was clicked
  const element = event.target;
  // Create an <img> tag with the X img src
  const image = document.createElement("img");
  image.src = X_IMAGE_URL;
  // Append that <img> tag to the element
  element.appendChild(image);
  playerTurn = false;

  for (let i = 0; i < boardNumbers.length; i++) {
    if (boardNumbers[i] == this.id) {
      let id = parseInt(this.id);
      boardNumbers.splice(i, 1);
      i--;
      this.removeEventListener("click", onClick);
      xPlayer.push(id);
    }
  }

  checkWins(xPlayer, "Player");
  if(!endGame){
  computerTurn();
  }
}

function computerTurn() {
  const image = document.createElement("img");
  image.src = O_IMAGE_URL;

  let randomNum = boardNumbers[Math.floor(Math.random() * boardNumbers.length)];
  let space = document.getElementById(randomNum);
  let numIndex = boardNumbers.indexOf(randomNum);

  if (!playerTurn && boardNumbers.length > 0) {
    space.appendChild(image);
    compTurn = false;
    space.removeEventListener("click", onClick);

    boardNumbers.splice(numIndex, 1);
    oComp.push(randomNum);

    checkWins(oComp, "Computer");
    if(!endGame){
      playerTurn;
    }
  } else {
    alert("Cats game");
  }
}

function checkWins(playerArr, player) {
  for (let i=0; i<winNumbers.length; i++) {
    let winchecks = 0;
    for (let j=0; j<playerArr.length; j++){
      let cycleWin = winNumbers[i].includes(playerArr[j]);
      console.log(cycleWin)
      if (cycleWin){
        winchecks++;
      };  
    }
    
    if(winchecks == 3){
      alert(player + " wins!");
      endGame = true;
    }      
  }
}

const gridItems = document.querySelectorAll("#grid div");
for (const item of gridItems) {
  item.addEventListener("click", onClick);
}
