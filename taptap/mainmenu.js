var MENU_ENTER_LEFT = 1;
var MENU_ENTER_RIGHT = 2;
var MENU_EXIT_LEFT = 3;
var MENU_EXIT_RIGHT = 4;
uboat.MainMenu = function(e) {
    this.game = e;
    this._btnStart = null;
    this._btnCredits = null;
    this._txtCredits1 = null;
    this._txtCredits2 = null;
    this._txtCredits3 = null;
    this._btnCreditsOk = null;
    this._logoBdR = null;
    this._logoPhaser = null;
    this._strCheatCode = ""
};
uboat.MainMenu.prototype = {
    create: function() {
        this.add.sprite(0, 0, "background");
        this._backobjsGroup = [];
        backgroundCreateBubbles(this.game, this._backobjsGroup);
        var e = this.add.sprite(0, 0, "title");
        e.x = (uboat.GAME_WIDTH - e.width) * .5;
        e.y = 0 - e.height;
        this.game.add.tween(e).to({
            y: 40
        }, 400, Phaser.Easing.Back.Out, true, 200);
        var t = this.game.add.bitmapText(320, 960 - 64, "myfont", "BdR GamesÂ©2014", 48);
        t.makeCentered(320);
        e.inputEnabled = true;
        e.events.onInputDown.add(this.onTitleTouch, this);
        this._grpMainMenu = this.game.add.group();
        this._btnStart = new MyLabelButton(this.game, 160, 512, "button", "Start game", this.doBtnStart, this, 1, 0, 2);
        var n = new MyLabelButton(this.game, 160, 512 + 112, "button", "How to play", this.doBtnTutorial, this, 1, 0, 2);
        var r = new MyLabelButton(this.game, 160, 512 + 224, "button", "Options", this.doBtnOptions, this, 1, 0, 2);
        this._grpMainMenu.add(this._btnStart);
        this._grpMainMenu.add(n);
        this._grpMainMenu.add(r);
        this._grpOptions = this.game.add.group();
        var i = new MyLabelButton(this.game, 160, 512, "button", "Reset game", this.doBtnResetGame, this, 1, 0, 2);
        var s = new MyLabelButton(this.game, 160, 512 + 112, "button", "Credits", this.doBtnCredits, this, 1, 0, 2);
        var o = new MyLabelButton(this.game, 160, 512 + 224, "button", "Back", this.doBtnBack, this, 1, 0, 2);
        this._grpOptions.add(i);
        this._grpOptions.add(s);
        this._grpOptions.add(o);
        this._grpResetGame = this.game.add.group();
        var u = this.game.add.bitmapText(320, 420, "myfont", "Reset game progress,\nare you sure?", 48);
        u.align = "center";
        u.makeCentered(320);
        var a = new MyLabelButton(this.game, 160, 512 + 112, "button", "Yes", this.doBtnResetGameOk, this, 1, 0, 2);
        var f = new MyLabelButton(this.game, 160, 512 + 224, "button", "No", this.doBtnBack, this, 1, 0, 2);
        this._grpResetGame.add(u);
        this._grpResetGame.add(a);
        this._grpResetGame.add(f);
        this._grpCredits = this.game.add.group();
        var l = this.game.add.bitmapText(160, 400, "myfont", "Program, game design\nand graphics by\nBas de Reuver", 48);
        l.align = "center";
        l.makeCentered(320);
        this._cheatText = this.game.add.bitmapText(320, -320, "myfont", "Levels unlocked", 48);
        this._cheatText.makeCentered(320);
        var c = this.game.add.sprite(160, 640, "buttonicon", 14);
        var h = this.game.add.sprite(352, 640, "buttonicon", 15);
        var p = new MyLabelButton(this.game, 160, 800, "button", "Ok", this.doBtnBack, this, 1, 0, 2);
        var d = this.game.add.bitmapText(640 - 96, 960 - 64, "myfont", SUBMARINE_VERION, 48);
        this._grpCredits.add(l);
        this._grpCredits.add(this._cheatText);
        this._grpCredits.add(c);
        this._grpCredits.add(h);
        this._grpCredits.add(p);
        this._grpCredits.add(d);
        this.soundGuiButton = this.game.add.audio("gui_button");
        this.soundGuiForward = this.game.add.audio("gui_forward");
        this.soundGuiBack = this.game.add.audio("gui_back");
        this._grpMainMenu.x = -640;
        this._grpOptions.x = +640;
        this._grpResetGame.x = +640;
        this._grpCredits.x = +640;
        backgroundFadeIn(this.game, true);
        this.game.time.events.add(200, function() {
            this.moveScene(this._grpMainMenu, MENU_ENTER_LEFT)
        }, this)
    },
    update: function() {
        backgroundUpdateBubbles(this.game, this._backobjsGroup)
    },
    onTitleTouch: function(e, t) {
        if (this._grpCredits.x == 0) {
            console.log("onTitleTouch ----!");
            var n = new Phaser.Rectangle(0, 0, e.width / 2, e.height / 2);
            var r = new Phaser.Rectangle(e.width / 2, 0, e.width / 2, e.height / 2);
            var i = new Phaser.Rectangle(0, e.height / 2, e.width, e.height / 2);
            var s = n.contains(t.x, t.y);
            var o = "-";
            if (n.contains(t.x, t.y) == true) {
                o = "L"
            }
            if (r.contains(t.x, t.y) == true) {
                o = "R"
            }
            if (i.contains(t.x, t.y) == true) {
                o = "B"
            }
            this._strCheatCode += o;
            if (this._strCheatCode.length > 9) {
                this._strCheatCode = this._strCheatCode.substring(this._strCheatCode.length - 9)
            }
            if (this._strCheatCode == "LRBLRBLRB") {
                this._strCheatCode == "";
                this.CheatUnlockAll();
                this._cheatText.y = 400 - 48;
                this._cheatText.alpha = 1;
                this.game.add.tween(this._cheatText).to({
                    y: this._cheatText.y - 80,
                    alpha: 0
                }, 300, Phaser.Easing.Linear.None, true, 600)
            }
        }
    },
    CheatUnlockAll: function() {
        if (!uboat.PlayerProgress) {
            this.game.state.states["LevelSelect"].loadLevelProgress()
        }
        for (var e = 0; e < LevelData.length; e++) {
            if (!uboat.PlayerProgress[e] || uboat.PlayerProgress[e] < 0) {
                uboat.PlayerProgress[e] = 0
            }
        }
        window.localStorage.setItem("taptap_progress", JSON.stringify(uboat.PlayerProgress))
    },
    doBtnStart: function() {
        this.soundGuiForward.play();
        var e = backgroundFadeIn(this.game, false);
        e.onComplete.add(function() {
            this.state.start("LevelSelect")
        }, this)
    },
    doBtnTutorial: function() {
        this.soundGuiForward.play();
        var e = backgroundFadeIn(this.game, false);
        e.onComplete.add(function() {
            this.state.start("Tutorial")
        }, this)
    },
    doBtnOptions: function() {
        this.soundGuiForward.play();
        this.moveScene(this._grpOptions, MENU_ENTER_RIGHT);
        this.moveScene(this._grpMainMenu, MENU_EXIT_LEFT)
    },
    doBtnResetGame: function() {
        this.soundGuiForward.play();
        this.moveScene(this._grpResetGame, MENU_ENTER_RIGHT);
        this.moveScene(this._grpOptions, MENU_EXIT_LEFT)
    },
    doBtnResetGameOk: function() {
        uboat.PlayerProgress = null;
        window.localStorage.removeItem("taptap_progress");
        this.soundGuiBack.play();
        this.doBtnBack()
    },
    doBtnCredits: function() {
        this.soundGuiForward.play();
        this.moveScene(this._grpCredits, MENU_ENTER_RIGHT);
        this.moveScene(this._grpOptions, MENU_EXIT_LEFT)
    },
    doBtnBack: function() {
        if (this._grpResetGame.x < 640) {
            this.soundGuiBack.play();
            this.moveScene(this._grpOptions, MENU_ENTER_LEFT);
            this.moveScene(this._grpResetGame, MENU_EXIT_RIGHT);
            return false
        } else if (this._grpCredits.x < 640) {
            this.soundGuiBack.play();
            this.moveScene(this._grpOptions, MENU_ENTER_LEFT);
            this.moveScene(this._grpCredits, MENU_EXIT_RIGHT);
            return false
        } else if (this._grpOptions.x < 640) {
            this.soundGuiBack.play();
            this.moveScene(this._grpMainMenu, MENU_ENTER_LEFT);
            this.moveScene(this._grpOptions, MENU_EXIT_RIGHT);
            return false
        } else {
            return true
        }
    },
    moveScene: function(e, t) {
        var n = -640;
        var r = 0;
        if (t == MENU_ENTER_RIGHT) {
            n = +640;
            r = 0
        }
        if (t == MENU_EXIT_LEFT) {
            n = 0;
            r = -640
        }
        if (t == MENU_EXIT_RIGHT) {
            n = 0;
            r = +640
        }
        e.x = n;
        this.game.add.tween(e).to({
            x: r
        }, 400, Phaser.Easing.Back.Out, true)
    }
};