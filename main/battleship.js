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
let horizontal = true;
let vertical = false;
let player;
let computer;
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
      { name: "submarine", length: 3, hitPoints: 3 },
      { name: "cruiser", length: 3, hitPoints: 3 },
      { name: "battleship", length: 4, hitPoints: 4 },
      { name: "carrier", length: 5, hitPoints: 5 },
    ];
  }
  // Methods
  tableCreation() {
    let numId = 1
    for (let i = 1; i <= yAxis.length; i++) {
      let createRow = document.createElement("tr");
      this.tableDOM.appendChild(createRow);
      let createRowHeader = document.createElement("th");
      createRowHeader.textContent = i;
      createRow.appendChild(createRowHeader);
      for (let j = 1; j < 10; j++) {
        let createCell = document.createElement("td");
        createCell.classList.add(this.name);
        createCell.setAttribute("id", numId);
        createRow.appendChild(createCell);
        numId++
      }
    }
  }
  shipCreation() {
    for (let ship of this.ships) {
      let createShip = document.createElement("div");
      createShip.setAttribute("id", ship.name);
      createShip.classList.add(ship.name, "horizontal");
      this.shipDOM.appendChild(createShip);
      if (this.shipDOM === playerShip) {
        createShip.draggable = true;
      }
    }
  }
}
// console.log(this.name, createShip)

init();

function init() {
  computer = new Player("Computer", computerTable, computerShip);
  computer.tableCreation();
  computer.shipCreation();
  player = new Player("Player", playerTable, playerShip);
  player.tableCreation();
  player.shipCreation();
}

function start() {}

const playerShipDivs = document.querySelectorAll("#player-ship>div");
const computerShipDivs = document.querySelectorAll("#computer-ship>div");
console.log(computerShipDivs);
console.log(playerShipDivs);

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

function randomRotateShip() {
  computerShipDivs.forEach(function (shipDiv) {
    if (ranBoolean()) {
      shipDiv.style.transform = "rotate(90deg)";
    } else {
      shipDiv.style.transform = "rotate(0deg)";
    }
  });
}

function randomPlaceComputerShip() {
  randomRotateShip();
  let randomCell = Math.floor();
}

function ranBoolean() {
  return Math.random() < 0.5;
}

function fireMissile() {}
function placePlayerShips() {}
console.log(ranBoolean);
