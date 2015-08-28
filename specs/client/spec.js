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
  });

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
    var firstCell = $('#1').children('.content').html();
    var fourthCell = $('#3').children('.content').html();
    expect(firstCell).to.equal(' ');
    expect(fourthCell).to.equal('2');
  });
});

describe('Manipulating a board', function() {

  beforeEach(function() {
    board.loadBoard('easy');
    var loadedGameBoard = board.getGameBoard();
  });

  it('should change a value in a mutable cell', function() {
    board.updateCellValue(0,1);
    expect(board.getGameBoard()[0]).to.equal(1);
  });

  it('should update the DOM node with the appropriate cell value', function() {
    $('#0').find('input').val('1');
    $('#0').find('form').trigger('submit');
    var cellContent = $('#0').children('.content').html();
    expect(cellContent).to.equal('1');
  });

  it('should not change a value in an immutable cell', function() {
    $('#3').find('input').val('1');
    $('#3').find('form').trigger('submit');
    var cellContent = $('#3').children('.content').html();
    expect(cellContent).to.equal('2');
  });
});

describe('Checking board conflicts', function() {
  
  beforeEach(function() {
    board.loadBoard('easy');
    var loadedGameBoard = board.getGameBoard();
    board.updateCellValue(0,1);
  });

  it('should detect all board conflicts for a given conflicting value', function() {
    var conflicts = board.checkBoardConflicts(0);
    expect(conflicts.length).to.equal(3);
    expect(conflicts[0]).to.equal(8);
    expect(conflicts[1]).to.equal(18);
  });

  it('should remove all relevant conflicts when a conflicting value is changed', function() {
    board.updateCellValue(0,4);
    var conflicts = board.checkBoardConflicts(0);
    expect(conflicts.length).to.equal(0);
  });
});

describe('Checking board solved state', function() {
  
  beforeEach(function() {
    board.loadBoard('easy');
    var loadedGameBoard = board.getGameBoard();
    var loadedSolutionBoard = board.getSolutionBoard();
    loadedSolutionBoard.forEach(function(element, index) {
      board.updateCellValue(index, element);
    });
  });

  it('should trigger the win state on a solved board', function() {
    expect(board.checkWinState()).to.equal(true);
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
