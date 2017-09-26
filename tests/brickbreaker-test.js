module.exports = {
  /**
   * things to do before your tests start.
   * In this case, I'm resizing the browser window, so I can see the test output
   * and the game running on the same tiny laptop screen.
   *
   * method before
   * @param browser
   */
  before: function(browser){
    browser.resizeWindow(800, 600);
  },

  /**
   * Tests your game's webpage can be served
   * When this fails, it usually means your webserver's not up.
   * Or you forgot to `npm start`
   *
   * @test
   * @param client
   */
   'Phaser Game Boots Test' : function (client) {
     var brickBreaker = client.page.brickBreaker();
     brickBreaker.navigate()
       .waitForElementVisible('body', 1000)
   },


   'Page has title': function(client) {
     client
       .assert.title('BrickBreaker!')
       .end();
   },

   'Console.log client': function(client) {
     console.log(client.page.brickBreaker);
     client.end();

  // 'Phaser Game Boots Test' : function (client) {
  //   client
  //     .end();
    }
}
