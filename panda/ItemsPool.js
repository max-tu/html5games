var game;
! function(a) {
    var b = function() {
        function b(a, b) {
            this._game = a, this.itemsLayer = b, this.initItems()
        }
        return b.prototype.initItems = function() {
            var b = this;
            this.items = [];
            var c = 20,
                d = [0, 1, 2, 3, 4];
            d.forEach(function(d) {
                for (var e = 0; c > e; e++) {
                    var f = new a.Item(b._game, d);
                    b.itemsLayer.add(f), b.items.push(f)
                }
            })
        }, b.prototype.getItem = function(b) {
            var c = this.getAvailableItem(b);
            return null === c && (c = new a.Item(this._game, b), 
                this.items.push(c), this.itemsLayer.add(c)), 
            c.onRemoveFromPool(), c
        }, b.prototype.getAvailableItem = function(a) {
            for (var b = this.items.length, c = 0; b > c; c++) {
                var d = this.items[c];
                if (d.exists === !1 && d.itemType === a) return d
            }
            return null
        }, b.prototype.returnItem = function(a) {
            a.onAddToPool()
        }, b.prototype.doReset = function() {
            for (var a = this.items.length, b = 0; a > b; b++) {
                var c = this.items[b];
                c.exists && this.returnItem(c)
            }
        }, b.prototype.destroy = function() {
            this._game = null, this.itemsLayer = null, this.items.length = 0, this.items = null
        }, b
    }();
    a.ItemsPool = b
}(game || (game = {}));