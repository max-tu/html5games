var game;
! function(a) {
    var b = function() {
        function b(a, b) {
            this.step = 0, this.setTitleAndDescription(a), this.prices = b
        }
        return b.prototype.setTitleAndDescription = function(b) {
            var c = a.Main.texts.upgrades,
                d = c[b];
            this._upgradeType = b, this._title = d.title, this._description = d.description
        }, 
        b.prototype.getCurrentPrice = function() {
            return this.prices[this.step]
        }, 
        b.prototype.advance = function() {
            this.step < 3 && this.step++
        }, 
        b.prototype.getValue = function() {
            return null
        }, 
        Object.defineProperty(b.prototype, "upgradeType", {
            get: function() {
                return this._upgradeType
            },
            enumerable: !0,
            configurable: !0
        }), 
        Object.defineProperty(b.prototype, "title", {
            get: function() {
                return this._title
            },
            enumerable: !0,
            configurable: !0
        }), 
        Object.defineProperty(b.prototype, "description", {
            get: function() {
                return this._description
            },
            enumerable: !0,
            configurable: !0
        }), 
        b.BOAT_BODY = "Body", b.SHIELD = "Shield", b.COINS_MAGNET = "Magnet", b.TURBO = "Turbo", b
    }();
    a.Upgrade = b
}(game || (game = {}));

/*=========================================================================================================*/
var game;
! function(a) {
    var b = function(a) {
        function b(b, c) {
            a.call(this, b, c), this.lives = [1, 2, 3, 4]
        }
        return __extends(b, a), b.prototype.getValue = function() {
            return this.lives[this.step]
        }, b
    }(a.Upgrade);
    a.BoatBodyUpgrade = b
}(game || (game = {}));
///////////////////////////////////////////////////
var game;
! function(a) {
    var b = function(a) {
        function b(b, c) {
            a.call(this, b, c), this.durations = [0, 8e3, 1e4, 12e3]
        }
        return __extends(b, a), b.prototype.getValue = function() {
            return this.durations[this.step]
        }, b
    }(a.Upgrade);
    a.ShieldUpgrade = b
}(game || (game = {}));
/////////////////////////////////////////////////////////////////////////////////////////////
var game;
! function(a) {
    var b = function(a) {
        function b(b, c) {
            a.call(this, b, c), this.values = [{
                radius: 0,
                duration: 0
            }, {
                radius: 100,
                duration: 1e4
            }, {
                radius: 110,
                duration: 12e3
            }, {
                radius: 120,
                duration: 15e3
            }]
        }
        return __extends(b, a), b.prototype.getValue = function() {
            return this.values[this.step]
        }, b
    }(a.Upgrade);
    a.CoinsMagnetUpgrade = b
}(game || (game = {}));
//////////////////////////////////////////////////////////////////////
var game;
! function(a) {
    var b = function(a) {
        function b(b, c) {
            a.call(this, b, c), 
            this.durations = [0, 15e3, 18e3, 21e3]
        }
        return __extends(b, a), b.prototype.getValue = function() {
            return this.durations[this.step]
        }, b
    }(a.Upgrade);
    a.TurboUpgrade = b
}(game || (game = {}));
//////////////////////////////////////////////////
var game;
! function(a) {
    var b = function() {
        function b() {
            this.initUpgrades(), this.load()
        }
        return b.prototype.initUpgrades = function() {
            this.upgrades = [new a.BoatBodyUpgrade(a.Upgrade.BOAT_BODY, [300, 600, 1e3]), 
            new a.ShieldUpgrade(a.Upgrade.SHIELD, [200, 400, 800]), 
            new a.CoinsMagnetUpgrade(a.Upgrade.COINS_MAGNET, [200, 400, 800]), 
            new a.TurboUpgrade(a.Upgrade.TURBO, [100, 300, 600])]
        }, 
        b.prototype.load = function() {
            this.upgrades.forEach(function(b) {
                var c = parseInt(a.Main.storage.getValue(b.title));
                b.step = isNaN(c) ? 0 : c
            })
        }, 
        b.prototype.save = function() {
            this.upgrades.forEach(function(b) {
                a.Main.storage.saveValue(b.title, b.step)
            })
        }, 
        b.prototype.getUpgradeByTitle = function(a) {
            for (var b = this.upgrades.length, c = 0; b > c; c++) {
                var d = this.upgrades[c];
                if (d.upgradeType === a) return d
            }
            return null
        }, 
        b.prototype.getUpgradeStep = function(a) {
            return this.getUpgradeByTitle(a).step
        }, 
        b.prototype.canSomethingBeUpgraded = function() {
            var b = a.Main.stats.coins;
            return this.upgrades.some(function(a) {
                return a.getCurrentPrice() <= b
            })
        }, b
    }();
    a.UpgradesController = b
}(game || (game = {}));