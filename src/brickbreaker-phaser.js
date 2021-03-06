function startMyGame() {

  var hackyStartButton;

  function MyGame(){
    this.game = new Phaser.Game(480, 320, Phaser.AUTO, null, {
      preload: preload,
      create: create,
      update: update,
      playing: false,
      scorePoints: null,
      livesText: null,
      lifeLostText: null,
    	paddleXVelocity: null
    });
    this.lives = new Lives()
    this.score = new Score()
    this.bricksSize = new Bricks
  }

  // works but with globals //
  var myGame = new MyGame()
  var game = myGame.game
  var lives = myGame.lives
  var score = myGame.score
  // end of works but with globals //

  var bricksSize = myGame.bricksSize
  window.bricksLeft = myGame.bricksSize.totalBricks();

  function loadImages() {
    var paddle = new Paddle();
    var ball = new Ball();
    var brick = new Brick();
    game.load.image(paddle.name, paddle.imgPath);
    game.load.image(brick.name, brick.imgPath);
    game.load.spritesheet(ball.name, ball.imgPath, 20, 20);
    game.load.spritesheet("button", "img/button.png", 120, 40);
    game.load.image("background", "img/bg2.jpg");
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

  function buildBall() {
    ball = game.add.sprite(game.world.width * 0.5, game.world.height - 25, "ball");
    ball.scale.setTo(1, 1);
    ballHitSFX = game.add.audio("ballHit", 1);
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
    paddleHitSFX = game.add.audio("paddleHit", 1);
    paddle.anchor.set(0.5, 1);
    game.physics.enable(paddle, Phaser.Physics.ARCADE);
    paddle.body.immovable = true;
  }

  function buildText() {
    textStyle = { font: "18px Arial", fill: "#0095DD" };
    scoreText = game.add.text(100, 5, "Bricks left: " + window.bricksLeft, textStyle);
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
    hackyStartButton = game.add.button(
      game.world.width * 0.5,
      game.world.height * 0.5,
      "button",
      startGame,
      this,
      1,
      0,
      2
    );
    hackyStartButton.anchor.set(0.5);
  }

  function create() {
    theme = game.add.audio("theme", 0.1, true);
    theme.play();
    game.add.sprite(-1, -1, "background");
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.checkCollision.down = false;

    buildBall();
    buildPaddle();
    initBricks();
    buildText();
    buildStartButton();
  }

  function update() {
    game.physics.arcade.collide(ball, paddle, ballHitPaddle);
    game.physics.arcade.collide(ball, bricks, ballHitBrick);
    if (game.playing) {
      paddle.x = game.input.x || game.world.width * 0.5;
    }
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

  function ballHitBrick(ball, brick) {
    var killTween = game.add.tween(brick.scale);
    brick.kill();
    // killTween.to({ x: 0, y: 0 }, 200, Phaser.Easing.Linear.None);
    // killTween.onComplete.addOnce(function() {
    //   console.log(brick);
    //   brick.kill();
    // }, this);
    killTween.start();
    score.hitBrick();
    window.bricksLeft -= 1;
    game.scorePoints.setText(score.string());
    scoreText.setText("Bricks: " + window.bricksLeft);
    // increaseDifficulty();

    if (window.bricksLeft <= 0) {
      alert("Way to go Morty, you *buuuuurrpp* killed Rick!");
      alert("Oh Jeez Rick I did-- I duh-- didn't meant to! Oh jeez oh god");
      location.reload()
    }
    ballHitSFX.play();
  }

  // function increaseDifficulty() {
    // console.log('hello!')
    // ball.body.velocity.add(300, -300);
    // window.paddle.scale.x -= 0.1
  // }

  function loseLife() {
    game.livesText.setText(lives.string());
    game.lifeLostText.visible = true;
  }

  function resetBallPaddle() {
    ball.reset(game.world.width * 0.5, game.world.height - 25);
    paddle.reset(game.world.width * 0.5, game.world.height - 5);
  }

  function ballLeaveScreen() {
  	loseLifeSFX = game.add.audio('loseLife', 1)
  	loseLifeSFX.play()
    lives.lose();
    if (lives.current > 0) {
      loseLife();
      resetBallPaddle();
      game.input.onDown.addOnce(function() {
        game.lifeLostText.visible = false;
        ball.body.velocity.set(150, -150);
      }, this);
    } else {
      alert("You lost, game over!");
      location.reload();
    }
  }
  function ballHitPaddle(ball, paddle) {
    ball.animations.play("wobble");
    ball.body.velocity.x += -1 * 5 * (paddle.x - ball.x);
    paddleHitSFX.play();
  }

  function startGame() {
    hackyStartButton.destroy();
    ball.body.velocity.set(150, -150);
    game.playing = true;
  }

  window.startGame = startGame;
  window.preload = preload;
  window.create = create;
  window.ballLeaveScreen = ballLeaveScreen;

}

startMyGame();
