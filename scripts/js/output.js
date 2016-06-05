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
var HERO_WIDTH = 161;
var HERO_HEIGHT = 209;
var BASESPEED = 0.3;
var Hero = (function () {
    function Hero(container) {
        var _this = this;
        this.Speed = BASESPEED;
        //Changes one of the direction (randomly selected)
        this.ChangeDir = function () {
            var randomDirIndex = Helpers.GetRandomInt(0, _this._Direction.length - 1);
            _this._ChangeDir(randomDirIndex);
        };
        this._ChangeDir = function (dirIndex) {
            if (dirIndex < 0 || dirIndex >= _this._Direction.length)
                return;
            var from = _this._Direction[dirIndex];
            switch (from) {
                case Direction.Top:
                    _this._Direction[dirIndex] = Direction.Bottom;
                    break;
                case Direction.Bottom:
                    _this._Direction[dirIndex] = Direction.Top;
                    break;
                case Direction.Left:
                    _this._Direction[dirIndex] = Direction.Right;
                    break;
                case Direction.Right:
                    _this._Direction[dirIndex] = Direction.Left;
                    break;
            }
        };
        this.Elt = document.createElement("a");
        this.Elt.setAttribute("href", "home.html");
        this.Elt.classList.add("hero");
        this.Elt.style.width = HERO_WIDTH + "px";
        this.Elt.style.height = HERO_HEIGHT + "px";
        container.appendChild(this.Elt);
        this.Position = { x: 50, y: 50 };
        this._Direction = [Direction.Top, Direction.Left];
        this.Move();
    }
    Hero.prototype.ChangeDirFromCollision = function (fromDirs) {
        var l = fromDirs.length;
        while (l--) {
            var from = fromDirs[l];
            var dirIndex = this._Direction.indexOf(from);
            this._ChangeDir(dirIndex);
        }
    };
    Hero.prototype.GoOppositeDir = function () {
        var l = this._Direction.length;
        while (l--) {
            this._ChangeDir(l);
        }
    };
    Hero.prototype.Move = function () {
        var _this = this;
        this._Direction.forEach(function (dir) {
            switch (dir) {
                case Direction.Top:
                    _this.Position.y = _this.Position.y - _this.Speed;
                    break;
                case Direction.Bottom:
                    _this.Position.y = _this.Position.y + _this.Speed;
                    break;
                case Direction.Left:
                    _this.Position.x = _this.Position.x - _this.Speed;
                    break;
                case Direction.Right:
                    _this.Position.x = _this.Position.x + _this.Speed;
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
        //Events
        for (var j = 0; j < _Heroes.length; j++) {
            //If mouse is over Hero, go faster    
            var hero = _Heroes[j];
            hero.Elt.addEventListener("mouseover", function () {
                //hero.GoOppositeDir();
                hero.Speed = hero.Speed * 3;
            });
            hero.Elt.addEventListener("mouseout", function () {
                hero.Speed = BASESPEED;
            });
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
var TUMBLR_ID = "dipcoin";
var TUMBLR_REQ_URL = "https:" + "//" + TUMBLR_ID + ".tumblr.com/api/read/json";
var POST_PER_PAGE = 10;
var TUMBLR_API_KEY = "osyd8e6IT3O9iaWaflEbzjzaqou01t0fd6YoM8IhgXmuOP8stx";
var TUMBLR_REQ_XHR = "https:" + "//api.tumblr.com/v2/blog/" + TUMBLR_ID + ".tumblr.com/info?api_key=" + TUMBLR_API_KEY;
var Tumblr;
(function (Tumblr) {
    var _Container, _Loader, _Request, _CurIndex = 0;
    var _GetPostsReadyStateChange = function () {
        if (_Request.readyState !== 4)
            return;
        if (_Request.status != 200) {
            console.log("error");
        }
        console.log(_Request.response);
    };
    Tumblr.Init = function (container) {
        _Container = container;
        //_GetPosts();
        _Request = new XMLHttpRequest();
        _Request.onreadystatechange = _GetPostsReadyStateChange;
        _Request.open("GET", TUMBLR_REQ_XHR, true); //+ "?start=" + _CurIndex + "&num=" + POST_PER_PAGE
        _Request.setRequestHeader('Accept', 'application/json');
        _Request.setRequestHeader("Content-type", "application/json");
        _Request.send();
    };
    var _BuildPost = function (post) {
        var container = document.createElement("article"), postHeader = document.createElement("header"), postTitleELt = document.createElement("h3"), postDateElt = document.createElement("time"), postTextContent = document.createElement("div");
        container.classList.add("tumblr-post");
        postHeader.classList.add("tumblr-post-header");
        container.appendChild(postHeader);
        postDateElt.innerHTML = post.Date;
        postHeader.appendChild(postDateElt);
        postTitleELt.classList.add("tumblr-post-title");
        postTitleELt.innerHTML = post.Title;
        postHeader.appendChild(postTitleELt);
        postTextContent.classList.add("tumblr-post-text");
        postTextContent.innerHTML = post.Text;
        container.appendChild(postTextContent);
        return container;
    };
    var _ImportValue = function (obj, properties) {
        var result = "";
        for (var i = 0; i < properties.length; i++) {
            var prop = properties[i];
            result += obj[prop] ? obj[prop] : "";
        }
        return result;
    };
    var _PostsLoaded = function () {
        var posts = window["tumblr_api_read"].posts;
        console.log(posts);
        for (var i = 0; i < posts.length; i++) {
            var post = posts[i];
            _Container.appendChild(_BuildPost({
                Date: _ImportValue(post, ["date-gmt"]),
                Text: _ImportValue(post, ["photo-caption", "regular-body"]),
                Title: _ImportValue(post, ["regular-title"]),
                Type: _ImportValue(post, ["type"])
            }));
            _CurIndex++;
        }
    };
    //Not using XMLHTTPRequest because of CORS :(.
    var _GetPosts = function () {
        var scriptTag = document.getElementById("tumblr-data");
        if (scriptTag != null) {
            scriptTag.parentElement.removeChild(scriptTag);
        }
        scriptTag = document.createElement("script");
        scriptTag.id = "tumblr-data";
        scriptTag.setAttribute("type", "text/javascript");
        scriptTag.setAttribute("src", TUMBLR_REQ_URL + "?start=" + _CurIndex + "&num=" + POST_PER_PAGE);
        scriptTag.addEventListener("load", _PostsLoaded);
        document.body.appendChild(scriptTag);
    };
})(Tumblr || (Tumblr = {}));
var Home;
(function (Home) {
    var _TumblrContainer = document.getElementById("tumblr");
    if (_TumblrContainer)
        Tumblr.Init(_TumblrContainer);
})(Home || (Home = {}));
