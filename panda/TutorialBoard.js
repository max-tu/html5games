var game;
! function(a) {
    var b = function(b) {
        function c(c, d) {
            b.call(this, c, d), 
            this.currentFrame = null, 
            this.tutorialTexts = a.Main.texts.tutorial,
             this.initBack(), 
             this.initFrames(), 
             this.initText(), 
             this.currentFrame = this.frames[0], 
             this.currentFrame.exists = !0, 
             this.currentFrame.visible = !0, this.updateText()
        }
        return __extends(c, b), 
        c.prototype.initBack = function() {
            this.back = this.game.add.image(0, 0, "tutorial", "Tutorial_Board0000", this), t
            his.back.anchor.set(.5, .5)
        }, 
        c.prototype.initFrames = function() {
            this.frames = [];
            for (var a = 1; 4 >= a; a++) {
                var b = "Tutorial_" + a.toString() + "0000",
                    c = this.game.add.image(0, -70, "tutorial", b, this);
                c.visible = !1, 
                c.exists = !1, 
                c.anchor.set(.5, .5), 
                this.add(c), 
                this.frames.push(c)
            }
        }, 
        c.prototype.initText = function() {
            var a = {
                font: "34px GrilledCheeseBTNToasted",
                fill: "#FFFFFF",
                align: "center"
            };
            this.text = new Phaser.Text(this.game, 0, 130, "", a), 
            this.text.anchor.set(.5, .5), this.text.setShadow(2, 2, "#666666", 2), 
            this.text.wordWrap = !0, this.text.wordWrapWidth = .7 * this.back.width, 
            this.add(this.text)
        }, 
        c.prototype.isLastFrame = function() {
            var a = this.frames.indexOf(this.currentFrame);
            return a >= this.frames.length - 1
        }, 
        c.prototype.gotoNextFrame = function() {
            this.hideCurrentFrame()
        }, 
        c.prototype.hideCurrentFrame = function() {
            this.game.add.tween(this.currentFrame).to({
                alpha: 0
            }, 200, Phaser.Easing.Linear.None, !0), 

            this.game.add.tween(this.text).to({
                alpha: 0
            }, 200, Phaser.Easing.Linear.None, !0)
            .onComplete.addOnce(this.onCurrentFrameHideComplete, this)
        }, 
        c.prototype.onCurrentFrameHideComplete = function() {
            this.currentFrame.exists = !1, 
            this.currentFrame.visible = !1, 
            this.setNewFrame(), 
            this.updateText(), 
            this.showNewFrame()
        }, 
        c.prototype.setNewFrame = function() {
            var a = this.frames.indexOf(this.currentFrame),
                b = a + 1,
                c = this.frames[b];
            c.exists = !0, c.visible = !0, 
            c.alpha = 0, 
            this.currentFrame = c
        }, 
        c.prototype.updateText = function() {
            var a = this.frames.indexOf(this.currentFrame),
                b = this.tutorialTexts[a];
            this.text.setText(b)
        }, 
        c.prototype.showNewFrame = function() {
            this.game.add.tween(this.currentFrame).to({
                alpha: 1
            }, 200, Phaser.Easing.Linear.None, !0), 
            this.game.add.tween(this.text).to({
                alpha: 1
            }, 200, Phaser.Easing.Linear.None, !0)
        }, 
        c.prototype.destroy = function() {
            b.prototype.destroy.call(this, !0, !1), 
            this.tutorialTexts = null, 
            this.frames = null, 
            this.currentFrame = null
        }, c
    }(Phaser.Group);
    a.TutorialBoard = b
}(game || (game = {}));