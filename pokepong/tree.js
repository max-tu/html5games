/* =======tree ======*/
function(t, e) {
    "use strict";
    var i = function(t, e, i, s) {
        Phaser.Sprite.call(this, t, e, i, "tree", s), 
        this.ball = s, 
        this.game.physics.arcade.enableBody(this), 
        this.body.setSize(30, 80, 0, 0), 
        this.body.bounce.setTo(1, 1), 
        this.body.allowRotation = !1, 
        this.body.immovable = !0, 
        this.anchor.setTo(.5, .5)
    };
    i.prototype = Object.create(Phaser.Sprite.prototype), 
    i.prototype.constructor = i, 
    i.prototype.update = function() {
        this.game.physics.arcade.collide(this, this.ball, this.hitBall, null, this)
    }, 
    i.prototype.hitBall = function() {
        this.ball.body.velocity.x > 0 ? 
            this.ball.body.x += this.game.rnd.between(5, 10) : 
            0 > this.ball.body.velocity.x && (this.ball.body.x -= this.game.rnd.between(5, 10))
    }, e.exports = i
}