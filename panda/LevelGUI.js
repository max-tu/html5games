var game;
! function(a) {
    var b = function(b) {
        function c(a) {
            b.call(this, a, a.world, "gui"), 
            this._restartSignal = new Phaser.Signal, 
            this._pauseSignal = new Phaser.Signal, 
            this.addPanda(), this.initFruitLabels(), 
            this.addTimer(), this.addLevelLabel(), 
            this.addPauseButton(), 
            this.addGameCompleteBoard(), 
            this.addLevelUpFX(), 
            this.addTaskBoard(), 
            this.addPauseBoard(), 
            this.addRestartOverlay()
        }
        return __extends(c, b), 
        c.prototype.addRestartOverlay = function() {
            var a = this.game.cache.getBitmapData("restart_overlay");
            this.restartOverlay = this.game.add.image(0, 0, a, null, this), 
            this.restartOverlay.exists = !1, 
            this.restartOverlay.visible = !1
        }, 
        c.prototype.showRestartOverlay = function() {
            var a = this;
            this.restartOverlay.exists = !0, 
            this.restartOverlay.visible = !0, 
            this.restartOverlay.alpha = 0, 

            this.game.add.tween(this.restartOverlay).to({
                alpha: 1
            }, 100, Phaser.Easing.Linear.None, !0)
            .onComplete.addOnce(function() {
                a.game.add.tween(a.restartOverlay).to({
                    alpha: 0
                }, 800, Phaser.Easing.Linear.None, !0, 300)
                .onComplete.addOnce(function() {
                    a.restartOverlay.exists = !1,
                     a.restartOverlay.visible = !1
                })
            })
        }, 
        c.prototype.addPanda = function() {
            this._panda = new game.Panda(this.game), this._panda.position.set(110, 144), this.game.world.addAt(this._panda, 2)
        }, 
        c.prototype.addTimer = function() {
            this.timer = new game.TaskTimerView(this.game, this), this.timer.position.set(238, 38)
        }, 
        c.prototype.addLevelLabel = function() {
            if ("en" === a.Main.language) {
                var b = this.game.add.bitmapText(0, 0, "level_label", "Level 1", 28, this);
                b.position.set(this.timer.x + this.timer.width + 6, 24), this.levelLabel = b
            } else {
                var c = {
                    font: "28px GrilledCheeseBTNToasted",
                    fill: "#FFFFFF",
                    align: "center"
                }, d = this.game.add.text(0, 28, "", c, this);
                d.anchor.set(.5, .5), 
                d.stroke = "#296B98", 
                d.setShadow(2, 2, "#296B98", 1), 
                d.strokeThickness = 5, 
                d.position.set(this.timer.x + this.timer.width + 46, 38), 
                this.levelLabel = d
            }
            this.updateLevelLabel(1)
        }, 
        c.prototype.addPauseButton = function() {
            var a = this;
            this.pauseButton = 
            new game.SimpleButton(this.game, game.Config.GAME_WIDTH - 64, this._panda.y - 68, "buttons", "Button_Pause0000"), 
            this.pauseButton.callback.add(function() {
                a._pauseSignal.dispatch("pause")
            }, this), 
            this.add(this.pauseButton)
        }, 
        c.prototype.initFruitLabels = function() {
            this._fruitsLabels = new game.FruitLabelCollection(this.game, this), 
            this._fruitsLabels.position.set(this._panda.x + 130, this._panda.y - 45)
        }, 
        c.prototype.syncWithTask = function(a, b) {
            this.timer.setTimer(a.timer), 
            this._fruitsLabels.syncWithTask(a.miniTasks), 
            this.updateLevelLabel(b)
        }, 
        c.prototype.updateLevelLabel = function(b) {
            var c = a.Main.texts.level + b.toString();
            this.levelLabel.setText(c)
        }, 
        c.prototype.addGameCompleteBoard = function() {
            this.gameOverBoard = new game.GameOverBoard(this.game, this), 
            this.gameOverBoard.position.set(game.Config.HALF_GAME_WIDTH, game.Config.HALF_GAME_HEIGHT), 
            this.gameOverBoard.playAgainSignal.add(this._restartSignal.dispatch, this._restartSignal)
        }, 
        c.prototype.gotoMainMenu = function() {
            this.game.changeState("main_menu")
        }, 
        c.prototype.addLevelUpFX = function() {
            this._levelUpFX = new game.LevelUpFX(this.game), 
            this.add(this._levelUpFX)
        }, 
        c.prototype.addTaskBoard = function() {
            this._taskBoard = new game.TaskBoard(this.game, this), 
            this.add(this._taskBoard), 
            this._taskBoard.position.set(game.Config.HALF_GAME_WIDTH, 500)
        }, 
        c.prototype.addPauseBoard = function() {
            var a = this;
            this.pauseBoard = new game.PauseBoard(this.game, this), 
            this.pauseBoard.resumeButton.callback.add(function() {
                a._pauseSignal.dispatch("resume")
            }, this)
        }, 
        c.prototype.hidePauseButton = function() {
            this.pauseButton.inputEnabled = !1, 
            this.game.add.tween(this.pauseButton).to({
                alpha: 0
            }, 200, Phaser.Easing.Linear.None, !0)
        }, 
        c.prototype.showPauseButton = function() {
            this.pauseButton.inputEnabled = !0, 

            this.game.add.tween(this.pauseButton).to({
                alpha: 1
            }, 100, Phaser.Easing.Linear.None, !0)
        }, 
        c.prototype.onPause = function() {
            this.hidePauseButton(), this.pauseBoard.show()
        },
         c.prototype.onResume = function() {
            this.showPauseButton(), this.pauseBoard.hide()
        }, 
        c.prototype.onGameOver = function(a, b) {
            this.hidePauseButton(), this.gameOverBoard.show(a, b)
        }, 
        c.prototype.onRestart = function() {
            this.showRestartOverlay(), this.showPauseButton()
        }, 
        c.prototype.destroy = function() {
            b.prototype.destroy.call(this, !0, !1), 
            this._restartSignal.dispose(), 
            this._restartSignal = null, 
            this._pauseSignal.dispose(), 
            this._pauseSignal = null
        }, 
        Object.defineProperty(c.prototype, "panda", {
            get: function() {
                return this._panda
            },
            enumerable: !0,
            configurable: !0
        }), 
        Object.defineProperty(c.prototype, "restartSignal", {
            get: function() {
                return this._restartSignal
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
        }), 
         Object.defineProperty(c.prototype, "taskBoard", {
            get: function() {
                return this._taskBoard
            },
            enumerable: !0,
            configurable: !0
        }), 
         Object.defineProperty(c.prototype, "levelUpFX", {
            get: function() {
                return this._levelUpFX
            },
            enumerable: !0,
            configurable: !0
        }), c
    }(Phaser.Group);
    a.LevelGUI = b
}(game || (game = {}));