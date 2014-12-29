var game;
! function(a) {
    var b = function(a) {
        function b() {
            a.call(this)
        }
        return __extends(b, a), b
    }(utils.ObjectPool);
    a.ChainLinksPool = b
}(game || (game = {}));
/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/    
var game;
! function(a) {
    var b = function(b) {
        function c(a) {
            b.call(this, a, 0, 0, "graphics_1", "Chain_Link0000"), 
            this.anchor.set(.5, .5), this.exists = !1, this.visible = !1, this.initTween()
        }
        return __extends(c, b), 
        c.prototype.initTween = function() {
            this.scale.set(0, 1), 
            this.showTween = this.game.add.tween(this.scale).to({
                x: 1
            }, 150, Phaser.Easing.Linear.None), 
            this.scale.set(1, 1)
        }, 
        c.prototype.show = function() {
            this.visible = !0, 
            this.exists = !0, 
            a.Main.weakDevice === !1 && (this.scale.set(0, 1), 
                this.showTween.start())
        }, 
        c.prototype.hide = function() {
            this.exists = !1, this.visible = !1
        }, 
        c.prototype.destroy = function() {
            b.prototype.destroy.call(this, !0), 
            this.showTween.stop(), 
            this.showTween = null
        }, c
    }(Phaser.Image);
    a.ChainLink = b
}(game || (game = {}));
/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/    
var game;
! function(a) {
    var b = function() {
        function a(a, b, c) {
            this.stack = [], 
            this.foundChain = [], 
            this.game = a, 
            this.grid = b, 
            this.items = c
        }
        return a.prototype.getPossibleMove = function() {
            for (var a = this.items.length, b = 0; a > b; b++) {
                var c = this.items[b],
                    d = this.getPossibleChain(c);
                if (d && d.length >= 3) return d
            }
            return null
        }, 
        a.prototype.getPossibleChain = function(a) {
            this.stack.length = 0, this.stack.push(a), this.foundChain.length = 0;
            for (var b = a.itemType; this.stack.length > 0;) {
                var c = this.stack.pop();
                if (this.foundChain.push(c), this.foundChain.length > 2) 
                    return this.foundChain;
                this.putInStack(c, b, -1, -1), 
                this.putInStack(c, b, -1, 0), 
                this.putInStack(c, b, -1, 1), 
                this.putInStack(c, b, 0, 1), 
                this.putInStack(c, b, 1, 1), 
                this.putInStack(c, b, 1, 0), 
                this.putInStack(c, b, 1, -1), 
                this.putInStack(c, b, 0, -1)
            }
            return null
        }, 
        a.prototype.putInStack = function(a, b, c, d) {
            var e = this.getItem(a, c, d);
            e && this.itemGoodForChain(e, b) && this.stack.push(e)
        }, a.prototype.getItem = function(a, b, c) {
            var d = a.cell,
                e = d.row + b,
                f = d.column + c;
            return e >= 0 && e < this.grid.rows && f >= 0 && f < this.grid.columns ? this.grid.getCellAt(e, f).item : void 0
        }, 
        a.prototype.itemGoodForChain = function(a, b) {
            return a.itemType === b && -1 === this.foundChain.indexOf(a)
        }, a.prototype.destroy = function() {
            this.game = null, 
            this.grid = null, this.items = null, 
            this.stack = null, this.foundChain = null
        }, a
    }();
    a.FindChainStrategy = b
}(game || (game = {}));