const TUMBLR_API_KEY = "osyd8e6IT3O9iaWaflEbzjzaqou01t0fd6YoM8IhgXmuOP8stx";
const TUMBLR_ID: string = "dipcoin";
const POST_PER_PAGE: number = 10;

declare var Wallop, moment: any;

module Tumblr {
    var 
        _Container: HTMLElement,
        _Loader: HTMLElement,
        _CurIndex = 0;
    
    export var Init = (container: HTMLElement)  => {
        _Container = container;
        _GetPosts();
    }
    
    export var PostsLoaded = (o: any) => {
        var posts: ITumblrPost[] = o.response.posts;
        for(var i = 0; i < posts.length; i++) {
            var post = posts[i];
            _Container.appendChild(_BuildPost(post));
        }
        
    }
    
    //jsonp.
    var _GetPosts = () => {
        var scriptTag = document.getElementById("tumblr-data");
        if(scriptTag != null) {
            scriptTag.parentElement.removeChild(scriptTag);
        }
        
        var reqUrl = "https://api.tumblr.com/v2/blog/" + TUMBLR_ID + ".tumblr.com/posts?api_key=" + TUMBLR_API_KEY;
        
        scriptTag = document.createElement("script");
        scriptTag.id = "tumblr-data";
        scriptTag.setAttribute("type", "text/javascript");
        scriptTag.setAttribute("src", reqUrl + "&callback=Tumblr.PostsLoaded&start=" + _CurIndex + "&num=" + POST_PER_PAGE);
        
        document.body.appendChild(scriptTag);
    }
    
    
    //Rendering
    var _BuildPhotos = (post: ITumblrPost) => {
        if(!post.photos)
            return null;
            
        var photos = [];
            
        for(var i = 0; i < post.photos.length; i++) {
            photos.push(Helpers.RenderImg(post.photos[i].alt_sizes));
        }
        
        return photos;
    }
    
    var _BuildPost = (post: ITumblrPost): HTMLElement => {
        var 
            container = document.createElement("article"),
            postHeader = document.createElement("header"),
            postTitleELt = document.createElement("h3"),
            postDateElt = document.createElement("time"),
            postTextContent = document.createElement("div");
        

        var momentDate = moment(post.date);
        var dateStr = ("0" + momentDate.format("d")).slice(-2) + momentDate.format("MMYYYY");

        container.setAttribute("data-date", momentDate.format("YYYYMM") + ("0" + momentDate.format("d")).slice(-2));
        container.classList.add("tumblr-post");
        
        postHeader.classList.add("tumblr-post-header");
        container.appendChild(postHeader);

        postDateElt.classList.add("tumblr-post-date");
        postDateElt.innerHTML = dateStr;
        postHeader.appendChild(postDateElt);
        
        if(post.title) {
            postTitleELt.classList.add("tumblr-post-title");
            postTitleELt.innerHTML = post.title;
            postHeader.appendChild(postTitleELt);
        }
        
        if(post.text) {
            postTextContent.classList.add("tumblr-post-text");
            postTextContent.innerHTML = post.text;
            container.appendChild(postTextContent);
        }
        
        if(post.body) {
            postTextContent.classList.add("tumblr-post-text");
            postTextContent.innerHTML = post.body;
            container.appendChild(postTextContent);
        }
        
        if(post.type == "video" && post.player) {
            //get the largest video
            var 
                curMax = 0,
                largest: ITumblrVideo = null;
            for(var i = 0; i < post.player.length; i++) {
                var 
                    video: ITumblrVideo = post.player[i],
                    videoWidth = video.width;
                    
                curMax = Math.max(curMax, videoWidth);
                if(videoWidth == curMax)
                    largest = video;
            }
            
            //insert the embed
            var  videoParent = document.createElement("div");
            videoParent.classList.add("tumblr-video");
            videoParent.innerHTML = largest.embed_code;
            
            var player = videoParent.firstElementChild;
            if(player.nodeName === "VIDEO")
                (<HTMLVideoElement>player).controls = true;
            
            container.appendChild(videoParent);
        }
        
        if(post.type == "audio" && post.audio_type == "soundcloud") {
            var  audioParent = document.createElement("div");
            audioParent.classList.add("tumblr-audio");
            audioParent.innerHTML = post.player;
            
            container.appendChild(audioParent);
        }
        
        if(post.photos) {
            var 
                nextLink = document.createElement("a"),
                prevLink = document.createElement("a"),
                photoParent = document.createElement("div"),
                photoElts = _BuildPhotos(post);
            
            for(var i = 0; i < photoElts.length; i++) {
                var slide = document.createElement("figure");

                if(i==0)
                    slide.classList.add("Wallop-item--current");

                slide.classList.add("tumblr-images-slide");
                slide.classList.add("Wallop-item");
                slide.appendChild(photoElts[i]);
                photoParent.appendChild(slide);
            }
            
            photoParent.classList.add("tumblr-images");
            container.appendChild(photoParent);
            
            if(photoElts.length > 1) {
                var arrowImg = document.createElement("img");
                arrowImg.src = "assets/arrow.svg";

                nextLink.setAttribute("href", "javascript:void(0)");
                nextLink.classList.add("tumblr-slider-link");
                nextLink.classList.add("next");
                nextLink.appendChild(arrowImg);
                photoParent.appendChild(nextLink);



                prevLink.setAttribute("href", "javascript:void(0)");
                prevLink.classList.add("tumblr-slider-link");
                prevLink.classList.add("previous");
                prevLink.appendChild(arrowImg.cloneNode());
                photoParent.appendChild(prevLink);

                var slider = new Wallop(photoParent);
                slider.carousel = true;

                nextLink.addEventListener("click", slider.next.bind(slider));
                prevLink.addEventListener("click", slider.previous.bind(slider));
            }
            
        }
        
        if(post.tags && post.tags.length > 0) {
            var tags = document.createElement("div");
            tags.classList.add("tumblr-tags");
            
            for(var i = 0; i < post.tags.length; i++) {
                var tagElt = document.createElement("span");
                tagElt.classList.add("tumblr-tag");
                tagElt.innerHTML = "#" + post.tags[i];
                
                tags.appendChild(tagElt);
            }
            
            container.appendChild(tags);
        }
        
        return container;
    }
  
}