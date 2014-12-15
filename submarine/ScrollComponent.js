var game;
! function(a) {
    var b = function() {
        function b(b) {
            this.rightHideBound = 0, this.owner = b, this.rightHideBound = a.Config.GAME_WIDTH + .5 * b.width
        }
        return b.prototype.update = function() {
            this.owner.screenX = this.owner.parent.position.x + this.owner.x, 
            this.owner.visible = this.owner.screenX < this.rightHideBound, 
            this.owner.exists = this.owner.visible
        }, 
        b.prototype.destroy = function() {
            this.owner = null
        }, b
    }();
    a.ScrollComponent = b
}(game || (game = {}));