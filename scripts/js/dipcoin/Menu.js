var Menu;
(function (Menu) {
    var menuToggler = document.getElementById("menu-toggler");
    if (menuToggler) {
        menuToggler.addEventListener("click", function () {
            document.body.classList.toggle("menu-open");
        });
    }
})(Menu || (Menu = {}));
