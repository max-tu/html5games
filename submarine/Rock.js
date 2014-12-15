var game;
! function(a) {
    var b = function(b) {
        function c(c, d, e, f) {
            b.call(this, c, d, e, "level_graphics", f), 
            this.alive = !1, 
            this.objectType = 1,
             this.screenX = 0, 
             this._ellipseWidth = 0,
              this._ellipseHeight = 0, 
              this.name = f, this.exists = !1, 
              this.visible = !1, 
              this.anchor.set(.5, .5), 
              this.scrollComponent = new a.ScrollComponent(this)
        }
        return __extends(c, b), 
        c.prototype.setShapeParams = function(b, c) {
            this._ellipseWidth = b, 
            this._ellipseHeight = c,
             a.Main.development && this.initDebugShape()
        }, 
        c.prototype.initDebugShape = function() {
            var a = new Phaser.Graphics(this.game, 0, 0);
            a.beginFill(16711680, .75), 
            a.drawEllipse(0, 0, .5 * this.width, .5 * this.height), 
            a.endFill(), 
            this.debugShape = this.game.add.image(0, 0, "rock_debug_shape", null, this.parent), 
            this.debugShape.setTexture(a.generateTexture()), 
            this.debugShape.anchor.set(.5, .5), 
            this.debugShape.visible = !1, a.destroy()
        }, 
        c.prototype.update = function() {
            this.alive && this.scrollComponent.update()
        },
         c.prototype.startDebugRender = function() {
            this.debugShape && (this.debugShape.visible = !0)
        }, 
        c.prototype.debugRender = function() {
            this.debugShape && (this.debugShape.x = this.x, this.debugShape.y = this.y)
        }, 
        c.prototype.stopDebugRender = function() {
            this.debugShape && (this.debugShape.visible = !1)
        }, 
        c.prototype.onAddToPool = function() {
            this.exists = !1, this.visible = !1, this.alive = !1
        }, 
        c.prototype.onRemoveFromPool = function() {
            this.alive = !0, this.exists = !0
        }, 
        c.prototype.destroy = function() {
            this.scrollComponent.destroy(), 
            this.scrollComponent = null, 
            this.debugShape = null
        }, 
        Object.defineProperty(c.prototype, "ellipseWidth", {
            get: function() {
                return this._ellipseWidth
            },
            enumerable: !0,
            configurable: !0
        }), 
        Object.defineProperty(c.prototype, "ellipseHeight", {
            get: function() {
                return this._ellipseHeight
            },
            enumerable: !0,
            configurable: !0
        }), c
    }(Phaser.Image);
    a.Rock = b
}(game || (game = {}));
///////////////////////////////////////////////////////////////////////////////////////////////////////
var game;
! function(a) {
    var b = function() {
        function b(a, b) {
            this._game = a, this.objectsLayer = b, this.initItems()
        }
        return b.prototype.initItems = function() {
            this.items = [];
            var b = {
                Rock_10000: 5,
                Rock_20000: 4,
                Rock_40000: 4,
                Rock_50000: 2
            };
            for (var c in b)
                if (b.hasOwnProperty(c))
                    for (var d = b[c], e = 0; d > e; e++) {
                        var f = new a.Rock(this._game, 0, 0, c);
                        this.objectsLayer.addAt(f, 0), this.items.push(f)
                    }
        }, 
        b.prototype.getItem = function(b) {
            var c = this.getAvailableRock(b);
            return null === c && (c = new a.Rock(this._game, 0, 0, b), 
                this.items.push(c), 
                this.objectsLayer.add(c)), c.onRemoveFromPool(), c
        }, 
        b.prototype.getAvailableRock = function(a) {
            for (var b = this.items.length, c = 0; b > c; c++) {
                var d = this.items[c];
                if (d.alive === !1 && d.name === a) return d
            }
            return null
        }, 
        b.prototype.returnItem = function(a) {
            a.onAddToPool()
        },
        b.prototype.doReset = function() {
            for (var a = this.items.length, b = 0; a > b; b++) {
                var c = this.items[b];
                c.alive && this.returnItem(c)
            }
        }, 
        b.prototype.destroy = function() {
            this._game = null, 
            this.objectsLayer = null, 
            this.items.length = 0, 
            this.items = null
        }, b
    }();
    a.RocksPool = b
}(game || (game = {}));