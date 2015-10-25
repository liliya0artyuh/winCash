var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objects;
(function (objects) {
    var Button = (function (_super) {
        __extends(Button, _super);
        //CONSTRUCTOR
        function Button(pathString, x, y, centered, hoverEnabled) {
            _super.call(this, textureAtlas, pathString);
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
        Button.prototype.overButton = function (event) {
            if (this.hoverEnabled) {
                event.currentTarget.alpha = 0.7;
            }
        };
        // Event Handler for mouse out
        Button.prototype.outButton = function (event) {
            if (this.hoverEnabled) {
                event.currentTarget.alpha = 1.0;
            }
        };
        return Button;
    })(createjs.Sprite);
    objects.Button = Button;
})(objects || (objects = {}));
//# sourceMappingURL=button.js.map