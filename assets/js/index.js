import Board from "./board.js";

let board = new Board(); // creates a new game board

// Examine the grid of the game board in the browser console.
// Create the UI of the game using HTML elements based on this grid.
console.log(board.grid);

// Your code here

window.addEventListener("DOMContentLoaded", event => {

  let hiddenGameOver = document.createElement("h2");
  hiddenGameOver.innerText = "YOU WIN!";
  hiddenGameOver.classList.add("hide");
  document.body.append(hiddenGameOver);

  let resetButton = document.createElement("button");
  resetButton.innerText = "Reset Game";
  document.body.append(resetButton);

  let gameGrid;

  let addGrid = () => {
    gameGrid = document.createElement("div");
    gameGrid.id = "board";
    document.body.append(gameGrid);

    board.grid.forEach(
      (row, rowNumber) => {
        row.forEach(
          (element, colNumber) => {

            //create a square for each value of the array
            let container = document.createElement("div");
            container.className = "square";

            //store its row and column as data
            container.setAttribute("data-row", rowNumber);
            container.setAttribute("data-col", colNumber);

            gameGrid.append(container);
          }
        );
      }
    );
  }

  addGrid();

  resetButton.addEventListener("click", event => {
    board = new Board();
    hiddenGameOver.classList.add("hide");
    hiddenGameOver.classList.remove("show");

    //delete the grid
    gameGrid.remove();
    addGrid();
    gameGrid.addEventListener("click", gameGridClickListener);

  })

  const gameGridClickListener = (event) =>  {

    let row = event.target.dataset.row;
    let col = event.target.dataset.col;
    let result = board.makeHit(row, col)

    if (result) {
      event.target.classList.add("correct");
      event.target.innerText = result;
    }
    if (!result) {
      event.target.classList.add("incorrect");
    }

    //if game over, display win and remove event listeners
    if (board.isGameOver()) {
      hiddenGameOver.classList.add("show");
      hiddenGameOver.classList.remove("hide");
      gameGrid.removeEventListener("click", gameGridClickListener);
    }
  }
  gameGrid.addEventListener("click", gameGridClickListener);

});
