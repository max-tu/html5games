var game;
! function(a) {
    var b = function(a) {
        function b(b, c) {
            a.call(this, b, 0, 0, "coin_sparkles"), 
            this.pool = c, this.scale.set(1.7, 1.7), 
            this.anchor.set(.5, .5), 
            this.exists = !1, 
            this.alive = !1, this.initAnimation()
        }
        return __extends(b, a), 
        b.prototype.initAnimation = function() {
            this.animation = this.animations.add("main", null, 60, !1), 
            this.animation.onComplete.add(this.onAnimationComplete, this)
        }, 
        b.prototype.onAnimationComplete = function() {
            this.pool.returnItem(this)
        }, 
        b.prototype.onAddToPool = function() {
            this.exists = !1, this.alive = !1, this.animation.stop(!1, !1)
        }, 
        b.prototype.onRemoveFromPool = function() {
            this.exists = !0, this.alive = !0, this.animation.restart()
        }, 
        b.prototype.update = function() {
            if (this.alive) {
                var a = this.parent.position.x + this.x;
                0 > a && this.pool.returnItem(this)
            }
        }, 
        b.prototype.destroy = function() {
            this.animation.destroy(), this.animation = null, this.pool = null
        }, b
    }(Phaser.Sprite);
    a.CoinSparkles = b
}(game || (game = {}));