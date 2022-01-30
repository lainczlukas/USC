document.addEventListener('keydown', keyPush);
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext('2d');

const title = document.querySelector("h1");

const snakeSize = 50;
let snakeSpeed = snakeSize;
let snakePosX = 0;
let snakePosY = canvas.height / 2;

let velocityX = 0;
let velocityY = 0;

let score = 0;

const tileCountX = canvas.width / snakeSize;
const tileCountY = canvas.height / snakeSize;

let foodX = Math.floor(Math.random() * tileCountX) * snakeSize;
let foodY = Math.floor(Math.random() * tileCountY) * snakeSize;

gameLoop();

function MoveAll() {
    snakePosX += snakeSpeed * velocityX;
    snakePosY += snakeSpeed * velocityY;

    if (snakePosX > canvas.width - snakeSize) {
        snakePosX = 0;
    }

    if (snakePosX < 0) {
        snakePosX =  canvas.width;
    }

    if (snakePosY > canvas.height - snakeSize) {
        snakePosY = 0;
    }

    if (snakePosY < 0) {
        snakePosY =  canvas.height;
    }

    DrawAll();

    if (snakePosX === foodX && snakePosY === foodY) {
        foodX = Math.floor(Math.random() * tileCountX) * snakeSize;
        foodY = Math.floor(Math.random() * tileCountY) * snakeSize;
        title.textContent = ++score;
    }
}

function DrawAll() {
    rectangle("#ffbf00", 0, 0, canvas.width, canvas.height);

    drawGrid();

    rectangle("blue", foodX, foodY, snakeSize-1, snakeSize-1);

    rectangle("black", snakePosX, snakePosY, snakeSize, snakeSize); 
}

function gameLoop(){
    MoveAll();
    setTimeout(gameLoop, 1000 / 15);
}

function rectangle(color,x,y,width, height) {
    ctx.fillStyle = color;
    ctx.fillRect(x ,y ,width ,height);
}

function drawGrid() {
    for ( let i = 0; i < tileCountX; i++ ) {
        for (let j = 0; j < tileCountY; j++){
            rectangle('#fff', snakeSize * i, snakeSize * j, snakeSize - 1, snakeSize - 1);
        }
    }
}

function keyPush(event) {
    switch(event.key) {
        case 'ArrowUp':
            if (velocityY != 1) {
                velocityY = -1;
                velocityX = 0;
            }
            break;
        case 'ArrowDown':
            if (velocityY != -1) {
                velocityY = 1;
                velocityX = 0;
            }
            break;
        case 'ArrowLeft':
            if (velocityX != 1) {
                velocityY = 0;
                velocityX = -1;
            }
            break;
        case 'ArrowRight':
            if (velocityX != -1) {
            velocityY = 0;
            velocityX = 1;
            }
            break;
    }
}