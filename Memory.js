var start = document.getElementById('Start');
var restart = document.getElementById('Restart');
const canvas = document.querySelector("#gamefield");
const ctx = canvas.getContext("2d");
const canvascontainer = document.getElementById("canvas-container");

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
    creationDiv();


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
    }

    function creationDiv(){
        //créer une div pour chaque élément du tableau listeLegumesJeu
        for (let i=0; i<listeLegumesJeu.length;i++){
          let div = document.createElement('div');
          div.classList.add('hidden-card');
          div.id = 'div'+i;
          div.setAttribute('data-legumes',listeLegumesJeu[i]);
          div.style.position = 'absolute';
          div.style.left = canvascontainer.offsetLeft + (i*100) + 'px';
          div.style.top = canvascontainer.offsetTop + (i*100) + 'px';
          div.addEventListener('click',function(){
            console.log('La div a été cliqué');
          });
          document.body.appendChild(div);
        }

    }

    console.log(listeLegumesJeu);
}

