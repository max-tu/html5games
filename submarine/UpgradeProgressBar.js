var game;
! function(a) {
    var b = function(a) {
        function b(b, c) {
            a.call(this, b, c, "upgrade_progress_bar"), 
            this.back = this.game.add.image(0, 0, "upgrades", "Upgrade_ProgressBack0000", this), 
            this.back.anchor.set(.5, .5), this.initSteps()
        }
        return __extends(b, a), 
        b.prototype.initSteps = function() {
            this.steps = [];
            for (var a = .5 * -this.back.width + 25, b = 0, c = 50, d = 1; 4 > d; d++) {
                var e = "Upgrade_Progress_Step" + d.toString() + "0000",
                    f = this.game.add.image(a, b, "upgrades", e);
                f.anchor.set(.5, .5), f.visible = !1, a += c, this.steps.push(f), this.add(f)
            }
        }, 
        b.prototype.updateBar = function(a) {
            for (var b = this.steps.length, c = 0; b > c; c++) {
                var d = this.steps[c];
                a > c ? d.visible === !1 && (d.scale.set(0, 0), d.visible = !0, this.game.add.tween(d.scale).to({
                    x: 1,
                    y: 1
                }, 200, Phaser.Easing.Back.Out, !0)) : d.visible = !1
            }
        },
        b.prototype.destroy = function() {
            this.steps = null, this.back = null
        }, b
    }(Phaser.SpriteBatch);
    a.UpgradeProgressBar = b
}(game || (game = {}));