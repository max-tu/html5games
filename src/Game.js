                  
BasicGame.Game = function (game) {

	//	When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    this.game;		//	a reference to the currently running game
    this.add;		//	used to add sprites, text, groups, etc
    this.camera;	//	a reference to the game camera
    this.cache;		//	the game cache
    this.input;		//	the global input manager (you can access this.input.keyboard, this.input.mouse, as well from it)
    this.load;		//	for preloading assets
    this.math;		//	lots of useful common math operations
    this.sound;		//	the sound manager - add a sound, play one, set-up markers, etc
    this.stage;		//	the game stage
    this.time;		//	the clock
    this.tweens;	//	the tween manager
    this.world;		//	the game world
    this.particles;	//	the particle manager
    this.physics;	//	the physics manager
    this.rnd;		//	the repeatable random number generator

    //	You can use any of these from any function within this State.
    //	But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.
    
  this.fireRate = 300;
  this.bulletSpeed = 800;
  this.nextFire = 0;
  this.scoreText = null;
  this.score = 0;
  this.scoreChangeLevel = 30;
  this.playerHelth = 3;
  this.canFire = false;
  this.scoreKilledSnake = 5;
  this.scoreKilledDuck = 1;
  this.killedSnake = 0;
  this.killedDuck = 0;
  this.level = 1;
  
};

