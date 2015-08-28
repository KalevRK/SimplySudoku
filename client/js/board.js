// Handle getting boards, updating boards, and checking board conditions

// Include the game board data
var stored_boards = require('./board-data.js');

var boardUtils = (function() {

  // Used to hold the currently loaded game board and solution board
  var gameBoard, solutionBoard;

  // Retrive a random game board and its corresponding solution board from
  // the set of boards for the given difficulty level
  function loadBoard(difficulty) {
    // Generate a random number between 0 and the number of boards at the given difficulty level (not inclusive)
    var boardNumber = Math.floor(Math.random() * (stored_boards[difficulty].length));

    // Load the retrieved boards
    gameBoard = stored_boards[difficulty][boardNumber]['gameboard'].slice();
    solutionBoard = stored_boards[difficulty][boardNumber]['solutionboard'].slice();

    // Send the retrieved game board back to app.js, so that it can update the DOM
    return gameBoard;
  }

  // Return the currently loaded game board
  function getGameBoard() {
    return gameBoard;
  }

  // Return the currently loaded solution board
  function getSolutionBoard() {
    return solutionBoard;
  }

  // Check the game board for a win state
  function checkWinState() {
    var boardSolved = true;

    // compare the values in the game board against the solution board
    solutionBoard.forEach(function(element, index) {
      if ((parseInt(element) !== gameBoard[index])) {
        // if there is a mis-match in any of the values then the game board is not solved
        boardSolved = false;
      }
    });

    return boardSolved;
  }

  // Check the game board for conflicts in rows, columns, or within sub-boxes
  // after value has been updated in the game board at the given index
  function checkBoardConflicts(index) {
    // Store value that was changed
    var target = parseInt(gameBoard[index]);

    // Array of all board indices which have conflicts
    var conflictIndices = [];

    // Calculate the row that the updated cell is in
    var row = Math.floor(index / 9);

    // Check for row conflicts
    for (var i = (row * 9); i < ((row * 9) + 9); i++) {
      if ((i !== index) && (gameBoard[i] === target)) {
        // Conflict found at index i
        conflictIndices.push(i);
      }
    }

    // Calculate the column that the updated cell is in
    var column = Math.floor(index % 9);

    // Check for column conflicts
    for (var i = column; i < (column + 72); i += 9) {
      if ((i !== index) && (gameBoard[i] === target)) {
        // Conflict found at index i
        conflictIndices.push(i);
      }
    }

    // Calculate the sub-box that the updated cell is in
    var boxRow = Math.floor(row / 3) * 3;
    var boxCol = Math.floor(column / 3) * 3;

    // Check for sub-box conflicts
    for (var i = boxRow; i < (boxRow + 3); i++) {
      for (var j = boxCol; j < (boxCol + 3); j++) {
        var boxIndex = (i * 9) + j;
        if ((boxIndex !== index) && (gameBoard[boxIndex] === target)) {
          conflictIndices.push(boxIndex);
        }
      }
    }

    return conflictIndices;
  }

  // Update the game board and check for a win state or conflicts
  function updateCellValue(index, value) {
    // Update the value in the game board array
    gameBoard[index] = value;
    // Check for win state
    if (checkWinState()) {
      // return flag that win state is true, and no conflicts
      return [true, []];
    } else {
      // If not a win state then check for conflicts
      // return flag that win state is false, and an array of all conflict indices
      return [false, checkBoardConflicts(index)];
    }
  }

  return {
    loadBoard: loadBoard,
    getGameBoard: getGameBoard,
    getSolutionBoard: getSolutionBoard,
    updateCellValue: updateCellValue,
    checkBoardConflicts: checkBoardConflicts,
    checkWinState: checkWinState
  };

}());

module.exports = boardUtils;