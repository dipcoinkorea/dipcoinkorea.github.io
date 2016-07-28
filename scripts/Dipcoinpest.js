var Dipcoinpest;
(function (Dipcoinpest) {
    var spreadsheetID = "1ODf3ISXr7go9rLnMmSO4ukraS7M_h9Fpz7fE6gcsD70";
    var Container = document.getElementById("dipcoinpest");
    var _GetItems = function () {
        var xhr = new XMLHttpRequest();
        xhr.open("get", "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/od6/public/values?alt=json", true);
        xhr.onload = function (o) {
            var response = JSON.parse(o.target.responseText);
            for (var i = 0; i < response.feed.entry.length; i++) {
                var item = response.feed.entry[i];
                var type = item["gsx$type"]["$t"];
                var content = item["gsx$content"]["$t"];
                switch (type.toLowerCase()) {
                    case "text":
                        var textpanel = document.createElement("div");
                        textpanel.classList.add("panel-text");
                        content = content.replace("\n", "<br />");
                        content = content.replace("\r", "<br />");
                        textpanel.innerHTML = content;
                        Container.appendChild(textpanel);
                        break;
                    case "image":
                        var imagepanel = document.createElement("figure");
                        var image = document.createElement("img");
                        image.src = content;
                        imagepanel.classList.add("panel-image");
                        imagepanel.appendChild(image);
                        Container.appendChild(imagepanel);
                        break;
                }
            }
        };
        xhr.send(null);
    };
    if (Container) {
        _GetItems();
    }
})(Dipcoinpest || (Dipcoinpest = {}));
