/*7-level2pokemon*/
function(t, e) {
    "use strict";
    var i = function(t) {
        this._levelNumber = t;
        var e, i, s, n, a = [],
            o = [],
            h = [],
            r = [];
        switch (this._levelNumber) {
            case 1:
                e = "weedle", i = "Weedle", s = "grass", n = "weedle_icon.png", a = ["01.png", "02.png", "03.png"], 
                o = ["07.png", "08.png", "09.png"], h = ["04.png", "05.png", "06.png"], 
                r = ["10.png", "11.png", "12.png"];
                break;
            case 10:
                e = "weedle", i = "Weedle", s = "grass", n = "weedle_icon.png", 
                o = ["01.png", "02.png", "03.png"], a = ["07.png", "08.png", "09.png"], 
                r = ["04.png", "05.png", "06.png"], h = ["10.png", "11.png", "12.png"];
                break;
            case 2:
                e = "goldfish", i = "Goldfish", s = "water", n = "goldfish_icon.png", 
                o = ["01.png", "02.png", "02.png", "03.png", "04.png", "04.png", 
                "05.png", "05.png", "06.png", "07.png", "08.png"], 
                a = ["17.png", "18.png"], 
                r = ["09.png", "10.png", "11.png", "11.png", "12.png", "12.png", "13.png", 
                "14.png", "14.png", "15.png", "16.png"], h = ["19.png", "20.png"];
                break;
            case 11:
            case 19:
                e = "goldfish", i = "Goldfish", s = "water", n = "goldfish_icon.png", 
                a = ["01.png", "02.png", "02.png", "03.png", "04.png", "04.png", "05.png", 
                "05.png", "06.png", "07.png", "08.png"], 
                o = ["17.png", "18.png"], 
                h = ["09.png", "10.png", "11.png", "11.png", "12.png", "12.png", "13.png", 
                "14.png", "14.png", "15.png", "16.png"], r = ["19.png", "20.png"];
                break;
            case 3:
            case 20:
                e = "muk", i = "Grimer", s = "sand", n = "muk_icon.png", 
                o = ["01.png", "02.png", "03.png", "04.png", "04.png"], 
                a = ["09.png", "09.png", "10.png", "10.png"], 
                r = ["05.png", "06.png", "07.png", "08.png", "08.png"], 
                h = ["11.png", "11.png", "12.png", "12.png"];
                break;
            case 12:
            case 25:
                e = "muk", i = "Grimer", s = "sand", n = "muk_icon.png", 
                a = ["01.png", "02.png", "03.png", "04.png", "04.png"], 
                o = ["09.png", "09.png", "10.png", "10.png"], 
                h = ["05.png", "06.png", "07.png", "08.png", "08.png"], 
                r = ["11.png", "11.png", "12.png", "12.png"];
                break;
            case 4:
            case 21:
                e = "beedrill", i = "Beedrill", s = "grass", n = "beedrill_icon.png", 
                a = ["01.png", "02.png", "03.png", "04.png", "05.png"], 
                o = ["11.png", "11.png", "12.png", "12.png"], 
                h = ["06.png", "07.png", "08.png", "09.png", "10.png"], 
                r = ["11.png", "11.png", "12.png", "12.png"];
                break;
            case 13:
            case 26:
                e = "beedrill", i = "Beedrill", s = "grass", n = "beedrill_icon.png", 
                o = ["01.png", "02.png", "03.png", "04.png", "05.png"], 
                a = ["11.png", "11.png", "12.png", "12.png"], 
                r = ["06.png", "07.png", "08.png", "09.png", "10.png"], 
                h = ["11.png", "11.png", "12.png", "12.png"];
                break;
            case 5:
            case 14:
                e = "dewgong", i = "Dewgong", s = "water", n = "dewgong_icon.png", 
                a = ["01.png", "02.png", "03.png", "04.png", "05.png", "06.png"], 
                o = ["01.png"], 
                h = ["07.png", "08.png", "09.png", "10.png", "11.png", "12.png"], r = ["07.png"];
                break;
            case 6:
            case 23:
                e = "arcanine", i = "Arcanine", s = "sand", n = "arcanine_icon.png", 
                a = ["01.png", "01.png", "02.png", "02.png"], o = ["05.png", "05.png", "06.png", "06.png"], 
                h = ["03.png", "03.png", "04.png", "04.png"], r = ["07.png", "07.png", "08.png", "08.png"];
                break;
            case 15:
                e = "arcanine", i = "Arcanine", s = "sand", 
                n = "arcanine_icon.png", 
                o = ["01.png", "01.png", "02.png", "02.png"], 
                a = ["05.png", "05.png", "06.png", "06.png"], 
                r = ["03.png", "03.png", "04.png", "04.png"], 
                h = ["07.png", "07.png", "08.png", "08.png"];
                break;
            case 7:
            case 24:
                e = "steelix", i = "Steelix", s = "sand", n = "steelix_icon.png", 
                a = ["01.png", "02.png", "03.png", "04.png", "05.png", "06.png", "07.png", "08.png", "09.png"], 
                o = ["19.png", "20.png", "21.png"], 
                h = ["10.png", "11.png", "12.png", "13.png", "14.png", "15.png", "16.png", "17.png", "18.png"], 
                r = ["22.png", "23.png", "24.png"];
                break;
            case 16:
                e = "steelix", i = "Steelix", s = "sand", n = "steelix_icon.png", 
                o = ["01.png", "02.png", "03.png", "04.png", "05.png", "06.png", "07.png", "08.png", "09.png"], 
                a = ["19.png", "20.png", "21.png"], 
                r = ["10.png", "11.png", "12.png", "13.png", "14.png", "15.png", "16.png", "17.png", "18.png"], 
                h = ["22.png", "23.png", "24.png"];
                break;
            case 8:
            case 27:
                e = "gyarados", i = "Gyarados", s = "water", n = "gyarados_icon.png", 
                a = ["01.png", "02.png", "03.png", "04.png", "05.png", "06.png", "07.png", "08.png", "09.png", "10.png", "11.png", "12.png"], o = ["25.png", "25.png", "26.png", "26.png"], h = ["13.png", "14.png", "15.png", "16.png", "17.png", "18.png", "19.png", "20.png", "21.png", "22.png", "23.png", "24.png"], r = ["27.png", "27.png", "28.png", "28.png"];
                break;
            case 17:
                e = "gyarados", i = "Gyarados", s = "water", n = "gyarados_icon.png", 
                o = ["01.png", "02.png", "03.png", "04.png", "05.png", "06.png", "07.png", 
                "08.png", "09.png", "10.png", "11.png", "12.png"], 
                a = ["25.png", "25.png", "26.png", "26.png"], 
                r = ["13.png", "14.png", "15.png", "16.png", "17.png", "18.png", "19.png", 
                "20.png", "21.png", "22.png", "23.png", "24.png"], 
                h = ["27.png", "27.png", "28.png", "28.png"];
                break;
            case 9:
            case 22:
            case 28:
                e = "charizard", i = "Charizard", s = "sand", n = "charizard_icon.png", 
                a = ["01.png", "02.png", "03.png", "04.png", "05.png", "06.png", "07.png", "08.png"], 
                o = ["17.png", "18.png", "19.png"], 
                h = ["09.png", "010.png", "11.png", "12.png", "13.png", "14.png", "15.png", "16.png"], 
                r = ["17.png", "18.png", "19.png"];
                break;
            case 18:
                e = "charizard", i = "Charizard", s = "sand", n = "charizard_icon.png", 
                o = ["01.png", "02.png", "03.png", "04.png", "05.png", "06.png", "07.png", "08.png"], 
                a = ["17.png", "18.png", "19.png"], 
                r = ["09.png", "010.png", "11.png", "12.png", "13.png", "14.png", "15.png", "16.png"], 
                h = ["17.png", "18.png", "19.png"];
                break;
            default:
                e = "weedle", i = "Weedle", s = "grass", n = "weedle_icon.png", 
                a = ["01.png", "02.png", "03.png"], o = ["07.png", "08.png", "09.png"], 
                h = ["04.png", "05.png", "06.png"], r = ["10.png", "11.png", "12.png"]
        }
        Object.defineProperty(this, "levelNumber", {
            get: function() {
                return this._levelNumber
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(this, "pokemon", {
            get: function() {
                return e
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(this, "pokemon_name", {
            get: function() {
                return i
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(this, "pokemon_type", {
            get: function() {
                return s
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(this, "pokemon_icon", {
            get: function() {
                return n
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(this, "frame_left", {
            get: function() {
                return a
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(this, "frame_ghostleft", {
            get: function() {
                return o
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(this, "frame_right", {
            get: function() {
                return h
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(this, "frame_ghostright", {
            get: function() {
                return r
            },
            enumerable: !0,
            configurable: !0
        })
    };
    e.exports = i
}