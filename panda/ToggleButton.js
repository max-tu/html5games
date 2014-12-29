var game;
! function(a) {
    var b = function(a) {
        function b(b, c, d, e, f, g) {
            a.call(this, b, c, d, e, f), 
            this.spriteSheet = e, 
            this.textureKey1 = f, 
            this.textureKey2 = g, 
            this.activeTextureKey = this.textureKey1, 
            this._state = 1, 
            this.events.onInputUp.add(this.switchTextures, this, 2)
        }
        return __extends(b, a), 
        b.prototype.switchTextures = function() {
            this.activeTextureKey = this.activeTextureKey === this.textureKey1 ? this.textureKey2 : this.textureKey1, 
            this.loadTexture(this.spriteSheet, this.activeTextureKey), 

            this._state = this.activeTextureKey === this.textureKey1 ? 1 : 2
        }, 
        Object.defineProperty(b.prototype, "state", {
            get: function() {
                return this._state
            },
            enumerable: !0,
            configurable: !0
        }), b
    }(game.SimpleButton);
    a.ToggleButton = b
}(game || (game = {}));