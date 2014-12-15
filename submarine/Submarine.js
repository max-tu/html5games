////////////////////////////////////////////////////////////////////////////////////////////
var game;
! function(a) {
    var b = function(b) {
        function c(d) {
            b.call(this, d, 0, 0, "level_graphics", "Boat_Body_10000"), 
            this.velocityX = .3125, 
            this.velocityY = 0, 
            this.jumpPower = .03125, 
            this.gravity = .008, 
            this.deceleration = 14.88,
             this._radius = c.RADIUS, 
             this._invulnerable = !1, 
             this.invulnerableTime = 2500, 
             this._currentLives = 3, 
             this.totalLives = 3, 
             this._magnetActive = !1, 
             this._shieldActive = !1, 
             this._turboActive = !1, 
             this._doubleCoinsActive = !1, 
             this.bodyType = -1, 
             this.alive = !0, 
             this.paused = !1, 
             this.syncWithUpgrades(),
             this._hurtSignal = new Phaser.Signal, 
             this.anchor.set(.5, .54), 
             this.events.onAddedToGroup.add(this.onAddedToGroup, this), 
             this.velocityHandler = new a.VelocityHandler(d, this), 
             a.Main.development && this.initDebugShape()
        }
        return __extends(c, b), 
        c.prototype.setBodyType = function(a) {
            this.bodyType !== a && 
            (this.bodyType = a, this.setUsualTexture(), 
                this.screw && this.screw.setAnimation(this.bodyType))
        },
         c.prototype.setUsualTexture = function() {
            var a = "Boat_Body_" + this.bodyType.toString() + "0000";
            this.loadTexture("level_graphics", a)
        },
         c.prototype.setCrashedTexture = function() {
            var a = "Boat_Body_" + this.bodyType.toString() + "_Crashed0000";
            this.loadTexture("level_graphics", a)
        }, 
        c.prototype.onAddedToGroup = function(a, b) {
            this.initCoinsMagnet(b), 
            this.addScrew(b), 
            this.initTurboEffect(b), 
            this.initCrashSmoke(b), 
            this.initShield(b), 
            this.initDoubleCoinsFX(b)
        }, 
        c.prototype.initCrashSmoke = function(b) {
            this.crashSmoke = new a.CrashSmoke(this.game, this, new Phaser.Point(-40, 0)), 
            b.add(this.crashSmoke)
        }, 
        c.prototype.initCoinsMagnet = function(b) {
            this._coinsMagnet = new a.CoinsMagnet(this.game, b, this), 
            this._coinsMagnet.onDeactivated.add(this.onCoinsMagnetDeactivated, this), 
            b.swap(this, this._coinsMagnet)
        },
         c.prototype.addScrew = function(b) {
            this.screw = new a.Screw(this.game, this, this.bodyType), 
            b.addAt(this.screw, b.getIndex(this) - 1)
        }, 
        c.prototype.onCoinsMagnetDeactivated = function() {
            this._magnetActive = !1
        }, 
        c.prototype.initShield = function(b) {
            this.shield = new a.Shield(this.game, this), 
            this.shield.onDeactivated.add(this.onShieldDeactivated, this),
             b.add(this.shield)
        }, 
        c.prototype.onShieldDeactivated = function() {
            this._invulnerable = !1, 
            this._shieldActive = !1
        }, 
        c.prototype.initDoubleCoinsFX = function(b) {
            this.doubleCoinsFX = new a.DoubleCoins(this.game, this), 
            this.doubleCoinsFX.onDeactivated.add(this.onDoubleCoinsDeactivated, this), 
            b.add(this.doubleCoinsFX)
        }, 
        c.prototype.onDoubleCoinsDeactivated = function() {
            this._doubleCoinsActive = !1
        }, 
        c.prototype.initTurboEffect = function(b) {
            this.turboEffect = new a.TurboEffect(this.game, this), 
            b.add(this.turboEffect)
        }, 
        c.prototype.initDebugShape = function() {
            this.debugCircle = new Phaser.Circle(0, 0, 2 * this._radius)
        }, 
        c.prototype.hurt = function() {
            this._invulnerable || this._shieldActive || this._turboActive || 
            (this._currentLives--, this._invulnerable = !0, 
                this._hurtSignal.dispatch(), this.currentLives <= 1 && this.setCrashedTexture(), 
                0 === this.currentLives ? (this.alive = !1, this.crashSmoke.show(), 
                    this.screw.stopAnimation(), this.velocityHandler.onSubmarineDead()) : 
                (this.game.time.events.add(this.invulnerableTime, this.makeVulnerable, this), this.flick()))
        }, 
        c.prototype.flick = function() {
            var a = 100,
                b = Math.ceil(this.invulnerableTime / (2 * a)) + 2;
            this.game.add.tween(this).to({
                alpha: .25
            }, a, Phaser.Easing.Linear.None, !0, 0, b, !0)
        }, 
        c.prototype.makeVulnerable = function() {
            this.alpha = 1, this._invulnerable = !1
        }, 
        c.prototype.update = function() {
            this.paused === !1 && 
            (this.updateMovement(),
             this.updateAngle(), this.velocityHandler.update(),
             this.screw.updatePosition())
        }, 
        c.prototype.updateMovement = function() {
            var b = this.game.time.elapsed,
                c = this.jumpPower * b,
                d = this.gravity * b,
                e = this.deceleration / b;
            
            this.velocityY += d, 
            this.game.input.activePointer.isDown && this.alive ? this.velocityY -= c : this.velocityY < 0 && (this.velocityY *= e), 
            this.velocityY = Phaser.Math.clamp(this.velocityY, -10, 5);
            var f = this.y + this.velocityY;
            f < a.Level.TOP_LEVEL_BOUND ? 
            (f = a.Level.TOP_LEVEL_BOUND, this.velocityY *= .9) : f > a.Level.BOTTOM_LEVEL_BOUND && 
            (f = a.Level.BOTTOM_LEVEL_BOUND, this.velocityY *= .9), this.y = f
        }, 
        c.prototype.updateAngle = function() {
            var a = 3.333 * this.velocityY + 8.333,
                b = a - this.angle;
            this.angle += .25 * b
        }, 
        c.prototype.debugRender = function() {
            this.debugCircle.x = this.x, 
            this.debugCircle.y = this.y, 
            this.game.debug.geom(this.debugCircle, "red", !0), 
            this._coinsMagnet.debugRender()
        }, 
        c.prototype.applyDoubleCoins = function() {
            var a = 8e3;
            this.doubleCoinsFX.activate(a), 
            this._doubleCoinsActive = !0
        }, 
        c.prototype.applyShield = function() {
            this._invulnerable = !0, this._shieldActive = !0;
            var b = a.Main.upgrades.getUpgradeByTitle(a.Upgrade.SHIELD).getValue();
            this.shield.activate(b)
        }, 
        c.prototype.applyMagnet = function() {
            this._magnetActive = !0;
            var b = a.Main.upgrades.getUpgradeByTitle(a.Upgrade.COINS_MAGNET).getValue().duration;
            this._coinsMagnet.activate(b)
        }, 
        c.prototype.increaseLife = function() {
            this._currentLives = Math.min(this._currentLives + 1, this.totalLives)
        }, 
        c.prototype.isFullHealth = function() {
            return this._currentLives === this.totalLives
        }, 
        c.prototype.turnOnTurbo = function() {
            this._invulnerable = !0, this._turboActive = !0, this.turboEffect.show(), this.velocityHandler.turnOnTurbo()
        }, 
        c.prototype.turnOffTurbo = function() {
            this._invulnerable = !1, this._turboActive = !1, this.turboEffect.hide(), this.velocityHandler.turnOffTurbo()
        }, 
        c.prototype.doReset = function() {
            this._invulnerable = !1, 
            this._shieldActive = !1, 
            this._doubleCoinsActive = !1, 
            this._magnetActive = !1, 
            this._turboActive = !1, 
            this.syncWithUpgrades(),
             this.setUsualTexture(), 
             this.crashSmoke.hide(), 
             this.screw.resumeAnimation(), 
             this._coinsMagnet.doReset(), 
             this.doubleCoinsFX.doReset(), 
             this.velocityHandler.doReset(), 
             this.velocityY = 0, 
             this.x = c.INITIAL_X, 
             this.y = a.Config.HALF_GAME_HEIGHT - 100, 
             this.alive = !0
        }, 
        c.prototype.syncWithUpgrades = function() {
            var b = a.Main.upgrades.getUpgradeByTitle(a.Upgrade.BOAT_BODY);
            this.totalLives = b.getValue(), 
            this._currentLives = this.totalLives, 
            this.setBodyType(b.step)
        }, 
         
        c.RADIUS = 35,
        c.INITIAL_X = 150,
        c.INITIAL_VELOCITY_X = .3125, 
        c
    }(Phaser.Image);
    a.Submarine = b
}(game || (game = {}));