/*20 - tutorialhand*/
function(t, e) {
    "use strict";
    var i = function(t, e, i, s) {
        Phaser.Sprite.call(this, t, e, i, "hands", s), 
        this.pikachu = s, this.anchor.setTo(.5, .5), 
        this.animations.add("hand"), 
        this.animations.play("hand", 20, !0), 
        this.game.add.existing(this)
    };
    i.prototype = Object.create(Phaser.Sprite.prototype), 
    i.prototype.constructor = i,
    e.exports = i
}