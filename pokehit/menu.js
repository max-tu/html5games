 function(t, e) {
    function i() {
        this.fromPreloader = !1
    }
    var s = t("../prefabs/simplebutton"),
        n = t("../prefabs/togglebutton");
    i.prototype = {
        init: function(t) {
            this.stage.disableVisibilityChange = !0, 
            this.fromPreloader = t
        },
        create: function() {
            this.addBackground(), 
            this.addTitle(), 
            this.addOtherImages(), 
            this.addButtons(), 
            this.initCredits(), 
            this.initAnimation(), 

            this.game.global.enable_sound && 
            this.fromPreloader && (
                this.soundButton.input.enabled = !1, 
                this.soundButton.switchTextures(), 
                this.game.input.onTap.addOnce(this.startMusic, this)
                )
        },
        onFocusLost: function() {},
        onFocus: function() {},
        addBackground: function() {
            this.game.add.image(0, 0, "bggroup", "bg.png")
        },
        addTitle: function() {
            var t = {
                font: "bold 75px font",
                fill: "#FBAF05",
                align: "center",
                stroke: "#FFFFFF",
                strokeThickness: 12
            }, e = "Poke Hit";
            this.titleText = this.game.add.text(0, 0, "" + e, t), 
            this.titleText.anchor.set(.5, .5), 
            this.titleText.position.set(this.game.width / 2, 130), 
            this.titleText.setShadow(2, 2, "#FB1A05", 2)
        },
        addOtherImages: function() {
            this.pikachu = this.game.add.sprite(this.game.width / 2, this.game.height - 80, "pikachu_ball"), 
            this.pikachu.anchor.set(.5, 1), 
            this.pikachu.angle = -5, 
            this.pikachu.animations.add("ball", [0, 1, 2, 3, 4, 5, 6, 7], 10, !0), 
            this.pikachu.animations.play("ball")
        },
        addButtons: function() {
            var t = this,
                e = this.game.width / 2 - 50,
                i = 140;

            this.playButton = new s(this.game, this.game.width / 2, e, "buttonsgroup", "play.png"), 
            this.playButton.setCallbackDelay(250), 
            this.playButton.callback.addOnce(this.hideAndStartGame, this), 
            this.creditsButton = new s(this.game, this.playButton.x + i, 
                this.playButton.y, "buttonsgroup", "credit.png"), 

            this.creditsButton.callback.add(this.toggleCredits, this), 
            this.soundButton = new n(this.game, this.playButton.x - i, this.playButton.y, "buttonsgroup", 
                "sound.png", "mute.png"), 

            this.soundButton.callback.add(function() {
                t.game.sound.mute = !t.game.sound.mute
            }), this.game.sound.mute && this.soundButton.switchTextures(), 

            this.buttons = [this.playButton, this.soundButton, this.creditsButton], 
            this.buttons.forEach(function(e) {
                t.world.add(e)
            })
        },
        hideAndStartGame: function() {
            this.playButton.input.enabled = !1, 
            this.playButton.inputEnabled = !1, 
            "true" === window.localStorage.getItem("1") ? 
                this.game.state.start("levelsmenu") : this.game.state.start("level", !0, !1, 1)
        },
        initCredits: function() {
            this.credits = this.game.add.image(0, 0, "bggroup", "creditbg.png"), 

            this.credits.position.set(Math.round(.5 * (this.game.width - this.credits.width)), 
                Math.round(.5 * (this.game.height - this.credits.height))), 

            this.credits.visible = !1;
            var t = {
                font: "30px font",
                fill: "#fff",
                stroke: "#000",
                strokeThickness: 1,
                align: "center"
            }, e = "www.NguoiAnPhu.com\n\nGame made with\nPhaser JS Framework\n\nDeveloped by Tuan Vo
            \nvohungtuan@gmail.com";
            this.creditText = this.game.add.text(0, 0, "" + e, t), 
            this.creditText.anchor.set(.5, 0), 
            this.creditText.position.set(this.game.width / 2, this.game.height / 2), 
            this.creditText.setShadow(2, 2, "#666666", 2), 
            this.creditText.visible = !1
        },
        toggleCredits: function() {
            this.credits.visible ? this.hideCredits() : this.showCredits()
        },
        hideCredits: function() {
            var t = this;
            this.game.add.tween(this.creditText).to({
                y: this.creditText.y + 200,
                alpha: 0
            }, 500, Phaser.Easing.Back.In, !0), 
            this.game.add.tween(this.credits).to({
                y: this.credits.y + 200,
                alpha: 0
            }, 500, Phaser.Easing.Back.In, !0).onComplete.addOnce(function() {
                t.playButton.input.enabled = !0, 
                t.creditsButton.input.enabled = !0, 
                t.credits.visible = !1, 
                t.creditText.visible = !1
            }, this)
        },
        showCredits: function() {
            this.credits.visible = !0, 
            this.creditText.visible = !0, 
            this.credits.alpha = 0, 
            this.credits.y = Math.round(.5 * (this.game.width - this.credits.height)) + 200, 
            this.creditText.y = Math.round(.5 * (this.game.width - this.creditText.height)) + 200, 

            this.game.add.tween(this.credits).to({
                y: this.credits.y - 200,
                alpha: 1
            }, 500, Phaser.Easing.Back.Out, !0), 
            this.game.add.tween(this.creditText).to({
                y: this.creditText.y - 200,
                alpha: 1
            }, 500, Phaser.Easing.Back.Out, !0), 

            this.playButton.input.enabled = !1, 
            this.creditsButton.input.enabled = !1, 
            this.game.input.onTap.addOnce(function() {
                this.hideCredits()
            }, this)
        },
        startMusic: function() {
            this.game.sound.play("main_loop", .33, !0), 
            this.soundButton.switchTextures(), 
            this.soundButton.input.enabled = !0
        },
        initAnimation: function() {
            var t = this;
            this.titleText.y -= 250, 
            this.titleText.scale.set(0, 1), 

            this.game.add.tween(this.titleText).to({
                y: this.titleText.y + 250
            }, 600, Phaser.Easing.Back.Out, !0, 300), 

            this.game.add.tween(this.titleText.scale).to({
                x: 1
            }, 600, Phaser.Easing.Back.Out, !0, 500).onComplete.addOnce(this.onTitleAnimationComplete, this), 

            this.pikachu.scale.set(2, 2), 
            this.game.add.tween(this.pikachu.scale).to({
                x: 3,
                y: 3
            }, 500, Phaser.Easing.Back.Out, !0, 1200).onComplete.addOnce(this.onPandaAnimationComplete, this);
            var e = 1500;

            this.buttons.forEach(function(i) {
                i.scale.set(0, 0), t.game.add.tween(i.scale).to({
                    x: 1,
                    y: 1
                }, 300, Phaser.Easing.Back.Out, !0, e), e += 200
            }), 
            this.game.time.events.repeat(2e3, 1e3, this.shakePlayButton, this)
        },
        shakePlayButton: function() {
            this.game.add.tween(this.playButton.scale).to({
                x: 1.1,
                y: .9
            }, 150, Phaser.Easing.Cubic.Out, !0, 0, 3, !0)
        },
        onTitleAnimationComplete: function() {
            this.game.add.tween(this.titleText.scale).to({
                x: 1.1,
                y: .9
            }, 600, Phaser.Easing.Sinusoidal.Out, !0, 0, 1e4, !0)
        },
        onPandaAnimationComplete: function() {
            this.game.add.tween(this.pikachu).to({
                angle: 5
            }, 1200, Phaser.Easing.Linear.NONE, !0, 0, 1e3, !0)
        },
        shutdown: function() {
            this.titleText.destroy(), 
            this.pikachu.destroy(), 
            this.credits.destroy(), 
            this.creditText.destroy(), 
            this.buttons = null
        }
    }, e.exports = i
}