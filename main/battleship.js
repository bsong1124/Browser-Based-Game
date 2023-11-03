const computerTable = document.querySelector("#computer");
const playerTable = document.querySelector("#player");
const computerShip = document.querySelector("#computer-ship");
const playerShip = document.querySelector("#player-ship");
const rotateButton = document.querySelector("#rotate-button");
const startButton = document.querySelector("#start-button");
const resetButton = document.querySelector("#reset-button");
const turnDisplay = document.querySelector("#turn-display>p");
const infoDisplay = document.querySelector("#info-display");
const winnerDisplay = document.querySelector(".winner-display");
const yAxis = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let player;
let computer;
let dragging;
let isGameOver = false;

startButton.addEventListener("click", start);
rotateButton.addEventListener("click", rotateShip);
resetButton.addEventListener("click", function () {
  location.reload();
});

class Player {
  constructor(name, tableDOM, shipDOM) {
    this.name = name;
    this.tableDOM = tableDOM;
    this.shipDOM = shipDOM;
    this.ships = [
      { name: "submarine", length: 3, hitPoints: 3, coord: [] },
      { name: "cruiser", length: 3, hitPoints: 3, coord: [] },
      { name: "battleship", length: 4, hitPoints: 4, coord: [] },
      { name: "carrier", length: 5, hitPoints: 5, coord: [] },
    ];
  }
  tableCreation() {
    //creates 9 table rows and 9 table headers -> 1 header in each row.
    for (let i = 1; i <= yAxis.length; i++) {
      let createRow = document.createElement("tr");
      this.tableDOM.appendChild(createRow);
      let createRowHeader = document.createElement("th");
      createRowHeader.textContent = i;
      createRow.appendChild(createRowHeader);
      //creates 9 cells per each header -> only cells will be interactable
      for (let j = 1; j < 10; j++) {
        let createCell = document.createElement("td");
        createCell.classList.add(this.name);
        createCell.setAttribute("id", "x" + i + "y" + j); //setting coordinates as ids -> x=vertical y=horizontal
        createRow.appendChild(createCell);
      }
    }
  }
  shipCreation() {
    for (let ship of this.ships) {
      let createShip = document.createElement("div");
      createShip.innerText = `${ship.name} ${ship.length}x`; //hard to style each ship to be exact length of cells -> used text to show length
      createShip.setAttribute("id", ship.name);
      createShip.classList.add(ship.name, "horizontal");
      this.shipDOM.appendChild(createShip);
      //allow for dragging of ONLY player ships
      if (this.shipDOM === playerShip) {
        createShip.draggable = true;
        createShip.classList.add("draggable");
      }
    }
  }
  randomizeComShips() {
    this.ships.forEach(function (ship) {
      //ininite loop for random orientation and starting cell until ship is placed
      while (true) {
        ranNumX();
        ranNumY();
        if (ranBoolean()) {
          if (ranY + ship.length - 1 <= 9) {
            //true -> horizontal ship
            if (this.setShip(ship, ranY, ranX, true)) {
              break;
            }
          }
        } else if (ranX + ship.length - 1 <= 9) {
          //false -> vertical ship
          if (this.setShip(ship, ranY, ranX, false)) {
            break;
          }
        }
      }
    }, this); //'this' argument necessary so line 75/81 is referring to correct value
  }
  checkValidPlayerShipCell(e) {
    const shipCells = [e.target.id];
    for (const ship of player.ships) {
      //skips to next ship if current iteration !same ship
      if (!dragging.classList.contains(ship.name)) {
        continue;
      }
      const isHorizontal = dragging.classList.contains("horizontal");
      const cellMatch = e.target.id.match(/x(\d+)y(\d+)/); //much simpler than using .split()
      const cellX = parseInt(cellMatch[1]);
      const cellY = parseInt(cellMatch[2]);
      if (player.setShip(ship, cellY, cellX, isHorizontal)) {
        dragging.draggable = false;
        dragging.hidden = true; //hides ship visual to simulate moving the ships
        //hides the same ship on the computer side to simulate moving the ships
        for (let compShip of computerShipDivs) {
          if (compShip.classList.contains(ship.name)) {
            compShip.hidden = true;
          }
        }
      }
    }
  }
  setShip(ship, ranY, ranX, isHorizontal) {
    if (isHorizontal) {
      //checks all horizontal selected cells
      for (let i = ranY; i < ranY + ship.length; i++) {
        let cellId = "x" + ranX + "y" + i;
        const cell = this.tableDOM.querySelector("#" + cellId);
        if (cell.classList.contains("placed")) {
          return false;
        }
      }
      //actually places the ships
      for (let i = ranY; i < ranY + ship.length; i++) {
        let cellId = "x" + ranX + "y" + i;
        const cell = this.tableDOM.querySelector("#" + cellId);
        cell.classList.add("placed");
        cell.classList.add(ship.name);
        ship.coord.push(cellId);
        //only make computer ships on grid invisible
        if (this.name === "computer") {
          cell.classList.add("invisible");
        }
      }
    } else {
      //checks all vertical selected cells
      for (let i = ranX; i < ranX + ship.length; i++) {
        let cellId = "x" + i + "y" + ranY;
        const cell = this.tableDOM.querySelector("#" + cellId);
        if (cell.classList.contains("placed")) {
          return false;
        }
      }
      //actually places the sips
      for (let i = ranX; i < ranX + ship.length; i++) {
        let cellId = "x" + i + "y" + ranY;
        const cell = this.tableDOM.querySelector("#" + cellId);
        cell.classList.add("placed");
        cell.classList.add(ship.name);
        ship.coord.push(cellId);
        if (this.name === "computer") {
          cell.classList.add("invisible");
        }
      }
    }
    return true;
  }
  hitDetection(e) {
    let hp = 0;
    let isHit = false;
    for (const ship of this.ships) {
      hp += ship.hitPoints;
      if (!e.classList.contains(ship.name)) {
        continue;
      }
      if (e.classList.contains(ship.name) && !e.classList.contains("hit")) {
        ship.hitPoints--;
        hp--;
        e.classList.add("hit");
        isHit = true;
      }
      if (ship.hitPoints === 0) {
        let newInfo = document.createElement("p");
        newInfo.innerText = this.name + "'s " + ship.name + " sunk";
        infoDisplay.appendChild(newInfo);
      }
    }
    if (!isHit) {
      e.classList.add("miss");
    }
    //because user.hitDetection() is checking hitPoints of user's ships, if user's hp === 0, then the other user wins.
    //i.e computer.hitDetection() and computer's hitPoints === 0 -> player wins -> gameOver(player)
    if (hp === 0) {
      if (this.name === "computer") {
        gameOver(player);
      } else {
        gameOver(computer);
      }
    }
  }
}

