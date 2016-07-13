module Logo {
    var logoElt:HTMLElement = <HTMLElement>document.querySelector(".footer-logo");
    var imgElt: HTMLImageElement = <HTMLImageElement>document.querySelector("img.logo-img");
    var images = ["assets/kayne.gif", "assets/pukingdog.gif", "assets/spongebob.gif"];
    var loader = document.createElement("img");
    loader.style.position = "fixed";
    loader.style.left = "-3000px";
    var imageLoadedCount = 0;
    var imageDisplayedIndex = images.length - 1;

    

    var loadNextImage = () => {
        if(imageLoadedCount == images.length)
            return;
        loader.src = images[imageLoadedCount];
    }

    loader.addEventListener("load", () => {
        imageLoadedCount++;
        loadNextImage();
    });

    var changeImage = () => {
        imageDisplayedIndex = imageDisplayedIndex == (images.length-1) ? 0 : (imageDisplayedIndex+1);
        imgElt.src = images[imageDisplayedIndex];
    }

    logoElt.addEventListener("mouseenter", changeImage);
}