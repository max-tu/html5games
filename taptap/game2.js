
uboat.Game = function(e) {

};
uboat.Game.prototype = {
    
    spawnLevelPart: function() {
        if (this._partsIndex > LevelData[this._levelIndex].parts.length - 1) {
            uboat._levelstate = STATE_ATBOTTOM;
            return
        }
        var e = LevelData[this._levelIndex].parts[this._partsIndex].objs;
        for (var t = 0; t < e.length; t++) {
            var n = e[t].x;
            var r = e[t].y + this._partsBar;
            var i = this._objGroup.getFirstDead();
            if (i === null) {
                i = new GameObj(this.game, n, r);
                this._objGroup.add(i)
            }
            i.init(e[t].objname, n, r, e[t].movetype, e[t].radius, e[t].angle, t % 8);
            i.revive()
        }
        this._partsBar = this._partsBar + LevelData[this._levelIndex].parts[this._partsIndex].ysize;
        this._partsIndex++
    },
    playerHitsObj: function(e, t) {
        if (!t.body.enable) {
            return false
        }
        switch (t.ObjType) {
            case OBJ_COIN:
                this.soundCoin.play();
                this._collectedCoins++;
                this.doParticleEffect(t.x, t.y, t.ObjType);
                break;
            case OBJ_RUBY:
                this.soundRuby.play();
                this._collectedRuby++;
                this.doParticleEffect(t.x, t.y, t.ObjType);
                break;
            case OBJ_TREASURE:
                this.soundTreasure.play();
                this._collectedTreasure++;
                this.doParticleEffect(t.x, t.y, t.ObjType);
                this.checkGameWin();
                break;
            case OBJ_STARFISH:
                this._player.slowdownCount = 15;
                break;
            case OBJ_STINGRAY:
                this.soundFizzle.play();
                this._player.electroCount = 120;
                this.addExplosion(this._player.x, this._player.y, EXPL_ELECTRO);
                break;
            case OBJ_SQUID:
                this.soundSquid.play();
                for (var n = 0; n < 15; n++) {
                    this.game.time.events.add(n * 40, function() {
                        this.addExplosion(this._player.x, this._player.y, EXPL_INK)
                    }, this)
                }
                this.doParticleEffect(this._player.x, this._player.y, t.ObjType);
                break;
            case OBJ_MINE:
                this.addExplosion(t.x, t.y, EXPL_MINE);
                if (CHEAT_INVINCIBLE == false) {
                    this.soundExplode.play();
                    this.doParticleEffect(this._player.x, this._player.y, t.ObjType);
                    this.game.time.events.add(120, function() {
                        this.addExplosion(this._player.x, this._player.y, EXPL_MINE)
                    }, this);
                    this.game.time.events.add(240, function() {
                        this.addExplosion(t.x - 32, t.y - 32, EXPL_MINE)
                    }, this);
                    this.game.time.events.add(360, function() {
                        this.addExplosion(t.x + 32, t.y + 32, EXPL_MINE)
                    }, this);
                    this._player.kill();
                    if (this._levelGameOver == 0) {
                        this._levelGameOver = -1;
                        this.game.time.events.add(1e3, function() {
                            this.showGameOverPanel(true)
                        }, this)
                    }
                    this._btnPause.y -= 960
                }
                break
        }
        if (t.ObjType == OBJ_STARFISH || t.ObjType == OBJ_STINGRAY || t.ObjType == OBJ_SQUID) {
            var r = 4;
            var i = 400;
            if (t.ObjType == OBJ_STARFISH) {
                r = 1;
                i = 800
            }
            if (t.ObjType == OBJ_STARFISH) {
                r = 1;
                i = 800
            }
            var s = t.x - r * (e.x - t.x);
            var o = t.y - r * (e.y - t.y);
            t.body.enable = false;
            var u = this.game.add.tween(t).to({
                x: s,
                y: o
            }, i, Phaser.Easing.Linear.None, true);
            u.onComplete.add(function() {
                t.kill()
            }, this)
        } else {
            t.kill()
        }
    },
    onLevelWin: function() {},
    doPopupText: function(e, t, n) {
        e.text = t;
        e.makeCentered(320);
        e.y = n;
        e.alpha = 1;
        this.game.add.tween(e).to({
            y: n - 80,
            alpha: 0
        }, 300, Phaser.Easing.Linear.None, true, 300)
    },
    displayGameOverText: function(e, t) {},
    addExplosion: function(e, t, n) {
        if (n == EXPL_INK) {
            e = e + this.game.rnd.integerInRange(-100, 100);
            t = t + this.game.rnd.integerInRange(-100, 100)
        }
        var r = 1;
        if (e > 640 - 80) {
            r = 2;
            e = e - 640
        }
        if (e < 80) {
            r = 2
        }
        for (var i = 0; i < r; i++) {
            var s = this._explosionGroup.getFirstExists(false);
            if (s === null) {
                var s = this._explosionGroup.create(0, 0, "explosions", null, false);
                s.anchor.setTo(.5, .5);
                s.animations.add("explode", [0, 1, 1, 2, 3, 4, 5, 6, 7], 5, true);
                s.animations.add("expl_ink", [9, 11, 13, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 
                    15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15], 5, true);
                s.animations.add("expl_elec", [16, 17, 18, 19, 17, 16, 19, 18, 16, 17, 18, 19, 17, 16, 19, 18], 5, true)
            }
            s.reset(e, t);
            if (n == EXPL_MINE) {
                s.play("explode", 30, false, true)
            }
            if (n == EXPL_INK) {
                s.play("expl_ink", 30, false, true)
            }
            if (n == EXPL_ELECTRO) {
                s.play("expl_elec", 60, false, true)
            }
            e = e + 640
        }
    },
    doParticleEffect: function(e, t, n) {
        switch (n) {
            case OBJ_COIN:
                this.emitCoin.x = e;
                this.emitCoin.y = t;
                this.doParticlesCircle(this.emitCoin, 200, 400, 8);
                break;
            case OBJ_RUBY:
            case OBJ_TREASURE:
                this.emitCoin.x = e;
                this.emitCoin.y = t;
                this.doParticlesCircle(this.emitCoin, 300, 800, 12);
                this.doParticlesCircle(this.emitCoin, 400, 800, 8);
                break;
            case OBJ_SQUID:
                for (var r = 0; r < 6; r++) {
                    this.emitInkblob.x = e + this.game.rnd.integerInRange(-240, 240);
                    this.emitInkblob.y = t + this.game.rnd.integerInRange(-240, 240);
                    var i = 1200 + this.game.rnd.integerInRange(-800, 800);
                    this.emitInkblob.start(true, i, null, 1);
                    this.emitInkblob.update()
                }
                break;
            case OBJ_MINE:
                this.emitExplode.x = e;
                this.emitExplode.y = t;
                var s;
                var o;
                if (this._player.moveAngleStep > 0) {
                    s = Math.cos(2 * Math.PI * (this._player.moveAngle + 90) / 360) * PRECALC_SPEED * 40;
                    o = Math.sin(2 * Math.PI * (this._player.moveAngle + 90) / 360) * PRECALC_SPEED * 40
                } else {
                    s = Math.cos(2 * Math.PI * (this._player.moveAngle + 270) / 360) * PRECALC_SPEED * 40;
                    o = Math.sin(2 * Math.PI * (this._player.moveAngle + 270) / 360) * PRECALC_SPEED * 40
                }
                this.emitExplode.setXSpeed(s - 120, s + 120);
                this.emitExplode.setYSpeed(o - 120, o + 120);
                this.emitExplode.start(true, 800, null, 16);
                break
        }
    },
    doParticlesCircle: function(e, t, n, r) {
        var i = Math.round(360 / r);
        for (var s = 0; s < 360; s = s + i) {
            var o = Math.cos(2 * Math.PI * s / 360) * t;
            e.setXSpeed(o, o);
            var u = Math.sin(2 * Math.PI * s / 360) * t;
            e.setYSpeed(u, u);
            e.start(true, n, null, 1);
            e.update()
        }
    },
    
    
    
    
};