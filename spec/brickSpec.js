describe('Brick', function() {

  beforeEach(function() {
    brick = new Brick
  })

  describe('size', function() {
		it('brick has height and width', function() {
			expect(brick.height).toEqual(20);
      expect(brick.width).toEqual(50);
		});
	});

  describe('info', function() {
    it('brick has a name, path and padding', function() {
      expect(brick.name).toEqual('brick');
      expect(brick.imgPath).toEqual('img/brick.png');
      expect(brick.padding).toEqual(10)
    });
  })
})
