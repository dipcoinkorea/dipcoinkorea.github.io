var Background;
(function (Background) {
    var backgroundElts = document.getElementsByClassName("js-background");
    var colors = ["#aa19a5", "#edc159", "#000"];
    var curColorIndex = 0;
    var changeColor = function () {
        var l = backgroundElts.length;
        while (l--) {
            var backgroundElt = backgroundElts[l];
            backgroundElt.style.backgroundColor = colors[curColorIndex];
        }
        curColorIndex = curColorIndex == colors.length ? 0 : curColorIndex + 1;
    };
    setInterval(changeColor, 5000);
})(Background || (Background = {}));
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
String.prototype["replaceAt"] = function (index, character) {
    return;
};
var PageTitle;
(function (PageTitle) {
    var Title = "DIPCOIN";
    var curChar = 0;
    var starflag = true;
    document.title = "*" + Title + "*";
    var capitalize = function () {
        Title = "DIPCOIN";
        var trailchar = starflag ? "*" : "\u00A0";
        var char = Title.charAt(curChar);
        char = char.toLowerCase();
        Title[curChar] = char;
        document.title = trailchar + Title.substr(0, curChar) + char + Title.substr(curChar + 1, curChar + Title.length) + trailchar;
        if (curChar == Title.length - 1)
            curChar = 0;
        else
            curChar++;
        starflag = !starflag;
    };
    setInterval(capitalize, 300);
})(PageTitle || (PageTitle = {}));
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
var SNDC_USERID = '200666760';
var SNDC_CLIENTID = '164c25c5bfda5b9c34ae8f71d114dee9';
var Soundcloud;
(function (Soundcloud) {
    var TrackContainer = document.getElementById("medias");
    var _BuildTrackEmbed = function (track) {
        var iframe = null, container = document.createElement("article"), header = document.createElement("header"), title = document.createElement("h3"), dateElt = document.createElement("time"), description = document.createElement("div");
        var xhr = new XMLHttpRequest();
        xhr.open("get", "https://api.soundcloud.com/oembed?url=" + track.permalink_url + "&maxheight=166&format=json&client_id=" + SNDC_CLIENTID, true);
        xhr.onload = function (o) {
            var response = JSON.parse(o.target.responseText);
            var iframeParent = document.createElement("div");
            iframeParent.innerHTML = response.html;
            iframe = iframeParent.firstChild;
            var trackDate = moment(track.created_at);
            container.classList.add("soundcloud-track");
            container.classList.add("post-item");
            container.setAttribute("data-date", trackDate.format("YYYYMM") + ("0" + trackDate.format("d")).slice(-2));
            title.classList.add("soundcloud-track-title");
            title.classList.add("post-item-title");
            title.innerHTML = track.title;
            header.appendChild(title);
            dateElt.classList.add("soundcloud-track-date");
            dateElt.classList.add("post-item-date");
            dateElt.innerHTML = trackDate.format("dd MMM Do YYYY");
            header.appendChild(dateElt);
            header.classList.add("soundclound-track-header");
            header.classList.add("post-item-header");
            container.appendChild(header);
            container.appendChild(iframe);
            description.classList.add("soundclound-track-description");
            description.innerHTML = track.description;
            container.appendChild(description);
            TrackContainer.appendChild(container);
            var datedElts = Array.prototype.slice.call(TrackContainer.querySelectorAll("*[data-date]"));
            var l = datedElts.length;
            while (l--) {
                datedElts[l].parentElement.removeChild(datedElts[l]);
            }
            datedElts.sort(function (a, b) {
                var aValue = a.getAttribute("data-date");
                var bValue = b.getAttribute("data-date");
                if (aValue > bValue)
                    return 1;
                if (aValue < bValue)
                    return -1;
                return 0;
            });
            for (var i = 0; i < datedElts.length; i++) {
                TrackContainer.appendChild(datedElts[i]);
            }
        };
        xhr.send(null);
    };
    Soundcloud.PostsLoaded = function (o) {
        var response = JSON.parse(o.target.responseText);
        for (var i = 0; i < response.length; i++) {
            var track = response[i];
            _BuildTrackEmbed(track);
        }
    };
    var _GetPosts = function () {
        var xhr = new XMLHttpRequest();
        xhr.open("get", "https://api.soundcloud.com/users/" + SNDC_USERID + "/tracks?client_id=" + SNDC_CLIENTID, true);
        xhr.onload = Soundcloud.PostsLoaded;
        xhr.send(null);
    };
    if (TrackContainer)
        _GetPosts();
})(Soundcloud || (Soundcloud = {}));
var TUMBLR_API_KEY = "osyd8e6IT3O9iaWaflEbzjzaqou01t0fd6YoM8IhgXmuOP8stx";
var TUMBLR_ID = "dipcoin";
var POST_PER_PAGE = 10;
var Tumblr;
(function (Tumblr) {
    var _Container, _Loader, _CurIndex = 0;
    Tumblr.Init = function (container) {
        _Container = container;
        _GetPosts();
    };
    Tumblr.PostsLoaded = function (o) {
        var posts = o.response.posts;
        for (var i = 0; i < posts.length; i++) {
            var post = posts[i];
            _Container.appendChild(_BuildPost(post));
        }
    };
    //jsonp.
    var _GetPosts = function () {
        var scriptTag = document.getElementById("tumblr-data");
        if (scriptTag != null) {
            scriptTag.parentElement.removeChild(scriptTag);
        }
        var reqUrl = "https://api.tumblr.com/v2/blog/" + TUMBLR_ID + ".tumblr.com/posts?api_key=" + TUMBLR_API_KEY;
        scriptTag = document.createElement("script");
        scriptTag.id = "tumblr-data";
        scriptTag.setAttribute("type", "text/javascript");
        scriptTag.setAttribute("src", reqUrl + "&callback=Tumblr.PostsLoaded&start=" + _CurIndex + "&num=" + POST_PER_PAGE);
        document.body.appendChild(scriptTag);
    };
    //Rendering
    var _BuildPhotos = function (post) {
        if (!post.photos)
            return null;
        var photos = [];
        for (var i = 0; i < post.photos.length; i++) {
            photos.push(Helpers.RenderImg(post.photos[i].alt_sizes));
        }
        return photos;
    };
    var _BuildPost = function (post) {
        var container = document.createElement("article"), postHeader = document.createElement("header"), postTitleELt = document.createElement("h3"), postDateElt = document.createElement("time"), postTextContent = document.createElement("div");
        container.classList.add("tumblr-post");
        postHeader.classList.add("tumblr-post-header");
        container.appendChild(postHeader);
        postDateElt.classList.add("tumblr-post-date");
        postDateElt.innerHTML = moment(post.date).format("dd MMM Do YYYY");
        postHeader.appendChild(postDateElt);
        if (post.title) {
            postTitleELt.classList.add("tumblr-post-title");
            postTitleELt.innerHTML = post.title;
            postHeader.appendChild(postTitleELt);
        }
        if (post.text) {
            postTextContent.classList.add("tumblr-post-text");
            postTextContent.innerHTML = post.text;
            container.appendChild(postTextContent);
        }
        if (post.body) {
            postTextContent.classList.add("tumblr-post-text");
            postTextContent.innerHTML = post.body;
            container.appendChild(postTextContent);
        }
        if (post.type == "video" && post.player) {
            //get the largest video
            var curMax = 0, largest = null;
            for (var i = 0; i < post.player.length; i++) {
                var video = post.player[i], videoWidth = video.width;
                curMax = Math.max(curMax, videoWidth);
                if (videoWidth == curMax)
                    largest = video;
            }
            //insert the embed
            var videoParent = document.createElement("div");
            videoParent.classList.add("tumblr-video");
            videoParent.innerHTML = largest.embed_code;
            var player = videoParent.firstElementChild;
            if (player.nodeName === "VIDEO")
                player.controls = true;
            container.appendChild(videoParent);
        }
        if (post.type == "audio" && post.audio_type == "soundcloud") {
            var audioParent = document.createElement("div");
            audioParent.classList.add("tumblr-audio");
            audioParent.innerHTML = post.player;
            container.appendChild(audioParent);
        }
        if (post.photos) {
            var nextLink = document.createElement("a"), prevLink = document.createElement("a"), photoParent = document.createElement("div"), photoElts = _BuildPhotos(post);
            for (var i = 0; i < photoElts.length; i++) {
                var slide = document.createElement("figure");
                if (i == 0)
                    slide.classList.add("Wallop-item--current");
                slide.classList.add("tumblr-images-slide");
                slide.classList.add("Wallop-item");
                slide.appendChild(photoElts[i]);
                photoParent.appendChild(slide);
            }
            photoParent.classList.add("tumblr-images");
            container.appendChild(photoParent);
            if (photoElts.length > 1) {
                nextLink.setAttribute("href", "javascript:void(0)");
                nextLink.classList.add("tumblr-slider-link");
                nextLink.classList.add("next");
                photoParent.appendChild(nextLink);
                prevLink.setAttribute("href", "javascript:void(0)");
                prevLink.classList.add("tumblr-slider-link");
                prevLink.classList.add("previous");
                photoParent.appendChild(prevLink);
                var slider = new Wallop(photoParent);
                slider.carousel = true;
                nextLink.addEventListener("click", slider.next.bind(slider));
                prevLink.addEventListener("click", slider.previous.bind(slider));
            }
        }
        if (post.tags && post.tags.length > 0) {
            var tags = document.createElement("div");
            tags.classList.add("tumblr-tags");
            for (var i = 0; i < post.tags.length; i++) {
                var tagElt = document.createElement("span");
                tagElt.classList.add("tumblr-tag");
                tagElt.innerHTML = "#" + post.tags[i];
                tags.appendChild(tagElt);
            }
            container.appendChild(tags);
        }
        return container;
    };
})(Tumblr || (Tumblr = {}));
var YOUTUBE_API_KEY = "AIzaSyCai9IP1ePCF4Kr0l7B3fK3MIOGHyaq5zk";
var YOUTUBE_CHANNEL_ID = "UCdA_uKncEZusQ-SsfEYbtmA";
var Youtube;
(function (Youtube) {
    var Container = document.getElementById("medias");
    var _BuildVideo = function (ytItem) {
        var iframeParent = document.createElement("div"), iframe = document.createElement("iframe"), container = document.createElement("article"), header = document.createElement("header"), title = document.createElement("h3"), dateElt = document.createElement("time"), description = document.createElement("div");
        var videoDate = moment(ytItem.snippet.publishedAt);
        container.classList.add("youtube-item");
        container.classList.add("post-item");
        container.setAttribute("data-date", videoDate.format("YYYYMM") + ("0" + videoDate.format("d")).slice(-2));
        title.classList.add("youtube-item-title");
        title.classList.add("post-item-title");
        title.innerHTML = ytItem.snippet.title;
        header.appendChild(title);
        dateElt.classList.add("youtube-item-date");
        dateElt.classList.add("post-item-date");
        dateElt.innerHTML = videoDate.format("dd MMM Do YYYY");
        header.appendChild(dateElt);
        header.classList.add("soundclound-track-header");
        header.classList.add("post-item-header");
        container.appendChild(header);
        iframeParent.classList.add("youtube-item-iframe-outer");
        iframe.allowFullscreen = true;
        iframe.frameBorder = "0";
        iframe.src = "https://www.youtube.com/embed/" + ytItem.id.videoId;
        iframeParent.appendChild(iframe);
        container.appendChild(iframeParent);
        description.classList.add("soundclound-track-description");
        description.innerHTML = ytItem.snippet.description;
        container.appendChild(description);
        return container;
    };
    var _GetPosts = function () {
        var xhr = new XMLHttpRequest();
        xhr.open("get", "https://www.googleapis.com/youtube/v3/search?key="
            + YOUTUBE_API_KEY + "&channelId=" + YOUTUBE_CHANNEL_ID + "&part=snippet", true);
        xhr.onload = function (o) {
            var response = JSON.parse(o.target.responseText);
            for (var i = 0; i < response.items.length; i++) {
                Container.appendChild(_BuildVideo(response.items[i]));
            }
            var datedElts = Array.prototype.slice.call(Container.querySelectorAll("*[data-date]"));
            var l = datedElts.length;
            while (l--) {
                datedElts[l].parentElement.removeChild(datedElts[l]);
            }
            datedElts.sort(function (a, b) {
                var aValue = a.getAttribute("data-date");
                var bValue = b.getAttribute("data-date");
                if (aValue > bValue)
                    return 1;
                if (aValue < bValue)
                    return -1;
                return 0;
            });
            for (var i = 0; i < datedElts.length; i++) {
                Container.appendChild(datedElts[i]);
            }
        };
        xhr.send(null);
    };
    if (Container)
        _GetPosts();
})(Youtube || (Youtube = {}));
var Home;
(function (Home) {
    var _TumblrContainer = document.getElementById("tumblr");
    if (_TumblrContainer)
        Tumblr.Init(_TumblrContainer);
})(Home || (Home = {}));
