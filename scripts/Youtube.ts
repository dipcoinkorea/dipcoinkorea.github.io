const YOUTUBE_API_KEY = "AIzaSyCai9IP1ePCF4Kr0l7B3fK3MIOGHyaq5zk";
const YOUTUBE_CHANNEL_ID = "UCdA_uKncEZusQ-SsfEYbtmA";

module Youtube {

    var Container = document.getElementById("medias");

    var _BuildVideo = (ytItem: any) => {

        var 
            iframeParent = document.createElement("div"),
            iframe: HTMLIFrameElement = document.createElement("iframe"),
            container = document.createElement("article"),
            header = document.createElement("header"),
            title = document.createElement("h3"),
            dateElt = document.createElement("time"),
            description = document.createElement("div");

        container.classList.add("youtube-item");
        container.classList.add("post-item");

        title.classList.add("youtube-item-title");
        title.classList.add("post-item-title");
        title.innerHTML = ytItem.snippet.title;
        header.appendChild(title);

        dateElt.classList.add("youtube-item-date");
        dateElt.classList.add("post-item-date");
        dateElt.innerHTML = moment(ytItem.snippet.publishedAt).format("dd MMM Do YYYY");
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
        };
        xhr.send(null);
    }

    _GetPosts();
}