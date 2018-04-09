
'use strict';
var Game = (function() {
    var container,cells ,cellsArray ,messageBoard ,diamondPositions,openEmptyPositions,diamondFoundPositions,hints,api;
    var gameStorage = window.localStorage;

    /*
        Initialize game
        With or without hints
        Or load from a saved state
    */
    function init(containerBlock, hint, diamonds, diamondsFound, emptyPositions) {

        container = containerBlock;

        //Caching DOM 
        cells = container.getElementsByClassName('cell');
        cellsArray = Array.from(cells);
        messageBoard = container.getElementsByClassName('messages')[0];

        if(container === undefined) {
            throw('Container not found');
        }

        container.onclick = '';
        messageBoard.innerHTML = '';
        diamondPositions = diamonds === undefined?_getRandomPositions(cellsArray.length-1,8):diamonds;

        cellsArray.forEach(function(v){
            v.className = 'cell unknown';
        });

        if(diamondsFound === undefined) {
            diamondFoundPositions = [];
        } else {
            diamondFoundPositions = diamondsFound;
            diamondFoundPositions.forEach(function(v){
                cells[v].className = 'cell diamond';
            });
        }

        if(emptyPositions === undefined) {
            openEmptyPositions = [];
        } else {
            openEmptyPositions = emptyPositions;
            openEmptyPositions.forEach(function(v){
                cells[v].className = 'cell';
            });
        }

        hints = hint || false;
        container.onclick = _generateGame;
    }

    /*
        Adding game logic
        If hints show arrows pointing in general direction of nearest diamond
        Store state in variable for saving it in @gameStorage
    */
    function _generateGame (event) {
        var target = event.target;
        if(diamondPositions.length === 0) {
            return false;
        }
        if (target.className === 'cell unknown') {
            var clickIndex = cellsArray.indexOf(target);
            if( _inArray(diamondPositions,clickIndex) ) {
                diamondFoundPositions.push(clickIndex);
                target.className = 'cell diamond';
                diamondPositions.splice(diamondPositions.indexOf(clickIndex),1);
                if(diamondPositions.length === 0) {
                  _generateScore();
                }
            } else {
                openEmptyPositions.push(clickIndex);
                if(hints) {
                    var previousArrows = container.getElementsByClassName('arrow');
                    for(var i = 0; i < previousArrows.length; i++) {
                        previousArrows[i].className = 'cell';
                    }
                    target.className = 'cell arrow ' + _getNearestDiamond(clickIndex);
                } else {
                    target.className = 'cell';
                }
            }
        }
    }

    /*
        Show score when diamonds found
    */
    function _generateScore() {
        var remainingCells = container.getElementsByClassName('unknown');
        messageBoard.innerHTML = 'Game Over!! Your Score: '+ remainingCells.length;
    }

    /*
        Save game state
        If  game finished don't save
    */
    function saveGame() {
        var gameStats = {
            diamondPositions: diamondPositions,
            diamondFoundPositions: diamondFoundPositions,
            openEmptyPositions: openEmptyPositions
        };
        if(diamondPositions.length === 0) {
            messageBoard.innerHTML = 'Game already finished!! You can not save a finished game';
        } else {
            gameStorage.setItem('gameStats',JSON.stringify(gameStats));
            messageBoard.innerHTML = 'Game Saved!! You can load this game at later times';
        }
        
    }

    /*
        Get n random numbers from array starting from 0 to top -1
    */
    function _getRandomPositions(top,n) {
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

    /*
        Check if element in array
    */
    function _inArray(array,n) {
        return array.indexOf(n)!==- 1;
    }

    /*
        Get nearest diamond direction from clicked cell
        Algo :
            Calculate steps from clicked cell to all unfound diamonds by adding steps in coulmns and rows
            If nearest diamond is in top/bottom rows show top/bottom arrows.
            Else show left/right arrow if nearest diamond in same row and left/right coloumn. 
    */
    function _getNearestDiamond(clickedIndex) {
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
                if(diffY === 0) {
                  directions.push('left');
                }
                diffX = xOfI - xOfV;
            } else if(xOfI < xOfV) {
                if(diffY === 0) {
                  directions.push('right');
                }
                diffX = xOfV - xOfI;
            }
            distances.push(diffX + diffY);

        });
        var shortest = _getMinOfArray(distances);
        return directions[distances.indexOf(shortest)];
    }

    /*
        get the mininmum number in an array
    */
    function _getMinOfArray(numArray) {
        return Math.min.apply(null, numArray);
    }

    /*
        Public API
    */
    api = {
        init: init,
        saveGame: saveGame
    };


    /* test-code */
    api.generateScore = _generateScore;
    api.getNearestDiamond = _getNearestDiamond;
    api.getRandomPositions = _getRandomPositions;
    api.getMinOfArray = _getMinOfArray;
    api.inArray = _inArray;
    /* end-test-code */

    return api;
})();