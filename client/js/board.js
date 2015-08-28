// Handle getting boards, updating boards, and checking board conditions

// include the game board data
var stored_boards = require('./board-data.js');

var boardUtils = (function() {

  var gameBoard, solutionBoard;

  // retrive a random game board and its corresponding solution board from
  // the set of boards for the given difficulty level
  function loadBoard(difficulty) {
    // Generate a random number between 0 and the number of boards at the given difficulty level (not inclusive)
    var boardNumber = Math.floor(Math.random() * (stored_boards[difficulty].length));

    // load the retrieved boards
    gameBoard = stored_boards[difficulty][boardNumber]['gameboard'];
    solutionBoard = stored_boards[difficulty][boardNumber]['solutionboard'];

    // send the retrieved game board back to app.js, so that it can update the DOM
    return gameBoard;
  };

  function getGameBoard() {
    return gameBoard;
  };

  function getSolutionBoard() {
    return solutionBoard;
  };

  return {
    loadBoard: loadBoard,
    getGameBoard: getGameBoard,
    getSolutionBoard: getSolutionBoard
  };

}());

module.exports = boardUtils;