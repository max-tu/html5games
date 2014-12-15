var game;
! function(a) {
    var b = function(a) {
        function b(b, c) {
            a.call(this, b, c, "coins_label"), 
            this.labelOffset = 0, 
            this.labelOffset = this.game.device.firefox ? 10 : 0, this.addBack(), this.addLabel()
        }
        return __extends(b, a), b.prototype.addBack = function() {
            this.back = this.game.add.image(0, 0, "upgrades", "Money_Label0000", this), this.back.anchor.set(.5, .5)
        }, 
        b.prototype.addLabel = function() {
            var a = {
                font: "30px GrilledCheeseBTNToasted",
                fill: "#FFE72C",
                align: "center"
            }, b = "12345";
            this.label = this.game.add.text(0, 0, b, a, this), 
            this.label.anchor.set(.5, .5), 
            this.label.stroke = "#1C7597", 
            this.label.strokeThickness = 7, 
            this.game.device.firefox && (this.label.position.y += this.labelOffset)
        }, 
        b.prototype.updateCoinsValue = function(a, b) {
            this.label.setText("$" + a.toString()), b === !1 && 
            (this.game.add.tween(this.label).to({
                angle: 5
            }, 200, Phaser.Easing.Back.Out, !0, 0, 1, !0), 
            this.game.add.tween(this.label.scale).to({
                x: 1.2,
                y: 1.2
            }, 200, Phaser.Easing.Back.Out, !0, 0, 1, !0))
        }, 
        b.prototype.shake = function() {
            var a = this;
            this.label.y -= 3, 
            this.game.add.tween(this.label).to({
                y: this.label.y + 3
            }, 100, Phaser.Easing.Linear.None, !0, 0, 3, !0).onComplete.addOnce(function() {
                a.label.y = a.labelOffset
            }, this)
        }, 

        b.prototype.destroy = function() {
            this.back = null, this.label = null
        }, b
    }(Phaser.Group);
    a.CoinsLabel = b
}(game || (game = {}));