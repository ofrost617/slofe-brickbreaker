describe('Ball hits brick', function() {

  describe('lose', function() {
    it('lose a life after hitting a ball', function() {
      preload();
      create();
      expect(window.lives.current).toEqual(3);
      ballLeaveScreen();
      expect(window.lives.current).toEqual(2);
    });
  });
});
