describe("Paddle", function() {
  beforeEach(function(){
    paddle = new Paddle()
  });

  describe("paddle properties", function() {

    it("paddle should have a name", function(){
      expect(paddle.name).toBeTruthy();
    });

    it("paddle should have an imgtag", function(){
      expect(paddle.imgPath).toBeTruthy();
    });

  });
});
