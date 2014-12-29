/*17 - simplebutton*/
function(t, e) {
    "use strict";
    var i = function(t, e, i, s, n) {
        Phaser.Image.call(this, t, e, i, s, n);
        var a = this;
        this.callbackDelay = 20, this.callbackTimer = 0, 
        this.clicked = !1, 
        this._callback = new Phaser.Signal, this.anchor.set(.5, .5), 
        this.inputEnabled = !0, this.game.device.desktop && (this.input.useHandCursor = !0), 
        this.inputEnabled && (this.events.onInputDown.add(function() {
            a.game.global.enable_sound && a.game.sound.play("tap"), 
            a.game.add.tween(a.scale).to({
                x: .9,
                y: .9
            }, 200, Phaser.Easing.Cubic.Out, !0)
        }), this.events.onInputUp.add(function() {
            a.game.add.tween(a.scale).to({
                x: 1,
                y: 1
            }, 100, Phaser.Easing.Cubic.Out, !0).onComplete.addOnce(a._callback.dispatch, a)
        })), Object.defineProperty(this, "callback", {
            get: function() {
                return this._callback
            },
            enumerable: !0,
            configurable: !0
        })
    };
    i.prototype = Object.create(Phaser.Image.prototype), 
    i.prototype.constructor = i, 
    i.prototype.setCallbackDelay = function(t) {
        this.callbackDelay = t
    }, e.exports = i
}