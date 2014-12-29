var MOVE_CIRCLE_RADIUS = 80;
var MOVE_SPEED = 3;
var HIT_SPR_DIAMETER = 24;
var MARGIN_TOPBOTTOM = 40;
var PRECALC_SPEED = 4.189;
var Submarine = function(e) {
    Phaser.Sprite.call(this, e, 320, 480, "submarine");
    this.anchor.set(.5, .5);
    this.game = e;
    this.x = 320;
    this.y = 240;
    this.moveAngle = 0;
    this.moveAngleNormal = -90;
    this.moveAngleStep = MOVE_SPEED;
    this.pivotX = this.x;
    this.pivotY = this.y - MOVE_CIRCLE_RADIUS;
    this.electroCount = 0;
    this.slowdownCount = 0;
    this.emitBubble = e.add.emitter(0, 0, 10);
    this.emitBubble.makeParticles("particles", [2]);
    this.emitBubble.setXSpeed(0, 0);
    this.emitBubble.setYSpeed(0, 0);
    this.emitBubble.setRotation(0, 0);
    this.emitBubble.setScale(1, .1, 1, .1, 2e3, Phaser.Easing.None);
    this.emitBubble.gravity = -50;
    this.emitBubble.start(false, 800, 200);
    this.mirror = e.add.sprite(0, 0, "submarine");
    this.mirror.anchor.set(.5, .5);
    this.hitGroup = e.add.group();
    this.hitGroup.enableBody = true;
    this.hitGroup.physicsBodyType = Phaser.Physics.ARCADE;
    for (var t = 0; t < 3; t++) {
        var n = e.add.sprite(0, 0, null, 0, this.hitGroup);
        n.body.setSize(32, 32);
        n.anchor.setTo(.5, .5)
    }
    this.events.onKilled.add(this.onKilled, this);
    this.events.onRevived.add(this.onRevived, this)
};
Submarine.prototype = Object.create(Phaser.Sprite.prototype);
Submarine.prototype.constructor = Submarine;
Submarine.prototype.onKilled = function() {
    this.mirror.kill();
    this.emitBubble.on = false;
    for (var e = 0; e < 3; e++) {
        this.hitGroup.children[e].kill()
    }
};
Submarine.prototype.onRevived = function() {
    this.x = 320;
    this.y = 240;
    this.moveAngle = 270;
    this.moveAngleNormal = +90;
    this.moveAngleStep = -1 * MOVE_SPEED;
    this.pivotX = this.x;
    this.pivotY = this.y + MOVE_CIRCLE_RADIUS;
    this.electroCount = 0;
    this.slowdownCount = 0;
    this.mirror.revive();
    this.emitBubble.on = true;
    for (var e = 0; e < 3; e++) {
        this.hitGroup.children[e].reset(this.x, this.y);
        this.hitGroup.children[e].revive()
    }
    this.update()
};
Submarine.prototype.doTap = function() {
    this.pivotX = this.pivotX + Math.cos(2 * Math.PI * this.moveAngle / 360) * MOVE_CIRCLE_RADIUS * 2;
    this.pivotY = this.pivotY + Math.sin(2 * Math.PI * this.moveAngle / 360) * MOVE_CIRCLE_RADIUS * 2;
    if (this.pivotX > 640) {
        this.pivotX = this.pivotX -= 640
    }
    if (this.pivotX < 0) {
        this.pivotX = this.pivotX += 640
    }
    this.moveAngle = this.moveAngle + 180;
    this.moveAngleStep = -1 * this.moveAngleStep;
    if (this.moveAngleStep > 0) {
        this.moveAngleNormal = -90
    } else {
        this.moveAngleNormal = 90
    }
};
Submarine.prototype.update = function() {
    if (GLOBAL_PAUSE_FLAG == false) {
        if (this.alive) {
            var e = false;
            var t;
            var n;
            if (this.electroCount > 0) {
                e = true;
                if (this.electroCount < 104) {
                    if (this.moveAngleStep > 0) {
                        t = Math.cos(2 * Math.PI * (this.moveAngle + 90) / 360) * PRECALC_SPEED;
                        n = Math.sin(2 * Math.PI * (this.moveAngle + 90) / 360) * PRECALC_SPEED
                    } else {
                        t = Math.cos(2 * Math.PI * (this.moveAngle + 270) / 360) * PRECALC_SPEED;
                        n = Math.sin(2 * Math.PI * (this.moveAngle + 270) / 360) * PRECALC_SPEED
                    }
                    this.x += t;
                    this.y += n;
                    this.pivotX += t;
                    this.pivotY += n
                }
                this.electroCount -= 1
            }
            if (this.slowdownCount > 0) {
                this.slowdownCount -= 1;
                e = this.slowdownCount % 4 != 0
            }
            if (e == false) {
                this.moveAngle += this.moveAngleStep;
                if (this.moveAngle < 0) {
                    this.moveAngle += 360
                }
                if (this.moveAngle >= 360) {
                    this.moveAngle -= 360
                }
                this.x = this.pivotX + Math.cos(2 * Math.PI * this.moveAngle / 360) * MOVE_CIRCLE_RADIUS;
                this.y = this.pivotY + Math.sin(2 * Math.PI * this.moveAngle / 360) * MOVE_CIRCLE_RADIUS;
                this.rotation = 2 * Math.PI * ((this.moveAngle + this.moveAngleNormal) / 360)
            }
            if (this.x > 640) {
                this.x = this.x -= 640
            }
            if (this.x < 0) {
                this.x = this.x += 640
            }
            if (this.y > 960 - MARGIN_TOPBOTTOM) {
                this.pivotY = this.pivotY - (this.y - 960 + MARGIN_TOPBOTTOM);
                this.y = 960 - MARGIN_TOPBOTTOM
            }
            if (this.y < MARGIN_TOPBOTTOM) {
                this.pivotY = this.pivotY + (MARGIN_TOPBOTTOM - this.y);
                this.y = MARGIN_TOPBOTTOM
            }
            if (this.x > 320) {
                this.mirror.x = this.x - 640
            } else {
                this.mirror.x = this.x + 640
            }
            this.mirror.y = this.y;
            this.mirror.rotation = this.rotation;
            this.hitGroup.children[0].x = this.x + Math.cos(2 * Math.PI * this.angle / 360) * HIT_SPR_DIAMETER * 2;
            this.hitGroup.children[0].y = this.y + Math.sin(2 * Math.PI * this.angle / 360) * HIT_SPR_DIAMETER * 2;
            this.hitGroup.children[1].x = this.x;
            this.hitGroup.children[1].y = this.y;
            this.hitGroup.children[2].x = this.x + Math.cos(2 * Math.PI * (this.angle + 180) / 360) * HIT_SPR_DIAMETER * 2;
            this.hitGroup.children[2].y = this.y + Math.sin(2 * Math.PI * (this.angle + 180) / 360) * HIT_SPR_DIAMETER * 2;
            for (var r = 0; r < 3; r++) {
                if (this.hitGroup.children[r].x > 640) {
                    this.hitGroup.children[r].x = this.hitGroup.children[r].x -= 640
                }
                if (this.hitGroup.children[r].x < 0) {
                    this.hitGroup.children[r].x = this.hitGroup.children[r].x += 640
                }
            }
            this.emitBubble.x = this.hitGroup.children[0].x;
            this.emitBubble.y = this.hitGroup.children[0].y
        }
    }
};