var game;
! function(a) {
    var b = function(b) {
        function c(a) {
            b.call(this, a, a.world, "gui"), 
            this._resetSignal = new Phaser.Signal, 
            this._pauseSignal = new Phaser.Signal, 
            this.addButtons(), 
            this.addPauseBoard(), 
            this.addCoinsLabel(), 
            this.addLivesLabel(), 
            this.addTurboLabel(), 
            this.addDistanceLabel(), 
            this.addRoundCompleteBoard(), 
            this.addUpgradesBoard(), 
            this.guiItems = [this.pauseButton, this.soundButton, this.restartButton, this.coinsLabel, this.livesLabel, this.turboLabel, this.distanceLabel]
        }
        return __extends(c, b), 

        c.prototype.addButtons = function() {
            var a = this;
            this.pauseButton = new game.ToggleButton(this.game, game.Config.GAME_WIDTH - 50, 65, "main_menu", "Pause_Button0000", "Resume_Button0000"),
            this.pauseButton.callback.add(function() {
                a._pauseSignal.dispatch(2 === a.pauseButton.state ? "pause" : "resume")
            }, this), 

            this.soundButton = new game.ToggleButton(this.game, this.pauseButton.x, this.pauseButton.y + 84, "main_menu", "Music_On_Button0000", "Music_Off_Button0000"), 
            this.soundButton.callback.add(function() {
                a.game.sound.mute = !a.game.sound.mute
            }), 
            this.soundButton.exists = !1, 
            this.soundButton.visible = !1, 
            this.restartButton = new game.SimpleButton(this.game, this.pauseButton.x, this.pauseButton.y + 168, "main_menu", "Restart_Button0000"), 
            this.restartButton.callback.add(this._resetSignal.dispatch, this), 
            this.restartButton.exists = !1, 
            this.restartButton.visible = !1, 
            this.add(this.restartButton), 
            this.add(this.soundButton), 
            this.add(this.pauseButton), 
            this.buttons = [this.restartButton, this.soundButton]
        }, 
        c.prototype.addPauseBoard = function() {
            this.pauseBoard = new game.PauseBoard(this.game, this), 
            this.pauseBoard.position.set(game.Config.HALF_GAME_WIDTH, game.Config.HALF_GAME_HEIGHT)
        }, 
        c.prototype.addCoinsLabel = function() {
            this.coinsLabel = new game.Label(this.game, this, "Coin_Icon0000"), 
            this.coinsLabel.x = 115, this.coinsLabel.y = 20
        }, 
        c.prototype.addTurboLabel = function() {
            this.turboLabel = new game.Label(this.game, this, "Zip_Icon0000"), 
            this.turboLabel.x = 20, this.turboLabel.y = 70, this.setTurboLabelVisibility()
        }, 
        c.prototype.addLivesLabel = function() {
            this.livesLabel = new game.Label(this.game, this, "Heart_Icon0000"), 
            this.livesLabel.x = 20, this.livesLabel.y = 20;
            var b = a.Main.upgrades.getUpgradeByTitle(game.Upgrade.BOAT_BODY).getValue();
            this.livesLabel.updateText(b)
        }, 
        c.prototype.addDistanceLabel = function() {
            this.distanceLabel = this.game.add.bitmapText(0, 0, "digits", "0m", 30, this), 
            this.distanceLabel.x = game.Config.HALF_GAME_WIDTH, this.distanceLabel.y = 40
        }, 
        c.prototype.addRoundCompleteBoard = function() {
            this.roundCompleteBoard = new game.RoundCompleteBoard(this.game, this), 
            this.roundCompleteBoard.position.set(game.Config.HALF_GAME_WIDTH, game.Config.HALF_GAME_HEIGHT), 
            this.roundCompleteBoard.showUpgradesSignal.add(this.showUpgradesBoard, this), 
            this.roundCompleteBoard.hideCompleteSignal.add(this.continueGame, this)
        }, 
        c.prototype.addUpgradesBoard = function() {
            this.upgradesBoard = new game.UpgradesBoard(this.game, this), 
            this.upgradesBoard.position.set(game.Config.HALF_GAME_WIDTH, game.Config.HALF_GAME_HEIGHT - 40), 
            this.upgradesBoard.hideCompleteSignal.add(this.continueGame, this)
        }, 
        c.prototype.showUpgradesBoard = function() {
            this.upgradesBoard.show()
        }, 
        c.prototype.continueGame = function() {
            this._resetSignal.dispatch()
        }, c.prototype.showRoundCompleteBoard = function(a) {
            this.hideSomeGUI(), this.roundCompleteBoard.show(a)
        }, c.prototype.hideSomeGUI = function() {
            this.guiItems.forEach(function(a) {
                a.visible = !1
            })
        }, c.prototype.showSomeGUI = function() {
            this.guiItems.forEach(function(a) {
                a.visible = !0
            })
        }, c.prototype.doReset = function() {
            var b = a.Main.upgrades.getUpgradeByTitle(game.Upgrade.BOAT_BODY).getValue();
            this.livesLabel.updateText(b), 
            this.turboLabel.updateText(0), 
            this.coinsLabel.updateText(0), 
            2 === this.pauseButton.state && this.pauseButton.switchTextures(), 
            this.hideButtons(), this.showSomeGUI(), 
            this.setTurboLabelVisibility()
        }, 
        c.prototype.setTurboLabelVisibility = function() {
            this.turboLabel.exists = a.Main.upgrades.getUpgradeByTitle(a.Upgrade.TURBO).step > 0,
             this.turboLabel.visible = this.turboLabel.exists
        }, 
        c.prototype.onPause = function() {
            this.showButtons(), this.showPauseBoard()
        }, 
        c.prototype.showButtons = function() {
            this.buttons.forEach(function(a) {
                a.exists = !0, a.visible = !0, a.inputEnabled = !0, a.scale.set(0, 0)
            });
            var a = 200;
            this.game.add.tween(this.soundButton.scale).to({
                x: 1,
                y: 1
            }, a, Phaser.Easing.Back.Out, !0), 

            this.game.add.tween(this.restartButton.scale).to({
                x: 1,
                y: 1
            }, a, Phaser.Easing.Back.Out, !0, 100)
        }, 
        c.prototype.showPauseBoard = function() {
            this.pauseBoard.exists = !0, this.pauseBoard.visible = !0
        }, 
        c.prototype.onResume = function() {
            this.hideButtons(), this.hidePauseBoard()
        }, 
        c.prototype.hideButtons = function() {
            var a = this,
                b = 0;
            this.buttons.forEach(function(c) {
                a.game.add.tween(c.scale).to({
                    x: 0,
                    y: 0
                }, 200, Phaser.Easing.Back.In, !0, b).onComplete.addOnce(function() {
                    c.exists = !1, c.visible = !1
                }, a), b += 100
            })
        }, 
        c.prototype.hidePauseBoard = function() {
            this.pauseBoard.exists = !1, 
            this.pauseBoard.visible = !1
        }, 
        c.prototype.destroy = function() {
            b.prototype.destroy.call(this, !0, !1), 
            this._resetSignal.dispose(), 
            this._resetSignal = null, 
            this._pauseSignal.dispose(), 
            this._pauseSignal = null, 
            this.guiItems = null, 
            this.buttons = null
        }, 
        Object.defineProperty(c.prototype, "resetSignal", {
            get: function() {
                return this._resetSignal
            },
            enumerable: !0,
            configurable: !0
        }), 
        Object.defineProperty(c.prototype, "pauseSignal", {
            get: function() {
                return this._pauseSignal
            },
            enumerable: !0,
            configurable: !0
        }), c
    }(Phaser.Group);
    a.LevelGUI = b
}(game || (game = {}));