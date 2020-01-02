const table = document.getElementById("snakeDiv");
const label = document.getElementById("label");
const matrix = [];
const SIZE = 20;

let snake = [], tail, gameInterval;
let appleX, appleY, sHeadX, sHeadY, VelostityX = 0, VelostityY = 0, buffX = 0, buffY = 0;

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
    VelostityY = 0, VelostityX = -1;
    setSnake(5);
    setApple();
    drawSnake();
    drawApple();
    document.addEventListener("keydown", keyStart);
}

function gameStart() {
    document.removeEventListener("keydown", keyStart);
    document.addEventListener("keydown", keyPush);
    gameInterval = setInterval(game, 1000 / 17);
}

function game() {
    if (VelostityX != 0 || VelostityY != 0) {
        clearField();
        sHeadY += VelostityY;
        sHeadX += VelostityX;

        if (sHeadX < 0 ||
            sHeadY < 0 ||
            sHeadX > SIZE - 1 ||
            sHeadY > SIZE - 1) {
            GAMEOVER("Don`t you see the bounds?");
        }

        snake.push({ x: sHeadX, y: sHeadY});
        while (snake.length > tail) {
            snake.shift();
        }

        if (appleX == sHeadX && appleY == sHeadY) {
            tail++;
            setApple();
        }

        drawSnake();
        drawApple();
    }
}

function clearField() {
    for (let i = 0; i < snake.length; i++) {
        matrix[snake[i].x][snake[i].y].classList.remove("snakeCell"); 
        matrix[snake[i].x][snake[i].y].classList.add("cell");
    }
    matrix[appleX][appleY].classList.remove("appleCell");
    matrix[appleX][appleY].classList.add("cell");
}

function drawSnake() {
    for (var i = 0; i < snake.length-1; i++) {
        matrix[snake[i].x][snake[i].y].classList.add("snakeCell");
        if (snake[i].x == sHeadX && snake[i].y == sHeadY) {
            GAMEOVER("You ate youself!");
        }
    }
    matrix[sHeadX][sHeadY].classList.add("snakeCell");
}

function drawApple() {
    matrix[appleX][appleY].classList.add("appleCell");
}

function GAMEOVER(msg="") {
    window.alert("YOU LOSE\n" + msg);
    clearInterval(gameInterval);
    location.reload();
}

function keyPush(evt) {
    switch (evt.keyCode) {
        case 32: // Spacebar
        case 27: // Esc
            // Swap between velosity and buff 
            VelostityY = [buffY, buffY = VelostityY][0];
            VelostityX = [buffX, buffX = VelostityX][0];
            break;
        case 37:
            if(VelostityY != 1 && VelostityX != 0){ VelostityY = -1; VelostityX = 0; }       
            break;
        case 38:
            if(VelostityY != 0 && VelostityX != 1){ VelostityY = 0; VelostityX = -1; }              
            break;
        case 39:
            if(VelostityY != -1 && VelostityX != 0){ VelostityY = 1; VelostityX = 0; }             
            break;
        case 40:
            if(VelostityY != 0 && VelostityX != -1){ VelostityY = 0; VelostityX = 1; }
            break;
    }
}

function keyStart(evt) {
    switch (evt.keyCode) {
        case 32: // ScpaceBar
        case 27: // Esc
            console.log("START");
            label.innerText = "Use arrows(🠜 🠞 🠝 🠟) to control the Snake!\nPress \"Space\" or \"Esc\" for PAUSE.";
            gameStart();
            break;
    }
}

function getRandomInt(a) {
    return Math.floor(Math.random() * a);
}

function setSnake(_tail) {
    tail = _tail;

    sHeadX = getRandomInt(SIZE - tail - 1);
    sHeadY = getRandomInt(SIZE - tail - 1);

    for(var i = tail - 1; i >= 0; i--){
        if(SIZE < sHeadX + i) {
            tail = tail - i;
            break;
        }

        snake.push({ x: sHeadX + i, y: sHeadY });
        console.log(snake[snake.length - 1].x ,snake[snake.length - 1].y );
    }
}

function setApple() {
    let spots = [];
    for(var i = 0; i < SIZE; i++) {
        for(var j = 0; j < SIZE; j++) {
            if(!snake.some(item => item.x == i && item.y == j)) spots.push( {x: i, y: j} );
        }
    }
    if(spots.length != 0){
        let pos = getRandomInt(spots.length);
        appleX = spots[pos].x;
        appleY = spots[pos].y;
    }
    else{
        window.alert("YOU WIN");
        clearInterval(gameInterval);
        location.reload();
    }
}