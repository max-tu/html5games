uboat.Preloader = function(e) {
    uboat.GAME_WIDTH = 640;
    uboat.GAME_HEIGHT = 960
};
uboat.Preloader.prototype = {
    preload: function() {
        this.stage.backgroundColor = "#B4D9E7";
        this.preloadBar = this.add.sprite((uboat.GAME_WIDTH - 311) / 2, (uboat.GAME_HEIGHT - 27) / 2, "preloaderBar");
        this.load.setPreloadSprite(this.preloadBar);
        this.load.setPreloadSprite(this.preloadBar);
        this.load.image("title", "img/title.png");
        this.load.image("background", "img/background.png");
        this.load.image("submarine", "img/submarine.png");
        this.load.spritesheet("gameobjs", "img/gameobjs.png", 64, 64);
        this.load.spritesheet("explosions", "img/explosions.png", 160, 160);
        this.load.spritesheet("particles", "img/particles.png", 32, 32);
        this.load.spritesheet("backobjs", "img/backobjs.png", 32, 32);
        this.load.image("ingamepanel", "img/ingamepanel.png");
        this.load.spritesheet("button", "img/button.png", 320, 72);
        this.load.spritesheet("buttonicon", "img/buttonicon.png", 128, 128);
        this.load.spritesheet("levelicons", "img/levelicons.png", 96, 96);
        this.load.spritesheet("tutorialicons", "img/tutorialicons.png", 96, 96);
        var e = ".json";
        console.log("preloader - fileFormat=" + e);
        this.load.bitmapFont("myfont", "font/font.png", "font/font" + e);
        this.load.audio("gui_back", "snd/gui_back.ogg");
        this.load.audio("gui_button", "snd/gui_button.ogg");
        this.load.audio("gui_forward", "snd/gui_forward.ogg");
        this.load.audio("gui_denied", "snd/gui_denied.ogg");
        this.load.audio("coin", "snd/coin4.wav");
        this.load.audio("ruby", "snd/ping.wav");
        this.load.audio("treasure", "snd/treasure3.wav");
        this.load.audio("squid", "snd/squid.wav");
        this.load.audio("fizzle", "snd/fizzle.wav");
        this.load.audio("explode", "snd/explode.wav")
    },
    create: function() {
        this.state.start("MainMenu")
    }
};