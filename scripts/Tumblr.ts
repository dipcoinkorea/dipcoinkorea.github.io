const TUMBLR_REQ_URL: string = "https:" + "//rickymarou.tumblr.com/api/read/json";
const POST_PER_PAGE: number = 10;

module Tumblr {
    var 
        _Container: HTMLElement,
        _Loader: HTMLElement,
        _CurIndex = 0;
    
    export var Init = (container: HTMLElement)  => {
        _Container = container;
        _GetPosts();
    }
    
    var _BuildPost = (post: ITumblrPost): HTMLElement => {
        var 
            container = document.createElement("article"),
            postHeader = document.createElement("header"),
            postTitleELt = document.createElement("h3"),
            postDateElt = document.createElement("time"),
            postTextContent = document.createElement("div");
        
        container.classList.add("tumblr-post");
        
        postHeader.classList.add("tumblr-post-header");
        container.appendChild(postHeader);
        
        postDateElt.innerHTML = post.Date;
        postHeader.appendChild(postDateElt);
        
        postTitleELt.classList.add("tumblr-post-title");
        postTitleELt.innerHTML = post.Title;
        postHeader.appendChild(postTitleELt);
        
        postTextContent.classList.add("tumblr-post-text");
        postTextContent.innerHTML = post.Text;
        container.appendChild(postTextContent);
        
        return container;
    }
    
    var _ImportValue = (obj: Object, properties: string[]): string => {
        var result = "";
        for(var i = 0; i < properties.length; i++) {
            var prop = properties[i];    
            result += obj[prop] ? obj[prop] : "";
        }
        return result;
    }
    
    var _PostsLoaded = () => {
        var posts = window["tumblr_api_read"].posts;
        
        for(var i = 0; i < posts.length; i++) {
            var post = posts[i];
            
            _Container.appendChild(_BuildPost({
                Date: _ImportValue(post, ["date-gmt"]),
                Text: _ImportValue(post, ["photo-caption", "regular-body"]),
                Title: _ImportValue(post, ["regular-title"]),
                Type: _ImportValue(post, ["type"])
            }));
            _CurIndex ++;
        }
    }
    
    //Not using XMLHTTPRequest because of CORS :(.
    var _GetPosts = () => {
        var scriptTag = document.getElementById("tumblr-data");
        if(scriptTag != null) {
            scriptTag.parentElement.removeChild(scriptTag);
        }
        
        scriptTag = document.createElement("script");
        scriptTag.id = "tumblr-data";
        scriptTag.setAttribute("type", "text/javascript");
        scriptTag.setAttribute("src", TUMBLR_REQ_URL + "?start=" + _CurIndex + "&num=" + POST_PER_PAGE);
        
        scriptTag.addEventListener("load", _PostsLoaded);
        
        document.body.appendChild(scriptTag);
    }
  
}