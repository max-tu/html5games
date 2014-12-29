var game;
! function(a) {
    var b = function(b) {
        function c(c, d) {
            var e = a.ItemType[d];
            this.normalTexture = e + "0000", 
            this.highlightedTexture = e + "_Highlighted0000", 
            b.call(this, c, 0, 0, "graphics_1", this.normalTexture), 
            this.anchor.set(.5, .5)
        }
        return __extends(c, b), 
        c.prototype.setNormalTexture = function() {
            this.loadTexture("graphics_1", this.normalTexture)
        }, 
        c.prototype.setHighlightedTexture = function() {
            this.loadTexture("graphics_1", this.highlightedTexture)
        }, c
    }(Phaser.Image);
    a.ItemBody = b
}(game || (game = {}));