// Handle user events and updating the DOM

var $ = require('jquery');
var boardUtil = require('./board.js');

$(document).ready(function() {
  
  // Holds the currently loaded board
  var currentBoard;

  // Holds value from a mutable cell
  var inputValue;

  // Holds the number of the cell that the value is from
  var cellIndex;


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
        $(this).after('<form class="input-form hidden"><input type="text" size="1"></form>');
      }
    });

    // Change the content of the cell and hide the form when the form is submitted
    $('form').submit(changeCellValue);
  };

  // Reveal the input form on a mutable cell
  function revealInputForm() {
    $(this).find('form').removeClass('hidden');
  };

  // Reveal the input form when a mutable cell is clicked
  $('.cell').click(revealInputForm);

  // Change the value on a mutable cell
  function changeCellValue(event) {
    event.preventDefault();
    // Get the value from the input field
    inputValue = $(this).children('input').val();
    // Get the id of the cell that the form belongs to
    cellIndex = $(this).closest('.cell').attr('id');
    // Set the content of the cell with the new value
    $(this).siblings('.content').html(inputValue);
    // Hide the input form
    $(this).addClass('hidden');
    // Clear the input field
    $(this).children('input').val('');
    // Update the value in the current game board
    boardUtil.updateCellValue(cellIndex, inputValue);
  };

  // Initialize the game
  refreshGameBoard();

});
