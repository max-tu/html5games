/* =======ballopening ======*/
        function(t, e) {
            "use strict";
            var i = function(t, e, i) {
                Phaser.Sprite.call(this, t, e, i, "ballopening"), this.anchor.setTo(.5, .5), this.animations.add("open", ["01.png", "02.png", "03.png", "04.png"], 4, !0), this.animations.add("close", ["01.png", "02.png"], 2, !0), this.animations.play("open"), this.game.add.existing(this)
            };
            i.prototype = Object.create(Phaser.Sprite.prototype), i.prototype.constructor = i, i.prototype.update = function() {}, e.exports = i
        }