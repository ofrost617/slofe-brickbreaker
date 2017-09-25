describe('Game', function() {

  beforeEach(function() {
    game = new BrickGame();
  })

  describe('at start', function() {
		it('player has 3 lives', function() {
			expect(lives).toEqual(3);
		});
	});

})
