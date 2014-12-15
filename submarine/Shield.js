var game;
! function(a) {
    var b = function(a) {
        function b(b, c) {
            a.call(this, b, 0, 0, "level_graphics", "Shield0000"), 
            this.timer = 0, this.timeToFlick = 0, 
            this.isFlicking = !1, this.paused = !1, 
            this.submarine = c, 
            this.exists = !1, this.visible = !1, 
            this.anchor.set(.5, .5), 
            this._onDeactivated = new Phaser.Signal,
             this.initFlickTween()
        }
        return __extends(b, a), 
        b.prototype.initFlickTween = function() {
            this.flickTween = this.game.add.tween(this).to({
                alpha: .2
            }, 100, Phaser.Easing.Linear.None, !1, 0, Number.MAX_VALUE, !0)
        }, 
        b.prototype.activate = function(a) {
            this.timer = a, 
            this.timeToFlick = .33 * this.timer, 
            this.scale.set(0, 0), 
            this.game.add.tween(this.scale).to({
                x: 1,
                y: 1
            }, 200, Phaser.Easing.Back.Out, !0), 

            this.exists = !0, 
            this.visible = !0, 
            this.alpha = 1
        }, 
        b.prototype.update = function() {
            this.visible && this.paused === !1 && 
            (this.timer -= this.game.time.elapsed, 
                this.isFlicking === !1 && this.timer <= this.timeToFlick && this.startFlick(), 
                this.timer < 0 && this.deactivate(), 
                this.updatePositionAndAngle())

        }, 
        b.prototype.updatePositionAndAngle = function() {
            this.x = this.submarine.x,
             this.y = this.submarine.y,
              this.angle = this.submarine.angle
        }, 
        b.prototype.startFlick = function() {
            this.isFlicking = !0, 
            this.flickTween.isRunning ? this.flickTween.resume() : this.flickTween.start()
        },
         b.prototype.stopFlick = function() {
            this.isFlicking = !1, 
            this.flickTween.pause(),
             this.alpha = 1
        }, 
        b.prototype.deactivate = function() {
            this.stopFlick(),
             this.exists = !1, this.visible = !1, 
             this._onDeactivated.dispatch()
        }, 
        b.prototype.destroy = function() {
            this.flickTween.stop(),
             this.flickTween = null,
             this._onDeactivated.dispose(), 
             this._onDeactivated = null
        }, 
        Object.defineProperty(b.prototype, "onDeactivated", {
            get: function() {
                return this._onDeactivated
            },
            enumerable: !0,
            configurable: !0
        }), b
    }(Phaser.Image);
    a.Shield = b
}(game || (game = {}));