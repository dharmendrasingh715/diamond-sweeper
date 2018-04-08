'use strict';
var container = document.getElementById('container');
Game.init(container);

document.getElementById('controls').onclick = function (event) {
    var target = event.target;
    if (target.className === 'button -blue new-game') {
        Game.init(container);
    }

    if (target.className === 'button -blue new-game hints') {
        Game.init(container, true);
    }

    if (target.className === 'button -blue save-game') {
        Game.saveGame();
    }

    if (target.className === 'button -blue load-game') {
        var gameData = JSON.parse(localStorage.getItem('gameStats'));
        Game.init(container, true, gameData.diamondPositions, gameData.diamondFoundPositions, gameData.openEmptyPositions);
    }
};