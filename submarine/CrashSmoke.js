var game;
! function(a) {
    var b = function(a) {
        function b(b, c, d) {
            a.call(this, b, 0, 0, "crash_smoke_1"), 
            this.submarine = c, 
            this.submarineOffset = d, 
            this.scale.set(1.5, 1.5), 
            this.anchor.set(.5, .5), 
            this.angle = -60, 
            this.exists = !1, 
            this.visible = !1, 

            this.animation = this.animations.add("main", null, 60, !0)
        }
        return __extends(b, a), 
        b.prototype.show = function() {
            this.exists = !0, this.visible = !0, this.animation.restart()
        }, 
        b.prototype.hide = function() {
            this.exists = !1, this.visible = !1, this.animation.stop(!1, !1)
        }, 
        b.prototype.update = function() {
            this.visible && (this.x = this.submarine.x + this.submarineOffset.x, 
                this.y = this.submarine.y + this.submarineOffset.y)
        }, 
        b.prototype.destroy = function() {
            this.submarine = null, 
            this.animation.destroy(), 
            this.animation = null
        }, b
    }(Phaser.Sprite);
    a.CrashSmoke = b
}(game || (game = {}));