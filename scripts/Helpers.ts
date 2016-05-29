module Helpers {
      
    export var GetRectangle = (elt: HTMLElement): IRectangle => {
            var pos = elt.getBoundingClientRect();
            return {
                Top: pos.top,
                Right: pos.right,
                Bottom: pos.bottom,
                Left: pos.left
            }
    }
    
    export var IsOutside = (rect: IRectangle, container: IRectangle) => {
        
        return (rect.Top <= container.Top) 
            || (rect.Left <= container.Left) 
            || (rect.Right >= container.Right )
            || (rect.Bottom >= container.Bottom);
    }
    
    export var GetRandomInt = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    export var GetOutsideDir = (rect: IRectangle, container: IRectangle): Direction[] => {
        var result = [];
        
        if(rect.Top <= container.Top)
            result.push(Direction.Top);
           
        if(rect.Left <= container.Left)
            result.push(Direction.Left);
            
        if(rect.Right >= container.Right)
            result.push(Direction.Right);
            
        if(rect.Bottom >= container.Bottom)
            result.push(Direction.Bottom);
            
        return result;
    }
    
}