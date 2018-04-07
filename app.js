var Game = function() {

    var cells = container.getElementsByClassName('cell');
    var cellsArray = Array.from(cells);
    var messageBoard = container.getElementsByClassName('messages')[0];
    var diamondPositions,openEmptyPositions,diamondFoundPositions,hints;
    var gameStorage = window.localStorage;

    function init(container, hint, diamonds, diamondsFound, emptyPositions,) {
        if(container === undefined) {
            throw('Container not found');
        }

        container.onclick = "";
        messageBoard.innerHTML = "";
        diamondPositions = diamonds == undefined?getRandomPositions(cellsArray.length-1,8):diamonds;

        cellsArray.forEach(function(v){
            v.className = 'cell unknown';
        });

        if(diamondsFound == undefined) {
            diamondFoundPositions = [];
        } else {
            diamondFoundPositions = diamondsFound;
            diamondFoundPositions.forEach(function(v){
                cells[v].className = "cell diamond";
            });
        }

        if(emptyPositions == undefined) {
            openEmptyPositions = [];
        } else {
            openEmptyPositions = emptyPositions;
            openEmptyPositions.forEach(function(v){
                cells[v].className = "cell";
            });
        }

        hints = hint || false;
        container.onclick = generateGame;
    }


    function generateGame (event) {
        var target = event.target;
        if(diamondPositions.length == 0) {
            return false;
        }
        if (target.className == 'cell unknown') {
            var clickIndex = cellsArray.indexOf(target);
            if( inArray(diamondPositions,clickIndex) ) {
                diamondFoundPositions.push(clickIndex);
                target.className = "cell diamond";
                diamondPositions.splice(diamondPositions.indexOf(clickIndex),1);
                if(diamondPositions.length == 0) {
                  generateScore();
                }
            } else {
                openEmptyPositions.push(clickIndex);
                if(hints) {
                    var previousArrows = container.getElementsByClassName('arrow');
                    for(var i = 0; i < previousArrows.length; i++) {
                        previousArrows[i].className = "cell";
                    }
                    target.className = "cell arrow " + getNearestDiamond(clickIndex);
                } else {
                    target.className = "cell";
                }
            }
        }
    };

    function generateScore() {
        var remainingCells = container.getElementsByClassName('unknown');
        messageBoard.innerHTML = "Game Over!! Your Score: "+ remainingCells.length;
    }

    function saveGame() {
        var gameStats = {
            diamondPositions: diamondPositions,
            diamondFoundPositions: diamondFoundPositions,
            openEmptyPositions: openEmptyPositions
        }
        gameStorage.setItem('gameStats',JSON.stringify(gameStats));
        messageBoard.innerHTML = "Game Saved!! You can load this game at later times";
    }

    function getRandomPositions(top,n) {
        var intArray = [];

        for (var i = 0; i <= top; i++) {
            intArray.push(i);
        }

        var result = [];

        for(var y = 0; y < n; y++) {
            var rand = Math.round((- 0.5) + Math.random() * (intArray.length));
            result.push(intArray[rand]);
            intArray.splice(rand,1);
        }

        return result;
    }

    function inArray(array,n) {
        return array.indexOf(n)!=- 1;
    }

    function getNearestDiamond(clickedIndex) {
        var yOfI = Math.floor(clickedIndex/8);
        var xOfI = clickedIndex%8;
        var distances = [];
        var directions = [];
        diamondPositions.forEach(function(v){
            var yOfV = Math.floor(v/8);
            var xOfV = v%8;
            var diffY = 0;
            var diffX = 0;
            if(yOfI > yOfV) {
                diffY = yOfI - yOfV;
                directions.push('up');
            } else if(yOfI < yOfV) {
                diffY = yOfV - yOfI;
                directions.push('down');
            }

            if(xOfI > xOfV) {
                if(diffY == 0) {
                  directions.push('left');
                }
                diffX = xOfI - xOfV;
            } else if(xOfI < xOfV) {
                if(diffY == 0) {
                  directions.push('right');
                }
                diffX = xOfV - xOfI;
            }
            distances.push(diffX + diffY);

        });
        var shortest = getMinOfArray(distances);
        return directions[distances.indexOf(shortest)];
    }

    function getMinOfArray(numArray) {
        return Math.min.apply(null, numArray);
    }

    return {
        init: init,
        saveGame: saveGame
    }
}();
