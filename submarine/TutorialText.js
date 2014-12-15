var game;
! function(a) {
    var b = function(b) {
        function c(c) {
            var d = a.Main.texts.tutorial_1,
                e = {
                    font: "36px GrilledCheeseBTNToasted",
                    fill: "#FFFFFF",
                    align: "center"
                };
            b.call(this, c, 0, 0, d, e), this.anchor.set(.5, .5), this.setShadow(2, 2, "#666666", 1), this.initTween()
        }
        return __extends(c, b), 
        c.prototype.initTween = function() {
            this.scale.set(0, 0), this.game.add.tween(this.scale).to({
                x: 1,
                y: 1
            }, 400, Phaser.Easing.Back.Out, !0, 500).onComplete.addOnce(this.hide, this)
        }, 
        c.prototype.hide = function() {
            var b = 5e3;
            this.game.add.tween(this).to({
                alpha: 0
            }, 100, Phaser.Easing.Linear.None, !0, b + 150), this.game.add.tween(this).to({
                y: a.Config.GAME_HEIGHT
            }, 300, Phaser.Easing.Back.In, !0, b).onComplete.addOnce(this.onHideComplete, this)
        }, 
        c.prototype.onHideComplete = function() {
            this.destroy(!0)
        }, c
    }(Phaser.Text);
    a.TutorialText = b
}(game || (game = {}));