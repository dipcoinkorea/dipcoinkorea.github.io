module Dipcoinpest {


    var documentID = "1kav9gojBNlzluMCBWlCR64PYvYg4uwNqaEAvxJI_6MA";
    var Container = document.getElementById("dipcoinpest");

    var _RenderContent = () => {
        
    }

    var _GetItems = () => {
        var xhr = new XMLHttpRequest();
        xhr.open("get", "https://docs.google.com/feeds/list/" + documentID + "/od6/public/values?alt=json", true);
        xhr.onload = (o: any) => {
            var response = JSON.parse(o.target.responseText);
            console.log(response);
        };
        xhr.send(null);
    }

    if(Container) {
        _GetItems();
    }

}