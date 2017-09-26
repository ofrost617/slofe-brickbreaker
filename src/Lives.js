var Lives = function() {
  this.current = 3;
}

Lives.prototype.lose = function() {
  return this.current--;
}

Lives.prototype.reset = function() {
  this.current = 3;
}

Lives.prototype.string = function() {
  return "Lives: " + this.current;
}

module.exports = Lives;
