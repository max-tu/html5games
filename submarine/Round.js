var game;
! function(a) {
    var b = function() {
        function a() {
            this.coinsCollected = 0, 
            this.newBest = !1, 
            this.distanceInPixels = 0, 
            this._distanceInMeters = 0
        }
        return a.prototype.updatePassesDistance = function(b) {
            this.distanceInPixels += b, 
            this._distanceInMeters = Math.floor(this.distanceInPixels / a.PIXELS_IN_METER)
        }, 
        a.prototype.doReset = function() {
            this.coinsCollected = 0, 
            this.distanceInPixels = 0, 
            this._distanceInMeters = 0, 
            this.newBest = !1
        }, 
        Object.defineProperty(a.prototype, "distanceInMeters", {
            get: function() {
                return this._distanceInMeters
            },
            enumerable: !0,
            configurable: !0
        }), a.PIXELS_IN_METER = 70, a
    }();
    a.RoundResult = b
}(game || (game = {}));
/////////////////////////////////////////////////////////////////////////////////////////////////////
var game;
! function(a) {
    var b = function(b) {
        function c(a, c) {
            b.call(this, a, c, "round_complete_board"), 
            this.leftColumnX = 0, 
            this.rightColumnX = 0, 
            this.exists = !1, 
            this.visible = !1, 
            this.addBack(),
             this.addContent(), 
             this.addNewBest(), 
             this.addButtons(), 
             this.addUpgradesSign(), 
             this._hideCompleteSignal = new Phaser.Signal, 
             this._showUpgradesSignal = new Phaser.Signal
        }
        return __extends(c, b), 

        c.prototype.addBack = function() {
            this.back = this.game.add.image(0, 0, "round_complete", "Statistic_Board0000", this), 
            this.back.anchor.set(.5, .5),
             this.leftColumnX = .5 * -this.back.width + 60, 
             this.rightColumnX = this.leftColumnX + 226
        }, 

        c.prototype.addContent = function() {
            var b = -150,
                c = b + 40,
                d = c + 56,
                e = d + 40,
                f = this.addText(this.leftColumnX, b, a.Main.texts.best_distance);
            "fr" === a.Main.language ? (f.fontSize = 21, f.y += 5) : "it" === a.Main.language && (f.fontSize = 19, f.y += 6), 
            this.bestDistanceLabel = this.addText(this.rightColumnX, b, "0000"), 
            this.addText(this.leftColumnX, c, a.Main.texts.distance), 
            this.currentDistanceLabel = this.addText(this.rightColumnX, c, "0000"), 
            this.addText(this.leftColumnX, d, a.Main.texts.coins), 
            this.currentCoinsLabel = this.addText(this.rightColumnX, d, "0000"), 
            this.addText(this.leftColumnX, e, a.Main.texts.total_coins), 
            this.totalCoinsLabel = this.addText(this.rightColumnX, e, "0000")
        }, 

        c.prototype.addText = function(a, b, c) {
            var d = {
                font: "24px GrilledCheeseBTNToasted",
                fill: "#FFFFFF",
                align: "left"
            }, 
            e = new Phaser.Text(this.game, a, b, c, d);
            return e.stroke = "#2392BC", e.strokeThickness = 6, this.add(e), this.game.device.firefox && (e.position.y += 10), e
        }, 
        c.prototype.addNewBest = function() {
            this.newBest = this.game.add.image(-175, this.currentDistanceLabel.y + 50, "round_complete", "NewBest0000", this), 
            this.newBest.anchor.set(.5, .5), 
            this.newBest.exists = !1, 
            this.newBest.visible = !1
        }, 
        c.prototype.addButtons = function() {
            var b = this;
            this.continueButton = new a.SimpleButton(this.game, 0, 240, "upgrades", "Next_Button0000"), 
            this.continueButton.callback.add(function() {
                b.hide(b._hideCompleteSignal)
            }, this), 

            this.upgradeButton = new a.SimpleButton(this.game, 0, 95, "upgrade_button", "upgrade_button"), 
            this.upgradeButton.callback.add(function() {
                b.hide(b._showUpgradesSignal)
            }, this), 

            this.buttons = [this.upgradeButton, this.continueButton], 
            this.buttons.forEach(function(a) {
                b.add(a)
            }), 

            this.sendToBack(this.continueButton)
        }, 

        c.prototype.addUpgradesSign = function() {
            this.upgradesSign = new a.UpgradesSign(this.game), 
            this.upgradesSign.position.set(this.upgradeButton.x + .5 * this.upgradeButton.width - 14, this.upgradeButton.y - 30), 
            this.add(this.upgradesSign)
        }, 
        c.prototype.show = function(b) {
            this.exists = !0, 
            this.visible = !0, 
            this.roundResult = b, 
            this.bestDistanceLabel.setText(a.Main.stats.bestDistance.toString()), 
            this.currentDistanceLabel.setText(b.distanceInMeters.toString()), 
            this.currentCoinsLabel.setText(b.coinsCollected.toString()), 
            this.totalCoinsLabel.setText(a.Main.stats.coins.toString()), 
            this.playShowAnimation(), this.showButtons(600), 
            a.Main.upgrades.canSomethingBeUpgraded() && this.upgradesSign.show(1e3),
             this.showNewBest()
        }, 
        c.prototype.playShowAnimation = function() {
            var b = 600;
            this.position.y = .5 * -this.back.height - 100, 
            this.game.add.tween(this.position).to({
                y: a.Config.HALF_GAME_HEIGHT - 40
            }, b, Phaser.Easing.Back.Out, !0)
        }, 
        c.prototype.showButtons = function(a) {
            this.continueButton.position.set(0, 240), 
            this.continueButton.scale.set(0, 0),
             this.game.add.tween(this.continueButton.scale).to({
                x: 1,
                y: 1
            }, 400, Phaser.Easing.Back.Out, !0, a)
        }, 

        c.prototype.showNewBest = function() {
            this.roundResult.newBest ? 
            (this.newBest.exists = !0, this.newBest.scale.set(0, 0), 
                this.game.add.tween(this.newBest.scale).to({
                x: 1,
                y: 1
            }, 250, Phaser.Easing.Back.Out, !0, 700))
             : (this.newBest.exists = !1, this.newBest.visible = !1)
        }, 
        c.prototype.hide = function(b) {
            var c = this;
            this.game.add.tween(this.continueButton.position).to({
                y: 100
            }, 300, Phaser.Easing.Back.In, !0),

            this.game.add.tween(this.position).to({
                y: a.Config.GAME_HEIGHT + 100
            }, 500, Phaser.Easing.Back.In, !0, 400).onComplete.addOnce(function() {
                c.onHideComplete(b)
            }, this)
        }, 
        c.prototype.onHideComplete = function(a) {
            this.exists = !1, this.visible = !1, a.dispatch()
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
        }), 

        Object.defineProperty(c.prototype, "showUpgradesSignal", {
            get: function() {
                return this._showUpgradesSignal
            },
            enumerable: !0,
            configurable: !0
        }), c
    }(Phaser.Group);
    a.RoundCompleteBoard = b
}(game || (game = {}));