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
        },
        
        c.prototype.onPause = function() {
            this.paused = !0, 
            this.shield.paused = !0,
             this._coinsMagnet.paused = !0, 
             this.doubleCoinsFX.paused = !0, 
             this.screw.stopAnimation()
        }, 
        c.prototype.onResume = function() {
            this.paused = !1, 
            this.shield.paused = !1,
             this._coinsMagnet.paused = !1, 
            this.doubleCoinsFX.paused = !1, 
            this.screw.resumeAnimation()
        }, 
        c.prototype.destroy = function() {
            this.velocityHandler.destroy(), 
            this.velocityHandler = null, 
            this._hurtSignal.dispose(), 
            this._hurtSignal = null, 
            this.debugCircle = null, 
            this.shield = null, 
            this._coinsMagnet = null, 
            this.turboEffect = null
        }, 
        Object.defineProperty(c.prototype, "radius", {
            get: function() {
                return this._radius
            },
            enumerable: !0,
            configurable: !0
        }), 
        Object.defineProperty(c.prototype, "invulnerable", {
            get: function() {
                return this._invulnerable
            },
            enumerable: !0,
            configurable: !0
        }), 
        Object.defineProperty(c.prototype, "currentLives", {
            get: function() {
                return this._currentLives
            },
            enumerable: !0,
            configurable: !0
        }),
         Object.defineProperty(c.prototype, "hurtSignal", {
            get: function() {
                return this._hurtSignal
            },
            enumerable: !0,
            configurable: !0
        }), 
         Object.defineProperty(c.prototype, "shieldActive", {
            get: function() {
                return this._shieldActive
            },
            enumerable: !0,
            configurable: !0
        }), 
         Object.defineProperty(c.prototype, "magnetActive", {
            get: function() {
                return this._magnetActive
            },
            enumerable: !0,
            configurable: !0
        }),
         Object.defineProperty(c.prototype, "turboActive", {
            get: function() {
                return this._turboActive
            },
            enumerable: !0,
            configurable: !0
        }), 
         Object.defineProperty(c.prototype, "doubleCoinsActive", {
            get: function() {
                return this._doubleCoinsActive
            },
            enumerable: !0,
            configurable: !0
        }), 
         Object.defineProperty(c.prototype, "coinsMagnet", {
            get: function() {
                return this._coinsMagnet
            },
            enumerable: !0,
            configurable: !0
        }), c.RADIUS = 35,
         c.INITIAL_X = 150,
         c.INITIAL_VELOCITY_X = .3125, 
         c
    }(Phaser.Image);
    a.Submarine = b
}(game || (game = {}));