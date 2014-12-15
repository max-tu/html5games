var game;
! function(a) {
    var b = function() {
        function a(a, b, c) {
            this._initialChance = 0, this.currentChance = 0, this.locked = !0, this._bonusType = a, this._initialChance = b, this.locked = c
        }
        return Object.defineProperty(a.prototype, "bonusType", {
            get: function() {
                return this._bonusType
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(a.prototype, "initialChance", {
            get: function() {
                return this._initialChance
            },
            enumerable: !0,
            configurable: !0
        }), a
    }();
    a.BonusInfo = b
}(game || (game = {}));
/////////////////////////////////////////////////////////////////////////////////////////
var game;
! function(a) {
    ! function(a) {
        a[a.Heart = 0] = "Heart", 
        a[a.Shield = 1] = "Shield", 
        a[a.DoubleCoins = 2] = "DoubleCoins", 
        a[a.CoinsMagnet = 3] = "CoinsMagnet",
         a[a.TurboCharge = 4] = "TurboCharge"
    }(a.BonusType || (a.BonusType = {}));
    a.BonusType
}(game || (game = {}));
/////////////////////////////////////////////////////////////////////////////////////////

var game;
! function(a) {
    var b = function(b) {
        function c(c, d, e) {
            b.call(this, c, 0, 0, "level_graphics", d), this._objectType = 3, 
            this.velocityX = 1 / 16, this.screenX = 0, this.alive = !0, 
            this._radius = a.Bonus.RADIUS, 
            this.paused = !1, this.initialY = 0, 
            this.currentAngle = 0, this.deltaAngle = .1, 
            this.magnitude = 40, this._bonusType = e, 
            this.exists = !1, this.visible = !1, this.alive = !1, 
            this.anchor.set(.5, .5), 
            this.scrollComponent = new a.ScrollComponent(this), 
            this.deltaAngle = c.rnd.realInRange(.01, .02), 
            this.magnitude = 1.5 / this.deltaAngle, 
            a.Main.weakDevice === !1 && this.initTween(), 
            a.Main.development && this.initDebugShape()
        }
        return __extends(c, b), c.prototype.initTween = function() {
            this.tween = this.game.add.tween(this.scale).to({
                x: 1.15,
                y: .85
            }, 300, Phaser.Easing.Cubic.Out, !1, 0, 1e4, !0)
        }, c
        .prototype.initDebugShape = function() {
            this.debugShape = new Phaser.Circle(0, 0, 2 * this._radius)
        }, 
        c.prototype.update = function() {
            this.alive && this.paused === !1 && (this.updateMovement(), 
                this.scrollComponent.update())
        }, 
        c.prototype.updateMovement = function() {
            var a = utils.MathUtil.lowPrecisionSin(this.currentAngle * Math.PI) * this.magnitude;
            this.currentAngle += this.deltaAngle, this.currentAngle >= 2 && (this.currentAngle -= 2), 
            this.x -= this.velocityX * this.game.time.elapsed, this.y = this.initialY + a
        }, 
        c.prototype.onAddToPool = function() {
            this.exists = !1, 
            this.visible = !1, 
            this.alive = !1, 
            this.tween && this.tween.pause()
        }, 
        c.prototype.onRemoveFromPool = function() {
            this.alive = !0, this.tween && (this.tween.isRunning ? this.tween.resume() : this.tween.start())
        }, 
        c.prototype.debugRender = function() {
            this.debugShape.x = this.screenX, 
            this.debugShape.y = this.y, 
            this.game.debug.geom(this.debugShape, "yellow")
        }, 
        c.prototype.onPause = function() {
            this.paused = !0
        }, 
        c.prototype.onResume = function() {
            this.paused = !1
        }, 
        c.prototype.destroy = function() {
            b.prototype.destroy.call(this, !0), 
            this.scrollComponent.destroy(), 
            this.scrollComponent = null, 
            this.tween && (this.tween.stop(), this.tween = null), 
            this.debugShape = null
        }, 
        Object.defineProperty(c.prototype, "bonusType", {
            get: function() {
                return this._bonusType
            },
            enumerable: !0,
            configurable: !0
        }), 
        Object.defineProperty(c.prototype, "objectType", {
            get: function() {
                return this._objectType
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
        }), c.RADIUS = 30, c
    }(Phaser.Image);
    a.Bonus = b
}(game || (game = {}));
/*=======================================================================================================*/
var game;
! function(a) {
    var b = function() {
        function b(a, b) {
            this.game = a, 
            this.parentLayer = b, 
            this.initBonuses()
        }
        return b.prototype.initBonuses = function() {
            var b = this;
            this.items = [
                new a.Bonus(this.game, "Bonus_Heart0000", 0), 
                new a.Bonus(this.game, "Bonus_Shield0000", 1), 
                new a.Bonus(this.game, "Bonus_Zip0000", 4), 
                new a.Bonus(this.game, "Bonus_Magnet0000", 3), 
                new a.Bonus(this.game, "Bonus_Double0000", 2)
                ], 
            this.items.forEach(function(a) {
                b.parentLayer.add(a)
            })
        }, 
        b.prototype.getItem = function(a) {
            for (var b = this.items.length, c = 0; b > c; c++) {
                var d = this.items[c];
                if (d.bonusType === a) return d.onRemoveFromPool(), d.alive = !0, d
            }
            return null
        }, 
        b.prototype.returnItem = function(a) {
            a.onAddToPool(), a.alive = !1
        }, 
        b.prototype.doReset = function() {
            for (var a = this.items.length, b = 0; a > b; b++) {
                var c = this.items[b];
                c.alive && this.returnItem(c)
            }
        }, 
        b.prototype.destroy = function() {
            this.game = null, this.parentLayer = null, this.items = null
        }, b
    }();
    a.BonusesPool = b
}(game || (game = {}));