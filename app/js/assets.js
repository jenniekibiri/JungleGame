// weapon class
class Weapons {
  constructor(name, image, damage) {
    this.name = name;
    this.image = image;
    this.damage = damage;
  }

  // set weapons on the the grid
  setWeaponposition() {
    cell = availableCell();
    arr[cell] = this.name;
    const weaponBox = document.getElementById(cell);
    weaponBox.classList.add(this.name);
  }
}

// player class
class Player {
  constructor(name, image) {
    this.name = name;
    this.image = image;
    this.lifePoints = 100;
    this.damage = 10;
  }

  // place the player on the grid method
  setPlayerPosition() {
    cell = availableCell();
    arr[cell] = this.name;
    const playerBox = document.getElementById(cell);
    playerBox.classList.add(this.name);
    playerBox.innerHTML = `<img src="./image/${this.image}" height="58"></img>`;
    // players should not be adjacent
    const adjacents = [cell - 1, cell - 10, cell + 1, cell + 10];
    // fill adjacent cells to the player with with values to indicate not empty
    // This disallows the cells from being occupied by a another player
    adjacents.forEach((adjacent) => {
      if (adjacent >= 0 && adjacent < 100 && !(adjacent in arr)) arr[adjacent] = 'full';
    });
    return this.position = cell;
  }

  // create valid movement range
  setMovementRange(playerPosition) {
    $('div#map > div').removeClass('range');

    rangeX = [];
    rangeY = [];
    const width = 10;
    let up = playerPosition - 10;
    let down = playerPosition + 10;
    let right = playerPosition + 1;
    let left = playerPosition - 1;
    let blocked = false;
    const xMin = playerPosition - playerPosition % width;
    const xMax = xMin + 9;

    while (up >= 0 && up >= playerPosition - 30) {
      blocked = false;
      const ranges = $(`div#${up}`).attr('class').split(/\s+/);
      ranges.forEach((item) => {
        if (item === 'obstacle' || item === 'player1' || item === 'player2') {
          blocked = true;
        }
      });

      if (blocked === true) {
        break;
      } else {
        $(`div#${up}`).addClass('range');
        rangeY.push(up);
      }
      up -= 10;
    }

    while (down <= 99 && down <= playerPosition + 30) {
      blocked = false;
      const ranges = $(`div#${down}`).attr('class').split(/\s+/);
      ranges.forEach((item) => {
        if (item === 'obstacle' || item === 'player1' || item === 'player2') {
          blocked = true;
        }
      });

      if (blocked === true) {
        break;
      } else {
        $(`div#${down}`).addClass('range');
        rangeY.push(down);
      }
      down += 10;
    }
    while (left >= xMin && left >= playerPosition - 3) {
      blocked = false;
      const ranges = $(`div#${left}`).attr('class').split(/\s+/);
      ranges.forEach((item) => {
        if (item === 'obstacle' || item === 'player1' || item === 'player2') {
          blocked = true;
        }
      });

      if (blocked === true) {
        break;
      } else {
        $(`div#${left}`).addClass('range');
        rangeX.push(left);
      }
      left -= 1;
    }
    while (right <= xMax && right <= playerPosition + 3) {
      blocked = false;
      const ranges = $(`div#${right}`).attr('class').split(/\s+/);
      ranges.forEach((item) => {
        if (item === 'obstacle' || item === 'player1' || item === 'player2') {
          blocked = true;
        }
      });

      if (blocked === true) {
        break;
      } else {
        $(`div#${right}`).addClass('range');
        rangeX.push(right);
      }
      right += 1;
    }
    return [rangeX, rangeY];
  }

  // activate  player
  activatePlayer() {
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

  // player movement method
  movement(targetPosition) {
    // get new player position
    targetPosition = parseInt(targetPosition);

    //remove the previous player position
    arr.splice(this.position, 1);
    rangeX.splice(this.position, 1);
    rangeY.splice(this.position, 1);
    rangeX.splice(targetPosition, 1);
    rangeY.splice(targetPosition, 1);

    if (targetPosition == this.position) {
      return arr[targetPosition] = 'full';
    }
    arr[targetPosition] = this.name;

    // change player position
    const oldPosition = document.getElementById(this.position);
    oldPosition.classList.remove(this.image, this.name);
    const newPosition = document.getElementById(targetPosition);
    newPosition.classList.add(this.name);
    const searchWeaponFrom = this.position;
    const searchWeaponTo = targetPosition;
    //search weapons 
    searchWeapon(searchWeaponFrom, searchWeaponTo);

    this.position = targetPosition;
    adjacentCells = [targetPosition - 1, targetPosition + 1, targetPosition - 10, targetPosition + 10];

    switch (this.name) {
      case 'player1':
        newPosition.innerHTML = `<img src="./image/${this.image}" height="58"></img>`;

        break;
      case 'player2':
        newPosition.innerHTML = `<img src="./image/${this.image}" height="58"></img>`;
        break;
    }

    oldPosition.innerHTML = '';

    $.each(adjacentCells, (index, adjacent) => {
      if ($(`#${adjacent}`).find('img').length) {
        fight = true;
        fightEnabled();
      }
    });

    if (fight === false) {
      passivePlayer.activatePlayer();
    } else {
    // fight
      rangeX = [];
      rangeY = [];
      $('div#map > div').removeClass('range');
      fightEnabled();
    }
  }
}

//

// create object class
class Obstacles {
  constructor(name, image) {
    this.name = name;
    this.image = image;
  }

