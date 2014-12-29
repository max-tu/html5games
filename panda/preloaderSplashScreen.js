var game;
! function(a) {
    var b = function(b) {
        function c() {
            b.apply(this, arguments)
        }
        return __extends(c, b), c.prototype.preload = function() {
            this.initPreloadBar(), this.addLoadingText(), this.loadAssets()
        }, c.prototype.initPreloadBar = function() {
            if (a.Main.development === !1) {
                var b = this.add.image(0, 0, "preloader", "Panda_Back0000");
                b.anchor.set(.5, .5), 
                b.x = a.Config.HALF_GAME_WIDTH, 
                b.y = a.Config.HALF_GAME_HEIGHT, 
                b.angle = -90;
                var c = this.game.add.sprite(0, 0, "preloader", "Panda_Front0000");
                c.x = a.Config.HALF_GAME_WIDTH - .5 * c.width - 17, 
                c.y = a.Config.HALF_GAME_HEIGHT + .5 * c.height - 11, 
                c.angle = -90, 
                this.load.setPreloadSprite(c)
            }
        }, 
        c.prototype.addLoadingText = function() {
            var b = {
                font: "45px GrilledCheeseBTNToasted",
                fill: "#FFFFFF",
                align: "center"
            };
            this.loadingText = this.game.add.text(0, 0, "0%", b), 
            this.loadingText.anchor.set(.5, .5), 
            this.loadingText.position.set(a.Config.HALF_GAME_WIDTH, a.Config.HALF_GAME_HEIGHT + 180), 
            this.loadingText.setShadow(2, 2, "#666666", 2), 
            this.loadingText.update()
        }, 
        c.prototype.loadAssets = function() {
            this.load.bitmapFont("timer", "assets/fonts/timer.png", "assets/fonts/timer.fnt", null, 1), 
            this.load.bitmapFont("level_label", "assets/fonts/level_label.png", "assets/fonts/level_label.fnt", null, 1), 
            this.load.bitmapFont("fruit_labels", "assets/fonts/fruit_labels.png", "assets/fonts/fruit_labels.fnt", null, 3), 

            this.load.json("texts", "assets/texts.json"), 
            this.game.sound.usingWebAudio && (this.load.audio("tap", ["assets/audio/tap.wav"], !0), 
            this.load.audio("select_fruit", ["assets/audio/plop.ogg", "assets/audio/plop.m4a"], !0), 
            this.load.audio("star_appear", ["assets/audio/star_appear.ogg", "assets/audio/star_appear.m4a"], !0), 
            this.load.audio("level_up", ["assets/audio/level_up.ogg", "assets/audio/level_up.m4a"], !0), 
            this.load.audio("game_over", ["assets/audio/Game_Over.ogg", "assets/audio/Game_Over.m4a"], !0), 
            this.load.audio("clock", ["assets/audio/Ticking_Clock.ogg", "assets/audio/Ticking_Clock.m4a"], !0), 
            this.load.audio("powerup", ["assets/audio/line_powerup.ogg", "assets/audio/line_powerup.m4a"], !0), 
            this.load.audio("panda_chew", ["assets/audio/panda_chew.ogg", "assets/audio/panda_chew.m4a"], !0), 
            this.load.audio("whoosh", ["assets/audio/whoosh.wav"], !0), 

            this.game.device.firefox === !1 ? (this.load.audio("panda_mmm", ["assets/audio/panda_mmm.ogg", "assets/audio/panda_mmm.m4a"], !0), 
                this.load.audio("star_move", ["assets/audio/star_move.ogg", "assets/audio/star_move.m4a"], !0), 
                this.load.audio("whoosh_out", ["assets/audio/whoosh_out.wav"], !0)) : 
            (this.load.audio("panda_mmm", ["assets/audio/panda_mmm.m4a"], !0), 
                this.load.audio("star_move", ["assets/audio/star_move.m4a"], !0))), 

            this.load.audio("main_loop", ["assets/audio/main_loop.ogg", "assets/audio/main_loop.m4a"], !0), 
            this.load.atlasJSONHash("graphics_1", "assets/graphics/level_graphics.png", "assets/graphics/level_graphics.json"), 
            this.load.atlasJSONHash("main_menu", "assets/graphics/main_menu.png", "assets/graphics/main_menu.json"), 
            this.load.atlasJSONHash("buttons", "assets/graphics/buttons.png", "assets/graphics/buttons.json"), 
            this.load.atlasJSONHash("panda", "assets/graphics/panda.png", "assets/graphics/panda.json"),
             this.load.atlasJSONHash("tutorial", "assets/graphics/tutorial.png", "assets/graphics/tutorial.json"), 
             this.load.atlasJSONHash("tutorial_hand", "assets/graphics/tutorial_hand.png", "assets/graphics/tutorial_hand.json"), 
             this.load.atlasJSONHash("leafs", "assets/graphics/leafs.png", "assets/graphics/leafs.json"), 
             this.load.atlasJSONHash("splashes", "assets/graphics/splashes.png", "assets/graphics/splashes.json")

        }, 
        c.prototype.loadUpdate = function() {
            this.loadingText.setText(this.load.progress.toString() + "%")
        }, 
        c.prototype.create = function() {
            this.initLanguage(), 
            this.generateRestartOverlayTexture(), 
            this.game.plugins.add(new a.StateTransition(this.game, this)), 
            this.game.state.start("MainMenu", !0, !1, !0)
        }, 
        c.prototype.initLanguage = function() {
            var b = this.game.cache.getJSON("texts");
            a.Main.language = "en", a.Main.texts = b[a.Main.language]
        }, 
        c.prototype.getAvailableLanguages = function(a) {
            var b = [];
            for (var c in a) a.hasOwnProperty(c) && b.push(c);
            return b
        }, 
        c.prototype.generateRestartOverlayTexture = function() {
            var b = this.game.add.bitmapData(a.Config.GAME_WIDTH, a.Config.GAME_HEIGHT, "restart_overlay", !0);
            b.fill(255, 255, 255)
        }, c
    }(Phaser.State);
    a.Preloader = b
}(game || (game = {}));
/*===================================================================================================*/
var game;
! function(a) {
    var b = function(b) {
        function c() {
            b.apply(this, arguments)
        }
        return __extends(c, b), 
        c.prototype.create = function() {}, 
        c.prototype.addSplash = function() {
            var b = this.game.add.image(0, 0, "splash_screen");
            b.anchor.set(.5, .5), 
            b.x = a.Config.HALF_GAME_WIDTH, 
            b.y = a.Config.HALF_GAME_HEIGHT, 
            this.game.add.tween(b.scale).to({
                x: .5,
                y: .5
            }, 1500, Phaser.Easing.Linear.None, !0)
        }, 
        c.prototype.gotoMainMenu = function() {
            this.game.input.onTap.removeAll(), 
            this.game.state.start("MainMenu", !0, !1, !0)
        }, c
    }(Phaser.State);
    a.SplashScreen = b
}(game || (game = {}));