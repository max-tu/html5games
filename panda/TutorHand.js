var game;
! function(a) {
    var b = function(a) {
        function b(b, c, d) {
            a.call(this, b, c, d, "tutorial_hand"), 
            this.hidden = !1,
            this.initAnimation(), 
            this.startTweens()
        }
        return __extends(b, a), 
        b.prototype.initAnimation = function() {
            this.animations.add("release", Phaser.Animation.generateFrameNames("Tutorial_Hand", 0, 0, "", 4)), 
            this.animations.add("main", Phaser.Animation.generateFrameNames("Tutorial_Hand", 0, 23, "", 4)), 
            this.play("main", 30, !1)
        }, 
        b.prototype.startTweens = function() {
            var a = this;
            this.hidden || (this.position.set(295, 410), 
                this.alpha = 1, this.play("main", 30, !1), 

                this.game.add.tween(this).to({
                x: 115,
                y: 580
            }, 1300, Phaser.Easing.Linear.None, !0, 750)
                .onComplete.addOnce(function() {
                a.hidden === !1 && (a.game.time.events.add(600, a.startTweens, a), 
                    a.play("release", 30, !1))
            }))
        }, 
        b.prototype.hideAndDestroy = function() {
            this.hidden = !0, 
            this.animations.stop(), 
            this.game.add.tween(this).to({
                alpha: 0
            }, 200, Phaser.Easing.Linear.None, !0)
            .onComplete.addOnce(this.destroy, this)
        }, b
    }(Phaser.Sprite);
    a.TutorHand = b
}(game || (game = {}));