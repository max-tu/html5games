var game;
! function(a) {
    var b = function() {
        function b(a, b) {
            this.velocityBeforeTurbo = 0, 
            this.turboVelocity = .9375, 
            this.turboActive = !1,
            this.turboActivating = !1, 
            this.turboDeactivating = !1, 
            this.submarineDead = !1, 
            this.maxSpeedAchieved = !1, 
            this.game = a, 
            this.submarine = b, 
            this.increaseSpeedTimer = this.game.time.events.repeat(1500, Number.MAX_VALUE, this.increaseSpeed, this)
        }
        return b.prototype.increaseSpeed = function() {
            this.maxSpeedAchieved || this.turboActive || this.submarineDead || 
            (this.submarine.velocityX += .0046875, this.submarine.velocityX >= .5 && (this.maxSpeedAchieved = !0))
        }, 
        b.prototype.turnOnTurbo = function() {
            this.velocityBeforeTurbo = this.submarine.velocityX, 
            this.turboActive = !0, this.turboActivating = !0
        }, 
        b.prototype.turnOffTurbo = function() {
            this.turboActive = !1, this.turboDeactivating = !0
        }, 
        b.prototype.onSubmarineDead = function() {
            this.submarineDead = !0
        }, 
        b.prototype.update = function() {
            this.turboActivating && 
            (this.submarine.velocityX *= 1.01, 
                this.submarine.velocityX >= this.turboVelocity && 
                (this.turboActivating = !1)),
                this.turboDeactivating && 
                (this.submarine.velocityX *= .99, 
                    this.submarine.velocityX <= this.velocityBeforeTurbo && 
                    (this.turboDeactivating = !1)), 
                this.submarineDead && this.submarine.velocityX > .01 && (this.submarine.velocityX *= .995)
        }, 
        b.prototype.doReset = function() {
            this.submarine.velocityX = a.Submarine.INITIAL_VELOCITY_X, this.submarineDead = !1, this.turboActive = !1, this.turboActivating = !1, this.turboDeactivating = !1, this.maxSpeedAchieved = !1
        }, 
        b.prototype.destroy = function() {
            this.increaseSpeedTimer && (this.game.time.events.remove(this.increaseSpeedTimer), this.increaseSpeedTimer = null)
        }, 
        b
    }();
    a.VelocityHandler = b
}(game || (game = {}));