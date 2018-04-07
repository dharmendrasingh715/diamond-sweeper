var Game = function(container) {

    if(container === undefined) {
        throw('Container not found');
    }

    var cells = container.getElementsByClassName('cell');
    var cellsArray = Array.from(cells);
    var messageBoard = container.getElementsByClassName('messages')[0];
    var diamondPositions = getRandomPositions(cellsArray.length-1,8);

    container.onclick = function (event) {
        var target = event.target;
        if(diamondPositions.length == 0) {
            return false;
        }
        if (target.className == 'cell unknown') {
            var clickIndex = cellsArray.indexOf(target);
            if( inArray(diamondPositions,clickIndex) ) {
                target.className = "cell diamond";
                diamondPositions.splice(diamondPositions.indexOf(clickIndex),1);
                if(diamondPositions.length == 0) {
                  generateScore();
                }
            } else {
                target.className = "cell";
            }
        }
    }

    function generateScore() {
        var remainingCells = container.getElementsByClassName('unknown');
        messageBoard.innerHTML = "<h3>Game Over!! Your Score: "+ remainingCells.length +"</h3>";
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

}