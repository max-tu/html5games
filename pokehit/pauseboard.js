/*14 - pauseboard*/
function(t, e) {
    var i = t("./simplebutton"),
        s = t("./togglebutton"),
        n = function(t, e) {
            Phaser.Group.call(this, t, e, "Pause Board"), this.addBackGround(), this.board = this.game.add.image(0, 0, "bggroup", "creditbg.png", this), this.board.position.set(this.game.width / 2 - this.board.width / 2, this.game.height / 2 - this.board.height / 2), this.initText(), this.addButtons(), this.exists = !1, this.visible = !1, Object.defineProperty(this, "resumeButton", {
                get: function() {
                    return this._resumeButton
                },
                enumerable: !0,
                configurable: !0
            })
        };
    n.prototype = Object.create(Phaser.Group.prototype), n.prototype.constructor = n, n.prototype.addBackGround = function() {
        var t = this.game.add.graphics(0, 0, this);
        t.beginFill(0, .5), t.drawRect(0, 0, this.game.width, this.game.height), t.endFill()
    }, n.prototype.initText = function() {
        var t = "Game Paused",
            e = {
                font: "56px font",
                fill: "#FBAF05",
                align: "center",
                stroke: "#FFFFFF",
                strokeThickness: 12
            }, i = new Phaser.Text(this.game, this.game.width / 2, this.game.height / 2 - 100, t, e);
        i.anchor.set(.5, .5), i.setShadow(2, 2, "#FB1A05", 2), this.add(i)
    }, n.prototype.addButtons = function() {
        var t = this,
            e = this.game.height / 2,
            n = 120;
        this.menuBtn = new i(this.game, this.game.width / 2, e, "buttonsgroup", "menu.png"), this.menuBtn.callback.add(function() {
            t.menuBtn.inputEnabled = !1, t.game.state.start("levelsmenu")
        }), this.soundBtn = new s(this.game, this.menuBtn.x - n, e, "buttonsgroup", "sound.png", "mute.png"), this.soundBtn.callback.add(function() {
            t.game.sound.mute = !t.game.sound.mute
        }), this.game.sound.mute && this.soundBtn.switchTextures(), this._resumeButton = new i(this.game, this.menuBtn.x + n + .25, e, "buttonsgroup", "restart.png"), this.buttons = [this.menuBtn, this.soundBtn, this._resumeButton], this.buttons.forEach(function(e) {
            t.add(e)
        })
    }, n.prototype.show = function() {
        this.exists = !0, this.visible = !0, this.alpha = 0, this.board.y -= 200, this.game.add.tween(this).to({
            alpha: 1
        }, 200, Phaser.Easing.Linear.None, !0), this.game.add.tween(this.board).to({
            y: 200
        }, 500, Phaser.Easing.Back.Out, !0).onComplete.addOnce(this.onShowComplete, this);
        var t = this,
            e = 500,
            i = e;
        this.buttons.forEach(function(s) {
            s.y -= 200, s.visible = !1, t.game.add.tween(s).to({
                y: s.y + 200
            }, e, Phaser.Easing.Back.Out, !0, i).onStart.addOnce(function() {
                s.visible = !0
            }, t), i += 100
        })
    }, n.prototype.onShowComplete = function() {}, n.prototype.hide = function() {
        this.game.add.tween(this).to({
            alpha: 0
        }, 100, Phaser.Easing.Linear.None, !0, 400), this.game.add.tween(this.board).to({
            y: 500
        }, 500, Phaser.Easing.Back.In, !0).onComplete.addOnce(this.onHideComplete, this)
    }, n.prototype.onHideComplete = function() {
        this.exists = !1, this.visible = !1
    }, e.exports = n
}