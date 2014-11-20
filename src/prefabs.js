var Explosion = function(a, b, c ) {
  
  Phaser.Sprite.call(this, a, b, c, "explosion");  
  this.anchor.setTo(.5, .5);     
  this.animations.add('boom');  
  //this.game.physics.arcade.enableBody(this);    
};
Explosion.prototype = Object.create(Phaser.Sprite.prototype);
Explosion.constructor = Explosion;
/*=============================================================================*/
var RoastedDuck = function(game, x, y ) {
  
  Phaser.Sprite.call(this, game, x, y, "roasted");  
  this.anchor.setTo(.1, .1); 
  this.scale.x = 0.4;
  this.scale.y = 0.4;
  this.game.physics.arcade.enableBody(this);    
  this.checkWorldBounds = !0;
  this.outOfBoundsKill = !0;
  this.body.allowGravity = true;
  this.body.gravity.y = 300;
  this.events.onRevived.add(this.onRevived, this);
  this.events.onKilled.add(this.onKilled, this);
};
RoastedDuck.prototype = Object.create(Phaser.Sprite.prototype);
RoastedDuck.constructor = RoastedDuck;
RoastedDuck.prototype.onRevived = function (){  };
RoastedDuck.prototype.onKilled = function (){  };
/*=============================================================================*/
var Snake = function(game, x, y ) {
  
  Phaser.Sprite.call(this, game, x, y, "snake",0);  
  //this.animations.add('crawl',[1,2,3,4,5,6,7,8,7,6,5,4,3,2]);
  this.animations.add('crawl',[1,2,3,4,5,6,7,8]);
  this.play('crawl', 8,true);     
  this.anchor.setTo(0.5);   
  //this.scale.setTo(0.5);
  
  this.game.physics.arcade.enableBody(this);    
  this.checkWorldBounds = !0;
  this.outOfBoundsKill = !0; 
  
  this.speed = 150;
  this.direction = 1; //right
  //this.body.velocity.x = -150;
  
  this.events.onRevived.add(this.onRevived, this);
  this.events.onKilled.add(this.onKilled, this);
};
Snake.prototype = Object.create(Phaser.Sprite.prototype);
Snake.constructor = Snake;
Snake.prototype.onRevived = function (){ 
  this.health = 3;
  var startFrom = this.game.rnd.integerInRange(1,2);
  //startFrom = 1;
  switch (startFrom){
    case 1: /*left*/
      this.scale.x = -this.scale.x;
      this.direction = -this.direction;
      this.x = 0;      
      this.body.velocity.x = this.speed;      
      break;
    default :  /* right*/
      this.body.velocity.x = -this.speed;
      this.x = this.game.width;
  }
   
  
};
Snake.prototype.onKilled = function (){  
  this.resetSnake();
};
Snake.prototype.resetSnake = function (){  
  if(this.scale.x < 0 ) this.scale.x = -this.scale.x ;
  if(this.direction < 0 ) this.direction = -this.direction ;
  
 };
