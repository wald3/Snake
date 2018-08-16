
// https://pastebin.com/raw/Z3zhb7cY

const table = document.getElementById("snakeDiv");
const matrix = [];
const SIZE = 20;

let snake = [], tail, gameInterval;
let appleX, appleY, VelostityX = 0, VelostityY = 0, sHeadX, sHeadY;

for (let i = 0; i < SIZE; i++) {
    const row = table.appendChild(document.createElement("div"));
    table.appendChild(row);
    row.classList.add("row");
    matrix.push([]);

    for (let j = 0; j < SIZE; j++) {
        const column = row.appendChild(document.createElement("div"));
        column.classList.add("cell");
        matrix[i].push(column);
    }
}

window.onload = function () {
    document.addEventListener("keydown", keyPush);
    gameInterval = setInterval(game, 1000 / 10);
}

setSnake();
setApple();

function game() {
    sHeadX += VelostityX;
    sHeadY += VelostityY;

    if (sHeadX < 0) {
        sHeadX = SIZE - 1;
        GAMEOVER();
    }
    if (sHeadX > SIZE - 1) {
        sHeadX = 0;
        GAMEOVER();
    }
    if (sHeadY < 0) {
        sHeadY = SIZE - 1;
        GAMEOVER();
    }
    if (sHeadY > SIZE - 1) {
        sHeadY = 0;
        GAMEOVER();
    }

    clearField();
    drawSnake();

    snake.push({x:sHeadX,y:sHeadY});
    

    if(appleX == sHeadX && appleY == sHeadY) {
		tail++;
		setApple();
	}

}

function clearField() {
    for(let i = 0; i < SIZE; i++){
        for(let j= 0; j < SIZE; j++){
            matrix[i][j].classList.remove("cell", "appleCell", "snakeCell");
            matrix[i][j].classList.add("cell");
        }
    }
}

function drawSnake() {
    for (var i = 0; i < snake.length; i++) {
        matrix[snake[i].x][snake[i].y].classList.add("snakeCell");

        if (snake[i].x == sHeadX && snake[i].y == sHeadX) {
            GAMEOVER();
        }
    }
}

function GAMEOVER(){
    console.log("gabella");
    clearInterval(gameInterval);
}

function keyPush(evt) {
    console.log(evt);
    switch (evt.keyCode) {
        case 37:
            VelostityX = -1; VelostityY = 0;
            break;
        case 38:
            VelostityX = 0; VelostityY = -1;
            break;
        case 39:
            VelostityX = 1; VelostityY = 0;
            break;
        case 40:
            VelostityX = 0; VelostityY = 1;
            break;
    }
}

function getRandomInt(a) {
    return Math.floor(Math.random() * a);
}

function setSnake() {
    sHeadX = getRandomInt(SIZE - 6) + 3;
    sHeadY = getRandomInt(SIZE - 6) + 3;
    tail = 3;

}

function setApple() {
    appleX = getRandomInt(SIZE);
    appleY = getRandomInt(SIZE);

    for (cell in snake) {
        if (appleX == cell.x && appleY == cell.y) {
            setApple();
        }
        else {
            matrix[appleX][appleY].classList.remove("cell");
            matrix[appleX][appleY].classList.add("appleCell");
            return;
        }
    }
}