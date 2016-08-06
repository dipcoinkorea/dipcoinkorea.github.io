module Main {
    var
        HomeLogoImg = document.getElementById("home-logo-image"),
        VideoContainer = document.getElementById("video-background"),
        Container = document.getElementById("news");
    
    if(Container) {
        //News.Init(Container);
        //Soundcloud.Init(Container);
	    //Youtube.Init(Container);
    }

    if(VideoContainer)
    	Youtube.GetLastVideo();



    if(HomeLogoImg)
        HomeLogoImg.addEventListener("click", () => { alert("HI"); });

    //if(TumblrContainer)
    //    Tumblr.Init(TumblrContainer);
}