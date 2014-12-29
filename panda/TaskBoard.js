var game;
! function(a) {
    var b = function(b) {
        function c(c, d) {
            b.call(this, c, d, "task_board"), 
            this.showDuration = 400, 
            this.waitDelay = 2e3, 
            this.hideDuration = 400, 
            this.exists = !1, 
            this.visible = !1, 
            this._hideCompleteSignal = new Phaser.Signal, 
            this.x = a.Config.HALF_GAME_WIDTH, 
            this.initBack(), this.addLevelLabel(), 
            this.initText(), this.initFruitLabels()
        }
        return __extends(c, b), 
        c.prototype.initBack = function() {
            this.back = this.game.add.image(0, 0, "graphics_1", "TaskBoard_Back0000", this), 
            this.back.anchor.set(.5, .5)
        }, 
        c.prototype.addLevelLabel = function() {
            var b = a.Main.texts.level,
                c = {
                    font: "48px GrilledCheeseBTNToasted",
                    fill: "#FFFFFF",
                    align: "center"
                };
            this.levelLabel = this.game.add.text(0, -110, b, c, this), 
            this.levelLabel.anchor.set(.5, .5), 
            this.levelLabel.setShadow(2, 2, "#666666"), 
            this.add(this.levelLabel), 
            this.game.device.firefox && (this.levelLabel.y += 10)
        }, 
        c.prototype.initText = function() {
            var b = a.Main.texts.task_board,
                c = {
                    font: "32px GrilledCheeseBTNToasted",
                    fill: "#FFFFFF",
                    align: "center"
                };
            this.text = this.game.add.text(0, -15, b, c, this), 
            this.text.anchor.set(.5, .5), this.text.wordWrap = !0, 
            this.text.wordWrapWidth = .8 * this.back.width, this.text.setShadow(2, 2, "#666666"), 
            this.add(this.text), this.game.device.firefox === !1 ? this.text.lineSpacing = -5 : this.text.y += 10
        }, 
        c.prototype.initFruitLabels = function() {
            var b = 0,
                c = 80,
                d = 4;
            this.labelsGroup = this.game.add.group(this), 
            this.labels = [];
            for (var e = 0; d > e; e++) {
                var f = new a.FruitLabel(this.game, this.labelsGroup);
                f.position.set(b, 55),
                f.exists = !1, 
                this.labelsGroup.add(f), 
                this.labels.push(f), 
                b += c
            }
        }, 
        c.prototype.show = function(b, c) {
            this.game.sound.usingWebAudio && this.game.sound.play("whoosh", .33), 
            this.exists = !0, 
            this.visible = !0, 
            this.updateLevelLabel(c), 
            this.updateLabels(b), 
            this.position.y = a.Config.HALF_GAME_HEIGHT + 100, 
            this.alpha = 0, this.scale.set(0, 1), 
            this.game.add.tween(this.scale).to({
                x: 1
            }, this.showDuration, Phaser.Easing.Back.Out, !0), 

            this.game.add.tween(this).to({
                alpha: 1
            }, 200, Phaser.Easing.Linear.None, !0), 

            this.game.add.tween(this.position).to({
                y: a.Config.HALF_GAME_HEIGHT
            }, this.showDuration, Phaser.Easing.Back.Out, !0)
            .onComplete.addOnce(this.wait, this)
        }, 

        c.prototype.updateLevelLabel = function(b) {
            var c = a.Main.texts.level + " " + b.toString();
            this.levelLabel.setText(c)
        }, 

        c.prototype.updateLabels = function(a) {
            for (var b = 0; b < this.labels.length; b++) {
                var c = this.labels[b],
                    d = a.miniTasks[b];
                d ? (c.exists = !0, c.visible = !0, c.setMinitask(d)) : (c.exists = !1, c.visible = !1)
            }
            this.alignLabels()
        }, 

        c.prototype.alignLabels = function() {
            var a = 60,
                b = this.labels.reduce(function(a, b) {
                    return b.visible && a++, a
                }, 0),
                c = b * a,
                d = .5 * -c;
            this.labelsGroup.position.set(d, 30)
        }, 
        c.prototype.wait = function() {
            this.game.time.events.add(this.waitDelay, this.hide, this)
        }, 
        c.prototype.hide = function() {
            this.game.sound.usingWebAudio && this.game.sound.play("whoosh_out", .33), this.game.add.tween(this).to({
                alpha: 0
            }, 100, Phaser.Easing.Linear.None, !0, 300), this.game.add.tween(this.position).to({
                y: a.Config.HALF_GAME_HEIGHT - 100
            }, this.hideDuration, Phaser.Easing.Back.In, !0).onComplete.addOnce(this.onHideComplete, this)
        }, 
        c.prototype.onHideComplete = function() {
            this.exists = !1, this.visible = !1, this._hideCompleteSignal.dispatch()
        }, 
        c.prototype.destroy = function() {
            b.prototype.destroy.call(this, !0, !1), 
            this.labels = null, 
            this._hideCompleteSignal.dispose(), 
            this._hideCompleteSignal = null
        }, 
        Object.defineProperty(c.prototype, "hideCompleteSignal", {
            get: function() {
                return this._hideCompleteSignal
            },
            enumerable: !0,
            configurable: !0
        }), c
    }(Phaser.Group);
    a.TaskBoard = b
}(game || (game = {}));