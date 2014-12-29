var game;
! function(a) {
    var b = function(b) {
        function c(c, d) {
            b.call(this, c, d, "pause_board"), 
            this.initBack(), 
            this.initText(), 
            this.initButtons(), 
            this.position.set(a.Config.HALF_GAME_WIDTH, a.Config.HALF_GAME_HEIGHT), 
            this.exists = !1, 
            this.visible = !1
        }
        return __extends(c, b), 
        c.prototype.initBack = function() {
            var a = this.game.add.image(0, 0, "graphics_1", "TaskBoard_Back0000", this);
            a.anchor.set(.5, .5)
        }, 
        c.prototype.initText = function() {
            var b = a.Main.texts.pause,
                c = {
                    font: "56px GrilledCheeseBTNToasted",
                    fill: "#FBAF05",
                    align: "center"
                }, d = new Phaser.Text(this.game, 0, -54, b, c);
            d.anchor.set(.5, .5), d.stroke = "#FFFFFF", 
            d.strokeThickness = 12, 
            d.setShadow(2, 2, "#FB1A05", 2), 
            this.add(d), 
            this.game.device.firefox === !1 ? d.lineSpacing = -12 : d.position.y += 10
        }, 
        c.prototype.initButtons = function() {
            var b = this,
                c = 96,
                d = 120;
            this._resumeButton = new a.SimpleButton(this.game, 0, c, "buttons", "Button_Resume0000"), 
            this.soundButton = 
            new a.ToggleButton(this.game, this._resumeButton.x + d, c, "buttons", "Button_Music_On0000", "Button_Music_Off0000"), 

            this.soundButton.callback.add(function() {
                b.game.sound.mute = !b.game.sound.mute
            }), 
            this.game.sound.mute && this.soundButton.switchTextures(), 
            this.menuButton = new a.SimpleButton(this.game, this._resumeButton.x - d, c, "buttons", "Button_Menu0000"), 
            this.menuButton.callback.addOnce(this.gotoMainMenu, this), 
            this.buttons = [this.menuButton, this._resumeButton, this.soundButton], 

            this.buttons.forEach(function(a) {
                b.add(a)
            })
        }, 
        c.prototype.gotoMainMenu = function() {
            this.game.changeState("MainMenu")
        }, 
        c.prototype.show = function() {
            this.game.sound.usingWebAudio && this.game.sound.play("whoosh", .33), 
            this.exists = !0, this.visible = !0, 
            this.position.y = a.Config.HALF_GAME_HEIGHT + 200, 
            this.alpha = 0,

             this.game.add.tween(this).to({
                alpha: 1
            }, 200, Phaser.Easing.Linear.None, !0), 

             this.game.add.tween(this.position).to({
                y: a.Config.HALF_GAME_HEIGHT
            }, 500, Phaser.Easing.Back.Out, !0).
             onComplete.addOnce(this.onShowComplete, this)
        }, 
        c.prototype.onShowComplete = function() {}, c.prototype.hide = function() {
            this.game.sound.usingWebAudio && this.game.sound.play("whoosh_out", .33), 
            this.game.add.tween(this).to({
                alpha: 0
            }, 100, Phaser.Easing.Linear.None, !0, 400), 
            this.game.add.tween(this.position).to({
                y: a.Config.HALF_GAME_HEIGHT - 200
            }, 500, Phaser.Easing.Back.In, !0)
            .onComplete.addOnce(this.onHideComplete, this)
        }, 

        c.prototype.onHideComplete = function() {
            this.exists = !1, this.visible = !1
        }, 
        c.prototype.destroy = function() {
            b.prototype.destroy.call(this, !0, !1), this.buttons = null
        }, 
        Object.defineProperty(c.prototype, "resumeButton", {
            get: function() {
                return this._resumeButton
            },
            enumerable: !0,
            configurable: !0
        }), c
    }(Phaser.Group);
    a.PauseBoard = b
}(game || (game = {}));