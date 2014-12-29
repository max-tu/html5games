uboat.LevelSelect = function(e) {
    this.game = e;
    this._txtselect = null;
    this._btnGoback = null;
    this._icons = []
};

uboat.LevelSelect.prototype = {
    create: function() {
        this.add.sprite(0, 0, "background");
        this._backobjsGroup = [];
        backgroundCreateBubbles(this.game, this._backobjsGroup);
        this._txtselect = this.game.add.bitmapText(148, -64, "myfont", "Select a level", 64);
        this._btnGoback = this.game.add.button(-160, 820, "buttonicon", this.doBtnBack, this, 4, 0, 8);
        this.soundGuiButton = this.game.add.audio("gui_button");
        this.soundGuiDenied = this.game.add.audio("gui_denied");
        this.soundGuiBack = this.game.add.audio("gui_back");
        this.loadLevelProgress();
        this.createLevelIcons();
        this.showLevelIcons();
        backgroundFadeIn(this.game, true)
    },
    update: function() {
        backgroundUpdateBubbles(this.game, this._backobjsGroup)
    },
    loadLevelProgress: function() {
        if (!uboat.PlayerProgress) {
            var e = window.localStorage.getItem("taptap_progress");
            try {
                uboat.PlayerProgress = JSON.parse(e)
            } catch (t) {
                uboat.PlayerProgress = []
            }
            if (Object.prototype.toString.call(uboat.PlayerProgress) !== "[object Array]") {
                uboat.PlayerProgress = []
            }
        }
    },
    createLevelIcons: function() {
        var e = 0;
        for (var t = 0; t < 3; t++) {
            for (var n = 0; n < 4; n++) {
                e = e + 1;
                var r = uboat.PlayerProgress[e - 1];
                if (typeof r === "number") {} else {
                    uboat.PlayerProgress[e - 1] = -1;
                    r = -1
                } if (!uboat.PlayerProgress) {
                    uboat.PlayerProgress = []
                } else {
                    if (uboat.PlayerProgress.length >= e - 1) {
                        r = uboat.PlayerProgress[e - 1]
                    } else {
                        uboat.PlayerProgress[e - 1] = -1
                    }
                } if (e == 1 && r < 0) {
                    r = 0
                }
                var i = true;
                var s = 0;
                if (r > -1) {
                    i = false;
                    if (r < 4) {
                        s = r
                    }
                }
                var o = 80 + n * 128;
                var u = 320 + t * 128;
                this._icons[e - 1] = this.createLevelIcon(o, u, e, i, s);
                var a = this._icons[e - 1].getAt(0);
                a.health = e;
                a.inputEnabled = true;
                a.events.onInputDown.add(this.onLevelIconDown, this)
            }
        }
    },
    createLevelIcon: function(e, t, n, r, i) {
        var s = this.game.add.group();
        s.x = e;
        s.y = t;
        s.xOrg = e;
        s.yOrg = t;
        var o = 0;
        if (r == false) {
            o = 1
        }
        var u = this.game.add.sprite(0, 0, "levelicons", o);
        s.add(u);
        var a = this.game.add.bitmapText(24, 16, "myfont", "" + n, 48);
        a.makeCentered(48 - 4);
        s.add(a);
        if (r == false) {
            var f = this.game.add.sprite(0, 0, "levelicons", 2 + i);
            s.add(f)
        }
        return s
    },
    showLevelIcons: function() {
        for (var e = 0; e < this._icons.length; e++) {
            var t = this._icons[e];
            t.y = t.y + 640;
            var n = t.y;
            this.game.add.tween(t).to({
                y: n - 640
            }, 500, Phaser.Easing.Back.Out, true, e * 40)
        }
        this.game.add.tween(this._txtselect).to({
            y: 128
        }, 400, Phaser.Easing.Back.Out, true);
        this.game.add.tween(this._btnGoback).to({
            x: 48
        }, 400, Phaser.Easing.Back.Out, true, this._icons.length * 40)
    },
    onLevelIconDown: function(e, t) {
        var n = e.health;
        var r = e.frame == 0;
        if (r) {
            var i = this._icons[n - 1];
            var s = i.xOrg;
            var o = this.game.add.tween(i).to({
                x: s + 6
            }, 20, Phaser.Easing.Linear.None).to({
                x: s - 5
            }, 20, Phaser.Easing.Linear.None).to({
                x: s + 4
            }, 20, Phaser.Easing.Linear.None).to({
                x: s - 3
            }, 20, Phaser.Easing.Linear.None).to({
                x: s + 2
            }, 20, Phaser.Easing.Linear.None).to({
                x: s
            }, 20, Phaser.Easing.Linear.None).start();
            this.soundGuiDenied.play()
        } else {
            var i = this._icons[n - 1];
            var o = this.game.add.tween(i.scale).to({
                x: .9,
                y: .9
            }, 100, Phaser.Easing.Linear.None).to({
                x: 1,
                y: 1
            }, 100, Phaser.Easing.Linear.None).start();
            o._lastChild.onComplete.add(function() {
                this.onLevelSelected(e.health)
            }, this);
            this.soundGuiButton.play()
        }
    },
    onLevelSelected: function(e) {
        this.game.state.states["Game"]._levelIndex = e - 1;
        var t = backgroundFadeIn(this.game, false);
        if (e == 1 && uboat.PlayerProgress[0] == 0) {
            this.game.state.states["Tutorial"]._tutorialFull = false;
            t.onComplete.add(function() {
                this.state.start("Tutorial")
            }, this)
        } else {
            t.onComplete.add(function() {
                this.state.start("Game")
            }, this)
        }
    },
    doBtnBack: function() {
        this.soundGuiBack.play();
        var e = backgroundFadeIn(this.game, false);
        e.onComplete.add(function() {
            this.state.start("MainMenu")
        }, this)
    }
};