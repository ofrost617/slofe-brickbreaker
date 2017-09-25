// describe('Game', function() {
//
//   beforeEach(function() {
//     game = new Phaser.Game
//   })
//
//   describe("canvas is present", function() {
//     it("has a canvas", function() {
//       expect(game).toBe(true)
//     });
//   });
// });

module.exports = {
  'Demo test Google' : function (client) {
    client
      .url('http://www.google.com')
      .waitForElementVisible('body', 1000)
      .assert.title('Google')
      .assert.visible('input[type=text]')
      .setValue('input[type=text]', 'rembrandt van rijn')
      .waitForElementVisible('button[name=btnG]', 1000)
      .click('button[name=btnG]')
      .pause(1000)
      .assert.containsText('ol#rso li:first-child',
        'Rembrandt - Wikipedia')
      .end()
  }
}
