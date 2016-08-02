var Shop;
(function (Shop) {
    function getQueryVariable(variable) {
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if (pair[0] == variable) {
                return pair[1];
            }
        }
        return null;
    }
    var spreadsheetID = "1RvaFuRTQ5QbEpT9jcu45xuwzrXnFg9QmEDRj8DDugd4";
    var Container = document.getElementById("shop");
    var _ProductID = getQueryVariable("productID");
    var _RenderItem = function (item) {
        var title = item["gsx$title"]["$t"];
        var imageurl = item["gsx$imageurl"]["$t"];
        var price = item["gsx$price"]["$t"];
        var productid = item["gsx$productid"]["$t"];
        var container = document.createElement("article");
        var titleElt = document.createElement("h2");
        var imageOuter = document.createElement("figure");
        var imageElt = document.createElement("img");
        var priceElt = document.createElement("div");
        var linkElt = document.createElement("a");
        var hoverElt = document.createElement("div");
        container.classList.add("product-item");
        linkElt.classList.add("product-item-link");
        hoverElt.classList.add("product-item-content");
        imageElt.src = imageurl;
        imageOuter.appendChild(imageElt);
        imageOuter.classList.add("product-item-figure");
        container.appendChild(imageOuter);
        titleElt.classList.add("product-item-title");
        titleElt.innerHTML = title;
        hoverElt.appendChild(titleElt);
        priceElt.classList.add("product-item-price");
        priceElt.innerHTML = price;
        hoverElt.appendChild(priceElt);
        linkElt.href = "shop.html?productID=" + productid;
        container.appendChild(linkElt);
        container.appendChild(hoverElt);
        return container;
    };
    var _RenderDetail = function (item) {
        var title = item["gsx$title"]["$t"];
        var imageurl = item["gsx$imageurl"]["$t"];
        var imagelist = item["gsx$imagelist"]["$t"].split(',');
        var description = item["gsx$description"]["$t"];
        var price = item["gsx$price"]["$t"];
        var container = document.createElement("article");
        var titleElt = document.createElement("h1");
        var imageOuter = document.createElement("figure");
        var imageElt = document.createElement("img");
        var descriptionElt = document.createElement("div");
        var priceElt = document.createElement("div");
        var productDetailElt = document.createElement("div");
        container.classList.add("product-detail");
        productDetailElt.classList.add("product-detail-content");
        titleElt.classList.add("product-detail-title");
        titleElt.innerHTML = title;
        container.appendChild(titleElt);
        imageElt.src = imageurl;
        imageOuter.classList.add("product-detail-figure");
        imageOuter.appendChild(imageElt);
        container.appendChild(imageOuter);
        var buyLink = document.createElement("a");
        buyLink.classList.add("product-detail-buy");
        buyLink.innerHTML = "BUY NOW";
        buyLink.href = "mailto:dipcoincats@gmail.com?subject=" + title + "&body=I want to buy " + title + ", please take my money.";
        productDetailElt.appendChild(buyLink);
        priceElt.classList.add("product-detail-price");
        priceElt.innerHTML = price;
        productDetailElt.appendChild(priceElt);
        descriptionElt.classList.add("product-detail-text");
        descriptionElt.innerHTML = description;
        productDetailElt.appendChild(descriptionElt);
        container.appendChild(productDetailElt);
        if (imagelist.length) {
            var detailImagesOuter = document.createElement("figure");
            detailImagesOuter.classList.add("product-detail-images");
            container.appendChild(detailImagesOuter);
            for (var i = 0; i < imagelist.length; i++) {
                var imageListElt = document.createElement("img");
                imageListElt.src = imagelist[i];
                detailImagesOuter.appendChild(imageListElt);
            }
        }
        return container;
    };
    var _GetItems = function () {
        var xhr = new XMLHttpRequest();
        xhr.open("get", "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/od6/public/values?alt=json", true);
        xhr.onload = function (o) {
            var response = JSON.parse(o.target.responseText);
            for (var i = 0; i < response.feed.entry.length; i++) {
                Container.appendChild(_RenderItem(response.feed.entry[i]));
            }
        };
        xhr.send(null);
    };
    var _GetItem = function () {
        var xhr = new XMLHttpRequest();
        xhr.open("get", "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/od6/public/values?alt=json", true);
        xhr.onload = function (o) {
            var response = JSON.parse(o.target.responseText);
            for (var i = 0; i < response.feed.entry.length; i++) {
                var productid = response.feed.entry[i]["gsx$productid"]["$t"];
                if (productid == _ProductID)
                    Container.appendChild(_RenderDetail(response.feed.entry[i]));
            }
        };
        xhr.send(null);
    };
    if (Container) {
        if (_ProductID)
            _GetItem();
        else
            _GetItems();
    }
})(Shop || (Shop = {}));
