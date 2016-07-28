var YOUTUBE_API_KEY = "AIzaSyCai9IP1ePCF4Kr0l7B3fK3MIOGHyaq5zk";
var YOUTUBE_CHANNEL_ID = "UCdA_uKncEZusQ-SsfEYbtmA";
var Youtube;
(function (Youtube) {
    var Container = null;
    var _BuildVideo = function (ytItem) {
        var iframeParent = document.createElement("div"), iframe = document.createElement("iframe"), container = document.createElement("article"), header = document.createElement("header"), title = document.createElement("h3"), dateElt = document.createElement("time"), description = document.createElement("div");
        var videoDate = moment(ytItem.snippet.publishedAt);
        container.classList.add("youtube-item");
        container.classList.add("post-item");
        container.setAttribute("data-date", videoDate.format("YYYYMM") + ("0" + videoDate.format("d")).slice(-2));
        title.classList.add("youtube-item-title");
        title.classList.add("post-item-title");
        title.innerHTML = ytItem.snippet.title;
        header.appendChild(title);
        dateElt.classList.add("youtube-item-date");
        dateElt.classList.add("post-item-date");
        dateElt.innerHTML = ("0" + videoDate.format("d")).slice(-2) + videoDate.format("MMYYYY");
        header.appendChild(dateElt);
        header.classList.add("soundclound-track-header");
        header.classList.add("post-item-header");
        container.appendChild(header);
        iframeParent.classList.add("youtube-item-iframe-outer");
        iframe.allowFullscreen = true;
        iframe.frameBorder = "0";
        iframe.src = "https://www.youtube.com/embed/" + ytItem.id.videoId;
        iframeParent.appendChild(iframe);
        container.appendChild(iframeParent);
        description.classList.add("soundclound-track-description");
        description.innerHTML = ytItem.snippet.description;
        container.appendChild(description);
        return container;
    };
    var _GetPosts = function () {
        var xhr = new XMLHttpRequest();
        xhr.open("get", "https://www.googleapis.com/youtube/v3/search?key="
            + YOUTUBE_API_KEY + "&channelId=" + YOUTUBE_CHANNEL_ID + "&part=snippet", true);
        xhr.onload = function (o) {
            var response = JSON.parse(o.target.responseText);
            for (var i = 0; i < response.items.length; i++) {
                Container.appendChild(_BuildVideo(response.items[i]));
            }
            var datedElts = Array.prototype.slice.call(Container.querySelectorAll("*[data-date]"));
            var l = datedElts.length;
            while (l--) {
                datedElts[l].parentElement.removeChild(datedElts[l]);
            }
            datedElts.sort(function (a, b) {
                var aValue = a.getAttribute("data-date");
                var bValue = b.getAttribute("data-date");
                if (aValue < bValue)
                    return 1;
                if (aValue > bValue)
                    return -1;
                return 0;
            });
            for (var i = 0; i < datedElts.length; i++) {
                Container.appendChild(datedElts[i]);
            }
        };
        xhr.send(null);
    };
    Youtube.GetLastVideo = function () {
        var xhr = new XMLHttpRequest();
        xhr.open("get", "https://www.googleapis.com/youtube/v3/search?key="
            + YOUTUBE_API_KEY + "&channelId=" + YOUTUBE_CHANNEL_ID + "&part=snippet", true);
        xhr.onload = function (o) {
            var response = JSON.parse(o.target.responseText);
            var iframe = document.getElementById("video-iframe");
            if (!response.items || !response.items[0])
                return;
            iframe.src = "https://www.youtube.com/embed/" + response.items[0].id.videoId
                + "?rel=0&autoplay=1&controls=0&rel=0&showinfo=0";
        };
        xhr.send(null);
    };
    Youtube.Init = function (container) {
        Container = container;
        _GetPosts();
    };
})(Youtube || (Youtube = {}));
