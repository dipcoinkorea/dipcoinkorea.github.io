module Chat {
    var togglers = document.querySelectorAll("[data-behavior='chat-toggler']");
    var t = togglers.length;
    while(t--) {
    	let toggler = togglers[t];
    	toggler.addEventListener("click", () => {
            document.body.classList.toggle("chat-open");
        });
    }
}