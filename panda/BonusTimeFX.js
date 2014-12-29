var game;
! function(a) {
    var b = function(b) {
        function c(a, c) {
            b.call(this, a, c, "bonus_time_fx"), 
            this.initIcon(), this.initText(), 
            this.exists = !1, this.visible = !1
        }
        return __extends(c, b), 
        c.prototype.initIcon = function() {
            this.icon = this.game.add.image(-26, 0, "graphics_1", "BigTimer0000", this), 
            this.icon.anchor.set(.5, .5)
        }, 
        c.prototype.initText = function() {
            this.text = this.game.add.bitmapText(this.icon.x + .5 * this.icon.width, -25, "timer", "+10", 50, this)
        }, 
        c.prototype.show = function(a, b) {
            this.exists = !0, this.visible = !0, 
            this.text.setText(b), this.setPosition(a), 
            this.alpha = 0, this.scale.set(0, 1), 

            this.game.add.tween(this).to({
                alpha: 1
            }, 200, Phaser.Easing.Linear.None, !0, 200), 
            this.game.add.tween(this).to({
                y: this.y - 118
            }, 400, Phaser.Easing.Back.Out, !0, 200), 
            this.game.add.tween(this.scale).to({
                x: 1
            }, 1200, Phaser.Easing.Elastic.Out, !0, 200)
            .onComplete.addOnce(this.hide, this)
        }, 

        c.prototype.setPosition = function(b) {
            var c = 110,
                d = Phaser.Math.clamp(b.x, c, a.Config.GAME_WIDTH - c);
            this.position.set(d, b.y)
        }, 
        c.prototype.hide = function() {
            var a = 400,
                b = 100,
                c = a - b;
            this.game.add.tween(this).to({
                alpha: 0
            }, b, Phaser.Easing.Linear.None, !0, c), 
            this.game.add.tween(this).to({
                y: this.y - 50
            }, a, Phaser.Easing.Back.In, !0)
            .onComplete.addOnce(this.onHideComplete, this)
        }, 

        c.prototype.onHideComplete = function() {
            this.exists = !1, this.visible = !1
        }, c
    }(Phaser.Group);
    a.BonusTimeFX = b
}(game || (game = {}));