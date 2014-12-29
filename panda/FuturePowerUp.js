var game;
! function(a) {
    var b = function(a) {
        function b(b) {
            a.call(this, b, 0, 0, "graphics_1", "FutureBonus_10000"), 
            this._activateSignal = new Phaser.Signal, 
            this.anchor.set(.5, .5), 

            this.pulseTween = this.game.add.tween(this.scale).to({
                x: .8,
                y: .8
            }, 500, Phaser.Easing.Sinusoidal.Out, !0, 0, Number.MAX_VALUE, !0), 
            this.pulseTween.pause(), 
            this.alive = !1, 
            this.exists = !1, 
            this.visible = !1
        }
        return __extends(b, a), 
        b.prototype.activate = function() {
            this._activateSignal.dispatch(this), this.onAddToPool()
        }, 
        b.prototype.onAddToPool = function() {
            this.alive = !1, this.exists = !1, this.visible = !1, this.pulseTween.pause()
        }, 
        b.prototype.onRemoveFromPool = function() {
            this.alive = !0, this.exists = !0, this.visible = !0, this.pulseTween.resume()
        }, 
        b.prototype.destroy = function() {
            a.prototype.destroy.call(this, !0), 
            this.pulseTween && (this.pulseTween.stop(), this.pulseTween = null), 
            this._activateSignal.dispose(), 
            this._activateSignal = null
        }, 
        Object.defineProperty(b.prototype, "activateSignal", {
            get: function() {
                return this._activateSignal
            },
            enumerable: !0,
            configurable: !0
        }), b
    }(Phaser.Image);
    a.FuturePowerUp = b
}(game || (game = {}));