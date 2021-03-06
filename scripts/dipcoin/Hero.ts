/// <reference path="../lib/definitions-custom.ts"/>
/// <reference path="Helpers.ts"/>

const BASESPEED: number = 0.3; 

class Hero  {
        public Elt: HTMLElement;
        public Position: IPosition;
        public Speed: number = BASESPEED;
        
        private _Direction: Direction[];
        private _Interval; 
        
        constructor(container: HTMLElement) {
            this.Elt = document.createElement("a");
            
            this.Elt.setAttribute("href", "javascript:void(0)");
            this.Elt.classList.add("hero");
            container.appendChild(this.Elt);
            this.Position = {x : 50, y: 50};
            this._Direction = [Direction.Top, Direction.Left];
            this.Move();

            this.Elt.addEventListener("click", this._Click);
            this.Elt.addEventListener("mouseover", this._MouseOver);
            this.Elt.addEventListener("mouseout", this._MouseOut);
        }
        
        //Changes one of the direction (randomly selected)
        public ChangeDir = () => {
            var randomDirIndex = Helpers.GetRandomInt(0, this._Direction.length - 1);
            this._ChangeDir(randomDirIndex);
        }
        
        public ChangeDirFromCollision(fromDirs: Direction[]) {
            var l = fromDirs.length;
            while(l--) {
                var from = fromDirs[l];
                var dirIndex = this._Direction.indexOf(from);
                
                this._ChangeDir(dirIndex)
            }
        }
        
        
        private _ChangeDir = (dirIndex: number) => {
            if(dirIndex < 0 || dirIndex >= this._Direction.length)
                return;
            
            var from = this._Direction[dirIndex];
            
            switch (from) {
                case Direction.Top:
                    this._Direction[dirIndex] = Direction.Bottom;
                    break;
                case Direction.Bottom:
                    this._Direction[dirIndex] = Direction.Top;
                    break;
                case Direction.Left:
                    this._Direction[dirIndex] = Direction.Right;
                    break;
                case Direction.Right:
                    this._Direction[dirIndex] = Direction.Left;
                    break;  
            }   
        }

        private _MouseOver = () => {
            this.Speed = this.Speed * 3;
        }

        private _MouseOut = () => {
            this.Speed = BASESPEED;
        }

        private _Click = () => {
            this.Elt.removeEventListener("mouseout", this._MouseOut);
            this.Speed = this.Speed * 5;
            this.Elt.classList.add("rotating");
            this.Elt.classList.add("active");
            setTimeout(() => {
                document.location.href = "home.html";
            }, 3000);
        }
        
        public GoOppositeDir() {
            var l = this._Direction.length;
            while(l--) {
                this._ChangeDir(l);
            }
        }
        
        public Move() {
            this._Direction.forEach(dir => {
                switch(dir) {
                    case Direction.Top:
                        this.Position.y = this.Position.y - this.Speed;
                        break;
                    case Direction.Bottom:
                        this.Position.y = this.Position.y + this.Speed;
                        break;
                    case Direction.Left:
                        this.Position.x = this.Position.x - this.Speed;
                        break;             
                    case Direction.Right:
                        this.Position.x = this.Position.x + this.Speed;
                        break;    
                }
            });
            
            this.Elt.style.top = this.Position.y + "%";
            this.Elt.style.left = this.Position.x + "%";
        }
       
    }