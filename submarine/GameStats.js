var game;
! function(a) {
    var b = function() {
        function b() {
            this._coins = 0, 
            this._bestDistance = 0, 
            this.load()
        }
        return b.prototype.load = function() {
            this._coins = this.getNumericValue("coins"), 
            this._bestDistance = this.getNumericValue("distance")
        }, 
        b.prototype.updateCoins = function(b) {
            b >= 0 && (this._coins = b, a.Main.storage.saveValue("coins", this._coins))
        }, 
        b.prototype.updateBestDistance = function(b) {
            this._bestDistance = b, a.Main.storage.saveValue("distance", this._bestDistance)
        }, 
        b.prototype.getNumericValue = function(b) {
            var c = parseInt(a.Main.storage.getValue(b));
            return isNaN(c) ? 0 : c
        }, 
        b.prototype.clearAll = function() {
            this.updateCoins(0), 
            this.updateBestDistance(0), 
            a.Main.upgrades.upgrades.forEach(function(a) {
                a.step = 0
            }), a.Main.upgrades.save()
        }, 
        Object.defineProperty(b.prototype, "coins", {
            get: function() {
                return this._coins
            },
            enumerable: !0,
            configurable: !0
        }), 
        Object.defineProperty(b.prototype, "bestDistance", {
            get: function() {
                return this._bestDistance
            },
            enumerable: !0,
            configurable: !0
        }), b
    }();
    a.GameStats = b
}(game || (game = {})), 