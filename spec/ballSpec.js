describe("Ball", function() {
  beforeEach(function(){
    ball = new Ball()
  });

  describe("ball properties", function() {

    it("ball should have a name", function(){
      expect(ball.name).toBeTruthy();
    });

    it("ball should have an imgtag", function(){
      expect(ball.imgPath).toBeTruthy();
    });

  });
});
