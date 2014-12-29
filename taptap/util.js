function backgroundCreateBubbles(e, t) {
    e.stage.backgroundColor = 0;
    for (var n = 0; n < BUBBLE_LAYERS; n++) {
        t[n] = e.add.group();
        var r = (n + 1) / (BUBBLE_LAYERS + 1);
        var i = n + 1;
        for (var s = 0; s < i; s++) {
            var o = e.rnd.integerInRange(0, uboat.GAME_WIDTH - 32);
            var u = e.rnd.integerInRange(-64, uboat.GAME_HEIGHT);
            var a = e.add.sprite(o, u, "backobjs");
            a.scale.x = r;
            a.scale.y = r;
            t[n].add(a)
        }
    }
}
/*==================================================================================================*/
function backgroundUpdateBubbles(e, t) {
    for (var n = 0; n < BUBBLE_LAYERS; n++) {
        var r = (n + 1) / (BUBBLE_LAYERS * 2);
        for (var i = 0; i < t[n].children.length; i++) {
            t[n].children[i].y -= r * 2;
            if (t[n].children[i].y < -64) {
                t[n].children[i].x = e.rnd.integerInRange(0, uboat.GAME_WIDTH - 32);
                t[n].children[i].y = uboat.GAME_HEIGHT
            }
        }
    }
}
/*==================================================================================================*/
function backgroundFadeIn(e, t) {
    var n = 0;
    var r = 1;
    if (t == true) {
        n = 1;
        r = 0
    }
    var i = e.add.graphics(0, 0);
    i.beginFill(0, 1);
    i.drawRect(0, 0, uboat.GAME_WIDTH, uboat.GAME_HEIGHT);
    i.alpha = n;
    var s = e.add.tween(i);
    s.to({
        alpha: r
    }, 500, Phaser.Easing.Linear.None, true);
    return s
}
/*==================================================================================================*/
MyLabelButton = function(e, t, n, r, i, s, o, u, a, f, l) {
    Phaser.Button.call(this, e, t, n, r, s, o, u, a, f, l);
    this.label = new Phaser.BitmapText(e, 0, 0, "myfont", i, 48);
    this.addChild(this.label);
    this.setLabel(i);
    e.add.existing(this)
};
MyLabelButton.prototype = Object.create(Phaser.Button.prototype);
MyLabelButton.prototype.constructor = MyLabelButton;
MyLabelButton.prototype.setLabel = function(e) {
    this.label.setText(e);
    this.label.update();
    this.label.x = Math.floor((this.width - this.label.width) * .5);
    this.label.y = Math.floor((this.height - this.label.height) * .2)
};
/*==================================================================================================*/
Phaser.BitmapText.prototype.makeCentered = function(e) {
    this.updateText();
    this.x = Math.floor(e - this.textWidth * .5)
};
/*==================================================================================================*/
(function(e) {
    function t() {}

    function n() {}

    function r(e) {
        return new i(e)
    }

    function i(e) {
        this.attributes = this.convertContent(e);
        this.length = Object.keys(this.attributes).length
    }
    e.utils = {
        fixDOMParser: function() {
            console.log("cocoonjsphaser.utils.fixDOMParser starts..");
            window.DOMParser = t;
            console.log("cocoonjsphaser.utils.fixDOMParser is ready..")
        }
    };
    t.prototype.parseFromString = function(e) {
        return new i(JSON.parse(e))
    };
    n.prototype.getNamedItem = function(e) {
        return {
            nodeValue: this[e] || null
        }
    };
    i.prototype.documentElement = document;
    i.prototype.convertContent = function(e) {
        var t = new n,
            s;
        for (s in e) {
            if (e[s] !== null && typeof e[s] === "object") {
                t[s] = Array.isArray(e[s]) ? e[s].map(r) : new i(e[s])
            } else {
                t[s] = e[s]
            }
        }
        return t
    };
    i.prototype.getElementsByTagName = function(e) {
        return this.attributes[e] ? Array.isArray(this.attributes[e]) ? this.attributes[e] : [this.attributes[e]] : []
    };
    i.prototype.getAttribute = function(e) {
        return this.attributes.getNamedItem(e).nodeValue
    }
})(window.cocoonjsphaser = window.cocoonjsphaser || {});

console.log("cocoonjsphaser - fixDOMParser starts");
cocoonjsphaser.utils.fixDOMParser();
Cocoon.Ad.banner.on("shown", function() {
    console.log("Banner shown!")
});
Cocoon.Ad.banner.on("ready", function() {
    Cocoon.Ad.setBannerLayout(Cocoon.Ad.BannerLayout.BOTTOM_CENTER);
    Cocoon.Ad.showBanner()
});
Cocoon.Ad.banner.on("hidden", function() {
    console.log("Banner hidden!")
});
Cocoon.Ad.loadBanner()