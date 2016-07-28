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
    Helpers.GetRandomInt = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    Helpers.GetOutsideDir = function (rect, container) {
        var result = [];
        if (rect.Top <= container.Top)
            result.push(Direction.Top);
        if (rect.Left <= container.Left)
            result.push(Direction.Left);
        if (rect.Right >= container.Right)
            result.push(Direction.Right);
        if (rect.Bottom >= container.Bottom)
            result.push(Direction.Bottom);
        return result;
    };
    Helpers.RenderImg = function (images, sizes) {
        var img = document.createElement("img"), srcset = "";
        for (var i = 0; i < images.length; i++) {
            srcset += images[i].url + " " + images[i].width + "w";
            if (i < images.length)
                srcset += ",";
            else
                img.setAttribute("src", images[i].url);
        }
        img.setAttribute("srcset", srcset);
        if (sizes)
            img.setAttribute("sizes", sizes);
        return img;
    };
})(Helpers || (Helpers = {}));
