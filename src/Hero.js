
BasicGame.Hero = function(game, x, y) {
  Phaser.Group.call(this, game);
  
  this.enableBody = true;
  this.physicsBodyType = Phaser.Physics.ARCADE;
  /*
  this.hero_leg = this.game.add.sprite(x, y , "hero",'bottom_body');    
  this.hero_leg.y = this.game.height-this.hero_leg.height;
  this.hero_leg.anchor.set(0.5, 0);
    
  this.hero_stomach = this.game.add.sprite(this.hero_leg.x, this.hero_leg.y , "hero",'slice2');
  this.hero_stomach.y = this.hero_stomach.y-this.hero_stomach.height;
  this.hero_stomach.anchor.set(0.5, 0);
  */
  //this.input = this.game.input;
  this.facing = 1 ; // right 
  this.facingRight = 1 ; // right 
  this.facingLeft = -1 ; //left

  this.x = x;
  this.y = y;

  this.pivot.x = this.x;
  this.pivot.y = this.y;

  this.originalTopBodyPartsX = this.x;
  this.originalTopBodyPartsY = this.y;

  this.hero_body_top = this.game.add.sprite(this.x + 5, this.y + 15, "hero", 'top_body');
  this.hero_body_top.y = this.hero_body_top.y - this.hero_body_top.height;
  this.hero_body_top.anchor.set(0.5, 0);
  this.add(this.hero_body_top);

  this.hero_left_hand = this.game.add.sprite(this.hero_body_top.x + this.hero_body_top.width / 2 - 10,
          this.hero_body_top.y + this.hero_body_top.height / 2 + 2, "hero", 'left_hand');
  this.hero_left_hand.angle = 10;
  this.add(this.hero_left_hand);

  this.hero_gun = this.game.add.sprite(this.hero_body_top.x + 10, this.hero_body_top.y + this.hero_body_top.height / 2 - 10, "hero", 'gun_5');
  this.hero_gun.anchor.set(0.5, 0);
  this.add(this.hero_gun);

  this.hero_beceps = this.game.add.sprite(this.hero_body_top.x - this.hero_body_top.width / 2 + 5, this.hero_body_top.y + 10, "hero", 'beceps');
  this.hero_beceps.anchor.set(0.5, 0);
  this.add(this.hero_beceps);

  this.hero_arm = this.game.add.sprite(this.hero_beceps.x - this.hero_beceps.width / 2, this.hero_beceps.y + this.hero_beceps.height, "hero", 'arm');
  this.hero_arm.anchor.set(0, 0.5);
  this.add(this.hero_arm);

  this.hero_right_hand = this.game.add.sprite(this.hero_arm.x + this.hero_arm.width / 2 + 6, this.hero_arm.y - 10, "hero", 'right_hand');
  this.hero_arm.anchor.set(0, 0.5);
  this.add(this.hero_right_hand);
  
  this.hero_head_open = this.game.add.sprite(this.hero_body_top.x + 3, this.hero_body_top.y, "hero", 'head_open');
  this.hero_head_open.anchor.set(0.5, 0.5);
  this.add(this.hero_head_open);

  this.hero_head_close = this.game.add.sprite(this.hero_head_open.x, this.hero_head_open.y, "hero", 'head_close');
  this.hero_head_close.anchor.set(0.5, 0.5);
  this.add(this.hero_head_close);
  
  //this.rotation = 0;
};
BasicGame.Hero.prototype = Object.create(Phaser.Group.prototype);
BasicGame.Hero.constructor = BasicGame.Hero;

BasicGame.Hero.prototype.update = function() {  
  if(this.game.input.activePointer.isDown){
    if(this.game.input.x < this.x) {
      this.heroFacing(this.facingLeft);
      l_angle = Phaser.Math.angleBetween(this.game.input.x, this.game.input.y, this.x, this.y);
      this.rotation = l_angle;      
      if(l_angle > 0) this.y = this.originalTopBodyPartsY - l_angle*10;
      else this.y = this.originalTopBodyPartsY; 
    }
    else{
      this.heroFacing(this.facingRight);
      r_angle = this.game.physics.arcade.angleToPointer(this);
      this.rotation = r_angle;
      if(r_angle < 0) this.y = this.originalTopBodyPartsY + r_angle*10;
      else this.y = this.originalTopBodyPartsY;
    }
    
  }
};
BasicGame.Hero.prototype.heroFacing = function(facing){    
    if( (facing == this.facingLeft && this.facing != this.facingLeft) ||(facing == this.facingRight && this.facing != this.facingRight))
    {
      this.rotation = 0;
      this.scale.x  = facing;      
      this.facing = facing;
      var gameState = this.game.state.getCurrentState();
      gameState.hero_leg.scale.x  = facing;
      gameState.hero_stomach.scale.x  = facing;
      //this.hero_leg.scale.x  = this.hero.facing;
     //this.hero_stomach.scale.x  = this.hero.facing;
    }
   
    
  };
  