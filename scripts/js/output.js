var Helpers;
(function (Helpers) {
    Helpers.GetRectangle = function (elt) {
        var pos = elt.getBoundingClientRect();
        return {
            Top: pos.top,
            Right: pos.right,
            Bottom: pos.bottom,
            Left: pos.left
        };
    };
    Helpers.IsOutside = function (rect, container) {
        return (rect.Top <= container.Top)
            || (rect.Left <= container.Left)
            || (rect.Right >= container.Right)
            || (rect.Bottom >= container.Bottom);
    };
})(Helpers || (Helpers = {}));
var Direction;
(function (Direction) {
    Direction[Direction["Top"] = 0] = "Top";
    Direction[Direction["Right"] = 1] = "Right";
    Direction[Direction["Bottom"] = 2] = "Bottom";
    Direction[Direction["Left"] = 3] = "Left";
})(Direction || (Direction = {}));
/// <reference path="lib/definitions-custom.ts"/>
/// <reference path="Helpers.ts"/>
var HERO_WIDTH = 100;
var HERO_HEIGHT = 130;
var SPEED = 5;
var Hero = (function () {
    function Hero(container) {
        this.Elt = document.createElement("div");
        this.Elt.classList.add("hero");
        this.Elt.style.width = HERO_WIDTH + "px";
        this.Elt.style.height = HERO_HEIGHT + "px";
        container.appendChild(this.Elt);
        this.Position = { x: 50, y: 50 };
        this._Direction = [Direction.Top, Direction.Left];
        this.Move();
    }
    Hero.prototype.GoOppositeDir = function () {
        var l = this._Direction.length;
        while (l--) {
            var dir = this._Direction[l];
            switch (dir) {
                case Direction.Top:
                    this._Direction[l] = Direction.Bottom;
                    break;
                case Direction.Bottom:
                    this._Direction[l] = Direction.Top;
                    break;
                case Direction.Left:
                    this._Direction[l] = Direction.Right;
                    break;
                case Direction.Right:
                    this._Direction[l] = Direction.Left;
                    break;
            }
        }
    };
    Hero.prototype.Move = function () {
        var _this = this;
        this._Direction.forEach(function (dir) {
            switch (dir) {
                case Direction.Top:
                    _this.Position.y = _this.Position.y + SPEED;
                    break;
                case Direction.Bottom:
                    _this.Position.y = _this.Position.y - SPEED;
                    break;
                case Direction.Left:
                    _this.Position.x = _this.Position.x - SPEED;
                    break;
                case Direction.Right:
                    _this.Position.x = _this.Position.x + SPEED;
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
    var _TotalFaces = 1, _Heroes = [], Container = document.getElementById("playground"), ContainerRect = Helpers.GetRectangle(Container);
    for (var i = 0; i < _TotalFaces; i++) {
        _Heroes.push(new Hero(Container));
    }
    var _LoopActions = function () {
    };
    console.log(ContainerRect);
    var _Interval = setInterval(function () {
        for (var j = 0; j < _Heroes.length; j++) {
            var hero = _Heroes[j];
            hero.Move();
            if (Helpers.IsOutside(Helpers.GetRectangle(hero.Elt), ContainerRect)) {
                hero.GoOppositeDir();
            }
        }
    }, 300);
})(Playground || (Playground = {}));