  // set obstacles on the grid
  setObstaclePosition() {
    for (i = 0; i < 10; i++) {
      cell = availableCell();
      arr[cell] = this.name;
      const obstacleBox = document.getElementById(cell);
      obstacleBox.classList.add(this.name);
    }
  }
}

// instantiate obstacles
const obstacle = new Obstacles('obstacle', 'obstacle.png');
// instantiate players
const player1 = new Player('player1', 'merida.png');
const player2 = new Player('player2', 'zelda.png');
// instantiate the objects
const sword = new Weapons('sword', 'sword.png', 18);
const gun = new Weapons('gun', 'gun.png', 15);
const bow = new Weapons('bow', 'bow.png', 14);
const dagger = new Weapons('dagger', 'dagger.png', 12);
// call the position method
sword.setWeaponposition();
dagger.setWeaponposition();
gun.setWeaponposition();
bow.setWeaponposition();
player1.setPlayerPosition();
player2.setPlayerPosition();
obstacle.setObstaclePosition();
player1.activatePlayer();

// findAvailableCell
function availableCell() {
  do {
    cell = Math.floor(Math.random() * 100);
  } while (cell in arr);

  return cell;
}

// On mouse hover show player image moving over to the hovered over box
const box = $('div#map> div');
box.hover(function () {
  const targetPosition = parseInt(this.id);
  if (jQuery.inArray(parseInt(this.id), rangeX) >= 0 || jQuery.inArray(parseInt(this.id), rangeY) >= 0) {
    $(this).addClass(`${window.activePlayer.name}Moving`);
  } // hover method has two functions mouse leave and mouse enter
}, function () {
  $(this).removeClass(`${window.activePlayer.name}Moving`);
});

// onclick the player moves to the clicked box
box.on('click', function () {
  const targetPosition = parseInt(this.id);
  if (jQuery.inArray(targetPosition, rangeX) >= 0 || jQuery.inArray(targetPosition, rangeY) >= 0) {
    box.removeClass(`${window.activePlayer.name}Moving`);
    activePlayer.movement(targetPosition);
  }
});

// check if weapon in the player position
function searchWeapon(searchWeaponFrom, searchWeaponTo) {
  const searchDiff = searchWeaponTo - searchWeaponFrom;
  const movedToBoxes = [];
  if (searchDiff > 0) {
    if (searchDiff <= 3) {
      for (var i = searchWeaponFrom; i <= searchWeaponTo; i++) {
        if (jQuery.inArray(i, rangeX) >= 0) {
          movedToBoxes.push(i);

        }
      }
    } else {
      for (var i = searchWeaponFrom; i <= searchWeaponTo; i += 10) {
        if (jQuery.inArray(i, rangeY) >= 0) {
          movedToBoxes.push(i);

        }
      }
    }
  } else if (searchDiff >= -3) {
    for (var i = searchWeaponFrom; i >= searchWeaponTo; i--) {
      if (jQuery.inArray(i, rangeX) >= 0) {
        movedToBoxes.push(i);
      }
    }
  } else {
    for (var i = searchWeaponFrom; i >= searchWeaponTo; i -= 10) {
      if (jQuery.inArray(i, rangeY) >= 0) {
        movedToBoxes.push(i);
      }
    }
  }
  for (var i = 0; i <= movedToBoxes.length; i++) {
    movedToBox = $(`div#${movedToBoxes[i]}`);

    oldWeapon = activePlayer.Weapons;

    if (movedToBox.hasClass('sword')) {
      newWeapon = 'sword';
      activePlayer.damage = 18;
    } else if (movedToBox.hasClass('dagger')) {
      newWeapon = 'dagger';
      activePlayer.damage = 12;
    } else if (movedToBox.hasClass('bow')) {
      newWeapon = 'bow';
      activePlayer.damage = 14;
    } else if (movedToBox.hasClass('gun')) {
      newWeapon = 'gun';
      activePlayer.damage = 15;
    } else {
      newWeapon = '';
    }
    if (newWeapon != '') {
      //remove old weapons and add newly picked
      movedToBox.removeClass(newWeapon);
      movedToBox.addClass(oldWeapon);
      activePlayer.Weapons = newWeapon;

      $(`#${activePlayer.name}damage`).text(activePlayer.damage);
      $(`#${activePlayer.name}weapons`).text(activePlayer.Weapons);
    }
  }
}
