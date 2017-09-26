// var brick = require('./Bricks.js');

var Score = function() {
  this.points = []
  this.increment = 10
}

Score.prototype.currentTotal = function() {
    var sum = this.points.reduce((x, y) => x + y, 0);
    return sum
}

Score.prototype.totalPossible = function() {
  var bricks = new Bricks;
  var num = bricks.col * bricks.row * this.increment
  return num
}

Score.prototype.hitBrick = function() {
  this.points.push(10)
}

Score.prototype.string = function() {
  return "Score: " + this.currentTotal()
}


module.exports = Score;
