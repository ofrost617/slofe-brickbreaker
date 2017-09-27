describe('Game', function() {

  // beforeEach(function() {
  //   games = new Phaser.Game
  // })

  describe('text on page', function() {
		it('lose a life text', function() {
      preload()
      create()
      lives.lose()
			expect(window.lifeLostText).toContain('Life lost, tap to continue');
		});

  });

});
