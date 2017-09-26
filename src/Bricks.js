var Bricks = function() {
  this.row = 8;
  this.col = 8;
}

Bricks.prototype.totalBricks = function() {
  return this.row * this.col
}


module.exports = Bricks;
