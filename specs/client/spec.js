var expect = require('chai').expect;

describe('Basic test', function() {
  it('should return text', function() {
    var something = 'This is something.';
    expect(something).to.equal('This is something.');
  });
});
