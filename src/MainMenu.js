BasicGame.MainMenu = function (game) { 

};

BasicGame.MainMenu.prototype = {

	create: function () {
    
	},

	update: function () {     
		//	Do some nice funky main menu effect here
	},

	startGame: function (pointer) {

		//	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
		//this.music.stop();

		//	And start the actual game
		this.state.start('Game');

	},

	render: function(){
		//this.game.debug.spriteBounds(this.snakes);
		//this.game.debug.spriteBounds(this.hero_leg);
		//this.game.debug.spriteBounds(this.hero_right_hand);
		//this.game.debug.spriteBounds(this.hero_body_top);
		
		//this.game.debug.spriteCorners(this.hero_head_open, true, true);
    
	},
  
 
  

};
