/* =======levelgui ======*/
function(t, e) {
    var i = t("./simplebutton"),
        s = t("./levelcompleteboard"),
        n = t("./levelfailboard"),
        a = t("./pauseboard"),
        o = function(t, e) {
            Phaser.Group.call(this, t, t.world, "gui"), 

            this._pauseSignal = new Phaser.Signal, 
            this.levelSettings = e, 
            this.initLevelFailBoard(), 
            this.initLevelCompleteBoard(), 
            this.initButtons(), 
            this.addPauseBoard(), 

            Object.defineProperty(this, "pauseSignal", {
                get: function() {
                    return this._pauseSignal
                },
                enumerable: !0,
                configurable: !0
            })
        };
    o.prototype = Object.create(Phaser.Group.prototype), 
    o.prototype.constructor = o, 
    o.prototype.initButtons = function() {
        var t = this,
            e = 60;
        this.pauseButton = new i(this.game, this.game.width - 60, e, "buttonsgroup", 
            "pause.png"), 

        t.add(this.pauseButton);
        var s = 0;
        this.pauseButton.callback.add(function() {
            this.game.time.now > s && (
                t._pauseSignal.dispatch("pause"), 
                s = this.game.time.now + 1e3)
        }, this)
    }, 
    o.prototype.initLevelFailBoard = function() {
        this.levelFailBoard = new n(this.game, this, this.levelSettings.levelNumber), 
        this.levelFailBoard.visible = !1
    }, 
    o.prototype.onLevelFail = function() {
        this.pauseButton.visible = !1, 
        this.levelFailBoard.show()
    }, 
    o.prototype.initLevelCompleteBoard = function() {
        this.levelCompleteBoard = new s(this.game, this, this.levelSettings.levelNumber), 
        this.levelCompleteBoard.visible = !1
    }, 
    o.prototype.onLevelComplete = function() {
        this.pauseButton.visible = !1, this.levelCompleteBoard.show()
    }, 
    o.prototype.addPauseBoard = function() {
        var t = this;
        this.pauseBoard = new a(this.game, this), 
        this.pauseBoard.resumeButton.callback.add(function() {
            t._pauseSignal.dispatch("resume")
        }, this)
    }, 
    o.prototype.onPause = function() {
        this.pauseButton.inputEnabled = !1, 
        this.pauseButton.visible = !1, 
        this.pauseBoard.show()
    }, 
    o.prototype.onResume = function() {
        this.pauseBoard.hide(), 
        this.pauseButton.visible = !0, 
        this.pauseButton.inputEnabled = !0
    }, e.exports = o
}