var OBJ_COIN = 0;
var OBJ_RUBY = 1;
var OBJ_STARFISH = 2;
var OBJ_SQUID = 3;
var OBJ_STINGRAY = 4;
var OBJ_MINE = 5;
var OBJ_TREASURE = 6;
var GAMEOBJ_SPEED = 2;
var GameObj = function(e, t, n) {
    Phaser.Sprite.call(this, e, t, n, "gameobjs");
    this.anchor.set(.5, .5);
    this.ObjType = 0;
    this.MoveType = 0;
    this.xSpeed = 0;
    this.ySpeed = 0;
    this.xPivot = 0;
    this.yPivot = 0;
    this.Radius = null;
    this.Angle = null;
    e.physics.enable(this, Phaser.Physics.ARCADE);
    this.animations.add("coin", [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
    this.animations.add("ruby", [8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 13, 12, 10, 9], 10, true);
    this.animations.add("starfish", [16, 17, 18, 19, 20, 21, 22, 23], 10, true);
    this.animations.add("squid", [24, 25, 26, 27, 28, 29, 30, 31], 10, true);
    this.animations.add("stingray", [32, 33, 34, 35, 36, 37, 38, 39, 39, 38, 37, 36, 35, 34, 33, 32], 10, true);
    this.animations.add("mine", [40, 41, 42, 43, 44, 45, 46, 47], 15, true);
    this.animations.add("treasure", [63], 10, true)
};
GameObj.prototype = Object.create(Phaser.Sprite.prototype);
GameObj.prototype.constructor = GameObj;
GameObj.prototype.init = function(e, t, n, r, i, s, o) {
    this.reset(t, n);
    this.MoveType = 0;
    this.xSpeed = 0;
    this.ySpeed = 0;
    this.xPivot = 0;
    this.yPivot = 0;
    this.Radius = null;
    this.Angle = null;
    this.body.enable = true;
    this.animations.stop(null, true);
    if (CHEAT_RUBY == true) {
        if (e == "coin") {
            e = "ruby"
        } else if (e == "ruby") {
            e = "coin"
        }
    }
    switch (e) {
        case "ruby":
            this.ObjType = OBJ_RUBY;
            this.play("ruby", 15, true, false);
            break;
        case "star":
            this.ObjType = OBJ_STARFISH;
            this.play("starfish", 15, true, false);
            break;
        case "stingray":
            this.ObjType = OBJ_STINGRAY;
            this.play("stingray", 15, true, false);
            break;
        case "squid":
            this.ObjType = OBJ_SQUID;
            this.play("squid", 15, true, false);
            break;
        case "mine":
            this.ObjType = OBJ_MINE;
            this.play("mine", 15, true, false);
            break;
        case "treasure":
            this.ObjType = OBJ_TREASURE;
            this.play("treasure", 15, true, false);
            break;
        default:
            this.ObjType = OBJ_COIN;
            this.play("coin", 15, true, false);
            break
    }
    this.animations.next(o);
    switch (r) {
        case "rand":
            this.MoveType = 1;
            this.xSpeed = GAMEOBJ_SPEED;
            this.ySpeed = GAMEOBJ_SPEED;
            break;
        case "horz":
            this.MoveType = 2;
            this.xSpeed = GAMEOBJ_SPEED;
            break;
        case "vert":
            this.MoveType = 3;
            this.ySpeed = GAMEOBJ_SPEED;
            break;
        case "circ":
            this.MoveType = 4;
            this.xPivot = this.x;
            this.yPivot = this.y;
            this.Radius = i;
            this.Angle = s;
            break;
        case "cirh":
            this.MoveType = 5;
            this.xPivot = this.x;
            this.Radius = i;
            this.Angle = s;
            break;
        case "cirv":
            this.MoveType = 6;
            this.yPivot = this.y;
            this.Radius = i;
            this.Angle = s;
            break;
        default:
            this.MoveType = 0;
            break
    }
};
GameObj.prototype.update = function() {
    if (GLOBAL_PAUSE_FLAG == false) {
        if (this.alive) {
            if (uboat._levelstate == STATE_PLAYING) {
                this.y = this.y + SCROLL_SPEED;
                this.yPivot = this.yPivot + SCROLL_SPEED
            }
            switch (this.MoveType) {
                case 1:
                    this.x = this.x + this.xSpeed;
                    this.y = this.y + this.ySpeed;
                    break;
                case 2:
                    this.x = this.x + this.xSpeed;
                    break;
                case 3:
                    this.y = this.y + this.ySpeed;
                    break;
                case 4:
                    this.x = this.xPivot + Math.cos(2 * Math.PI * this.Angle / 360) * this.Radius;
                    this.y = this.yPivot + Math.sin(2 * Math.PI * this.Angle / 360) * this.Radius;
                    break;
                case 5:
                    this.x = this.xPivot + Math.cos(2 * Math.PI * this.Angle / 360) * this.Radius;
                    break;
                case 6:
                    this.y = this.yPivot + Math.sin(2 * Math.PI * this.Angle / 360) * this.Radius;
                    break
            }
            if (this.MoveType > 0) {
                if (this.MoveType < 4) {
                    if (this.x < 0 || this.x > 640 - 64) {
                        this.xSpeed = -1 * this.xSpeed
                    }
                    if (this.y < 0 || this.y > 960 - 64) {
                        this.ySpeed = -1 * this.ySpeed
                    }
                } else {
                    this.Angle = this.Angle + .5
                }
            }
        }
    }
};