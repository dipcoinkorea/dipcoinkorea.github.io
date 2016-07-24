module Home {
    var
    	VideoContainer = document.getElementById("video-background"),
        Container = document.getElementById("news");
    
    if(Container) {
	    Tumblr.Init(Container);
	    Youtube.Init(Container);
	    Soundcloud.Init(Container);
    }

    if(VideoContainer)
    	Youtube.GetLastVideo();
}