function loadImages() {
  var paddle = new Paddle();
  var ball = new Ball();
  var brick = new Brick();
  game.load.image(paddle.name, paddle.imgPath);
  game.load.image(brick.name, brick.imgPath);
  game.load.spritesheet(ball.name, ball.imgPath, 20, 20);
  game.load.spritesheet("button", "img/button.png", 120, 40);
  game.load.image("cosby", "img/bg2.jpg");
}

function loadSounds() {
	game.load.audio('ballHit', 'audio/rickBurp.wav');
	game.load.audio('paddleHit', 'audio/yes.wav');
	game.load.audio('loseLife', 'audio/ohJeez.wav');
	game.load.audio('theme', 'audio/moonman.wav')
}

// preload takes care of preloading the assets
function preload() {
  game.stage.backgroundColor = "#eee";
  game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  game.scale.pageAlignHorizontally = true;
  game.scale.pageAlignVertically = true;
  loadImages();
  loadSounds();
}