BasicGame.Game.prototype = {
  
  init: function (level){
    if(level)this.level = level;
  },

	create: function () {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

		//this.add.sprite(0, 0, 'background');
    //this.background = this.game.add.tileSprite(0, 0, this.game.width, 512, "background");
    //this.background = this.game.add.tileSprite(0, 0, this.game.width, 412, "bg");
    
    //this.stage.backgroundColor = '#B4D9E7';
    this.background = this.add.sprite(0, 0, "sky");
    //this.background = this.add.tileSprite(0, 0,this.game.width, 500, "sky");
    //this.background.autoScroll(-50, 0);
    this.nbg = this.game.add.tileSprite(0, 0, this.game.width, 500, "nbg");
    //this.nbg.autoScroll(-10, 0);
    this.md0_bg = this.game.add.tileSprite(0, 380, this.game.width, 365, "md0");
    //this.md0_bg.autoScroll(-10, 0);
    this.ubg = this.game.add.tileSprite(0, 510, this.game.width, 413, "ubg");    
    //this.ubg.autoScroll(-10, 0);
    //this.md_bg = this.game.add.tileSprite(0, 90, this.game.width, 500, "md_bg");
    //this.md_bg.autoScroll(-20, 0);
    //this.md1_bg = this.game.add.tileSprite(0, 90, this.game.width, 500, "md1");    
    //this.md1_bg.autoScroll(-20, 0);
    
    //this.floor = this.game.add.tileSprite(0, this.game.height-200, this.game.width, 200, "floor");    
    
    this.gun_fire = this.add.audio('gun_fire');
    this.explosionSound = this.add.audio('duck_explosion');
    this.duckSound = this.add.audio('duck_sound');
    this.heroHurtSound = this.add.audio('hero_hurt');
    this.scoreBoardSound = this.add.audio('scoreboardSound');
    this.scoreSound = this.add.audio('scoreSound');
    this.fallSound = this.add.audio('fallSound');
    
    
    //this.hero = new BasicGame.Hero(this.game, this.world.centerX, this.game.height); 
    //this.add.existing(this.hero);
  
    //groups
    this.bullets = this.game.add.group();
    this.ducks = this.add.group();
    this.explosions = this.add.group();
    this.roastedducks = this.add.group();
    this.snakes = this.add.group();
    this.infos = this.add.group();
    
    this.hero_leg = this.add.sprite(this.world.centerX, this.game.height  , "hero",'bottom_body');    
    this.hero_leg.y = this.game.height-(this.game.height/4);
    this.hero_leg.anchor.set(0.5, 0);
    
    this.game.physics.enable(this.hero_leg, Phaser.Physics.ARCADE);
    //this.hero_leg.body.bounce.set(0.5);
    
    
    this.hero_stomach = this.add.sprite(this.hero_leg.x, this.hero_leg.y , "hero",'slice2');
    this.hero_stomach.y = this.hero_stomach.y-this.hero_stomach.height;
    this.hero_stomach.anchor.set(0.5, 0);
   
    this.hero = new BasicGame.Hero(this.game, this.hero_stomach.x, this.hero_stomach.y); 
    
    //this.duckWack = this.game.time.events.add(2000, this.ducWackWack, this);
        
    //this.fDuck = new FDuck(this.game, 0, this.world.centerY + 100);
    //this.add.existing(this.fDuck);  
    
    this.scoreText = this.game.add.bitmapText(this.world.centerX, 0, "minecraftia", '0',  20);        
    this.killedDuckText = this.game.add.bitmapText(45, 0, "minecraftia", '0', 20);
    this.killedSnakeText = this.game.add.bitmapText(45, 32, "minecraftia", '0' , 20);
    this.infos.add(this.scoreText);
    this.infos.add(this.killedDuckText);
    this.infos.add(this.killedSnakeText);
    
    this.roastedIcon = this.add.sprite(18,16,  "roastedicon");   
    this.roastedIcon.anchor.setTo(0.5);
    this.infos.add(this.roastedIcon);
    
    this.snakeIcon = this.add.sprite(18,48,  "snakeicon"); 
    this.snakeIcon.anchor.setTo(0.5);
    this.infos.add(this.snakeIcon);
    
    
    this.lives = this.add.group();
    for(var i = 1; i <= this.playerHelth; i++){
      var heart = this.lives.create(this.game.width,10,  "heart");
      heart.scale.set(0.5);
      //heart.anchor.set(0.5);
      heart.x = heart.x - ((heart.width+2)*i);
      
      
    }
    this.infos.add(this.lives);
    this.infos.x -= this.game.width;
    this.infos.alpha = 0;
    
    this.canFire = false;
    
    this.levelText = this.game.add.bitmapText(this.world.centerX, -10, "minecraftia", 'LEVEL '+ this.level,  32); 
    this.levelText.x -= this.levelText.textWidth/2;
    this.levelText.alpha = 0;
    this.game.add.tween(this.levelText).to({alpha: 1, y:this.world.centerY},2000, Phaser.Easing.Elastic.InOut, true)
            .onComplete.addOnce(function (){ 
              this.levelText.destroy(); this.initGame();      
    } ,this);
    
    /* Quadratic, Back, Bounce, Circular, Cubic, Elastic, Exponential, Linear, Quadratic, Quartic, Quintic, Sinusoidal */
    
    this.scoreBoard = new ScoreBoard(this.game);
    //this.game.add.existing(this.scoreBoard);
    
    this.emitter = this.add.emitter(0, 0, 15);
    this.emitter.makeParticles(['feather1', 'feather2', 'feather3', 'feather4']);
    this.emitter.setRotation(-180,180);
    this.emitter.minParticleScale = 0.7;
    this.emitter.maxParticleScale  = 1;
    
    this.explosion_emitter = this.add.emitter(0,0,5);    
    this.explosion_emitter.particleClass = EE;
    this.explosion_emitter.makeParticles('explosion');
    //this.explosion_emitter.autoScale = true;
    //this.explosion_emitter.makeParticles('explosion',[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]);    
    this.explosion_emitter.minParticleScale = 0.5 ;
    this.explosion_emitter.maxParticleScale  = 1;
    this.explosion_emitter.gravaty = -200;
    //this.explosion_emitter.setScale(0.5,1,0.5,1,600);
    
    
    //this.scoreBoard.show(this.score);       
    //
    //this.midground = this.game.add.tileSprite(0, 470, this.game.width, this.game.height - 460 - 73, "midground"),    
    //this.midground.autoScroll(-100, 0);
    
    //this.ground = this.game.add.tileSprite(0, this.game.height - 73, this.game.width, 73, "ground");
    //this.ground.autoScroll(-400, 0);

		//this.playButton = this.add.button(400, 600, 'playButton', this.startGame, this, 'buttonOver', 'buttonOut', 'buttonOver');
    //this.playButton = this.add.button(this.game.world.centerX, 600, 'playButton', this.startGame, this);
    //this.playButton.anchor.setTo(.5, .5);
		
   

	},

	update: function () {		
    if(this.game.input.activePointer.isDown){
      this.fire();
    }
    
    this.physics.arcade.overlap(this.bullets, this.ducks, this.duckHit, null, this);
    //this.game.physics.arcade.collide(this.bullets, this.ducks, this.duckHit, null, this);
    this.game.physics.arcade.overlap(this.hero, this.ducks, this.duckHitHero, null, this);
    this.game.physics.arcade.overlap(this.hero_leg, this.ducks, this.duckHitHero, null, this);
    this.game.physics.arcade.overlap(this.hero_leg, this.snakes, this.snakeHit, null, this);
    this.game.physics.arcade.overlap(this.bullets, this.snakes, this.bulletHitSnake, null, this);
    
      //this.game.physics.arcade.moveToPointer(bullet, 300);

	},
  
  render: function(){
		//this.game.debug.spriteBounds(this.infos);
		//this.game.debug.spriteBounds(this.hero_leg);
		//this.game.debug.spriteBounds(this.hero_right_hand);
		//this.game.debug.spriteBounds(this.hero_body_top);
		
		//this.game.debug.spriteCorners(this.hero_head_open, true, true);
    
	},
  
  initGame: function (){
    this.canFire = true;
    this.game.add.tween(this.infos).to({alpha: 1, x:0}, 1000, Phaser.Easing.Bounce.Out, true);
    this.duckGenerator = this.game.time.events.add(1000, this.generateDucks, this);
    this.duckGenerator.timer.resume();
    this.snakeGenerator = this.game.time.events.add(1000, this.generateSnakes, this);
    this.snakeGenerator.timer.resume();
  },

	quitGame: function (pointer) {
    console.log('quit');
    //this.hero.de

		//	Here you should destroy anything you no longer need.
		//	Stop music, delete sprites, purge caches, free resources, all that good stuff.

		//	Then let's go back to the main menu.
		//this.state.start('MainMenu');
    

	},
  shutdown: function (){
    console.log('shutdown');
    this.score = 0;
    this.killedDuck = 0;
    this.killedSnake = 0;
    this.playerHelth = 3;
    //destroy hero
    this.hero_leg.destroy();
    this.hero.destroy();
    this.hero_stomach.destroy();
    //destroy scoreboard
    this.scoreBoard.destroy();
    //destroy infos
    this.lives.destroy();
    this.infos.destroy();    
    //destroy timer
    //this.duckGenerator.timer.destroy();
    //this.snakeGenerator.timer.destroy()
    //destroy background
    //destroy sound,
    //destroy snakes, ducks, bullets, explosions, roastedduck
    this.snakes.destroy();
    this.ducks.destroy();
    this.explosions.destroy();
    this.roastedducks.destroy();
    this.bullets.destroy();
    this.emitter.destroy();
    this.explosion_emitter.destroy();
  },
  fire: function() {
    if (this.game.time.now > this.nextFire && this.canFire)
    {
        this.nextFire = this.game.time.now + this.fireRate;

        //var bullet = this.bullets.getFirstDead();
        var bullet = this.bullets.getFirstExists(false);
        if(!bullet){
          bullet = new Bullet(this.game, 0, 0);
          this.bullets.add(bullet);
        }

        bullet.reset(this.hero.x, this.hero.y);
        bullet.alpha = 0;

        bullet.rotation = this.game.physics.arcade.moveToPointer(bullet, this.bulletSpeed);
        this.game.add.tween(bullet).to( { alpha: 1 }, 50, Phaser.Easing.Linear.None, true, 100);
        this.gun_fire.play();
        //bullet.rotation = this.game.physics.arcade.moveToPointer(bullet, 1000, this.game.input.activePointer, 500);
    }

  },
  generateDucks: function (){
  
    var duck = this.ducks.getFirstExists(false);
    if(!duck){
      duck = new SDuck(this.game);
    }
    this.ducks.add(duck);    
    duck.revive();    
  
    this.duckGenerator = this.game.time.events.add(Phaser.Timer.SECOND*this.rnd.realInRange(1,2), this.generateDucks, this);
    //this.duckGenerator = this.game.time.events.add(Phaser.Timer.SECOND*1, this.generateDucks, this);
    
  },
  duckHit: function (bullet, duck){    
    bullet.kill();   
    
    this.showExplosion(duck.x, duck.y)    ;
    this.emmitFeather(duck,1500);
    duck.kill();    
    
    var rDuck = this.roastedducks.getFirstExists(false);
    
    if (!rDuck) {
      rDuck = new RoastedDuck(this.game, 0, 0);
      this.roastedducks.add(rDuck);
      //this.roastedducks.angle = 0;
    } 
    else rDuck.angle = 90;
    
    rDuck.reset(duck.x, duck.y);
    this.game.add.tween(rDuck).to({angle: -90},1000,Phaser.Easing.Linear.NONE, true);
    //rDuck.body.gravity
    this.score++;
    this.scoreText.text = this.score ;
    this.scoreSound.play();
    
    this.killedDuck++;
    this.killedDuckText.text = this.killedDuck ;
    if(this.score >= this.scoreChangeLevel) {this.showScoreBoard();this.scoreBoardSound.play(); }
  },
  ducWackWack: function (){
    this.duckSound.play();
    this.duckGenerator = this.game.time.events.add(Phaser.Timer.SECOND*this.rnd.integerInRange(10,15), this.ducWackWack, this);
  },
  
  generateSnakes: function (){
    var snake = this.snakes.getFirstExists(false);
    if(!snake){
      snake = new Snake(this.game);
      this.snakes.add(snake);
    }
    snake.x = this.hero_leg.x;
    snake.y = this.hero_leg.y - this.hero_leg.height/2;
    snake.revive();    
    this.snakeGenerator = this.game.time.events.add(Phaser.Timer.SECOND*this.rnd.realInRange(12,15), this.generateSnakes, this);
  },
  snakeHit: function (hero_leg, snake){
    this.canFire = false;
    this.heroHurtSound.play();
    
    this.hero_stomach.kill();    
    hero_leg.y = hero_leg.y+1;
    this.game.add.tween(hero_leg)
            .to( { angle: -90},300, Phaser.Easing.Linear.None, true)
            .to( { alpha:0},200, Phaser.Easing.Linear.None, true,300)
            .start();
    
    y1 = hero_leg.y - 70;
    y2 = hero_leg.y +10;
    var hAngle = 90;
    if(snake.direction) hAngle = -90;       
    
    this.game.add.tween(this.hero)
            .to( { angle: hAngle, y: y1, x: '-15'  }, 150, Phaser.Easing.Linear.None)
            .to( { y: y2 }, 150, Phaser.Easing.Linear.None)
            .to( { alpha: 0}, 200, Phaser.Easing.Linear.None, false, 300).start() ;
       
    this.game.time.events.add(1000, this.showScoreBoard, this);
    
  },
  bulletHitSnake: function (bullet, snake){
    this.game.add.tween(snake).to( { alpha: 0}, 100, Phaser.Easing.Cubic.InOut, true,0,0,true);
    bullet.kill();
    snake.damage(1);
    
    if(snake.health <= 0){
      this.explosion_emitter.x = snake.x;
      this.explosion_emitter.y = snake.y;
      this.explosion_emitter.width = snake.width;
      this.explosion_emitter.height = snake.height/2;     
      
      this.explosionSound.play();
      this.explosion_emitter.start(true, 1000, null, 5);
      
      //this.showExplosion(snake.x, snake.y); 
      
      this.score = this.score + this.scoreKilledSnake;
      this.scoreText.text = this.score;
      this.scoreSound.play();
      this.killedSnake++;
      this.killedSnakeText.text = this.killedSnake ;
      if(this.score >= this.scoreChangeLevel) {this.showScoreBoard();this.scoreBoardSound.play(); }
    }
    
  },
  duckHitHero: function (hero, duck){    
    this.fallSound.play();
    duck.kill();
    this.playerHelth--;
    var life = this.lives.getFirstAlive();
    if (life) {
       life.kill();
     }
     
    this.emmitFeather(hero,1000,15);
     
    if(this.playerHelth <= 0 ) {
      this.showScoreBoard();
      this.scoreBoardSound.play();     
    } 
      
    
  },
  showExplosion: function(x, y){
    var explosion = this.explosions.getFirstExists(false);
    if(!explosion){
      explosion = new Explosion(this.game, 0, 0);
      this.explosions.add(explosion);
    }
    //this.body.velocity.x = v;
    explosion.reset(x, y);
    explosion.play('boom', 23, false, true); 
    this.explosionSound.play();
  },
  
  showScoreBoard: function (){  
    this.killDucksSnakesAlive();
    this.canFire = false;    
    this.duckGenerator.timer.pause();
    this.snakeGenerator.timer.pause();        
    this.scoreBoard.show(this.score);
  },
  killDucksSnakesAlive: function (){
    this.ducks.forEachAlive(function(a){    
      this.emmitFeather(a,1500);
      a.kill();
    },this);
    this.snakes.forEachAlive(function(b){b.kill();},this);
  },
  emmitFeather: function (a, time, quantity){
    if(!quantity) quantity = 10;
    this.emitter.x = a.x;
    this.emitter.y = a.y;
    this.emitter.start(true, time, null, quantity);
  },
};
