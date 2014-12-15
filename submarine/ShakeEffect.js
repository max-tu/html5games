var game;
! function(a) {
    var b = function() {
        function b(a) {
            this.timer = 0, 
            this.maxMagnitude = 15, 
            this.currentMagnitude = 0, 
            this.active = !1, 
            this.game = a
        }
        return b.prototype.shake = function() {
            this.active = !0, 
            this.timer = b.DURATION, 
            this.currentMagnitude = this.maxMagnitude, 
            this.game.world.setBounds(-this.maxMagnitude, -this.maxMagnitude, a.Config.GAME_WIDTH + this.maxMagnitude, a.Config.GAME_HEIGHT + this.maxMagnitude)
        }, 
        b.prototype.update = function() {
            this.active && (this.game.camera.x = this.game.rnd.realInRange(-this.currentMagnitude, this.currentMagnitude), 
                this.game.camera.y = this.game.rnd.realInRange(-this.currentMagnitude, this.currentMagnitude), 
                this.currentMagnitude *= .98, 
                this.timer -= this.game.time.elapsed, 
                this.timer <= 0 && (this.active = !1, this.game.world.setBounds(0, 0, a.Config.GAME_WIDTH, a.Config.GAME_HEIGHT)))
        }, 
        b.prototype.destroy = function() {
            this.game = null
        }, 
        b.DURATION = 666, b
    }();
    a.ShakeEffect = b
}(game || (game = {}));