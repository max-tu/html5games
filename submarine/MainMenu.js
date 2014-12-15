var game;
! function(a) {
    var b = function(b) {
        function c() {
            b.apply(this, arguments), 
            this.fromPreloader = !1, 
            this.initialY = 345, this.currentAngle = 0, 
            this.deltaAngle = .02, this.magnitude = 15
        }
        return __extends(c, b), c.prototype.init = function(a) {
            this.fromPreloader = a
        }, 
        c.prototype.create = function() {
            this.addBackground(), 
            a.Main.weakDevice === !1 && this.addBubbles(), this.addOtherImages(), 
            this.addButtons(), this.initCredits(), this.initAnimation(), 
            this.fromPreloader && (this.soundButton.input.enabled = !1, this.soundButton.switchTextures(), 
                this.game.input.onTap.addOnce(this.onFirstTap, this), this.stage.disableVisibilityChange = !1, 
                this.game.onBlur.add(this.onFocusLost, this), this.game.onFocus.add(this.onFocus, this))
        }, 
        c.prototype.onFocusLost = function() {
            a.Main.wasMuted = this.game.sound.mute, this.game.sound.mute = !0
        }, 
        c.prototype.onFocus = function() {
            a.Main.wasMuted === !1 && (this.game.sound.mute = !1)
        }, 
        c.prototype.addBackground = function() {
            new a.Background(this.game, this.world)
        }, 
        c.prototype.addBubbles = function() {
            for (var b = 40, c = 0; b > c; c++) {
                var d = this.game.rnd.realInRange(10, a.Config.GAME_WIDTH - 10),
                    e = this.game.rnd.realInRange(10, a.Config.GAME_HEIGHT - 80),
                    f = this.game.rnd.realInRange(.3, 1),
                    g = this.game.add.image(d, e, "level_graphics", "Small_Bubble0000");
                g.scale.set(f, f)
            }
        }, 
        c.prototype.addOtherImages = function() {
            this.title = this.game.add.image(a.Config.HALF_GAME_WIDTH, 100, "main_menu", "Title0000"), 
            this.title.anchor.set(.5, .5), 
            this.submarine = this.game.add.image(330, a.Config.HALF_GAME_HEIGHT + 25, "main_menu", "Submarine0000"), 
            this.submarine.anchor.set(.5, .5)
        }, 
        c.prototype.addButtons = function() {
            var b = this;
            this.playButton = new a.SimpleButton(this.game, 700, 330, "main_menu", "Play_Button0000"), 
            this.playButton.setCallbackDelay(250), this.playButton.callback.addOnce(this.hideAndStartGame, this), 
            this.moreGamesButton = new a.SimpleButton(this.game, this.playButton.x + 60, this.playButton.y + 94, "main_menu", "MoreGames_Button0000"), 
            this.soundButton = new a.ToggleButton(this.game, this.playButton.x - 60, 
            this.playButton.y + 94, "main_menu", "Music_On_Button0000", "Music_Off_Button0000"),

             this.soundButton.callback.add(function() {
                b.game.sound.mute = !b.game.sound.mute
            }), 
             this.game.sound.mute && this.soundButton.switchTextures(), 
             this.buttons = [this.playButton, this.soundButton, this.moreGamesButton], 
             this.buttons.forEach(function(a) {
                b.world.add(a)
            })
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
            }, 500, Phaser.Easing.Back.In, !0).onComplete.addOnce(function() {
                a.playButton.input.enabled = !0, a.moreGamesButton.input.enabled = !0, a.credits.visible = !1
            }, this)
        }, 
        c.prototype.showCredits = function() {
            var b = this;
            this.credits.visible = !0, this.credits.alpha = 0, 
            this.credits.y = Math.round(.5 * (a.Config.GAME_HEIGHT - this.credits.height)) + 200, 
            this.game.add.tween(this.credits).to({
                y: this.credits.y - 200,
                alpha: 1
            }, 500, Phaser.Easing.Back.Out, !0), 
            this.playButton.input.enabled = !1, 
            this.moreGamesButton.input.enabled = !1, 

            this.game.input.onTap.addOnce(function() {
                b.hideCredits()
            }, this)
        }, 
        c.prototype.onFirstTap = function() {
            this.tryFullscreen(), this.startMusic()
        }, 
        c.prototype.tryFullscreen = function() {
            this.game.device.desktop === !1 && this.game.device.fullScreen && this.game.scale.startFullScreen(!0)
        }, 
        c.prototype.startMusic = function() {
            this.game.sound.play("main_loop", .33, !0), this.soundButton.switchTextures(), this.soundButton.input.enabled = !0
        },
        c.prototype.initAnimation = function() {
            var a = this;
            this.title.y -= 150, this.game.add.tween(this.title).to({
                y: this.title.y + 150
            }, 600, Phaser.Easing.Back.Out, !0, 300), 

            this.submarine.x = 0, 
            this.submarine.scale.set(0, 0), 

            this.game.add.tween(this.submarine).to({
                x: 330
            }, 700, Phaser.Easing.Back.Out, !0, 900), 

            this.game.add.tween(this.submarine.scale).to({
                x: 1,
                y: 1
            }, 700, Phaser.Easing.Back.Out, !0, 900);

            var b = 1300;

            this.buttons.forEach(function(c) {
                c.scale.set(0, 0), a.game.add.tween(c.scale).to({
                    x: 1,
                    y: 1
                }, 300, Phaser.Easing.Back.Out, !0, b), 
                b += 200
            })
        }, 
        c.prototype.update = function() {
            var a = utils.MathUtil.lowPrecisionSin(this.currentAngle * Math.PI) * this.magnitude;
            this.currentAngle += this.deltaAngle, 
            this.currentAngle >= 2 && (this.currentAngle -= 2), 
            this.submarine.y = this.initialY + a
        }, 
        c.prototype.hideAndStartGame = function() {
            var b = this,
                c = 0;
            this.buttons.forEach(function(a) {
                a.inputEnabled = !1, 
                b.game.add.tween(a.scale).to({
                    x: 0,
                    y: 0
                }, 400, Phaser.Easing.Back.In, !0, c), 
                c += 100
            }), 

            this.game.add.tween(this.submarine).to({
                x: a.Config.GAME_WIDTH + 300
            }, 1200, Phaser.Easing.Back.In, !0, 500).onComplete.add(function() {
                b.game.changeState("Level")
            }, this)
        }, 

        c.prototype.destroy = function() {
            this.buttons = null
        }, c
    }(Phaser.State);
    a.MainMenu = b
}(game || (game = {}));