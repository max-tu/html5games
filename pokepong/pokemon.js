/* =======pokemon ======*/
function(t, e) {
    var i = t("./level2pokemon"),
        s = function(t, e, s, n, a) {
            this._level2pokemon = new i(a), 
            Phaser.Sprite.call(this, t, e, s, this._level2pokemon.pokemon, n, a),

            this._x = e, 
            this._y = s, 
            this.ball = n, 
            this.level = a, 
            this.level = this.level > 5 ? 6 : 4, 

            this.game.global.phonegap && (this.level *= 10), 

            this.health = 3, 
            this.ghostUntil = 1, 
            this.ghostUntilTimer = 2e3, 
            this.lives = this.game.add.group();

            for (var o = 0; this.health > o; o++) {
                var h = this.lives.create(this.game.width / 2 + 40 + 70 * o, 45, 
                    this._level2pokemon.pokemon, "01.png");

                h.scale.setTo(.7, .7), 
                h.anchor.setTo(.5, .5)
            }
            this.game.physics.arcade.enableBody(this), 
            this.body.setSize(55, 55, 0, 0), 

            this.body.collideWorldBounds = !0, 
            this.body.bounce.setTo(1, 1), 
            this.body.allowRotation = !1, 
            this.anchor.setTo(.5, .5), 
            this.body.immovable = !0, 
            this.cachedVelocity = {}, 

            this.notPause = !0, 

            this.animations.add("left", this._level2pokemon.frame_left, 10, !0), 
            this.animations.add("ghostleft", this._level2pokemon.frame_ghostleft, 10, !0), 
            this.animations.add("right", this._level2pokemon.frame_right, 10, !0), 
            this.animations.add("ghostright", this._level2pokemon.frame_ghostright, 10, !0), 

            this.game.add.existing(this), 
            this.game.physics.arcade.velocityFromRotation
            (Math.floor(50 * this.game.rnd.between(1, 5)), 300 + this.level, this.body.velocity), 

            this._levelCompleteSignal = new Phaser.Signal, 

            Object.defineProperty(this, "levelCompleteSignal", {
                get: function() {
                    return this._levelCompleteSignal
                },
                enumerable: !0,
                configurable: !0
            }), 

            this.explosionPool = this.game.add.group(), 
            this.explosionPool.enableBody = !0, 
            this.explosionPool.physicsBodyType = Phaser.Physics.ARCADE, 
            this.explosionPool.createMultiple(3, "explosion"), 
            this.explosionPool.setAll("anchor.x", .5), 
            this.explosionPool.setAll("anchor.y", .5), 

            this.explosionPool.forEach(function(t) {
                t.animations.add("boom")
            })
        };
    s.prototype = Object.create(Phaser.Sprite.prototype), 
    s.prototype.constructor = s, 

    s.prototype.update = function() {
        this.ghostUntil > this.game.time.now ? 
            0 > this.body.velocity.x ? this.animations.play("ghostleft") : 
                this.body.velocity.x > 0 && this.animations.play("ghostright") : 0 > 
                this.body.velocity.x ? 
                (
                    this.animations.play("left"), 
                    this.ghostUntil = 1) : 

                    this.body.velocity.x > 0 && (this.animations.play("right"), 

                    this.ghostUntil = 1
                ), 
                this.notPause && this.y > this.game.height - 300 && (
                    this.body.velocity.x = 0, 
                    this.body.velocity.y = 0, 
                    this.body.velocity.y = -Math.floor(this.game.rnd.between(140, 150) + 
                        this.level), 
                    this.body.velocity.x = Math.floor(this.game.rnd.between(140, 150) + 
                        this.level)), 

                this.game.physics.arcade.collide(this, this.ball, this.hitBall, null, this)

    }, 
    s.prototype.hitBall = function() {
        if (!(this.ghostUntil > this.game.time.now)) 
        {
            this.damage(), 
            this.explode();
            var t = this.lives.getFirstAlive();
            t && (this.ghostUntil = this.game.time.now + this.ghostUntilTimer, 
                t.kill())
        }
    }, 
    s.prototype.damage = function() {
        return this.health -= 1, 
        0 >= this.health ? (
            this._levelCompleteSignal.dispatch(), 
            this.alive = !1, 
            this.kill(), !0
            ) : !1
    }, s.prototype.pause = function(t) {
        "off" == t ? 
            this.body && (
                this.body.velocity.x = this.cachedVelocity.x, 
                this.body.velocity.y = this.cachedVelocity.y, 
                this.notPause = !0
                ) : 
                "on" == t && this.body && (
                    this.cachedVelocity.x = this.body.velocity.x, 
                    this.cachedVelocity.y = this.body.velocity.y, 
                    this.body.velocity.x = 0, 
                    this.body.velocity.y = 0, 
                    this.notPause = !1
                )
    }, s.prototype.explode = function() {
        if (0 !== this.explosionPool.countDead()) {
            this.game.global.enable_sound && this.game.sound.play("explosion");
            var t = this.explosionPool.getFirstExists(!1);
            t.reset(this.x, this.y), 
            t.play("boom", 15, !1, !0), 
            t.body.velocity.x = this.body.velocity.x, 
            t.body.velocity.y = this.body.velocity.y
        }
    }, e.exports = s
}