var game;
! function(a) {
    var b = function(a) {
        function b(b, c) {
            var d = {
                font: "35px GrilledCheeseBTNToasted",
                fill: "#FBAF05",
                align: "center"
            };
            a.call(this, b, 0, 0, c, d), 
            this.stroke = "#FFFFFF", 
            this.strokeThickness = 11, 
            this.anchor.set(.5, .5), 
            this.initTweens(), 
            this.exists = !1, this.visible = !1
        }
        return __extends(b, a), 
        b.prototype.initTweens = function() {
            this.scale.set(0, 0), 
            this.showTween = this.game.add.tween(this.scale).to({
                x: 1,
                y: 1
            }, 800, Phaser.Easing.Elastic.Out), 
            this.hideTween = this.game.add.tween(this).to({
                alpha: 0
            }, 200, Phaser.Easing.Linear.None, !1, 900), 

            this.hideTween.onComplete.add(this.onHideComplete, this)
        }, 

        b.prototype.show = function() {
            this.exists = !0, this.visible = !0, 
            this.alpha = 1, this.scale.set(0, 0), 
            this.showTween.start(), this.hideTween.start(), 

            this.game.add.tween(this).to({
                y: this.y - 30
            }, 300, Phaser.Easing.Back.In, !0, 700)
        }, 
        b.prototype.onHideComplete = function() {
            this.exists = !1, this.visible = !1
        }, b.prototype.destroy = function() {
            a.prototype.destroy.call(this, !0), 
            this.showTween.stop(), this.showTween = null, 
            this.hideTween.stop(), this.hideTween = null
        }, b
    }(Phaser.Text);
    a.TextFX = b
}(game || (game = {}));