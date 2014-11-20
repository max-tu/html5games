var Coin = function(a, b, c, d, e ) {  
  d = d || "coin";
  e = e || 0;
  
  Phaser.Sprite.call(this, a, b, c, d, e);  
  //this.anchor.setTo(.5, .5); 
  this.scale.setTo(0.5, 0.5);
  //this.scale.y = 0.7;
  
  //this.animations.add('slying',[1,2,3,4,5,6,5,4,3,2]);
  //`this.play('slying', 15, true);      
  
  //this.game.physics.arcade.enableBody(this);  
  
  //this.checkWorldBounds = !0;
  //this.outOfBoundsKill = !0;
  //this.body.allowGravity = false;
  //this.game.physics.enable(this, Phaser.Physics.ARCADE);
  //this.body.velocity.x = 250;
  //this.events.onRevived.add(this.onRevived, this);
  
};
Coin.prototype = Object.create(Phaser.Sprite.prototype);
Coin.constructor = Coin;