var SDuck = function(a, b, c ) {
  
  Phaser.Sprite.call(this, a, b, c, "sduck", 0);  
  this.anchor.setTo(.6, .6); 
  this.scale.x = 0.5;
  this.scale.y = 0.5;
  
  this.startX = 0;
  this.startY = 0;
  this.endX = 0;
  this.endY = 0;
  this.speed = 0;
  this.maxSpeed = 350;
  this.minSpeed = 200;
  
  this.animations.add('sflying',[1,2,3,4,5,6,5,4,3,2]);
  this.play('sflying', 15, true);      
  
  this.game.physics.arcade.enableBody(this);  
  
  this.checkWorldBounds = !0;
  this.outOfBoundsKill = !0;
  this.body.allowGravity = false;
  //this.game.physics.enable(this, Phaser.Physics.ARCADE);
  //this.body.velocity.x = 250;
  this.events.onRevived.add(this.onRevived, this);
  this.events.onKilled.add(this.onKilled, this);
};
SDuck.prototype = Object.create(Phaser.Sprite.prototype);
SDuck.constructor = SDuck;



SDuck.prototype.onRevived = function (){
  this.resetS();
  var route = this.game.rnd.integerInRange(1,4);  
  var startFrom = this.game.rnd.integerInRange(1,4);
  this.speed = this.game.rnd.integerInRange(this.minSpeed,this.maxSpeed);
 //route = 4;
 //startFrom=4;
  switch (route){
    case 3:      
      this.zigzagMove(startFrom);
      break;
    case 4:      
      this.moveToHero();
      break;  
    case 2:      
      this.askewMove(startFrom);
      break;
    default:      
      this.straightMove(startFrom);         
  } 
  
};

SDuck.prototype.onKilled = function (){
  this.resetS();
};

SDuck.prototype.moveToHero = function(){  
  var startFrom = this.game.rnd.integerInRange(1,3);
  this.startPoint(startFrom);
  this.reset(this.startX, this.startY);  
  var hero = this.game.state.getCurrentState().hero;
  if(this.startX >= hero.x ) { this.scale.x = -this.scale.x;  }
  this.game.physics.arcade.moveToObject(this, hero, this.speed);
  
} ;
SDuck.prototype.straightMove = function(startFrom){  
  var velocity = this.speed;
  var velocityX = 0;
  var velocityY = 0;
  
  this.startPoint(startFrom);
  
  switch (startFrom){
    case 1:
      velocityX = velocity;      
      break;
    case 2:      
      velocityY = velocity;
      this.angle = 90;
      break;
    case 3:      
      velocityX = -velocity;
      this.scale.x = -this.scale.x;
      break;
    case 4:      
      velocityY = -velocity;
      this.angle = -70;
      break;        
  }
  this.reset(this.startX, this.startY);  
  
  this.body.velocity.x = velocityX;
  this.body.velocity.y = velocityY;
  
  
} ;
SDuck.prototype.askewMove = function(startFrom){
  
    this.startPoint(startFrom);
    
    var endTo = this.game.rnd.integerInRange(1,4);
    if(endTo == startFrom) {
      endTo++;
      if (endTo > 4) endTo = 1;
    }
    
    this.endPoint(endTo);    
       
    this.reset(this.startX, this.startY);  
    //var angle = this.game.math.radToDeg(this.game.physics.arcade.angleToXY(this, this.endX, this.endY ));
    //var angle = this.game.physics.arcade.angleToXY(this, this.endX, this.endY );
    //if(this.startX > this.endX || this.scale.y < 0) {
      if(this.startX > this.endX ) {
      //this.scale.y = -this.scale.y;      
      //angle = Phaser.Math.angleBetween(this.endX, this.endY, this.x, this.y);
      this.scale.x = -this.scale.x;      
    }
    //this.rotation = angle;
    //this.rotation = this.game.math.angleBetween(this.startX, this.startY, this.endX, this.endY);
    //console.log(this.game.physics.arcade.angleToXY(this, this.endX, this.endY ));
    this.game.physics.arcade.moveToXY(this, this.endX, this.endY, this.speed);
    
    
} ;
SDuck.prototype.zigzagMove = function(startFrom){  
  this.startPoint(startFrom);
  var mX =0, mY = 0 ;
  mX = this.rndByX();
  mY = this.rndByY();
  //if(this.scale.x < 0 ) this.scale.x = -this.scale.x ;
  if(this.startX > mX) {
      this.scale.x = -this.scale.x;      
    }
  
  var maxTime = Phaser.Timer.SECOND*this.game.rnd.realInRange(1,3);
  this.reset(this.startX, this.startY); 
  this.game.physics.arcade.moveToXY(this, mX, mY, this.speed, maxTime);
  
  var endTo = this.game.rnd.integerInRange(1,4);
  this.endPoint(endTo);
  
  this.game.time.events.add(maxTime, function(){
    
    if(this.scale.x < 0 ) {this.scale.x = -this.scale.x ;}
    if(mX > this.endX ) {
      this.scale.x = -this.scale.x;      
    }
    this.game.physics.arcade.moveToXY(this, this.endX, this.endY, this.speed);
  }, this);
  
  
} ;
SDuck.prototype.rndByY = function(){
  return this.game.rnd.integerInRange(0,this.game.height);
} ;
SDuck.prototype.rndByX = function(){
  return this.game.rnd.integerInRange(0,this.game.width);
} ;
SDuck.prototype.startPoint = function(startFrom){
  switch (startFrom){
    case 1:      
      this.startY = this.rndByY();      
      break;
    case 2:      
      this.startX = this.rndByX();      
      break;
    case 3:      
      this.startX = this.game.width;
      this.startY = this.rndByY();      
      break;
    case 4:      
      this.startX = this.rndByX();
      this.startY = this.game.height;      
      break;        
  }
  
} ;

SDuck.prototype.endPoint = function(endTo){
  switch (endTo){
    case 1:
      //console.log('left');
      this.endY = this.rndByY();      
      break;
    case 2:
      //console.log('top');            
      this.endX = this.rndByX();      
      break;
    case 3:
      //console.log('right');
      this.endX = this.game.width;
      this.endY = this.rndByY();            
      break;
    case 4:
      //console.log('bottom');
      this.endX = this.rndByX();
      this.endY = this.game.height;      
      break;        
  }
  
} ;
SDuck.prototype.resetS = function(){
  this.body.velocity.x = 0;
  this.body.velocity.y = 0;
  
  if(this.scale.x < 0 ) this.scale.x = -this.scale.x ;
  if(this.scale.y < 0 ) this.scale.y = -this.scale.y ;
  
  this.angle = 0;
  this.rotation = 0; 
  
  this.startX = 0;
  this.startY = 0;
  this.endX = 0;
  this.endY = 0;
};