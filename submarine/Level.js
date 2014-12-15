var game;
! function(a) {
    var b = function(b) {
        function c() {
            b.apply(this, arguments), this.logicUpdateTimer = 0, this.pauseFlag = !1, this.debugRenderFlag = !1
        }
        return __extends(c, b),
         c.prototype.create = function() {
            this.game.paused = !0, 
            this.roundResult = new a.RoundResult, 
            this.addLayers(), 
            this.addSubmarine(), 
            a.Main.weakDevice === !1 && this.initCoinSparkles(), 
            this.initLevelGenerator(), 
            this.initBonuses(),
             this.initRockets(), 
             this.shaker = new a.ShakeEffect(this.game), 
             this.addTutorial(), 
             this.addGUI(), 
             this.initTurboMode(), 
             this.initResetables(), 
             this.initPauseables(), 
             this.initKeyCallbacks(), 
             this.initCoinSound(), 
             this.game.paused = !1
        }, 
        c.prototype.initCoinSound = function() {
            this.game.device.webAudio && (this.coinSound = this.game.add.sound("coin", .33))
        }, 
        c.prototype.initTurboMode = function() {
            this.turboMode = new a.TurboMode(this.game, this.gui.turboLabel), 
            this.turboMode.addTurboObject(this.submarine), 
            this.turboMode.addTurboObject(this.generator), 
            this.turboMode.addTurboObject(this.rocketGenerator), 
            this.turboMode.addTurboObject(this.turboScreen)
        }, 
        c.prototype.initResetables = function() {
            this.resetables = [this.coinsPool, this.bonusesPool, this.rockets, this.rocks, this.submarine, 
            this.generator, this.bonusGenerator, this.rocketGenerator, this.turboMode, this.roundResult, this.gui], 
            this.coinSparkles && this.resetables.push(this.coinSparkles)
        }, 
        c.prototype.initPauseables = function() {
            var a = this;
            this.pauseables = [this.submarine, this.gui], 
            this.rockets.items.forEach(function(b) {
                a.pauseables.push(b)
            }), this.bonusesPool.items.forEach(function(b) {
                a.pauseables.push(b)
            })
        }, 
        c.prototype.addLayers = function()
            this.bg = new a.Background(this.game, this.world), 
            this.turboScreen = new a.TurboScreen(this.game, this.world), 
            this.objectsLayer = this.game.add.spriteBatch(this.world, "objects_layer")
        }, 
        c.prototype.initCoinSparkles = function() {
            this.coinSparkles = new utils.ObjectPool;
            for (var b = 10, c = [], d = 0; b > d; d++) {
                var e = new a.CoinSparkles(this.game, this.coinSparkles);
                c.push(e), this.objectsLayer.add(e)
            }
            this.coinSparkles.setItems(c)
        }, 
        c.prototype.initRockets = function() {
            this.rockets = new a.RocketsPool(this.createRockets(3)), 
            this.rocketGenerator = new a.RocketGenerator(this.game, this.objectsLayer), 
            this.rocketGenerator.launchRocketSignal.add(this.addRocket, this)
        }, 
        c.prototype.addRocket = function(b, c) {
            var d = this.rockets.getItem();
            d.x = Math.abs(this.objectsLayer.x) + a.Config.GAME_WIDTH + 100, 
            d.y = b, d.prepareToLaunch(c)
        }, 
        c.prototype.createRockets = function(b) {
            for (var c = [], d = 0; b > d; d++) {
                var e = new a.Rocket(this.game);
                this.objectsLayer.add(e), c.push(e)
            }
            return c
        }, 
        c.prototype.initBonuses = function() {
            this.bonusesPool = new a.BonusesPool(this.game, this.objectsLayer), 
            this.bonusGenerator = new a.BonusGenerator(this.game, this.objectsLayer, this.submarine),
             this.bonusGenerator.addBonusSignal.add(this.addBonus, this)
        }, 
        c.prototype.addBonus = function(a, b) {
            this.bonus = this.bonusesPool.getItem(a), 
            this.bonus && (this.bonus.x = b.x, this.bonus.y = b.y, this.bonus.initialY = this.bonus.y)
        }, 
        c.prototype.initLevelGenerator = function() {
            this.coinsPool = new utils.ObjectPool(this.createCoins(62)), 
            this.rocks = new a.RocksPool(this.game, this.objectsLayer), 
            this.generator = new a.LevelGenerator(this.game, this.objectsLayer), 
            this.generator.setAddItemCallback(this.addItem, this)
        }, 
        c.prototype.createCoins = function(b) {
            "undefined" == typeof b && (b = 60);
            for (var c = [], d = 0; b > d; d++) {
                var e = new a.Coin(this.game, 0, 0, this.submarine);
                this.objectsLayer.add(e), c[d] = e
            }
            return c
        }, 
        c.prototype.addItem = function(a, b, c) {
            switch (a) {
                case "coin":
                    this.addCoin(b, c);
                    break;
                case "rock":
                    this.addRock(b, c)
            }
        }, 
        c.prototype.addCoin = function(a, b) {
            var c = this.coinsPool.getItem();
            c.x = b.x, c.y = b.y
        }, 
        c.prototype.addRock = function(a, b) {
            var c = a.width,
                d = a.height,
                e = a.type + "0000",
                f = this.rocks.getItem(e);
            f.setShapeParams(.5 * c, .5 * d), 
            f.x = b.x, f.y = b.y
        }, 
        c.prototype.addSubmarine = function() {
            this.submarine = new a.Submarine(this.game), 
            this.submarine.x = a.Submarine.INITIAL_X, 
            this.submarine.y = a.Config.HALF_GAME_HEIGHT - 100,
             this.submarine.hurtSignal.add(this.onSubmarineHurt, this), 
             this.world.add(this.submarine)
        }, 
        c.prototype.onSubmarineHurt = function() {
            this.sound.usingWebAudio && this.sound.play("explosion"), 
            0 === this.submarine.currentLives && this.game.time.events.add(2500, this.onRoundEnd, this), 
            this.shaker.shake(), this.gui.livesLabel.updateText(this.submarine.currentLives)
        }, 
        c.prototype.addTutorial = function() {
            var b = new a.TutorialText(this.game);
            b.position.set(a.Config.HALF_GAME_WIDTH, a.Config.GAME_HEIGHT - 100), this.world.add(b)
        }, 
        c.prototype.addGUI = function() {
            this.gui = new a.LevelGUI(this.game), 
            this.gui.resetSignal.add(this.reset, this), this.gui.pauseSignal.add(this.togglePause, this)
        }, 
        c.prototype.togglePause = function(a) {
            "pause" === a ? (this.pauseFlag = !0, this.pauseables.forEach(function(a) {
                a.onPause()
            }), 
            this.game.time.events.pause(), this.game.sound.pauseAll()) : 
            (this.pauseFlag = !1, this.pauseables.forEach(function(a) {
                a.onResume()
            }), this.game.time.events.resume(),  this.game.sound.resumeAll())
        }, 
        c.prototype.initKeyCallbacks = function() {
            var b = this;
            this.game.input.keyboard.addKey(Phaser.Keyboard.R).onDown.add(this.reset, this), 
            a.Main.development && (this.game.input.keyboard.addKey(Phaser.Keyboard.D).onDown.add(this.toggleDebugRender, this), 
                this.game.input.keyboard.addKey(Phaser.Keyboard.A).onDown.add(this.showCompleteBoard, this), 
                this.game.input.keyboard.addKey(Phaser.Keyboard.Q).onDown.add(this.shaker.shake, this.shaker), 
                this.game.input.keyboard.addKey(Phaser.Keyboard.S).onDown.add(function() {
                b.applyBonus(1)
            }, this),
             this.game.input.keyboard.addKey(Phaser.Keyboard.C).onDown.add(function() {
                b.applyBonus(3)
            }, this), 
            this.game.input.keyboard.addKey(Phaser.Keyboard.T).onDown.add(this.turboMode.activate, this.turboMode), 
            
            this.game.input.keyboard.addKey(Phaser.Keyboard.W).onDown.add(this.applyDoubleCoins, this), 
            
            this.game.input.keyboard.addKey(Phaser.Keyboard.ONE).onDown.add(function() {
                b.doUpgrade(a.Upgrade.BOAT_BODY)
            }, this),
            
            this.game.input.keyboard.addKey(Phaser.Keyboard.TWO).onDown.add(function() {
                b.doUpgrade(a.Upgrade.SHIELD)
            }, this),
            
            this.game.input.keyboard.addKey(Phaser.Keyboard.THREE).onDown.add(function() {
                b.doUpgrade(a.Upgrade.COINS_MAGNET)
            }, this), 

             this.game.input.keyboard.addKey(Phaser.Keyboard.FOUR).onDown.add(function() {
                b.doUpgrade(a.Upgrade.TURBO)
            }, this))
        }, 
        c.prototype.applyDoubleCoins = function() {
            this.submarine.applyDoubleCoins()
        }, 
        c.prototype.showCompleteBoard = function() {
            var b = new a.RoundResult;
            b.coinsCollected = this.game.rnd.integerInRange(100, 1e3), 
            b.updatePassesDistance(this.game.rnd.integerInRange(15e3, 3e4)), 
            b.newBest = !0, this.gui.showRoundCompleteBoard(b)
        }, 
        c.prototype.doUpgrade = function(b) {
            var c = a.Main.upgrades.getUpgradeByTitle(b);
            c && (c.step++, 3 === c.step && (c.step = 0)), this.reset()
        }, 
        c.prototype.toggleDebugRender = function() {
            this.debugRenderFlag = !this.debugRenderFlag, 

            this.rocks.items.forEach(this.debugRenderFlag ? function(a) {
                a.startDebugRender()
            } : function(a) {
                a.stopDebugRender()
            })
        }, 
         
         
        c.TOP_LEVEL_BOUND = 70, 
        c.BOTTOM_LEVEL_BOUND = a.Config.GAME_HEIGHT - c.TOP_LEVEL_BOUND, c
    }(Phaser.State);
    a.Level = b
}(game || (game = {}));