var FDuck = function(a, b, c ) {
  
  Phaser.Sprite.call(this, a, b, c, "fduck");  
  this.anchor.setTo(.5, .5); 
  this.scale.x = -0.5;
  this.scale.y = 0.5;
  
  this.animations.add('flying',[1,2,3,4,5,,4,3,2]);
  this.play('flying', 12, true);
  
  this.game.physics.enable(this, Phaser.Physics.ARCADE);    
  
  this.checkWorldBounds = !0;
  this.outOfBoundsKill = !0;
  
  this.body.allowGravity = false;   
  this.body.velocity.x = 250;
  
};
FDuck.prototype = Object.create(Phaser.Sprite.prototype);
FDuck.constructor = FDuck;