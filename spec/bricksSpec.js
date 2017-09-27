describe('Bricks', function() {

  beforeEach(function() {
    bricks = new Bricks
  })

  describe('size', function() {
		it('bricks has count', function() {
			expect(bricks.row).toEqual(7);
      expect(bricks.col).toEqual(5);
		});

    it('bricks has total bricks', function() {
			expect(bricks.totalBricks()).toEqual(bricks.row * bricks.col);
		});
	});
})
