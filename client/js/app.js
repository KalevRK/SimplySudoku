// Handle user events and updating the DOM

var $ = require('jquery');
var boardUtil = require('./board.js');

$(document).ready(function() {
  
  // Holds the currently loaded board
  var currentBoard;


  // Clears any old game board values from the DOM and replaces them with the new game board values
  function refreshGameBoard() {
    // Load a new game board
    currentBoard = boardUtil.loadBoard('easy');

    // Remove any classes from the gameboard cells
    $('.cell').removeClass('mutable immutable');
    // Remove any forms from the gameboard cells
    $('form').remove();

    // Go through all of the content divs in the gameboard div and update their values
    $('.content').each(function(index) {
      // check value at index in currentBoard
      // if value is present
      if (currentBoard[index] !== undefined) {
        // Set the value of the cell
        $(this).html(currentBoard[index]);
        // Make it an immutable cell
        $(this).addClass('immutable');
      } else {
        // Set a placeholder for the value of the cell
        $(this).html(' ');
        // Make it a mutable cell
        $(this).addClass('mutable');
        // Add a form within every mutable cell
        $(this).after('<form class="hidden"><input type="text" size="1"></form>');
      }
    });

  };

  // Initialize the game
  refreshGameBoard();
});
