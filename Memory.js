// Global config
const NUM_COLS = 4;
const NUM_ROWS = 4;
let spaceX = 400 - NUM_COLS * 78;
let spaceY = 400 - NUM_ROWS * 78;
let x;
let Tree1;
let spring;
let dandelion;
let startGame = 0;
let tiles;
var flippedTiles = [];
let ratio = 1;
let game = true;
let faces = [];
let Color1, Color2;
let userTurn = 1;
let winner = 0;
let time = 0;

var numTries = 0;
var numMatches1 = 0;
var numMatches2 = 0;
var numMatches = 0;
var delayStartFC = null;

const shuffle = function (input) {
    const output = [...input]
    let counter = output.length;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        const index = Math.floor(Math.random() * counter);
        // Decrease counter by 1
        counter--;
        // And swap the last element with it
        var temp = output[counter];
        output[counter] = output[index];
        output[index] = temp;
    }
    return output;
};

function preload() {
    Color1 = loadImage("avatars/Color1.png");
    Color2 = loadImage("avatars/Color2.png");
    mainfont = loadFont('avatars/bodoni-mt.ttf')
    spring = loadImage("avatars/background.png");
    social = loadImage("avatars/Social.jpg");
    dandelion = loadImage("avatars/dandelion.png");
    Tree1 = loadImage("avatars/Tree1.png");
    const Tree2 = loadImage("avatars/Tree2.png");
    const Tree3 = loadImage("avatars/Tree3.png");
    const Tree4 = loadImage("avatars/Tree4.png");
    const Tree5 = loadImage("avatars/Tree5.png");
    const Tree6 = loadImage("avatars/Tree6.png");
    const Tree7 = loadImage("avatars/Tree7.png");
    const Tree8 = loadImage("avatars/Tree8.png");
    const Tree9 = loadImage("avatars/Tree9.png");
    const Tree10 = loadImage("avatars/Tree10.png");
    faces = [Tree1, Tree2, Tree3, Tree4, Tree5, Tree6, Tree7, Tree8, Tree9, Tree10]
}

// Define Tile
class Tile {
    constructor(x, y, face) {
        this.x = x;
        this.y = y;
        this.width = 70 * ratio;
        this.face = face;
        this.isFaceUp = false;
        this.isMatch = false;
    }

    draw(leafimage) {
        fill(214, 247, 202);
        noStroke();
        rect(this.x, this.y, this.width, this.width, 10 * ratio);
        if (this.isFaceUp) {
            image(this.face, this.x, this.y, this.width, this.width);
        } else {
            image(leafimage, this.x, this.y, this.width, this.width);
        }
    }

    isUnderMouse(x, y) {
        return x >= this.x && x <= this.x + this.width &&
            y >= this.y && y <= this.y + this.width;
    }
}

const initializeTiles = function () {
    const requireFacesCount = (NUM_COLS * NUM_ROWS) / 2;
    // Make an array which has 2 of each, then randomize it
    const selectedFaces = faces.slice(0, requireFacesCount)

    const selected = shuffle([...selectedFaces, ...selectedFaces]);

    // Create the tiles
    const result = [];
    for (let i = 0; i < NUM_COLS; i++) {

        for (let j = 0; j < NUM_ROWS; j++) {
            const tileX = (i * 78 + spaceX / 2) * ratio;
            const tileY = (j * 78 + 30 + spaceY / 2) * ratio;
            const tileFace = selected.pop();
            result.push(new Tile(tileX, tileY, tileFace));
        }
    };
    return result;
}

function setup() {
    if (windowHeight <= windowWidth) {
        ratio = (windowHeight - 80) / 400;
    } else {
        ratio = (windowWidth - 80) / 400;
    }
    createCanvas(400 * ratio, 400 * ratio);

    tiles = initializeTiles();

}


var restart = function () {
    userTurn = 1;
    game = true;
    winner = 0;
    time = 0;
    numTries = 0;
    numMatches1 = 0;
    numMatches2 = 0;
    numMatches = numMatches1 + numMatches2;
    flippedTiles = [];
    delayStartFC = null;
    frameCount = null;
    tiles = initializeTiles()
};

