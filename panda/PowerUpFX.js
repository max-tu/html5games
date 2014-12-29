/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/    
var game;
! function(a) {
    var b = function(a) {
        function b(b, c) {
            a.call(this, b, c), this.alive = !1, 
            this._completeSignal = new Phaser.Signal, 
            this.initArrows(), this.hideArrows()
        }
        return __extends(b, a), 
        b.prototype.initArrows = function() {
            this.arrow1 = this.game.add.image(0, 0, "graphics_1", "PowerUp_Line0000", this), 
            this.arrow1.anchor.set(.5, .5), 
            this.arrow2 = this.game.add.image(0, 0, "graphics_1", "PowerUp_Line0000", this), 
            this.arrow2.anchor.set(.5, .5), 
            this.arrow2.angle = 180
        }, 
        b.prototype.launch = function() {
            this.showArrows()
        }, 
        b.prototype.showArrows = function() {
            this.arrow1.visible = !0, 
            this.arrow1.exists = !0, 
            this.arrow1.alpha = 1, 
            this.arrow2.visible = !0, 
            this.arrow2.exists = !0, this.arrow2.alpha = 1
        }, 
        b.prototype.launchArrow = function(a, b, c) {
            var d = Phaser.Math.distance(a.x, a.y, b, c),
                e = this.getTweenDuration(d),
                f = this.game.add.tween(a).to({
                    x: b,
                    y: c
                }, e, Phaser.Easing.Linear.None, !0);
            return f.duration = e, this.game.add.tween(a).to({
                alpha: 0
            }, .3 * e, Phaser.Easing.Linear.None, !0, .7 * e), f
        }, 
        b.prototype.getTweenDuration = function(a) {
            return .8 * a
        }, 
        b.prototype.onComplete = function() {
            this._completeSignal.dispatch(), this.hide()
        }, 
        b.prototype.hide = function() {
            this.hideArrows(), this.onAddToPool()
        }, 
        b.prototype.hideArrows = function() {
            this.arrow1.visible = !1, 
            this.arrow1.exists = !1, 
            this.arrow2.visible = !1, 
            this.arrow2.exists = !1
        }, 
        b.prototype.onAddToPool = function() {
            this.exists = !1, this.visible = !1, this.alive = !1
        }, 
        b.prototype.onRemoveFromPool = function() {
            this.exists = !0, this.visible = !0, this.alive = !0
        }, 
        b.prototype.destroy = function() {
            a.prototype.destroy.call(this, !0, !1), 
            this.arrow1 = null, this.arrow2 = null,
             this._completeSignal.dispose(), 
             this._completeSignal = null
        }, 
        Object.defineProperty(b.prototype, "completeSignal", {
            get: function() {
                return this._completeSignal
            },
            enumerable: !0,
            configurable: !0
        }), b
    }(Phaser.SpriteBatch);
    a.PowerUpFX = b
}(game || (game = {}));
/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/    
var game;
! function(a) {
    var b = function(b) {
        function c(a, c) {
            b.call(this, a, c), this.orientation = "horizontal"
        }
        return __extends(c, b), 
        c.prototype.launch = function(c, d) {
            b.prototype.launch.call(this, c, d), 
            this.arrow1.y = d, 
            this.arrow1.x = c;
            var e = this.launchArrow(this.arrow1, 0, d);

            this.arrow2.y = d, 
            this.arrow2.x = c;
            var f = this.launchArrow(this.arrow2, a.Config.GAME_WIDTH, d);

            e.duration > f.duration ? e.onComplete.addOnce(this.onComplete, this) : 
            f.onComplete.addOnce(this.onComplete, this)
        }, c
    }(a.PowerUpFX);
    a.HorizontalPowerUpFX = b
}(game || (game = {}));
/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/    
var game;
! function(a) {
    var b = function(b) {
        function c(a, c) {
            b.call(this, a, c), this.orientation = "vertical"
        }
        return __extends(c, b), 
        c.prototype.initArrows = function() {
            b.prototype.initArrows.call(this), 
            this.arrow1.angle = -90, this.arrow2.angle = 90
        }, 
        c.prototype.launch = function(c, d) {
            b.prototype.launch.call(this, c, d), 
            this.arrow1.y = d, 
            this.arrow1.x = c;
            var e = this.launchArrow(this.arrow1, c, a.Config.GAME_HEIGHT);

            this.arrow2.y = d, 
            this.arrow2.x = c;
            var f = this.launchArrow(this.arrow2, c, 0);
            e.duration > f.duration ? e.onComplete.addOnce(this.onComplete, this) 
            : f.onComplete.addOnce(this.onComplete, this)
        }, c
    }(a.PowerUpFX);
    a.VerticalPowerUpFX = b
}(game || (game = {}));