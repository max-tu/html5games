var game;
! function(a) {
    var b = function(a) {
        function b(b) {
            a.call(this, b, 0, 0, "graphics_1", "ItemBonus0000"), 
            this.followItem = !1,
             this.exists = !1, 
            this.visible = !1, 
            this.alive = !1,
             this.anchor.set(.5, .5), 
             this._activateSignal = new Phaser.Signal, 
             this.initPulseTween()
        }
        return __extends(b, a), 
        b.prototype.initPulseTween = function() {
            this.scale.set(.85, 1), 
            this.pulseTween = this.game.add.tween(this.scale).to({
                x: 1,
                y: .85
            }, 500, Phaser.Easing.Sinusoidal.Out, !1, 0, 1e3, !0)
        }, 
        b.prototype.init = function(a) {
            this.angle = this.game.rnd.normal() > 0 ? 0 : 90, 
            this._item = a, this.position.set(this._item.x, this._item.y), 
            this.parent.sendToBack(this), 
            this.followItem = !0, 
            this.show()
        }, 
        b.prototype.show = function() {
            this.alpha = 0, 
            this.game.add.tween(this).to({
                alpha: 1
            }, 100, Phaser.Easing.Linear.None, !0), 
            this.startPulseTween()
        }, 
        b.prototype.startPulseTween = function() {
            this.scale.set(.85, 1), 
            this.pulseTween.isRunning ? this.pulseTween.resume() : this.pulseTween.start()
        },
         b.prototype.activate = function() {
            this._activateSignal.dispatch(this), this.pulseTween.pause(), this.followItem = !1, this.hide()
        }, 
        b.prototype.hide = function() {
            this.game.add.tween(this).to({
                alpha: 0
            }, 200, Phaser.Easing.Linear.None, !0, 200), this.game.add.tween(this.scale).to({
                x: 3,
                y: 2.5
            }, 300, Phaser.Easing.Back.Out, !0).onComplete.addOnce(this.onAddToPool, this)
        }, 
        b.prototype.update = function() {
            this.exists && this.followItem && (this.y = this._item.y)
        }, 
        b.prototype.returnToPool = function() {
            this.onAddToPool()
        }, 

        b.prototype.onAddToPool = function() {
            this.exists = !1, this.visible = !1, this.alive = !1
        }, 
        b.prototype.onRemoveFromPool = function() {
            this.exists = !0, this.visible = !0, this.alive = !0
        },
         b.prototype.destroy = function() {
            a.prototype.destroy.call(this, !0), 
            this.pulseTween.stop(), 
            this.pulseTween = null, 
            this._activateSignal.dispose(),
            this._activateSignal = null, this._item = null
        }, 
        Object.defineProperty(b.prototype, "activateSignal", {
            get: function() {
                return this._activateSignal
            },
            enumerable: !0,
            configurable: !0
        }), 
        Object.defineProperty(b.prototype, "linkedItem", {
            get: function() {
                return this._item
            },
            enumerable: !0,
            configurable: !0
        }), b
    }(Phaser.Image);
    a.PowerUp = b
}(game || (game = {}));

/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/    
var game;
! function(a) {
    var b = function(b) {
        function c(c) {
            b.call(this, c, 0, 0, "graphics_1", "BonusStar0000"), 
            this.exists = !1, this.visible = !1, 
            this.alive = !1, this.anchor.set(.5, .5), 
            this._requestItemSignal = new Phaser.Signal, 
            this._moveCompleteSignal = new Phaser.Signal, 
            a.Main.weakDevice === !1 && this.initEmitter()
        }
        return __extends(c, b), c.prototype.initEmitter = function() {
            this.emitter = this.game.add.emitter(0, 0, 15), 
            this.emitter.makeParticles("graphics_1", "StarParticle0000"), 
            this.emitter.setScale(1.5, .25, 1.5, .25, 1e3), 
            this.emitter.setXSpeed(-50, 50), this.emitter.setYSpeed(10, 20), 
            this.emitter.gravity = 150, this.emitter.lifespan = 1e3
        }, 
        c.prototype.show = function() {
            this.scale.set(0, 0), 
            this.game.add.tween(this.scale).to({
                x: 1.2,
                y: 1.2
            }, 300, Phaser.Easing.Back.Out, !0), 
            this.game.add.tween(this).to({
                y: this.y - 30
            }, 800, Phaser.Easing.Back.Out, !0)
            .onComplete.addOnce(this._requestItemSignal.dispatch, this._requestItemSignal)
        },
         c.prototype.moveToItem = function(a, b) {
            var c = utils.MathUtil.distance(this.x, this.y, a, b),
                d = Phaser.Math.clamp(c, 300, 1e3);
            this.game.add.tween(this).to({
                x: a,
                y: b,
                angle: 360
            }, d, Phaser.Easing.Back.In, !0)
            .onComplete.addOnce(this.onMoveComplete, this),
             this.game.sound.usingWebAudio && this.game.sound.play("star_move", .2)
        }, 
        c.prototype.onMoveComplete = function() {
            var a = 100,
                b = 300;
            this.game.add.tween(this.scale).to({
                x: 3,
                y: 3
            }, b, Phaser.Easing.Back.In, !0), 
            this.game.add.tween(this).to({
                alpha: 0
            }, a, Phaser.Easing.Linear.None, !0, b - a)
            .onComplete.addOnce(this.onHideComplete, this)
        }, 
        c.prototype.onHideComplete = function() {
            this._moveCompleteSignal.dispatch(this), 
            this.onAddToPool()
        }, 
        c.prototype.update = function() {
            this.exists && this.emitter && (this.emitter.emitX = this.x, this.emitter.emitY = this.y + 15, this.emitter.emitParticle())
        }, 
        c.prototype.returnToPool = function() {
            this.onAddToPool()
        }, c.prototype.onAddToPool = function() {
            this.exists = !1, this.visible = !1, 
            this.alive = !1, 
            this._requestItemSignal.active = !1, 
            this._moveCompleteSignal.active = !1, 
            this.emitter && (this.emitter.forEachExists(function(a) {
                a.exists = !1
            }, this), this.emitter.kill())
        }, 
        c.prototype.onRemoveFromPool = function() {
            this.exists = !0, this.visible = !0, 
            this.alive = !0, this._requestItemSignal.active = !0, 
            this._moveCompleteSignal.active = !0, this.alpha = 1, 
            this.emitter && this.emitter.revive()
        }, 
        c.prototype.destroy = function() {
            b.prototype.destroy.call(this, !0), 
            this.emitter && (this.emitter.destroy(!0, !1), this.emitter = null), 
            this._requestItemSignal.dispose(), 
            this._requestItemSignal = null,
            this._moveCompleteSignal.dispose(), 
            this._moveCompleteSignal = null
        }, 
        Object.defineProperty(c.prototype, "requestItemSignal", {
            get: function() {
                return this._requestItemSignal
            },
            enumerable: !0,
            configurable: !0
        }), 
        Object.defineProperty(c.prototype, "moveCompleteSignal", {
            get: function() {
                return this._moveCompleteSignal
            },
            enumerable: !0,
            configurable: !0
        }), c
    }(Phaser.Image);
    a.StarPowerUp = b
}(game || (game = {}));
