var game;
! function(a) {
    var b = function(b) {        
        
        c.prototype.onTaskBoardHide = function() {
            this.chain.length = 0, 
            this.addItems(), 
            this.hideItemsOverMonkey(), 
            this.dispatchItemsFromMonkey()
        }, 
        c.prototype.dispatchItemsFromMonkey = function() {
            var b = this;
            this.monkey.dispatchFruits(), 
            this.monkey.dispatchFruitsComplete.addOnce(this.onMonkeyDispatchComplete, this), 
            this.activeItems.forEach(function(c) {
                var d = c.x,
                    e = c.y,
                    f = a.Config.GAME_WIDTH - 150,
                    g = a.Config.GAME_HEIGHT - 65,
                    h = Phaser.Math.distance(d, e, f, g),
                    i = 400 + 150 * (c.cell.column + c.cell.row);
                c.position.set(f, g), c.visible = !1, b.game.add.tween(c).to({
                    x: d,
                    y: e
                }, h, Phaser.Easing.Cubic.Out, !0, i).onStart.addOnce(function() {
                    c.visible = !0
                })
            })
        }, 
        c.prototype.onMonkeyDispatchComplete = function() {
            this.showItemsOverMonkey(), 
            this.currentTask.timer.start(), 
            this.pointerEnabled = !0, 
            this.gui.showPauseButton()
        }, 
        c.prototype.onGameOver = function() {
            this.gameOver = !0, 
            this.disableInput(), 
            this.fadeInAllItems(), 
            this.hideAllChainLinks(), 
            this.gui.onGameOver(this.level, a.Main.stats.totalPoints), 
            this.game.sound.stopAll(), 
            this.game.sound.usingWebAudio && this.game.sound.play("game_over")
        }, 
        c.prototype.calculateAndSaveResult = function() {
            var b = 100,
                c = this.currentTask.timer.remainingSeconds * b,
                d = this.roundResult.points + c,
                e = a.Main.stats.totalPoints + d;
            a.Main.stats.updatePoints(e)
        }, 
        c.prototype.initItemsGenerator = function() {
            this.itemsGenerator = new a.ItemsGenerator(this.game, this.grid), 
            this.itemsGenerator.setAddItemCallback(this.addItem, this)
        }, 
        c.prototype.addItem = function(a) {
            var b = this.grid.getFreeCell();
            if (b) {
                var c = this.grid.position.x + b.x + .5 * b.width,
                    d = this.grid.position.y + b.y + .5 * b.height,
                    e = this.itemsPool.getItem(a);
                e.position.set(c, d), 
                e.linkCell(b), 
                e.showOnGrid(this.firstGridFill), 
                this.activeItems.push(e)
            }
        }, 
        c.prototype.addItems = function() {
            var a = this.grid.columns * this.grid.rows;
            this.itemsGenerator.generateItems(a), this.firstGridFill = !1
        }, 
        c.prototype.addGUI = function() {
            this.gui = new a.LevelGUI(this.game), 
            this.gui.pauseSignal.add(this.togglePause, this), 
            this.gui.restartSignal.add(this.restartGame, this)
        },
         c.prototype.togglePause = function(a) {
            "pause" === a ? this.pauseGame() : "resume" === a && this.resumeGame()
        },
         c.prototype.pauseGame = function() {
            this.pointerEnabled = !1, 
            this.currentTask.timer.onPause(), 
            this.gui.onPause()
        }, 
        c.prototype.resumeGame = function() {
            this.pointerEnabled = !0, 
            this.currentTask.timer.onResume(), 
            this.gui.onResume()
        }, 
        c.prototype.restartGame = function() {
            a.Main.stats.updatePoints(0), 
            this.level = 1, 
            this.setNewTask(), 
            this.removeAllItems(!0), 
            this.destoyAllPowerUps(), 
            this.addItems(), 
            this.currentTask.timer.start(), 
            this.gui.onRestart(), 
            this.pointerEnabled = !0, 
            this.gameOver = !1, 
            this.game.sound.play("main_loop", .33, !0)
        },
         c.prototype.destoyAllPowerUps = function() {
            this.starsPool.items.forEach(function(a) {
                a.returnToPool()
            }), this.powerUpsPool.items.forEach(function(a) {
                a.returnToPool()
            }), this.futurePowerUpsPool.items.forEach(function(a) {
                a.onAddToPool()
            })
        },
         c.prototype.initKeyCallbacks = function() {
            a.Main.development && (this.game.input.keyboard.addKey(Phaser.Keyboard.D).onDown.add(this.toggleDebugRender, this), 
                this.game.input.keyboard.addKey(Phaser.Keyboard.F).onDown.add(this.findPossibleMoves, this), 
                this.game.input.keyboard.addKey(Phaser.Keyboard.S).onDown.add(this.shuffleItems, this), 
                this.game.input.keyboard.addKey(Phaser.Keyboard.T).onDown.add(this.onTaskCompleteStageOne, this), 
                this.game.input.keyboard.addKey(Phaser.Keyboard.O).onDown.add(this.onGameOver, this))
        }, 
        c.prototype.findPossibleMoves = function() {
            var a = this,
                b = this.findChainStrategy.getPossibleMove();
            b && b.forEach(function(b) {
                a.game.add.tween(b.scale).to({
                    x: .66,
                    y: .66
                }, 666, Phaser.Easing.Back.Out, !0, 0, 1, !0)
            })
        }, 
        c.prototype.toggleDebugRender = function() {
            this.debugRenderFlag = !this.debugRenderFlag
        }, 
        c.prototype.onRoundEnd = function() {
            this.saveResult()
        }, 
        c.prototype.saveResult = function() {}, c.prototype.onPointerDown = function() {
            this.pointerEnabled && (this.pointerDown = !0, 
                this.chain.length = 0, 
                this.chainItemType = null, this.lastItemInChain = null)
        }, 
        c.prototype.onPointerUp = function() {
            this.pointerEnabled && (this.pointerDown = !1, 
                this.hideAllChainLinks(), this.fadeInAllItems(), 
                this.chain.length > 2 ? (this.pointerEnabled = !1, 
                    this.chainCollected = !1, this.powerUpsActivated = 0, 
                    this.powerUpsCompleted = 0, this.collectItems()) : 
                this.unhighlightChainItems())
        }, 
        c.prototype.collectItems = function() {
            var a = this.currentTask.hasItemType(this.chainItemType);
            a && this.gui.panda.openMouth(), 
            this.checkForTimeBonus(), 
            this.lastItemInChain.collectCompleteSignal.addOnce(this.onChainCollected, this), 
            this.collectItemsInChain()
        }, 
        c.prototype.collectItemsInChain = function() {
            var a = this,
                b = 0;
            this.chain.forEach(function(c) {
                a.collectItem(c), b += 50
            })
        }, 
        c.prototype.collectItem = function(a, b) {
            if ("undefined" == typeof b && (b = !1), !a.collected) {
                var c = this.currentTask.hasItemType(a.itemType);
                b || c === !1 ? a.collect() : (this.itemsLayer.bringToTop(a), 
                    a.collectToPanda(this.gui.panda.position)), a.clearCell(),
                     this.removeFromActiveItems(a), this.currentTask.onItemCollected(a), 
                     this.roundResult.points += 100
            }
        }, c.prototype.onChainCollected = function() {
            this.chainCollected = !0, 
            this.gui.panda.isMouthOpen() && this.gui.panda.chew(), 
            this.chainCollected && this.powerUpsCompleted === this.powerUpsActivated && this.onCollectComplete()
        }, 
        c.prototype.checkForTimeBonus = function() {
            if (this.chain.length >= 8) {
                var a = this.chain.length;
                this.currentTask.timer.addSeconds(a), this.bonusTimeFX.show(this.lastItemInChain.position, "+" + a.toString())
            }
        }, 
        c.prototype.onPowerUpComplete = function() {
            this.currentTask.isComplete || (this.powerUpsCompleted++, 
                this.chainCollected && this.powerUpsCompleted === this.powerUpsActivated && this.onCollectComplete())
        }, 
        c.prototype.onCollectComplete = function() {
            this.moveItems(), 
            this.refillGrid(), 
            this.currentTask.onCollectCycleComplete(), 
            this.currentTask.isComplete ? this.onTaskCompleteStageOne() : this.checkPossibleMoves()
        }, 
        c.prototype.moveItems = function() {
            this.resetDropDistances(), this.setDropDistances(), this.doMoveItems()
        }, 
        c.prototype.resetDropDistances = function() {
            this.activeItems.forEach(function(a) {
                a.dropDistance = 0
            })
        }, 
        c.prototype.setDropDistances = function() {
            for (var a = this.grid.cells.length, b = 0; a > b; b++) {
                var c = this.grid.cells[b];
                c.isFree() && this.increaseDropDistanceForColumn(c.row, c.column)
            }
        }, 
        c.prototype.increaseDropDistanceForColumn = function(b, c) {
            for (var d = b - 1; d >= 0; d--) {
                var e = this.grid.getCellAt(d, c);
                e.item && (e.item.dropDistance += a.Cell.HEIGHT)
            }
        }, 
        c.prototype.doMoveItems = function() {
            for (var a = this.grid.cells.length, b = a - 1; b >= 0; b--) {
                var c = this.grid.cells[b],
                    d = c.item;
                if (d && d.dropDistance > 0) {
                    var e = d.position.y + d.dropDistance,
                        f = this.grid.getCellUnderPoint(d.position.x, e);
                    d.linkCell(f), d.moveTo(e)
                }
            }
        }, c
    }(Phaser.State);
    a.Level = b
}(game || (game = {}));