var game;
! function(a) {
    var b = function(a) {
        function b(b, c, d) {
            a.call(this, b, c), this.initImage(d), this.initText()
        }
        return __extends(b, a), b.prototype.initImage = function(a) {
            this.image = this.game.add.image(0, 0, "level_graphics", a, this)
        }, b.prototype.initText = function() {
            this.textLabel = this.game.add.bitmapText(0, 0, "digits", "0", 30, this), this.textLabel.position.set(55, 6)
        }, b.prototype.updateText = function(a) {
            this.textLabel.setText(a.toString())
        }, b
    }(Phaser.Group);
    a.Label = b
}(game || (game = {}));