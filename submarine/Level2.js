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
        
        c.prototype.toggleDebugRender = function() {
            this.debugRenderFlag = !this.debugRenderFlag, 

            this.rocks.items.forEach(this.debugRenderFlag ? function(a) {
                a.startDebugRender()
            } : function(a) {
                a.stopDebugRender()
            })
        }, 
        c.prototype.onRoundEnd = function() {
            this.pauseFlag = !0, this.saveResult(), this.gui.showRoundCompleteBoard(this.roundResult)
        }, 
        c.prototype.pauseGame = function() {
            a.Main.wasPaused = !0, a.Main.wasMuted = this.game.sound.mute, this.game.sound.mute = !0
        }, 
        c.prototype.resumeGame = function() {
            a.Main.wasPaused && (a.Main.wasPaused = !1, this.game.sound.mute = a.Main.wasMuted)
        }, 
        c.prototype.saveResult = function() {
            var b = a.Main.stats.coins + this.roundResult.coinsCollected;
            a.Main.stats.updateCoins(b), 
            this.roundResult.distanceInMeters > a.Main.stats.bestDistance && 
            (this.roundResult.newBest = !0, a.Main.stats.updateBestDistance(this.roundResult.distanceInMeters))
        }, 
        c.prototype.update = function() {
            if (this.pauseFlag === !1) {
                this.logicUpdateTimer -= this.game.time.elapsed, 
                this.logicUpdateTimer < 0 && (this.logicUpdateTimer += 50, this.updateCoins(), 
                    this.updateBonus(), this.updateRocks(), this.updateRockets());
                var a = this.submarine.velocityX * this.time.elapsed;
                this.bg.scroll(a), 
                this.objectsLayer.position.x -= a, 
                this.generator.update(a), 
                this.bonusGenerator.update(a), 
                this.rocketGenerator.update(a), this.shaker.update(), 
                this.roundResult.updatePassesDistance(a), 
                this.gui.distanceLabel.setText(this.roundResult.distanceInMeters.toString() + "m")
            }
        }, 
        c.prototype.updateCoins = function() {
            for (var b = this.submarine.radius + a.Coin.SMALL_COIN_RADIUS, 
                c = b * b, d = a.Submarine.INITIAL_X + a.Submarine.RADIUS + a.Coin.SMALL_COIN_RADIUS, 
                e = this.submarine.coinsMagnet.radius, 
                f = e * e, 
                g = a.Submarine.INITIAL_X + this.submarine.coinsMagnet.radius + a.Coin.SMALL_COIN_RADIUS, 
                h = this.coinsPool.items.length, i = 0; h > i; i++) {
                var j = this.coinsPool.items[i];
                if (j.exists) {
                    if (j.screenX < -a.Coin.SMALL_COIN_RADIUS) {
                        this.coinsPool.returnItem(j);
                        continue
                    }
                    if (j.screenX < d) {
                        var k = utils.MathUtil.distanceSquared(this.submarine.x, this.submarine.y, j.screenX, j.y);
                        if (c > k) {
                            this.onCoinCollected(j);
                            continue
                        }
                    }
                    if (this.submarine.magnetActive && !j.attractedByMagnet && j.screenX < g) {
                        var k = utils.MathUtil.distanceSquared(this.submarine.x, this.submarine.y, j.screenX, j.y);
                        f > k && j.applyMagnet()
                    }
                }
            }
        }, 
        c.prototype.onCoinCollected = function(a) {
            var b = 1;
            this.submarine.doubleCoinsActive && (b *= 2), 
            this.showSparkles(a), 
            this.coinsPool.returnItem(a), 
            this.roundResult.coinsCollected += b, 
            this.gui.coinsLabel.updateText(this.roundResult.coinsCollected), 
            this.coinSound && this.coinSound.play("", 0, .33, !1, !0)
        }, 
        c.prototype.showSparkles = function(b) {
            if (!a.Main.weakDevice) {
                var c = this.coinSparkles.getItem();
                c && (c.x = b.x - 25, c.y = b.y - 50)
            }
        }, 
        c.prototype.updateBonus = function() {
            if (this.bonus && this.submarine.alive) {
                if (this.bonus.screenX < .5 * -this.bonus.width) 
                    return this.bonusesPool.returnItem(this.bonus), 
                void(this.bonus = null);
                this.bonus.screenX < .33 * a.Config.GAME_WIDTH && this.checkBonusCollision()
            }
        }, 
        c.prototype.checkBonusCollision = function() {
            var a = this.bonus.radius + this.submarine.radius,
                b = a * a,
                c = utils.MathUtil.distanceSquared(this.submarine.position.x, 
                    this.submarine.position.y, this.bonus.screenX, this.bonus.y);
            b > c && (this.applyBonus(this.bonus.bonusType), 
                this.bonusesPool.returnItem(this.bonus), this.bonus = null)
        }, 
        c.prototype.applyBonus = function(a) {
            this.sound.usingWebAudio && this.sound.play("bonus", .66), 0 === a ? (this.submarine.increaseLife(), 
                this.gui.livesLabel.updateText(this.submarine.currentLives)) : 
            1 === a ? this.submarine.applyShield() : 4 === a ? 
            this.turboMode.addTurboCharge() : 3 === a ? this.submarine.applyMagnet() : 2 === a && this.submarine.applyDoubleCoins()
        }, 
        c.prototype.updateRocks = function() {
            this.removeRocks(), this.checkSubmarineRocksCollision()
        },
         c.prototype.removeRocks = function() {
            for (var a = this.rocks.items.length, b = 0; a > b; b++) {
                var c = this.rocks.items[b];
                c.exists && c.screenX < -100 && this.rocks.returnItem(c)
            }
        }, 
        c.prototype.checkSubmarineRocksCollision = function() {
            if (!(this.submarine.invulnerable || this.submarine.shieldActive || this.submarine.turboActive))
                for (var b = this.rocks.items.length, c = 0; b > c; c++) {
                    var d = this.rocks.items[c];
                    if (d.exists && d.screenX < .33 * a.Config.GAME_WIDTH && this.isSubmarineRockCollide(this.submarine, d)) 
                        return void this.submarine.hurt()
                }
        }, 
        c.prototype.isSubmarineRockCollide = function(a, b) {
            var c = a.x - b.screenX,
                d = a.y - b.y,
                e = b.ellipseWidth + a.radius,
                f = b.ellipseHeight + a.radius;
            return 1 >= c * c / (e * e) + d * d / (f * f)
        }, 
        c.prototype.updateRockets = function() {
            this.removeRockets(), this.checkRocketsSubmarineCollision()
        }, 
        c.prototype.removeRockets = function() {
            for (var a = this.rockets.items.length, b = 0; a > b; b++) {
                var c = this.rockets.items[b];
                c.launched && c.screenX < -50 && this.rockets.returnItem(c)
            }
        }, 
        c.prototype.checkRocketsSubmarineCollision = function() {
            if (!this.submarine.invulnerable && !this.submarine.shieldActive)
                for (var b = this.rockets.items.length, c = 0; b > c; c++) {
                    var d = this.rockets.items[c];
                    if (d.launched && d.screenX < .33 * a.Config.GAME_WIDTH) {
                        var e = utils.MathUtil.distanceSquared(this.submarine.x, this.submarine.y, d.screenX, d.y);
                        if (e < a.Rocket.COLLIDE_DISTANCE_SQAURED) return this.submarine.hurt(), void this.rockets.returnItem(d)
                    }
                }
        }, c.prototype.reset = function() {
            this.resetables.forEach(function(a) {
                a.doReset()
            }), this.logicUpdateTimer = 0, this.pauseFlag = !1, this.togglePause("resume")
        }, 
        c.prototype.render = function() {
            this.debugRenderFlag === !0 && (this.submarine.debugRender(), this.renderObjects())
        }, 
        c.prototype.renderObjects = function() {
            this.objectsLayer.forEach(function(a) {
                a.alive && a.debugRender && a.debugRender()
            }, this)
        }, 
        c.prototype.destroy = function() {
            this.game.state.onShutDownCallback = null, 
            this.removeKeyCallbacks(), 
            this.bonusGenerator.destroy(), 
            this.bonusGenerator = null, 
            this.generator.destroy(), 
            this.generator = null, 
            this.shaker.destroy(), 
            this.shaker = null
        }, 
        c.prototype.removeKeyCallbacks = function() {
            this.game.input.keyboard.removeKey(Phaser.Keyboard.R),
            this.game.input.keyboard.removeKey(Phaser.Keyboard.P), 
            this.game.input.keyboard.removeKey(Phaser.Keyboard.ESC), 
            this.game.input.keyboard.removeKey(Phaser.Keyboard.D)
        }, 
        c.TOP_LEVEL_BOUND = 70, 
        c.BOTTOM_LEVEL_BOUND = a.Config.GAME_HEIGHT - c.TOP_LEVEL_BOUND, c
    }(Phaser.State);
    a.Level = b
}(game || (game = {}));