var game;
! function(a) {
    var b = function(a) {
        function b(b) {
            a.call(this, b)
        }
        return __extends(b, a), b
    }(utils.ObjectPool);
    a.RocketsPool = b
}(game || (game = {}));
/////////////////////////////////////////////////////////////
var game;
! function(a) {
    var b = function(a) {
        function b(b) {
            a.call(this, b, 0, 0, "level_graphics", "Rocket_Sign0000"), 
            this.visible = !1, this.anchor.set(.5, .5), 
            this.angle = -10, 
            this.rotateTween = this.game.add.tween(this).to({
                angle: 10
            }, 150, Phaser.Easing.Cubic.Out, !1, 0, 1e4, !0)
        }
        return __extends(b, a), 
        b.prototype.show = function() {
            this.exists = !0, this.visible = !0, 
            this.rotateTween.isRunning ? this.rotateTween.resume() : this.rotateTween.start()
        }, 
        b.prototype.hide = function() {
            this.exists = !1, this.visible = !1, this.rotateTween.pause()
        }, 
        b.prototype.destroy = function() {
            this.rotateTween.stop(), this.rotateTween = null
        }, b
    }(Phaser.Image);
    a.RocketSign = b
}(game || (game = {}));
/////////////////////////////////////////////////
var game;
! function(a) {
    var b = function(a) {
        function b(b, c) {
            a.call(this, b, 0, 0, "rocket_trail"), 
            this.rocket = c, 
            this.exists = !1, 
            this.visible = !1, 
            this.anchor.set(.5, .5), 
            this.scale.set(1.3, 1.3),
             this.initAnimation()
        }
        return __extends(b, a), 
        b.prototype.initAnimation = function() {
            this.animation = this.animations.add("main", null, 60, !0)
        }, 
        b.prototype.show = function() {
            this.exists = !0, this.visible = !0, 
            this.animation.restart(), 
            this.animation.frame = this.game.rnd.integerInRange(0, this.animation.frameTotal - 1)
        }, 
        b.prototype.hide = function() {
            this.exists = !1, this.visible = !1, this.animation.stop(!1, !1)
        }, 
        b.prototype.update = function() {
            this.visible && (this.x = this.rocket.x + 90, this.y = this.rocket.y)
        }, 
        b.prototype.destroy = function() {
            this.animation.destroy(), 
            this.animation = null, 
            this.rocket = null
        }, b
    }(Phaser.Sprite);
    a.RocketSmoke = b
}(game || (game = {}));
///////////////////////////////////////////////////////////////////////////////////////////////////
var game;
! function(a) {
    var b = function(b) {
        function c(c) {
            b.call(this, c, 0, 0, "level_graphics", "Rocket0000"), this.objectType = 2, 
            this.alive = !1, this.screenX = 0, this.velocityX = 6, 
            this._radius = a.Rocket.RADIUS, 
            this._launched = !1, 
            this.launchDelay = 0, this.paused = !1, this.initialY = 0, 
            this.currentAngle = 0, this.deltaAngle = .04,
            this.magnitude = 15, this.alive = !1, this.exists = !1,
            this.visible = !1, this.anchor.set(.24, .45), 
            this.scrollComponent = new a.ScrollComponent(this), 
            this.events.onAddedToGroup.addOnce(this.addSmoke, this), 
            this.initSign(), 
            a.Main.development && this.initDebugShape()
        }
        return __extends(c, b), 
        c.prototype.addSmoke = function(b, c) {
            a.Main.weakDevice === !1 && (this.smoke = new a.RocketSmoke(this.game, this), 
                c.add(this.smoke))
        }, 
        c.prototype.initSign = function() {
            this.sign = new a.RocketSign(this.game), 
            this.sign.x = a.Config.GAME_WIDTH - .5 * this.sign.width - 10, 
            this.game.world.add(this.sign)
        }, 
        c.prototype.initDebugShape = function() {
            this.debugShape = new Phaser.Circle(0, 0, 2 * this._radius)
        }, 
        c.prototype.update = function() {
            this.alive && this.paused === !1 && (this._launched ? (this.updateMovement(), this.scrollComponent.update()) : 
                (this.x = Math.abs(this.parent.position.x) + a.Config.GAME_WIDTH + 100, 
                    this.launchDelay -= .3125 * this.game.time.elapsed, this.launchDelay <= 0 && this.launch()))
        }, 
        c.prototype.updateMovement = function() {
            var a = utils.MathUtil.lowPrecisionSin(this.currentAngle * Math.PI) * this.magnitude;
            this.currentAngle += this.deltaAngle, this.currentAngle >= 2 && (this.currentAngle -= 2),
             this.x -= this.velocityX,
              this.y = this.initialY + a, this.angle = (this.initialY - this.y) * -.22
        }, 
        c.prototype.launch = function() {
            this.game.sound.usingWebAudio && this.game.sound.play("rocket", .5), 
            this.scrollComponent.update(), 
            this._launched = !0, 
            this.sign.hide(), 
            this.smoke && this.smoke.show()
        }, 
        c.prototype.onAddToPool = function() {
            this.exists = !1,
             this.visible = !1, 
            this.alive = !1, 
            this._launched = !1, 
            this.sign.hide(), 
            this.smoke && this.smoke.hide()
        }, 
        c.prototype.onRemoveFromPool = function() {
            this.alive = !0, this._launched = !1
        }, 
        c.prototype.debugRender = function() {
            this.debugShape.x = this.screenX, 
            this.debugShape.y = this.y, 
            this.game.debug.geom(this.debugShape, "white")
        }, 
        c.prototype.prepareToLaunch = function(a) {
            this.launchDelay = a, 
            this.initialY = this.y, 
            this.sign.show(), 
            this.sign.y = this.y
        }, 
        c.prototype.onPause = function() {
            this.paused = !0
        }, 
        c.prototype.onResume = function() {
            this.paused = !1
        }, 
        c.prototype.destroy = function() {
            this.scrollComponent.destroy(), 
            this.scrollComponent = null, 
            this.sign = null, this.smoke = null,
             this.debugShape = null
        }, 
        Object.defineProperty(c.prototype, "radius", {
            get: function() {
                return this._radius
            },
            enumerable: !0,
            configurable: !0
        }), 
        Object.defineProperty(c.prototype, "launched", {
            get: function() {
                return this._launched
            },
            enumerable: !0,
            configurable: !0
        }), c.RADIUS = 16, 
        c.COLLIDE_DISTANCE = a.Submarine.RADIUS + c.RADIUS, 
        c.COLLIDE_DISTANCE_SQAURED = c.COLLIDE_DISTANCE * c.COLLIDE_DISTANCE, c
    }(Phaser.Image);
    a.Rocket = b
}(game || (game = {}));
