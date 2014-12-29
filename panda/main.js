function onLoad() {
    new game.Main
}
/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/    
var game;
! function(a) {
    var b = function() {
        function a() {}
        return a.GAME_WIDTH = 640, a.GAME_HEIGHT = 832,
        a.HALF_GAME_WIDTH = .5 * a.GAME_WIDTH, 
        a.HALF_GAME_HEIGHT = .5 * a.GAME_HEIGHT, a
    }();
    a.Config = b
}(game || (game = {}));
/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/    
window.addEventListener("load", onLoad, !1);
/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/    
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
            this.state.add("MainMenu", a.MainMenu, !1), 
            this.state.add("Tutorial", a.Tutorial, !1), 
            this.state.add("Level", a.Level, !1)
        }
        return __extends(c, b), 
        c.prototype.changeState = function(a, b) {
            this.stateTransitionPlugin || (this.stateTransitionPlugin = this.plugins.plugins[0]), 
            this.stateTransitionPlugin.changeState(a, b)
        }, c.development = !1, c.wasMuted = !1, c.weakDevice = !1, c.language = "en", c
    }(Phaser.Game);
    a.Main = b
}(game || (game = {}));