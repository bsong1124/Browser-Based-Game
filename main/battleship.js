console.log("js loaded");
// Global Variables
const computerTable = document.querySelector("#computer");
const playerTable = document.querySelector("#player");
const computerShip = document.querySelector("#computer-ship");
const playerShip = document.querySelector("#player-ship");
const rotateButton = document.querySelector("#rotate-button");
const startButton = document.querySelector("#start-button");
const resetButton = document.querySelector("#reset-button");
const yAxis = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let player;
let computer;
let dragging;
let currentTurn;
// let computerShipArray = [];
// let computerSubmarine;
// let computerCruiser;
// let computerBattleship;
// let computerCarrier;

// eventlisteners
startButton.addEventListener("click", start);
rotateButton.addEventListener("click", rotateShip);
resetButton.addEventListener('click', function(){
  location.reload()
})

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
      // console.log(ship.name)
    }
  }
  randomizeComShips() {
    this.ships.forEach(function (ship) {
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
        cell.classList.add(ship.name);
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
        cell.classList.add(ship.name);
        ship.coord.push(cellId);
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
  hitDetection(e){
    for(const ship of this.ships){
      if(!e.classList.contains(ship.name)){
        continue;
      }
      if(e.classList.contains(ship.name)){
        ship.hitPoints--;
        e.classList.add(`${this.name}-hit`)
        console.log(ship)
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

function readyOrNot() {
  let allPlaced = true;
  player.ships.forEach(function (ship) {
    if (ship.coord.length < 1) {
      allPlaced = false;
    }
  });
  return allPlaced
}

function start() {
  if(readyOrNot()){
    // player.hitDetection()
    computerTable.addEventListener('click', function(event){
      if(event.target.tagName === 'TD'){
        computer.hitDetection(event.target)
      }
    })
  }
}

// function fireMissile(e) {
//   if
// }

function ranBoolean() {
  return Math.random() < 0.5;
}

