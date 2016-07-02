String.prototype["replaceAt"]= function(index, character) {
    return 
}

module PageTitle {
    var Title = "DIPCOIN";
    var curChar = 0;
    var starflag = true;
    document.title = "*" + Title + "*";

    

    var capitalize = () => {
        Title = "DIPCOIN";
        var trailchar = starflag ? "*" : "\u00A0";
        var char = Title.charAt(curChar);
        char = char.toLowerCase();
        Title[curChar] = char;
        
        document.title = trailchar + Title.substr(0, curChar) + char + Title.substr(curChar + 1, curChar+Title.length) + trailchar;
        
        if(curChar == Title.length - 1)
            curChar = 0;
        else
            curChar++;
        starflag = !starflag;
    }
    
    setInterval(capitalize, 300);
}