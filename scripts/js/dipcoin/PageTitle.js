String.prototype["replaceAt"] = function (index, character) {
    return;
};
var PageTitle;
(function (PageTitle) {
    var Title = "DIPCOIN";
    var inte;
    var curChar = 0;
    var starflag = true;
    var maxloadingstars = 5;
    var _capitalize = function () {
        var trailchar = starflag ? "*" : "\u00A0";
        var char = Title.charAt(curChar);
        char = char.toLowerCase();
        Title[curChar] = char;
        document.title = trailchar + Title.substr(0, curChar) + char + Title.substr(curChar + 1, curChar + Title.length) + trailchar;
        if (curChar == Title.length - 1)
            curChar = 0;
        else
            curChar++;
        starflag = !starflag;
    };
    var _blink = function () {
        var trailchar = starflag ? "*" : "\u00A0";
        document.title = trailchar + Title + trailchar;
        starflag = !starflag;
    };
    var _loading = function () {
        if (curChar == maxloadingstars)
            curChar = 0;
        else
            curChar++;
        document.title = Title + Array(curChar).join("*");
    };
    var Loading = function () {
        curChar = 0;
        clearInterval(inte);
        inte = setInterval(_loading, 250);
    };
    var Capitalize = function () {
        document.title = "*" + Title + "*";
        curChar = 0;
        clearInterval(inte);
        inte = setInterval(_capitalize, 300);
    };
    var Blink = function () {
        clearInterval(inte);
        inte = setInterval(_blink, 250);
    };
})(PageTitle || (PageTitle = {}));
