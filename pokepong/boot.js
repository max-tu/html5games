/* =======boot ======*/
        function(t, e) {
            "use strict";

            function i() {}
            i.prototype = {
                init: function() {
                    this.stage.disableVisibilityChange = !0, this.game.add.text(100, 100, "Please reload it...")
                },
                preload: function() {
                    this.load.image("LoadingBar_Outer", "assets/LoadingBar_Outer.png"), this.load.image("LoadingBar_Inner", "assets/LoadingBar_Inner.png")
                },
                create: function() {
                    this.setupStage(), this.game.input.maxPointers = 1, this.game.state.start("preload")
                },
                setupStage: function() {
                    var t = this.game.scale;
                    t.scaleMode = Phaser.ScaleManager.SHOW_ALL, t.pageAlignHorizontally = !0, t.pageAlignVertically = !0, t.enterIncorrectOrientation.add(this.onEnterIncorrectOrientation, this), t.leaveIncorrectOrientation.add(this.onLeaveIncorrectOrientation, this), t.setScreenSize(!0), this.stage.backgroundColor = 11193204
                },
                onEnterIncorrectOrientation: function() {
                    document.getElementById("orientation").style.display = "block", document.body.style.marginBottom = "0px"
                },
                onLeaveIncorrectOrientation: function() {
                    document.getElementById("orientation").style.display = "none", document.body.style.marginBottom = "100px"
                }
            }, e.exports = i
        }