describe('Game', function() {

  describe('text on page', function() {
		it('lose a life text', function() {
      lives.lose()
      console.log(lifeLostText)
			expect(game.lifeLostText).toContain('Life lost, tap to continue');
		});

  });

});
