module Background {
    var backgroundElts = document.getElementsByClassName("js-background");
    var colors = ["#aa19a5", "#edc159", "#000"];
    var curColorIndex = 0;

    var changeColor = () => {
        var l = backgroundElts.length;
        while(l--) {
            var backgroundElt = <HTMLElement>backgroundElts[l];
            backgroundElt.style.backgroundColor = colors[curColorIndex];
        }
        curColorIndex = curColorIndex == colors.length ? 0 : curColorIndex + 1;        
    }

    setInterval(changeColor, 5000);
}