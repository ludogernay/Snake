var snake = document.getElementById('snake');
var score = document.querySelector('.score');
var restart = document.getElementById('Restart');

var cpt = 0;
score.innerHTML = `Score : ${cpt}`;
var x = 620.35;
var y = 203;
var dx = 0;
var dy = 0;
var startIsPressed = false;
document.onkeydown = function (event) {
    console.log(event.key);
    switch (event.key) {
        case 'ArrowLeft':
            dx = -30;
            dy = 0;
            break;
        case 'ArrowRight':
            dx = 30;
            dy = 0;
            break;
        case 'ArrowUp':
            dx = 0;
            dy = -30;
            break;
        case 'ArrowDown':
            dx = 0;
            dy = 30;
            break;
        case ' ':
            dx = 0;
            dy = 0;
            break;
    }
}

function moveSnake() {
    var bouffeRect = bouffe.getBoundingClientRect();
    if (x < 320.35 || x > 1130.35 || y < 113 || y > 473) {
        console.log("dead");
    } else {

        x += dx;
        y += dy;
        snake.style.left = x + 'px';
        snake.style.top = y + 'px';
        if (x == bouffeRect.left.toFixed(2) && y == bouffeRect.top) {
            bouffe.style.display = 'none';
            cpt++;
            score.innerHTML = `Score : ${cpt}`;
            console.log('je mange la bouffe !');
        }
    }
}
function spawnBouffe() {
    if (startIsPressed) {
        var bouffe = document.getElementById('bouffe');
        bouffe.style.left = (Math.floor(Math.random() * (811/30)) * 30 + 320.35).toFixed(2) + 'px';
        bouffe.style.top = Math.floor(Math.random() * (360/30)) * 30 + 113 + 'px';
        bouffe.style.display = 'block';
        var bouffeRect = bouffe.getBoundingClientRect();
        console.log("position de la bouffe : " + bouffeRect.left.toFixed(2) + " " + bouffeRect.top);  
    }
}
setInterval(function () {
    if (startIsPressed) {
        snake.style.display = 'block';
        moveSnake();
    }
}, 120);

setInterval(spawnBouffe, 5000);


//recupere le clic sur le bouton start
var start = document.getElementById('Start');
start.addEventListener('click', function () {
    dx = 30;
    dy = 0;
    startIsPressed = true;
    start.style.display = 'none';
});
//recupere le clic sur le bouton restart
restart.addEventListener('click', function () {
    //recharger la page
    location.reload();
});
