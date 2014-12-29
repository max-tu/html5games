/*13-levelstartboard*/
function(t, e) {
    var i = t("./level2pokemon"),
        s = function(t, e, s) {
            Phaser.Group.call(this, t, e.world, "Level Start Board"), 
            this.levels_num = this.game.global.levels_num, 
            this.levelNumber = s, 
            this._level2pokemon = new i(this.levelNumber), 
            this.addBackGround(), 
            this.startboard = this.game.add.image(0, 0, "bggroup", "creditbg.png", this), 
            this.startboard.position.set(this.game.width / 2 - this.startboard.width / 2, 
                this.game.height / 2 - this.startboard.height / 2), 
            this.initPokemon(this._level2pokemon.pokemon, this._level2pokemon.pokemon_name, 
                this._level2pokemon.pokemon_icon), 
            this.exists = !1, 
            this.visible = !1
        };
    s.prototype = Object.create(Phaser.Group.prototype), 
    s.prototype.constructor = s, 
    s.prototype.addBackGround = function() {
        var t = this.game.add.graphics(0, 0, this);
        t.beginFill(0, .5), 
        t.drawRect(0, 0, this.game.width, this.game.height), 
        t.endFill()
    }, 
    s.prototype.initPokemon = function(t, e, i) {
        this.icon = new Phaser.Image(this.game, this.game.width / 2, this.game.height / 2 - 100, t, i), 
        this.style = {
            font: "76px font",
            fill: "#FBAF05",
            align: "center",
            stroke: "#FFFFFF",
            strokeThickness: 12
        }, 
        this.text = new Phaser.Text(this.game, this.game.width / 2, this.game.height / 2 + 100, e, this.style), 
        this.icon.anchor.set(.5, .5), 
        this.text.anchor.set(.5, .5), 
        this.text.setShadow(2, 2, "#FB1A05", 2), 
        this.add(this.icon), 
        this.add(this.text)
    }, 
    s.prototype.update = function() {
        this.game.input.activePointer.isDown && (this.hide(), this.destroy())
    }, 
    s.prototype.show = function() {
        this.exists = !0, 
        this.visible = !0, 
        this.alpha = 0, 
        this.startboard.y -= 200, 
        this.game.add.tween(this).to({
            alpha: 1
        }, 200, Phaser.Easing.Linear.None, !0), 

        this.game.add.tween(this.startboard).to({
            y: 200
        }, 500, Phaser.Easing.Back.Out, !0).onComplete.addOnce(this.onShowComplete, this)
    }, 
    s.prototype.onShowComplete = function() {}, 
    s.prototype.hide = function() {
        this.game.add.tween(this).to({
            alpha: 0
        }, 100, Phaser.Easing.Linear.None, !0, 400), 

        this.game.add.tween(this.startboard).to({
            y: 500
        }, 500, Phaser.Easing.Back.In, !0).onComplete.addOnce(this.onHideComplete, this)
    }, 
    s.prototype.onHideComplete = function() {
        this.exists = !1, this.visible = !1
    }, 
    s.prototype.destroy = function() {
        this.startboard.destroy(), 
        this.icon.destroy(), 
        this.text.destroy()
    }, 
    e.exports = s
}