import Obstacle from "./obstacle.js";
import ObstacleAnime from "./obstacleAnime.js";
import { rectanglesIntersect } from "./collisions.js";



// useful to have them as global variables
var canvas, ctx, w, h;
var mousePos;

// tableau qui contient les obstacles
let obstacles = [];

// highscore
let highScore = 0;

// an empty array!
var balls = [];
var initialNumberOfBalls;
var globalSpeedMultiplier = 0.5;
var colorToEat = 'red';
var wrongBallsEaten = 0;
var goodBallsEaten = 0;
var numberOfGoodBalls;
let level = 1;
let nbVies = 3;
let score = 0;
let gameState = 'Game Over';

var player = {
    x: 10,
    y: 10,
    width: 20,
    height: 20,
    color: 'red',

    update: function () {
        this.x += this.vx;
        this.y += this.vy;
    }
}

window.onload = function init() {
    // called AFTER the page has been loaded
    canvas = document.querySelector("#myCanvas");

    // often useful
    w = canvas.width;
    h = canvas.height;

    // important, we will draw with this object
    ctx = canvas.getContext('2d');

    // start game with 10 balls, balls to eat = red balls
    startGame(level);

    // add a mousemove event listener to the canvas
    canvas.addEventListener('mousemove', mouseMoved);
    window.addEventListener('keydown', traiteToucheEnfoncee);

    // ready to go !
    mainLoop();
};


function traiteToucheEnfoncee(evt) {
    console.log(evt.key);
    if (evt.key === ' ') {
        if (gameState === 'Game Over') {
            gameState = 'PLAYING';
            
            level = 1;
            score = 0;
            nbVies = 3;

            // reset balls speed
            globalSpeedMultiplier = 0.5;

            // reset obstacles
            obstacles = [];

            startGame(level);
        }
    }
    else if (evt.key === 'Enter') {
        if (gameState === 'Game Over') {
            gameState = 'SCORE';
        }
        else if (gameState === 'SCORE') {
            gameState = 'Game Over';
        }
    }
}

function startGame(level) {
    let nb = level + 1;

    creeObstacles(level);

    do {
        balls = createBalls(nb);
        initialNumberOfBalls = nb;
        numberOfGoodBalls = countNumberOfGoodBalls(balls, colorToEat);
    } while (numberOfGoodBalls === 0);

    wrongBallsEaten = goodBallsEaten = 0;
}

function countNumberOfGoodBalls(balls, colorToEat) {
    var nb = 0;

    balls.forEach(function (b) {
        if (b.color === colorToEat)
            nb++;
    });

    return nb;
}

function changeNbBalls(nb) {
    startGame(nb);
}

function changeColorToEat(color) {
    colorToEat = color;
}

function changePlayerColor(color) {
    player.color = color;
}

function changeBallSpeed(coef) {
    globalSpeedMultiplier = coef;
}

function mouseMoved(evt) {
    mousePos = getMousePos(canvas, evt);
}

