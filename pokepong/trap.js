/* =======trap ======*/
function(t, e) {
    "use strict";
    var i = function(t, e, i) {
        Phaser.Sprite.call(this, t, e, i, "saw_spin"), 
        this.game.physics.arcade.enableBody(this), 
        this.anchor.setTo(.5, .5), 
        this.body.bounce.setTo(1, 1), 
        this.body.allowRotation = !1, 
        this.body.immovable = !0, 
        this.animations.add("spin"), 
        this.animations.play("spin", 10, !0), 
        this.game.add.existing(this)
    };
    i.prototype = Object.create(Phaser.Sprite.prototype), 
    i.prototype.constructor = i, 
    i.prototype.update = function() {}, 
    e.exports = i
}