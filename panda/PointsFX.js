var game;
! function(a) {
    var b = function(a) {
        function b(b, c) {
            var d = {
                font: "26px GrilledCheeseBTNToasted",
                fill: "#296B98",
                align: "center"
            };
            a.call(this, b, 0, 0, c, d), 
            this.stroke = "#FFFFFF", 
            this.strokeThickness = 8, 
            this.anchor.set(.5, .5),
            this.initTweens(), 
            this.exists = !1, 
            this.visible = !1, 
            this.alive = !1
        }
        return __extends(b, a), 
        b.prototype.initTweens = function() {
            this.scale.set(0, 0), 
            this.showTween = this.game.add.tween(this.scale).to({
                x: 1,
                y: 1
            }, 500, Phaser.Easing.Back.Out), 

            this.hideTween = this.game.add.tween(this).to({
                alpha: 0
            }, 200, Phaser.Easing.Linear.None, !1, 600), 

            this.hideTween.onComplete.add(this.onAddToPool, this)
        }, 
        b.prototype.updateValue = function(a) {
            this.setText("+" + a)
        }, 
        b.prototype.show = function() {
            this.exists = !0, 
            this.visible = !0, 
            this.alpha = 1, 
            this.scale.set(0, 0), 
            this.showTween.start(), this.hideTween.start()
        }, 
        b.prototype.onAddToPool = function() {
            this.exists = !1, this.visible = !1, this.alive = !1
        }, 
        b.prototype.onRemoveFromPool = function() {
            this.exists = !0, this.visible = !0, this.alive = !0
        }, 
        b.prototype.destroy = function() {
            a.prototype.destroy.call(this, !0), 
            this.showTween.stop(), 
            this.showTween = null, 
            this.hideTween.stop(), 
            this.hideTween = null
        }, b
    }(Phaser.Text);
    a.PointsFX = b
}(game || (game = {}));