var game;
! function(a) {
    var b = function(b) {
        function c(a, c) {
            b.call(this, a, c, "buy_button"), this.initButton(), this.initLabel()
        }
        return __extends(c, b), 
        c.prototype.initButton = function() {
            this.button = new a.SimpleButton(this.game, 0, 0, "upgrades", "Buy_Button0000"), this.add(this.button)
        }, 
        c.prototype.initLabel = function() {
            var a = {
                font: "22px GrilledCheeseBTNToasted",
                fill: "#3E5A0A",
                align: "center"
            };
            this.label = this.game.add.text(0, 0, "500", a, this), 
            this.label.anchor.set(.5, .5), 
            this.game.device.firefox && (this.label.y = 10)

        }, 
        c.prototype.updateText = function(a) {
            this.label.setText(a)
        }, 
        c.prototype.disable = function() {
            this.label.setText("max"), this.button.inputEnabled = !1
        }, 
        c.prototype.destroy = function() {
            this.button = null, this.label = null
        }, 
        Object.defineProperty(c.prototype, "clicked", {
            get: function() {
                return this.button.callback
            },
            enumerable: !0,
            configurable: !0
        }), c
    }(Phaser.Group);
    a.BuyButton = b
}(game || (game = {}));