var News;
(function (News) {
    var _NewsSpreadsheetID = "1zkKS4RxRcag89Fuu1CFRd48q7GU19YQCqFt0eImkr0w";
    var _Container;
    function youtube_parser(url) {
        var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        var match = url.match(regExp);
        if (match && match[2].length == 11) {
            return match[2];
        }
    }
    var _RenderNews = function (entry) {
        var title = entry["gsx$title"]["$t"];
        var date = entry["gsx$date"]["$t"];
        var image = entry["gsx$image"]["$t"];
        var text = entry["gsx$text"]["$t"];
        var video = entry["gsx$video"]["$t"];
        var article = document.createElement("article");
        var headerElt = document.createElement("header");
        var titleElt = document.createElement("h2");
        var dateElt = document.createElement("div");
        var textElt = document.createElement("div");
        var newsDate = moment(date, "MM-DD-YYYY");
        article.classList.add("post-item");
        article.setAttribute("data-date", newsDate.format("YYYYMM") + ("0" + newsDate.format("D")).slice(-2));
        headerElt.classList.add("post-item-header");
        article.appendChild(headerElt);
        if (title) {
            titleElt.classList.add("post-item-title");
            titleElt.innerHTML = title;
            headerElt.appendChild(titleElt);
        }
        if (date) {
            dateElt.classList.add("post-item-date");
            dateElt.innerHTML = ("0" + newsDate.format("D")).slice(-2) + "/" + newsDate.format("MM/YYYY");
            ;
            headerElt.appendChild(dateElt);
        }
        if (image) {
            var figureElt = document.createElement("figure");
            var imageElt = document.createElement("img");
            figureElt.classList.add("news-item-image-outer");
            article.appendChild(figureElt);
            imageElt.setAttribute("src", image);
            figureElt.appendChild(imageElt);
        }
        if (video) {
            var videoId = youtube_parser(video);
            if (videoId) {
                var iframeOuter = document.createElement("div");
                var iframeElt = document.createElement("iframe");
                iframeOuter.classList.add("youtube-item-iframe-outer");
                article.appendChild(iframeOuter);
                iframeElt.allowFullscreen = true;
                iframeElt.frameBorder = "0";
                iframeElt.src = "https://www.youtube.com/embed/" + videoId;
                iframeOuter.appendChild(iframeElt);
            }
        }
        if (text) {
            textElt.classList.add("tumblr-post-text");
            textElt.innerHTML = text;
            article.appendChild(textElt);
        }
        _Container.appendChild(article);
        var datedElts = Array.prototype.slice.call(_Container.querySelectorAll("*[data-date]"));
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
            _Container.appendChild(datedElts[i]);
        }
    };
    var _GetItems = function (sheetid) {
        var xhr = new XMLHttpRequest();
        xhr.open("get", "https://spreadsheets.google.com/feeds/list/" + sheetid + "/od6/public/values?alt=json", true);
        xhr.onload = function (o) {
            var response = JSON.parse(o.target.responseText);
            for (var i = 0; i < response.feed.entry.length; i++) {
                var entry = response.feed.entry[i];
                _RenderNews(entry);
            }
        };
        xhr.send(null);
    };
    News.Init = function (container) {
        _Container = container;
        _NewsSpreadsheetID = container.getAttribute("data-sheetid") || _NewsSpreadsheetID;
        _GetItems(_NewsSpreadsheetID);
    };
    var newsContainer = document.getElementById("gsheet-news");
    if (newsContainer) {
        News.Init(newsContainer);
    }
})(News || (News = {}));
