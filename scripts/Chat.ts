module Chat {
    var _Container = document.getElementById("chat");
    export var Toggle = () => {
        if(_Container.classList.contains("open"))
            _Container.classList.remove("open");
        else
            _Container.classList.add("open");
    }
}