/* =======preload ======*/
function(t, e) {
    "use strict";

    function i() {}
    i.prototype = {
        init: function() {
            this.stage.disableVisibilityChange = !0
        },
        preload: function() {
            this.initPreloadBar(), 
            this.addLoadingText(), 
            this.loadAssets()
        },
        create: function() {
            this.game.state.start("menu", !0, !1, !0)
        },
        update: function() {},
        initPreloadBar: function() {
            this.LoadingBar_Outer = this.add.image(0, 0, "LoadingBar_Outer"), 
            this.LoadingBar_Inner = this.add.sprite(0, 0, "LoadingBar_Inner"), 
            this.LoadingBar_Outer.anchor.set(.5, .5), 
            this.LoadingBar_Outer.x = this.game.width / 2 - .5, 
            this.LoadingBar_Outer.y = this.game.height / 2, 
            this.LoadingBar_Inner.x = this.game.width / 2 - .5 - this.LoadingBar_Inner.width / 2, 
            this.LoadingBar_Inner.y = this.game.height / 2 - this.LoadingBar_Inner.height / 2 - 1.5, 
            this.load.setPreloadSprite(this.LoadingBar_Inner)
        },
        addLoadingText: function() {
            var t = {
                font: "45px font",
                fill: "#FFFFFF",
                align: "center"
            };
            this.loadingText = this.game.add.text(0, 0, "0%", t), 
            this.loadingText.anchor.set(.5, .5), 
            this.loadingText.position.set(this.game.world.width / 2, this.game.world.height / 2 + 180), 
            this.loadingText.setShadow(2, 2, "#666666", 2), this.loadingText.update()
        },
        loadAssets: function() {
            this.load.bitmapFont("font", "assets/fonts/font.png", "assets/fonts/font.fnt", null, 1), 

            this.load.atlas("buttonsgroup", "assets/graphics/buttonsgroup.png", "assets/graphics/buttonsgroup.json"),

            this.load.image("line", "assets/graphics/line.png"), 
            this.load.image("grass", "assets/graphics/grass.png"), 
            this.load.image("sand", "assets/graphics/sand.png"), 
            this.load.image("water", "assets/graphics/water.png"), 

            this.load.spritesheet("saw_spin", "assets/graphics/spinning_saw.png", 70, 69), 
            this.load.atlas("bggroup", "assets/graphics/bggroup.png", "assets/graphics/bggroup.json"), 
            this.load.spritesheet("pikachu_ball", "assets/graphics/pikachu_ball55x96.png", 55, 96), 
            this.load.image("pikachu100", "assets/graphics/pikachu100.png"), 

            this.load.atlas("ballopening", "assets/graphics/ballopening.png", "assets/graphics/ballopening.json"), 
            this.load.atlas("ballred", "assets/graphics/ballred.png", "assets/graphics/ballred.json"), 

            this.load.spritesheet("explosion", "assets/graphics/explosion.png", 128, 128), 
            this.load.spritesheet("explosion_boom", "assets/graphics/explosion_boom.png", 64, 64), 

            this.load.image("tree", "assets/graphics/treereal.png"), 
            this.load.image("island", "assets/graphics/island.png"), 
            this.game.global.enable_sound && (
                this.load.audio("main_loop", ["assets/audio/MainLoop.ogg"], !0), 
                this.load.audio("tap", ["assets/audio/TapSound.ogg"], !0), 
                this.load.audio("explosion", ["assets/audio/explosion.ogg"], !0), 
                this.load.audio("player-explosion", ["assets/audio/player-explosion.ogg"], !0), 
                this.load.audio("levelfail", ["assets/audio/Game_Over.ogg"], !0), 
                this.load.audio("levelcomplete", ["assets/audio/LevelCompleteSound.ogg"], !0),
                this.load.audio("plop", ["assets/audio/plop.ogg"], !0)
            ), 

            this.load.atlas("hands", "assets/graphics/hands.png", "assets/graphics/hands.json"), 
            this.load.atlas("weedle", "assets/graphics/pokemons/weedle.png", "assets/graphics/pokemons/weedle.json"), 
            this.load.atlas("goldfish", "assets/graphics/pokemons/goldfish.png", "assets/graphics/pokemons/goldfish.json"), 
            this.load.atlas("dewgong", "assets/graphics/pokemons/dewgong.png", "assets/graphics/pokemons/dewgong.json"), 
            this.load.atlas("muk", "assets/graphics/pokemons/muk.png", "assets/graphics/pokemons/muk.json"), 
            this.load.atlas("beedrill", "assets/graphics/pokemons/beedrill.png", "assets/graphics/pokemons/beedrill.json"), 
            this.load.atlas("arcanine", "assets/graphics/pokemons/arcanine.png", "assets/graphics/pokemons/arcanine.json"), 
            this.load.atlas("steelix", "assets/graphics/pokemons/steelix.png", "assets/graphics/pokemons/steelix.json"), 
            this.load.atlas("gyarados", "assets/graphics/pokemons/gyarados.png", "assets/graphics/pokemons/gyarados.json"), 
            this.load.atlas("charizard", "assets/graphics/pokemons/charizard.png", "assets/graphics/pokemons/charizard.json")
        },
        loadUpdate: function() {
            this.loadingText.setText("" + this.load.progress + "%")
        },
        shudown: function() {
            this.LoadingBar_Outer.destroy(), 
            this.LoadingBar_Inner.destroy(), 
            this.loadingText.destroy()
        }
    }, e.exports = i
}