var Chat;
(function (Chat) {
    var togglers = document.querySelectorAll("[data-behavior='chat-toggler']");
    var t = togglers.length;
    while (t--) {
        var toggler = togglers[t];
        toggler.addEventListener("click", function () {
            document.body.classList.toggle("chat-open");
        });
    }
})(Chat || (Chat = {}));
