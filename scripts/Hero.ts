/// <reference path="lib/definitions-custom.ts"/>

class Hero  {
        public Elt: HTMLElement;
        public Position: IPosition;
        
        private _Direction: Direction[];
        private _Interval;
        
        constructor(container: HTMLElement) {
            this.Elt = document.createElement("div");
            
            this.Elt.classList.add("hero")
            container.appendChild(this.Elt);
            this.Position = {x : 50, y: 50};
            this._Direction = [Direction.Top, Direction.Left];
            this.Move();
        }
        
        public Move() {
            this._Interval = setInterval(() => {
                this._Move();
            }, 300);
        }
        
        private RandomDirection() {
            
        }
        
        private _Move() {
            this._Direction.forEach(dir => {
                switch(dir) {
                    case Direction.Top:
                        this.Position.y = this.Position.y + 0.2;
                        break;
                    case Direction.Bottom:
                        this.Position.y = this.Position.y - 0.2;
                        break;
                    case Direction.Left:
                        this.Position.x = this.Position.x - 0.2;
                        break;             
                    case Direction.Right:
                        this.Position.x = this.Position.x + 0.2;
                        break;    
                }
            });
            
            this.Elt.style.top = this.Position.y + "%";
            this.Elt.style.left = this.Position.x + "%";
        }
    }