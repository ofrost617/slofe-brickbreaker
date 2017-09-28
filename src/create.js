function buildBall() {
  ball = game.add.sprite(game.world.width * 0.5, game.world.height - 25, "ball");
  ball.scale.setTo(1, 1);
  ballHit = game.add.audio("ballHit", 1);
  ball.animations.add("wobble", [0, 1, 0, 2, 0, 1, 0, 2, 0], 24);
  ball.anchor.set(0.5);
  game.physics.enable(ball, Phaser.Physics.ARCADE);
  ball.body.collideWorldBounds = true;
  ball.body.bounce.set(1);
  ball.checkWorldBounds = true;
  ball.events.onOutOfBounds.add(ballLeaveScreen, this);
}

function buildPaddle() {
  paddle = game.add.sprite(game.world.width * 0.5, game.world.height - 5, "paddle");
  paddleHit = game.add.audio("paddleHit");
  paddleHit.volume = 0.3;
  paddle.anchor.set(0.5, 1);
  game.physics.enable(paddle, Phaser.Physics.ARCADE);
  paddle.body.immovable = true;
}

function initBricks() {
  var brick = new Brick();
  bricks = game.add.group();
  for (c = 0; c < bricksSize.col; c++) {
    for (r = 0; r < bricksSize.row; r++) {
      var brickX = r * (brick.width + brick.padding) + brick.offset.left;
      var brickY = c * (brick.height + brick.padding) + brick.offset.top;
      var newBrick = game.add.sprite(brickX, brickY, "brick");
      game.physics.enable(newBrick, Phaser.Physics.ARCADE);
      newBrick.body.immovable = true;
      newBrick.anchor.set(0.5);
      bricks.add(newBrick);
    }
  }
}

function buildText() {
  textStyle = { font: "18px Arial", fill: "#0095DD" };
  scoreText = game.add.text(100, 5, "Bricks left: " + bricksLeft, textStyle);
  game.livesText = game.add.text(game.world.width - 5, 5, "Lives: " + lives.current, textStyle);
  game.scorePoints = game.add.text(10, 5, "" + score.string(), textStyle);
  game.livesText.anchor.set(1, 0);
  game.lifeLostText = game.add.text(
    game.world.width * 0.5,
    game.world.height * 0.5,
    "Life lost, tap to continue",
    textStyle
  );
  game.lifeLostText.anchor.set(0.5);
  game.lifeLostText.visible = false;
}

function buildStartButton() {
  var startButton = game.add.button(
    game.world.width * 0.5,
    game.world.height * 0.5,
    "button",
    startGame,
    this,
    1,
    0,
    2
  );
  startButton.anchor.set(0.5);

}

function create() {
  theme = game.add.audio("theme");
  theme.play();
  game.add.sprite(-1, -1, "cosby");
  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.physics.arcade.checkCollision.down = false;

  buildBall();
  buildPaddle();
  initBricks();
  buildText();
  buildStartButton();
}
