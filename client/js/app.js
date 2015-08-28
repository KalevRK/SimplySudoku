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

  // All of the available difficulty levels
  var difficultyLevels = ['Easy', 'Medium', 'Hard'];
  var difficultyIndex = 0;
  var difficulty = 'Easy';


  // Clears any old game board values from the DOM and replaces them with the new game board values
  function refreshGameBoard() {
    // Load a new game board
    currentBoard = boardUtil.loadBoard(difficulty);
    // Hide the solved text
    $('#solved').addClass('hidden');
    // Remove the win state styling on all of the cells
    $('.content').removeClass('winstate');
    // Remove any classes from the gameboard cells
    $('.content').removeClass('mutable immutable');
    $('.cell').removeClass('conflict');
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
  }

  // Reveal the input form on a mutable cell
  function revealInputForm() {
    $(this).find('form').removeClass('hidden');
  }

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
    var updatedResults = boardUtil.updateCellValue(cellIndex, inputValue);
    // If the win state flag is set then display the win state
    if (updatedResults[0]) {
      displayWinState();
    } else {
      // Otherwise, check number of conflicts
      if (updatedResults[1].length) {
        // Display the conflicts
        displayConflicts(parseInt($(this).closest('.cell').attr('id')),updatedResults[1]);
      } else {
        // If no conflicts then clear any previous conflict formatting
        $('.cell').removeClass('conflict');
        $('.cell').each(function() {
          // For each cell with mutable state
          // check if its value still causes any conflicts
          if ($(this).children('.content').hasClass('mutable')) {
            var conflicts = boardUtil.checkBoardConflicts($(this).attr('id'));
            // If conflicts still exist then style the affected cells
            if (conflicts.length > 0) {
              displayConflicts(parseInt($(this).attr('id')),conflicts);
            }
          }
        });
      }
    }
  }

  // Display the win state
  function displayWinState() {
    // Set the win state styling on all of the cells
    $('.content').addClass('winstate');
    // Make the win state div visible
    $('#solved').removeClass('hidden');
  }

  // Display any conflicts
  function displayConflicts(targetIndex, conflictIndices) {
    // For the target index change its number to red
    $('#'+targetIndex).addClass('conflict');
    // For all of the other conflicting indices
    // change their numbers to red
    conflictIndices.forEach(function(element) {
      $('#'+element).addClass('conflict');
    });
  }

  // Cycle through the available difficulties
  // The selected difficulty will be used when the
  // 'Generate Board' button is clicked to generate
  // a new board
  function cycleDifficulty() {
    difficulty = difficultyLevels[difficultyIndex];
    if (difficultyIndex === 2) {
      difficultyIndex = 0;
    } else {
      difficultyIndex++;
    }
    $('#difficulty').text(difficulty);
  }

  // Cycle through the difficulty settings
  $('#difficulty').click(cycleDifficulty);

  // Generate a new board with the selected difficulty
  $('#generate').click(refreshGameBoard);

  // Initialize the game
  refreshGameBoard();

});
