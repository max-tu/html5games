var game;
! function(a) {
    var b = function(b) {
        function c(a, c) {
            b.call(this, a, c, "upgrades_board"), 
            this.exists = !1, 
            this.visible = !1, 
            this.addBack(), 
            this.initUpgradeViews(), 
            this.initCoinsLabel(), 
            this.initUpgradeDescription(), 
            this.initButtons(), 
            this._hideCompleteSignal = new Phaser.Signal
        }
        return __extends(c, b), 
        c.prototype.addBack = function() {
            this.back = this.game.add.image(0, 0, "upgrades", "Upgrades_Board0000", this), 
            this.back.anchor.set(.5, .5)
        }, 
        c.prototype.initUpgradeViews = function() {
            this.upgradeViews = [];
            for (var b = .5 * -this.back.width + 150, c = .5 * -this.back.height + 65, d = 190, 
                e = a.Main.upgrades.upgrades, f = 0; f < e.length; f++) {
                var g = e[f],
                    h = new a.UpgradeView(this.game, this, g);
                h.buyButtonTapped.add(this.tryToBuyUpgrade, this), 
                h.iconTapped.add(this.updateDescription, this), 
                h.position.set(b + .5, c), this.add(h), 
                this.upgradeViews.push(h), 
                b += d
            }
        }, c.prototype.tryToBuyUpgrade = function(b) {
            var c = b.upgrade,
                d = c.getCurrentPrice();
            a.Main.stats.coins >= d ? (a.Main.stats.updateCoins(a.Main.stats.coins - d), 
                this.coinsLabel.updateCoinsValue(a.Main.stats.coins, !1), 
                c.advance(), a.Main.upgrades.save(), 
                b.shakeIcon(), b.syncWithUpgrade(), 
                this.game.sound.play("buy")) : (this.coinsLabel.shake(), this.game.sound.play("no_coins"))

        }, 
        c.prototype.updateDescription = function(a) {
            this.description.setText(a.upgrade.description)
        }, 
        c.prototype.initCoinsLabel = function() {
            var b = a.Main.stats.coins;
            this.coinsLabel = new a.CoinsLabel(this.game, this), 
            this.coinsLabel.updateCoinsValue(b, !0), 
            this.coinsLabel.position.set(-285, 147)
        }, 
        c.prototype.initUpgradeDescription = function() {
            var a = this.upgradeViews[0].upgrade.description,
                b = {
                    font: "24px GrilledCheeseBTNToasted",
                    fill: "#FFFFFF",
                    align: "center"
                };
            this.description = this.game.add.text(0, 0, " ", b, this), 
            this.description.setShadow(2, 2, "#1B73FF", 0), 
            this.description.x = 100, 
            this.description.y = this.coinsLabel.y + 4, 
            this.description.wordWrap = !0, 
            this.description.wordWrapWidth = 540, 
            this.description.anchor.set(.5, .5), 
            this.description.lineSpacing = -5, 
            this.description.setText(a), 
            this.game.device.firefox && (this.description.y = this.coinsLabel.y + 15, this.description.lineSpacing = 0)
        }, 
        c.prototype.initButtons = function() {
            this.continueButton = new a.SimpleButton(this.game, 0, 0, "upgrades", "Next_Button0000"), 
            this.continueButton.position.y = .5 * this.back.height + 45, 
            this.continueButton.callback.add(this.hide, this),
             this.addAt(this.continueButton, 0)
        }, 
        c.prototype.show = function(b) {
            "undefined" == typeof b && (b = 0), 
            this.exists = !0, 
            this.visible = !0, 
            this.coinsLabel.updateCoinsValue(a.Main.stats.coins, !0),
             this.showContinueButton(), 
             this.playAnimation(b), 
             a.Main.development && this.enableCheats()
        }, 
        c.prototype.showContinueButton = function() {
            this.continueButton.inputEnabled = !0, 
            this.continueButton.y = .5 * this.back.height + 45
        }, 
        c.prototype.playAnimation = function(b) {
            var c = 600;
            this.y = .5 * -this.back.height - 100, 
            this.game.add.tween(this.position).to({
                y: a.Config.HALF_GAME_HEIGHT - 35
            }, c, Phaser.Easing.Back.Out, !0, b)
        }, 

        c.prototype.enableCheats = function() {
            var b = this;
            this.game.input.keyboard.addKey(Phaser.Keyboard.PAGE_UP).onDown.add(function() {
                a.Main.stats.updateCoins(a.Main.stats.coins + 1e3), 
                b.coinsLabel.updateCoinsValue(a.Main.stats.coins, !1)
            }, this), 

            this.game.input.keyboard.addKey(Phaser.Keyboard.PAGE_DOWN).onDown.add(function() {
                a.Main.stats.updateCoins(a.Main.stats.coins - 1e3),
                 b.coinsLabel.updateCoinsValue(a.Main.stats.coins, !1)
            }, this), 

            this.game.input.keyboard.addKey(Phaser.Keyboard.END).onDown.add(this.clearSavedData, this)
        }, 
        c.prototype.clearSavedData = function() {
            a.Main.stats.clearAll(), 
            this.coinsLabel.updateCoinsValue(a.Main.stats.coins, !0), 
            this.upgradeViews.forEach(function(a) {
                a.syncWithUpgrade()
            })
        }, c.prototype.hide = function() {
            this.continueButton.inputEnabled = !1, 
            this.hideButtons(), 
            this.hideBoard(300), 
            a.Main.development && this.disableCheats()
        }, 
        c.prototype.hideButtons = function() {
            this.game.add.tween(this.continueButton).to({
                y: this.continueButton.y - 150
            }, 300, Phaser.Easing.Back.In, !0)
        }, 

        c.prototype.hideBoard = function(b) {
            var c = 600,
                d = a.Config.GAME_HEIGHT + .5 * this.back.height;
            this.game.add.tween(this.position).to({
                y: d
            }, c, Phaser.Easing.Back.In, !0, b).onComplete.addOnce(this.onHideComplete, this)
        }, 
        c.prototype.disableCheats = function() {
            this.game.input.keyboard.removeKey(Phaser.Keyboard.PAGE_DOWN), 
            this.game.input.keyboard.removeKey(Phaser.Keyboard.PAGE_UP), 
            this.game.input.keyboard.removeKey(Phaser.Keyboard.END)
        }, 
        c.prototype.onHideComplete = function() {
            this.exists = !1, 
            this.visible = !1, 
            this._hideCompleteSignal.dispatch()
        }, 
        c.prototype.destroy = function() {
            b.prototype.destroy.call(this, !0, !1), 
            this._hideCompleteSignal.dispose(), 
            this._hideCompleteSignal = null
        },
         Object.defineProperty(c.prototype, "hideCompleteSignal", {
            get: function() {
                return this._hideCompleteSignal
            },
            enumerable: !0,
            configurable: !0
        }), c
    }(Phaser.Group);
    a.UpgradesBoard = b
}(game || (game = {}));