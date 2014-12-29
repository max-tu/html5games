/* =======togglebutton ======*/
function(t, e) {
    "use strict";
    var i = t("./simplebutton"),
        s = function(t, e, s, n, a, o) {
            i.call(this, t, e, s, n, a), 
            this.spriteSheet = n, 
            this.textureKey1 = a, 
            this.textureKey2 = o, 
            this.activeTextureKey = this.textureKey1, 
            this._state = 1, 

            this.events.onInputUp.add(this.switchTextures, this, 0), 

            Object.defineProperty(this, "state", {
                get: function() {
                    return this._state
                },
                enumerable: !0,
                configurable: !0
            })
        };
    s.prototype = Object.create(Phaser.Image.prototype), 
    s.prototype.constructor = s, 
    s.prototype.switchTextures = function() {
        this.activeTextureKey = this.activeTextureKey === this.textureKey1 ? this.textureKey2 : this.textureKey1, 
        this.loadTexture(this.spriteSheet, this.activeTextureKey), 
        this._state = this.activeTextureKey === this.textureKey1 ? 1 : 2
    }, e.exports = s
}