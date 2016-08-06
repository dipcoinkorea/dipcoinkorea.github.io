module Menu {
	var menuToggler = document.getElementById("menu-toggler");
	if(menuToggler) {
		menuToggler.addEventListener("click", () => {
			document.body.classList.toggle("menu-open");
		});
	}
}