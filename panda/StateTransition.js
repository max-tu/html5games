var game;
! function(a) {
    var b = function(b) {
        function c(c, d) {
            b.call(this, c, d), this.overlayDuration = 300, this.active = !0;
            var e = c.add.bitmapData(a.Config.GAME_WIDTH, a.Config.GAME_HEIGHT, "overlay", !0);
            e.context.fillStyle = "rgba(0, 0, 0, 1)", 
            e.context.fillRect(0, 0, a.Config.GAME_WIDTH, a.Config.GAME_HEIGHT), 
            this.overlay = new Phaser.Image(c, 0, 0, e), 
            this.overlay.visible = !1, 
            this.overlay.exists = !1, 
            this.game.stage.addChild(this.overlay)
        }
        return __extends(c, b), c.prototype.changeState = function(a, b) {
            this.showOverlay(a, b)
        }, 
        c.prototype.showOverlay = function(a, b) {
            var c = this;
            this.game.input.disabled = !0, this.overlayTween && 
            this.overlayTween.isRunning && this.overlayTween.stop(), 
            this.overlay.visible = !0, this.overlay.alpha = 0, 

            this.overlayTween = this.game.add.tween(this.overlay).to({
                alpha: 1
            }, this.overlayDuration, Phaser.Easing.Cubic.Out, !0), 

            this.overlayTween.onComplete.addOnce(function() {
                c.doChangeState(a, b)
            }, this)
        }, 
        c.prototype.doChangeState = function(a, b) {
            var c = this;
            this.game.state.start(a, !0, !1, b), setTimeout(function() {
                c.hideOverlay()
            }, 100), setTimeout(function() {
                c.overlay.visible = !1, c.overlay.exists = !1
            }, 100 + this.overlayDuration)
        }, 
        c.prototype.hideOverlay = function() {
            this.game.input.disabled = !1, 
            this.overlayTween && this.overlayTween.isRunning && this.overlayTween.stop(), 
            this.overlayTween = this.game.add.tween(this.overlay).to({
                alpha: 0
            }, this.overlayDuration, Phaser.Easing.Cubic.Out, !0)
        }, c
    }(Phaser.Plugin);
    a.StateTransition = b
}(game || (game = {}));