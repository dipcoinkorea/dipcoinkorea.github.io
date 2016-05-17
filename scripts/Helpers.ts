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
    
}