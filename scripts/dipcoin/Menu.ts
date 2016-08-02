module Menu {
	var menuToggler = document.getElementById("menu-toggler");
	console.log("menu");
	if(menuToggler) {
		menuToggler.addEventListener("click", () => {
			document.body.classList.toggle("menu-open");
		});
	}
}