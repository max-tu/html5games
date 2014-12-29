
uboat.Game = function(e) {

};
uboat.Game.prototype = {
    
    
    doBtnPause: function() {
        this.togglePauseMenu(true);
        GLOBAL_PAUSE_FLAG = true;
        this.soundGuiButton.play();
        for (var e = 0; e < this._objGroup.length; e++) {
            if (this._objGroup.children[e].alive) {
                this._objGroup.children[e].animations.currentAnim.paused = true
            }
        }
        this._player.emitBubble.on = false;
        this._strCheatCode = ""
    },
    doBtnContinue: function() {
        this.togglePauseMenu(false);
        GLOBAL_PAUSE_FLAG = false;
        this.soundGuiButton.play();
        for (var e = 0; e < this._objGroup.length; e++) {
            var t = this._objGroup.children[e];
            if (t.alive) {
                t.animations.currentAnim.paused = false
            }
        }
        this._player.emitBubble.on = true
    },
    doBtnLevels: function() {
        this.soundGuiBack.play();
        var e = backgroundFadeIn(this.game, false);
        e.onComplete.add(function() {
            this.state.start("LevelSelect")
        }, this)
    },
    doBtnMainMenu: function() {
        this.soundGuiBack.play();
        var e = backgroundFadeIn(this.game, false);
        e.onComplete.add(function() {
            this.state.start("MainMenu")
        }, this)
    },
    doBtnBack: function() {
        if (this._levelGameOver != 0) {
            this.doBtnGoback()
        } else if (GLOBAL_PAUSE_FLAG == true) {
            this.doBtnLevels()
        } else {
            this.doBtnPause()
        }
    },
    togglePauseMenu: function(e) {
        var t = 0;
        if (e) {
            t = 960
        }
        this._btnPause.y = -8 + t;
        this._boxBlack.y = 960 - t;
        this._btnContinue.y = 960 + 352 - t;
        this._btnLevels.y = 960 + 352 + 128 - t;
        this._btnMainMenu.y = 960 + 352 + 256 - t
    },
    checkGameWin: function() {
        if (this._collectedTreasure == this._totalTreasure) {
            this._levelGameOver = 1;
            var e = 0;
            if (this._collectedTreasure >= this._totalTreasure) {
                e++
            }
            if (this._collectedCoins >= this._totalCoins) {
                e++
            }
            if (this._collectedRuby >= this._totalRuby) {
                e++
            }
            if (!uboat.PlayerProgress[this._levelIndex] || uboat.PlayerProgress[this._levelIndex] < e) {
                uboat.PlayerProgress[this._levelIndex] = e
            }
            if (this._levelIndex < LevelData.length - 1) {
                if (!uboat.PlayerProgress[this._levelIndex + 1] || uboat.PlayerProgress[this._levelIndex + 1] < 0) {
                    uboat.PlayerProgress[this._levelIndex + 1] = 0
                }
            }
            window.localStorage.setItem("taptap_progress", JSON.stringify(uboat.PlayerProgress));
            this._btnPause.y -= 960;
            this.game.time.events.add(400, function() {
                this.showGameOverPanel(true)
            }, this)
        }
    },
    showGameOverPanel: function(e) {
        var t = 0;
        var n = 0;
        if (e == true) {
            t = 160;
            n = 512;
            if (this._totalTreasure == 1) {
                if (this._collectedTreasure == 1) {
                    this._panelText1.text = "Ok"
                } else {
                    this._panelText1.text = "X"
                }
            } else {
                this._panelText1.text = this._collectedTreasure + "/" + this._totalTreasure
            }
            this._panelText2.text = this._collectedCoins + "/" + this._totalCoins;
            this._panelText3.text = this._collectedRuby + "/" + this._totalRuby;
            this._panelStar1.y = 120;
            this._panelStar2.y = 120;
            this._panelStar3.y = 120;
            this._panelStar1.alpha = 0;
            this._panelStar2.alpha = 0;
            this._panelStar3.alpha = 0;
            if (this._levelGameOver > 0) {
                var r = 0;
                if (this._collectedTreasure >= this._totalTreasure) {
                    r++;
                    this.game.add.tween(this._panelStar1).to({
                        y: 160,
                        alpha: 1
                    }, 120, Phaser.Easing.Back.Out, true, 400 + 240)
                }
                if (this._collectedCoins >= this._totalCoins) {
                    r++;
                    this.game.add.tween(this._panelStar2).to({
                        y: 160,
                        alpha: 1
                    }, 120, Phaser.Easing.Back.Out, true, 400 + 480)
                }
                if (this._collectedRuby >= this._totalRuby) {
                    r++;
                    this.game.add.tween(this._panelStar3).to({
                        y: 160,
                        alpha: 1
                    }, 120, Phaser.Easing.Back.Out, true, 400 + 720)
                }
                var i = "Good!";
                if (r == 2) {
                    i = "Fantastic!"
                }
                if (r == 3) {
                    i = "Excellent!"
                }
                this._panelCaption.text = i + "\nLevel " + (this._levelIndex + 1) + " completed";
                this._btnGoback.x = 112;
                this._btnRestart.x = 256;
                this._btnNextLevel.x = 400
            } else {
                var s = ["Try again!", "Try again!", "Try again!", "Try again!", 
                "You're not trying!", "Try harder!", "Don't give up!", "haha you suck!"];
                var o = this.game.rnd.integerInRange(0, s.length - 1);
                this._panelCaption.text = "Game over\n" + s[o];
                this._btnGoback.x = 184;
                this._btnRestart.x = 328
            }
            this._panelCaption.makeCentered(240);
            this._panelText1.makeCentered(112);
            this._panelText2.makeCentered(240);
            this._panelText3.makeCentered(368)
        } else {
            t = -480;
            n = 1120
        }
        this.game.add.tween(this._panelGameOver).to({
            y: t
        }, 400, Phaser.Easing.Back.Out, true);
        this.game.add.tween(this._btnGoback).to({
            y: n
        }, 400, Phaser.Easing.Back.Out, true);
        this.game.add.tween(this._btnRestart).to({
            y: n
        }, 400, Phaser.Easing.Back.Out, true, 40);
        if (this._levelGameOver > 0) {
            this.game.add.tween(this._btnNextLevel).to({
                y: n
            }, 400, Phaser.Easing.Back.Out, true, 80)
        }
    },
    doBtnGoback: function() {
        this.soundGuiBack.play();
        this.showGameOverPanel(false);
        this.doBtnLevels()
    },
    doBtnRestart: function() {
        this.soundGuiButton.play();
        this.showGameOverPanel(false);
        this.startNewGame()
    },
    doBtnNextLevel: function() {
        this.showGameOverPanel(false);
        this.soundGuiForward.play();
        this._levelIndex++;
        if (this._levelIndex < LevelData.length) {
            this.startNewGame()
        } else {
            var e = backgroundFadeIn(this.game, false);
            e.onComplete.add(function() {
                this.state.start("WinScreen")
            }, this)
        }
    },
    onPauseBackTouch: function(e) {
        var t = new Phaser.Rectangle(0, 0, uboat.GAME_WIDTH, 352);
        var n = new Phaser.Rectangle(0, uboat.GAME_HEIGHT - 352, uboat.GAME_WIDTH, 352);
        var r = new Phaser.Rectangle(0, 352, 160, uboat.GAME_HEIGHT - 352 - 352);
        var i = new Phaser.Rectangle(uboat.GAME_WIDTH - 160, 352, 160, uboat.GAME_HEIGHT - 352 - 352);
        var s = "-";
        if (t.contains(e.x, e.y) == true) {
            s = "U"
        }
        if (n.contains(e.x, e.y) == true) {
            s = "D"
        }
        if (r.contains(e.x, e.y) == true) {
            s = "L"
        }
        if (i.contains(e.x, e.y) == true) {
            s = "R"
        }
        this._strCheatCode += s;
        if (this._strCheatCode.length > 8) {
            this._strCheatCode = this._strCheatCode.substring(this._strCheatCode.length - 8)
        }
        if (this._strCheatCode == "UUDDLRLR") {
            CHEAT_INVINCIBLE = true;
            this.doPopupText(this._cheatText, "Invincible", 352 - 128);
            this.soundCoin.play()
        }
    }
};