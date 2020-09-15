// variables
const map = document.getElementById('map');

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
