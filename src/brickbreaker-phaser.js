var game = new Phaser.Game(480, 320, Phaser.AUTO, null, {preload: preload, create: create, update: update});

var ball = new Ball;
var paddle = new Paddle;
var bricks;
var newBrick;
var brickInfo;
var scoreText;
var score = new Score;
var scorePoints;
var runningScore = score.points
// var scorePoints = score.string;
var lives = new Lives;
var livesText;
var lifeLostText;
var playing = false;
var brick = new Brick;
var bricksSize = new Bricks;
var bricksLeft = bricksSize.totalBricks()
var startButton;
var width;
var height;


function loadImages() {
	game.load.image(paddle.name, paddle.imgPath);
	game.load.image(brick.name, brick.imgPath);
	game.load.spritesheet(ball.name, ball.imgPath, 20, 20);
	game.load.spritesheet('button', 'img/button.png', 120, 40);
	game.load.image('cosby', 'img/coding.jpeg')
}

// preload takes care of preloading the assets
function preload() {
	game.stage.backgroundColor = '#eee';
  game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  game.scale.pageAlignHorizontally = true;
  game.scale.pageAlignVertically = true;
	loadImages();
}




function buildBall() {
	ball = game.add.sprite(width*0.5, height-25, 'ball');
	ball.animations.add('wobble', [0,1,0,2,0,1,0,2,0], 24);
	ball.anchor.set(0.5);
	game.physics.enable(ball, Phaser.Physics.ARCADE);
	ball.body.collideWorldBounds = true;
	ball.body.bounce.set(1);
	ball.checkWorldBounds = true;
	ball.events.onOutOfBounds.add(ballLeaveScreen, this);
}

function buildPaddle() {
	paddle = game.add.sprite(width*0.5, height-5, 'paddle');
	paddle.anchor.set(0.5,1);
	game.physics.enable(paddle, Phaser.Physics.ARCADE);
	paddle.body.immovable = true;
}

function buildText() {
	textStyle = { font: '18px Arial', fill: '#0095DD' };
  scoreText = game.add.text(100, 5, 'Bricks left: '+ bricksLeft, textStyle);
  livesText = game.add.text(width-5, 5, 'Lives: '+lives.current, textStyle);
  scorePoints = game.add.text(10, 5, "" + score.string(), textStyle);
	// line 135 and 136?
	// scorePoints.setText(score.string());
	// scoreText.setText("Bricks: "+bricksLeft);
  livesText.anchor.set(1,0);
	// scorePoints.anchor.set(-0.5,5);
//   scorePoints.anchor.set(-2, 0);
  lifeLostText = game.add.text(width*0.5, height*0.5, 'Life lost, tap to continue', textStyle);
  lifeLostText.anchor.set(0.5);
  lifeLostText.visible = false;
}

function buildStartButton() {
	startButton = game.add.button(width*0.5, height*0.5, 'button', startGame, this, 1, 0, 2);
	startButton.anchor.set(0.5);
}


function create() {
	width = game.world.width
	height = game.world.height
	game.add.sprite(-1, -1, 'cosby')
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
    if(playing) {
        paddle.x = game.input.x || width*0.5;
    }
}

function initBricks() {
    bricks = game.add.group();
    for(c=0; c< bricksSize.col; c++) {
        for(r=0; r<bricksSize.row; r++) {
            var brickX = (r*(brick.width+brick.padding))+brick.offset.left;
            var brickY = (c*(brick.height+brick.padding))+brick.offset.top;
            newBrick = game.add.sprite(brickX, brickY, 'brick');
            game.physics.enable(newBrick, Phaser.Physics.ARCADE);
            newBrick.body.immovable = true;
            newBrick.anchor.set(0.5);
            bricks.add(newBrick);
        }
    }
}

function ballHitBrick(ball, brick) {
    var killTween = game.add.tween(brick.scale);
		// brick.kill();
		killTween.to({x:0,y:0}, 200, Phaser.Easing.Linear.None);
    killTween.onComplete.addOnce(function(){
			brick.kill();
    }, this);
    killTween.start();
		score.hitBrick();
		bricksLeft -= 1;
		runningScore ++
    // score.hitBrick();
		scorePoints.setText(score.string());
		scoreText.setText("Bricks: "+bricksLeft);
    // increaseDifficulty();

    if(bricksLeft <= 0) {
        alert('You won the game, congratulations!');
        location.reload()
    }
}

function increaseDifficulty() {
	// console.log('hello!')
	// ball.body.velocity.add(300, -300);
	// window.paddle.scale.x -= 0.1
}
function loseLife() {
	livesText.setText(lives.string());
	lifeLostText.visible = true;
}

function resetBallPaddle() {
	ball.reset(width*0.5, height-25);
	paddle.reset(width*0.5, height-5);
}

function ballLeaveScreen() {
    lives.lose();
    if(lives.current > 0) {
				loseLife();
        resetBallPaddle();
        game.input.onDown.addOnce(function(){
            lifeLostText.visible = false;
            ball.body.velocity.set(150, -150);
        }, this);
    }
    else {
        alert('You lost, game over!');
        location.reload();
    }
}
function ballHitPaddle(ball, paddle) {
    ball.animations.play('wobble');
    ball.body.velocity.x = -1*5*(paddle.x-ball.x);
}
function startGame() {
    startButton.destroy();
    ball.body.velocity.set(150, -150);
    playing = true;
}

// this function (needed only on JSFiddle) take care of loading the images from the remote server
function handleRemoteImagesOnJSFiddle() {
	game.load.baseURL = 'https://end3r.github.io/Gamedev-Phaser-Content-Kit/demos/';
	game.load.crossOrigin = 'anonymous';
}
