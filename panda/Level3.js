var game;
! function(a) {
    var b = function(b) {
        function c() {
            b.apply(this, arguments),            
        }
        return __extends(c, b), 
        
        
        c.prototype.refillGrid = function() {
            var a = this.grid.getFreeCellsNum();
            this.itemsGenerator.generateItems(a)
        }, 
        c.prototype.checkPossibleMoves = function() {
            var a = this.findChainStrategy.getPossibleMove();
            a ? this.pointerEnabled = !0 : (this.shuffleItems(), 
                this.game.time.events.add(this.shuffleDuration + 50, this.checkPossibleMoves, this))
        }, 
        c.prototype.shuffleItems = function() {
            this.removeRandomItems(), 
            this.game.time.events.add(this.shuffleDuration, this.refillGrid, this)
        }, 
        c.prototype.removeRandomItems = function() {
            for (var a = Math.floor(this.activeItems.length / 3), b = 0; a > b; b++) {
                var c = this.game.rnd.pick(this.activeItems);
                c.removeFromGrid(!1), this.removeFromActiveItems(c)
            }
        }, 
        c.prototype.unhighlightChainItems = function() {
            for (var a = this.chain.length, b = 0; a > b; b++) this.chain[b].unhighlight()
        }, 
        c.prototype.removeFromActiveItems = function(a) {
            var b = this.activeItems.indexOf(a);
            b > -1 && this.activeItems.splice(b, 1)
        }, 
        c.prototype.update = function() {
            this.selectItems()
        }, 
        c.prototype.selectItems = function() {
            if (this.pointerDown) {
                var a = this.getItemUnderPoint(this.game.input.activePointer.worldX, this.game.input.activePointer.worldY);
                if (a) {
                    var b = null === this.chainItemType || this.chainItemType === a.itemType,
                        c = -1 === this.chain.indexOf(a),
                        d = this.lastItemInChain ? this.isDistanceFits(this.lastItemInChain, a) : !0;
                    if (b && c === !1) {
                        var e = this.chain.indexOf(a);
                        if (e === this.chain.length - 2) 
                            return this.lastItemInChain.unhighlight(), 
                        this.chain.splice(e + 1, 1), 
                        this.lastItemInChain = a, 
                        void this.hideLastUsedChainLink()
                    }
                    b && c && d && (this.addItemToChain(a), this.chain.length > 1 && this.showNewChainLink())
                }
            }
        }, 
        c.prototype.addItemToChain = function(a) {
            this.tutorHand && (this.tutorHand.hideAndDestroy(), 
                this.tutorHand = null), 
            this.game.sound.usingWebAudio && this.game.sound.play("select_fruit", .2), 
            a.highlight(), this.chain.push(a), this.lastItemInChain = a;
            var b = this.chain.length;
            1 === b && (this.chainItemType = a.itemType, this.fadeOutSomeItems(this.chainItemType)), 
            b > 0 && b % 6 === 0 && this.addFuturePowerUp(a)
        }, 
        c.prototype.fadeOutSomeItems = function(a) {
            this.activeItems.forEach(function(b) {
                b.itemType !== a && (b.alpha = .33)
            })
        }, 
        c.prototype.fadeInAllItems = function() {
            this.activeItems.forEach(function(a) {
                a.alpha = 1
            })
        }, 
        c.prototype.addFuturePowerUp = function(a) {
            var b = this.futurePowerUpsPool.getItem();
            b && (b.x = a.x, b.y = a.y, b.activateSignal.addOnce(this.onFuturePowerupActivated, this), 
                a.setFuturePowerUp(b), a.hasPowerUp() && (b.visible = !1))
        }, 
        c.prototype.onFuturePowerupActivated = function(a) {
            var b = this.starsPool.getItem();
            b && (b.position.set(a.x, a.y), 
                b.requestItemSignal.addOnce(this.onStarRequest, this), 
                b.show(), 
                this.game.sound.usingWebAudio && this.game.sound.play("star_appear", .2))
        }, 
        c.prototype.onStarRequest = function(a) {
            var b = this.findItemForPowerUp();
            b ? (a.moveCompleteSignal.addOnce(this.addPowerUp, this), 
                a.moveToItem(b.x, b.y)) : a.returnToPool()
        }, 
        c.prototype.findItemForPowerUp = function() {
            for (var a = 0; a++ <= 100;) {
                var b = this.game.rnd.pick(this.activeItems);
                if (b.hasPowerUp() === !1) return b
            }
            return null
        }, 
        c.prototype.addPowerUp = function(a) {
            var b = this.getItemUnderPoint(a.x, a.y);
            if (b && b.hasPowerUp() === !1) {
                var c = this.powerUpsPool.getItem();
                c && (c.activateSignal.addOnce(this.applyPowerUp, this), 
                    c.init(b), 
                    b.setPowerUp(c))
            }
        }, 
        c.prototype.applyPowerUp = function(a) {
            var b = this,
                c = this.getItemsAffectedByPowerUp(a);
            c.forEach(function(c) {
                var d = Phaser.Math.distance(a.x, a.y, c.x, c.y),
                    e = .7 * d;
                b.game.time.events.add(e, function() {
                    b.collectItem(c, !0)
                }, b)
            }), this.showPowerUpFX(a.x, a.y, a.angle), t
            his.game.sound.usingWebAudio && this.game.sound.play("powerup", .4)
        }, 
        c.prototype.getItemsAffectedByPowerUp = function(a) {
            var b = a.linkedItem,
                c = b.cell,
                d = 0 === a.angle ? this.getItemsInRow(c.row) : this.getItemsInColumn(c.column);
            return d
        }, 
        c.prototype.showPowerUpFX = function(a, b, c) {
            var d = this.getPowerUpFx(c);
            d && (d.completeSignal.addOnce(this.onPowerUpComplete, this), d.launch(a, b), this.powerUpsActivated++)
        }, 
        c.prototype.getPowerUpFx = function(a) {
            var b = 0 === a ? this.powerUpFxsPool.getItemByProperty("orientation", "horizontal") : 
            this.powerUpFxsPool.getItemByProperty("orientation", "vertical");
            return b
        }, 
        c.prototype.getItemsInRow = function(a) {
            for (var b = [], c = 0; c < this.grid.columns; c++) {
                var d = this.grid.getCellAt(a, c),
                    e = d.item;
                e && b.push(e)
            }
            return b
        }, 
        c.prototype.getItemsInColumn = function(a) {
            for (var b = [], c = 0; c < this.grid.rows; c++) {
                var d = this.grid.getCellAt(c, a),
                    e = d.item;
                e && b.push(e)
            }
            return b
        }, 
        c.prototype.hideLastUsedChainLink = function() {
            for (var a = this.chainLinks.length; --a > -1;)
                if (this.chainLinks[a].visible === !0) return void this.chainLinks[a].hide()
        }, 
    c.prototype.showNewChainLink = function() {
            var a = this.getUnusedLink();
            if (a) {
                var b = this.chain.length,
                    c = this.chain[b - 1],
                    d = this.chain[b - 2];
                Phaser.Point.interpolate(c.position, d.position, .5, this.chainLinkPos), 
                a.position.set(this.chainLinkPos.x, this.chainLinkPos.y), 
                a.rotation = Phaser.Point.angle(d.position, c.position) + .5 * Math.PI, 
                a.show(), 
                this.itemsLayer.sendToBack(a)
            }
        }, 
        c.prototype.getUnusedLink = function() {
            for (var a = this.chainLinks.length, b = 0; a > b; b++)
                if (this.chainLinks[b].visible === !1) return this.chainLinks[b];
            return null
        }, 
        c.prototype.hideAllChainLinks = function() {
            for (var a = this.chainLinks.length, b = 0; a > b; b++) this.chainLinks[b].hide()
        }, 
    c.prototype.getItemUnderPoint = function(b, c) {
            for (var d = this.activeItems.length, e = 0; d > e; e++) {
                var f = this.activeItems[e],
                    g = utils.MathUtil.distanceSquared(f.position.x, f.position.y, b, c);
                if (g < a.Item.RADIUS_SQUARED) return f
            }
            return null
        }, 
        c.prototype.isDistanceFits = function(b, c) {
            var d = utils.MathUtil.distanceSquared(b.position.x, b.position.y, c.position.x, c.position.y);
            return d < a.Item.CONTACT_RADIUS_SQUARED
        }, 
        c.prototype.destroy = function() {
            this.game.state.onShutDownCallback = null, 
            this.roundResult = null, 
            this.activeItems = null, 
            this.itemsGenerator.destroy(), 
            this.itemsGenerator = null, 
            this.chain = null, 
            this.chainLinks = null, 
            this.chainLinkPos = null, 
            this.findChainStrategy.destroy(), 
            this.findChainStrategy = null, 
            this.taskGenerator.destroy(), 
            this.taskGenerator = null, 
            this.currentTask.destroy(), 
            this.currentTask = null, 
            this.monkey = null, 
            this.removeKeyCallbacks(), 
            this.destroyPools()
        }, 
        c.prototype.removeKeyCallbacks = function() {}, 
        c.prototype.destroyPools = function() {
            this.itemsPool.destroy(), 
            this.itemsPool = null, 
            this.starsPool.destroy(), 
            this.starsPool = null, 
            this.powerUpFxsPool.destroy(), 
            this.powerUpFxsPool = null, 
            this.powerUpsPool.destroy(), 
            this.powerUpsPool = null, 
            this.futurePowerUpsPool.destroy(), 
            this.futurePowerUpsPool = null
        }, c
    }(Phaser.State);
    a.Level = b
}(game || (game = {}));