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
      expect(window.bricksLeft).toEqual(35)

      console.log(bricks)
      console.log("brick 2 here")

      ballHitBrick(ball, bricks);
      expect(window.bricksLeft).toEqual(34)
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
