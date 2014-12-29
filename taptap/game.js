var STATE_INTRO = 0;
var STATE_PLAYING = 1;
var STATE_ATBOTTOM = 2;
var SCROLL_SPEED = -1;
var EXPL_MINE = 1;
var EXPL_INK = 2;
var EXPL_ELECTRO = 3;
var CHEAT_INVINCIBLE = false;
var CHEAT_RUBY = false;
var GLOBAL_PAUSE_FLAG = false;
uboat.Game = function(e) {
    this.game = e;
    this._player = null;
    this._objGroup = null;
    this._explosionGroup = null;
    uboat._popupText = null;
    uboat._levelstate = STATE_INTRO;
    uboat._stateCountDown = 0;
    this._leveldepth = 0;
    this._levelIndex = 0;
    this._partsIndex = 0;
    this._partsBar = 0;
    this._backobjsCountdown = 0;
    this._collectedCoins = 0;
    this._collectedRuby = 0;
    this._collectedTreasure = 0;
    this._totalCoins = 0;
    this._totalRuby = 0;
    this._totalTreasure = 0;
    this._levelGameOver = 0;
    this._strCheatCode = "";
    this._panelGameOver = null;
    this._panelStar1 = null;
    this._panelStar2 = null;
    this._panelStar3 = null;
    this._panelText1 = null;
    this._panelText2 = null;
    this._panelText3 = null;
    this._btnGoback = null;
    this._btnRestart = null;
    this._btnNextLevel = null
};
uboat.Game.prototype = {
    create: function() {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.add.sprite(0, 0, "background");
        this._backobjsGroup = [];
        backgroundCreateBubbles(this.game, this._backobjsGroup);
        this._player = new Submarine(this.game);
        this.game.world.add(this._player);
        this.game.physics.enable(this._player, Phaser.Physics.ARCADE);
        this.emitCoin = this.game.add.emitter(0, 0, 200);
        this.emitCoin.makeParticles("particles", [0]);
        this.emitCoin.setXSpeed(-400, +400);
        this.emitCoin.setYSpeed(-400, +400);
        this.emitCoin.setRotation(-1600, +1600);
        this.emitCoin.setScale(1, .1, 1, .1, 1600, Phaser.Easing.None);
        this.emitCoin.gravity = 0;
        this.emitExplode = this.game.add.emitter(0, 0, 50);
        this.emitExplode.makeParticles("particles", [3, 4, 5, 6]);
        this.emitExplode.setXSpeed(-240, +240);
        this.emitExplode.setYSpeed(-240, +240);
        this.emitExplode.setRotation(-720, +720);
        this.emitExplode.setScale(2, .1, 2, .1, 2e3, Phaser.Easing.None);
        this.emitExplode.gravity = 0;
        this._objGroup = this.game.add.group();
        this._objGroup.enableBody = true;
        this._objGroup.physicsBodyType = Phaser.Physics.ARCADE;
        this._explosionGroup = this.game.add.group();
        this.emitInkblob = this.game.add.emitter(0, 0, 50);
        this.emitInkblob.makeParticles("particles", [7]);
        this.emitInkblob.setXSpeed(0, 0);
        this.emitInkblob.setYSpeed(0, -50);
        this.emitInkblob.setRotation(0, 0);
        this.emitInkblob.setScale(.1, 1, .1, 1, 800, Phaser.Easing.None);
        this.emitInkblob.gravity = 0;
        this._panelGameOver = this.game.add.group();
        var e = this.game.add.sprite(0, 0, "ingamepanel");
        this._panelCaption = this.game.add.bitmapText(144, 16, "myfont", "Excellent!", 48);
        this._panelCaption.align = "center";
        this._panelStar1 = this.game.add.sprite(48, 160, "buttonicon", 13);
        this._panelStar2 = this.game.add.sprite(176, 160, "buttonicon", 13);
        this._panelStar3 = this.game.add.sprite(304, 160, "buttonicon", 13);
        var t = this.game.add.sprite(80, 200, "gameobjs", 63);
        var n = this.game.add.sprite(208, 200, "gameobjs", 0);
        var r = this.game.add.sprite(336, 200, "gameobjs", 8);
        this._panelText1 = this.game.add.bitmapText(80, 280, "myfont", "0/0", 32);
        this._panelText2 = this.game.add.bitmapText(208, 280, "myfont", "0/0", 32);
        this._panelText3 = this.game.add.bitmapText(336, 280, "myfont", "0/0", 32);
        this._panelGameOver.add(e);
        this._panelGameOver.add(this._panelCaption);
        this._panelGameOver.add(this._panelStar1);
        this._panelGameOver.add(this._panelStar2);
        this._panelGameOver.add(this._panelStar3);
        this._panelGameOver.add(t);
        this._panelGameOver.add(n);
        this._panelGameOver.add(r);
        this._panelGameOver.add(this._panelText1);
        this._panelGameOver.add(this._panelText2);
        this._panelGameOver.add(this._panelText3);
        this._panelGameOver.x = 80;
        this._panelGameOver.y = -480;
        this._btnGoback = this.game.add.button(0, 1120, "buttonicon", this.doBtnGoback, this, 4, 0, 8);
        this._btnRestart = this.game.add.button(0, 1120, "buttonicon", this.doBtnRestart, this, 5, 1, 9);
        this._btnNextLevel = this.game.add.button(0, 1120, "buttonicon", this.doBtnNextLevel, this, 6, 2, 10);
        this.soundCoin = this.game.add.audio("coin");
        this.soundRuby = this.game.add.audio("ruby");
        this.soundTreasure = this.game.add.audio("treasure");
        this.soundExplode = this.game.add.audio("explode");
        this.soundSquid = this.game.add.audio("squid");
        this.soundFizzle = this.game.add.audio("fizzle");
        this.soundGuiButton = this.game.add.audio("gui_button");
        this.soundGuiForward = this.game.add.audio("gui_forward");
        this.soundGuiBack = this.game.add.audio("gui_back");
        uboat._popupText = this.game.add.bitmapText(320, -320, "myfont", "no text yet", 64);
        this._boxBlack = this.game.add.graphics(0, 0);
        this._boxBlack.beginFill(0, .5);
        this._boxBlack.drawRect(0, 0, uboat.GAME_WIDTH, uboat.GAME_HEIGHT);
        this._boxBlack.y = 0;
        this._cheatText = this.game.add.bitmapText(320, -320, "myfont", "no text yet", 64);
        this._btnPause = this.game.add.button(640 - 120, -8, "buttonicon", this.doBtnPause, this, 7, 3, 11);
        this._btnContinue = new MyLabelButton(this.game, 160, 960 + 352, "button", "Continue", this.doBtnContinue, this, 1, 0, 2);
        this._btnLevels = new MyLabelButton(this.game, 160, 960 + 352 + 128, "button", "Level select", this.doBtnLevels, this, 1, 0, 2);
        this._btnMainMenu = new MyLabelButton(this.game, 160, 960 + 352 + 256, "button", "Main menu", this.doBtnMainMenu, this, 1, 0, 2);
        this.game.input.onDown.add(this.ingameOnDown, this);
        this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(this.ingameOnDown, this);
        CHEAT_INVINCIBLE = false;
        CHEAT_RUBY = false;
        backgroundFadeIn(this.game, true);
        this.startNewGame()
    },
    update: function() {
        if (GLOBAL_PAUSE_FLAG == false) {
            this.game.physics.arcade.overlap(this._player.hitGroup, this._objGroup, this.playerHitsObj, null, this);
            if (uboat._stateCountDown > 0) {
                uboat._stateCountDown -= 1;
                switch (uboat._levelstate) {
                    case STATE_INTRO:
                        if (uboat._stateCountDown == 45) {
                            this.doPopupText(uboat._popupText, "Level " + (this._levelIndex + 1), 480)
                        }
                        if (uboat._stateCountDown == 1) {
                            this.doPopupText(uboat._popupText, "Go!!", 480);
                            uboat._levelstate = STATE_PLAYING
                        }
                        break
                }
            }
            if (uboat._levelstate == STATE_PLAYING) {
                this._leveldepth = this._leveldepth - SCROLL_SPEED;
                this._partsBar = this._partsBar + SCROLL_SPEED;
                if (this._partsBar <= uboat.GAME_HEIGHT) {
                    this.spawnLevelPart()
                }
            }
            backgroundUpdateBubbles(this.game, this._backobjsGroup)
        }
    },
    render: function() {},
    ingameOnDown: function(e) {
        if (GLOBAL_PAUSE_FLAG == false) {
            this._player.doTap()
        } else {
            this.onPauseBackTouch(e)
        }
    },
    startNewGame: function() {
        this.togglePauseMenu(false);
        GLOBAL_PAUSE_FLAG = false;
        for (var e = 0; e < this._objGroup.length; e++) {
            if (this._objGroup.children[e].alive) {
                this._objGroup.children[e].kill()
            }
        }
        this._leveldepth = 0;
        this._partsIndex = 0;
        uboat._levelstate = STATE_INTRO;
        uboat._stateCountDown = 60;
        this._levelGameOver = 0;
        this._player.revive();
        this._level = -1;
        this._collectedCoins = 0;
        this._collectedRuby = 0;
        this._collectedTreasure = 0;
        this._totalCoins = 0;
        this._totalRuby = 0;
        this._totalTreasure = 0;
        for (var t = 0; t < LevelData[this._levelIndex].parts.length; t++) {
            for (var n = 0; n < LevelData[this._levelIndex].parts[t].objs.length; n++) {
                var r = LevelData[this._levelIndex].parts[t].objs[n].objname;
                if (r == "coin") {
                    this._totalCoins++
                }
                if (r == "ruby") {
                    this._totalRuby++
                }
                if (r == "treasure") {
                    this._totalTreasure++
                }
            }
        }
        this._partsBar = 480;
        while (this._partsBar < uboat.GAME_HEIGHT && this._partsIndex < LevelData[this._levelIndex].parts.length) {
            this.spawnLevelPart()
        }
    },
    

};