var Main;
(function (Main) {
    var TumblrContainer = document.getElementById("tumblr-news"), VideoContainer = document.getElementById("video-background"), Container = document.getElementById("news");
    if (Container) {
        News.Init(Container);
        Soundcloud.Init(Container);
        Youtube.Init(Container);
    }
    if (VideoContainer)
        Youtube.GetLastVideo();
})(Main || (Main = {}));
