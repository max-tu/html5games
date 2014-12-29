var game;
! function(a) {
    var b = function() {
        function b() {
            this._totalPoints = 0, 
            this._tutorialViewed = !1, 
            this.load()
        }
        return b.prototype.load = function() {
            this._totalPoints = this.getNumericValue("points"), 
            this._tutorialViewed = Boolean(a.Main.storage.getValue("tutorial"))
        }, 
        b.prototype.setTutorialViewed = function(b) {
            this._tutorialViewed = b, a.Main.storage.saveValue("tutorial", b)
        }, 
        b.prototype.updatePoints = function(b) {
            b >= 0 && (this._totalPoints = b, a.Main.storage.saveValue("points", this._totalPoints))
        },
         b.prototype.getNumericValue = function(b) {
            var c = parseInt(a.Main.storage.getValue(b));
            return isNaN(c) ? 0 : c
        }, 
        b.prototype.clearAll = function() {
            this.updatePoints(0), this.setTutorialViewed(!1)
        }, 
        Object.defineProperty(b.prototype, "totalPoints", {
            get: function() {
                return this._totalPoints
            },
            enumerable: !0,
            configurable: !0
        }), 
        Object.defineProperty(b.prototype, "tutorialViewed", {
            get: function() {
                return this._tutorialViewed
            },
            enumerable: !0,
            configurable: !0
        }), b
    }();
    a.GameStats = b
}(game || (game = {}));