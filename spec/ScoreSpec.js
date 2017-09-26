describe('Score', function() {

  beforeEach(function() {
    score = new Score
    bricks = new Bricks
  })

  describe('totalPossible', function() {
		it('should be the total possible', function() {
      expect(score.totalPossible()).toEqual(bricks.col * bricks.row * score.increment)
		});
	});

  describe('point', function() {
    it('starts at 0 before points scored', function() {
      expect(score.currentTotal()).toEqual(0)
    })

		it('should add points to score', function() {

		});
	});
})
