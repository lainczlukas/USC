const canvas = document.querySelector("canvas");
const ctx = canvas.getContext('2d');

const snakeSize = 50;
let snakeSpeed = 3;
let snakePosX = 0;
let snakePosY = canvas.height / 2 - snakeSize / 2;


ctx.fillStyle = 'white';
ctx.fillRect(0,0,canvas.width ,canvas.height);

ctx.fillStyle = 'black';
ctx.fillRect(snakePosX, snakePosY, snakeSize, snakeSize);

function gameLoop(){
    ctx.fillStyle = 'white';
    ctx.fillRect(0,0,canvas.width ,canvas.height);

    snakePosX = snakePosX + snakeSpeed;

    if (snakePosX > canvas.width) {
        snakePosX = 0;
    }

    ctx.fillStyle = 'black';
    ctx.fillRect(snakePosX, snakePosY, snakeSize, snakeSize);
    requestAnimationFrame(gameLoop);
}
gameLoop();