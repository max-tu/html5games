var game;
! function(a) {
    var b = function(b) {
        function c() {
            b.apply(this, arguments)
        }
        return __extends(c, b), c.prototype.init = function() {
            this.game.device.android && !this.game.device.chrome && (this.game.canvas.parentElement.style.overflow = "visible");
            var a = {
                font: "45px GrilledCheeseBTNToasted",
                fill: "#FFFFFF",
                align: "center"
            }, b = this.add.text(0, 0, "0", a);
            b.setText("Loading..."), b.destroy()
        }, 
        c.prototype.preload = function() {
            this.load.image("rotate", "assets/graphics/rotate-phone.png"), 
            this.load.image("preloader_back", "assets/graphics/Preloader_Outer.png"), 
            this.load.image("preloader_front", "assets/graphics/Preloader_Inner.png")
        }, 
        c.prototype.create = function() {
            this.setupStage(), 
            this.detectWeakDevice(), 
            this.addFPSMeter(), 
            this.input.maxPointers = 1, 
            this.game.state.start("Preloader", !0, !1)
        }, 
        c.prototype.setupStage = function() {
            var b = this.game.scale;
            b.scaleMode = Phaser.ScaleManager.SHOW_ALL, 
            b.minWidth = .25 * a.Config.GAME_WIDTH, 
            b.minHeight = .25 * a.Config.GAME_HEIGHT, 
            b.aspectRatio = a.Config.GAME_WIDTH / a.Config.GAME_HEIGHT, 
            b.pageAlignHorizontally = !0, 
            b.pageAlignVertically = !0, 
            this.game.device.desktop || b.forceOrientation(!0, !1), 
                b.enterIncorrectOrientation.add(this.onEnterIncorrectOrientation, this), 
                b.leaveIncorrectOrientation.add(this.onLeaveIncorrectOrientation, this), 
            b.setScreenSize(!0), 
            this.stage.disableVisibilityChange = !0,
             this.stage.backgroundColor = 9755102
        }, 
        c.prototype.detectWeakDevice = function() {
            var b = !1;
            if (this.game.device.desktop === !1) {
                var c = detect.parse(window.navigator.userAgent);
                this.game.device.iOS && (c.os.major < 7 && (b = !0), 
                    c.browser.family.indexOf("Chrome") > -1 && (b = !0), 
                    this.game.device.webApp && (b = !0)), 
                this.game.device.android && (c.browser.family.indexOf("Android") > -1 && (b = !0),
                 c.browser.family.indexOf("Chrome Mobile") > -1 && c.browser.major <= 18 && (b = !0)), 
                this.game.device.windowsPhone && c.browser.family.indexOf("IE") > -1 && (b = c.browser.major < 10)
            }
            a.Main.weakDevice = b
        }, 
        c.prototype.addFPSMeter = function() {
            if (a.Main.development) {
                var b = new utils.FPSMeter(this.game, 0, a.Config.GAME_HEIGHT - 22);
                b.position.set(0, a.Config.GAME_HEIGHT - 22)
            }
        }, 
        c.prototype.onEnterIncorrectOrientation = function() {
            document.getElementById("orientation").style.display = "block", document.body.style.marginBottom = "0px"
        }, 
        c.prototype.onLeaveIncorrectOrientation = function() {
            document.getElementById("orientation").style.display = "none", document.body.style.marginBottom = "100px", 
            this.game.device.android && !this.game.device.chrome && this.game.scale.setScreenSize(!0)
        }, 
        c.prototype.render = function() {}, c
    }(Phaser.State);
    a.Boot = b
}(game || (game = {}));