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
    setSnake();
    setApple();
    updateField();
    document.addEventListener("keydown", keyStart);
}

function gameStart() {
    document.removeEventListener("keydown", keyStart);
    document.addEventListener("keydown", keyPush);
    gameInterval = setInterval(game, 1000 / 10);
}

function game() {
    console.log(VelostityX, VelostityY);
    if (VelostityX === 0 && VelostityY === 0) {
    }
    else{
        sHeadY += VelostityX;
        sHeadX += VelostityY;

        if (sHeadX < 0) {
            sHeadX = SIZE - 1;
            //GAMEOVER();
        }
        if (sHeadX > SIZE - 1) {
            sHeadX = 0;
            //GAMEOVER();
        }
        if (sHeadY < 0) {
            sHeadY = SIZE - 1;
            //GAMEOVER();
        }
        if (sHeadY > SIZE - 1) {
            sHeadY = 0;
            //GAMEOVER();
        }

        updateField();
        
        snake.push({ x: sHeadX, y: sHeadY });
       
        while (snake.length > tail) {
            snake.shift();
       
    }


        if (appleX == sHeadX && appleY == sHeadY) {
            tail++;
            setApple();
        }
    }
  

}

function updateField() {
    clearField();
    drawSnake();
    drawApple();

}

function clearField() {
    for (let i = 0; i < SIZE; i++) {
        for (let j = 0; j < SIZE; j++) {
            matrix[i][j].classList.remove("cell", "appleCell", "snakeCell");
            matrix[i][j].classList.add("cell");
        }
    }
}

function drawSnake() {
    for (var i = 0; i < snake.length; i++) {
        matrix[snake[i].x][snake[i].y].classList.add("snakeCell");

        if (snake[i].x == sHeadX && snake[i].y == sHeadY) {
            tail = 3;
        }
    }
}

function drawApple() {
    matrix[appleX][appleY].classList.add("appleCell");
}

function GAMEOVER() {
    console.log("YOU LOSE");
    clearInterval(gameInterval);
}

function keyPush(evt) {
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

function keyStart(evt) {
    gameStart();
}

function getRandomInt(a) {
    return Math.floor(Math.random() * a);
}

function setSnake() {
    sHeadX = getRandomInt(SIZE - 6) + 3;
    sHeadY = getRandomInt(SIZE - 6) + 3;


    snake.push({ x: sHeadX, y: sHeadY });
    snake.push({ x: sHeadX + 1, y: sHeadY });
    snake.push({ x: sHeadX + 2, y: sHeadY });
    tail = 3;

}

function setApple() {
    appleX = getRandomInt(SIZE);
    appleY = getRandomInt(SIZE);


}