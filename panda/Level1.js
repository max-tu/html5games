var game;
! function(a) {
    var b = function(b) {
        function c() {
            b.apply(this, arguments), 
            this.chainItemType = null, 
            this.lastItemInChain = null, 
            this.pointerDown = !1, 
            this.pointerEnabled = !0, 
            this.debugRenderFlag = !1
        }
        return __extends(c, b), 
        c.prototype.init = function() {
            this.pointerEnabled = !0, 
            this.pointerDown = !1, 
            this.chain = [], 
            this.chainItemType = null, 
            this.lastItemInChain = null, 
            this.activeItems = [], 
            this.chainLinks = [], 
            this.chainLinkPos = new Phaser.Point, 
            this.shuffleDuration = 200, 
            this.firstGridFill = !0, 
            this.level = 1, 
            this.chainCollected = !1, 
            this.powerUpsActivated = 0, 
            this.powerUpsCompleted = 0, 
            this.gameOver = !1
        }, 
        c.prototype.create = function() {
            this.game.state.onShutDownCallback = this.destroy, 
            this.initRoundResult(), 
            this.addLayers(), 
            this.itemsPool = new a.ItemsPool(this.game, this.itemsLayer), 
            this.findChainStrategy = new a.FindChainStrategy(this.game, this.grid, this.activeItems), 
            this.initChainLinks(), 
            this.initItemsGenerator(), 
            this.taskGenerator = new a.TaskGenerator(this.game), 
            this.addGUI(), this.setNewTask(), 
            this.addItems(), 
            this.initStarsPool(), 
            this.initPowerUpsPool(), 
            this.initPowerUpFxsPool(), 
            this.initFuturePowerUpsPool(), 
            this.addBonusTimeFX(), 
            this.addMonkey(), 
            this.initKeyCallbacks(), 
            this.game.input.onDown.add(this.onPointerDown, this), 
            this.game.input.onUp.add(this.onPointerUp, this), 
            a.Main.weakDevice ? (this.addTutorHand(), 
                this.currentTask.timer.start()) : 
            (this.pointerEnabled = !1, 
                this.hideItemsOverMonkey(), 
                this.activeItems.forEach(function(a) {
                a.visible = !1
            }), 
            this.game.time.events.add(600, this.dispatchItemsFromMonkey, this), 
            this.game.time.events.add(2600, this.addTutorHand, this))
        }, 
        c.prototype.addTutorHand = function() {
            this.tutorHand = new a.TutorHand(this.game, 295, 410), 
            this.itemsLayer.add(this.tutorHand)
        }, 
        c.prototype.initStarsPool = function() {
            for (var b = [], c = 3, d = 0; c > d; d++) {
                var e = new a.StarPowerUp(this.game);
                this.topLayer.add(e), b.push(e)
            }
            this.starsPool = new utils.ObjectPool(b)
        }, 
        c.prototype.initPowerUpsPool = function() {
            for (var b = [], c = 8, d = 0; c > d; d++) {
                var e = new a.PowerUp(this.game);
                this.itemsLayer.add(e), b.push(e)
            }
            this.powerUpsPool = new utils.ObjectPool(b)
        }, 
        c.prototype.initPowerUpFxsPool = function() {
            for (var b = [], c = 8, d = 0; c > d; d++) {
                var e = 4 > d ? new a.VerticalPowerUpFX(this.game, this.topLayer) : 
                new a.HorizontalPowerUpFX(this.game, this.topLayer);

                this.topLayer.add(e), b.push(e)
            }
            this.powerUpFxsPool = new utils.ObjectPool(b)
        }, 
        c.prototype.initFuturePowerUpsPool = function() {
            for (var b = [], c = 4, d = 0; c > d; d++) {
                var e = new a.FuturePowerUp(this.game);
                this.itemsLayer.addAt(e, 0), 
                b.push(e)
            }
            this.futurePowerUpsPool = new utils.ObjectPool(b)
        }, 
        c.prototype.initRoundResult = function() {
            this.roundResult = new a.RoundResult, 
            this.roundResult.level = this.level
        }, 
        c.prototype.addLayers = function() {
            this.addBackground(), 
            this.addGrid(), 
            this.itemsLayer = this.game.add.spriteBatch(this.world, "objects_layer"), 
            this.topLayer = this.game.add.group(this.world, "above_items"), 
            this.addLeafs()
        }, 
        c.prototype.addBackground = function() {
            var b = this.game.add.image(0, 0, "graphics_1", "BG_Sky0000", this.world);
            b.anchor.set(.5, .5), 
            b.x = a.Config.HALF_GAME_WIDTH, 
            b.y = a.Config.HALF_GAME_HEIGHT - 1
        }, 
        c.prototype.addGrid = function() {
            this.grid = new a.Grid(this.game, this.world), 
            this.grid.cacheAsBitmap = !0, 
            this.grid.position.set(.5 * (a.Config.GAME_WIDTH - this.grid.getWidth()), 
                .5 * (a.Config.GAME_HEIGHT - this.grid.getHeight()) + 64)
        }, 
        c.prototype.addLeafs = function() {
            var b = (this.game.add.image(566, 682, "leafs", "BottomRight_Leafs0000", this.topLayer), 
                this.game.add.image(a.Config.HALF_GAME_WIDTH, a.Config.GAME_HEIGHT - 30, "leafs", "Bottom_Leafs0000", this.topLayer), 
                this.game.add.image(-45, 708, "leafs", "BottomLeft_Leafs0000", this.topLayer), 
                this.game.add.image(460, -45, "leafs", "TopRight_Leafs0000", this.topLayer), 
                this.game.add.image(-50, -40, "leafs", "TopLeft_Leafs0000", this.topLayer));
            this.world.addAt(b, 1)
        }, 
        c.prototype.addBonusTimeFX = function() {
            this.bonusTimeFX = new a.BonusTimeFX(this.game, this.topLayer), 
            this.bonusTimeFX.position.set(a.Config.HALF_GAME_WIDTH, a.Config.HALF_GAME_HEIGHT)
        }, 
        c.prototype.addMonkey = function() {
            this.monkey = new a.Monkey(this.game, this.topLayer), 
            this.monkey.position.set(a.Config.GAME_WIDTH - 146, a.Config.GAME_HEIGHT - 96), 
            this.world.addAt(this.monkey, 4)
        }, 
        c.prototype.initChainLinks = function() {
            var b = 20;
            this.chainLinks = [];
            for (var c = 0; b > c; c++) {
                var d = new a.ChainLink(this.game);
                this.itemsLayer.add(d), this.chainLinks.push(d)
            }
        }, 
        c.prototype.setNewTask = function() {
            this.currentTask && (this.currentTask.destroy(), this.currentTask = null), 
            this.currentTask = this.taskGenerator.generateTask(this.level), 
            this.currentTask.timer.completeSignal.addOnce(this.onGameOver, this), 
            this.gui.syncWithTask(this.currentTask, this.level), 
            this.itemsGenerator.setAllowedItemTypes(this.currentTask.allowedItemTypes)
        }, 
        c.prototype.onTaskCompleteStageOne = function() {
            this.gameOver || (this.currentTask.timer.onPause(), 
                this.disableInput(), this.gui.hidePauseButton(), 
                this.gui.levelUpFX.hideCompleteSignal.addOnce(this.onTaskCompleteStageTwo, this), 
                this.gui.levelUpFX.show())
        }, 
        c.prototype.disableInput = function() {
            this.pointerEnabled = !1, this.pointerDown = !1
        }, 
        c.prototype.activateAllPowerUps = function() {
            this.powerUpsPool.items.forEach(function(a) {
                a.alive && a.activate()
            })
        }, 
        c.prototype.onTaskCompleteStageTwo = function() {
            var a = this.powerUpsPool.items.some(function(a) {
                return a.alive
            });
            a ? (this.activateAllPowerUps(), 
                this.game.time.events.add(1200, this.collectFruitsToBasket, this), 
                this.game.time.events.add(3300, this.onTaskCompleteStageThree, this)) : 
            (this.collectFruitsToBasket(), 
                this.game.time.events.add(2300, this.onTaskCompleteStageThree, this))
        }, 
        c.prototype.collectFruitsToBasket = function() {
            var b = a.Config.GAME_WIDTH - 150,
                c = a.Config.GAME_HEIGHT - 60;
            this.hideItemsOverMonkey(), 
            this.monkey.collectFruits(), 
            this.activeItems.forEach(function(a) {
                a.collectToBasket(b, c)
            }), 
            this.activeItems.length = 0
        }, 
        c.prototype.removeAllItems = function(a) {
            this.activeItems.forEach(function(b) {
                b.removeFromGrid(a)
            }), this.activeItems.length = 0
        }, 
        c.prototype.getItemsOverMonkey = function() {
            var a = [];
            return a.push(this.grid.getCellAt(6, 5)), 
            a.push(this.grid.getCellAt(6, 6)), 
            a.push(this.grid.getCellAt(7, 4)), 
            a.push(this.grid.getCellAt(7, 5)), 
            a.push(this.grid.getCellAt(7, 6)), a
        }, 
        c.prototype.hideItemsOverMonkey = function() {
            var a = this.getItemsOverMonkey();
            a.forEach(function(a) {
                a && a.item && a.item.alive && (a.item.alpha = 0)
            })
        }, 
        c.prototype.showItemsOverMonkey = function() {
            var a = this,
                b = this.getItemsOverMonkey();
            b.forEach(function(b) {
                b && b.item && b.item.alive && a.game.add.tween(b.item).to({
                    alpha: 1
                }, 150, Phaser.Easing.Linear.None, !0)
            })
        },
        c.prototype.onTaskCompleteStageThree = function() {
            this.calculateAndSaveResult(), 
            this.roundResult.doReset(), 
            this.level++, 
            this.setNewTask(), 
            this.gui.taskBoard.hideCompleteSignal.addOnce(this.onTaskBoardHide, this), 
            this.gui.taskBoard.show(this.currentTask, this.level)
        } 

    }(Phaser.State);
    a.Level = b
}(game || (game = {}));