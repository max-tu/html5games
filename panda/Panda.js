var game;
! function(a) {
    var b = function(b) {
        function c(c) {
            b.call(this, c, 0, 0, "panda"), 
            this.anchor.set(.5, 1), 
            this.initAnimations(), 
            a.Main.weakDevice === !1 && 
            this.game.add.tween(this.scale).to({
                y: 1.05
            }, 700, Phaser.Easing.Sinusoidal.Out, !0, 0, Number.MAX_VALUE, !0)
        }
        return __extends(c, b), 
        c.prototype.initAnimations = function() {
            this.idleAnim = this.addAnimation("idle", 0, 0), 
            this.openMouthAnim = this.addAnimation("open_mouth", 1, 1), 
            this.chewAnim = this.addAnimation("chew", 2, 35), 
            this.chewAnim.onComplete.add(this.onChewComplete, this), 
            this.play("idle")
        }, 
        c.prototype.addAnimation = function(a, b, c) {
            var d = Phaser.Animation.generateFrameNames("Panda", b, c, "", 4),
                e = this.animations.add(a, d, 60);
            return e
        }, 
        c.prototype.onChewComplete = function() {
            this.play("idle")
        }, 
        c.prototype.openMouth = function() {
            this.play("open_mouth", 60, !1), 
            this.game.sound.usingWebAudio && Math.random() < .33 && this.game.sound.play("panda_mmm")
        }, 
        c.prototype.chew = function() {
            this.play("chew", 60, !1), 
            this.game.sound.usingWebAudio && this.game.sound.play("panda_chew", .75)
        }, 
        c.prototype.isMouthOpen = function() {
            return "open_mouth" === this.animations.currentAnim.name
        }, 
        c.prototype.destroy = function() {
            b.prototype.destroy.call(this, !0)
        }, c
    }(Phaser.Sprite);
    a.Panda = b
}(game || (game = {}));