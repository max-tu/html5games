var game;
! function(a) {
    var b = function(a) {
        function b(b, c) {
            a.call(this, b, 0, 0, "level_graphics", "Bonus_Double0000"), 
            this.activeDuration = 0, 
            this.isHiding = !1, 
            this.paused = !1, 
            this.submarine = c, 
            this.exists = !1, 
            this.visible = !1, 
            this.anchor.set(.5, .5),
             this._onDeactivated = new Phaser.Signal
        }
        return __extends(b, a), b.prototype.activate = function(a) {
            this.activeDuration = a, this.exists = !0, 
            this.visible = !0, this.alpha = 1, 
            this.isHiding = !1, this.scale.set(0, 0), 
            this.game.add.tween(this.scale).to({
                x: .66,
                y: .66
            }, 800, Phaser.Easing.Elastic.Out, !0)
        }, 
        
        b.prototype.update = function() {
            this.visible && this.paused === !1 && 
            (this.x = this.submarine.x + 54, 
                this.y = this.submarine.y - 36, 
                this.activeDuration -= this.game.time.elapsed, 
                this.isHiding === !1 && this.activeDuration < 0 && (this.isHiding = !0, this.hide()))
        }, 

        b.prototype.hide = function() {
            this.game.add.tween(this.scale).to({
                x: 1.5,
                y: 1.5
            }, 500, Phaser.Easing.Back.In, !0), this.game.add.tween(this).to({
                alpha: 0
            }, 100, Phaser.Easing.Linear.None, !0, 400).onComplete.addOnce(this.deactivate, this)
        }, 
        b.prototype.deactivate = function() {
            this.exists = !1, this.visible = !1, this._onDeactivated.dispatch()
        }, 
        b.prototype.doReset = function() {
            this.deactivate()
        },
         b.prototype.destroy = function() {
            a.prototype.destroy.call(this, !0), this._onDeactivated.dispose(), this._onDeactivated = null
        },
         Object.defineProperty(b.prototype, "onDeactivated", {
            get: function() {
                return this._onDeactivated
            },
            enumerable: !0,
            configurable: !0
        }), b
    }(Phaser.Image);
    a.DoubleCoins = b
}(game || (game = {}));
/*======================================================================================================*/
var game;
! function(a) {
    var b = function(b) {
        function c(d, e, f, g) {
            b.call(this, d, e, f, "coin"), this.objectType = 0, 
            this.screenX = 0, this._attractedByMagnet = !1, 
            this.magnetForce = .1, 
            this._radius = c.SMALL_COIN_RADIUS, 
            this.animationWasStarted = !1, 
            this.animationStartBorder = a.Config.GAME_WIDTH - 200, 
            this.initialY = 0, this.magnitude = 5, this.currentAngle = 0, 
            this.deltaAngle = .025, 
            this.isFloating = !1, 
            this.submarine = g, 
            this.exists = !1, 
            this.visible = !1, 
            this.alive = !1, 
            this.anchor.set(.47, .46), 
            this.scrollComponent = new a.ScrollComponent(this), 
            a.Main.weakDevice === !1 && this.initAnimation(), 
            a.Main.development && this.initDebugShape()
        }
        return __extends(c, b), 
        c.prototype.initAnimation = function() {
            this.animation = this.animations.add("main", null, 60, !1)
        }, 
        c.prototype.initDebugShape = function() {
            this.debugShape = new Phaser.Circle(0, 0, 2 * this._radius)
        }, 
        c.prototype.update = function() {
            this.alive && (this.scrollComponent.update(), this.visible && this.isFloating === !1 && this.startFloat(), 
                this.animation && this.animationWasStarted === !1 && this.screenX < this.animationStartBorder && (this.animation.restart(), 
                    this.animationWasStarted = !0), this._attractedByMagnet ? this.moveToSubmarine() : this.isFloating && this.float())
        }, 
        c.prototype.startFloat = function() {
            this.isFloating = !0, this.initialY = this.y, this.currentAngle = 0
        }, 
        c.prototype.float = function() {
            var a = utils.MathUtil.lowPrecisionSin(this.currentAngle * Math.PI) * this.magnitude;
            this.currentAngle += this.deltaAngle, this.currentAngle >= 2 && (this.currentAngle -= 2), this.y = this.initialY + a
        }, 
        c.prototype.moveToSubmarine = function() {
            var a = this.parent.position.x + this.x - this.submarine.x,
                b = this.y - this.submarine.y;
            this.x -= a * this.magnetForce, this.y -= b * this.magnetForce, this.magnetForce += .01
        }, 
        c.prototype.onAddToPool = function() {
            this.exists = !1, this.alive = !1, 
            this.visible = !1, 
            this.animation && this.animation.stop(!1, !1), 
            this.animationWasStarted = !1
        }, 
        c.prototype.onRemoveFromPool = function() {
            this.alive = !0, this.isFloating = !1, this._attractedByMagnet = !1
        }, 
        c.prototype.debugRender = function() {
            this.debugShape.x = this.screenX, 
            this.debugShape.y = this.y,
            this.game.debug.geom(this.debugShape, "white", !1)
        }, 
        c.prototype.applyMagnet = function() {
            this._attractedByMagnet = !0, this.magnetForce = .1
        }, 
        c.prototype.destroy = function() {
            this.scrollComponent.destroy(), 
            this.scrollComponent = null, 
            this.animation.destroy(), 
            this.animation = null, 
            this.submarine = null
        }, 
        Object.defineProperty(c.prototype, "radius", {
            get: function() {
                return this._radius
            },
            enumerable: !0,
            configurable: !0
        }), 
        Object.defineProperty(c.prototype, "attractedByMagnet", {
            get: function() {
                return this._attractedByMagnet
            },
            enumerable: !0,
            configurable: !0
        }), c.SMALL_COIN_RADIUS = 24, c
    }(Phaser.Sprite);
    a.Coin = b
}(game || (game = {}));