/// <reference path="lib/definitions-custom.ts"/>
/// <reference path="Helpers.ts"/>

const HERO_WIDTH: number = 100;
const HERO_HEIGHT: number = 130;
const SPEED: number = 5; 

class Hero  {
        public Elt: HTMLElement;
        public Position: IPosition;
        
        private _Direction: Direction[];
        private _Interval; 
        
        constructor(container: HTMLElement) {
            this.Elt = document.createElement("div");
            
            this.Elt.classList.add("hero")
            this.Elt.style.width = HERO_WIDTH + "px";
            this.Elt.style.height = HERO_HEIGHT + "px";
            container.appendChild(this.Elt);
            this.Position = {x : 50, y: 50};
            this._Direction = [Direction.Top, Direction.Left];
            this.Move();
        }
        
        public GoOppositeDir() {
            var l = this._Direction.length;
            while(l--) {
                var dir = this._Direction[l];
                    switch(dir) {
                        case Direction.Top:
                            this._Direction[l] = Direction.Bottom;
                            break;
                        case Direction.Bottom:
                            this._Direction[l] = Direction.Top;
                            break;
                        case Direction.Left:
                            this._Direction[l] = Direction.Right;
                            break;             
                        case Direction.Right:
                            this._Direction[l] = Direction.Left;
                            break;    
                    }
            }
        }
        
        public Move() {
            this._Direction.forEach(dir => {
                switch(dir) {
                    case Direction.Top:
                        this.Position.y = this.Position.y + SPEED;
                        break;
                    case Direction.Bottom:
                        this.Position.y = this.Position.y - SPEED;
                        break;
                    case Direction.Left:
                        this.Position.x = this.Position.x - SPEED;
                        break;             
                    case Direction.Right:
                        this.Position.x = this.Position.x + SPEED;
                        break;    
                }
            });
            
            this.Elt.style.top = this.Position.y + "%";
            this.Elt.style.left = this.Position.x + "%";
        }
       
    }