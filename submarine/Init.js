
var game;
! function(a) {
    var b = function() {
        function a() {}
        return a.GAME_WIDTH = 960, 
        a.GAME_HEIGHT = 640, 
        a.HALF_GAME_WIDTH = .5 * a.GAME_WIDTH, 
        a.HALF_GAME_HEIGHT = .5 * a.GAME_HEIGHT, a
    }();
    a.Config = b
}(game || (game = {}));

/*===========================================================================*/

var game;
! function(a) {
    var b = function() {
        function b() {
            this._coins = 0, 
            this._bestDistance = 0, 
            this.load()
        }
        return b.prototype.load = function() {
            this._coins = this.getNumericValue("coins"), 
            this._bestDistance = this.getNumericValue("distance")
        }, 
        b.prototype.updateCoins = function(b) {
            b >= 0 && (this._coins = b, a.Main.storage.saveValue("coins", this._coins))
        }, 
        b.prototype.updateBestDistance = function(b) {
            this._bestDistance = b, a.Main.storage.saveValue("distance", this._bestDistance)
        }, 
        b.prototype.getNumericValue = function(b) {
            var c = parseInt(a.Main.storage.getValue(b));
            return isNaN(c) ? 0 : c
        }, 
        b.prototype.clearAll = function() {
            this.updateCoins(0), 
            this.updateBestDistance(0), 
            a.Main.upgrades.upgrades.forEach(function(a) {
                a.step = 0
            }), a.Main.upgrades.save()
        }, 
        Object.defineProperty(b.prototype, "coins", {
            get: function() {
                return this._coins
            },
            enumerable: !0,
            configurable: !0
        }), 
        Object.defineProperty(b.prototype, "bestDistance", {
            get: function() {
                return this._bestDistance
            },
            enumerable: !0,
            configurable: !0
        }), b
    }();
    a.GameStats = b
}(game || (game = {})), 

/*===========================================================================*/
var game;
! function(a) {
    var b = function(b) {
        function c() {
            var d = {
                width: a.Config.GAME_WIDTH,
                height: a.Config.GAME_HEIGHT,
                renderer: Phaser.CANVAS,
                parent: "gameContainer",
                transparent: !1,
                antialias: !0,
                enableDebug: c.development
            };
            b.call(this, d), 
            c.storage = new utils.LocalStorageWrapper, 

            c.stats = new a.GameStats, 
            this.state.add("Boot", a.Boot, !0), 
            this.state.add("Preloader", a.Preloader, !1), 
            this.state.add("SplashScreen", a.SplashScreen, !1), 
            this.state.add("MainMenu", a.MainMenu, !1), 
            this.state.add("Level", a.Level, !1)
        }

        return __extends(c, b), 
        c.prototype.changeState = function(a, b) {
            this.stateTransitionPlugin || (this.stateTransitionPlugin = this.plugins.plugins[0]), 
            this.stateTransitionPlugin.changeState(a, b)
        }, 
        c.development = !1, 
        c.wasPaused = !1, 
        c.wasMuted = !1, 
        c.weakDevice = !1, 
        c.language = "en", c
    }(Phaser.Game);

    a.Main = b

}(game || (game = {}));

/*===========================================================================*/

function onLoad() {
    new game.Main
}

window.addEventListener("load", onLoad, !1);

