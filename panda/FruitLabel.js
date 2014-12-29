var game;
! function(a) {
    var b = function(b) {
        function c(a, c) {
            b.call(this, a, c), 
            this.allCollected = !1, 
            this.initFruitImage(), 
            this.initCheckImage(), 
            this.initText()
        }
        return __extends(c, b), 
        c.prototype.setMinitask = function(a) {
            this.minitask = a, 
            this.minitask.updatedSignal.add(this.updateText, this), 
            this.minitask.completeSignal.addOnce(this.setAllCollected, this), 
            this.reset(), 
            this.updateFruitImage(), 
            this.updateText(this.minitask.itemsToComplete)
        }, 
        c.prototype.reset = function() {
            this.allCollected = !1, 
            this.hideCheckImage(), 
            this.text.visible = !0, 
            this.fruitImage.alpha = 1
        }, 
        c.prototype.hideCheckImage = function() {
            this.checkImage.exists = !1, this.checkImage.visible = !1
        }, 
        c.prototype.updateFruitImage = function() {
            var b = a.ItemType[this.minitask.fruitType] + "_Task0000";
            this.fruitImage.loadTexture("graphics_1", b)
        }, 
        c.prototype.initFruitImage = function() {
            this.fruitImage = this.game.add.image(0, 0, "graphics_1", "Fruit_10000", this), 
            this.fruitImage.anchor.set(.5, .5)
        }, 
        c.prototype.initCheckImage = function() {
            this.checkImage = this.game.add.image(10, 20, "graphics_1", "Check0000", this), 
            this.checkImage.anchor.set(.5, .5), 
            this.checkImage.exists = !1, 
            this.checkImage.visible = !1
        }, 
        c.prototype.initText = function() {
            this.text = this.game.add.bitmapText(5, 2, "fruit_labels", "0", 28, this)
        }, 
        c.prototype.updateText = function(a) {
            this.text.setText(a.toString())
        }, 
        c.prototype.setAllCollected = function() {
            this.allCollected === !1 && (this.allCollected = !0, 
                this.fruitImage.alpha = .4, this.text.visible = !1, this.showCheckedImage())
        }, 
        c.prototype.showCheckedImage = function() {
            this.checkImage.exists = !0, 
            this.checkImage.visible = !0, 
            this.checkImage.scale.set(0, 0),
            this.game.add.tween(this.checkImage.scale).to({
                x: 1,
                y: 1
            }, 300, Phaser.Easing.Back.Out, !0)
        }, 
        c.prototype.destroy = function() {
            this.fruitImage = null, 
            this.checkImage = null, 
            this.text = null, 
            this.minitask && (this.minitask = null)
        }, c
    }(Phaser.Group);
    a.FruitLabel = b
}(game || (game = {}));
/*=====================================================================*/
var game;
! function(a) {
    var b = function(b) {
        function c(a, c) {
            b.call(this, a, c), this.initLabels()
        }
        return __extends(c, b), c.prototype.initLabels = function() {
            this.labels = [];
            for (var b = 0, c = 84, d = 5, e = 0; d > e; e++) {
                var f = new a.FruitLabel(this.game, this);
                f.position.set(b, 0), f.exists = !1, f.visible = !1, this.labels.push(f), b += c
            }
        }, c.prototype.syncWithTask = function(a) {
            for (var b = this.labels.length, c = 0; b > c; c++) {
                var d = this.labels[c],
                    e = a[c];
                e ? (d.setMinitask(e), d.exists = !0, d.visible = !0) : (d.exists = !1, d.visible = !1)
            }
        }, c.prototype.updateFruitLabel = function(a, b) {
            var c = this.getLabelByType(a);
            c && c.updateText(b)
        }, c.prototype.setAsChecked = function(a) {
            var b = this.getLabelByType(a);
            b && b.setAllCollected()
        }, c.prototype.getLabelByType = function(a) {
            for (var b = this.labels.length, c = 0; b > c; c++) {
                var d = this.labels[c];
                if (d.type === a) return d
            }
            return null
        }, c.prototype.destroy = function() {
            this.labels = null
        }, c
    }(Phaser.Group);
    a.FruitLabelCollection = b
}(game || (game = {}));