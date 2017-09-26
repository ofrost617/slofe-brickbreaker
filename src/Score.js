// var brick = require('./Bricks.js');

var Score = function() {
  this.points = []
  this.increment = 10
}

Score.prototype.currentTotal = function() {
    var sum = this.points.reduce((x, y) => x + y, 0);
    return sum
}

Score.prototype.point = function() {
  this.points.push(10)
}

Score.prototype.totalPossible = function() {
  var bricks = new Bricks;
  var num = bricks.col * bricks.row * this.increment
  return num
}

module.exports = Score;
