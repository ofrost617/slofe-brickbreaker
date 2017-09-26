var Bricks = function() {
  this.row = 7;
  this.col = 3;
}

Bricks.prototype.totalBricks = function() {
  return this.row * this.col
}


module.exports = Bricks;
