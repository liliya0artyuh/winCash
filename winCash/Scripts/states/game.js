var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var states;
(function (states) {
    // GAME CLASS
    var Game = (function (_super) {
        __extends(Game, _super);
        // CONSTRUCTOR
        function Game() {
            _super.call(this);
            this._playerMoney = 0;
            this._winnings = 0;
            this._jackpot = 0;
            this._playerBet = 0;
            this._winNumber = 0;
            this._lossNumber = 0;
            this._fruits = "";
            this._winRatio = 0;
            this._white = 0;
            this._yellow = 0;
            this._orange = 0;
            this._red = 0;
            this._green = 0;
            this._blue = 0;
            this._black = 0;
            this._blanks = 0;
        }
        // PUBLIC METHODS
        Game.prototype.start = function () {
            this._jackpot = 50000;
            this._playerMoney = 1000;
            this._reel1 = new createjs.Sprite(textureAtlas);
            this._reel2 = new createjs.Sprite(textureAtlas);
            this._reel3 = new createjs.Sprite(textureAtlas);
            //add first reel
            this._reel1.x = 125;
            this._reel1.y = 205;
            this.addChild(this._reel1);
            //add second reel
            this._reel2.x = 315;
            this._reel2.y = 205;
            this.addChild(this._reel2);
            //add third reel 
            this._reel3.x = 505;
            this._reel3.y = 205;
            this.addChild(this._reel3);
            //bet dropbox
            this._dropBoxDiv = document.getElementById("dropBoxDiv");
            this._betDropBox = document.createElement("select");
            this._betDropBox.name = "betDropBox";
            this._betDropBox.id = "dropBoxBet";
            this._betDropBox.style.width = "126px";
            this._betDropBox.style.height = "37px";
            this._betDropBox.options[this._betDropBox.length] = new Option("$ 5.00", "5");
            this._betDropBox.options[this._betDropBox.length] = new Option("$ 10.00", "10");
            this._betDropBox.options[this._betDropBox.length] = new Option("$ 25.00", "25");
            this._betDropBox.options[this._betDropBox.length] = new Option("$ 50.00", "50");
            this._betDropBox.options[this._betDropBox.length] = new Option("$ 100.00", "100");
            this._betDropBox.options[this._betDropBox.length] = new Option("MAX", "max");
            this._dropBoxDiv.appendChild(this._betDropBox);
            // create line that will be added above images
            this._drawLine();
            this._startReels();
            // credit label
            this._creditLabel = new objects.Label(" bbb" + this._playerMoney, "40px Consolas", "#FF0000", 240, 520, true);
            this.addChild(this._creditLabel); // add label to the stage
            // jackpot label
            this._jackpotLabel = new objects.Label("" + this._jackpot, "40px Consolas", "#FF0000", 377, 88, true);
            this.addChild(this._jackpotLabel); // add label to the stage
            // message to user label
            this._messageLabel = new objects.Label(" ", "20px Consolas", "#FF0000", 377, 409, true);
            this.addChild(this._messageLabel); // add label to the stage
            //// start button
            this._spinButton = new objects.Button("spinBtn", 350, 451, false, true); //add spin button to canvas
            this.addChild(this._spinButton);
            this._spinButton.on("click", this._clickSpinButton, this); // event listener
            this._resetButton = new objects.Button("resetBtn", 351, 510, false, true); //add reset button to canvas
            this.addChild(this._resetButton);
            this._resetButton.on("click", this._clickResetButton, this); // event listener
            this._quitButton = new objects.Button("quitBtn", 649, 461, false, true); //add start button to canvas
            this.addChild(this._quitButton);
            this._quitButton.on("click", this._clickQuitButton, this); // event listener
            stage.addChild(this);
        };
        Game.prototype.update = function () {
            this._jackpotLabel.text = "" + this._jackpot;
            this._creditLabel.text = "" + this._playerMoney;
        };
        /* Utility function to check if a value falls within a range of bounds */
        Game.prototype._checkRange = function (value, lowerBounds, upperBounds) {
            if (value >= lowerBounds && value <= upperBounds) {
                return value;
            }
            else {
                return !value;
            }
        };
        /* When this function is called it determines the betLine results.
        e.g. Bar - Orange - Banana */
        Game.prototype._Reels = function () {
            var betLine = [" ", " ", " "];
            var outCome = [0, 0, 0];
            for (var spin = 0; spin < 3; spin++) {
                outCome[spin] = Math.floor((Math.random() * 65) + 1);
                switch (outCome[spin]) {
                    case this._checkRange(outCome[spin], 1, 27):
                        betLine[spin] = "blank";
                        this._blanks++;
                        break;
                    case this._checkRange(outCome[spin], 28, 37):
                        betLine[spin] = "flower_white_s";
                        this._white++;
                        break;
                    case this._checkRange(outCome[spin], 38, 46):
                        betLine[spin] = "flower_yellow_s";
                        this._yellow++;
                        break;
                    case this._checkRange(outCome[spin], 47, 54):
                        betLine[spin] = "flower_orange_s";
                        this._orange++;
                        break;
                    case this._checkRange(outCome[spin], 55, 59):
                        betLine[spin] = "flower_red_s";
                        this._red++;
                        break;
                    case this._checkRange(outCome[spin], 60, 62):
                        betLine[spin] = "flower_green_s";
                        this._green++;
                        break;
                    case this._checkRange(outCome[spin], 63, 64):
                        betLine[spin] = "flower_blue_s";
                        this._blue++;
                        break;
                    case this._checkRange(outCome[spin], 65, 65):
                        betLine[spin] = "flower_black_s";
                        this._black++;
                        break;
                }
            }
            return betLine;
        };
        // PRIVATE METHODS ++++++++++++++++++++++++++++++++++++++++++++++
        // Callback function / Event Handler for Back Button Click
        Game.prototype._clickSpinButton = function (event) {
            //remove line
            this.removeChild(this._line);
            //get bet amount
            if (this._betDropBox.value == "max") {
                this._playerBet = this._playerMoney;
            }
            else {
                this._playerBet = this._betDropBox.value;
            }
            //validate players money
            if (this._playerMoney == 0) {
                this._messageLabel.text = ("No Money! Click Reset to play again.");
                this._centerLabel();
                this._disableSpinButton();
            }
            else if (this._playerBet > this._playerMoney && this._playerMoney >= 5) {
                this._messageLabel.text = ("Credit low! Choose smaller bet.");
                this._centerLabel();
            }
            else if (this._playerBet > this._playerMoney && this._playerMoney < 5) {
                this._messageLabel.text = ("Credit low! Click Reset to play again.");
                this._centerLabel();
                this._disableSpinButton();
            }
            else if (this._playerBet < 0) {
                this._messageLabel.text = ("All bets must be a positive $ amount.");
                this._centerLabel();
                this._disableSpinButton();
            }
            else if (this._playerBet <= this._playerMoney) {
                this._spinResult = this._Reels();
                this._displayReels();
                this._determineWinnings();
            }
            else {
                this._messageLabel.text = ("Please enter a valid bet amount");
                this._centerLabel();
            }
            //add line above images
            this.addChild(this._line);
        };
        //display reels
        Game.prototype._displayReels = function () {
            this._spinResult = this._Reels();
            //add image to first reel
            this._reel1.gotoAndStop(this._spinResult[0]);
            //this._reel1.x = 125;
            //this._reel1.y = 205;
            //this.addChild(this._reel1);
            //add image to second reel
            this._reel2.gotoAndStop(this._spinResult[1]);
            //this._reel2.x = 315;
            //this._reel2.y = 205;
            //this.addChild(this._reel2);
            //add image to third reel 
            this._reel3.gotoAndStop(this._spinResult[2]);
            //this._reel3.x = 505;
            //this._reel3.y = 205;
            //this.addChild(this._reel3);
        };
        //set up SPIN image as initial image on the reeels
        Game.prototype._startReels = function () {
            this._reel1.gotoAndStop("spin");
            this._reel2.gotoAndStop("spin");
            this._reel3.gotoAndStop("spin");
            //add line above images
            this.addChild(this._line);
        };
        Game.prototype._drawLine = function () {
            this._line = new createjs.Shape();
            this._line.graphics.setStrokeStyle(3);
            this._line.graphics.beginStroke("#000000");
            this._line.graphics.moveTo(100, 265);
            this._line.graphics.lineTo(651, 265);
            this._line.graphics.endStroke();
        };
        /* Utility function to reset all fruit tallies */
        Game.prototype._resetFruitTally = function () {
            this._white = 0;
            this._yellow = 0;
            this._orange = 0;
            this._red = 0;
            this._green = 0;
            this._blue = 0;
            this._black = 0;
            this._blanks = 0;
        };
        /* Utility function to reset the player stats */
        Game.prototype._resetAll = function () {
            this._playerMoney = 1000;
            this._winnings = 0;
            this._jackpot = 5000;
            this._playerBet = 0;
            this._winNumber = 0;
            this._lossNumber = 0;
            this._winRatio = 0;
        };
        Game.prototype._disableSpinButton = function () {
            this.removeChild(this._spinButton);
            this._spinButtonGrey = new objects.Button("spinBtn_grey", 350, 451, false, false); //add spin button to canvas
            this.addChild(this._spinButtonGrey);
        };
        /* Check to see if the player won the jackpot */
        Game.prototype._checkJackPot = function () {
            /* compare two random values */
            var jackPotTry = Math.floor(Math.random() * 51 + 1);
            var jackPotWin = Math.floor(Math.random() * 51 + 1);
            if (jackPotTry == jackPotWin) {
                this._messageLabel.text = ("You Won the $" + this._jackpot + " Jackpot!!");
                this._centerLabel();
                this._playerMoney += this._jackpot;
                this._jackpot = 1000;
            }
        };
        /* Utility function to show a win message and increase player money */
        Game.prototype._showWinMessage = function () {
            this._playerMoney += this._winnings;
            this._messageLabel.text = ("Bet = " + this._playerBet + " WinCash = " + this._winnings);
            this._centerLabel();
            this._resetFruitTally();
            this._checkJackPot();
        };
        /* Utility function to show a loss message and reduce player money */
        Game.prototype._showLossMessage = function () {
            this._messageLabel.text = ("Bet = " + this._playerBet + " Lost = " + this._playerBet);
            this._centerLabel();
            this._playerMoney -= this._playerBet;
            this._resetFruitTally();
        };
        Game.prototype._centerLabel = function () {
            this._messageLabel.x = 377;
            this._messageLabel.y = 409;
            this._messageLabel.regX = this._messageLabel.getBounds().width * 0.5;
            this._messageLabel.regY = this._messageLabel.getBounds().height * 0.5;
        };
        /* This function calculates the player's winnings, if any */
        Game.prototype._determineWinnings = function () {
            if (this._blanks == 0) {
                if (this._white == 3) {
                    this._winnings = this._playerBet * 10;
                }
                else if (this._yellow == 3) {
                    this._winnings = this._playerBet * 20;
                }
                else if (this._orange == 3) {
                    this._winnings = this._playerBet * 30;
                }
                else if (this._red == 3) {
                    this._winnings = this._playerBet * 40;
                }
                else if (this._green == 3) {
                    this._winnings = this._playerBet * 50;
                }
                else if (this._blue == 3) {
                    this._winnings = this._playerBet * 75;
                }
                else if (this._black == 3) {
                    this._winnings = this._playerBet * 100;
                }
                else if (this._white == 2) {
                    this._winnings = this._playerBet * 2;
                }
                else if (this._yellow == 2) {
                    this._winnings = this._playerBet * 2;
                }
                else if (this._orange == 2) {
                    this._winnings = this._playerBet * 3;
                }
                else if (this._red == 2) {
                    this._winnings = this._playerBet * 4;
                }
                else if (this._green == 2) {
                    this._winnings = this._playerBet * 5;
                }
                else if (this._blue == 2) {
                    this._winnings = this._playerBet * 10;
                }
                else if (this._black == 2) {
                    this._winnings = this._playerBet * 20;
                }
                else if (this._black == 1) {
                    this._winnings = this._playerBet * 5;
                }
                else {
                    this._winnings = this._playerBet * 1;
                }
                this._winNumber++;
                this._showWinMessage();
            }
            else {
                this._lossNumber++;
                this._showLossMessage();
            }
        };
        // Callback function / Event Handler for Next Button Click
        Game.prototype._clickResetButton = function (event) {
            this._dropBoxDiv.removeChild(this._betDropBox);
            changeState(config.PLAY_STATE);
        };
        // Callback function / Event Handler for Next Button Click
        Game.prototype._clickQuitButton = function (event) {
            this._dropBoxDiv.removeChild(this._betDropBox);
            changeState(config.MENU_STATE);
        };
        return Game;
    })(objects.Scene);
    states.Game = Game;
})(states || (states = {}));
//# sourceMappingURL=game.js.map