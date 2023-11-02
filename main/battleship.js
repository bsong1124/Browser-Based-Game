console.log("js loaded");
// Global Variables
const computerTable = document.querySelector("#computer");
const playerTable = document.querySelector("#player");
const computerShip = document.querySelector("#computer-ship");
const playerShip = document.querySelector("#player-ship");
const rotateButton = document.querySelector("#rotate-button");
const startButton = document.querySelector("#start-button");
const resetButton = document.querySelector("#reset-button");
const turnDisplay = document.querySelector("#turn-display");
const infoDisplay = document.querySelector("#info-display");
const winnerDisplay = document.querySelector("#winner-display");
const yAxis = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let player;
let computer;
let dragging;
// let computerShipArray = [];
// let computerSubmarine;
// let computerCruiser;
// let computerBattleship;
// let computerCarrier;

// eventlisteners
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
  // Methods
  tableCreation() {
    for (let i = 1; i <= yAxis.length; i++) {
      let createRow = document.createElement("tr");
      this.tableDOM.appendChild(createRow);
      let createRowHeader = document.createElement("th");
      createRowHeader.textContent = i;
      createRow.appendChild(createRowHeader);
      for (let j = 1; j < 10; j++) {
        let createCell = document.createElement("td");
        createCell.classList.add(this.name);
        createCell.setAttribute("id", "x" + i + "y" + j);
        createRow.appendChild(createCell);
      }
    }
  }
  shipCreation() {
    for (let ship of this.ships) {
      let createShip = document.createElement("div");
      createShip.innerText = `${ship.name} ${ship.length}x`;
      createShip.setAttribute("id", ship.name);
      createShip.classList.add(
        ship.name,
        ship.name + "-placeholder",
        "horizontal"
      );
      this.shipDOM.appendChild(createShip);
      if (this.shipDOM === playerShip) {
        createShip.draggable = true;
        createShip.classList.add("draggable");
      }
    }
  }
  randomizeComShips() {
    this.ships.forEach(function (ship) {
      while (true) {
        // infinite loop choose two random points as a candidate for ship coords
        ranNumX();
        ranNumY();
        if (ranBoolean()) {
          if (ranY + ship.length - 1 <= 9) {
            if (this.setShip(ship, ranY, ranX, true)) {
              break;
            }
          }
        } else if (ranX + ship.length - 1 <= 9) {
          if (this.setShip(ship, ranY, ranX, false)) {
            break;
          }
        }
      }
    }, this);
  }
  setShip(ship, ranY, ranX, isHorizontal) {
    if (isHorizontal) {
      for (let i = ranY; i < ranY + ship.length; i++) {
        let cellId = "x" + ranX + "y" + i;
        const cell = this.tableDOM.querySelector("#" + cellId);
        if (cell.classList.contains("placed")) {
          return false;
        }
      }
      for (let i = ranY; i < ranY + ship.length; i++) {
        let cellId = "x" + ranX + "y" + i;
        const cell = this.tableDOM.querySelector("#" + cellId);
        cell.classList.add("placed");
        cell.classList.add(ship.name);
        ship.coord.push(cellId);
        if (this.name === "computer") {
          cell.classList.add("invisible");
        }
      }
    } else {
      for (let i = ranX; i < ranX + ship.length; i++) {
        let cellId = "x" + i + "y" + ranY;
        const cell = this.tableDOM.querySelector("#" + cellId);
        if (cell.classList.contains("placed")) {
          return false;
        }
      }
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
  checkValidPlayerCell(e) {
    const shipCells = [e.target.id];
    for (const ship of player.ships) {
      if (!dragging.classList.contains(ship.name)) {
        continue;
      }
      const isHorizontal = dragging.classList.contains("horizontal");
      const cellMatch = e.target.id.match(/x(\d+)y(\d+)/);
      const cellX = parseInt(cellMatch[1]);
      const cellY = parseInt(cellMatch[2]);
      if (player.setShip(ship, cellY, cellX, isHorizontal)) {
        dragging.draggable = false;
        dragging.hidden = true;
      }
    }
  }
  hitDetection(e) {
    let hp = 0;
    for (const ship of this.ships) {
      hp += ship.hitPoints;
      if (!e.classList.contains(ship.name)) {
        continue;
      }
      if (e.classList.contains(ship.name) && !e.classList.contains("hit")) {
        ship.hitPoints--;
        hp--;
        e.classList.add("hit");
      }
      if (ship.hitPoints === 0) {
        let newInfo = document.createElement("p");
        newInfo.innerText = this.name + " " + ship.name + " sunk";
        infoDisplay.appendChild(newInfo);
      }
    }
    let turn = document.querySelector("#turn-display>p");
    if (currentTurn === player) {
      currentTurn = computer;
      turn.innerText = currentTurn.name + "'s turn";
    } else {
      currentTurn = player;
      turn.innerText = currentTurn.name + "'s turn";
    }
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

draggableShips.forEach(function (ship) {
  ship.addEventListener("dragstart", dragStart);
});

playerCells.forEach(function (cell) {
  cell.addEventListener("dragover", dragOver);
  cell.addEventListener("drop", player.checkValidPlayerCell);
});

function dragStart(e) {
  dragging = e.target;
}
function dragOver(e) {
  e.preventDefault();
}

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

function ready() {
  let allPlaced = true;
  player.ships.forEach(function (ship) {
    if (ship.coord.length < 1) {
      allPlaced = false;
    }
  });
  return allPlaced;
}

let currentTurn = player;

function start() {
  if (ready()) {
    if (currentTurn === player) {
      computerTable.addEventListener("click", function (event) {
      if (
          event.target.tagName === "TD" &&
          !event.target.classList.contains("hit")
        ) {
          computer.hitDetection(event.target);
        }
      });
    } else if (currentTurn === computer) {
    }
  }
}

function gameOver(user) {
  let winner = document.createElement("p");
  winner.innerText = user.name.toUpperCase() + " is the WINNER!";
  winnerDisplay.appendChild(winner);
  console.log("game over");
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
