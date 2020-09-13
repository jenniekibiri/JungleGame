// attack and fight buttons
const player1AttackBtn = $('#player1AttackBtn');
const player1DefendBtn = $('#player1DefendBtn');
const player2AttackBtn = $('#player2AttackBtn');
const player2DefendBtn = $('#player2DefendBtn');

// enable fight function
function fightEnabled() {
  if (activePlayer === player1) {
    player1AttackBtn.removeAttr('disabled');
    player1DefendBtn.removeAttr('disabled');
    player2AttackBtn.attr('disabled', 'true');
    player2DefendBtn.attr('disabled', 'true');
  } else {
    player2AttackBtn.removeAttr('disabled');
    player2DefendBtn.removeAttr('disabled');
    player1AttackBtn.attr('disabled', 'true');
    player1DefendBtn.attr('disabled', 'true');
  }
}
// defend function
function defend() {
  activePlayer.defend = true;
  passivePlayer.activatePlayer();
  fightEnabled();
}
// attack function
function attack() {
  activePlayer.defend = false;

  if (passivePlayer.defend === true) {
    passivePlayer.lifePoints -= activePlayer.damage / 2;
  } else {
    passivePlayer.lifePoints -= activePlayer.damage;
  }
  if (passivePlayer.lifePoints < 0) {
    passivePlayer.lifePoints = 0;
  }
  $(`#${passivePlayer.name}lifePoints`).text(passivePlayer.lifePoints);
  if (passivePlayer.lifePoints === 0) {
    if (activePlayer.name === 'player1') {
      activePlayer.name = 'Player1';
    } else {
      activePlayer.name = 'Player2';
    }
    $('#exampleModal2 .modal-body h3:nth-child(3)').text(activePlayer.name);
    $('#winner').attr('src', `./image/${activePlayer.image}`);
    $('#exampleModal2').modal('show');
  } else {
    passivePlayer.activatePlayer();
    fightEnabled();
  }
}
