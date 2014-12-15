var game;
! function(a) {
    var b = function(b) {
        function c(a, c) {
            b.call(this, a, c, "pause_board"), 
            this.initBack(), 
            this.initText(), 
            this.exists = !1, 
            this.visible = !1
        }
        return __extends(c, b), 
        c.prototype.initBack = function() {
            var a = this.game.add.image(0, 0, "main_menu", "Pause_Board0000", this);
            a.anchor.set(.5, .5)
        }, 
        c.prototype.initText = function() {
            var b = a.Main.texts.pause,
                c = {
                    font: "50px GrilledCheeseBTNToasted",
                    fill: "#FFFFFF",
                    align: "center"
                }, d = new Phaser.Text(this.game, 0, 0, b, c);
            d.anchor.set(.5, .5), this.add(d)
        }, c
    }(Phaser.Group);
    a.PauseBoard = b
}(game || (game = {}));