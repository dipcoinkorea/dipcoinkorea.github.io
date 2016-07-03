module Team {

   
    var Members: {name: string, image: string, description: string}[] = [];
    var spreadsheetID = "1YpRhnIA-vHrQe0X2quecOhoZHYRI3sk4L2m6UdULOvA";
    var Container = document.getElementById("team");

    var _RenderMembers = () => {
        for(var i = 0; i < Members.length; i++){
            var member = Members[i];
            var membercontainer = document.createElement("article");
            var inner = document.createElement("div");
            var image = document.createElement("img");
            var title = document.createElement("h2");
            var link = document.createElement("a");

            membercontainer.classList.add("team-member");
            inner.classList.add("team-member-inner");
            membercontainer.appendChild(inner);

            image.src = member.image;
            image.classList.add("team-member-image");
            inner.appendChild(image);

            title.classList.add("team-member-title");
            title.innerHTML = member.name;
            inner.appendChild(title);

            link.classList.add("team-member-link");
            link.href = "javascript:void(0)";
            inner.appendChild(link);

            Container.appendChild(membercontainer);
        }
    }

    var _RenderDetail = (item: Object) => {
        var container = document.createElement("article");
        return  container;
    }

    var _GetItems = () => {
        var xhr = new XMLHttpRequest();
        xhr.open("get", "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/od6/public/values?alt=json", true);
        xhr.onload = (o: any) => {
            var response = JSON.parse(o.target.responseText);
            for(var i = 0; i < response.feed.entry.length; i++) {
                var entry = response.feed.entry[i];
                Members.push({
                    name : entry["gsx$name"]["$t"],
                    image: entry["gsx$image"]["$t"],
                    description: entry["gsx$description"]["$t"]
                });
            }
            _RenderMembers();
        };
        xhr.send(null);
    }

    var _GetItem = () => {
        var xhr = new XMLHttpRequest();
        xhr.open("get", "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/od6/public/values?alt=json", true);
        xhr.onload = (o: any) => {
            var response = JSON.parse(o.target.responseText);
            for(var i = 0; i < response.feed.entry.length; i++) {
                
            }
        };
        xhr.send(null);
    }

    if(Container) {
        _GetItems();
    }

}