//const TUMBLR_URL: string = document.location.protocol + "//rickymarou.tumblr.com/api/read/json";
const TUMBLR_ID = "rickymarou";
const TUMBLR_API_KEY = "osyd8e6IT3O9iaWaflEbzjzaqou01t0fd6YoM8IhgXmuOP8stx";
const TUMBLR_REQ_URL: string = document.location.protocol + "//api.tumblr.com/v2/blog/" + TUMBLR_ID + ".tumblr.com/posts?api_key=" + TUMBLR_API_KEY;
const POST_PER_PAGE: number = 20;

module Tumblr {
    var 
        _Request: XMLHttpRequest,
        _Container: HTMLElement,
        _Loader: HTMLElement,
        _CurIndex = 0;
    
    export var Init = (container: HTMLElement)  => {
        _Container = container;
        _GetPosts();
    }
    
    var _GetPostsReadyStateChange = () => {
        if (_Request.readyState !== 4)
            return;

        if(_Request.status != 200) {
            console.log("error");
        }
        
        var response = JSON.parse(_Request.responseText);
        console.log(response);
    }
    
    var _GetPosts = () => {
        if(_Request)
            _Request.abort();
            
        _Request = new XMLHttpRequest();
        _Request.onreadystatechange = _GetPostsReadyStateChange;
        _Request.open("GET", TUMBLR_REQ_URL + "?start=" + _CurIndex + "&num=" + POST_PER_PAGE, true);
        _Request.setRequestHeader('Accept', 'application/json');
        _Request.setRequestHeader("Content-type", "application/json");
        _Request.send();
    }
}