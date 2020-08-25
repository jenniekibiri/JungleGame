//variables
const map = document.getElementById('map');
var cell;
var fight;
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
  var adjacents = [cell - 1, cell - 10, cell + 1, cell + 10];
  // fill adjacent cells to the player with with values to indicate not empty
  // This disallows the cells from being occupied by a another player
  adjacents.forEach((adjacent) => {
    if (adjacent >= 0 && adjacent < 100 && arr[adjacent] == null)
      arr[adjacent] = 'full';
 
  });

  return this.position =cell
};
// if the cell is between zero and 1oo -and  the cell is null ....it will make that cell full
// what makes that cell null?

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
//movements
player.prototype.setMovementRange = function (playerPosition) {
  $("section#map > div").removeClass('range');
  rangeX = [];
  rangeY = []
  let width = 10
  let up = playerPosition - 10
  let down = playerPosition + 10
  let right = playerPosition + 1
  let left = playerPosition - 1
  let blocked = false
  let xMin = playerPosition - playerPosition % width;
  let xMax = xMin + 9

  while (up >= 0 && up >= p -30) {
    blocked = false;
    const ranges = document.getElementById(up).attr('class').split(/\s+/)
    ranges.forEach((rangeItem) => {
     if (rangeItem === 'block' || rangeItem === 'player1' ||rangeItem=== 'player2') {
        blocked = true;
      }
       })

      if (blocked === true) {
      break;
    }
     else {
       document.getElementById(up).classList.add('range')
      rY.push(up);
    }
    up = up - 10;   
  }
     
    while (down <=99  && down <= p +30) {
    blocked = false;
    const ranges = document.getElementById(down).attr('class').split(/\s+/)
    ranges.forEach((rangeItem) => {
     if (rangeItem === 'block' || rangeItem === 'player1' ||rangeItem=== 'player2') {
        blocked = true;
      }
       })

      if (blocked === true) {
      break;
    }
     else {
       document.getElementById(down).classList.add('range')
      rY.push(down);
    }
    down= down + 10;   
  }
    while (left >= xmin && left >= p -3) {
    blocked = false;
    const ranges = document.getElementById(left).attr('class').split(/\s+/)
    ranges.forEach((rangeItem) => {
     if (rangeItem === 'block' || rangeItem === 'player1' ||rangeItem=== 'player2') {
        blocked = true;
      }
       })

      if (blocked === true) {
      break;
    }
     else {
       document.getElementById(left).classList.add('range')
      rY.push(left);
    }
    left =left - 1;   
  } 
  while (right <= xMax && right <= p+3) {
    blocked = false;
    const ranges = document.getElementById(right).attr('class').split(/\s+/)
    ranges.forEach((rangeItem) => {
     if (rangeItem === 'block' || rangeItem === 'player1' ||rangeItem=== 'player2') {
        blocked = true;
      }
       })

      if (blocked === true) {
      break;
    }
     else {
       document.getElementById(up).classList.add('range')
      rY.push(right);
    }
    right = right+1;   
  }
}





//active player
player.prototype.activePlayer = function () {
  if (this.name === 'player1') {
    activePlayer = player1;
    passivePlayer = player2;
  } else {
    activePlayer = player2;
    passivePlayer = player1;

  }
 if (fight === false) {
    activePlayer.setRange(this.position);
  }
}

