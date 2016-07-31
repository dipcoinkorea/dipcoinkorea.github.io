module Team {

   
    var Members: {name: string, image: string, link: string, instagram?: string}[] = [];
    var spreadsheetID = "1YpRhnIA-vHrQe0X2quecOhoZHYRI3sk4L2m6UdULOvA";
    var Container = document.getElementById("team");

    var _RenderMembers = () => {
        for(var i = 0; i < Members.length; i++){
            var member = Members[i];
            var membercontainer = document.createElement("article");
            var inner = document.createElement("div");
            var figure = document.createElement("figure");
            var image = document.createElement("img");
            var title = document.createElement("h2");
            var link = document.createElement("a");
            var mask = document.createElement("div");

            membercontainer.classList.add("team-member");
            inner.classList.add("team-member-inner");
            membercontainer.appendChild(inner);

            figure.classList.add("team-member-figure");
            inner.appendChild(figure);

            mask.classList.add("team-member-figure-mask");
            figure.appendChild(mask);

            image.src = member.image;
            image.classList.add("team-member-image");
            figure.appendChild(image);

            title.classList.add("team-member-title");
            title.innerHTML = member.name;
            inner.appendChild(title);

            link.classList.add("team-member-link");
            link.target = "_blank";
            link.href = member.link;
            inner.appendChild(link);

            link.addEventListener("mouseover", (e) => {
                (<HTMLElement>e.target).parentElement.classList.add("soundcloud-hover");
            });

            link.addEventListener("mouseout", (e) => {
                (<HTMLElement>e.target).parentElement.classList.remove("soundcloud-hover");
            });

            if(member.instagram) {
                var instaLink = <HTMLAnchorElement>document.createElement("a");

                link.classList.add("half");

                instaLink.target = "_blank";
                instaLink.href = member.instagram;
                instaLink.classList.add("team-member-insta-link");
                inner.appendChild(instaLink);

                if(!member.link)
                    instaLink.classList.add("full");

                instaLink.addEventListener("mouseover", (e) => {
                    (<HTMLElement>e.target).parentElement.classList.add("instagram-hover");
                });

                instaLink.addEventListener("mouseout", (e) => {
                    (<HTMLElement>e.target).parentElement.classList.remove("instagram-hover");
                });
            }


            Container.appendChild(membercontainer);
        }
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
                    link: entry["gsx$link"]["$t"],
                    instagram: entry["gsx$instagram"]["$t"]
                });
            }
            _RenderMembers();

            //About content
            document.getElementById("about").innerHTML = response.feed.entry[0]["gsx$maintext"]["$t"];
            
        };
        xhr.send(null);
    }

    if(Container) {
        _GetItems();
    }

}