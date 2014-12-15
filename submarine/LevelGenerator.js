var game;
! function(a) {
    var b = function() {
        function b(b, c) {
            this.passedDistance = 0, 
            this.newBlockMark = a.Config.HALF_GAME_WIDTH, 
            this.newBlockY = 0, 
            this.turboMode = !1, 
            this.game = b, 
            this.objectsLayer = c, 
            this.itemPosition = new Phaser.Point, 
            this.initItemBlocks()
        }
        return b.prototype.setAddItemCallback = function(a, b) {
            this.addItemCallback = a, this.addItemCallbackContext = b
        }, 
        b.prototype.initItemBlocks = function() {
            var a = this;
            this.normalModeBlocks = [], this.turboModeBlocks = [];
            var b = this.game.cache.getJSON("itemBlocks");
            b.forEach(function(b) {
                "true" === b.normalMode && a.normalModeBlocks.push(b), "true" === b.turboMode && a.turboModeBlocks.push(b)
            })
        }, 
        b.prototype.update = function(a) {
            if (this.passedDistance += a, this.passedDistance > this.newBlockMark) {
                this.passedDistance = 0;
                var c = this.addNewBlock(),
                    d = this.game.rnd.realInRange(b.MIN_BLOCKS_DISTANCE, b.MAX_BLOCKS_DISTANCE);
                this.newBlockMark = c + d
            }
        }, 
        b.prototype.addNewBlock = function() {
            var b = this.getNewBlock();
            if (b.fixed_position === !1) {
                var c = b.height;
                this.newBlockY = this.game.rnd.integerInRange(a.Level.TOP_LEVEL_BOUND, a.Level.BOTTOM_LEVEL_BOUND - c - 20)
            } else this.newBlockY = 0;
            for (var d = b.items, e = d.length, f = 0; e > f; f++) this.addItem(d[f]);
            return b.width
        }, 
        b.prototype.addItem = function(a) {
            var b = a.type;
            b.indexOf("Coin") > -1 ? this.addCoin(a) : b.indexOf("Rock") > -1 && this.addRock(a)
        }, 
        b.prototype.addCoin = function(a) {
            this.newItemPosition(a), this.dispatchAddItemCallback("coin", a, this.itemPosition)
        }, 
        b.prototype.addRock = function(a) {
            this.newItemPosition(a), this.dispatchAddItemCallback("rock", a, this.itemPosition)
        }, 
        b.prototype.newItemPosition = function(b) {
            return this.itemPosition.x = Math.abs(this.objectsLayer.position.x) + a.Config.GAME_WIDTH + 100 + b.x, 
            this.itemPosition.y = this.newBlockY + b.y, this.itemPosition
        }, 
        b.prototype.getNewBlock = function() {
            return this.turboMode ? this.getTurboBlock() : this.getAnyBlock()
        }, 
        b.prototype.getTurboBlock = function() {
            return this.game.rnd.pick(this.turboModeBlocks)
        }, 
        b.prototype.getAnyBlock = function() {
            return this.game.rnd.pick(this.normalModeBlocks)
        }, 
        b.prototype.dispatchAddItemCallback = function(a, b, c) {
            this.addItemCallback.call(this.addItemCallbackContext, a, b, c)
        }, 
        b.prototype.turnOnTurbo = function() {
            this.turboMode = !0
        }, 
        b.prototype.turnOffTurbo = function() {
            this.turboMode = !1
        }, 
        b.prototype.doReset = function() {
            this.turboMode = !1, 
            this.passedDistance = 0, 
            this.newBlockMark = a.Config.HALF_GAME_WIDTH
        }, 
        b.prototype.destroy = function() {
            this.addItemCallback = null, 
            this.addItemCallbackContext = null, 
            this.itemPosition = null, 
            this.game = null, 
            this.objectsLayer = null, 
            this.normalModeBlocks = null, 
            this.turboModeBlocks = null
        }, b.MIN_BLOCKS_DISTANCE = 400, b.MAX_BLOCKS_DISTANCE = 600, b
    }();
    a.LevelGenerator = b
}(game || (game = {}));