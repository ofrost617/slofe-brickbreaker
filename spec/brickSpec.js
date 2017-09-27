describe('Brick', function() {

  beforeEach(function() {
    brick = new Brick
  })

  describe('size', function() {
		it('brick has height, width and offset', function() {
			expect(brick.height).toEqual(20);
      expect(brick.width).toEqual(50);
      expect(brick.offset.top).toEqual(50)
      expect(brick.offset.left).toEqual(60)
		});
	});

  describe('info', function() {
    it('brick has a name, path and padding', function() {
      expect(brick.name).toEqual('brick');
      expect(brick.imgPath).toEqual('img/pickleRick.png');
      expect(brick.padding).toEqual(10)
    });
  })
})
