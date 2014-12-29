/* =======pikachu ======*/
function(t, e) {
    "use strict";
    var i = function(t, e, i, s) {
        Phaser.Sprite.call(this, t, e, i, "pikachu100", s), 
        this.level = s, 
        this.game.physics.arcade.enableBody(this), 
        this.body.setSize(100, 100, 0, 0), 
        this.body.collideWorldBounds = !0, 
        this.body.bounce.setTo(1, 1), 

        this.body.allowRotation = !1, 
        this.body.immovable = !0, 
        this.anchor.setTo(.5, .5), 
        this.angle = -8, 

        this.game.add.tween(this).to({
            angle: 8
        }, 500, Phaser.Easing.Linear.NONE, !0, 0, Number.MAX_VALUE, !0), 

        this.notPause = !0, 
        this.game.add.existing(this)
    };
    i.prototype = Object.create(Phaser.Sprite.prototype), 
    i.prototype.constructor = i, 
    i.prototype.update = function() {
        this.game.input.activePointer.isDown && 
        this.notPause ? (
            this.x = this.game.input.x, 
            this.scale.setTo(1.2, 1.2)
            ) : 
        this.scale.setTo(1, 1)
    }, e.exports = i
}