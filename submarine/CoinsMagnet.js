var game;
! function(a) {
    var b = function(a) {
        function b(c) {
            a.call(this, c, 0, 0, "level_graphics", "Coins_Magnet0000"), 
            this.tweenDuration = b.TWEEN_DURATION, 
            this.startScale = 1.1, 
            this.endScale = .33, 
            this.startAlpha = 0, 
            this.endAlpha = .4, 
            this.anchor.set(.51, .5), 
            this.exists = !1, 
            this.visible = !1
        }
        return __extends(b, a), b.prototype.show = function() {
            this.exists = !0, this.visible = !0, this.startTweens()
        }, 

        b.prototype.startTweens = function() {
            this.scale.set(this.startScale, this.startScale), this.scaleTween = this.game.add.tween(this.scale).to({
                x: this.endScale,
                y: this.endScale
            }, this.tweenDuration, Phaser.Easing.Linear.None, !0, 0, 1e3), 
            this.alpha = this.startAlpha,
             this.alphaTween = this.game.add.tween(this).to({
                alpha: this.endAlpha
            }, this.tweenDuration, Phaser.Easing.Cubic.Out, !0, 0, 1e3)
        },
         b.prototype.hide = function() {
            this.exists && (this.stopTweens(), this.exists = !1, this.visible = !1)
        }, 
        b.prototype.stopTweens = function() {
            this.scaleTween.stop(), 
            this.scaleTween = null, 
            this.alphaTween.stop(), 
            this.alphaTween = null
        },
         b.prototype.destroy = function() {
            this.stopTweens()
        }, b.TWEEN_DURATION = 1500, b
    }(Phaser.Image);
    a.CoinsMagnetPart = b
}(game || (game = {}));
/////////////////////////////////////////////////////////////////////////////////
var game;
! function(a) {
    var b = function(b) {
        function c(c, d, e) {
            b.call(this, c, d, "coins_magnet"), 
            this.activeDuration = 0, 
            this.hideDuration = 200, 
            this.isHiding = !1, 
            this._radius = 0, 
            this.paused = !1, 
            this.submarine = e, 
            this.exists = !1, 
            this.visible = !1,
             this._onDeactivated = new Phaser.Signal, 
             this._radius = a.Main.upgrades.getUpgradeByTitle(a.Upgrade.COINS_MAGNET).getValue().radius, 
             this.initParts(), 
             a.Main.development && this.initDebugShape()
        }
        return __extends(c, b), 

        c.prototype.initParts = function() {
            this.part1 = new a.CoinsMagnetPart(this.game), 
            this.add(this.part1), 
            this.part2 = new a.CoinsMagnetPart(this.game), 
            this.add(this.part2)
        }, 
        c.prototype.initDebugShape = function() {
            this.debugShape = new Phaser.Circle(this.x, this.y, 2 * this._radius)
        }, 
        c.prototype.activate = function(b) {
            this.activeDuration = b, 
            this.alpha = 1, 
            this.isHiding = !1, 
            this.exists = !0, 
            this.visible = !0, this.part1.show(), 
            this.game.time.events.add(.5 * a.CoinsMagnetPart.TWEEN_DURATION, this.part2.show, this.part2)
        }, 
        c.prototype.update = function() {
            this.visible && this.paused === !1 && (this.activeDuration -= this.game.time.elapsed, 
                this.activeDuration < this.hideDuration && this.isHiding === !1 && this.hide(), 
                this.activeDuration < 0 && this.deactivate(), this.updatePositionAndAngle())
        }, 
        c.prototype.updatePositionAndAngle = function() {
            this.position.set(this.submarine.x, this.submarine.y), 
            this.angle = this.submarine.angle
        }, 
        c.prototype.hide = function() {
            this.isHiding = !0, 
            this.game.add.tween(this).to({
                alpha: 0
            }, this.hideDuration, Phaser.Easing.Cubic.Out, !0)
        }, 
        c.prototype.deactivate = function() {
            this.exists = !1, 
            this.visible = !1, 
            this.part1.hide(),
             this.part2.hide(), 
             this._onDeactivated.dispatch()
        },
         c.prototype.doReset = function() {
            this.deactivate(), 
            this._radius = a.Main.upgrades.getUpgradeByTitle(a.Upgrade.COINS_MAGNET).getValue().radius, 
            a.Main.development && this.initDebugShape()
        }, c.prototype.debugRender = function() {
            this.visible && (this.debugShape.x = this.position.x, this.debugShape.y = this.position.y, this.game.debug.geom(this.debugShape, "yellow", !1))
        }, 
        c.prototype.destroy = function() {
            this._onDeactivated.dispose(), this._onDeactivated = null, this.part1 = null, this.part2 = null
        }, 
        Object.defineProperty(c.prototype, "onDeactivated", {
            get: function() {
                return this._onDeactivated
            },
            enumerable: !0,
            configurable: !0
        }), 

        Object.defineProperty(c.prototype, "radius", {
            get: function() {
                return this._radius
            },
            enumerable: !0,
            configurable: !0
        }), c
    }(Phaser.SpriteBatch);
    a.CoinsMagnet = b
}(game || (game = {}));