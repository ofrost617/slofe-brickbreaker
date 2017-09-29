describe('Game feature', function() {

  describe('Ball goes out of a bounds', function() {
    it('lose a life', function() {
      preload();
      create();
      expect(window.lives.current).toEqual(3);
      ballLeaveScreen();
      expect(window.lives.current).toEqual(2);
    });
  });

  describe('Brickcount goes down', function() {
    it('removes brick ones hit', function() {
      preload();
      create();

      expect(window.bricksLeft).toEqual(28)

      window.startinggame();
      expect(window.bricksLeft).toEqual(27)
    });
  });

  describe('Start button works', function() {
    it('ball has a starting position', function() {
      preload();
      create();
      expect(window.ball.position.x).toEqual(240);
    });
  });
});
