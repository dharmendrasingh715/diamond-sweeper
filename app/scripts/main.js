var container = document.getElementById("container");
Game.init(document.getElementById("container"));

document.getElementById('controls').onclick = function (event) {
    var target = event.target;
    if (target.className == 'new-game') {
        Game.init(document.getElementById("container"));
    }

    if (target.className == 'new-game hints') {
        Game.init(document.getElementById("container"), true);
    }

    if (target.className == 'save-game') {
        Game.saveGame();
    }

    if (target.className == 'load-game') {
        var gameData = JSON.parse(localStorage.getItem('gameStats'));
        Game.init(document.getElementById("container"), true, gameData.diamondPositions, gameData.diamondFoundPositions, gameData.openEmptyPositions);
    }
}