init();

const computerShipDivs = document.querySelectorAll("#computer-ship>div");
const playerShipDivs = document.querySelectorAll("#player-ship>div");
const draggableShips = document.querySelectorAll(".draggable");
const playerCells = document.querySelectorAll("#player > tr > td");

let currentTurn = player;

function init() {
  computer = new Player("computer", computerTable, computerShip);
  computer.tableCreation();
  computer.shipCreation();
  player = new Player("player", playerTable, playerShip);
  player.tableCreation();
  player.shipCreation();
  computer.randomizeComShips();
}

function rotateShip() {
  playerShipDivs.forEach(function (shipDiv) {
    if (shipDiv.classList.contains("horizontal")) {
      shipDiv.style.transform = "rotate(90deg)";
      shipDiv.classList.remove("horizontal");
    } else {
      shipDiv.style.transform = "rotate(0deg)";
      shipDiv.classList.add("horizontal");
    }
  });
}

draggableShips.forEach(function (ship) {
  ship.addEventListener("dragstart", dragStart);
});

playerCells.forEach(function (cell) {
  cell.addEventListener("dragover", dragOver);
  cell.addEventListener("drop", player.checkValidPlayerShipCell);
});

function dragStart(e) {
  dragging = e.target;
}
function dragOver(e) {
  e.preventDefault();
}

function ready() {
  let allPlaced = true;
  player.ships.forEach(function (ship) {
    if (ship.coord.length < 1) {
      allPlaced = false;
    }
  });
  return allPlaced;
}

function start() {
  if (ready() && !isGameOver) {
    turnDisplay.innerText = (currentTurn.name + "'s turn").toUpperCase();
    computerTable.addEventListener("click", function (event) {
      if (
        currentTurn === player &&
        event.target.tagName === "TD" &&
        !event.target.classList.contains("hit") &&
        !event.target.classList.contains("miss")
      ) {
        computer.hitDetection(event.target);
        currentTurn = computer;
        turnDisplay.innerText = (currentTurn.name + "'s turn").toUpperCase();
        setTimeout(computerClick, 1000);
      }
    });
  }
}

function computerClick() {
  if (currentTurn === computer) {
    let clicked = false;
    while (!clicked) {
      ranNumX();
      ranNumY();
      const cellId = "x" + ranX + "y" + ranY;
      const cell = playerTable.querySelector("#" + cellId);
      if (!cell.classList.contains("hit") && !cell.classList.contains("miss")) {
        player.hitDetection(cell);
        currentTurn = player;
        turnDisplay.innerText = (currentTurn.name + "'s turn").toUpperCase();
        clicked = true;
      }
    }
  }
}

function gameOver(user) {
  isGameOver = true;
  computerTable.remove();
  playerTable.remove();
  turnDisplay.remove();
  let winner = document.createElement("h1");
  winner.innerText = user.name.toUpperCase() + " is the WINNER!";
  winnerDisplay.appendChild(winner);
}

function ranNumX() {
  ranX = Math.floor(Math.random() * 9) + 1;
  return ranX;
}

function ranNumY() {
  ranY = Math.floor(Math.random() * 9) + 1;
  return ranY;
}

function ranBoolean() {
  return Math.random() < 0.5;
}