/*=============================================================================*/
ScoreBoard = function (g){
  Phaser.Group.call(this, g);
  
  /*this.panel = this.game.add.sprite(0, 0, "panel"); 
  this.panel.width = this.game.width*6/7; 
  this.panel.height = this.game.height*6/7; 
  this.add(this.panel);
  
  this.y = -this.game.height; 
  this.x = 0 ;
  this.alpha = 0; */
  var b, font = 'desyrel';
  
  b = this.game.add.bitmapData(this.game.width*6/7, this.game.height*6/7), 
  b.ctx.fillStyle = "#000", 
  b.ctx.fillRect(0, 0, this.game.width, this.game.height), 

  this.c = this.game.add.sprite(0, 0, b), this.c.alpha = .5, this.add(this.c);
  
  this.pivot.x = b.width/2;
  this.pivot.y = b.height/2;
  this.y = -this.game.height;
  this.x = -this.game.width;
  //this.alpha = 0;
  
  this.curState = this.game.state.getCurrentState();
  
  // level text
  this.levelText = this.game.add.bitmapText(0, 50, font, "LEVEL", 36), 
  //this.levelText.x = this.c.width / 2 - this.levelText.textWidth / 2, 
  this.add(this.levelText);
  
  // win/lose message
  this.msgText = this.game.add.bitmapText(0, 100, font, "You Won/Lost", 32), 
  //this.msgText.x = this.c.width / 2 - this.msgText.textWidth / 2, 
  this.add(this.msgText);
  
  // score for snakes
  this.numSnakeText = this.game.add.bitmapText(0, 150, font, "000 x", 32), 
  this.numSnakeText.x = this.c.width / 2 - this.numSnakeText.textWidth / 2, 
  this.add(this.numSnakeText); 
  
  this.snakeIcon = this.game.add.sprite(0, 150, "snakeicon"); 
  this.snakeIcon.x = this.c.width / 2 - this.snakeIcon.width / 2 + 64; 
  this.add(this.snakeIcon);
  
  // score for ducks
  this.numDuckText = this.game.add.bitmapText(0, 200, font, "000 x", 32), 
  this.numDuckText.x = this.c.width / 2 - this.numDuckText.textWidth / 2, 
  this.add(this.numDuckText); 
  
  this.duckIcon = this.game.add.sprite(0, this.numDuckText.y, "roastedicon");
  //this.duckIcon.anchor.set(0, 1);
  this.duckIcon.x = this.c.width / 2 - this.duckIcon.width /2 +64; 
  this.duckIcon.y = this.duckIcon.y + 16; 
  this.add(this.duckIcon);
  
  //total score
  this.scoreText = this.game.add.bitmapText(0, 250, font, "Your Score: ", 32), 
  this.scoreText.x = this.c.width / 2 - this.scoreText.textWidth / 2, 
  this.add(this.scoreText);
  
  this.btnReplay = this.game.add.button(0, 350, "btnReplay", function(){
    this.game.state.start("Game", true, false, this.curState.level);
  }, this);  
  this.add(this.btnReplay);
   
  
  this.btnplay = this.game.add.button(0, 350, "btnPlay", function(){
    this.game.state.start("Game", true, false, this.curState.level+1);
  }, this);  
  this.add(this.btnplay);
  
};
ScoreBoard.prototype = Object.create(Phaser.Group.prototype),
ScoreBoard.constructor = ScoreBoard,

ScoreBoard.prototype.show = function(score){  
  
  var scoreChangeLevel = this.curState.scoreChangeLevel;  
  this.levelText.setText("LEVEL " + this.curState.level);   
  this.levelText.x = this.c.width / 2 - this.levelText.textWidth / 2; 
  
  
  if(score >= scoreChangeLevel){
    this.msgText.text = 'You Won';
    this.btnplay.visible = true;
    this.btnReplay.x = this.c.width / 2 - this.btnReplay.width / 2 - 64;
    this.btnplay.x = this.c.width / 2 - this.btnplay.width / 2 + 64; 
  }else{
    this.btnplay.visible = false;
    this.msgText.text = 'You Lose';
    this.btnReplay.x = this.c.width / 2 - this.btnReplay.width / 2
  }
  this.msgText.updateText();
  this.msgText.x = this.c.width / 2 - this.msgText.textWidth / 2;            
  
  
  this.numSnakeText.setText(this.curState.killedSnake.toString() + ' x'); 
  this.numSnakeText.x = this.c.width / 2 - this.numSnakeText.textWidth / 2;
  
  this.numDuckText.text = this.curState.killedDuck.toString() + ' x';  
  this.numDuckText.x = this.c.width / 2 - this.numDuckText.textWidth / 2;            
  
  this.scoreText.text = 'Your Score: ' + score;
  
  this.scoreText.x = this.c.width / 2 - this.scoreText.textWidth / 2; 
  
  
 // this.game.add.tween(this).to({ alpha: 1, y: this.game.height / 2 - this.panel.height / 2 }, 1e3, Phaser.Easing.Exponential.Out, !0, 0);
 this.game.add.tween(this).to({ x: this.game.width/2, y: this.game.height/2}, 1e3, Phaser.Easing.Bounce.Out, !0); 
};
//=============================================================
var EE = function(a, b, c ) {
  
  //Phaser.Particle.call(this, a, b, c, "explosion",1);  
  Phaser.Particle.call(this, a, b, c, "explosion",1);  
  this.anchor.setTo(.5, .5);     
  this.animations.add('exp');  
  //this.scale.x = 0.5;
  //this.scale.y = 0.5;
  //this.game.physics.arcade.enableBody(this);  
  
};
EE.prototype = Object.create(Phaser.Particle.prototype);
EE.constructor = EE;
EE.prototype.onEmit = function (){  
  this.play('exp', 23, false, true);
};

