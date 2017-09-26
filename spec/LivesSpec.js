describe('Lives', function() {

  beforeEach(function() {
    lives = new Lives
  })

  describe('lose', function() {
		it('lose a life', function() {
      expect(lives.current).toEqual(3);
      lives.lose()
			expect(lives.current).toEqual(2);
		});

    it('starts at 3', function() {
      expect(lives.current).toEqual(3);
		});

    it('resets to 3', function() {
      expect(lives.current).toEqual(3);
      lives.lose()
      expect(lives.current).toEqual(2);
      lives.reset()
      expect(lives.current).toEqual(3);
		});
	});

  it('returns as string', function() {
    expect(lives.string()).toEqual("Lives: " + lives.current);
  });
})
