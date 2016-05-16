/// <reference path="lib/definitions-custom.ts"/>
/// <reference path="./Hero.ts"/>

module Playground {
    var
        _TotalFaces = 1,
        _Heroes: Hero[]= [],
        Container = document.getElementById("playground");
        
    for(var i = 0; i < _TotalFaces; i++) {
        _Heroes.push(new Hero(Container));
    }
    
}