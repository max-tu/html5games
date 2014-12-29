function(t, e) {
    "use strict";
    var i = function(t, e, i, s, n, a, o) {
        Phaser.Sprite.call(this, t, e, i, "ballred", s, n, o), 
        this._x = e, this._y = i, 
        this.pikachu = s, 
        this.arrow = n, 
        this.level = o, 
        this.game.global.phonegap && (this.level *= 10), 
        this.game.physics.arcade.enableBody(this), 

        this.body.setSize(32, 32, 0, 0), 
        this.body.collideWorldBounds = !1, 
        this.body.bounce.setTo(1, 1), 
        this.anchor.setTo(.5, .5), 

        this.cachedVelocity = {}, 
        this.startRun = !0, 
        this.win = a, 
        this.notPause = !0, 

        this.animations.add("start", ["01.png", "02.png", "03.png", "04.png"], 2, !0), 
        this.animations.add("ghost", ["05.png", "01.png", "05.png"], 2, !0), 
        this.animations.play("start"), 

        this.health = 4, 
        this.lives = this.game.add.group();

        for (var h = 0; this.health > h; h++) {
            var r = this.lives.create(this.game.width / 2 - 70 - 50 * h, 45, "ballred", "01.png");
            r.scale.setTo(.9, .9), r.anchor.setTo(.5, .5)
        }

        this.game.add.existing(this), 
        this._levelFailSignal = new Phaser.Signal, 

        Object.defineProperty(this, "levelFailSignal", {
            get: function() {
                return this._levelFailSignal
            },
            enumerable: !0,
            configurable: !0
        }), 

        this.explosionPool = this.game.add.group(), 
        this.explosionPool.enableBody = !0, 
        this.explosionPool.physicsBodyType = Phaser.Physics.ARCADE, 
        this.explosionPool.createMultiple(3, "explosion_boom"), 
        this.explosionPool.setAll("anchor.x", .5), 
        this.explosionPool.setAll("anchor.y", .5), 

        this.explosionPool.forEach(function(t) {
            t.animations.add("boom")
        })
    };
    i.prototype = Object.create(Phaser.Sprite.prototype), 
    i.prototype.constructor = i, 

    i.prototype.update = function() {
        if (!this.game.world.bounds.contains(this.x, this.y)) {
            var t = this.damage();

            this.position.set(this.game.width / 2, this.game.height - 120), 

            this.startRun = !0, 
            this.body.velocity.x = 0, 
            this.body.velocity.y = 0, 
            t && (this.arrow.visible = !0)
        }
    }, 
    i.prototype.start = function() {
        this.game.global.enable_sound && this.game.sound.play("plop"), 
        this.alive && this.startRun && (
            this.startRun = !1, 
            this.arrow.visible = !1, 
            this.game.physics.arcade.velocityFromAngle(this.arrow.angle - 90, 700 + this.level, this.body.velocity)
        )
    }, 
    i.prototype.damage = function() {
        this.health -= 1, this.explode();
        var t = this.lives.getFirstAlive();

        return t && t.kill(), 
        0 >= this.health ? (this._levelFailSignal.dispatch(), this.kill(), !1) : !0
    }, 
    i.prototype.pause = function(t) {
        "off" == t ? (
            this.notPause = !0, this.body && (
                this.body.velocity.x = this.cachedVelocity.x, 
                this.body.velocity.y = this.cachedVelocity.y
                )
            ) : 
        "on" == t && (
            this.notPause = !1, 
            this.body && (
                this.cachedVelocity.x = this.body.velocity.x, 
                this.cachedVelocity.y = this.body.velocity.y, 
                this.body.velocity.x = 0, 
                this.body.velocity.y = 0
                )
            )
    }, 
    i.prototype.explode = function() {
        if (0 !== this.explosionPool.countDead()) {
            var t, e;
            t = this.x > this.game.width / 2 ? this.x - 50 : this.x + 50, 
            e = this.y > this.game.height / 2 ? this.y - 50 : this.y + 50, 

            this.game.global.enable_sound && this.game.sound.play("player-explosion");
            var i = this.explosionPool.getFirstExists(!1);
            i.reset(t, e), 
            i.play("boom", 15, !1, !0)
        }
    }, e.exports = i
}