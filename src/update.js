function ballHitBrick(ball, brick) {
  var killTween = game.add.tween(brick.scale);
  // brick.kill();
  killTween.to({ x: 0, y: 0 }, 200, Phaser.Easing.Linear.None);
  killTween.onComplete.addOnce(function() {
    console.log(brick);

    brick.kill();
  }, this);
  killTween.start();
  score.hitBrick();
  bricksLeft -= 1;
  game.scorePoints.setText(score.string());
  scoreText.setText("Bricks: " + bricksLeft);
  // increaseDifficulty();

  if (bricksLeft <= 0) {
    alert("Way to go Morty, you *buuuuurrpp* killed Rick!");
    alert("Oh Jeez Rick I did-- I duh-- didn't meant to! Oh jeez oh god");
    location.reload();
  }
  ballHit.play();
}

function update() {
  game.physics.arcade.collide(ball, paddle, ballHitPaddle);
  game.physics.arcade.collide(ball, bricks, ballHitBrick);
  if (game.playing) {
    paddle.x = game.input.x || game.world.width * 0.5;
  }
}

function increaseDifficulty() {
  // console.log('hello!')
  // ball.body.velocity.add(300, -300);
  // window.paddle.scale.x -= 0.1
}
function loseLife() {
  game.livesText.setText(lives.string());
  game.lifeLostText.visible = true;
}

function resetBallPaddle() {
  ball.reset(game.world.width * 0.5, game.world.height - 25);
  paddle.reset(game.world.width * 0.5, game.world.height - 5);
}

function ballLeaveScreen() {
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
  ball.body.velocity.x = -1 * 5 * (paddle.x - ball.x);
  paddleHit.play();
}
function startGame(startButton) {
  startButton.destroy();
  ball.body.velocity.set(150, -150);
  game.playing = true;
}
