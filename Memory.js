var start = document.getElementById('Start'); //bouton start
var restart = document.getElementById('Restart'); //bouton restart recharge la page
const canvas = document.querySelector("#gamefield"); // canvas
const ctx = canvas.getContext("2d"); // contexte du  canvas
const canvascontainer = document.getElementById("canvas-container");

let listeLegumes = ["courgette", "carotte", "patate", "tomate", "potimarron", "betterave", "choux", "celeri", "salade", "aubergine", "poivron", "concombre", "poireau", "asperge", "haricot"];
let listeLegumesJeu = new Array(30); // liste du jeu en cours
let pairesImage = [];
let paires = [];
let clic=0;
let findPaires=0;
let save;
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

canvas.width = cols * cellSize * 2; // adapte la taile du canvas
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
    const listeMelangee = shuffle(listeLegumes.concat(listeLegumes)); // mélange les éléments du tableau listeLegumes et concaténe deux fois le tableau mélangé pour obtenir deux occurrences de chaque légume

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
    console.log(paires); // Affiche le tableau de paires
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

    if(firstclick == ""){
        firstclick = paires[row][col];
    }else{
        secondclick = paires[row][col];
    }
    clic++;
    choixJoueur();
});

//fonction apellé au lancement du jeu (appuie sur Start)
function startGame() { 
    start.style.display = 'none';
    save = ctx.getImageData(0, 0, canvas.width, canvas.height); // récupère l'état du canvas
    creationPaire(); // création des tableaux
}

function choixJoueur(){
    // si la deuxième image est choisi
    if (clic == 2){
        canvas.classList.add("no-click");
        // test la combinaison après 2 secondes
        setTimeout(testChoix, 2000);
    }
}

//Test les choix du joueur
function testChoix(){ 
    if(firstclick == secondclick){
        console.log("trouve");
        findPaires++; 
        save = ctx.getImageData(0, 0, canvas.width, canvas.height); // enregistre le nouvel etat
        ctx.putImageData(save, 0, 0);
        if(findPaires == 15){
            alert("Vous avez gagné");
        }
        //si la liste de allsaves est supérieur à 0 reviens à l'etat précédent
    }else{ 
        console.log("pas trouve");
        ctx.putImageData(save, 0, 0);
    }
    console.log(firstclick,secondclick);
    clic = 0; //reinitialise
    firstclick = "";
    secondclick = "";
    canvas.classList.remove("no-click");
    
}


