module Home {
    var
        _TumblrContainer = document.getElementById("news");
    
    if(_TumblrContainer)
        Tumblr.Init(_TumblrContainer);
}