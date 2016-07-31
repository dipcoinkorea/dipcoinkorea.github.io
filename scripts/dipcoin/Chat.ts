module Chat {
    var toggler = document.getElementById("chat-toggler");
    if(toggler) { 
        toggler.addEventListener("click", () => {
            document.body.classList.toggle("chat-open");
        });
    }
}