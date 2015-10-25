/// <reference path="../config/config.ts" />
/// <reference path="../typings/jquery/jquery.d.ts" />
/// <reference path="../typings/stats/stats.d.ts" />
/// <reference path="../typings/createjs-lib/createjs-lib.d.ts" />
/// <reference path="../typings/easeljs/easeljs.d.ts" />
/// <reference path="../typings/tweenjs/tweenjs.d.ts" />
/// <reference path="../typings/soundjs/soundjs.d.ts" />
/// <reference path="../typings/preloadjs/preloadjs.d.ts" />
/// <reference path="../objects/label.ts" />
/// <reference path="../objects/button.ts" />
/// <reference path="../objects/scene.ts" />
/// <reference path="../states/over.ts" />
/// <reference path="../states/game.ts" />
/// <reference path="../states/menu.ts" />
// GLOBAL GAME FRAMEWORK VARIABLES
var assets;
var canvas;
var stage;
var stats;
var state;
var currentState; // alias for our current state
// GAME OBJECTS
var menu;
var game;
var over;
var textureAtlas;
var tickCounter;
var atlas = {
    "images": ["../../Assets/images/atlas.png"],
    "frames": [
        [2, 2, 120, 118, 0, 0, 0],
        [124, 2, 120, 118, 0, 0, 0],
        [246, 2, 120, 118, 0, 0, 0],
        [368, 2, 120, 118, 0, 0, 0],
        [490, 2, 120, 118, 0, 0, 0],
        [612, 2, 120, 118, 0, 0, 0],
        [734, 2, 120, 118, 0, 0, 0],
        [856, 2, 120, 118, 0, 0, 0],
        [978, 2, 120, 118, 0, 0, 0],
        [1100, 2, 120, 118, 0, 0, 0],
        [1222, 2, 120, 118, 0, 0, 0],
        [1344, 2, 120, 117, 0, 0, 0],
        [1466, 2, 79, 77, 0, 0, 0],
        [1466, 81, 158, 38, 0, 0, 0],
        [1547, 2, 79, 77, 0, 0, 0],
        [1628, 2, 158, 38, 0, 0, 0],
        [1628, 42, 158, 38, 0, 0, 0],
        [1626, 82, 157, 38, 0, 0, 0]
    ],
    "animations": {
        "blank": [0],
        "flower_blue_s": [1],
        "flower_green_s": [2],
        "flower_orange_s": [3],
        "flower_red_s": [4],
        "flower_white_s": [5],
        "flower_yellow_s": [6],
        "purchase": [7],
        "purchase1": [8],
        "purchase2": [9],
        "spin": [10],
        "flower_black_s": [11],
        "quitBtn": [12],
        "resetBtn_grey": [13],
        "startBtn": [14],
        "spinBtn": [15],
        "spinBtn_grey": [16],
        "resetBtn": [17]
    }
};
// manifest of all our assets
var manifest = [
    { id: "slotMachine", src: "../../Assets/images/slotMachine.png" }
];
function preload() {
    assets = new createjs.LoadQueue(true);
    assets.installPlugin(createjs.Sound);
    assets.loadManifest(manifest);
    textureAtlas = new createjs.SpriteSheet(atlas);
    setupStats(); // sets up our stats counting
    assets.on("complete", init, this);
}
function init() {
    canvas = document.getElementById("canvas"); // reference to canvas element
    stage = new createjs.Stage(canvas); // passing canvas to stage
    stage.enableMouseOver(20); // enable mouse events
    createjs.Ticker.setFPS(60); // set frame rate to 60 fps
    createjs.Ticker.on("tick", gameLoop); // update gameLoop every frame
    tickCounter = 0;
    state = config.MENU_STATE;
    changeState(state);
}
// Main Game Loop
function gameLoop(event) {
    tickCounter++;
    stats.begin(); // start counting
    currentState.update(); // calling State's update method
    stage.update(); // redraw/refresh stage every frame
    stats.end(); // stop counting
}
// Setup Game Stats
function setupStats() {
    stats = new Stats();
    stats.setMode(0); // shows fps
    stats.domElement.style.position = "absolute";
    stats.domElement.style.left = "0px";
    stats.domElement.style.top = "0px";
    document.body.appendChild(stats.domElement);
}
// state machine prep
function changeState(state) {
    // Launch various scenes
    switch (state) {
        case config.MENU_STATE:
            // show the menu scene
            stage.removeAllChildren();
            menu = new states.Menu();
            currentState = menu;
            break;
        case config.PLAY_STATE:
            // show the play scene
            stage.removeAllChildren();
            game = new states.Game();
            currentState = game;
            break;
        case config.OVER_STATE:
            // show the game over scene
            stage.removeAllChildren();
            over = new states.Over();
            currentState = over;
            break;
    }
    currentState.start();
    console.log(currentState.numChildren);
}
//# sourceMappingURL=game.js.map