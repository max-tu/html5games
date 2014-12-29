/*8-levelcompleteboard*/
function(t, e) {
    var i = t("./simplebutton"),
        s = t("./level2pokemon"),
        n = t("./ballopening"),
        a = function(t, e, i) {
            Phaser.Group.call(this, t, e, "Level Complete Board"), 
            this.levels_num = this.game.global.levels_num, 
            this.levelNumber = i, 
            this._level2pokemon = new s(this.levelNumber), 
            this.addBackGround(), 
            this.completeboard = this.game.add.image(-10, 250, "bggroup", "creditbg.png", this), 
            this.completeboard.position.set(this.game.width / 2 - this.completeboard.width / 2, 
            this.game.height / 2 - this.completeboard.height / 2), 
            this.addBallopening(), 
            this.initPokemon(this._level2pokemon.pokemon, 
                this._level2pokemon.pokemon_name, this._level2pokemon.pokemon_icon), 
            this.addButtons()
        };
    a.prototype = Object.create(Phaser.Group.prototype), 
    a.prototype.constructor = a, 
    a.prototype.addBackGround = function() {
        var t = this.game.add.graphics(0, 0, this);
        t.beginFill(0, .5), 
        t.drawRect(0, 0, this.game.width, this.game.height), 
        t.endFill()
    }, a.prototype.addBallopening = function() {
        this.ballopening = new n(this.game, this.game.width / 2 + 200, this.game.height / 2 - 100), 
        this.ballopening.anchor.set(.5, .5), 
        this.add(this.ballopening)
    }, 
    a.prototype.initPokemon = function(t, e, i) {
        this.icon = new Phaser.Image(this.game, this.game.width / 2 - 100, this.game.height / 2 - 100, t, i), 
        this.icon.anchor.set(.5, .5), 
        this.add(this.icon)
    },
    a.prototype.addButtons = function() {
        var t = this,
            e = 550,
            s = 120,
            n = new i(this.game, this.game.width / 2, e, "buttonsgroup", "restart.png");

        n.callback.addOnce(function() {
            t.game.state.start("level", !0, !1, t.levelNumber)
        }, this);

        var a = new i(this.game, n.x - s, e, "buttonsgroup", "menu.png");
        a.callback.addOnce(function() {
            t.game.state.start("levelsmenu")
        }, this);

        var o = new i(this.game, n.x + s + .25, e, "buttonsgroup", "play2.png");

        o.callback.addOnce(function() {
            t.levelNumber === this.levels_num ? t.game.state.start("levelsmenu") : 
            t.game.state.start("level", !0, !1, t.levelNumber + 1)
        }, this), 
        this.buttons = [a, n, o], this.buttons.forEach(function(e) {
            t.add(e)
        })
    }, 
    a.prototype.show = function() {
        var t = this;
        this.visible = !0, this.completeboard.y -= 200, 
        this.completeboard.alpha = 0;
        var e = 500;
        this.game.add.tween(this.completeboard).to({
            alpha: 1
        }, 200, Phaser.Easing.Linear.None, !0), 

        this.game.add.tween(this.completeboard).to({
            y: this.completeboard.y + 200
        }, e, Phaser.Easing.Back.Out, !0);
        var i = e;
        this.buttons.forEach(function(s) {
            s.y -= 200, s.visible = !1, t.game.add.tween(s).to({
                y: s.y + 200
            }, e, Phaser.Easing.Back.Out, !0, i).onStart.addOnce(function() {
                s.visible = !0
            }, t), i += 100
        }), 

        Phaser.Math.distance(this.icon.x, this.icon.y, this.ballopening.x, this.ballopening.y), 

        this.game.add.tween(this.icon).to({
            x: this.ballopening.x,
            y: this.ballopening.y - 56
        }, 2e3, Phaser.Easing.Back.In, !0), 

        this.game.add.tween(this.icon.scale).to({
            x: .33,
            y: .33
        }, 1e3, Phaser.Easing.Back.In, !0, 2e3).onComplete.addOnce(function() {
            this.icon.kill(), 
            this.ballopening.animations.play("close"), 
            this.ballopening.position.set(this.game.width / 2, this.game.height / 2 - this.ballopening.height / 2)
        }, this)
    }, e.exports = a
}