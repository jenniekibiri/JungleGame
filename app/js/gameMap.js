// variables
const map = document.getElementById('map');
let cell;
const fight = false;
const arr = [];
const rangeX = [];
const rangeY = [];
let activePlayer;
let passivePlayer;
let adjacentCells;

// create the game map
function createMap(numberCells) {
  for (let i = 0; i < numberCells; i++) {
    const gridCells = document.createElement('div');
    gridCells.id = i;
    gridCells.classList.add('grid');
    map.appendChild(gridCells);
  }
}
createMap(100);
