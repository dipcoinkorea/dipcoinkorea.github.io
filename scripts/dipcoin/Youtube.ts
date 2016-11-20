const YOUTUBE_API_KEY = "AIzaSyCai9IP1ePCF4Kr0l7B3fK3MIOGHyaq5zk";
const YOUTUBE_CHANNEL_ID = "UCdA_uKncEZusQ-SsfEYbtmA";

module Youtube {

    var Container: HTMLElement = null;

    var _BuildVideo = (ytItem: any) => {

        var 
            iframeParent = document.createElement("div"),
            iframe: HTMLIFrameElement = document.createElement("iframe"),
            container = document.createElement("article"),
            header = document.createElement("header"),
            title = document.createElement("h3"),
            dateElt = document.createElement("time"),
            description = document.createElement("div");

        var videoDate = moment(ytItem.snippet.publishedAt);

        container.classList.add("youtube-item");
        container.classList.add("post-item");
        container.setAttribute("data-date", videoDate.format("YYYYMM") + ("0" + videoDate.format("D")).slice(-2));

        title.classList.add("youtube-item-title");
        title.classList.add("post-item-title");
        title.innerHTML = ytItem.snippet.title;
        header.appendChild(title);

        dateElt.classList.add("youtube-item-date");
        dateElt.classList.add("post-item-date");
        dateElt.innerHTML = ("0" + videoDate.format("D")).slice(-2) + "/" + videoDate.format("MM/YYYY");
        header.appendChild(dateElt);

        header.classList.add("soundclound-track-header");
        header.classList.add("post-item-header");
        container.appendChild(header);

        iframeParent.classList.add("youtube-item-iframe-outer");

        iframe.allowFullscreen = true;
        iframe.frameBorder = "0";
        iframe.src = "https://www.youtube.com/embed/" + ytItem.id.videoId;
        iframeParent.appendChild(iframe)
        container.appendChild(iframeParent);

        description.classList.add("soundclound-track-description");
        description.innerHTML = ytItem.snippet.description;
        container.appendChild(description);

        return container;
    }

    var _GetPosts = () => {
        var xhr = new XMLHttpRequest();
        xhr.open("get", "https://www.googleapis.com/youtube/v3/search?key=" 
        + YOUTUBE_API_KEY + "&channelId=" + YOUTUBE_CHANNEL_ID + "&part=snippet", true);
        xhr.onload = (o: any) => {
            var response = JSON.parse(o.target.responseText);
            for(var i = 0; i < response.items.length; i++) {
                Container.appendChild(_BuildVideo(response.items[i]));
            }
            
            var datedElts: HTMLElement[] = Array.prototype.slice.call(Container.querySelectorAll("*[data-date]"));
            var l = datedElts.length;
            while(l--) {
                datedElts[l].parentElement.removeChild(datedElts[l]);
            }
            datedElts.sort((a, b) => {
                var aValue = a.getAttribute("data-date");
                var bValue = b.getAttribute("data-date");
                if (aValue < bValue) return 1;
                if (aValue > bValue) return -1;
                return 0;
            });
            for(var i = 0; i < datedElts.length; i++){
                Container.appendChild(datedElts[i]);
            }

        };
        xhr.send(null);
    }

    export var GetLastVideo = () => {
        var xhr = new XMLHttpRequest();
        xhr.open("get", "https://www.googleapis.com/youtube/v3/search?key=" 
        + YOUTUBE_API_KEY + "&channelId=" + YOUTUBE_CHANNEL_ID + "&part=snippet", true);
        xhr.onload = (o: any) => {
            var response = JSON.parse(o.target.responseText);
            var iframe = <HTMLIFrameElement>document.getElementById("video-iframe");
            if(!response.items || !response.items[0])
                return;

            console.log('videos number', response.items.length);

            iframe.src = "https://www.youtube.com/embed/" + response.items[response.items.length - 1].id.videoId 
            + "?rel=0&autoplay=1&controls=0&rel=0&showinfo=0";
        };
        xhr.send(null);
    }

    export var Init = (container: HTMLElement) => {
        Container = container;
        _GetPosts();
    }
        
}