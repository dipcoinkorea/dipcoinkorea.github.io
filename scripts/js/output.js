var Direction;
(function (Direction) {
    Direction[Direction["Top"] = 0] = "Top";
    Direction[Direction["Right"] = 1] = "Right";
    Direction[Direction["Bottom"] = 2] = "Bottom";
    Direction[Direction["Left"] = 3] = "Left";
})(Direction || (Direction = {}));
/// <reference path="lib/definitions-custom.ts"/>
var Hero = (function () {
    function Hero(container) {
        this.Elt = document.createElement("div");
        this.Elt.classList.add("hero");
        container.appendChild(this.Elt);
        this.Position = { x: 50, y: 50 };
        this._Direction = [Direction.Top, Direction.Left];
        this.Move();
    }
    Hero.prototype.Move = function () {
        var _this = this;
        this._Interval = setInterval(function () {
            _this._Move();
        }, 300);
    };
    Hero.prototype.RandomDirection = function () {
    };
    Hero.prototype._Move = function () {
        var _this = this;
        this._Direction.forEach(function (dir) {
            switch (dir) {
                case Direction.Top:
                    _this.Position.y = _this.Position.y + 0.2;
                    break;
                case Direction.Bottom:
                    _this.Position.y = _this.Position.y - 0.2;
                    break;
                case Direction.Left:
                    _this.Position.x = _this.Position.x - 0.2;
                    break;
                case Direction.Right:
                    _this.Position.x = _this.Position.x + 0.2;
                    break;
            }
        });
        this.Elt.style.top = this.Position.y + "%";
        this.Elt.style.left = this.Position.x + "%";
    };
    return Hero;
}());
/// <reference path="lib/definitions-custom.ts"/>
/// <reference path="./Hero.ts"/>
var Playground;
(function (Playground) {
    var _TotalFaces = 1, _Heroes = [], Container = document.getElementById("playground");
    for (var i = 0; i < _TotalFaces; i++) {
        _Heroes.push(new Hero(Container));
    }
})(Playground || (Playground = {}));
