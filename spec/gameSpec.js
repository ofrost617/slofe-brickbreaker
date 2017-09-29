jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;

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
    it('removes brick ones hit', function(done) {


      setTimeout(function() {
        startGame();
        expect(window.bricksLeft).toEqual(28);
        setTimeout(function() {
          expect(window.bricksLeft).toEqual(27);
          done();
        }, 5000);
      }, 2000);
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
