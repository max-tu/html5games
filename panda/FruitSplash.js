var game;
! function(a) {
    var b = function(b) {
        function c(a, c) {
            b.call(this, a, 0, 0, "splashes"), 
            this.itemType = c, 
            this.initAnimation(), 
            this.anchor.set(.5, .5), 
            this.scale.set(1.2, 1.2)
        }
        return __extends(c, b), 
        c.prototype.initAnimation = function() {
            var b = "Splash_" + a.ItemType[this.itemType],
                c = Phaser.Animation.generateFrameNames(b, 0, 19, "", 4),
                d = this.animations.add("main", c, 60, !1);
            d.onComplete.addOnce(this.hide, this), 
            d.play()
        }, 
        c.prototype.hide = function() {
            this.exists = !1, 
            this.visible = !1, 
            this.game.time.events.add(100, this.destroy, this)
        }, c
    }(Phaser.Sprite);
    a.FruitSplash = b
}(game || (game = {}));