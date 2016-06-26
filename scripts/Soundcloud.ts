const SNDC_USERID = '200666760';
const SNDC_CLIENTID = '164c25c5bfda5b9c34ae8f71d114dee9';



module Soundcloud {
    var TrackContainer = document.getElementById("medias");

    var _BuildTrackEmbed = (track: any) => {
        var 
            iframe: HTMLIFrameElement = null,
            container = document.createElement("article"),
            header = document.createElement("header"),
            title = document.createElement("h3"),
            dateElt = document.createElement("time"),
            description = document.createElement("div");

        var xhr = new XMLHttpRequest();

        xhr.open("get", "https://api.soundcloud.com/oembed?url=" + track.permalink_url + "&maxheight=166&format=json&client_id=" + SNDC_CLIENTID, true);
        xhr.onload = (o: any) => {
            var response = JSON.parse(o.target.responseText);
            var iframeParent = document.createElement("div");
            iframeParent.innerHTML = response.html;
            iframe = <HTMLIFrameElement>iframeParent.firstChild;

            container.classList.add("soundcloud-track");
            container.classList.add("post-item");

            title.classList.add("soundcloud-track-title");
            title.classList.add("post-item-title");
            title.innerHTML = track.title;
            header.appendChild(title);

            dateElt.classList.add("soundcloud-track-date");
            dateElt.classList.add("post-item-date");
            dateElt.innerHTML = moment(track.created_at).format("dd MMM Do YYYY");
            header.appendChild(dateElt);

            header.classList.add("soundclound-track-header");
            header.classList.add("post-item-header");
            container.appendChild(header);

            container.appendChild(iframe)

            description.classList.add("soundclound-track-description");
            description.innerHTML = track.description;
            container.appendChild(description);

            TrackContainer.appendChild(container);
        };

        xhr.send(null);

    }


    export var PostsLoaded = (o: any) => {
        var response = JSON.parse(o.target.responseText); 
        
        for(var i = 0; i < response.length; i++) {
            var track = response[i];
            _BuildTrackEmbed(track);
        }
    }


    var _GetPosts = () => {
        var xhr = new XMLHttpRequest();
        xhr.open("get", "https://api.soundcloud.com/users/" + SNDC_USERID + "/tracks?client_id=" + SNDC_CLIENTID, true);
        xhr.onload = PostsLoaded;
        xhr.send(null);
    }


    if(TrackContainer)
        _GetPosts();

}