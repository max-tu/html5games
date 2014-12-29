/* 5-ground */
function(t, e) {
    "use strict";
    var i = function(t, e, i, s, n, a) {
        Phaser.TileSprite.call(this, t, e, i, s, n, a), 
        this.game.add.existing(this)
    };
    i.prototype = Object.create(Phaser.TileSprite.prototype), 
    i.prototype.constructor = i, 
    i.prototype.update = function() {}, 
    e.exports = i
}