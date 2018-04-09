'use strict';
describe('Unit testing Game functionality', function () {
	beforeAll(function() {
		
		var body = document.getElementsByTagName("body")[0];
		var element = document.createElement("div");
		element.innerHTML = '<div id="container"><div class="rules"><h2>Diamond Sweeper</h2><b>The rules of the game are as follows:</b><br/> There are 8 diamonds hidden on the board, each diamond behind one of the squares<br/> Click on boxes to open them (You can play with hints to know the general direction of nearest diamond)<br/> The game ends when all diamonds are found. Your score is the number of squares still left unturned.<br/></div><div class="messages">hello</div><div class="diamondSweeper-board"><div class="cell unknown"></div><div class="cell unknown"></div><div class="cell unknown"></div><div class="cell unknown"></div><div class="cell unknown"></div><div class="cell unknown"></div><div class="cell unknown"></div><div class="cell unknown"></div><div class="cell unknown"></div><div class="cell unknown"></div><div class="cell unknown"></div><div class="cell unknown"></div><div class="cell unknown"></div><div class="cell unknown"></div><div class="cell unknown"></div><div class="cell unknown"></div><div class="cell unknown"></div><div class="cell unknown"></div><div class="cell unknown"></div><div class="cell unknown"></div><div class="cell unknown"></div><div class="cell unknown"></div><div class="cell unknown"></div><div class="cell unknown"></div><div class="cell unknown"></div><div class="cell unknown"></div><div class="cell unknown"></div><div class="cell unknown"></div><div class="cell unknown"></div><div class="cell unknown"></div><div class="cell unknown"></div><div class="cell unknown"></div><div class="cell unknown"></div><div class="cell unknown"></div><div class="cell unknown"></div><div class="cell unknown"></div><div class="cell unknown"></div><div class="cell unknown"></div><div class="cell unknown"></div><div class="cell unknown"></div><div class="cell unknown"></div><div class="cell unknown"></div><div class="cell unknown"></div><div class="cell unknown"></div><div class="cell unknown"></div><div class="cell unknown"></div><div class="cell unknown"></div><div class="cell unknown"></div><div class="cell unknown"></div><div class="cell unknown"></div><div class="cell unknown"></div><div class="cell unknown"></div><div class="cell unknown"></div><div class="cell unknown"></div><div class="cell unknown"></div><div class="cell unknown"></div><div class="cell unknown"></div><div class="cell unknown"></div><div class="cell unknown"></div><div class="cell unknown"></div><div class="cell unknown"></div><div class="cell unknown"></div><div class="cell unknown"></div><div class="cell unknown"></div></div><div id="controls"><button type="button" name="button" class="button -blue new-game">New Game</button><button type="button" name="button" class="button -blue new-game hints">New Game with Hints Enabled</button><button type="button" name="button" class="button -blue save-game">Save Game</button><button type="button" name="button" class="button -blue load-game">Load Last Game</button></div></div>';
		body.appendChild(element);

		var container = document.getElementById('container');
		Game.init(container);
	});

	it('All diamonds are hidden', function () {
		expect(document.getElementsByClassName("cell unknown").length).toEqual(64);
	});

	it('Event is working after generate game', function (){
		var clickCell = document.querySelectorAll(".cell")[0];
		clickCell.click();
		expect(['cell', 'cell diamond']).toContain(clickCell.className);
	});

	it('Generates correct score', function () {
		Game.generateScore();
		expect('Game Over!! Your Score: '+ document.getElementsByClassName("cell unknown").length).toEqual(document.getElementsByClassName('messages')[0].innerHTML);
	});
	
	it('Generates n random numbers from array starting from 0 to top', function(){
		expect(Game.getRandomPositions(64,8).length).toEqual(8);
	});

	it('Element in array', function(){
		expect(Game.inArray([4,6,8,10],6)).toEqual(true);
	});

	it('Element in array', function(){
		expect(Game.inArray([4,6,8,10],7)).toEqual(false);
	});

	it('Get minimum in an array', function(){
		expect(Game.getMinOfArray([4,6,8,10,3])).toEqual(3);
	});
});