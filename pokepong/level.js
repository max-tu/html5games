/* =======level ======*/
function(t, e) {
    function i() {}
    var s = t("../prefabs/pikachu"),
        n = t("../prefabs/ball"),
        a = t("../prefabs/pokemon"),
        o = t("../prefabs/ground"),
        h = t("../prefabs/trap"),
        r = t("../prefabs/tree"),
        l = t("../prefabs/island"),
        p = t("../prefabs/levelstartboard"),
        g = t("../prefabs/levelsettings"),
        d = t("../prefabs/levelgui"),
        c = t("../prefabs/level2pokemon"),
        u = t("../prefabs/tutorialhand");
    Object.defineProperty(this, "settings", {
        get: function() {
            return this._settings
        },
        enumerable: !0,
        configurable: !0
    }), 
    i.prototype = {
        init: function(t) {
            this._settings = new g(t)
        },
        create: function() {
            this.levels_num = this.game.global.levels_num, 
            this._level2pokemon = new c(this._settings.levelNumber), 
            this.addGround(), 
            this.addTrap(), 
            this.addPikachu(), 
            this.line = this.game.add.tileSprite(50, this.game.height - 165, this.game.width - 100, 10, "line"), 
            this.addBall(), 
            this.addPokemon(), 
            this.addObjects(),
            this.addLevelText(), 
            this.addStartScreen(), 
            this.addGui(), 
            1 == this._settings.levelNumber && this.addTutorial()
        },
        update: function() {
            1 == this._settings.levelNumber && 
                this.game.input.activePointer.isDown && 
                    this.tutorial.visible && (
                        this.tutorial.position.set(this.pikachu.x + 5, this.pikachu.y + 50), 

                        this.game.add.tween(this.tutorial).to({
                            x: this.game.width / 2 - 100
                        }, 1e3, Phaser.Easing.Bounce.In, !0).onComplete.addOnce(function() {
                        
                        this.game.add.tween(this.tutorial).to({
                            x: this.game.width / 2 + 100
                        }, 1e3, Phaser.Easing.Bounce.Out, !0).onComplete.addOnce(function() {
                                this.game.add.tween(this.tutorial).to({
                                x: this.game.width / 2
                        }, 500, Phaser.Easing.Bounce.In, !0)
                }, this)

            }, this), this.game.time.events.add(5 * Phaser.Timer.SECOND, function() {
                this.tutorial.animations.stop(), 

                this.game.add.tween(this.tutorial).to({
                    alpha: 0
                }, 300, Phaser.Easing.Back.Out, !0).onComplete.addOnce(function() {
                    this.tutorial.visible = !1, 
                    this.tutorial.destroy()
                }, this), 

                this.tutorialText.destroy()

            }, this)), 
            
            this.startScreen.visible || this.game.input.onDown.add(this.ball.start, this.ball)
        },
        render: function() {},
        addLevelText: function() {
            var t = {
                font: "42px font",
                fill: "#FBAF05",
                align: "center",
                stroke: "#FFFFFF",
                strokeThickness: 8
            }, e = this._settings.levelNumber;
            this.titleText = this.game.add.text(0, 0, "" + e, t), 
            this.titleText.anchor.set(.5, .5), 
            this.titleText.position.set(this.game.width / 2, 30), 
            this.titleText.setShadow(2, 2, "#FB1A05", 2)
        },
        levelFail: function() {
            this.game.time.events.add(1 * Phaser.Timer.SECOND, function() {
                this.game.global.enable_sound && this.game.sound.play("levelfail")
            }, this), 
            
            this.gui.onLevelFail(), 
            this.pokemon.visible = !1, 
            this.pikachu.visible = !1
        },
        levelComplete: function() {
            this.game.time.events.add(1 * Phaser.Timer.SECOND, function() {
                this.game.global.enable_sound && this.game.sound.play("levelcomplete")
            }, this), 
            this.saveLevelResult(), 
            this.gui.onLevelComplete(), 
            this.ball.visible = !1, 
            this.pikachu.visible = !1
        },
        saveLevelResult: function() {
            window.localStorage.setItem("" + this._settings.levelNumber, "true")
        },
        addGround: function() {
            this.ground = new o(this.game, 0, 0, this.game.width, this.game.height, "" + 
                this._level2pokemon.pokemon_type)
        },
        addTrap: function() {
            this.numberOfTrap = 3, this.traps = this.game.add.group();
            for (var t = 0; this.numberOfTrap > t; t++) 
                this.trap = new h(this.game, 120 + 200 * t, this.game.height - 50), 
                this.traps.add(this.trap)
        },
        addPikachu: function() {
            this.pikachu = new s(this.game, this.game.width / 2, this.game.height - 210, 
                this._settings.levelNumber)
        },
        addBall: function() {
            this.ball = new n(this.game, this.game.width / 2, this.pikachu.y - 80, 
                this.pikachu, this.traps, this._settings.levelNumber), 
            this.ball.levelFailSignal.addOnce(this.levelFail, this)
        },
        addPokemon: function() {
            this.pokemon = new a(this.game, this.game.width / 2, 100, this.ball, this._settings.levelNumber), 
            this.pokemon.levelCompleteSignal.addOnce(this.levelComplete, this)
        },
        addObjects: function() {
            this.numberOfObjects = 3, this.objects = this.game.add.group();
            for (var t = 1; this.numberOfObjects >= t; t++) {
                var e = this.game.rnd.between(10, this.game.width - 10),
                    i = this.game.rnd.between(100, this.game.height / 2);
                this.object = "water" == "" + this._level2pokemon.pokemon_type ? 
                    new l(this.game, e, i, this.ball) : new r(this.game, e, i, this.ball), 
                this.objects.add(this.object)
            }
        },
        addGui: function() {
            this.gui = new d(this.game, this._settings), 
            this.gui.pauseSignal.add(this.togglePause, this)
        },
        addStartScreen: function() {
            this.startScreen = new p(this.game, this, this._settings.levelNumber), 
            this.startScreen.show()
        },
        addTutorial: function() {
            this.tutorial = new u(this.game, this.game.width / 2, this.game.height / 2, this.pikachu),
             this.tutorial.visible = !0;
            var t = {
                font: "32px font",
                fill: "#def",
                align: "center",
                stroke: "#0f0",
                strokeThickness: 1
            }, e = "Avoid Ball hit to Circular Saw!\n\ntouch Pikachu to defend Ball";
            this.tutorialText = this.game.add.text(0, 0, "" + e, t), 
            this.tutorialText.anchor.set(.5, .5), 
            this.tutorialText.position.set(this.game.width / 2, this.game.height - 100),
             this.tutorialText.setShadow(2, 2, "#000", 2)
        },
        togglePause: function(t) {
            "pause" === t ? this.pauseGame() : "resume" === t && this.resumeGame()
        },
        pauseGame: function() {
            this.gui.onPause(), this.ball.pause("on"), 
            this.pokemon.pause("on"), 
            this.pikachu.notPause = !1
        },
        resumeGame: function() {
            this.gui.onResume(), this.ball.pause("off"), 
            this.pokemon.pause("off"), 
            this.pikachu.notPause = !0
        },
        shutdown: function() {
            this.ball.destroy(), 
            this.pikachu.destroy(),
             this.pokemon.destroy(), 
             this.objects.destroy(), 
             this.traps.destroy(), 
             this._level2pokemon = null, 
             this.line.destroy()
        }
    }, e.exports = i
}