var game;
! function(a) {
    var b = function(b) {
        function c(a, c) {
            b.call(this, a, c), 
            this.addMonkey(), 
            this.addBasket(), 
            this._dispatchFruitsComplete = new Phaser.Signal, 
            this.exists = !1, 
            this.visible = !1
        }
        return __extends(c, b), 
        c.prototype.addMonkey = function() {
            this.monkey = this.game.add.image(0, 0, "graphics_1", "Monkey0000", this), 
            this.monkey.anchor.set(.5, .5)
        }, 
        c.prototype.addBasket = function() {
            this.basket = this.game.add.image(-5, 55, "graphics_1", "Monkey_Basket0000", this), 
            this.basket.anchor.set(.5, .5)
        }, 
        c.prototype.show = function() {
            this.exists = !0, 
            this.visible = !0, 
            this.position.y = a.Config.GAME_HEIGHT - 94, this.scale.set(0, 0), 
            this.game.add.tween(this.scale).to({
                x: 1,
                y: 1
            }, 1e3, Phaser.Easing.Elastic.Out, !0)
        }, 
        c.prototype.hide = function() {
            this.game.add.tween(this).to({
                y: a.Config.GAME_HEIGHT + 100
            }, 300, Phaser.Easing.Back.In, !0)
            .onComplete.addOnce(this.onHideComplete, this)
        }, 
        c.prototype.shakeBasket = function() {
            a.Main.weakDevice === !1 && (this.basket.angle = -3, 
                this.game.add.tween(this.basket).to({
                angle: 3
            }, 150, Phaser.Easing.Sinusoidal.Out, !0, 0, 11, !0))
        }, 

        c.prototype.collectFruits = function() {
            this.show(), this.game.time.events.add(1800, this.hide, this)
        }, 
        c.prototype.dispatchFruits = function() {
            this.show(), this.game.time.events.add(300, this.shakeBasket, this), 
            this.game.time.events.add(2700, this.onDispatchComplete, this)
        }, 
        c.prototype.onDispatchComplete = function() {
            this.game.time.events.add(500, this._dispatchFruitsComplete.dispatch, this), 
            this.hide()
        }, 
        c.prototype.onHideComplete = function() {
            this.exists = !1, this.visible = !1
        }, Object.defineProperty(c.prototype, "dispatchFruitsComplete", {
            get: function() {
                return this._dispatchFruitsComplete
            },
            enumerable: !0,
            configurable: !0
        }), c
    }(Phaser.Group);
    a.Monkey = b
}(game || (game = {}));