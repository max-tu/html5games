var game;
! function(a) {
    var b = function(a) {
        function b(b) {
            a.call(this, b, 0, 0, "round_complete", "Button_Sign0000"), 
            this.exists = !1, 
            this.visible = !1, 
            this.anchor.set(.5, .5), 

            this.shakeTween = this.game.add.tween(this.scale).to({
                x: 1.15,
                y: .85
            }, 200, Phaser.Easing.Cubic.Out, !0, 0, 1e4, !0), 

            this.shakeTween.pause()
        }
        return __extends(b, a), 

        b.prototype.show = function(a) {
            this.exists = !0, this.visible = !0, this.alpha = 0, this.game.add.tween(this).to({
                alpha: 1
            }, 100, Phaser.Easing.Linear.None, !0, a).onComplete.addOnce(this.startShake, this)
        }, 

        b.prototype.startShake = function() {
            this.shakeTween.resume()
        }, 
        b.prototype.hide = function() {
            this.exists = !1, this.visible = !1, this.shakeTween.pause()
        },
        b.prototype.destroy = function() {
            this.shakeTween.stop(), this.shakeTween = null
        }, b
    }(Phaser.Image);
    a.UpgradesSign = b
}(game || (game = {}));