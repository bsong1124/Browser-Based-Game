console.log("js loaded");
// Global Variables
const computerTable = document.querySelector("#computer-table > table");
const playerTable = document.querySelector("#player-table > table");
const computerShip = document.querySelector("#computer-ship");
const playerShip = document.querySelector("#player-ship");
const rotateButton = document.querySelector("#rotate-button");
const startButton = document.querySelector("#start-button");
const resetButton = document.querySelector("#reset-button");
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
computerTable.addEventListener("click", fireMissile);
// playerTable.addEventListener("click", player.placePlayerShips);

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
      createShip.innerText = `${ship.length}x`;
      createShip.setAttribute("id", ship.name);
      createShip.classList.add(ship.name, "horizontal");
      this.shipDOM.appendChild(createShip);
      if (this.shipDOM === playerShip) {
        createShip.draggable = true;
        createShip.classList.add("draggable");
      }
      // console.log(ship.name)
    }
  }
  randomCellCheck() {
    this.ships.forEach(function (ship) {
      while (true) {
        // infinite loop choose two random points as a candidate for ship coords
        const ranX = Math.floor(Math.random() * 9) + 1;
        const ranY = Math.floor(Math.random() * 9) + 1;
        if (ranBoolean()) {
          if (ranY + ship.length - 1 <= 9) {
            if (this.randomSetShip(ship, ranY, ranX, true)) {
              break;
            }
          }
        } else if (ranX + ship.length - 1 <= 9) {
          if (this.randomSetShip(ship, ranY, ranX, false)) {
            break;
          }
        }
      }
    }, this);
  }
  randomSetShip(ship, ranY, ranX, isHorizontal) {
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
        ship.coord.push(cellId);
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
        ship.coord.push(cellId);
      }
    }
    return true;
  }
  placePlayerShips(e) {
    const shipCells = [e.target.id];
    for (const ship of player.ships) {
      if (
        dragging.classList.contains("horizontal") &&
        dragging.classList.contains(ship.name)
      ) {
        const cellMatch = e.target.id.match(/(x\d+)y(\d+)/);
        if (parseInt(cellMatch[2]) <= 9 - (ship.length - 1)) {
          for (let i = 1; i < ship.length; i++) {
            const cellX = cellMatch[1];
            const cellY = parseInt(cellMatch[2]) + i;
            const addShipCells = cellX + "y" + cellY;
            shipCells.push(addShipCells);
          }
        }
        console.log(shipCells);
      } else if (dragging.classList.contains(ship.name)) {
        const shipCells = [e.target.id];
        const cellMatch = e.target.id.match(/x(\d+)(y\d+)/);
        if (parseInt(cellMatch[1]) <= 9 - (ship.length - 1))
          for (let i = 1; i < ship.length; i++) {
            const cellX = parseInt(cellMatch[1]) + i;
            const cellY = cellMatch[2];
            const addShipCells = "x" + cellX + cellY;
            shipCells.push(addShipCells);
          }
          console.log(shipCells);
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
  // drag.addEventListener("dragend", placePlayerShips);
});

playerCells.forEach(function (cell) {
  cell.addEventListener("dragover", dragOver);
  cell.addEventListener("drop", player.placePlayerShips);
});

function dragStart(e) {
  dragging = e.target;
  console.log(dragging);
}
function dragOver(e) {
  e.preventDefault();
}
// function placePlayerShips(e) {
//   console.log(e.target.id)
// }

function init() {
  computer = new Player("Computer", computerTable, computerShip);
  computer.tableCreation();
  computer.shipCreation();
  player = new Player("Player", playerTable, playerShip);
  player.tableCreation();
  player.shipCreation();
  computer.randomCellCheck();
}
// console.log(computer.ships[0].coord);

function start() {}

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

function ranBoolean() {
  return Math.random() < 0.5;
}

function fireMissile() {}
// console.log(player.ships[3].length);

// const computerCells = document.querySelectorAll("#computer > tr > td");

// for (let ship of computerShipDivs) {
//   if (ship.classList.contains("submarine")) {
//     computerSubmarine = ship;
//     computerShipArray.push(computerSubmarine);
//   } else if (ship.classList.contains("cruiser")) {
//     computerCruiser = ship;
//     computerShipArray.push(computerCruiser);
//   } else if (ship.classList.contains("battleship")) {
//     computerBattleship = ship;
//     computerShipArray.push(computerBattleship);
//   } else if (ship.classList.contains("carrier")) {
//     computerCarrier = ship;
//     computerShipArray.push(computerCarrier);
//   }
// }
