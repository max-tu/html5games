var game;
! function(a) {
    var b = function() {
        function a() {
            this.level = 1, this.points = 0, this.maxChain = 0
        }
        return a.prototype.doReset = function() {
            this.points = 0, this.maxChain = 0
        }, a
    }();
    a.RoundResult = b
}(game || (game = {}));