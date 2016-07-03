module Chat {
    var toggler = document.getElementById("chat-toggler");
    if(toggler) { 
        toggler.addEventListener("click", () => {
            if(document.body.classList.contains("chat-open"))
                document.body.classList.remove("chat-open");
            else
                document.body.classList.add("chat-open");
        });
    }
}