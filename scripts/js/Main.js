var Main;
(function (Main) {
    var HomeLogoImg = document.getElementById("home-logo-image"), VideoContainer = document.getElementById("video-background"), Container = document.getElementById("news");
    if (Container) {
    }
    if (VideoContainer)
        Youtube.GetLastVideo();
    if (HomeLogoImg)
        HomeLogoImg.addEventListener("click", function () { alert("HI"); });
})(Main || (Main = {}));
