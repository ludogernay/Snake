var start = document.getElementById('Start');
var restart = document.getElementById('Restart');
const canvas = document.querySelector("#gamefield");
const ctx = canvas.getContext("2d");
const canvascontainer = document.getElementById("canvas-container");

let listeLegumes = ["courgette", "carotte", "patate", "tomate", "potimarron", "betterave", "choux", "celeri", "salade", "aubergine", "poivron", "concombre", "poireau", "asperge", "haricot"];
let listeLegumesJeu = new Array(30);
let numCase ;
let pairesImage = [];
let paires = [];
let allSaves = [];
let clic=0;
let findPaires=0;
let firstclick="";
let secondclick="";


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

    // Créer un tableau à deux dimensions de 5 colonnes et 6 lignes
    for (let i = 0; i < 6; i++) {
        paires.push([]);
        pairesImage.push([]);
        for (let j = 0; j < 5; j++) {
            const legumeAleatoire = listeMelangee[i * 5 + j];
            paires[i].push(legumeAleatoire); // remplit chaque case avec une valeur choisie à partir du tableau listeMelangee
            let img = new Image();
            img.src = "../Img/" + legumeAleatoire + ".jpg";
            pairesImage[i].push(img); // remplit chaque case avec la valeur de l'image
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
canvas.addEventListener('click', function(event) {
    // Récupérer les coordonnées du clic dans le canvas
    let x = event.offsetX;
    let y = event.offsetY;

    // Calculer l'index de la case qui a été cliquée
    let row = Math.floor(y / cellSize);
    let col = Math.floor(x / cellSize);
    ctx.drawImage(pairesImage[row][col], col*cellSize, row*cellSize, cellSize, cellSize);
    // Faites quelque chose avec la case qui a été cliquée
    console.log('La case ' + numCase + ' a été cliquée !');
    if(firstclick == ""){
        firstclick = paires[row][col];
    }else{
        secondclick = paires[row][col];
    }
    clic++;
    choixJoueur();
});

function startGame() {
    start.style.display = 'none';
    const save = ctx.getImageData(0, 0, canvas.width, canvas.height);
    allSaves.push(save);
    creationPaire();
}
let save;
function choixJoueur(){
    if (clic == 2){
        setTimeout(testChoix, 2000);
    }
}
function testChoix(){
    if(firstclick == secondclick){
        console.log("trouve");
        findPaires++;
        save = ctx.getImageData(0, 0, canvas.width, canvas.height);
        allSaves.push(save);
        if(findPaires == 15){
            alert("Vous avez gagné");
        }
    }else if(allSaves.length > 0){
        console.log("pas trouve");
        save= allSaves.pop();
        ctx.putImageData(save, 0, 0);
    }else{
        ctx.putImageData(save, 0, 0);
    }
    console.log(firstclick,secondclick);
    clic = 0;
    firstclick = "";
    secondclick = "";
}

