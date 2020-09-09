//variables
const map = document.getElementById('map')
var cell;
var fight = false;
var arr = [];
var rangeX = [],
  rangeY = []
var activePlayer, passivePlayer;
var adjacentCells;
//create the game map
function createMap(numberCells) {
  for (i = 0; i < numberCells; i++) {
    gridCells = document.createElement('div');
    gridCells.id = i;
    gridCells.classList.add('grid');
    map.appendChild(gridCells);
  }
}
createMap(100);
//weapon object 
function weapons(name, image, damage) {
  this.name = name;
  this.image = image;
  this.damage = damage;
}
//set weapons on the the grid
weapons.prototype.setWeaponposition = function () {
  cell = availableCell();
  arr[cell] = this.name;
  const weaponBox = document.getElementById(cell);
  weaponBox.classList.add(this.name);
};
//player object
function player(name, image) {
  this.name = name;
  this.image = image;
}
//position the players on the grid
player.prototype.setPlayerPosition = function () {
  cell = availableCell();
  arr[cell] = this.name;
  const playerBox = document.getElementById(cell);
  playerBox.classList.add(this.name);
  playerBox.innerHTML = '<img src="./image/' + this.image + '" height="58"></img>';
  //players should not be adjacent
  var adjacents = [cell - 1, cell - 10, cell + 1, cell + 10];
  // fill adjacent cells to the player with with values to indicate not empty
  // This disallows the cells from being occupied by a another player
  adjacents.forEach((adjacent) => {
    if (adjacent >= 0 && adjacent < 100 && !(adjacent in arr))
      arr[adjacent] = 'full';

  });
  return this.position = cell
};

//create objec function
function obstacles(name, image) {
  this.name = name;
  this.image = image;
}
//set obstacles on the grid
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

  $("div#map > div").removeClass('range');
  rangeX = []
  rangeY = []
  let width = 10
  let up = playerPosition - 10
  let down = playerPosition + 10
  let right = playerPosition + 1
  let left = playerPosition - 1
  let blocked = false
  let xMin = playerPosition - playerPosition % width;
  let xMax = xMin + 9

  while (up >= 0 && up >= playerPosition - 30) {
    blocked = false;
    const ranges = $("div#" + up).attr('class').split(/\s+/);
    ranges.forEach((item) => {
      if (item === 'obstacle' || item === 'player1' || item === 'player2') {
        blocked = true;
      }
    })

    if (blocked === true) {
      break;
    } else {
      $("div#" + up).addClass('range');
      rangeY.push(up);
    }
    up = up - 10;
  }

  while (down <= 99 && down <= playerPosition + 30) {
    blocked = false;
    const ranges = $("div#" + down).attr('class').split(/\s+/);
    ranges.forEach((item) => {
      if (item === 'obstacle' || item === 'player1' || item === 'player2') {
        blocked = true;
      }
    })

    if (blocked === true) {
      break;
    } else {
      $("div#" + down).addClass('range');
      rangeY.push(down);
    }
    down = down + 10;
  }
  while (left >= xMin && left >= playerPosition - 3) {
    blocked = false;
    const ranges = $("div#" + left).attr('class').split(/\s+/);
    ranges.forEach((item) => {
      if (item === 'obstacle' || item === 'player1' || item === 'player2') {
        blocked = true;
      }
    })

    if (blocked === true) {
      break;
    } else {
      $("div#" + left).addClass('range');
      rangeX.push(left);
    }
    left = left - 1;
  }
  while (right <= xMax && right <= playerPosition + 3) {
    blocked = false;
    const ranges = $("div#" + right).attr('class').split(/\s+/);
    ranges.forEach((item) => {
      if (item === 'obstacle' || item === 'player1' || item === 'player2') {
        blocked = true;
      }
    })

    if (blocked === true) {
      break;
    } else {
      $("div#" + right).addClass('range');
      rangeX.push(right);
    }
    right = right + 1;
  }
  return [rangeX, rangeY];
}

