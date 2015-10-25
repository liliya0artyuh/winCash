module states {
    // GAME CLASS
    export class Game extends objects.Scene {
        // PRIVATE INSTANCE VARIABLES
        private _messageLabel: objects.Label;
        private _jackpotLabel: objects.Label;
        private _creditLabel: objects.Label;
        private _quitButton: objects.Button;
        private _spinButton: objects.Button;
        private _spinButtonGrey: objects.Button;
        private _resetButton: objects.Button;
        private _reel1: createjs.Sprite;
        private _reel2: createjs.Sprite;
        private _reel3: createjs.Sprite;
        private _startReel1: createjs.Bitmap;
        private _startReel2: createjs.Bitmap;
        private _startReel3: createjs.Bitmap;
        private _betDropBox;
        private _dropBoxDiv;
        private _line: createjs.Shape;

        private _playerMoney = 0;
        private _winnings = 0;
        private _jackpot = 0;
        private _playerBet = 0;
        private _winNumber = 0;
        private _lossNumber = 0;
        private _spinResult;
        private _fruits = "";
        private _winRatio = 0;
        private _white = 0;
        private _yellow = 0;
        private _orange = 0;
        private _red = 0;
        private _green = 0;
        private _blue = 0;
        private _black = 0;
        private _blanks = 0;

        // CONSTRUCTOR
        constructor() {
            super();
        }

        // PUBLIC METHODS
        public start(): void {
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
            this._betDropBox.style.width= "126px";
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
            this._creditLabel = new objects.Label(" bbb" + this._playerMoney , "40px Consolas", "#FF0000", 240, 520, true);
            this.addChild(this._creditLabel); // add label to the stage


            // jackpot label
            this._jackpotLabel = new objects.Label("" + this._jackpot, "40px Consolas", "#FF0000", 377, 88, true);
            this.addChild(this._jackpotLabel); // add label to the stage


            // message to user label
            this._messageLabel = new objects.Label(" ", "20px Consolas", "#FF0000", 377, 409, true);
            this.addChild(this._messageLabel); // add label to the stage


            //// start button
            this._spinButton = new objects.Button("spinBtn", 350, 451, false, true);//add spin button to canvas
            this.addChild(this._spinButton);
            this._spinButton.on("click", this._clickSpinButton, this); // event listener

            this._resetButton = new objects.Button("resetBtn", 351, 510, false, true);//add reset button to canvas
            this.addChild(this._resetButton);
            this._resetButton.on("click", this._clickResetButton, this); // event listener

            this._quitButton = new objects.Button("quitBtn", 649, 461, false, true);//add start button to canvas
            this.addChild(this._quitButton);
            this._quitButton.on("click", this._clickQuitButton, this); // event listener

            stage.addChild(this);

        }


        public update(): void {
            this._jackpotLabel.text = "" + this._jackpot;
            this._creditLabel.text = "" + this._playerMoney;
        }


        /* Utility function to check if a value falls within a range of bounds */
        private _checkRange(value, lowerBounds, upperBounds) {
            if (value >= lowerBounds && value <= upperBounds) {
                return value;
            }
            else {
                return !value;
            }
        }


        /* When this function is called it determines the betLine results.
        e.g. Bar - Orange - Banana */
        private _Reels() {
            var betLine = [" ", " ", " "];
            var outCome = [0, 0, 0];
            for (var spin = 0; spin < 3; spin++) {
                outCome[spin] = Math.floor((Math.random() * 65) + 1);
                switch (outCome[spin]) {
                    case this._checkRange(outCome[spin], 1, 27):  // 41.5% probability
                        betLine[spin] = "blank";
                        this._blanks++;
                        break;
                    case this._checkRange(outCome[spin], 28, 37): // 15.4% probability
                        betLine[spin] = "flower_white_s";
                        this._white++;
                        break;
                    case this._checkRange(outCome[spin], 38, 46): // 13.8% probability
                        betLine[spin] = "flower_yellow_s";
                        this._yellow++;
                        break;
                    case this._checkRange(outCome[spin], 47, 54): // 12.3% probability     
                        betLine[spin] = "flower_orange_s";
                        this._orange++;
                        break;
                    case this._checkRange(outCome[spin], 55, 59): //  7.7% probability      
                        betLine[spin] = "flower_red_s";
                        this._red++;
                        break;
                    case this._checkRange(outCome[spin], 60, 62): //  4.6% probability     
                        betLine[spin] = "flower_green_s";
                        this._green++;
                        break;
                    case this._checkRange(outCome[spin], 63, 64): //  3.1% probability  
                        betLine[spin] = "flower_blue_s";
                        this._blue++;
                        break;
                    case this._checkRange(outCome[spin], 65, 65): //  1.5% probability       
                        betLine[spin] = "flower_black_s";
                        this._black++;
                        break;
                }
            }
            return betLine;
        }



        // PRIVATE METHODS ++++++++++++++++++++++++++++++++++++++++++++++
        // Callback function / Event Handler for Back Button Click
        private _clickSpinButton(event: createjs.MouseEvent): void {
            //remove line
            this.removeChild(this._line);

            //get bet amount
            if (this._betDropBox.value == "max") {
                this._playerBet = this._playerMoney;
            } else {
                this._playerBet = this._betDropBox.value;
            }

            //validate players money
            if (this._playerMoney == 0) {
                this._messageLabel.text = ("No Money! Click Reset to play again.");
                this._centerLabel();
                this._disableSpinButton();
            } else if (this._playerBet > this._playerMoney && this._playerMoney >= 5) {
                this._messageLabel.text = ("Credit low! Choose smaller bet.");
                this._centerLabel();
            } else if (this._playerBet > this._playerMoney && this._playerMoney < 5) {
                this._messageLabel.text = ("Credit low! Click Reset to play again.");
                this._centerLabel();
                this._disableSpinButton();
            } else if (this._playerBet < 0) {
                this._messageLabel.text = ("All bets must be a positive $ amount.");
                this._centerLabel();
                this._disableSpinButton();
            } else if (this._playerBet <= this._playerMoney) {
                this._spinResult = this._Reels();
                this._displayReels();
                this._determineWinnings();
            } else {
                this._messageLabel.text = ("Please enter a valid bet amount");
                this._centerLabel();
            }

            //add line above images
            this.addChild(this._line);
        }


        //display reels
        private _displayReels(): void {
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
        }


        //set up SPIN image as initial image on the reeels
        private _startReels(): void {
            this._reel1.gotoAndStop("spin");
            this._reel2.gotoAndStop("spin");
            this._reel3.gotoAndStop("spin");

            //add line above images
            this.addChild(this._line);
        }

        private _drawLine(): void {          
            this._line = new createjs.Shape();
            this._line.graphics.setStrokeStyle(3);
            this._line.graphics.beginStroke("#000000");
            this._line.graphics.moveTo(100, 265);
            this._line.graphics.lineTo(651, 265);
            this._line.graphics.endStroke();
        }


        /* Utility function to reset all fruit tallies */
        private _resetFruitTally() {
            this._white = 0;
            this._yellow = 0;
            this._orange = 0;
            this._red = 0;
            this._green = 0;
            this._blue = 0;
            this._black = 0;
            this._blanks = 0;
        }



        /* Utility function to reset the player stats */
        private _resetAll() {
            this._playerMoney = 1000;
            this._winnings = 0;
            this._jackpot = 5000;
            this._playerBet = 0;
            this._winNumber = 0;
            this._lossNumber = 0;
            this._winRatio = 0;
        }


        private _disableSpinButton() {
            this.removeChild(this._spinButton);
            this._spinButtonGrey = new objects.Button("spinBtn_grey", 350, 451, false, false);//add spin button to canvas
            this.addChild(this._spinButtonGrey);
        }

        /* Check to see if the player won the jackpot */
        private _checkJackPot() {
            /* compare two random values */
            var jackPotTry = Math.floor(Math.random() * 51 + 1);
            var jackPotWin = Math.floor(Math.random() * 51 + 1);

            if (jackPotTry == jackPotWin) {
                this._messageLabel.text = ("You Won the $" + this._jackpot + " Jackpot!!");
                this._centerLabel();
                this._playerMoney += this._jackpot;
                this._jackpot = 1000;
            }
        }



        /* Utility function to show a win message and increase player money */
        private _showWinMessage() {
            this._playerMoney += this._winnings;
            this._messageLabel.text = ("Bet = " + this._playerBet + " WinCash = " + this._winnings);
            this._centerLabel();
            this._resetFruitTally();
            this._checkJackPot();
        }



        /* Utility function to show a loss message and reduce player money */
        private _showLossMessage() {
            this._messageLabel.text = ("Bet = " + this._playerBet + " Lost = " + this._playerBet);
           this._centerLabel();
            this._playerMoney -= this._playerBet;
            this._resetFruitTally();
        }

        private _centerLabel(): void {
            this._messageLabel.x = 377;
            this._messageLabel.y = 409;
            this._messageLabel.regX = this._messageLabel.getBounds().width * 0.5;
            this._messageLabel.regY = this._messageLabel.getBounds().height * 0.5;
        }

        /* This function calculates the player's winnings, if any */
        private _determineWinnings() {
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
        }

        // Callback function / Event Handler for Next Button Click
        private _clickResetButton(event: createjs.MouseEvent): void {
            this._dropBoxDiv.removeChild(this._betDropBox);
            changeState(config.PLAY_STATE);
        }

        // Callback function / Event Handler for Next Button Click
        private _clickQuitButton(event: createjs.MouseEvent): void {
            this._dropBoxDiv.removeChild(this._betDropBox);
            changeState(config.MENU_STATE);
        }
    }
} 