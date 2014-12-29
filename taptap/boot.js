var BUBBLE_LAYERS = 10;
var BUBBLES_PER_LAYER = 10;
var SUBMARINE_VERION = "v1.0";
var uboat = {};
uboat.Bootup = function(e) {
    Cocoon.App.exitCallback(function() {
        console.log("** exitCallback 444 -> game=" + e);
        console.log("** exitCallback 444 -> game.state=" + e.state);
        console.log("** exitCallback 444 -> game.state.current=" + e.state.current);
        switch (e.state.current) {
            case "MainMenu":
                var t = e.state.states["MainMenu"].doBtnBack();
                return t;
                break;
            case "LevelSelect":
                e.state.states["LevelSelect"].doBtnBack();
                return false;
                break;
            case "Tutorial":
                e.state.states["Tutorial"].doBtnBack();
                return false;
                break;
            case "Game":
                e.state.states["Game"].doBtnBack();
                return false;
                break;
            default:
                return true
        }
    }.bind(this))
};
uboat.Bootup.prototype = {
    preload: function() {
        this.load.image("preloaderBar", "img/loading-bar.png")
    },
    create: function() {
        this.input.maxPointers = 1;
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.scale.setScreenSize(true);
        this.state.start("Preloader")
    }
};