/// <reference path="../lib/definitions-custom.ts"/>
/// <reference path="./Hero.ts"/>
var Playground;
(function (Playground) {
    var Container = document.getElementById("playground");
    if (Container) {
        var _TotalFaces = 1, _Heroes = [], ContainerRect = Helpers.GetRectangle(Container);
        for (var i = 0; i < _TotalFaces; i++) {
            _Heroes.push(new Hero(Container));
        }
        //Every frame
        var _Loop = function (timestamp) {
            for (var j = 0; j < _Heroes.length; j++) {
                var hero = _Heroes[j];
                //Move hero
                hero.Move();
                //If hero is outside container, change its direction
                var heroRect = Helpers.GetRectangle(hero.Elt);
                if (Helpers.IsOutside(heroRect, ContainerRect)) {
                    hero.ChangeDirFromCollision(Helpers.GetOutsideDir(heroRect, ContainerRect));
                }
            }
            requestAnimationFrame(_Loop);
        };
        requestAnimationFrame(_Loop);
        for (var j = 0; j < _Heroes.length; j++) {
            var hero = _Heroes[j];
            //Randomly change direction every 3 sec
            setInterval(function () {
                if (Math.random() > 0.2)
                    hero.ChangeDir();
            }, 3000);
        }
        //Recalculate container size when changing window size
        window.addEventListener("resize", function () {
            ContainerRect = Helpers.GetRectangle(Container);
        });
    }
})(Playground || (Playground = {}));
