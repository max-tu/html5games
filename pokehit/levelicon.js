/*11-levelicon*/
function(t, e) {
    "use strict";
    var i = function(t, e, i, s, n) {
        Phaser.Image.call(this, t, e, i, "buttonsgroup", "button.png");
        var a = this;
        this.inputEnabled = !n, 
        this.locked = n, 
        this._levelNumber = s, 
        this.anchor.set(.5, .5), 
        this.createGraphics(), 
        this.inputEnabled && (this.game.device.desktop && (this.input.useHandCursor = !0), 

        this.events.onInputDown.add(function() {
            a.game.sound.play("tap", .75), 
            a.tint *= .995, 
            a.game.add.tween(a.scale).to({
                x: .9,
                y: .9
            }, 200, Phaser.Easing.Cubic.Out, !0)
        }), 
        this.events.onInputUp.add(function() {
            a.tint = 16777215, a.game.add.tween(a.scale).to({
                x: 1,
                y: 1
            }, 200, Phaser.Easing.Cubic.Out, !0)
        })), 

        Object.defineProperty(this, "levelNumber", {
            get: function() {
                return this._levelNumber
            },
            enumerable: !0,
            configurable: !0
        })
    };
    i.prototype = Object.create(Phaser.Image.prototype), 
    i.prototype.constructor = i, 
    i.prototype.createGraphics = function() {
        this.locked ? this.createLockedGraphics() : this.createUnlockedGraphics()
    }, 
    i.prototype.createLockedGraphics = function() {
        this.loadTexture("buttonsgroup", "buttonlock.png")
    }, 
    i.prototype.createUnlockedGraphics = function() {
        var t = {
            font: "48px font",
            fill: "#218DB7",
            align: "center"
        };
        if (this.game.global.old_android) {
            var e = this.game.add.text(this.x + 90, this.y + 145, "" + this._levelNumber, t);
            e.anchor.set(.5, .5)
        } else {
            var e = this.game.add.text(0, 0, "" + this._levelNumber, t);
            e.anchor.set(.5, .5);
            var i = this.game.add.renderTexture(this.width, this.height);
            i.renderXY(this, .5 * this.width, .5 * this.height), 
            i.renderXY(e, Math.floor(.5 * this.width), Math.floor(.5 * this.height) - 1), 
            this.setTexture(i), e.destroy()
        }
    }, e.exports = i
}