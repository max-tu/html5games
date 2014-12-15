
var game;
! function(a) {
    var b = function() {
        function b(b, c) {
            this.generationDistance = 6 * a.Config.GAME_WIDTH, 
            this.generationOffset = 400, 
            this.passedDistance = 0, 
            this.newRocketMark = 0, 
            this.active = !0, 
            this.game = b, this.objectsLayer = c, 
            this.syncWithUpgrades(), 
            this.newRocketMark = this.getNewRocketMark(), 
            this._launchRocketSignal = new Phaser.Signal, 
            this.rocketPosition = new Phaser.Point
        }
        return b.prototype.getNewRocketMark = function() {
            var a = this.generationDistance - this.generationOffset,
                b = this.generationDistance + this.generationOffset;
            return this.game.rnd.realInRange(a, b)
        }, 
        b.prototype.update = function(a) {
            this.active !== !1 && (this.passedDistance += a, 
                this.passedDistance > this.newRocketMark && (this.passedDistance = 0, 
                    this.newRocketMark = this.getNewRocketMark(),
                    this.generateRockets()))
        }, 
        b.prototype.generateRockets = function() {
            var a = this.game.rnd.integerInRange(1, 20);
            5 > a ? this.generateThreeRockets() : 10 > a ? this.generateTwoRockets() : 
            15 > a && this.generateOneRocket(), 15 > a && this.game.sound.usingWebAudio && this.game.sound.play("rocket_alert", .33)
        }, 
        b.prototype.generateThreeRockets = function() {
            for (var a = 240, c = a / 2, d = this.game.rnd.realInRange(b.TOP_Y, b.BOTTOM_Y - a), 
                e = this.game.rnd.realInRange(500, 1e3), f = 180, g = 0; 3 > g; g++) this.generateRocket(d, e), d += c, e += f
        }, 
        b.prototype.generateTwoRockets = function() {
            for (var a = 100, c = 240, 
                d = this.game.rnd.realInRange(a, c),
                e = this.game.rnd.realInRange(b.TOP_Y, b.BOTTOM_Y - c), 
                f = this.game.rnd.realInRange(500, 1e3), g = 0; 2 > g; g++) 
                this.generateRocket(e, f),
                e += d
        },
        b.prototype.generateOneRocket = function() {
            var a = this.game.rnd.realInRange(b.TOP_Y, b.BOTTOM_Y),
                c = this.game.rnd.realInRange(500, 1e3);
            this.generateRocket(a, c)
        }, 
        b.prototype.generateRocket = function(a, b) {
            this._launchRocketSignal.dispatch(a, b)
        }, 
        b.prototype.turnOnTurbo = function() {
            this.active = !1
        }, 
        b.prototype.turnOffTurbo = function() {
            this.active = !0
        }, 
        b.prototype.doReset = function() {
            this.syncWithUpgrades(), 
            this.passedDistance = 0, 
            this.newRocketMark = this.getNewRocketMark(), 
            this.active = !0
        }, 
        b.prototype.syncWithUpgrades = function() {
            var b = 4 * a.Config.GAME_WIDTH,
                c = 6 * a.Config.GAME_WIDTH,
                d = a.Main.upgrades.getUpgradeStep(a.Upgrade.BOAT_BODY),
                e = b + (c - b) * (3 - d) * .33;
            this.generationDistance = e
        }, 
        b.prototype.destroy = function() {
            this.game = null, 
            this.objectsLayer = null, 
            this.rocketPosition = null, 
            this._launchRocketSignal.dispose(), 
            this._launchRocketSignal = null
        }, 
        Object.defineProperty(b.prototype, "launchRocketSignal", {
            get: function() {
                return this._launchRocketSignal
            },
            enumerable: !0,
            configurable: !0
        }), 
        b.TOP_Y = .2 * a.Config.GAME_HEIGHT, b.BOTTOM_Y = .8 * a.Config.GAME_HEIGHT, b
    }();
    a.RocketGenerator = b
}(game || (game = {}));