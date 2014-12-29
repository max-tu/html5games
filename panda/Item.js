var game;
! function(a) {
    ! function(a) {
        a[a.Fruit_1 = 0] = "Fruit_1", 
        a[a.Fruit_2 = 1] = "Fruit_2", 
        a[a.Fruit_3 = 2] = "Fruit_3", 
        a[a.Fruit_4 = 3] = "Fruit_4", 
        a[a.Fruit_5 = 4] = "Fruit_5"
    }(a.ItemType || (a.ItemType = {}));
    a.ItemType
}(game || (game = {}));
/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
var game;
! function(a) {
    var b = function(b) {
        function c(a, c) {
            b.call(this, a, 0, 0, "graphics_1"), 
            this.futurePowerUp = null, 
            this.powerUp = null, 
            this.alive = !1, 
            this.dropDistance = 0, 
            this.collected = !1, 
            this.alive = !1, 
            this.exists = !1, 
            this.visible = !1, 
            this.anchor.set(.5, .5), 
            this._itemType = c, 
            this._collectCompleteSignal = new Phaser.Signal, 
            this.initTextures(), 
            this.setNormalTexture(), 
            this.initTweens()
        }
        return __extends(c, b), 
        c.prototype.initTextures = function() {
            var b = a.ItemType[this._itemType];
            this.normalTexture = b + "0000", 
            this.highlightedTexture = b + "_Highlighted0000"
        }, 
        c.prototype.setNormalTexture = function() {
            this.loadTexture("graphics_1", this.normalTexture)
        }, 
        c.prototype.setHighlightedTexture = function() {
            this.loadTexture("graphics_1", this.highlightedTexture)
        }, 
        c.prototype.initTweens = function() {
            this.collectTween = this.game.add.tween(this.scale).to({
                x: 0,
                y: 0
            }, 300, Phaser.Easing.Back.In), 
            this.collectTween.onComplete.add(this.onCollectComplete, this), 
            this.scale.set(0, 0), 
            this.showOnGridTween = this.game.add.tween(this.scale).to({
                x: 1,
                y: 1
            }, 500, Phaser.Easing.Back.Out, !1, 200), 

            this.scale.set(1, 1), 
            this.removeFromGridTween = this.game.add.tween(this.scale).to({
                x: 0,
                y: 0
            }, 500, Phaser.Easing.Back.In), 

            this.removeFromGridTween.onComplete.add(this.onAddToPool, this), 
            this.highlightTween = this.game.add.tween(this.scale).to({
                x: 1.2,
                y: .8
            }, 100, Phaser.Easing.Cubic.Out).to({
                x: 1,
                y: 1
            }, 300, Phaser.Easing.Back.Out), 

            this.scale.set(1, 1)
        }, 
        c.prototype.highlight = function() {
            this.setHighlightedTexture(), 
            a.Main.weakDevice === !1 && this.highlightTween.start()
        }, 
        c.prototype.unhighlight = function() {
            null === this.powerUp && this.setNormalTexture(), 
            this.futurePowerUp && (this.futurePowerUp.onAddToPool(), this.futurePowerUp = null)
        }, 
        c.prototype.showOnGrid = function(a) {
            a === !1 && (this.scale.set(0, 0), this.showOnGridTween.start())
        }, 
        c.prototype.collectToPanda = function(a) {
            this.onCollectStart(), this.unhighlight();
            var b = utils.MathUtil.distance(this.position.x, this.position.y, a.x, a.y),
                c = Phaser.Math.clamp(b, 400, 800);
            this.game.add.tween(this).to({
                x: a.x,
                y: a.y - 56
            }, c, Phaser.Easing.Back.In, !0), 

            this.game.add.tween(this.scale).to({
                x: .33,
                y: .33
            }, 300, Phaser.Easing.Back.In, !0, c - 250)
            .onComplete.addOnce(this.onCollectComplete, this)
        }, 
        c.prototype.collect = function() {
            this.onCollectStart(), this.collectTween.start()
        }, 
        c.prototype.onCollectStart = function() {
            this.collected = !0, 
            this.futurePowerUp && (this.futurePowerUp.activate(), 
                this.futurePowerUp = null), this.powerUp && (this.powerUp.activate(), this.powerUp = null)
        }, 
        c.prototype.onCollectComplete = function() {
            this._collectCompleteSignal.dispatch(this), this.onAddToPool()
        }, 
        c.prototype.moveTo = function(a) {
            this.game.add.tween(this).to({
                y: a
            }, 500, Phaser.Easing.Cubic.Out, !0)
        }, 
        c.prototype.setFuturePowerUp = function(a) {
            null === this.futurePowerUp && (this.futurePowerUp = a)
        }, 
        c.prototype.hasPowerUp = function() {
            return null !== this.powerUp
        }, 
        c.prototype.setPowerUp = function(a) {
            null === this.powerUp && (this.powerUp = a, this.setHighlightedTexture())
        }, 
        c.prototype.linkCell = function(a) {
            this.cell && this.clearCell(), this.cell = a, this.cell.item = this
        }, 
        c.prototype.clearCell = function() {
            this.cell && (this.cell.item = null, this.cell = null)
        }, 
        c.prototype.removeFromGrid = function(a) {
            this.clearCell(), a ? this.onAddToPool() : this.removeFromGridTween.start()
        }, 
        c.prototype.collectToBasket = function(a, b) {
            this.clearCell();
            var c = this.x,
                d = this.y,
                e = Phaser.Math.distance(c, d, a, b),
                f = 500 + 5e3 / e;
            this.game.add.tween(this).to({
                x: a,
                y: b
            }, 1.2 * e, Phaser.Easing.Cubic.In, !0, f), 
            this.game.add.tween(this.scale).to({
                x: .33,
                y: .33
            }, .1 * e, Phaser.Easing.Back.In, !0, f + 1.1 * e)
            .onComplete.addOnce(this.onAddToPool, this)
        }, 
        c.prototype.onAddToPool = function() {
            this.alive = !1, 
            this.exists = !1, 
            this.visible = !1, 
            this.futurePowerUp && (this.futurePowerUp.onAddToPool(), 
                this.futurePowerUp = null), 
            this.powerUp && (this.powerUp.returnToPool(), this.powerUp = null)
        }, 
        c.prototype.onRemoveFromPool = function() {
            this.alive = !0, 
            this.exists = !0, 
            this.visible = !0, 
            this.collected = !1, 
            this.alpha = 1, 
            this.scale.set(1, 1), 
            this.setNormalTexture()
        }, 
        c.prototype.destroy = function() {
            b.prototype.destroy.call(this, !0), 
            this._collectCompleteSignal.dispose(), 
            this._collectCompleteSignal = null, 
            this.futurePowerUp = null, 
            this.powerUp = null, 
            this.clearCell(), 
            this.destroyTweens()
        }, 
        c.prototype.destroyTweens = function() {
            this.showOnGridTween.stop(), 
            this.showOnGridTween = null, 
            this.collectTween.stop(), 
            this.collectTween = null, 
            this.highlightTween.stop(), 
            this.highlightTween = null, 
            this.removeFromGridTween.stop(), 
            this.removeFromGridTween = null
        }, 
        Object.defineProperty(c.prototype, "itemType", {
            get: function() {
                return this._itemType
            },
            enumerable: !0,
            configurable: !0
        }), 
        Object.defineProperty(c.prototype, "collectCompleteSignal", {
            get: function() {
                return this._collectCompleteSignal
            },
            enumerable: !0,
            configurable: !0
        }), c.RADIUS = 40, 
        c.RADIUS_SQUARED = c.RADIUS * c.RADIUS, 
        c.CONTACT_RADIUS = 120, 
        c.CONTACT_RADIUS_SQUARED = c.CONTACT_RADIUS * c.CONTACT_RADIUS, 
        c.ITEM_TYPES = [0, 1, 2, 3, 4], c
    }(Phaser.Image);
    a.Item = b
}(game || (game = {}));
/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/    

var game;
! function(a) {
    var b = function() {
        function a(a, b) {
            this.game = a, this.grid = b, 
            this.itemRnd = new Phaser.RandomDataGenerator([10])
        }
        return a.prototype.setAllowedItemTypes = function(a) {
            this.allowedItemTypes = a
        }, 
        a.prototype.setAddItemCallback = function(a, b) {
            this.addItemCallback = a, this.addItemCallbackContext = b
        }, 
        a.prototype.generateItems = function(a, b) {
            for (var c = 0; a > c; c++) {
                var d = b ? b : this.itemRnd.pick(this.allowedItemTypes);
                this.dispatchAddItemCallback(d)
            }
        }, 
        a.prototype.dispatchAddItemCallback = function(a) {
            this.addItemCallback.call(this.addItemCallbackContext, a)
        }, 
        a.prototype.destroy = function() {
            this.game = null, 
            this.grid = null, 
            this.itemRnd = null, 
            this.addItemCallback = null, 
            this.addItemCallbackContext = null, 
            this.allowedItemTypes = null
        }, a
    }();
    a.ItemsGenerator = b
}(game || (game = {}));