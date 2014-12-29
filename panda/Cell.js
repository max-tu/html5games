var game;
! function(a) {
    var b = function(a) {
        function b(b, c, d, e) {
            a.call(this, b, 0, 0, "graphics_1", c), 
            this.item = null, 
            this._row = d, 
            this._column = e
        }
        return __extends(b, a), 
        b.prototype.isFree = function() {
            return null === this.item
        }, 
        Object.defineProperty(b.prototype, "column", {
            get: function() {
                return this._column
            },
            enumerable: !0,
            configurable: !0
        }), 
        Object.defineProperty(b.prototype, "row", {
            get: function() {
                return this._row
            },
            enumerable: !0,
            configurable: !0
        }), b.WIDTH = 84, b.HEIGHT = 84, b
    }(Phaser.Image);
    a.Cell = b
}(game || (game = {}));