// active player
player.prototype.activatePlayer = function () {

  if (this.name === 'player1') {
    activePlayer = player1;
    passivePlayer = player2;
  } else {
    activePlayer = player2;
    passivePlayer = player1;
  }

  if (fight === false) {
    activePlayer.setMovementRange(this.position);
  }
}
//player movement
player.prototype.movement = function (targetPosition) {
  //get new player position
  targetPosition = parseInt(targetPosition);

  //arr change will remove the previous player position   
  arr.splice(this.position, 1);
  rangeX.splice(this.position, 1)
  rangeY.splice(this.position, 1)
  rangeX.splice(targetPosition, 1)
  rangeY.splice(targetPosition, 1)

  if (targetPosition == this.position) {
    return arr[targetPosition] = 'full'
  } else {
    arr[targetPosition] = this.name;
  }
  //change player position
  var oldPosition = document.getElementById(this.position);
  oldPosition.classList.remove(this.image, this.name);
  var newPosition = document.getElementById(targetPosition)
  newPosition.classList.add(this.name);
  var searchWeaponFrom=this.position;
  var searchWeaponTo=targetPosition
  searchWeapon(searchWeaponFrom,searchWeaponTo)
  this.position = targetPosition;

  adjacentCells = [targetPosition - 1, targetPosition + 1, targetPosition - 10, targetPosition + 10];

  switch (this.name) {
    case 'player1':
      newPosition.innerHTML = '<img src="./image/' + this.image + '" height="58"></img>';

      break;
    case 'player2':
      newPosition.innerHTML = '<img src="./image/' + this.image + '" height="58"></img>';
      break;
  }

  oldPosition.innerHTML = "";

  $.each(adjacentCells, function (index, adjacent) {
    if ($("#" + adjacent).find('img').length) {
      fight = true
      fightEnabled()
     
    }
  });

  if (fight === false) {
    passivePlayer.activatePlayer();
  } else {
    //fight  
    rangeX = [];
    rangeY = [];
    $("div#map > div").removeClass('range');
    // fightButtonEnabling();
  }

}
player1.activatePlayer()
var box = $("div#map> div");
box.hover(function () {
  var targetPosition = parseInt(this.id);
  if (jQuery.inArray(parseInt(this.id), rangeX) >= 0 || jQuery.inArray(parseInt(this.id), rangeY) >= 0) {
    $(this).addClass(window.activePlayer.name + 'Moving');
  } //hover method has two functions mouse leave and mouse enter

}, function () {
  $(this).removeClass(window.activePlayer.name + 'Moving');
});
// onclick the player moves 
box.on("click", function () {
  var targetPosition = parseInt(this.id);
  if (jQuery.inArray(targetPosition, rangeX) >= 0 || jQuery.inArray(targetPosition, rangeY) >= 0) {
    box.removeClass(window.activePlayer.name + 'Moving');
    activePlayer.movement(targetPosition);

  }
});

//check if weapon in the player position
function searchWeapon(searchWeaponFrom,searchWeaponTo){
  var searchDiff = searchWeaponTo-searchWeaponFrom
  var movedToBoxes=[]
  if(searchDiff>0){
if(searchDiff<=3){
  for(var i=searchWeaponFrom; i<=searchWeaponTo; i++){
if(jQuery.inArray(i,rangeX)>=0){
  movedToBoxes.push(i)
  console.log(movedToBoxes)
}
  }
}else{
  for(var i=searchWeaponFrom; i<=searchWeaponTo; i+=10){
if(jQuery.inArray(i,rangeY)>=0){
  movedToBoxes.push(i)
console.log(movedToBoxes)
}
  }  

}
  }else{
    if(searchDiff >= -3){
  for( var i=searchWeaponFrom; i>=searchWeaponTo; i--){
if(jQuery.inArray(i,rangeX)>=0){
  movedToBoxes.push(i)
  
}
  }
}else{
    for(var i=searchWeaponFrom; i>=searchWeaponTo; i-=10){
if(jQuery.inArray(i,rangeY)>=0){
  movedToBoxes.push(i)
}
  }
}

  }
for(var i=0; i<=movedToBoxes.length; i++){
  movedToBox=$("div#"+movedToBoxes[i])
  console.log(movedToBox)
  oldWeapon = activePlayer.weapons

  if(movedToBox.hasClass('sword')){
    newWeapon = 'sword';
    activePlayer.damage=20;
  }else if (movedToBox.hasClass("dagger")){
      newWeapon = 'dagger';
      activePlayer.damage = 12;
    }else if (movedToBox.hasClass("bow")){
      newWeapon = 'bow';
      activePlayer.damage = 10;
    }else if (movedToBox.hasClass("gun")){
      newWeapon = 'gun';
      activePlayer.damage = 15;
    }else{
      newWeapon =''
    }
        if (newWeapon!=''){
      
      movedToBox.removeClass(newWeapon);
      movedToBox.addClass(oldWeapon);
      activePlayer.weapons = newWeapon;
            $("#"+activePlayer.name+"weapons").removeClass(activePlayer.weapons)
       $("#"+activePlayer.name+"sword").removeClass('sword');
      $("#"+activePlayer.name+"dagger").removeClass('dagger');
      $("#"+activePlayer.name+"bow").removeClass('bow');
      $("#"+activePlayer.name+"gun").removeClass('gun');
      $("#"+activePlayer.name+newWeapon).removeClass(newWeapon);
      $("#"+activePlayer.name+newWeapon).addClass(newWeapon);
      $("#"+activePlayer.name+"damage").text(activePlayer.damage);
       // $("#"+activePlayer.name+"weapons").text(activePlayer.weapons);
         $("#"+activePlayer.name+"weapons").addClass(activePlayer.weapons)
        
        }

}

}
function fightEnabled(){
  alert('hello')
}