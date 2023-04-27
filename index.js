const canvas = document.querySelector("#gamefield")
const ctx = canvas.getContext("2d");
const start = document.getElementById("Start");
const score = document.querySelector('.score');
const restart = document.getElementById('Restart');
const cellSize = 30; // taille d'une cellule en pixels
const rows = 15; // nombre de lignes
let cols = 30; // nombre de colonnes
let partSize = 30;
ctx.lineWidth = 0, 5; // épaisseur par défaut des bordures
ctx.strokeStyle = '#000000'; // couleur par défaut des bordures
var snake;
var direction;
var xBouffe;
var yBouffe;
var cpt;
var startIsPressed;

// mettre à jour la largeur du canvas en fonction du nombre de colonnes
canvas.width = cols * cellSize;
canvas.height = rows * cellSize;
start.addEventListener("click", function () {
  startIsPressed = true;
});
restart.addEventListener("click", function () {
  initGame();
});
function initGame() {
  snake = [{ x: 120, y: 120 }, { x: 150, y: 120 }, { x: 180, y: 120 }, { x: 210, y: 120 }, { x: 240, y: 120 }];
  direction = "right";
  xBouffe = 0;
  yBouffe = 0;
  cpt = 0;
  startIsPressed = false;
  score.innerHTML = 'Score : 0';
  drawGrid();
  spawnBouffe();
}
// dessiner les bordures de chaque cellule de la grille
function drawGrid() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (i == 0 || i == rows - 1 || j == 0 || j == cols - 1) {
        ctx.fillStyle = 'green';
        ctx.lineWidth = 2; // mettre une épaisseur plus grande
        ctx.strokeStyle = '#FF0000'; // mettre une couleur différente
        ctx.fillRect(j * cellSize, i * cellSize, cellSize, cellSize);
      } else {
        ctx.lineWidth = 1; // mettre l'épaisseur par défaut
        ctx.strokeStyle = '#000000'; // mettre la couleur par défaut
      }
      ctx.strokeRect(j * cellSize, i * cellSize, cellSize, cellSize);
    }
  }
}

initGame();
document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowUp" && direction !== "down") {
    direction = "up";
  } else if (event.key === "ArrowDown" && direction !== "up") {
    direction = "down";
  } else if (event.key === "ArrowLeft" && direction !== "right") {
    direction = "left";
  } else if (event.key === "ArrowRight" && direction !== "left") {
    direction = "right";
  }
});
function moveSnake() {
  checkCollision();
  eat();
  wallHit();
  if (direction === "up") {
    let newHead = { x: snake[0].x, y: snake[0].y - 30 }; // déplacez le snake vers la droite de 10 pixels
    snake.unshift(newHead); // ajoutez la nouvelle tête à l'avant du tableau
    snake.pop(); // supprimez la dernière case

    // redessinez le snake
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid();
    ctx.fillStyle = "red";
    ctx.fillRect(xBouffe, yBouffe, partSize, partSize);
    ctx.strokeStyle = "black"; // set the stroke color to black
    ctx.strokeRect(xBouffe, yBouffe, partSize, partSize); // draw a rectangle border at the specified position
    for (let i = 0; i < snake.length; i++) {
      drawSnake();
    }
  } else if (direction === "down") {
    let newHead = { x: snake[0].x, y: snake[0].y + 30 }; // déplacez le snake vers la droite de 10 pixels
    snake.unshift(newHead); // ajoutez la nouvelle tête à l'avant du tableau
    snake.pop(); // supprimez la dernière case

    // redessinez le snake
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid();
    ctx.fillStyle = "red";
    ctx.fillRect(xBouffe, yBouffe, partSize, partSize);
    ctx.strokeStyle = "black"; // set the stroke color to black
    ctx.strokeRect(xBouffe, yBouffe, partSize, partSize); // draw a rectangle border at the specified position
    for (let i = 0; i < snake.length; i++) {
      drawSnake();
    }
  } else if (direction === "left") {
    let newHead = { x: snake[0].x - 30, y: snake[0].y }; // déplacez le snake vers la droite de 10 pixels
    snake.unshift(newHead); // ajoutez la nouvelle tête à l'avant du tableau
    snake.pop(); // supprimez la dernière case

    // redessinez le snake
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid();
    ctx.fillStyle = "red";
    ctx.fillRect(xBouffe, yBouffe, partSize, partSize);
    ctx.strokeStyle = "black"; // set the stroke color to black
    ctx.strokeRect(xBouffe, yBouffe, partSize, partSize); // draw a rectangle border at the specified position
    for (let i = 0; i < snake.length; i++) {
      drawSnake();
    }
  } else if (direction === "right") {
    let newHead = { x: snake[0].x + 30, y: snake[0].y }; // déplacez le snake vers la droite de 10 pixels
    snake.unshift(newHead); // ajoutez la nouvelle tête à l'avant du tableau
    snake.pop(); // supprimez la dernière case

    // redessinez le snake
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid();
    ctx.fillStyle = "red";
    ctx.fillRect(xBouffe, yBouffe, partSize, partSize);
    ctx.strokeStyle = "black"; // set the stroke color to black
    ctx.strokeRect(xBouffe, yBouffe, partSize, partSize); // draw a rectangle border at the specified position
    for (let i = 0; i < snake.length; i++) {
      drawSnake();
    }
  }
}
function drawSnake() {
  // draw all snake body parts on canvas
  for (let i = 0; i < snake.length; i++) {
    // draw the part on canvas
    drawSnakePart(snake[i].x, snake[i].y);
  }
}
function wallHit() {
  // check if snake hit any of the walls
  let head = snake[0];
  if (head.x < 30 || head.x >= canvas.width - 30 || head.y < 30 || head.y >= canvas.height - 30) {
    // snake hit wall, end game
    initGame();
  }
}
function checkCollision() {
  // check if snake head is in collision with its own body
  if (snake.length > 5) {
    let head = snake[0];
    for (let i = 1; i < snake.length; i++) {
      let part = snake[i];
      if (head.x === part.x && head.y === part.y) {
        // snake collided with its own body, end game
        initGame();
      }
    }
  }
}
function eat() {
  if (snake[0].x === xBouffe && snake[0].y === yBouffe) {
    console.log("eat");
    cpt++;
    score.innerHTML = `Score : ${cpt}`;
    ctx.clearRect(xBouffe, yBouffe, partSize, partSize);
    snake.push({ x: snake[snake.length - 1].x, y: snake[snake.length - 1].y });
    spawnBouffe();
  }
}
function drawSnakePart(x, y) {
  // draw a single part of the snake at the specified position
  ctx.fillStyle = "green"; // set the fill color to green
  ctx.fillRect(x, y, partSize, partSize); // draw a filled rectangle at the specified position
  ctx.strokeStyle = "black"; // set the stroke color to black
  ctx.strokeRect(x, y, partSize, partSize); // draw a rectangle border at the specified position
}
function spawnBouffe() {
  xBouffe = (Math.floor(Math.random() * 28) + 1) * partSize;
  yBouffe = (Math.floor(Math.random() * 13) + 1) * partSize;
  console.log(xBouffe, yBouffe);
}
// setInterval(spawnBouffe, 4000);
setInterval(function () {
  if (startIsPressed) {
    moveSnake();
  }
}, 100);
