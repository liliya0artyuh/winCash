module objects {
    export class Button extends createjs.Sprite {
        //PRIVATE INSTANCE VARIABLES
        width: number;
        height: number;
        hoverEnabled: boolean;
        //CONSTRUCTOR
        constructor(pathString: string, x: number, y: number, centered: boolean, hoverEnabled: boolean) {
            super(textureAtlas, pathString);
            this.hoverEnabled = hoverEnabled;
            this.x = x;
            this.y = y;

            this.width = 150;
            this.height = 50;

            if (centered) {
                this.regX = this.getBounds().width * 0.5;
                this.regY = this.getBounds().height * 0.5;
            }

            this.on("mouseover", this.overButton, this);
            this.on("mouseout", this.outButton, this);
        }

        // PRIVATE METHODS
        // Event Handler for mouse over
        overButton(event: createjs.MouseEvent): void {
            if (this.hoverEnabled) {
                event.currentTarget.alpha = 0.7;
            }
        }

        // Event Handler for mouse out
        outButton(event: createjs.MouseEvent): void {
            if (this.hoverEnabled) {
                event.currentTarget.alpha = 1.0;
            }
        }


    }
} 