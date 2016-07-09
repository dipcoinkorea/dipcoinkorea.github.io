module Background {
    var colors = ["#edc159", "#000", "#aa19a5"];
    var curColorIndex = 0;

    var changeColor = () => {
        var backgroundElts = document.getElementsByClassName("js-background");
        var l = backgroundElts.length;
        while(l--) {
            var backgroundElt = <HTMLElement>backgroundElts[l];
            backgroundElt.style.backgroundColor = colors[curColorIndex];
        }
        curColorIndex = curColorIndex == colors.length ? 0 : curColorIndex + 1;        
    }

    setInterval(changeColor, 8000);
}