var game;
! function(a) {
    var b = function(b) {
        function c(c, d) {
            b.call(this, c, d), this.backHillsSpeed = 0, 
            this.backHillsOffset = -2, this.frontHillsSpeed = 0, 
            this.frontHillsOffset = -2, this.sandScrollSpeed = 0, 
            this.sandsOffset = -12, this.initHills(), 
            this.initSands(), 
            a.Main.weakDevice === !1 && this.initLight()
        }
        return __extends(c, b), 
        c.prototype.initHills = function() {
            var a = 200;
            this.backHills1 = this.game.add.image(0, a, "level_graphics", "Hills_Top_Layer0000", this), 
            this.backHills2 = this.game.add.image(this.backHills1.x + this.backHills1.width + this.backHillsOffset, a, 
                "level_graphics", "Hills_Top_Layer0000", this);

            var b = 355;
            this.frontHills1 = this.game.add.image(0, b, "level_graphics", "Hills_Bottom_Layer0000", this), 
            this.frontHills2 = this.game.add.image(this.frontHills1.x + this.frontHills1.width + this.frontHillsOffset, 
                b, "level_graphics", "Hills_Bottom_Layer0000", this)
        }, 
        c.prototype.initSands = function() {
            this.sand1 = this.game.add.image(-4, 0, "level_graphics", "Sand_Layer0000", this), this.sand2 = this.game.add.image(this.sand1.x + this.sand1.width + this.sandsOffset, 0, "level_graphics", "Sand_Layer0000", this);
            var b = 45;
            this.sand1.y = a.Config.GAME_HEIGHT - this.sand1.height + b, this.sand2.y = a.Config.GAME_HEIGHT - this.sand2.height + b
        }, 
        c.prototype.initLight = function() {
            this.topLight = this.game.add.image(0, 0, "level_graphics", "Light_Layer0000", this)
        }, 
        c.prototype.scroll = function(a) {
            this.sandScrollSpeed = .8 * a, 
            this.frontHillsSpeed = .6 * a, 
            this.backHillsSpeed = .4 * a, 
            this.scrollHills(), 
            this.scrollSand()
        }, 
        c.prototype.scrollHills = function() {
            this.backHills1.x -= this.backHillsSpeed, 
            this.backHills2.x -= this.backHillsSpeed, 
            this.backHills1.x < -this.backHills1.width && (this.backHills1.x = this.backHills2.x + this.backHills2.width + this.backHillsOffset), 
            this.backHills2.x < -this.backHills2.width && (this.backHills2.x = this.backHills1.x + this.backHills1.width + this.backHillsOffset), 
            this.frontHills1.x -= this.frontHillsSpeed, 
            this.frontHills2.x -= this.frontHillsSpeed, 
            this.frontHills1.x < -this.frontHills1.width && (this.frontHills1.x = this.frontHills2.x + this.frontHills2.width + this.frontHillsOffset),
             this.frontHills2.x < -this.frontHills2.width && (this.frontHills2.x = this.frontHills1.x + this.frontHills1.width + this.frontHillsOffset)
        }, 
        c.prototype.scrollSand = function() {
            this.sand1.x -= this.sandScrollSpeed, 
            this.sand2.x -= this.sandScrollSpeed, 
            this.sand1.x < -this.sand1.width && (this.sand1.x = this.sand2.x + this.sand2.width + this.sandsOffset), 
            this.sand2.x < -this.sand2.width && (this.sand2.x = this.sand1.x + this.sand1.width + this.sandsOffset)
        }, c
    }(Phaser.SpriteBatch);
    a.Background = b
}(game || (game = {}));