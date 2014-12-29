  
var game;
! function(a) {
    var b = function() {
        function a(a, b) {
            this._itemsToComplete = 0, 
            this._collectedItems = 0, 
            this._complete = !1, 
            this._fruitType = a, 
            this._itemsToComplete = b, 
            this._updatedSignal = new Phaser.Signal, 
            this._completeSignal = new Phaser.Signal
        }
        return a.prototype.addCollectedItems = function(a) {
            this._complete === !1 && (this._collectedItems += a, 
                this._updatedSignal.dispatch(this._itemsToComplete - this._collectedItems), 
                this._collectedItems >= this._itemsToComplete && (this._complete = !0, this._completeSignal.dispatch()))
        }, 
        a.prototype.destroy = function() {
            this._updatedSignal.dispose(), this._updatedSignal = null, this._completeSignal.dispose(), this._completeSignal = null
        }, 
        Object.defineProperty(a.prototype, "updatedSignal", {
            get: function() {
                return this._updatedSignal
            },
            enumerable: !0,
            configurable: !0
        }), 
        Object.defineProperty(a.prototype, "completeSignal", {
            get: function() {
                return this._completeSignal
            },
            enumerable: !0,
            configurable: !0
        }), 
        Object.defineProperty(a.prototype, "fruitType", {
            get: function() {
                return this._fruitType
            },
            enumerable: !0,
            configurable: !0
        }), 
        Object.defineProperty(a.prototype, "itemsToComplete", {
            get: function() {
                return this._itemsToComplete
            },
            enumerable: !0,
            configurable: !0
        }), 
        Object.defineProperty(a.prototype, "complete", {
            get: function() {
                return this._complete
            },
            enumerable: !0,
            configurable: !0
        }), a
    }();
    a.MiniTask = b
}(game || (game = {}));