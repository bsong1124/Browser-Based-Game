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
let computerShipArray = [];
let computerSubmarine;
let computerCruiser;
let computerBattleship;
let computerCarrier;
// eventlisteners
startButton.addEventListener("click", start);
rotateButton.addEventListener("click", rotateShip);
computerTable.addEventListener("click", fireMissile);
playerTable.addEventListener("click", placePlayerShips);

// Example Class
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
      ship.coordinates;
      if (this.shipDOM === playerShip) {
        createShip.draggable = true;
        // console.log(this.name, createShip)
      }
    }
  }
  randomPlaceShips() {
    this.ships.forEach(function (ship) {
      const shipLength = ship.length;
      while (true) {
        // infinite loop choose two random points as a candidate for ship coords
        const ranX = Math.floor(Math.random() * 9) + 1;
        const ranY = Math.floor(Math.random() * 9) + 1;
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
      }
    }
    return true;
  }
}

init();

const computerShipDivs = document.querySelectorAll("#computer-ship>div");
const playerShipDivs = document.querySelectorAll("#player-ship>div");
// const computerCells = document.querySelectorAll("#computer > tr > td");
// const playerCells = document.querySelectorAll("#player > tr > td");

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

function init() {
  computer = new Player("Computer", computerTable, computerShip);
  computer.tableCreation();
  computer.shipCreation();
  player = new Player("Player", playerTable, playerShip);
  player.tableCreation();
  player.shipCreation();
  computer.randomPlaceShips();
}

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
function placePlayerShips() {}
console.log(player.ships[3].length);
