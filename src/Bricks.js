var Bricks = function() {
  this.row = 7;
  this.col = 5;
}

Bricks.prototype.totalBricks = function() {
  return this.row * this.col
}
