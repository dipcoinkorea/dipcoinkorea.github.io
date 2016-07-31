var Logo;
(function (Logo) {
    var logoElt = document.querySelector(".footer-logo");
    var imgElt = document.querySelector("img.logo-img");
    var images = [
        "assets/banana.gif", "assets/kayne.gif", "assets/pukingdog.gif",
        "assets/spongebob.gif", "assets/nicecat.gif"
    ];
    //"assets/dancingguy.gif"
    var loader = document.createElement("img");
    loader.style.position = "fixed";
    loader.style.left = "-3000px";
    var imageLoadedCount = 0;
    var imageDisplayedIndex = images.length - 1;
    var loadNextImage = function () {
        if (imageLoadedCount == images.length)
            return;
        loader.src = images[imageLoadedCount];
    };
    loader.addEventListener("load", function () {
        imageLoadedCount++;
        loadNextImage();
    });
    var timeout = null;
    var changeImage = function () {
        imageDisplayedIndex = imageDisplayedIndex == (images.length - 1) ? 0 : (imageDisplayedIndex + 1);
        imgElt.src = images[imageDisplayedIndex];
    };
    logoElt.addEventListener("mouseenter", changeImage);
})(Logo || (Logo = {}));
