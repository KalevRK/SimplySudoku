var expect = require('chai').expect;
var $ = require('jquery');
var board = require('../../client/js/board.js');
var boardData = require('../../client/js/board-data.js');
require('../../client/js/app.js');

describe('Loading a board', function() {
  var loadedGameBoard, loadedSolutionBoard, easyGameBoard, easySolutionBoard;

  beforeEach(function() {
    board.loadBoard('easy');
    loadedGameBoard = board.getGameBoard();
    loadedSolutionBoard = board.getSolutionBoard();
    easyGameBoard = boardData['easy'][0]['gameboard'].slice();
    easySolutionBoard = boardData['easy'][0]['solutionboard'].slice();
  })

  it('should load the selected board into the game board', function() {
    easyGameBoard.forEach(function(element, index) {
      expect(element).to.equal(loadedGameBoard[index]);
    });
  });

  it('should load the corresponding solved board into the solution board', function() {
    easySolutionBoard.forEach(function(element, index) {
      expect(element).to.equal(loadedSolutionBoard[index]);
    });
  });

  it('should update the DOM nodes with the appropriate board values', function() {
    var firstCell = $('.content.mutable').first().html();
    var fourthCell = $('.content.immutable').first().html();
    expect(firstCell).to.equal(' ');
    expect(fourthCell).to.equal('2');
  });
});

describe('Manipulating a board', function() {
  xit('should change a value in a mutable cell', function() {

  });

  xit('should update the DOM node with the appropriate cell value', function() {

  });

  xit('should not change a value in an immutable cell', function() {

  });
});

describe('Checking board conflicts', function() {
  xit('should detect all board conflicts for a given conflicting value', function() {

  });

  xit('should remove all relevant conflicts when a conflicting value is changed', function() {

  });
});

describe('Checking board solved state', function() {
  xit('should trigger the win state on a solved board', function() {

  });
});

describe('Generating a new board', function() {
  xit('should generate a new easy difficulty board', function() {

  });

  xit('should generate a new medium difficulty board', function() {

  });

  xit('should generate a new hard difficulty board', function() {

  });
});
