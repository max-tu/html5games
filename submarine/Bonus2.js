
var game;
! function(a) {
    var b = function() {
        function b(a, c, d) {
            this.passedDistance = 0, 
            this.newBonusMark = b.MAX_DISTANCE, 
            this.bonusTypes = [], 
            this.restrictedBonuses = [], 
            this.game = a, this.objectsLayer = c, 
            this.submarine = d, 
            this._addBonusSignal = new Phaser.Signal, 
            this.bonusPosition = new Phaser.Point, 
            this.initBonusesInfo(), 
            this.updateBonusesInfo(), 
            this.generateBonusTypes()
        }
        return b.prototype.initBonusesInfo = function() {
            this.bonusesInfo = [new a.BonusInfo(4, 56, !1), 
            new a.BonusInfo(1, 15, !1), 
            new a.BonusInfo(3, 15, !1), 
            new a.BonusInfo(0, 7, !1), new a.BonusInfo(2, 7, !1)]
        }, b.prototype.updateBonusesInfo = function() {
            for (var b = this.bonusesInfo.length, c = 0; b > c; c++) {
                var d = this.bonusesInfo[c];
                3 === d.bonusType ? d.locked = 0 === a.Main.upgrades.getUpgradeStep(a.Upgrade.COINS_MAGNET) : 
                1 === d.bonusType ? d.locked = 0 === a.Main.upgrades.getUpgradeStep(a.Upgrade.SHIELD) : 
                4 === d.bonusType && (d.locked = 0 === a.Main.upgrades.getUpgradeStep(a.Upgrade.TURBO))
            }
        }, 
        b.prototype.generateBonusTypes = function() {
            this.recalculateChances(), this.bonusTypes.length = 0;
            for (var a = this.bonusesInfo.length, b = 0; a > b; b++) {
                var c = this.bonusesInfo[b];
                c.locked === !1 && this.addBonusTypes(c.currentChance, c.bonusType)
            }
            if (this.bonusTypes.length > 0) this.bonusTypes.length = 100;
            else if (this.bonusTypes.length < 100)
                for (; this.bonusTypes.length < 100;) this.bonusTypes.push(2)
        }, 
        b.prototype.recalculateChances = function() {
            for (var a = 0, b = this.bonusesInfo.length, c = 0; b > c; c++) {
                var d = this.bonusesInfo[c];
                d.locked === !1 && (a += d.initialChance)
            }
            for (var e = 100 / a, c = 0; b > c; c++) {
                var d = this.bonusesInfo[c];
                d.locked === !1 && (d.currentChance = Math.round(d.initialChance * e))
            }
        }, 
        b.prototype.addBonusTypes = function(a, b) {
            for (var c = this.bonusTypes.length, d = c; c + a > d; d++) this.bonusTypes[d] = b
        }, 
        b.prototype.update = function(a) {
            this.passedDistance += a, this.passedDistance > this.newBonusMark && 
            (this.passedDistance = 0, this.newBonusMark = this.game.rnd.integerInRange(b.MIN_DISTANCE, b.MAX_DISTANCE), this.generateBonus())
        }, 
        b.prototype.generateBonus = function() {
            this.updateRestrictedBonuses();
            var a = this.game.rnd.pick(this.bonusTypes); - 1 === this.restrictedBonuses.indexOf(a) && (this.updateBonusPosition(), 
                this._addBonusSignal.dispatch(a, this.bonusPosition))
        }, b.prototype.updateRestrictedBonuses = function() {
            this.restrictedBonuses.length = 0, this.submarine.isFullHealth() && this.restrictedBonuses.push(0), 
            (this.submarine.shieldActive || this.submarine.turboActive) && this.restrictedBonuses.push(1), 
            this.submarine.turboActive && this.restrictedBonuses.push(4), 
            this.submarine.magnetActive && this.restrictedBonuses.push(3),
            this.submarine.doubleCoinsActive && this.restrictedBonuses.push(2)
        }, 
        b.prototype.updateBonusPosition = function() {
            this.bonusPosition.x = Math.abs(this.objectsLayer.position.x) + a.Config.GAME_WIDTH, 
            this.bonusPosition.y = this.game.rnd.integerInRange(b.TOP_Y, b.BOTTOM_Y)
        }, 
        b.prototype.doReset = function() {
            this.updateBonusesInfo(), 
            this.generateBonusTypes(), 
            this.passedDistance = 0, this.newBonusMark = b.MAX_DISTANCE
        }, 
        b.prototype.destroy = function() {
            this._addBonusSignal.dispose(), 
            this._addBonusSignal = null, 
            this.restrictedBonuses = null, 
            this.bonusesInfo = null, 
            this.bonusTypes = null, 
            this.bonusPosition = null, 
            this.game = null, 
            this.objectsLayer = null, 
            this.submarine = null
        }, 
        Object.defineProperty(b.prototype, "addBonusSignal", {
            get: function() {
                return this._addBonusSignal
            },
            enumerable: !0,
            configurable: !0
        }), b.TOP_Y = .33 * a.Config.GAME_HEIGHT, 
        b.BOTTOM_Y = .66 * a.Config.GAME_HEIGHT, 
        b.MIN_DISTANCE = 4 * a.Config.GAME_WIDTH, 
        b.MAX_DISTANCE = 6 * a.Config.GAME_WIDTH, b
    }();
    a.BonusGenerator = b
}(game || (game = {}));
/*=======================================================================================================*/
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
