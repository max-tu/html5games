/* =======ball ======*/
        function(t, e) {
            "use strict";
            var i = function(t, e, i, s, n, a) {
                Phaser.Sprite.call(this, t, e, i, "ballred", s, n, a), this._x = e, this._y = i, this.pikachu = s, this.trap = n, this.level = a, this.level = this.level > 1 ? 7 : 5, this.game.global.phonegap && (this.level *= 10), this.game.physics.arcade.enableBody(this), this.body.setSize(32, 32, 0, 0), this.body.collideWorldBounds = !0, this.body.bounce.setTo(2, 3), this.anchor.setTo(.5, .5), this.body.maxVelocity.x = 100 * this.level, this.body.maxVelocity.y = 100 * this.level, this.cachedVelocity = {}, this.notPause = !0, this.animations.add("start", ["01.png", "02.png", "03.png", "04.png"], 2, !0), this.animations.add("ghost", ["05.png", "01.png", "05.png"], 2, !0), this.animations.play("start"), this.health = 3, this.ghostUntil = 1, this.ghostUntilTimer = 2e3, this.timeDelay = 0, this.lives = this.game.add.group();
                for (var o = 0; this.health > o; o++) {
                    var h = this.lives.create(this.game.width / 2 - 70 - 50 * o, 45, "ballred", "01.png");
                    h.scale.setTo(.7, .7), h.anchor.setTo(.5, .5)
                }
                this.game.add.existing(this), this._levelFailSignal = new Phaser.Signal, Object.defineProperty(this, "levelFailSignal", {
                    get: function() {
                        return this._levelFailSignal
                    },
                    enumerable: !0,
                    configurable: !0
                }), this.explosionPool = this.game.add.group(), this.explosionPool.enableBody = !0, this.explosionPool.physicsBodyType = Phaser.Physics.ARCADE, this.explosionPool.createMultiple(3, "explosion_boom"), this.explosionPool.setAll("anchor.x", .5), this.explosionPool.setAll("anchor.y", .5), this.explosionPool.forEach(function(t) {
                    t.animations.add("boom")
                })
            };
            i.prototype = Object.create(Phaser.Sprite.prototype), i.prototype.constructor = i, i.prototype.update = function() {
                this.ghostUntil > this.game.time.now ? this.animations.play("ghost") : (this.animations.play("start"), this.ghostUntil = 1), this.game.physics.arcade.overlap(this, this.pikachu, this.overPikachu, null, this), this.game.physics.arcade.collide(this, this.trap, this.damage, null, this)
            }, i.prototype.overPikachu = function() {
                this.game.time.now > this.timeDelay && (this.game.global.enable_sound && this.game.sound.play("plop"), this.timeDelay = this.game.time.now + 1e3), this.body.velocity.y = -Math.abs(this.body.velocity.y) * this.level;
                var t = 0;
                this.x < this.pikachu.x ? (t = this.pikachu.x - this.x, this.body.velocity.x += 100 * t * this.level) : this.x > this.pikachu.x && (t = this.x - this.pikachu.x, this.body.velocity.x -= 100 * t * this.level)
            }, i.prototype.start = function() {
                this.game.input.activePointer.isDown && this.x == this._x && this.y == this._y && (this.body.velocity.y = -300 * this.level)
            }, i.prototype.damage = function() {
                if (!(this.ghostUntil > this.game.time.now)) {
                    this.health -= 1, this.explode();
                    var t = this.lives.getFirstAlive();
                    return t && (this.ghostUntil = this.game.time.now + this.ghostUntilTimer, t.kill()), 0 >= this.health ? (this._levelFailSignal.dispatch(), this.alive = !1, this.kill(), !0) : !1
                }
            }, i.prototype.pause = function(t) {
                "off" == t ? (this.notPause = !0, this.body && (this.body.velocity.x = this.cachedVelocity.x, this.body.velocity.y = this.cachedVelocity.y)) : "on" == t && (this.notPause = !1, this.body && (this.cachedVelocity.x = this.body.velocity.x, this.cachedVelocity.y = this.body.velocity.y, this.body.velocity.x = 0, this.body.velocity.y = 0))
            }, i.prototype.explode = function() {
                if (0 !== this.explosionPool.countDead()) {
                    this.game.global.enable_sound && this.game.sound.play("player-explosion");
                    var t = this.explosionPool.getFirstExists(!1);
                    t.reset(this.x, this.y), t.play("boom", 15, !1, !0)
                }
            }, e.exports = i
        }