mouseClicked = function () {
    if (startGame === 0) {
        //rect(200 * ratio, 320 * ratio, 180 * ratio, 40 * ratio, 10);
        if (mouseX >= 110 * ratio && mouseX <= 310 * ratio && mouseY >= 300 * ratio && mouseY <= 340 * ratio) {
            startGame = 1;
            mouseX = 0;
        }
    }
    if (game === true && startGame !== 0) {
        for (var i = 0; i < tiles.length; i++) {
            var tile = tiles[i];
            if (tile.isUnderMouse(mouseX, mouseY)) {
                if (flippedTiles.length < 2 && !tile.isFaceUp) {
                    tile.isFaceUp = true;
                    flippedTiles.push(tile);
                    if (flippedTiles.length === 2) {
                        numTries++;

                        if (flippedTiles[0].face === flippedTiles[1].face) {
                            flippedTiles[0].isMatch = true;
                            flippedTiles[1].isMatch = true;
                            flippedTiles.length = 0;
                            if (userTurn === 1) {
                                numMatches1++;
                            } else {
                                numMatches2++;
                            }

                        }
                        if (userTurn === 1) {
                            userTurn = 2;
                        } else {
                            userTurn = 1;
                        }
                        delayStartFC = frameCount;
                    }
                }
                loop();
            }
        }
    }
    if (game === false && mouseX >= 150 * ratio && mouseX <= 250 * ratio && mouseY >= 300 * ratio && mouseY <= 340 * ratio) {
        restart();
    }
};

function draw() {
    background(255, 255, 255);
    x = cos(millis() * 0.01);
    textFont(mainfont);
    image(spring, 0, 0, 400 * ratio, 400 * ratio);
    if (startGame === 0) {
        image(spring, 0, 0, 400 * ratio, 400 * ratio);
        image(Tree1, 30 * ratio, 170 * ratio, 120 * ratio, 120 * ratio);
        textSize(50 * ratio);
        textAlign(CENTER);
        text('Spr ng memor es', 200 * ratio, 120 * ratio);
        textAlign(LEFT);
        fill(200, 30, 0);
        text('i', 98 * ratio, 120 * ratio + x * 3);
        text('i', 320 * ratio, 120 * ratio - x * 3);
        rectMode(CENTER);
        noStroke();
        fill('rgba(227, 229, 58, 0.6)');
        rect(200 * ratio, 320 * ratio, 180 * ratio, 40 * ratio, 10);
        textSize(22 * ratio);
        fill(0);
        textAlign(CENTER);
        text('Click here to start', 200 * ratio, 325 * ratio);
        rectMode(CORNER);
        textAlign(LEFT);
    }
    else if (startGame !== 0) {
        numMatches = numMatches1 + numMatches2;
        textSize(13 * ratio);
        text('Player: ' + userTurn, 50 * ratio, 40 * ratio);
        text('Player 1: ' + numMatches1, 300 * ratio, 40 * ratio);
        text('Player 2: ' + numMatches2, 300 * ratio, 59 * ratio);
        if (delayStartFC && (frameCount - delayStartFC) > 30) {
            for (var i = 0; i < tiles.length; i++) {
                var tile = tiles[i];
                if (!tile.isMatch) {
                    tile.isFaceUp = false;
                }
            }
            flippedTiles = [];
            delayStartFC = null;
        }
        for (let tile of tiles) {
            let color;
            if (mouseX >= tile.x && mouseX <= tile.x + tile.width && mouseY >= tile.y && mouseY <= tile.y + tile.width) {
                color = Color2;
            }
            else {
                color = Color1
            }
            tile.draw(color);
        }
        fill(0, 0, 0);
        textSize(20);
        if (numMatches === tiles.length / 2) {
            textAlign(CENTER);
            game = false;
            fill(255);
            rect(0, 0, 400 * ratio, 400 * ratio);
            fill('rgba(255,255,255,0.5)');
            image(spring, 0, 0, 400 * ratio, 400 * ratio);
            rect(150 * ratio, 300 * ratio, 100 * ratio, 40 * ratio);
            fill(0, 0, 0);
            textSize(25 * ratio);
            text("Restart", 200 * ratio, 325 * ratio);
            if (numMatches1 > numMatches2) {
                winner = 1;
                text("The winner is Player " + winner + "!!!", 200 * ratio, 100 * ratio);
            } else if (numMatches1 < numMatches2) {
                winner = 2;
                text("The winner is Player " + winner + "!!!", 200 * ratio, 100 * ratio);
            } else if (numMatches1 === numMatches2) {
                text("Both of you are the winners!", 200 * ratio, 100 * ratio);
            }
        } else {
            time++;
            textSize(13 * ratio);
            text('Time: ' + floor(time / 50), 50 * ratio, 60 * ratio);
        }
    }
};