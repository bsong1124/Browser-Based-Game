console.log("js loaded");
// Global Variables
const yAxis = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const computerTable = document.querySelector("#computer-table > table");
const playerTable = document.querySelector("#player-table > table");
const computerShip = document.querySelector("#computer-ship");
const playerShip = document.querySelector("#player-ship");
let player;
let computer;

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
    for (let i = 1; i <= yAxis.length; i++) {
      let createRow = document.createElement("tr");
      this.tableDOM.appendChild(createRow);
      let createRowHeader = document.createElement("th");
      createRowHeader.textContent = i;
      createRow.appendChild(createRowHeader);
      for (let j = 0; j < 9; j++) {
        let createCell = document.createElement("td");
        createRow.appendChild(createCell);
      }
    }
  }
  shipCreation() {
    for (let ship of this.ships) {
      let createShip = document.createElement("div");
      createShip.setAttribute("id", ship.name);
      createShip.classList.add(ship.name);
      createShip.draggable = true;
      this.shipDOM.appendChild(createShip);
      // console.log(this.name, createShip)
    }
  }
}

init();

function init() {
  computer = new Player("Computer", computerTable, computerShip);
  computer.tableCreation();
  computer.shipCreation();
  player = new Player("Player", playerTable, playerShip);
  player.tableCreation();
  player.shipCreation();
}
function rotateShip(){
  
}
