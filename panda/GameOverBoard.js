var game;
! function(a) {
    var b = function(b) {
        function c(a, c) {
            b.call(this, a, c, "complete_board"), 
            this.hideDuration = 600, 
            this.exists = !1, 
            this.visible = !1, 
            this._playAgainSignal = new Phaser.Signal, 
            this.initBack(), 
            this.initTitleText(), 
            this.initTextContent(), 
            this.initButtons()
        }
        return __extends(c, b), 
        c.prototype.initBack = function() {
            this.back = this.game.add.image(0, 0, "graphics_1", "TaskBoard_Back0000", this), 
            this.back.anchor.set(.5, .5)
        }, 
        c.prototype.initTitleText = function() {
            var b = a.Main.texts.game_over,
                c = {
                    font: "46px GrilledCheeseBTNToasted",
                    fill: "#FBAF05",
                    align: "center"
                };
            this.titleText = new Phaser.Text(this.game, 0, -106, b, c), 
            this.titleText.anchor.set(.5, .5), 
            this.titleText.stroke = "#FFFFFF", 
            this.titleText.strokeThickness = 10, 
            this.titleText.setShadow(2, 2, "#FB1A05", 2), 
            this.add(this.titleText)
        }, 
        c.prototype.initTextContent = function() {
            this.addText(a.Main.texts.max_level, -40), 
            this.maxLevelText = this.addText("10", -5), 
            this.addText(a.Main.texts.scores, 60), 
            this.pointsText = this.addText("10450", 95)
        }, 
        c.prototype.addText = function(a, b) {
            var c = {
                font: "34px GrilledCheeseBTNToasted",
                fill: "#FFFFFF",
                align: "center"
            }, d = new Phaser.Text(this.game, 0, b, a, c);
            return d.anchor.set(.5, .5), 
            d.setShadow(2, 2, "#FB1A05", 2), 
            this.add(d), d
        }, 
        c.prototype.initButtons = function() {
            var b = this,
                c = 80,
                d = this.back.y + .5 * this.back.height + 20;
            this.playAgainButton = new a.SimpleButton(this.game, -c, d, "buttons", "Button_Restart0000"), 
            this.playAgainButton.callback.add(this.onPlayAgainButtonClick, this), 
            this.quitButton = new a.SimpleButton(this.game, c, d, "buttons", "Button_Menu0000"), 
            this.quitButton.callback.add(this.onQuitButtonClick, this), 
            this.buttons = [this.playAgainButton, this.quitButton], 

            this.buttons.forEach(function(a) {
                a.exists = !1, 
                a.visible = !1, 
                b.add(a)
            })
        }, 
        c.prototype.onPlayAgainButtonClick = function() {
            this.hide()
        }, 
        c.prototype.onQuitButtonClick = function() {
            this.game.sound.play("main_loop", .33, !0), 
            this.game.changeState("MainMenu")
        }, 
        c.prototype.show = function(a, b) {
            this.exists = !0, 
            this.visible = !0, 
            this.maxLevelText.setText(a.toString()), 
            this.pointsText.setText(b.toString()), 
            this.showBoard(), 
            this.showButtons()
        }, 
        c.prototype.showBoard = function() {
            this.alpha = 0, this.position.set(a.Config.HALF_GAME_WIDTH, a.Config.HALF_GAME_HEIGHT - 50), 
            this.game.add.tween(this).to({
                alpha: 1
            }, 100, Phaser.Easing.Linear.None, !0), 

            this.game.add.tween(this.position).to({
                y: a.Config.HALF_GAME_HEIGHT
            }, 1500, Phaser.Easing.Cubic.Out, !0)
        }, 
        c.prototype.showButtons = function() {
            var a = this,
                b = 1200;
            this.buttons.forEach(function(c) {
                c.exists = !0, 
                c.visible = !0, 
                c.alpha = 0, 
                a.game.add.tween(c).to({
                    alpha: 1
                }, 500, Phaser.Easing.Cubic.Out, !0, b), 
                b += 200
            })
        }, 
        c.prototype.hide = function() {
            var b = 100;
            this.game.add.tween(this).to({
                alpha: 0
            }, b, Phaser.Easing.Linear.None, !0, 
            this.hideDuration - b), 

            this.game.add.tween(this.position).to({
                y: a.Config.HALF_GAME_HEIGHT - 200
            }, this.hideDuration, Phaser.Easing.Back.In, !0)
            .onComplete.addOnce(this.onHideComplete, this)
        }, 
        c.prototype.onHideComplete = function() {
            this._playAgainSignal.dispatch(), this.exists = !1, this.visible = !1
        }, 
        c.prototype.destroy = function() {
            b.prototype.destroy.call(this, !0, !1), 
            this.buttons = null, 
            this._playAgainSignal.dispose(), 
            this._playAgainSignal = null
        }, 
        Object.defineProperty(c.prototype, "playAgainSignal", {
            get: function() {
                return this._playAgainSignal
            },
            enumerable: !0,
            configurable: !0
        }), c
    }(Phaser.Group);
    a.GameOverBoard = b
}(game || (game = {}));