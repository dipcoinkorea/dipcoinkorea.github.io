module Home {
    var
        Container = document.getElementById("news");
    
    if(Container) {
	    Tumblr.Init(Container);
	    Youtube.Init(Container);
	    Soundcloud.Init(Container);
    }
}