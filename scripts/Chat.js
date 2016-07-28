var Chat;
(function (Chat) {
    var toggler = document.getElementById("chat-toggler");
    if (toggler) {
        toggler.addEventListener("click", function () {
            if (document.body.classList.contains("chat-open"))
                document.body.classList.remove("chat-open");
            else
                document.body.classList.add("chat-open");
        });
    }
})(Chat || (Chat = {}));
