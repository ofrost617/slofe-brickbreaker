var Bricks = function() {
  this.row = 7;
  this.col = 4;
}

Bricks.prototype.totalBricks = function() {
  return this.row * this.col
}
