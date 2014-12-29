var game;
! function(a) {
    var b = function(b) {
        function c(c) {
            b.call(this, c, 0, 0, a.Main.texts.level_complete, {
                font: "94px GrilledCheeseBTNToasted",
                fill: "#FBAF05",
                align: "center"
            }), this.showDelay = 650, 
            this.showDuration = 500, 
            this.waitDelay = 750, 
            this.hideDuration = 400, 
            this.stroke = "#FFFFFF", 
            this.strokeThickness = 12, 
            this.setShadow(2, 2, "#FB1A05", 3), 
            this.exists = !1, this.visible = !1, 
            this.anchor.set(.5, .5), this.position.set(a.Config.HALF_GAME_WIDTH, a.Config.HALF_GAME_HEIGHT), 
            this._hideCompleteSignal = new Phaser.Signal, 
            this.events.onAddedToGroup.addOnce(this.onAddedToGroup, this)
        }
        return __extends(c, b), 
        c.prototype.onAddedToGroup = function() {
            this.lineSpacing = this.game.device.firefox ? 0 : this.game.device.mobileSafari ? -10 : -20
        }, 
        c.prototype.show = function() {
            this.game.time.events.add(this.showDelay, this.doShow, this)
        }, 
        c.prototype.doShow = function() {
            this.game.sound.usingWebAudio && this.game.sound.play("level_up", .5), 
            this.exists = !0, 
            this.visible = !0, 
            this.y = a.Config.HALF_GAME_HEIGHT + 100, 
            this.alpha = 0, 
            this.scale.set(0, 1), 

            this.game.add.tween(this).to({
                alpha: 1
            }, 200, Phaser.Easing.Linear.None, !0), 

            this.game.add.tween(this).to({
                y: a.Config.HALF_GAME_HEIGHT
            },  this.showDuration, Phaser.Easing.Back.Out, !0), 

            this.game.add.tween(this.scale).to({
                x: 1
            }, this.showDuration, Phaser.Easing.Back.Out, !0)
            .onComplete.addOnce(this.wait, this)
        }, 
        c.prototype.wait = function() {
            this.game.time.events.add(this.waitDelay, this.hide, this)
        }, c.prototype.hide = function() {
            this.game.sound.usingWebAudio && this.game.sound.play("whoosh_out", .33);
            var b = 100,
                c = this.hideDuration - b;

            this.game.add.tween(this).to({
                alpha: 0
            }, b, Phaser.Easing.Linear.None, !0, c), 

            this.game.add.tween(this).to({
                y: a.Config.HALF_GAME_HEIGHT - 100
            }, this.hideDuration, Phaser.Easing.Back.In, !0)
            .onComplete.addOnce(this.onHideComplete, this)
        }, 
        c.prototype.onHideComplete = function() {
            var a = this;
            this.exists = !1, this.visible = !1, 
            this.game.time.events.add(400, function() {
                a._hideCompleteSignal.dispatch()
            }, this)
        }, 
        c.prototype.destroy = function() {
            b.prototype.destroy.call(this, !0), 
            this._hideCompleteSignal.dispose(), 
            this._hideCompleteSignal = null
        }, 
        Object.defineProperty(c.prototype, "hideCompleteSignal", {
            get: function() {
                return this._hideCompleteSignal
            },
            enumerable: !0,
            configurable: !0
        }), c
    }(Phaser.Text);
    a.LevelUpFX = b
}(game || (game = {}));