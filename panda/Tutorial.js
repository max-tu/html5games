var game;
! function(a) {
    var b = function(b) {
        function c() {
            b.apply(this, arguments)
        }
        return __extends(c, b), c.prototype.create = function() {
            this.game.add.image(0, 0, "main_menu", "main_menu_bg"), 
            this.addBoard(), this.addButton(), 
            this.startAnimation()
        }, 
        c.prototype.addBoard = function() {
            this.board = new a.TutorialBoard(this.game, this.world), this.board.position.set(a.Config.HALF_GAME_WIDTH, 380)
        }, 
        c.prototype.addButton = function() {
            this.nextButton = new a.SimpleButton(this.game, a.Config.HALF_GAME_WIDTH, 730, "buttons", "Button_Resume0000"), 
            this.nextButton.callback.add(this.onNextButtonClick, this), this.world.add(this.nextButton)
        }, 
        c.prototype.onNextButtonClick = function() {
            var a = this;
            this.nextButton.input.enabled = !1, this.game.time.events.add(250, function() {
                a.nextButton.input.enabled = !0
            }, this), this.board.isLastFrame() ? this.hideAndStartGame() : this.board.gotoNextFrame()
        }, 
        c.prototype.hideAndStartGame = function() {
            a.Main.stats.setTutorialViewed(!0), this.game.changeState("Level")
        }, 
        c.prototype.startAnimation = function() {
            var a = 200,
                b = 400,
                c = 60;
            this.board.alpha = 0, 
            this.board.position.y -= c, 

            this.game.add.tween(this.board.position).to({
                y: this.board.position.y + c
            }, b, Phaser.Easing.Back.Out, !0, a), 

            this.game.add.tween(this.board).to({
                alpha: 1
            }, 200, Phaser.Easing.Linear.None, !0, a), 
            
            this.nextButton.position.y += c, 
            this.nextButton.alpha = 0, 

            this.game.add.tween(this.nextButton.position).to({
                y: this.nextButton.position.y - c
            }, b, Phaser.Easing.Back.Out, !0, a), 

            this.game.add.tween(this.nextButton).to({
                alpha: 1
            }, 200, Phaser.Easing.Linear.None, !0, a)
        }, c
    }(Phaser.State);
    a.Tutorial = b
}(game || (game = {})), 