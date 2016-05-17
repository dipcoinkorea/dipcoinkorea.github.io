/// <reference path="lib/definitions-custom.ts"/>
/// <reference path="./Hero.ts"/>

module Playground {
    var
        _TotalFaces = 1,
        _Heroes: Hero[]= [],
        Container = document.getElementById("playground"),
        ContainerRect = Helpers.GetRectangle(Container);
        
    for(var i = 0; i < _TotalFaces; i++) {
        _Heroes.push(new Hero(Container));
    }
    
    var _LoopActions = () => {
        
        
        
    }
    
    console.log(ContainerRect);
    
    var _Interval = setInterval(() => {
        for(var j = 0; j < _Heroes.length; j++) {
            
            var hero = _Heroes[j];
            hero.Move();
            
            if(Helpers.IsOutside(Helpers.GetRectangle(hero.Elt), ContainerRect)) {
                hero.GoOppositeDir();
            }
        }
    }, 300);
    
    
}