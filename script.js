var snake = document.getElementById('snake');
var x = 0;
var y = 0;
var dx = 0;
var dy = 0;
var isKeyPressed = false;

document.onkeydown = function(event) {
    isKeyPressed = true;
    console.log(event.key);
    switch (event.key) {
        case 'ArrowLeft':
            dx = -10;
            dy = 0;
            break;
        case 'ArrowRight':
            dx = 10;
            dy = 0;
            break;
        case 'ArrowUp':
            dx = 0;
            dy = -10;
            break;
        case 'ArrowDown':
            dx = 0;
            dy = 10;
            break;
        case ' ':
            dx = 0;
            dy = 0;
            break;
    }
}

function moveSnake() {
    x += dx;
    y += dy;
    snake.style.left = x + 'px';
    snake.style.top = y + 'px';
}

setInterval(function() {
    if (isKeyPressed) {
        moveSnake();
    }
}, 50);