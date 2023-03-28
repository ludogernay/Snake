const canvas = document.querySelector("#gamefield")
const ctx = canvas.getContext("2d")

const cellSize = 30; // taille d'une cellule en pixels
const rows = 15; // nombre de lignes
let cols = 30; // nombre de colonnes

ctx.lineWidth = 1; // épaisseur par défaut des bordures
ctx.strokeStyle = '#000000'; // couleur par défaut des bordures

// mettre à jour la largeur du canvas en fonction du nombre de colonnes
canvas.width = cols * cellSize;

// dessiner les bordures de chaque cellule de la grille
for (let i = 0; i < rows; i++) {
  for (let j = 0; j < cols; j++) {
    if (i == 0 || i == rows - 1 || j == 0 || j == cols - 1) {
        ctx.lineWidth = 2; // mettre une épaisseur plus grande
        ctx.strokeStyle = '#FF0000'; // mettre une couleur différente
    } else {
        ctx.lineWidth = 1; // mettre l'épaisseur par défaut
        ctx.strokeStyle = '#000000'; // mettre la couleur par défaut
    }
      ctx.strokeRect(j * cellSize, i * cellSize, cellSize, cellSize);
  }
}