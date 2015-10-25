var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var states;
(function (states) {
    // MENU CLASS
    var Menu = (function (_super) {
        __extends(Menu, _super);
        // CONSTRUCTOR
        function Menu() {
            _super.call(this);
        }
        // PUBLIC METHODS
        Menu.prototype.start = function () {
            tickCounter = 0;
            this._lowerTickBoundary = 0;
            this._higherTickBoundary = 50;
            // this._messageContainer = new createjs.Container;
            // this._messageContainer.setBounds(123, 409, 505, 300);
            // hello label
            this._helloLabel = new objects.Label("Do you want to play? Hit Start button!", "20px Consolas", "#FF0000", 377, 409, true);
            this.addChild(this._helloLabel); // add label to the stage
            this._isDisplayed = true;
            //// start button
            this._spinButton = new objects.Button("spinBtn_grey", 350, 451, false, false); //add spin button to canvas
            this.addChild(this._spinButton);
            this._resetButton = new objects.Button("resetBtn_grey", 351, 510, false, false); //add reset button to canvas
            this.addChild(this._resetButton);
            this._startButton = new objects.Button("startBtn", 649, 461, false, true); //add start button to canvas
            this.addChild(this._startButton);
            this._startButton.on("click", this._clickStartButton, this); // event listener
            stage.addChild(this);
        };
        Menu.prototype.update = function () {
            //make label flicker
            console.log(tickCounter);
            if (!this._isDisplayed && (tickCounter >= this._lowerTickBoundary && tickCounter <= this._higherTickBoundary)) {
                this._helloLabel.text = "Do you want to play? Hit Start button!";
                if (tickCounter == this._higherTickBoundary) {
                    this._isDisplayed = true;
                    this._lowerTickBoundary += 100;
                    this._higherTickBoundary += 100;
                }
            }
            else {
                this._helloLabel.text = "";
                this._isDisplayed = false;
            }
            //the label inviting user to play moving to the left - will try at another time
            //this._helloLabel.x -= 1;
            //if (this._helloLabel.x <= 20 + this._helloLabel.getBounds().width * 0.5) {
            //    //this._helloLabel.x = 630 - this._helloLabel.getBounds().width * 0.5;
            //    this._helloLabel.x = 630 - this._helloLabel.getBounds().width * 0.01;
            //}
        };
        // PRIVATE METHODS ++++++++++++++++++++++++++++++++++++++++++++++
        // Callback function / Event Handler for Start Button Click
        Menu.prototype._clickStartButton = function (event) {
            changeState(config.PLAY_STATE);
        };
        return Menu;
    })(objects.Scene);
    states.Menu = Menu;
})(states || (states = {}));
//# sourceMappingURL=menu.js.map