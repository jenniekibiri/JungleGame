import Player from '../player.js';

// instantiate players
const player1 = new Player('player1', 'merida.png');
const player2 = new Player('player2', 'zelda.png');


player1.setPlayerPosition();
player2.setPlayerPosition();
player1.activatePlayer();

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