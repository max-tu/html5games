Bullet = function(a, b, c) {
  Phaser.Sprite.call(this, a, b, c, "bullet");
  
  this.anchor.setTo(.5, .5);  
  
  this.checkWorldBounds = !0;
  this.outOfBoundsKill = !0;  
  
  this.scale.x = 0.6;
  this.scale.y = 0.6;
  
  this.game.physics.enable(this, Phaser.Physics.ARCADE);
};
Bullet.prototype = Object.create(Phaser.Sprite.prototype);
Bullet.constructor = Bullet;