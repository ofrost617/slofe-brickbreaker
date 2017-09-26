describe("Ball", function() {
  beforeEach(function(){
    ball = new Ball()
  });

  describe("ball properties", function() {
    it("ball colour should be blue", function(){
      expect(ball.colour).toEqual("blue")
    })
  });
});
