var game;
! function(a) {
    var b = function(a) {
        function b(b, c, d) {
            a.call(this, b, 0, 0, "screws"), 
            this.submarineBodyType = -1, 
            this.angle = -90, this.scale.set(.8, .25), 
            this.anchor.set(.5, .5), 
            this.submarine = c,
            this.setAnimation(d)
        }
        return __extends(b, a), 
        b.getFramesPrefix = function(a) {
            return "Fan_" + a.toString() + "_In"
        }, 
        b.prototype.setAnimation = function(a) {
            if (this.submarineBodyType !== a) {
                this.submarineBodyType = a;
                var c = b.getFramesPrefix(this.submarineBodyType),
                    d = Phaser.Animation.generateFrameNames(c, 0, 20, "", 4);
                this.animation = this.animations.add("main", d, 60, !0), this.animation.play()
            }
        }, 
        b.prototype.updatePosition = function() {
            var a = this.submarine.rotation,
                b = 50;
            this.angle = -90 + this.submarine.angle, 
            this.x = this.submarine.x - utils.MathUtil.lowPrecisionCos(a) * b, 
            this.y = this.submarine.y - utils.MathUtil.lowPrecisionSin(a) * b
        }, 
        b.prototype.resumeAnimation = function() {
            this.animation.restart()
        }, 
        b.prototype.stopAnimation = function() {
            this.animation.paused = !0
        }, 
        b.prototype.destroy = function() {
            this.animation.destroy(), this.animation = null
        }, b
    }(Phaser.Sprite);
    a.Screw = b
}(game || (game = {}));