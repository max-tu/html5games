var game;
! function(a) {
    var b = function(a) {
        function b(b, c) {
            a.call(this, b, c, "task_timer"), 
            this.initIcon(), this.initText(), 
            this.tickSound = this.game.add.sound("clock", .33, 3)
        }
        return __extends(b, a), 
        b.prototype.initIcon = function() {
            this.icon = this.game.add.image(0, 0, "graphics_1", "Timer0000", this), 
            this.icon.anchor.set(.5, .5)
        }, 
        b.prototype.initText = function() {
            this.text = this.game.add.bitmapText(.5 * this.icon.width + 7, -15, "timer", "00:00", 30, this)
        }, 
        b.prototype.setTimer = function(a) {
            this.timer && (this.timer = null), 
            this.timer = a, 
            this.timer.secondPassedSignal.add(this.onSecondPassed, this), 
            this.timer.stopSignal.add(this.onTimerStop, this), 
            this.updateText(this.timer.remainingSeconds)
        }, 
        b.prototype.onTimerStop = function() {
            this.tickSound.stop()
        }, 
        b.prototype.onSecondPassed = function(a) {
            this.updateText(a), 10 >= a ? (this.playTickSound(), this.game.add.tween(this.text).to({
                y: this.text.y + 3
            }, 100, Phaser.Easing.Back.Out, !0, 0, 3, !0)) : this.tickSound.stop()
        }, 
        b.prototype.playTickSound = function() {
            this.tickSound.isPlaying === !1 && this.tickSound.play()
        }, 
        b.prototype.updateText = function(a) {
            var b = Math.floor(a / 60),
                c = a % 60,
                d = 10 > b ? "0" + b.toString() : b.toString(),
                e = 10 > c ? "0" + c.toString() : c.toString(),
                f = d + ":" + e;
            this.text.setText(f)
        }, 
        b.prototype.destroy = function() {
            this.removeTimer(), this.tickSound.stop(), this.text = null, this.icon = null
        }, 
        b.prototype.removeTimer = function() {
            this.timer = null
        }, b
    }(Phaser.Group);
    a.TaskTimerView = b
}(game || (game = {}));