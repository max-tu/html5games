var utils;
! function(a) {
    var b = function() {
        function a() {
            this._enabled = !0, this.init()
        }
        return a.prototype.init = function() {
            try {
                this.localStorage = window.localStorage, 
                this.localStorage.setItem("testKey", "testData"), 
                this.localStorage.removeItem("testKey")
            } catch (a) {
                this._enabled = !1
            }
        }, 
        a.prototype.saveValue = function(a, b) {
            if (this._enabled) {
                var c = JSON.stringify(b);
                this.localStorage.setItem(a, c)
            }
        }, 
        a.prototype.getValue = function(a) {
            return this.localStorage.getItem(a)
        }, 
        a.prototype.remove = function(a) {
            this._enabled && this.localStorage.removeItem(a)
        }, 
        a.prototype.clear = function() {
            this._enabled && this.localStorage.clear()
        }, 
        Object.defineProperty(a.prototype, "enabled", {
            get: function() {
                return this._enabled
            },
            enumerable: !0,
            configurable: !0
        }), a
    }();
    a.LocalStorageWrapper = b
}(utils || (utils = {}));