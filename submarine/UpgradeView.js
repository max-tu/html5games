var game;
! function(a) {
    var b = function(b) {
        function c(a, c, d) {
            b.call(this, a, c, "upgrade_view"), 
            this._upgrade = d, 
            this.initTitle(), 
            this.addBack(), this.addIcon(), 
            this.addProgressBar(), 
            this.addBuyButton(), 
            this.syncWithUpgrade(), 
            this._iconTapped = new Phaser.Signal, 
            this._buyButtonTapped = new Phaser.Signal
        }
        return __extends(c, b), c.prototype.initTitle = function() {
            var a = this._upgrade.title,
                b = {
                    font: "26px GrilledCheeseBTNToasted",
                    fill: "#FFFFFF",
                    align: "center"
                }, 
                c = new Phaser.Text(this.game, 0, 0, a, b);
            c.stroke = "#2392BC", c.strokeThickness = 6, c.anchor.set(.5, .5), this.add(c)
        }, 
        c.prototype.addBack = function() {
            this.back = this.game.add.image(0, 120, "upgrades", "Upgrade_Back0000", this), this.back.anchor.set(.5, .5)
        }, 
        c.prototype.addIcon = function() {
            var a = this,
                b = this.getIconImageKey();
            this.icon = this.game.add.image(0, 104, "upgrades", b, this), this.icon.anchor.set(.5, .5), 
            this.icon.inputEnabled = !0, 
            this.icon.events.onInputDown.add(function() {
                a._iconTapped.dispatch(a), a.shakeIcon()
            }, this)
        }, 
        c.prototype.getIconImageKey = function() {
            switch (this._upgrade.upgradeType) {
                case a.Upgrade.BOAT_BODY:
                    return "Body_Upgrade0000";
                case a.Upgrade.SHIELD:
                    return "Shield_Upgrade0000";
                case a.Upgrade.COINS_MAGNET:
                    return "Magnet_Upgrade0000";
                case a.Upgrade.TURBO:
                    return "Turbo_Upgrade0000";
                default:
                    return "Body_Upgrade0000"
            }
        }, 
        c.prototype.addProgressBar = function() {
            this.progressBar = new a.UpgradeProgressBar(this.game, this), 
            this.progressBar.position.set(-3, 194), this.add(this.progressBar)
        }, 
        c.prototype.addBuyButton = function() {
            var b = this,
                c = this.back.y + .5 * this.back.height + 25;
            this.buyButton = new a.BuyButton(this.game, this), 
            this.buyButton.position.set(0, c), 

            this.buyButton.clicked.add(function() {
                b.buyButtonTapped.dispatch(b)
            }, this), this.add(this.buyButton)
        }, 
        c.prototype.shakeIcon = function() {
            this.game.add.tween(this.icon.scale).to({
                x: 1.1,
                y: 1.1
            }, 150, Phaser.Easing.Cubic.Out, !0, 0, 1, !0)
        }, 
        c.prototype.syncWithUpgrade = function() {
            this.progressBar.updateBar(this._upgrade.step), this.upgrade.step >= 3 ? 
            this.buyButton.disable() : this.buyButton.updateText(this._upgrade.getCurrentPrice().toString())
        }, 
        c.prototype.destroy = function() {
            this._buyButtonTapped.dispose(), 
            this._buyButtonTapped = null, 
            this._iconTapped.dispose(), this._iconTapped = null
        }, 

        Object.defineProperty(c.prototype, "buyButtonTapped", {
            get: function() {
                return this._buyButtonTapped
            },
            enumerable: !0,
            configurable: !0
        }), 

        Object.defineProperty(c.prototype, "iconTapped", {
            get: function() {
                return this._iconTapped
            },
            enumerable: !0,
            configurable: !0
        }), 

        Object.defineProperty(c.prototype, "upgrade", {
            get: function() {
                return this._upgrade
            },
            enumerable: !0,
            configurable: !0
        }), c
    }(Phaser.Group);
    a.UpgradeView = b
}(game || (game = {}));