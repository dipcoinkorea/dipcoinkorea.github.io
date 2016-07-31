var Chat;
(function (Chat) {
    var toggler = document.getElementById("chat-toggler");
    if (toggler) {
        toggler.addEventListener("click", function () {
            document.body.classList.toggle("chat-open");
        });
    }
})(Chat || (Chat = {}));
