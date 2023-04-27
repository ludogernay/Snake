var start = document.getElementById('Start');
var restart = document.getElementById('Restart');
const canvas = document.querySelector("#gamefield");
const ctx = canvas.getContext("2d");
let numCase;
let listeLegumes = ["courgette", "carotte", "patate", "tomate", "potimarron", "bettrave", "choux", "celeri", "salade", "aubergine", "poivron", "cocombre", , "poireau", "asperge", "haricot"];
let listeLegumesJeu = new Array(30);

//lance le jeu
start.addEventListener('click', startGame);
//recupere le clic sur le bouton restart
restart.addEventListener('click', function () {
    //recharge la page
    location.reload();
});


const cellSize = 100; // taille d'une cellule en pixels

const rows = 6; // nombre de lignes

let cols = 5; // nombre de colonnes

canvas.width = cols * cellSize * 2;
canvas.height = rows * cellSize * 2;

// Ajouter un gestionnaire d'événements de clic au canvas
canvas.addEventListener('click', function(event) {
    // Récupérer les coordonnées du clic dans le canvas
    let x = event.offsetX;
    let y = event.offsetY;
    
    // Calculer l'index de la case qui a été cliquée
    let row = Math.floor(y / cellSize);
    let col = Math.floor(x / cellSize);
    numCase = row * cols + col;
    
    // Faites quelque chose avec la case qui a été cliquée
    console.log('La case ' + numCase + ' a été cliquée !');
});
for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
        ctx.lineWidth = 4;
        ctx.fillStyle = "blue";
        ctx.fillRect(j * cellSize, i * cellSize, cellSize, cellSize);
        ctx.strokeStyle = "black";
        ctx.strokeRect(j * cellSize, i * cellSize, cellSize, cellSize);
    }
}

function startGame() {
    start.style.display = 'none';
    creationPaire();
}

function creationPaire() {
    //Parmi une liste de legumes choisit 2 exemplaires de chaque légumes pour former 15 paires
    for (let i = 0; i<listeLegumesJeu.length;) {
        let index = Math.floor(Math.random() * listeLegumes.length); // génére un index aléatoire
        let legumeAleatoire = listeLegumes[index];
        let alreadyIn = false;
        for (j = 0; j < listeLegumesJeu.length; j += 2) {
            if (legumeAleatoire === listeLegumesJeu[j]) {
                alreadyIn = true;
            }
        }
        if (!alreadyIn) {
            listeLegumesJeu[i] = legumeAleatoire; //Ajoute les valeurs aléatoires aux tableaux de jeu
            listeLegumesJeu[i + 1] = legumeAleatoire;
            i += 2;
        }
    }
    console.log(listeLegumesJeu);
}

