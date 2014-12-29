var game;
! function(a) {
    var b = function(b) {
        function c() {
            b.apply(this, arguments), this.fromPreloader = !1
        }
        return __extends(c, b), 
        c.prototype.init = function(a) {
            this.fromPreloader = a
        }, 
        c.prototype.create = function() {
            this.addBackground(), 
            this.addOtherImages(), 
            this.addButtons(), 
            this.initCredits(), 
            this.initAnimation(), 
            this.fromPreloader && 
            (this.soundButton.input.enabled = !1, 
                this.soundButton.switchTextures(), 
                this.game.input.onTap.addOnce(this.onFirstTap, this), 
                this.game.onBlur.add(this.onFocusLost, this), 
                this.game.onFocus.add(this.onFocus, this))
        }, 
        c.prototype.onFocusLost = function() {
            a.Main.wasMuted = this.game.sound.mute, 
            this.game.sound.mute = !0
        }, 
        c.prototype.onFocus = function() {
            a.Main.wasMuted === !1 && (this.game.sound.mute = !1)
        }, 
        c.prototype.addBackground = function() {
            this.game.add.image(0, 0, "main_menu", "main_menu_bg")
        }, 
        c.prototype.addOtherImages = function() {
            this.title = this.game.add.image(a.Config.HALF_GAME_WIDTH, 130, "main_menu", "Title0000"), 
            this.title.anchor.set(.5, .5), 
            this.panda = this.game.add.image(a.Config.HALF_GAME_WIDTH, a.Config.GAME_HEIGHT - 50, "main_menu", "Panda0000"), 
            this.panda.anchor.set(.5, 1), 
            this.panda.angle = -1
        }, 
        c.prototype.addButtons = function() {
            var b = this,
                c = a.Config.HALF_GAME_HEIGHT - 110,
                d = 140;
            this.playButton = new a.SimpleButton(this.game, a.Config.HALF_GAME_WIDTH, c, "buttons", "Button_Play0000"), 
            this.playButton.setCallbackDelay(250), 
            this.playButton.callback.addOnce(this.hideAndStartGame, this),
            this.creditsButton = new a.SimpleButton(this.game, this.playButton.x + d, this.playButton.y, "buttons", "Button_Credits0000"), 
            this.creditsButton.callback.add(this.toggleCredits, this), 

            this.soundButton = new a.ToggleButton(this.game, this.playButton.x - d, this.playButton.y, "buttons", "Button_Music_On0000", "Button_Music_Off0000"), 
            this.soundButton.callback.add(function() {
                b.game.sound.mute = !b.game.sound.mute
            }), 
            this.game.sound.mute && this.soundButton.switchTextures(), 

            this.moreGamesButton = new a.SimpleButton(this.game, this.playButton.x + d, this.playButton.y, "buttons", "Button_MoreGames0000"), 
            this.moreGamesButton.callback.add(this.onMoreGamesClick, this), 
            this.moreGamesButton.visible = !1, 
            this.moreGamesButton.exists = !1, 

            this.buttons = [this.playButton, this.soundButton, this.creditsButton], 
            
            this.buttons.forEach(function(a) {
                b.world.add(a)
            })
        }, 
        c.prototype.onMoreGamesClick = function() {
            window.open("http://m.softgames.de", "_blank")
        }, 
        c.prototype.initCredits = function() {
            this.credits = this.game.add.image(0, 0, "main_menu", "CreditsBoard0000"), 
            this.credits.position.set(Math.round(.5 * (a.Config.GAME_WIDTH - this.credits.width)), 
                Math.round(.5 * (a.Config.GAME_HEIGHT - this.credits.height))), 
            this.credits.visible = !1
        }, 
        c.prototype.toggleCredits = function() {
            this.credits.visible ? this.hideCredits() : this.showCredits()
        }, 
        c.prototype.hideCredits = function() {
            var a = this;
            this.game.add.tween(this.credits).to({
                y: this.credits.y + 200,
                alpha: 0
            }, 500, Phaser.Easing.Back.In, !0)
            .onComplete.addOnce(function() {
                a.playButton.input.enabled = !0, 
                a.creditsButton.input.enabled = !0, 
                a.credits.visible = !1
            }, this)
        }, 
        c.prototype.showCredits = function() {
            var b = this;
            this.credits.visible = !0, 
            this.credits.alpha = 0, 
            this.credits.y = Math.round(.5 * (a.Config.GAME_HEIGHT - this.credits.height)) + 200,

            this.game.add.tween(this.credits).to({
                y: this.credits.y - 200,
                alpha: 1
            }, 500, Phaser.Easing.Back.Out, !0), 

            this.playButton.input.enabled = !1, 
            this.creditsButton.input.enabled = !1, 
            this.game.input.onTap.addOnce(function() {
                b.hideCredits()
            }, this)

        }, 
        c.prototype.onFirstTap = function() {
            this.stage.disableVisibilityChange = !1, 
            this.tryFullscreen(), 
            this.startMusic()
        }, 
        c.prototype.tryFullscreen = function() {
            this.game.device.android && (this.game.scale.startFullScreen(!0), 
                this.game.scale.setScreenSize(!0))
        }, 
        c.prototype.startMusic = function() {
            var a = this.game.device.android ? .66 : .33;
            this.game.sound.play("main_loop", a, !0), this.soundButton.switchTextures(), this.soundButton.input.enabled = !0
        }, 
        c.prototype.initAnimation = function() {
            var a = this;
            this.title.y -= 250, this.title.scale.set(0, 1), 
            
            this.game.add.tween(this.title).to({
                y: this.title.y + 250
            }, 600, Phaser.Easing.Back.Out, !0, 300), 

            this.game.add.tween(this.title.scale).to({
                x: 1
            }, 600, Phaser.Easing.Back.Out, !0, 500)
            .onComplete.addOnce(this.onTitleAnimationComplete, this), 

            this.panda.scale.set(0, 0), 

            this.game.add.tween(this.panda.scale).to({
                x: .85,
                y: .85
            }, 500, Phaser.Easing.Back.Out, !0, 1200)
            .onComplete.addOnce(this.onPandaAnimationComplete, this);

            var b = 1500;
            this.buttons.forEach(function(c) {
                c.scale.set(0, 0), 
                a.game.add.tween(c.scale).to({
                    x: 1,
                    y: 1
                }, 300, Phaser.Easing.Back.Out, !0, b), 

                b += 200
            }), 

            this.game.time.events.repeat(2e3, 1e3, this.shakePlayButton, this)
        }, 

        c.prototype.shakePlayButton = function() {
            this.game.add.tween(this.playButton.scale).to({
                x: 1.1,
                y: .9
            }, 150, Phaser.Easing.Cubic.Out, !0, 0, 3, !0)
        }, 
        c.prototype.onTitleAnimationComplete = function() {
            a.Main.weakDevice === !1 && this.game.add.tween(this.title.scale).to({
                x: 1.1,
                y: .9
            }, 600, Phaser.Easing.Sinusoidal.Out, !0, 0, 1e4, !0)
        }, 
        c.prototype.onPandaAnimationComplete = function() {
            this.game.add.tween(this.panda.scale).to({
                y: .88
            }, 600, Phaser.Easing.Sinusoidal.Out, !0, 0, 1e4, !0), 
            this.game.add.tween(this.panda).to({
                angle: 1
            }, 1200, Phaser.Easing.Sinusoidal.Out, !0, 0, 1e4, !0)
        }, 
        c.prototype.hideAndStartGame = function() {
            this.playButton.input.enabled = !1, 
            this.playButton.inputEnabled = !1, 
            this.game.changeState(a.Main.stats.tutorialViewed ? "Level" : "Tutorial")
        }, 
        c.prototype.destroy = function() {
            this.buttons = null
        }, c
    }(Phaser.State);
    a.MainMenu = b
}(game || (game = {}));