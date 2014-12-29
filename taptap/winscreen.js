uboat.WinScreen = function(e) {
    this.game = e;
    this._dummySubmarine = null;
    this._emitBubble = null;
    this._objGroup = null;
    this._objRotate = 0
};
uboat.WinScreen.prototype = {
    create: function() {
        console.log("uboat.WinScreen.create() -- was called..");
        this.add.sprite(0, 0, "background");
        this._backobjsGroup = [];
        backgroundCreateBubbles(this.game, this._backobjsGroup);
        var e = this.game.add.bitmapText(148, 48, "myfont", "Congratulations!", 72);
        var t = this.game.add.bitmapText(148, 128 + 64, "myfont", "You have completed all levels!", 48);
        var n = this.game.add.bitmapText(148, 128 + 128, "myfont", "Thank you for playing.", 48);
        e.alpha = 0;
        t.alpha = 0;
        n.alpha = 0;
        e.makeCentered(320);
        t.makeCentered(320);
        n.makeCentered(320);
        this._btnClose = new MyLabelButton(this.game, 160, 960 + 128, "button", "Ok", this.doBtnClose, this, 1, 0, 2);
        this.game.add.tween(e).to({
            alpha: 1
        }, 1e3, Phaser.Easing.Linear.None, true, 200);
        this.game.add.tween(t).to({
            alpha: 1
        }, 1e3, Phaser.Easing.Linear.None, true, 1200);
        this.game.add.tween(n).to({
            alpha: 1
        }, 1e3, Phaser.Easing.Linear.None, true, 2200);
        this.game.add.tween(this._btnClose).to({
            y: 960 - 128
        }, 1e3, Phaser.Easing.Back.Out, true, 3200);
        this._dummySubmarine = this.game.add.sprite(320, 560, "submarine");
        this._dummySubmarine.anchor.setTo(.5, .5);
        this._dummySubmarine.scale.x = -1;
        this._emitBubble = this.game.add.emitter(320 - 64, 560 + 10, 10);
        this._emitBubble.makeParticles("particles", [2]);
        this._emitBubble.setXSpeed(-260, -260);
        this._emitBubble.setYSpeed(0, 0);
        this._emitBubble.setRotation(0, 0);
        this._emitBubble.setScale(1, .1, 1, .1, 2e3, Phaser.Easing.None);
        this._emitBubble.gravity = 0;
        this._emitBubble.start(false, 800, 200);
        this._objGroup = this.game.add.group();
        var r = 0;
        for (var i = 0; i < 360; i = i + 20) {
            var s = new GameObj(this.game, 0, 0);
            if (r == 0) {
                s.animations.add("coin", [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
                s.play("coin", 15, true, false)
            } else if (r == 1) {
                s.animations.add("ruby", [8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 13, 12, 10, 9], 10, true);
                s.play("ruby", 15, true, false)
            } else {
                s.animations.add("treasure", [63], 10, true);
                s.play("treasure", 15, true, false)
            }
            this._objGroup.add(s);
            r = (r + 1) % 3
        }
        backgroundFadeIn(this.game, true)
    },
    update: function() {
        backgroundUpdateBubbles(this.game, this._backobjsGroup);
        var e = 320;
        var t = 560;
        var n = 192;
        this._objRotate++;
        var r = this._objRotate;
        for (var i = 0; i < this._objGroup.length; i++) {
            this._objGroup.children[i].x = e + Math.cos(2 * Math.PI * r / 360) * n;
            this._objGroup.children[i].y = t + Math.sin(2 * Math.PI * r / 360) * n;
            r = r + 20
        }
    },
    doBtnClose: function() {
        var e = backgroundFadeIn(this.game, false);
        e.onComplete.add(function() {
            this.state.start("LevelSelect")
        }, this)
    }
};