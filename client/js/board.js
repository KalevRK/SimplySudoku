// Handle getting boards, updating boards, and checking board conditions

// Include the game board data
var stored_boards = require('./board-data.js');

var boardUtils = (function() {

  var gameBoard, solutionBoard;

  // Retrive a random game board and its corresponding solution board from
  // the set of boards for the given difficulty level
  function loadBoard(difficulty) {
    // Generate a random number between 0 and the number of boards at the given difficulty level (not inclusive)
    var boardNumber = Math.floor(Math.random() * (stored_boards[difficulty].length));

    // Load the retrieved boards
    gameBoard = stored_boards[difficulty][boardNumber]['gameboard'];
    solutionBoard = stored_boards[difficulty][boardNumber]['solutionboard'];

    // Send the retrieved game board back to app.js, so that it can update the DOM
    return gameBoard;
  };

  function getGameBoard() {
    return gameBoard;
  };

  function getSolutionBoard() {
    return solutionBoard;
  };

  // Check the game board for a win state
  function checkWinState() {

  };

  // Check the game board for conflicts
  // in rows, columns, or within sub-boxes
  function checkBoardConflicts() {

  };

  function updateCellValue(index, value) {
    // Update the value in the game board array
    gameBoard[index] = value;
    // Check for win state
    if (checkWinState()) {
      console.log('Winner!');
    } else {
      // If not a win state then check for conflicts
      checkBoardConflicts();
    }
  };

  return {
    loadBoard: loadBoard,
    getGameBoard: getGameBoard,
    getSolutionBoard: getSolutionBoard,
    updateCellValue: updateCellValue
  };

}());

module.exports = boardUtils;