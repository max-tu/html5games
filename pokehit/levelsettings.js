/*12-levelsettings*/
function(t, e) {
    "use strict";
    var i = function(t) {
        return this._levelNumber = t, Object.defineProperty(this, "levelNumber", {
            get: function() {
                return this._levelNumber
            },
            enumerable: !0,
            configurable: !0
        })
    };
    e.exports = i
}