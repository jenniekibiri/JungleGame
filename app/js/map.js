//variables
const map = document.getElementById('map');
var cell;
var arr = [];

function createMap(numberCells) {
  for (i = 0; i < numberCells; i++) {
    gridCells = document.createElement('div');
    gridCells.id = i;
    gridCells.classList.add('grid');
    map.appendChild(gridCells);
  }
}
createMap(100);

function weapons(name, image, damage) {
  this.name = name;
  this.image = image;
  this.damage = damage;
}

weapons.prototype.setWeaponposition = function () {
  cell = availableCell();
  arr[cell] = this.name;
  const weaponBox = document.getElementById(cell);
  weaponBox.classList.add(this.name);
};

function player(name, image) {
  this.name = name;
  this.image = image;
}
//position the players
player.prototype.setPlayerPosition = function () {
  cell = availableCell();
  arr[cell] = this.name;
  const playerBox = document.getElementById(cell);
  playerBox.classList.add(this.name);
  //players should not be adjacent
  var contacts = [cell - 1, cell - 10, cell + 1, cell + 10];

  contacts.forEach((contact, i) => {
    if (contact >= 0 && contact < 100 && arr[contact] == null)
      arr[contact] = 'full';
  });
  return (this.position = cell);
};

function obstacles(name, image) {
  this.name = name;
  this.image = image;
}
obstacles.prototype.setObstaclePosition = function () {
  for (i = 0; i < 10; i++) {
    cell = availableCell();
    arr[cell] = this.name;
    const obstacleBox = document.getElementById(cell);
    obstacleBox.classList.add(this.name);
  }
};

//instantiate obstacles
const obstacle = new obstacles('obstacle', 'obstacle.png');
//instantiate players
const player1 = new player('player1', 'player1.png');
const player2 = new player('player2', 'player2.png');

//instantiate the objects
const sword = new weapons('sword', 'sword.png', 20);
const dagger = new weapons('dagger', 'dagger.png', 12);
const gun = new weapons('gun', 'gun.png', 15);
const bow = new weapons('bow', 'bow.png', 10);

sword.setWeaponposition();
dagger.setWeaponposition();
gun.setWeaponposition();
bow.setWeaponposition();
player1.setPlayerPosition();
player2.setPlayerPosition();
obstacle.setObstaclePosition();

//findAvailableCell
function availableCell() {
  do {
    cell = Math.floor(Math.random() * 100);
  } while (cell in arr);
  return cell;
}
