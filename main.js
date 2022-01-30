document.addEventListener('keydown', keyPush);
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext('2d');

const title = document.querySelector("h1");

const tileSize = 50;
let snakeSpeed = tileSize;
let snakePosX = 0;
let snakePosY = canvas.height / 2;

let tail = [];
let snakeLen = 3;

let velocityX = 0;
let velocityY = 0;

let score = 0;

const tileCountX = canvas.width / tileSize;
const tileCountY = canvas.height / tileSize;

let foodX = Math.floor(Math.random() * tileCountX) * tileSize;
let foodY = Math.floor(Math.random() * tileCountY) * tileSize;

gameLoop();

function MoveAll() {
    snakePosX += snakeSpeed * velocityX;
    snakePosY += snakeSpeed * velocityY;

    if (snakePosX > canvas.width - tileSize) {
        snakePosX = 0;
    }

    if (snakePosX < 0) {
        snakePosX =  canvas.width;
    }

    if (snakePosY > canvas.height - tileSize) {
        snakePosY = 0;
    }

    if (snakePosY < 0) {
        snakePosY =  canvas.height;
    }

    tail = tail.slice(-1 * snakeLen)

    tail.push({x: snakePosX, y: snakePosY})

    DrawAll();

    if (snakePosX === foodX && snakePosY === foodY) {
        foodX = Math.floor(Math.random() * tileCountX) * tileSize;
        foodY = Math.floor(Math.random() * tileCountY) * tileSize;
        title.textContent = ++score;
        snakeLen++;
    }
}

function DrawAll() {
    rectangle("#ffbf00", 0, 0, canvas.width, canvas.height);

    drawGrid();

    rectangle("blue", foodX, foodY, tileSize-1, tileSize-1);

    tail.forEach(snakePart =>
        rectangle("#808080", snakePart.x, snakePart.y, tileSize, tileSize)    
    )

    rectangle("black", snakePosX, snakePosY, tileSize, tileSize); 
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
            rectangle('#fff', tileSize * i, tileSize * j, tileSize - 1, tileSize - 1);
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