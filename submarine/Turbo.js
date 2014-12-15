var game;
! function(a) {
    var b = function(a) {
        function b(b, c) {
            a.call(this, b, 0, 0, "turbo_effect"), 
            this.submarine = c, 
            this.exists = !1, 
            this.anchor.set(.45, .5), 
            this.animation = this.animations.add("main", null, 60, !0)
        }
        return __extends(b, a), 
        b.prototype.show = function() {
            this.exists = !0, this.animation.restart()
        }, 
        b.prototype.hide = function() {
            this.exists = !1, this.animation.stop(!1, !1)
        }, 
        b.prototype.update = function() {
            this.visible && (this.x = this.submarine.x, this.y = this.submarine.y, this.angle = this.submarine.angle)
        }, 
        b.prototype.destroy = function() {
            this.animation.destroy(), this.animation = null, this.submarine = null
        }, b
    }(Phaser.Sprite);
    a.TurboEffect = b
}(game || (game = {}));
/*================================================================================================================================*/
var game;
! function(a) {
    var b = function() {
        function b(b, c) {
            this._active = !1, 
            this._duration = 0, 
            this.turboCharges = 0, 
            this.game = b, 
            this.turboLabel = c, 
            this._duration = a.Main.upgrades.getUpgradeByTitle(a.Upgrade.TURBO).getValue(), 
            this.items = []
        }
        return b.prototype.addTurboObject = function(a) {
            this.items.push(a)
        }, 
        b.prototype.addTurboCharge = function() {
            this.turboCharges++, this.turboCharges >= 3 && (this.turboCharges = 0, this.activate()), 
            this.turboLabel.updateText(this.turboCharges)
        },
        b.prototype.activate = function() {
            this._active = !0,
             this.activateTurboForItems(), 
            this.game.time.events.add(this._duration, this.deactivate, this)
        }, 
        b.prototype.activateTurboForItems = function() {
            this.items.forEach(function(a) {
                a.turnOnTurbo()
            })
        }, 
        b.prototype.deactivate = function() {
            this._active = !1, this.deactivateTurboForItems()
        }, 
        b.prototype.deactivateTurboForItems = function() {
            this.items.forEach(function(a) {
                a.turnOffTurbo()
            })
        },
        b.prototype.doReset = function() {
            this._active = !1, 
            this._duration = a.Main.upgrades.getUpgradeByTitle(a.Upgrade.TURBO).getValue(), 
            this.turboCharges = 0
        },
        b.prototype.destroy = function() {
            this.game = null, this.items = null
        },
        Object.defineProperty(b.prototype, "active", {
            get: function() {
                return this._active
            },
            enumerable: !0,
            configurable: !0
        }), 
        Object.defineProperty(b.prototype, "duration", {
            get: function() {
                return this._duration
            },
            enumerable: !0,
            configurable: !0
        }), b
    }();
    a.TurboMode = b
}(game || (game = {}));
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var game;
! function(a) {
    var b = function(b) {
        function c(a, c) {
            b.call(this, a, c), 
            this.exists = !1, 
            this.visible = !1, 
            this.initParticles(), 
            this.initVelocities()
        }
        return __extends(c, b), 
        c.prototype.initParticles = function() {
            this.particles = [];
            for (var a = 10, b = 0; a > b; b++) {
                var c = this.game.rnd.realInRange(1, 1.3),
                    d = this.game.add.image(0, 0, "level_graphics", "Turbo_Particle0000", this);
                d.scale.set(2 * c, .8),
                 d.alpha = this.game.rnd.realInRange(.2, .5), 
                 d.exists = !1, 
                 d.visible = !1, 
                 this.particles.push(d)
            }
        }, 
        c.prototype.initVelocities = function() {
            this.velocities = [];
            for (var a = this.particles.length, b = 0; a > b; b++) {
                var c = this.game.rnd.realInRange(33, 40);
                this.velocities.push(c)
            }
        }, 
        c.prototype.update = function() {
            this.visible && this.updateParticles()
        }, 
        c.prototype.updateParticles = function() {
            for (var a = this.particles.length, b = 0; a > b; b++) {
                var c = this.particles[b];
                c.x -= this.velocities[b], c.x < -100 && this.resetParticle(c, b)
            }
        }, 
        c.prototype.resetParticle = function(b) {
            b.x = a.Config.GAME_WIDTH
        }, 
        c.prototype.turnOnTurbo = function() {
            this.exists = !0, 
            this.visible = !0, 
            this.setRandomPositions(), 
            this.setParticlesExistsProp(!0),
             this.alpha = 0, 
             this.game.add.tween(this).to({
                alpha: 1
            }, 500, Phaser.Easing.Linear.None, !0)
        }, 
        c.prototype.setRandomPositions = function() {
            for (var b = this.particles.length, c = 0; b > c; c++) 
                this.particles[c].x = this.game.rnd.realInRange(50, a.Config.GAME_WIDTH),
                 this.particles[c].y = this.game.rnd.realInRange(0, a.Config.GAME_HEIGHT)
        }, 
        c.prototype.turnOffTurbo = function() {
            this.game.add.tween(this).to({
                alpha: 0
            }, 400, Phaser.Easing.Linear.None, !0).onComplete.addOnce(this.hide, this)
        }, 
        c.prototype.hide = function() {
            this.exists = !1, this.visible = !1, this.setParticlesExistsProp(!1)
        },
        c.prototype.setParticlesExistsProp = function(a) {
            for (var b = this.particles.length, c = 0; b > c; c++) 
                this.particles[c].exists = a, 
            this.particles[c].visible = a
        }, 
        c.prototype.destroy = function() {
            this.particles = null, 
            this.velocities = null
        }, c
    }(Phaser.SpriteBatch);
    a.TurboScreen = b
}(game || (game = {}));