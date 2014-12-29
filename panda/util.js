var __extends = this.__extends || function(a, b) {
        function c() {
            this.constructor = a
        }
        for (var d in b) b.hasOwnProperty(d) && (a[d] = b[d]);
        c.prototype = b.prototype, a.prototype = new c
    }, utils;
/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/    
! function(a) {
    var b = function(a) {
        function b(b, c, d) {
            "undefined" == typeof c && (c = 0), 
            "undefined" == typeof d && (d = 0), 
            a.call(this, b, b.stage, "FPS Meter"), 
            this.x = c, 
            this.y = d, 
            this.initBackground(), 
            this.initText(), 
            this.game.time.advancedTiming = !0
        }
        return __extends(b, a), 
        b.prototype.initBackground = function() {
            var a = 80,
                b = new Phaser.Graphics(this.game, 0, 0);
            b.beginFill(0, 1), b.drawRect(0, 0, a, 22), b.endFill(), 
            this.bg = new Phaser.Image(this.game, -12, -9, "test"), 
            this.bg.setTexture(b.generateTexture()), 
            this.add(this.bg),
             b.destroy(), 
             b = null
        }, 
        b.prototype.initText = function() {
            var a = {
                font: "18px Consolas",
                fill: "#FFFFFF",
                align: "center"
            };
            this.statsText = this.game.add.text(5, 0, "0 fps", a, this)
        }, 
        b.prototype.update = function() {
            var a = "FPS: " + this.game.time.fps;
            this.statsText.setText(a)
        }, 
        b.prototype.destroy = function() {
            this.game.time.advancedTiming = !1, 
            a.prototype.destroy.call(this)
        }, b
    }(Phaser.SpriteBatch);
    a.FPSMeter = b
}(utils || (utils = {}));
/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/ 
var utils;
! function(a) {
    var b = function() {
        function a() {}
        return a.distanceSquared = function(a, b, c, d) {
            var e = c - a,
                f = d - b;
            return e * e + f * f
        }, a.distance = function(b, c, d, e) {
            var f = a.distanceSquared(b, c, d, e);
            return Math.sqrt(f)
        }, a.realInRange = function(a, b) {
            return Math.random() * (b - a) + a
        }, a.integerInRange = function(b, c) {
            return Math.round(a.realInRange(b, c))
        }, a.lowPrecisionSin = function(a) {
            var b;
            return -3.14159265 > a ? a += 6.28318531 : a > 3.14159265 && (a -= 6.28318531), 
            b = 0 > a ? 1.27323954 * a + .405284735 * a * a : 1.27323954 * a - .405284735 * a * a
        }, a.lowPrecisionCos = function(a) {
            var b;
            return -3.14159265 > a ? a += 6.28318531 : a > 3.14159265 && (a -= 6.28318531), 
            a += 1.57079632, a > 3.14159265 && (a -= 6.28318531), b = 0 > a ? 1.27323954 * a + .405284735 * a * a : 1.27323954 * a - .405284735 * a * a
        }, a.DEG_TO_RAD = .017453292519943295, a.RAD_TO_DEG = 57.29577951308232, a
    }();
    a.MathUtil = b
}(utils || (utils = {}));
/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/    
var utils;
! function(a) {
    var b = function() {
        function a(a) {
            "undefined" == typeof a && (a = null), this.itemsNum = 0, this.pointer = 0, a && a.length > 0 && this.setItems(a)
        }
        return a.prototype.setItems = function(a) {
            this.items = a, this.itemsNum = this.items.length
        }, a.prototype.getItem = function() {
            for (var a = 0; a < this.itemsNum; a++) {
                var b = this.items[a];
                if (b.alive === !1) return b.onRemoveFromPool(), b
            }
            return null
        }, a.prototype.getItemByProperty = function(a, b) {
            for (var c = 0; c < this.itemsNum; c++) {
                var d = this.items[c];
                if (d.alive === !1 && d[a] === b) return d.onRemoveFromPool(), d
            }
            return null
        }, a.prototype.returnItem = function(a) {
            a.alive = !1, a.onAddToPool()
        }, a.prototype.doReset = function() {
            for (var a = 0; a < this.itemsNum; a++) {
                var b = this.items[a];
                b.alive && b.onAddToPool()
            }
        }, a.prototype.destroy = function() {
            this.items.length = 0, this.items = null
        }, a
    }();
    a.ObjectPool = b
}(utils || (utils = {}));