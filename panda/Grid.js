var game;
! function(a) {
    var b = function(b) {
        function c(a, c) {
            b.call(this, a, c, "grid"), 
            this._rows = 8, 
            this._columns = 7, 
            this.initCells(), 
            this.addFrame()
        }
        return __extends(c, b), 
        c.prototype.initCells = function() {
            this.cells = [];
            for (var a = !0, b = 0; b < this._rows; b++)
                for (var c = 0; c < this._columns; c++) {
                    var d = a ? "Dark_Cell0000" : "Bright_Cell0000";
                    a = !a, this.addCell(b, c, d)
                }
        }, 
        c.prototype.addCell = function(b, c, d) {
            var e = b * this._columns + c;
            if (this.cells[e]) return null;
            var f = new game.Cell(this.game, d, b, c);
            return f.x = a.Cell.WIDTH * c, 
            f.y = a.Cell.HEIGHT * b, 
            this.cells[e] = f,
             this.add(f), f
        }, 
        c.prototype.addFrame = function() {
            var a = this.game.add.image(0, 0, "graphics_1", "Board_Frame0000", this);
            a.x = -12, a.y = -12
        }, 
        c.prototype.getCellAt = function(a, b) {
            var c = a * this._columns + b;
            return this.cells[c]
        }, 
        c.prototype.getFreeCell = function() {
            for (var a = 0; a < this.cells.length; a++) {
                var b = this.cells[a];
                if (b.isFree()) return b
            }
            return null
        }, 
        c.prototype.getFreeCellsNum = function() {
            var a = 0;
            return this.cells.forEach(function(b) {
                b.isFree() && a++
            }), a
        }, 
        c.prototype.getCellUnderPoint = function(a, b) {
            var c = a - this.position.x,
                d = b - this.position.y,
                e = Math.floor(d / game.Cell.WIDTH),
                f = Math.floor(c / game.Cell.HEIGHT);
            return this.getCellAt(e, f)
        }, 
        c.prototype.getWidth = function() {
            var a = this.cells[0].x,
                b = this.cells[this.cells.length - 1].x + this.cells[this.cells.length - 1].width;
            return b - a
        }, 
        c.prototype.getHeight = function() {
            var a = this.cells[0].y,
                b = this.cells[this.cells.length - 1].y + this.cells[this.cells.length - 1].height;
            return b - a
        }, 
        c.prototype.destroy = function() {
            b.prototype.destroy.call(this, !0, !1), this.cells = null
        }, 
        Object.defineProperty(c.prototype, "rows", {
            get: function() {
                return this._rows
            },
            enumerable: !0,
            configurable: !0
        }), 
        Object.defineProperty(c.prototype, "columns", {
            get: function() {
                return this._columns
            },
            enumerable: !0,
            configurable: !0
        }), c
    }(Phaser.Group);
    a.Grid = b
}(game || (game = {}));