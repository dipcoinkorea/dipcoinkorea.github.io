var News;
(function (News) {
    var spreadsheetID = "1zkKS4RxRcag89Fuu1CFRd48q7GU19YQCqFt0eImkr0w";
    var Container = document.getElementById("gsheet-news");
    var _RenderNews = function (entry) {
        var title = entry["gsx$title"]["$t"];
        var date = entry["gsx$date"]["$t"];
        var image = entry["gsx$image"]["$t"];
        var text = entry["gsx$text"]["$t"];
        console.log(title, date, image, text);
        var article = document.createElement("article");
        var headerElt = document.createElement("header");
        var titleElt = document.createElement("h2");
        var dateElt = document.createElement("div");
        var textElt = document.createElement("div");
        article.classList.add("tumblr-post");
        headerElt.classList.add("tumblr-post-header");
        article.appendChild(headerElt);
        if (date) {
            dateElt.classList.add("tumblr-post-date");
            dateElt.innerHTML = date;
            headerElt.appendChild(dateElt);
        }
        if (title) {
            titleElt.classList.add("tumblr-post-title");
            titleElt.innerHTML = title;
            headerElt.appendChild(titleElt);
        }
        if (image) {
            var figureElt = document.createElement("figure");
            var imageElt = document.createElement("img");
            figureElt.classList.add("news-item-image-outer");
            article.appendChild(figureElt);
            imageElt.setAttribute("src", image);
            figureElt.appendChild(imageElt);
        }
        if (text) {
            textElt.classList.add("tumblr-post-text");
            textElt.innerHTML = text;
            article.appendChild(textElt);
        }
        Container.appendChild(article);
    };
    var _GetItems = function () {
        var xhr = new XMLHttpRequest();
        xhr.open("get", "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/od6/public/values?alt=json", true);
        xhr.onload = function (o) {
            var response = JSON.parse(o.target.responseText);
            for (var i = 0; i < response.feed.entry.length; i++) {
                var entry = response.feed.entry[i];
                _RenderNews(entry);
            }
        };
        xhr.send(null);
    };
    if (Container) {
        _GetItems();
    }
})(News || (News = {}));
