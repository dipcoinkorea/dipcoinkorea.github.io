var Menu;
(function (Menu) {
    var menuToggler = document.getElementById("menu-toggler");
    console.log("menu");
    if (menuToggler) {
        menuToggler.addEventListener("click", function () {
            document.body.classList.toggle("menu-open");
        });
    }
})(Menu || (Menu = {}));
