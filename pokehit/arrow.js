 function(t, e) {
    "use strict";
    var i = function(t, e, i, s) {
        Phaser.Sprite.call(this, t, e, i, "arrow", s), 
        this.level = s, 
        this.game.physics.arcade.enableBody(this), 
        this.body.immovable = !0, 
        this.anchor.setTo(.5, .5), 
        this.angle = -80, 

        this.game.add.tween(this).to({
            angle: 80
        }, 1500 - 20 * this.level, Phaser.Easing.Linear.NONE, !0, 0, Number.MAX_VALUE, !0), 
        
        this.game.add.existing(this)
    };
    i.prototype = Object.create(Phaser.Sprite.prototype), 
    i.prototype.constructor = i, 
    i.prototype.update = function() {
        this.game.input.activePointer.isDown && this.notPause && (this.visible = !1)
    }, e.exports = i
}, {}