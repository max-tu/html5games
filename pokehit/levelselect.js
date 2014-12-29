 function(t, e) {
    function i() {}
    var s = t("../prefabs/levelicon"),
        n = t("../prefabs/simplebutton"),
        a = t("../prefabs/togglebutton");
    i.prototype = {
        init: function() {
            this.stage.disableVisibilityChange = !0
        },
        create: function() {
            this.levels_num = this.game.global.levels_num, 
            this.game.add.image(0, 0, "bggroup", "bg.png"), 
            this.initLevelIcons(), 
            this.initButtons(), 
            this.initAnimations()
        },
        initLevelIcons: function() {
            this.levelIconsGroup = this.game.add.group(this.game.world, "LevelIcons Container"), 
            this.levelIconsGroup.x = 85, 
            this.levelIconsGroup.y = 150;
            for (var t = 118, e = 118, i = 59, n = 0, a = 1; this.levels_num >= a; a++) {
                var o = a,
                    h = this.levelIsLocked(o),
                    r = new s(this.game, i - .5, n, o, h);
                h === !1 && r.events.onInputUp.add(this.onLevelIconInputUp, this, 2), 
                this.levelIconsGroup.add(r), 
                i += t, 
                4 === a && (i = 0, n += e), 
                a > 4 && 0 === (a - 4) % 5 && (i = 0, n += e), 
                24 === a && (i = 59)
            }
        },
        levelIsLocked: function(t) {
            if (1 === t) return !1;
            var e = t - 1;
            return !("true" === window.localStorage.getItem("" + e))
        },
        onLevelIconInputUp: function(t) {
            var e = this;
            this.game.time.events.add(200, function() {
                var i = t.levelNumber;
                e.game.state.start("level", !0, !1, i)
            }, this)
        },
        initButtons: function() {
            var t = this,
                e = 60;
            this.backButton = new n(this.game, e, e, "buttonsgroup", "home.png"), 
            this.backButton.callback.addOnce(function() {
                t.game.state.start("menu")
            }, this), 
            this.world.add(this.backButton), 
            this.soundButton = new a(this.game, this.game.width - e, e, "buttonsgroup", "sound.png", "mute.png"), 

            this.soundButton.callback.add(function() {
                t.game.sound.mute = !t.game.sound.mute
            }), this.game.sound.mute && this.soundButton.switchTextures(), 
            this.world.add(this.soundButton)
        },
        initAnimations: function() {
            this.levelIconsGroup.alpha = 0, 
            this.levelIconsGroup.y += 200, 

            this.game.add.tween(this.levelIconsGroup).to({
                y: this.levelIconsGroup.y - 200,
                alpha: 1
            }, 600, Phaser.Easing.Back.Out, !0, 300), 
            this.backButton.x -= 300, 

            this.game.add.tween(this.backButton).to({
                x: this.backButton.x + 300
            }, 300, Phaser.Easing.Back.Out, !0, 700), 

            this.soundButton.x += 300, 

            this.game.add.tween(this.soundButton).to({
                x: this.soundButton.x - 300
            }, 300, Phaser.Easing.Back.Out, !0, 700)
        },
        shutdown: function() {
            this.levelIconsGroup.destroy(), 
            this.backButton.destroy(), 
            this.soundButton.destroy()
        }
    }, e.exports = i
}