var game;
! function(a) {
    var b = function(a) {
        function b(b, c, d, e, f) {
            var g = this;
            a.call(this, b, c, d, e, f), 
            this.callbackDelay = 20, 
            this.callbackTimer = 0, 
            this.clicked = !1, 
            this._callback = new Phaser.Signal, 
            this.anchor.set(.5, .5), 
            this.inputEnabled = !0, 

            this.game.device.desktop && (this.input.useHandCursor = !0), 

            this.inputEnabled && this.events.onInputDown.add(function() {
                g.game.device.webAudio && g.game.sound.play("tap"), 

                g.game.add.tween(g.scale).to({
                    x: 1.2,
                    y: .8
                }, 200, Phaser.Easing.Back.Out, !0).onComplete.addOnce(function() {
                    g.clicked = !0, g.callbackTimer = 0, g.game.add.tween(g.scale).to({
                        x: 1,
                        y: 1
                    }, 200, Phaser.Easing.Back.Out, !0)
                }, g)
            })
        }
        return __extends(b, a), 
        b.prototype.setCallbackDelay = function(a) {
            this.callbackDelay = a
        }, 
        b.prototype.update = function() {
            this.clicked && (this.callbackTimer += this.game.time.elapsed, 
                this.callbackTimer >= this.callbackDelay && 
                (this._callback.dispatch(), this.clicked = !1, this.callbackTimer = 0))
        }, 
        b.prototype.destroy = function() {
            a.prototype.destroy.call(this), this._callback.dispose(), this._callback = null
        }, 
        Object.defineProperty(b.prototype, "callback", {
            get: function() {
                return this._callback
            },
            enumerable: !0,
            configurable: !0
        }), b
    }(Phaser.Image);
    a.SimpleButton = b
}(game || (game = {}));