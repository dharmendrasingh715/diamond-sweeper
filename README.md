# Diamond Sweeper

## Game

The Game is built on plain Javascript. You can do following actions in game.

1. Game initiates without hint
2. You can re initiate the game at any point of time by clicking (new game or new game with hints button)
3. If you play with hints arrow will appear on click pointing in general direction of nearest diamond if diamond is not found on clicked cell
4. You can save current state of your game at any point of time in game 
5. You can load your last saved game at any point of time in game 


Requirements:

* node.js (the app was built against v9.2.1, but any node > 6 should work)
* npm
* Grunt

To start the Application:

* Install the dependencies: `npm install`
* Start development server: `grunt serve`
* Hot reloading is enabled so it will automatically open webpage.
* To build assets and deployable code: `grunt build`
* To serve from dist: `grunt serve:dist`
* To run unit test with jasmine: `grunt test`
