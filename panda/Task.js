var game;
! function(a) {
    var b = function() {
        function a(a, b) {
            this.totalSeconds = 0, 
            this.passedSeconds = 0, 
            this._remainingSeconds = 0, 
            this.paused = !1, 
            this.game = a, 
            this.totalSeconds = Math.floor(b / 1e3), 
            this._remainingSeconds = this.totalSeconds, 
            this._secondPassedSignal = new Phaser.Signal, 
            this._completeSignal = new Phaser.Signal, 
            this._stopSignal = new Phaser.Signal
        }
        return a.prototype.start = function() {
            this.timerEvent = this.game.time.events.repeat(1e3, Number.MAX_VALUE, this.onSecondPassed, this)
        }, 
        a.prototype.addSeconds = function(a) {
            this.timerEvent && (this.totalSeconds += a)
        }, 
        a.prototype.onSecondPassed = function() {
            this.paused === !1 && (this.passedSeconds++, this._remainingSeconds = this.totalSeconds - this.passedSeconds, 
                this._secondPassedSignal.dispatch(this._remainingSeconds), 
                this._remainingSeconds <= 0 && (this.stopTimer(), this._completeSignal.dispatch()))
        }, 
        a.prototype.stopTimer = function() {
            this.timerEvent && (this.game.time.events.remove(this.timerEvent), 
                this.timerEvent = null, this._stopSignal.dispatch())
        }, 
        a.prototype.onPause = function() {
            this.paused = !0, this._stopSignal.dispatch()
        }, 
        a.prototype.onResume = function() {
            this.paused = !1
        }, 
        a.prototype.destroy = function() {
            this.stopTimer(), 
            this._secondPassedSignal.dispose(), 
            this._secondPassedSignal = null, 
            this._completeSignal.dispose(), 
            this._completeSignal = null, 
            this._stopSignal.dispose(), 
            this._stopSignal = null
        }, 
        Object.defineProperty(a.prototype, "remainingSeconds", {
            get: function() {
                return this._remainingSeconds
            },
            enumerable: !0,
            configurable: !0
        }), 
        Object.defineProperty(a.prototype, "secondPassedSignal", {
            get: function() {
                return this._secondPassedSignal
            },
            enumerable: !0,
            configurable: !0
        }), 
        Object.defineProperty(a.prototype, "completeSignal", {
            get: function() {
                return this._completeSignal
            },
            enumerable: !0,
            configurable: !0
        }), 
        Object.defineProperty(a.prototype, "stopSignal", {
            get: function() {
                return this._stopSignal
            },
            enumerable: !0,
            configurable: !0
        }), a
    }();
    a.TaskTimer = b
}(game || (game = {}));
/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/    
var game;
! function(a) {
    var b = function() {
        function b(b, c, d, e) {
            this._isComplete = !1, 
            this.game = b, 
            this.miniTasks = c, 
            this._completeSignal = new Phaser.Signal, 
            this._timer = new a.TaskTimer(this.game, d), 
            this.allowedItemTypes = e
        }
        return b.prototype.hasItemType = function(a) {
            return this.miniTasks.some(function(b) {
                return b.fruitType === a
            })
        }, 
        b.prototype.onItemCollected = function(a) {
            var b = this.getMiniTask(a.itemType);
            b && b.addCollectedItems(1)
        }, 
        b.prototype.onCollectCycleComplete = function() {
            this.allMinitasksComplete() && (this._isComplete = !0, this._completeSignal.dispatch())
        }, 
        b.prototype.getMiniTask = function(a) {
            for (var b = this.miniTasks.length, c = 0; b > c; c++) {
                var d = this.miniTasks[c];
                if (d.fruitType === a) return d
            }
            return null
        }, 
        b.prototype.allMinitasksComplete = function() {
            return this.miniTasks.every(function(a) {
                return a.complete
            })
        }, 
        b.prototype.destroy = function() {
            this.game = null, 
            this._completeSignal.dispose(), 
            this._completeSignal = null, 
            this.destroyMinitasks(), 
            this.destroyTimer()
        }, 
        b.prototype.destroyMinitasks = function() {
            this.miniTasks.forEach(function(a) {
                a.destroy()
            }), this.miniTasks = null
        }, 
        b.prototype.destroyTimer = function() {
            this._timer.destroy(), this._timer = null
        }, 
        Object.defineProperty(b.prototype, "completeSignal", {
            get: function() {
                return this._completeSignal
            },
            enumerable: !0,
            configurable: !0
        }), 
        Object.defineProperty(b.prototype, "timer", {
            get: function() {
                return this._timer
            },
            enumerable: !0,
            configurable: !0
        }), 
        Object.defineProperty(b.prototype, "isComplete", {
            get: function() {
                return this._isComplete
            },
            enumerable: !0,
            configurable: !0
        }), b
    }();
    a.Task = b
}(game || (game = {}));
/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/    
var game;
! function(a) {
    var b = function() {
        function b(b) {
            this.game = b, 
            this.rnd = new Phaser.RandomDataGenerator([2]), 
            this.fruitTypes = a.Item.ITEM_TYPES.slice(0)
        }
        return b.prototype.generateTask = function(b) {
            var c = this.getAllowedItemTypes(b),
                d = this.getTypesNum(b),
                e = this.createMinitasks(c, d, b),
                f = this.getTime(b);
            return new a.Task(this.game, e, f, c)
        }, 
        b.prototype.getTypesNum = function(a) {
            var b = 1;
            return b = 2 >= a ? 2 : 4 >= a ? 3 : 4
        }, 
        b.prototype.createMinitasks = function(b, c, d) {
            for (var e = [], f = this.getTypesForMinitasks(b, c), g = 0; c > g; g++) {
                var h = f[g],
                    i = this.getFruitsNum(d),
                    j = new a.MiniTask(h, i);
                e.push(j)
            }
            return e
        }, 
        b.prototype.getTypesForMinitasks = function(a, b) {
            var c = a.slice(0);
            Phaser.Utils.shuffle(c);
            var d = c.slice(0, b);
            return d
        }, 
        b.prototype.getFruitsNum = function(a) {
            var b = 4,
                c = 3,
                d = 21,
                e = b + a * c + this.game.rnd.integerInRange(-3, 3);
            return e > d && (e = d), e
        }, 
        b.prototype.getTime = function(a) {
            var b = 15e4,
                c = 15e3,
                d = 3e4,
                e = b - a * c;
            return d > e && (e = d), e
        }, 
        b.prototype.getAllowedItemTypes = function(a) {
            var b = 4;
            return b = 2 >= a ? 4 : 4 >= a ? 5 : 6, 
            this.fruitTypes.slice(0, b)
        }, 
        b.prototype.destroy = function() {
            this.game = null, this.rnd = null, this.fruitTypes = null
        }, b
    }();
    a.TaskGenerator = b
}(game || (game = {}));
