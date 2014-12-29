uboat.Tutorial = function(e) {
    this.game = e;
    this._txtselect = null;
    this._btnMore = null;
    this._btnBack = null;
    this._angleStep = 2;
    this._angleSubmarine = 0;
    this._arrows = [];
    this._indexScreen = -1;
    this._tutorialFull = true
};
uboat.Tutorial.prototype = {
    create: function() {
        this.add.sprite(0, 0, "background");
        this._backobjsGroup = [];
        backgroundCreateBubbles(this.game, this._backobjsGroup);
        this.game.add.bitmapText(148, 8, "myfont", "How to play", 64);
        if (this._tutorialFull == true) {
            this._btnMore = new MyLabelButton(this.game, 200, 960 - 140, "button", "More", this.doBtnMore, this, 1, 0, 2);
            this._btnBack = this.game.add.button(0, 800, "buttonicon", this.doBtnBack, this, 4, 0, 8)
        } else {
            this._btnPlay = new MyLabelButton(this.game, 160, 960 + 140, "button", "Got it!", this.doBtnPlay, this, 1, 0, 2);
            this.game.add.tween(this._btnPlay).to({
                y: 960 - 140
            }, 1e3, Phaser.Easing.Back.Out, true, 2e3)
        }
        this._grp1 = this.game.add.group();
        var e = this.game.add.bitmapText(24, 120, "myfont", "Tap anywhere on screen\nto 
            rotate the submarine\nin the other direction.", 48);
        e.align = "center";
        e.makeCentered(320);
        this._dummySubmarine = this.game.add.sprite(440, 560, "submarine");
        this._handIcon = this.game.add.sprite(184 + 20, 600 + 40, "tutorialicons", 0);
        this._tapIcon = this.game.add.sprite(184 - 38, 600 - 45, "tutorialicons", 1);
        this._tapIcon.alpha = 0;
        this._dummySubmarine.anchor.setTo(.5, .5);
        this._handIcon.anchor.setTo(.5, .5);
        this._tapIcon.anchor.setTo(.5, .5);
        this._grp1.add(e);
        this._grp1.add(this._dummySubmarine);
        this._grp1.add(this._handIcon);
        this._grp1.add(this._tapIcon);
        for (var t = 0; t < 6; t++) {
            this._arrows[t] = this.game.add.sprite(440, 560, "tutorialicons", 2);
            this._arrows[t].anchor.setTo(.5, .5);
            this._grp1.add(this._arrows[t])
        }
        this._grp1.x = -640;
        if (this._tutorialFull == true) {
            this._grp2 = this.game.add.group();
            var n = this.game.add.bitmapText(148, 120, "myfont", "Complete each level by\ncollecting the treasure\nat 
                the bottom of the ocean.\nCollect all coins and rubies\nto earn additional stars.", 48);
            n.align = "center";
            n.makeCentered(320);
            var r = this.game.add.sprite(148, 460, "gameobjs");
            r.frame = 63;
            var i = this.game.add.bitmapText(240, 460, "myfont", "Treasure", 48);
            var s = this.game.add.sprite(148, 460 + 112, "gameobjs");
            s.animations.add("loop", [0, 1, 2, 3, 4, 5, 6, 7], 10, true, true);
            s.animations.play("loop");
            var o = this.game.add.bitmapText(240, 460 + 112, "myfont", "Coin", 48);
            var u = this.game.add.sprite(148, 460 + 224, "gameobjs");
            u.animations.add("loop", [8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 13, 12, 10, 9], 10, true, true);
            u.animations.play("loop");
            var a = this.game.add.bitmapText(240, 460 + 224, "myfont", "Ruby", 48);
            this._grp2.add(n);
            this._grp2.add(i);
            this._grp2.add(o);
            this._grp2.add(a);
            this._grp2.add(r);
            this._grp2.add(s);
            this._grp2.add(u);
            this._grp2.x = -640;
            this._grp3 = this.game.add.group();
            var f = this.game.add.bitmapText(148, 120, "myfont", "Warning, beware of the\nfollowing obstacles", 48);
            f.align = "center";
            f.makeCentered(320);
            var l = this.game.add.sprite(148, 288, "gameobjs");
            l.animations.add("loop", [40, 41, 42, 43, 44, 45, 46, 47], 15, true, true);
            l.animations.play("loop");
            var c = this.game.add.bitmapText(240, 288, "myfont", "Danger, avoid!", 48);
            var h = this.game.add.sprite(148, 288 + 128, "gameobjs");
            h.animations.add("loop", [24, 25, 26, 27, 28, 29, 30, 31], 10, true, true);
            h.animations.play("loop");
            var p = this.game.add.bitmapText(240, 288 + 128, "myfont", "Ink blocks view", 48);
            var d = this.game.add.sprite(148, 288 + 256, "gameobjs");
            d.animations.add("loop", [32, 33, 34, 35, 36, 37, 38, 39, 39, 38, 37, 36, 35, 34, 33, 32], 10, true, true);
            d.animations.play("loop");
            var v = this.game.add.bitmapText(240, 288 + 256, "myfont", "Locks controls", 48);
            var m = this.game.add.sprite(148, 288 + 384, "gameobjs");
            m.animations.add("loop", [16, 17, 18, 19, 20, 21, 22, 23], 10, true, true);
            m.animations.play("loop");
            var g = this.game.add.bitmapText(240, 288 + 384, "myfont", "Slows you down", 48);
            this._grp3.add(f);
            this._grp3.add(c);
            this._grp3.add(p);
            this._grp3.add(v);
            this._grp3.add(g);
            this._grp3.add(l);
            this._grp3.add(h);
            this._grp3.add(d);
            this._grp3.add(m);
            this._grp3.add(f);
            this._grp3.x = -640
        }
        this.soundGuiButton = this.game.add.audio("gui_button");
        this.soundGuiBack = this.game.add.audio("gui_back");
        this._indexScreen = -1;
        backgroundFadeIn(this.game, true);
        this.switchNextScreen();
        this.onHandIconIsUp();
        this._tutorialFull = true
    },
    update: function() {
        backgroundUpdateBubbles(this.game, this._backobjsGroup);
        if (this._indexScreen == 0) {
            this._angleSubmarine += this._angleStep;
            if (this._angleSubmarine < 0) {
                this._angleSubmarine += 360
            }
            if (this._angleSubmarine >= 360) {
                this._angleSubmarine -= 360
            }
            this._dummySubmarine.rotation = 2 * Math.PI * (this._angleSubmarine / 360);
            var e = 100;
            var t = +90;
            if (this._angleStep > 0) {
                t = -90
            }
            for (var n = 0; n < 6; n++) {
                var r = this._angleSubmarine + n * 60;
                this._arrows[n].rotation = 2 * Math.PI * ((r + t) / 360);
                this._arrows[n].x = 440 + Math.cos(2 * Math.PI * r / 360) * e;
                this._arrows[n].y = 560 + Math.sin(2 * Math.PI * r / 360) * e
            }
        }
    },
    doBtnMore: function() {
        this.soundGuiButton.play();
        this.switchNextScreen()
    },
    doBtnBack: function() {
        this.soundGuiBack.play();
        var e = backgroundFadeIn(this.game, false);
        e.onComplete.add(function() {
            this.state.start("MainMenu")
        }, this)
    },
    doBtnPlay: function() {
        this.soundGuiButton.play();
        var e = backgroundFadeIn(this.game, false);
        e.onComplete.add(function() {
            this.state.start("Game")
        }, this)
    },
    switchNextScreen: function() {
        this._indexScreen = (this._indexScreen + 1) % 3;
        switch (this._indexScreen) {
            case 0:
                if (this._tutorialFull == true) {
                    this.game.add.tween(this._grp3).to({
                        x: this._grp3.x - 640
                    }, 400, Phaser.Easing.Back.Out, true)
                }
                this._grp1.x = 640;
                this.game.add.tween(this._grp1).to({
                    x: this._grp1.x - 640
                }, 400, Phaser.Easing.Back.Out, true);
                this._angleStep = 2;
                this._angleSubmarine = 0;
                break;
            case 1:
                this.game.add.tween(this._grp1).to({
                    x: this._grp1.x - 640
                }, 400, Phaser.Easing.Back.Out, true);
                this._grp2.x = 640;
                this.game.add.tween(this._grp2).to({
                    x: this._grp2.x - 640
                }, 400, Phaser.Easing.Back.Out, true);
                break;
            case 2:
                this.game.add.tween(this._grp2).to({
                    x: this._grp2.x - 640
                }, 400, Phaser.Easing.Back.Out, true);
                this._grp3.x = 640;
                this.game.add.tween(this._grp3).to({
                    x: this._grp3.x - 640
                }, 400, Phaser.Easing.Back.Out, true);
                break
        }
    },
    onHandIconIsUp: function() {
        var e = 500 + this.game.rnd.integerInRange(0, 1500);
        var t = this.game.add.tween(this._handIcon).to({
            x: 184,
            y: 600
        }, 200, Phaser.Easing.Sinusoidal.Out, true, e);
        t.onComplete.add(this.onHandIconIsDown, this)
    },
    onHandIconIsDown: function() {
        this._angleStep = -1 * this._angleStep;
        this._tapIcon.alpha = 1;
        this._tapIcon.scale.x = .8;
        this._tapIcon.scale.y = .8;
        var e = this.game.add.tween(this._tapIcon.scale).to({
            x: 1.2,
            y: 1.2
        }, 200, Phaser.Easing.Sinusoidal.Out, true);
        this.game.add.tween(this._tapIcon).to({
            alpha: 0
        }, 100, Phaser.Easing.Sinusoidal.Out, true, 240);
        var t = this.game.add.tween(this._handIcon).to({
            x: 184 + 20,
            y: 600 + 40
        }, 400, Phaser.Easing.Sinusoidal.Out, true, 500);
        t.onComplete.add(this.onHandIconIsUp, this)
    }
};