
BasicGame.Preloader = function (game) {

	this.background = null;
	this.preloadBar = null;

	this.ready = false;

};

BasicGame.Preloader.prototype = {

	preload: function () {

		//	These are the assets we loaded in Boot.js
		//	A nice sparkly background and a loading progress bar
		//this.background = this.add.sprite(0, 0, 'preloaderBackground');
    //this.background = this.add.tileSprite(0, 0, this.game.width, 682, 'preloaderBackground');
    this.background = this.add.sprite(this.game.world.centerX, this.game.world.centerY, "splash"),
    this.background.anchor.setTo(.5, .5);
    
		this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'preloaderBar');
    this.preloadBar.anchor.setTo(.5, .5);

		//	This sets the preloadBar sprite as a loader sprite.
		//	What that does is automatically crop the sprite from 0 to full-width
		//	as the files below are loaded in.
		this.load.setPreloadSprite(this.preloadBar);

		//	Here we load the rest of the assets our game needs.
		//	As this is just a Project Template I've not provided these assets, the lines below won't work as the files themselves will 404, they are just an example of use.
    this.load.image("sky", "images/sky.jpg");
    this.load.image("nbg", "images/nbg.png");
    
    this.load.image("md0", "images/md01.png");
    this.load.image("ubg", "images/ubg1.png");
    this.load.image("bullet", "images/bullet.png");
    this.load.image("roasted", "images/roastedduck-s.png");
    this.load.image("roastedicon", "images/roastedduck-icon.png");
    this.load.image("snakeicon", "images/snake_icon.png");
    
    this.load.image("feather1", "images/feather1.png");
    this.load.image("feather2", "images/feather2.png");
    this.load.image("feather3", "images/feather3.png");
    this.load.image("feather4", "images/feather4.png");
    
    this.load.image("heart", "icons/h2.png");
    this.load.image("btnReplay", "icons/Button-Reload-icon.png");
    this.load.image("btnPlay", "icons/Button-Play-icon.png");
    
    this.load.spritesheet('explosion', 'images/explosion.png', 64, 64, 23);
    //this.load.spritesheet('explosion1', 'images/explosion1.PNG', 64, 64, 16);
    //this.load.spritesheet('explosion2', 'images/explosion2.png', 32, 32, 11);

    this.load.atlas('hero', 'images/character/herosheet.png', 'images/character/hero-jsonarray.json');
    this.load.atlas('sduck', 'images/character/simple-duck.png', 'images/character/simple-duck-array.json');
    this.load.atlas('snake', 'images/character/snake.png', 'images/character/snake.json');
    //this.load.atlasJSONArray('sduck', 'images/character/simple-duck.png', 'images/character/simple-duck-array.json');
    
    //this.load.atlas('hero', 'images/character/herosheet.png', 'hero-jsonhash.json',Phaser.loader.TEXTURE_ATLAS_JSON_HASH);
    //this.load.atlasJSONArray('hero', 'images/character/herosheet.png', 'hero-jsonarray.json');
    //this.load.atlasJSONHash('hero', 'images/character/herosheet.png', 'hero-jsonhash.json');
    //this.load.atlas('coin', 'images/coin-spritesheet.png', 'images/coin-spritesheet-definition.json');
    //this.load.audio('gun_fire', 'audio/fall_100.mp3');    
    this.load.audio('gun_fire', 'audio/gunfire.mp3');    
    this.load.audio('duck_explosion', 'audio/duck-explosion.wav');    
    this.load.audio('duck_sound', 'audio/quackquack.wav');
    this.load.audio('hero_hurt', 'audio/herohurt1.mp3');
    this.load.audio('scoreboardSound', 'audio/scoreboard.mp3');
    this.load.audio('scoreSound', 'audio/score.wav');
    this.load.audio('fallSound', 'audio/fall.wav');
    
    
//this.load.image('titlepage', 'images/title.jpg');
		//this.load.atlas('playButton', 'images/play_button.png', 'images/play_button.json');
    //this.load.image('playButton', 'images/start-button.png');
		//this.load.audio('titleMusic', ['audio/Pamgaea.mp3']);
		this.load.bitmapFont('minecraftia', 'fonts/minecraftia.png', 'fonts/minecraftia.xml');
    this.load.bitmapFont('desyrel', 'fonts/desyrel.png', 'fonts/desyrel.xml');
    
		//	+ lots of other required assets here

	},

	create: function () {

		//	Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
		this.preloadBar.cropEnabled = false;

	},

	update: function () {
    this.state.start('Game');

		//	You don't actually need to do this, but I find it gives a much smoother game experience.
		//	Basically it will wait for our audio file to be decoded before proceeding to the MainMenu.
		//	You can jump right into the menu if you want and still play the music, but you'll have a few
		//	seconds of delay while the mp3 decodes - so if you need your music to be in-sync with your menu
		//	it's best to wait for it to decode here first, then carry on.
		
		//	If you don't have any music in your game then put the game.state.start line into the create function and delete
		//	the update function completely.
		
		//if (this.cache.isSoundDecoded('hero_hurt'))
		//{
			//this.ready = true;
			//this.state.start('MainMenu');
		//}

	}

};




