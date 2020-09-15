// findAvailableCell
export const availableCell= () => {
  do {
    cell = Math.floor(Math.random() * 100);
  } while (cell in arr);

  return cell;
}

// check if weapon in the player position
export const searchWeapon=(searchWeaponFrom, searchWeaponTo)=> {
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