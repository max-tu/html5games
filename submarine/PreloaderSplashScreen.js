var game;
! function(a) {
    var b = function(b) {
        function c() {
            b.apply(this, arguments), 
            this.soundsToDecode = ["coin", "tap"], 
            this.soundsReady = !1, 
            this.assetsReady = !1, 
            this.updateEnabled = !0
        }
        return __extends(c, b), c.prototype.preload = function() {
            this.initPreloadBar(), 
            this.addLoadingText(), 
            this.loadAssets(), 
            this.game.device.webAudio ? (this.soundsReady = !1, 
                this.game.sound.onSoundDecode.add(this.onSoundDecoded, this)) : this.soundsReady = !0
        }, 
        c.prototype.initPreloadBar = function() {
            if (a.Main.development === !1) {
                var b = this.add.image(0, 0, "preloader_back");
                b.anchor.set(.5, .5), b.x = a.Config.HALF_GAME_WIDTH, b.y = a.Config.HALF_GAME_HEIGHT - 60;
                var c = this.game.add.sprite(0, 0, "preloader_front");
                c.x = a.Config.HALF_GAME_WIDTH - .5 * c.width - 2, 
                c.y = a.Config.HALF_GAME_HEIGHT - .5 * c.height - 60, 
                this.load.setPreloadSprite(c)
            }
        }, 
        c.prototype.addLoadingText = function() {
            var b = {
                font: "45px GrilledCheeseBTNToasted",
                fill: "#FFFFFF",
                align: "center"
            };
            this.loadingText = this.game.add.text(0, 0, "Loading...", b), 
            this.loadingText.anchor.set(.5, .5), 
            this.loadingText.position.set(a.Config.HALF_GAME_WIDTH, a.Config.HALF_GAME_HEIGHT + 180), 
            this.loadingText.setShadow(2, 2, "#249BC8", 1), this.loadingText.setText("Loading...")
        }, 
        c.prototype.loadAssets = function() {
            this.load.bitmapFont("digits", "assets/fonts/grilled_cheese.png", "assets/fonts/grilled_cheese.fnt", null, 3), 
            this.load.json("texts", "assets/texts.json"),
            this.load.json("itemBlocks", "assets/blocks/Blocks.json"), 
            this.game.device.webAudio && (this.load.audio("coin", ["assets/audio/coin_collected.mp3"], !0), 
            this.load.audio("tap", ["assets/audio/tap.wav"], !0), 
            this.load.audio("bonus", ["assets/audio/bonus_collected.mp3"], !0),
            this.load.audio("explosion", ["assets/audio/explosion.wav"], !0), 
            this.load.audio("buy", ["assets/audio/buy.wav"], !0), 
            this.load.audio("no_coins", ["assets/audio/not_enough_money.mp3"], !0), 
            this.load.audio("rocket_alert", ["assets/audio/rocket_alert.wav"], !0), 
            this.load.audio("rocket", ["assets/audio/rocket.wav"], !0)), 
            this.load.audio("main_loop", ["assets/audio/main_loop.ogg", "assets/audio/main_loop.m4a"], !0), 
            this.load.image("upgrade_button", "assets/graphics/button_upgrade.png"), 

            this.load.atlasJSONHash("screws", "assets/graphics/screws.png", "assets/graphics/screws.json"), 
            this.load.atlasJSONHash("coin", "assets/graphics/coin.png", "assets/graphics/coin.json"), 
            this.load.atlasJSONHash("coin_sparkles", "assets/graphics/coin_sparkles.png", "assets/graphics/coin_sparkles.json"), 
            this.load.atlasJSONHash("turbo_effect", "assets/graphics/turbo_effect.png", "assets/graphics/turbo_effect.json"), 
            this.load.atlasJSONHash("crash_smoke_1", "assets/graphics/crash_smoke_1.png", "assets/graphics/crash_smoke_1.json"), 
            this.load.atlasJSONHash("rocket_trail", "assets/graphics/rocket_trail.png", "assets/graphics/rocket_trail.json"),
            this.load.atlasJSONHash("main_menu", "assets/graphics/main_menu.png", "assets/graphics/main_menu.json"),
            this.load.atlasJSONHash("level_graphics", "assets/graphics/level_graphics.png", "assets/graphics/level_graphics.json"), 
            this.load.atlasJSONHash("upgrades", "assets/graphics/upgrades.png", "assets/graphics/upgrades.json"), 
            this.load.atlasJSONHash("round_complete", "assets/graphics/round_complete.png", "assets/graphics/round_complete.json")
        }, 
        c.prototype.onSoundDecoded = function(a) {
            var b = this.soundsToDecode.indexOf(a);
            b > -1 && this.soundsToDecode.splice(b, 1), 0 === this.soundsToDecode.length && (this.soundsReady = !0)
        }, 
        c.prototype.create = function() {
            this.initLanguage(), 
            this.initUpgrades(), 
            this.game.plugins.add(new a.StateTransition(this.game, this)), 
            this.game.cache.removeImage("preloader_outer"), 
            this.game.cache.removeImage("preloader_inner"), 
            this.assetsReady = !0
        }, 
        c.prototype.initLanguage = function() {
            var b = this.game.cache.getJSON("texts");
            a.Main.language = "en", a.Main.texts = b[a.Main.language]
        }, 
        c.prototype.initUpgrades = function() {
            a.Main.upgrades = new a.UpgradesController
        }, 
        c.prototype.update = function() {
            this.assetsReady && this.soundsReady && this.updateEnabled && (this.updateEnabled = !1, this.game.state.start("MainMenu", !0, !1, !0))
        }, c
    }(Phaser.State);
    a.Preloader = b
}(game || (game = {}));
/*========================================================================================*/
var game;
! function(a) {
    var b = function(a) {
        function b() {
            a.apply(this, arguments)
        }
        return __extends(b, a), b.prototype.create = function() {}, b.prototype.gotoMainMenu = function() {
            this.game.changeState("MainMenu", !0)
        }, b
    }(Phaser.State);
    a.SplashScreen = b
}(game || (game = {}));