function getMousePos(canvas, evt) {
    // necessary work in the canvas coordinate system
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function movePlayerWithMouse() {
    if (mousePos !== undefined) {
        player.x = mousePos.x;
        player.y = mousePos.y;
    }
}

function mainLoop() {
    // 1 - clear the canvas
    ctx.clearRect(0, 0, w, h);

    if (gameState === 'PLAYING') {
        
        drawSpawn();
        drawObstacles();
        // draw the ball and the player
        drawFilledRectangle(player);
        drawAllBalls(balls);
        drawInfosTextuelles(balls);

        // animate the ball that is bouncing all over the walls
        moveAllBalls(balls, obstacles);

        movePlayerWithMouse();
        deplaceLesObstacles();

    } else if(gameState === 'Game Over') {
        ctx.font = "100px Arial";
        ctx.fillText("Game Over!" , (w/2)-300, 350+Math.random()*30);
        ctx.font = "50px Arial";
        ctx.fillText("Your score : " + score, (w/2)-150, 450);
        ctx.font = "50px Arial";
        ctx.fillText("Press <SPACE> to start again" , (w/2)-350, 525);
        ctx.font = "50px Arial";
        ctx.fillText("Press <ENTER> to go back", (w/2)-325, 600);

    } else if(gameState === 'SCORE') {
        ctx.font = "100px Arial";
        ctx.fillText("Meilleur score" , (w/2)-325, 350);
        ctx.font = "100px Arial";
        ctx.fillText(highScore , (w/2)-50, 435+Math.random()*30);
        ctx.font = "50px Arial";
        ctx.fillText("Press <ENTER> to go back", (w/2)-325, 550);
    }
    // ask the browser to call mainloop in 1/60 of  for a new animation frame
    requestAnimationFrame(mainLoop);
}

function creeObstacles(level) {

    if(level%2 === 0) {
        // for (let i = 0; i < 1; i++) {
            let o = new ObstacleAnime(canvas.width, canvas.height, 1);
            obstacles.push(o);
        // }
    }

    // for (let i = 0; i < 1; i++) {
        let o = new Obstacle(canvas.width, canvas.height);
        obstacles.push(o);
    // }
}



function drawObstacles() {
    obstacles.forEach(o => {
        o.draw(ctx);
    });
}



function deplaceLesObstacles() {
    // on parcourt le tableau d'obstacles
    obstacles.forEach(o => {
        if (o instanceof ObstacleAnime)
            o.update();
    });
}


function drawSpawn() {
    ctx.save();

    ctx.beginPath();
    ctx.arc(w / 2, h / 2, 10, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'green';
    ctx.fill();
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#003300';
    ctx.stroke();

    ctx.restore();
}

// Collisions between rectangle and circle
function circRectsOverlap(x0, y0, w0, h0, cx, cy, r) {
    var testX = cx;
    var testY = cy;
    if (testX < x0) testX = x0;
    if (testX > (x0 + w0)) testX = (x0 + w0);
    if (testY < y0) testY = y0;
    if (testY > (y0 + h0)) testY = (y0 + h0);
    return (((cx - testX) * (cx - testX) + (cy - testY) * (cy - testY)) < r * r);
}

function createBalls(n) {
    // empty array
    var ballArray = [];

    // create n balls
    for (var i = 0; i < n; i++) {

        var b = {
            x: w / 2,
            y: h / 2,
            radius: 5 + 30 * Math.random(), // between 5 and 35
            speedX: -5 + 10 * Math.random(), // between -5 and + 5
            speedY: -5 + 10 * Math.random(), // between -5 and + 5
            color: getARandomColor(),
        }

        // add ball b to the array
        ballArray.push(b);
    }
    // returns the array full of randomly created balls
    return ballArray;
}

function getARandomColor() {
    var colors = ['red', 'blue', 'cyan', 'purple', 'pink', 'green', 'yellow'];
    // a value between 0 and color.length-1
    // Math.round = rounded value
    // Math.random() a value between 0 and 1
    var colorIndex = Math.round((colors.length - 1) * Math.random());
    var c = colors[colorIndex];

    // return the random color
    return c;
}

function drawInfosTextuelles(balls) {
    ctx.save();
    ctx.font = "20px Arial";

    if (nbVies <= 0) {
        // on a perdu
        gameState = 'Game Over';
        if(score > highScore) {
            highScore = score;
        }
    } else if (goodBallsEaten === numberOfGoodBalls) {
        // On a gagné, on a mangé toutes les bonnes balles
        ctx.fillText("You Win! Final score : " + (initialNumberOfBalls - wrongBallsEaten),
            20, 30);
        // on change de niveau
        passerAuNiveauSuivant()
    } else {
        // On est en train de jouer....
        ctx.fillText("Balls still alive: " + balls.length, 10, 25);
        ctx.fillText("Good Balls eaten: " + goodBallsEaten, 10, 50);
        ctx.fillText("Wrong Balls eaten: " + wrongBallsEaten, 10, 75);
        ctx.fillText("Level: " + level, w-100, 25);
        ctx.fillText("Score: " + score, w-100, 50);
        ctx.fillText("Vies: " + nbVies, w-100, 75);
    }
    ctx.restore();
}

function passerAuNiveauSuivant() {
    level++;
    globalSpeedMultiplier += 0.2;
    startGame(level);
}

function drawAllBalls(ballArray) {
    ballArray.forEach(function (b) {
        drawFilledCircle(b);
    });
}

function moveAllBalls(ballArray, obstacles) {
    // iterate on all balls in array
    balls.forEach(function (b, index) {
        // b is the current ball in the array
        if (index === 0) {
            b.radius += 0.1;
            if (b.radius > 40) {
                b.radius = 5;
            }
            b.x += (b.speedX * globalSpeedMultiplier);
            b.y += (b.speedY * globalSpeedMultiplier);
        } else {
            b.x += (b.speedX * globalSpeedMultiplier);
            b.y += (b.speedY * globalSpeedMultiplier);
        }

        testCollisionBallWithWalls(b);

        testCollisionWithPlayer(b, index);

        testCollisionBallWithObstacles(b, obstacles);
    });
}

function testCollisionWithPlayer(b, index) {
    if (circRectsOverlap(player.x, player.y,
        player.width, player.height,
        b.x, b.y, b.radius)) {
        // we remove the element located at index
        // from the balls array
        // splice: first parameter = starting index
        //         second parameter = number of elements to remove
        if (b.color === colorToEat) {
            // Yes, we remove it and increment the score
            goodBallsEaten += 1;
            score += 10;
        } else {
            wrongBallsEaten += 1;
            nbVies = nbVies - 1;
        }

        balls.splice(index, 1);

    }
}

function testCollisionBallWithWalls(b) {
    // COLLISION WITH VERTICAL WALLS ?
    if ((b.x + b.radius) > w) {
        // the ball hit the right wall
        // change horizontal direction
        b.speedX = -b.speedX;

        // put the ball at the collision point
        b.x = w - b.radius;
    } else if ((b.x - b.radius) < 0) {
        // the ball hit the left wall
        // change horizontal direction
        b.speedX = -b.speedX;

        // put the ball at the collision point
        b.x = b.radius;
    }

    // COLLISIONS WTH HORIZONTAL WALLS ?
    // Not in the else as the ball can touch both
    // vertical and horizontal walls in corners
    if ((b.y + b.radius) > h) {
        // the ball hit the bottom wall
        // change horizontal direction
        b.speedY = -b.speedY;

        // put the ball at the collision point
        b.y = h - b.radius;
    } else if ((b.y - b.radius) < 0) {
        // the ball hit the top wall
        // change horizontal direction
        b.speedY = -b.speedY;

        // put the ball at the collision point
        b.y = b.radius;
    }
}



function testCollisionBallWithObstacles(b, obstacles) {

    obstacles.forEach(function (o) {
        // COLLISION WITH VERTICAL WALLS ?
        if (((b.x + b.radius) > o.x) && (b.y > o.y) && (b.y < o.y + o.height) && (b.x < o.x + o.width)) {
            // the ball hit the right wall
            // change horizontal direction
            b.speedX = -b.speedX;

            // put the ball at the collision point
            b.x = o.x - b.radius;
        } else if (((b.x - b.radius) < o.x + o.width) && (b.y > o.y) && (b.y < o.y + o.height) && (b.x > o.x)) {
            // the ball hit the left wall
            // change horizontal direction
            b.speedX = -b.speedX;

            // put the ball at the collision point
            b.x = o.x + o.width + b.radius;
        }

        // COLLISIONS WTH HORIZONTAL WALLS ?
        // Not in the else as the ball can touch both
        // vertical and horizontal walls in corners
        if (((b.y + b.radius) > o.y) && (b.x > o.x) && (b.x < o.x + o.width) && (b.y < o.y + o.height)) {
            // the ball hit the top wall
            // change horizontal direction
            b.speedY = -b.speedY;

            // put the ball at the collision point
            b.y = o.y - b.radius;
        } else if (((b.y - b.radius) < o.y + o.height) && (b.x > o.x) && (b.x < o.x + o.width) && (b.y > o.y)) {
            // the ball hit the bottom wall
            // change horizontal direction
            b.speedY = -b.speedY;

            // put the ball at the collision point
            b.y = o.y + o.height + b.radius;
        }
        });
}


function drawFilledRectangle(r) {
    // GOOD practice: save the context, use 2D trasnformations
    ctx.save();

    // translate the coordinate system, draw relative to it
    ctx.translate(r.x, r.y);

    ctx.fillStyle = r.color;
    // (0, 0) is the top left corner of the monster.
    ctx.fillRect(0, 0, r.width, r.height);

    // GOOD practice: restore the context
    ctx.restore();
}

function drawFilledCircle(c) {
    // GOOD practice: save the context, use 2D trasnformations
    ctx.save();

    // translate the coordinate system, draw relative to it
    ctx.translate(c.x, c.y);

    ctx.fillStyle = c.color;
    // (0, 0) is the top left corner of the monster.
    ctx.beginPath();
    ctx.arc(0, 0, c.radius, 0, 2 * Math.PI);
    ctx.fill();

    // GOOD practice: restore the context
    ctx.restore();
}