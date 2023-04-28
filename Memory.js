var start = document.getElementById('Start');
var restart = document.getElementById('Restart');
const canvas = document.querySelector("#gamefield");
const ctx = canvas.getContext("2d");
const canvascontainer = document.getElementById("canvas-container");

let listeLegumes = ["courgette", "carotte", "patate", "tomate", "potimarron", "bettrave", "choux", "celeri", "salade", "aubergine", "poivron", "cocombre", "poireau", "asperge", "haricot"];
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


for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
        ctx.lineWidth = 4;
        ctx.fillStyle = "blue";
        ctx.fillRect(j * cellSize, i * cellSize, cellSize, cellSize);
        ctx.strokeStyle = "black";
        ctx.strokeRect(j * cellSize, i * cellSize, cellSize, cellSize);
    }
}

function creationPaire() {
    //Parmi une liste de legumes choisit 2 exemplaires de chaque légumes pour former 15 paires
    const listeMelangee = shuffle(listeLegumes.concat(listeLegumes)); // mélanger les éléments du tableau values et concaténer deux fois le tableau mélangé pour obtenir deux occurrences de chaque valeur
    const paires = [];
    const pairesImage = [];
    // Créer un tableau à deux dimensions de 5 colonnes et 6 lignes
    for (let i = 0; i < 6; i++) {
        paires.push([]);
        pairesImage.push([]);
        for (let j = 0; j < 5; j++) {
            const legumeAleatoire = listeMelangee[i * 5 + j];
            paires[i].push(legumeAleatoire); // remplit chaque case avec une valeur choisie à partir du tableau listeMelangee
            pairesImage[i].push(legumeAleatoire+".jpg"); // remplit chaque case avec la valeur de l'image
        }
    }
    console.log(paires); // Afficher le tableau de paires de valeurs générées aléatoirement
    console.log(pairesImage); 
}

// fonction pour mélanger aléatoirement les éléments d'un tableau en utilisant l'algorithme de Fisher-Yates
function shuffle(tableau) {
    for (let i = tableau.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [tableau[i], tableau[j]] = [tableau[j], tableau[i]];
    }
    return tableau
}


function creationDiv() {
    //créer une div pour chaque élément du tableau listeLegumesJeu
    for (let i = 0; i < listeLegumesJeu.length; i++) {
        let div = document.createElement('div');
        div.classList.add('hidden-card');
        div.id = 'div' + i;
        div.setAttribute('data-legumes', listeLegumesJeu[i]);
        div.style.position = 'absolute';
        div.style.left = canvascontainer.offsetLeft + (i * 100) + 'px';
        div.style.top = canvascontainer.offsetTop + (i * 100) + 'px';
        div.addEventListener('click', function () {
            console.log('La div a été cliqué');
        });
        document.body.appendChild(div);
    }

}

function startGame() {
    start.style.display = 'none';
    creationPaire();
    creationDiv();
   
}

