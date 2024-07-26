let cells = document.getElementsByClassName("cell");
let message = document.querySelector(".message");
let newGame = document.getElementById("newGame");
let turn = "x";
let rowSum = 0;
let colSum = 0;
let diagSum1 = 0;
let diagSum2 = 0;
let winner = null;
let remainingCells = 9;
let board = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
];

// cells[0].innerHTML = `<img src="./svg/x.svg">`;

// console.log(cells[0].innerHTML.split("/")[2].split(".")[0]);

function gameOver(i, j, index) {
    rowSum = 0;
    colSum = 0;
    diagSum1 = 0;
    diagSum2 = 0;

    for (let iter = 0; iter < 3; iter++) rowSum += board[i][iter];

    if (rowSum == 3 || rowSum == -3) {
        winner = cells[index].innerHTML.split("/")[2].split(".")[0];
        return 1;
    }

    for (let iter = 0; iter < 3; iter++) colSum += board[iter][j];

    if (colSum == 3 || colSum == -3) {
        winner = cells[index].innerHTML.split("/")[2].split(".")[0];
        return 1;
    }

    diagSum1 = board[0][0] + board[1][1] + board[2][2];
    diagSum2 = board[0][2] + board[1][1] + board[2][0];
    if (diagSum1 == 3 || diagSum1 == -3) {
        winner = cells[index].innerHTML.split("/")[2].split(".")[0];
        return 1;
    }
    if (diagSum2 == 3 || diagSum2 == -3) {
        winner = cells[index].innerHTML.split("/")[2].split(".")[0];

        return 1;
    }
    if (remainingCells == 0)
        return 2;

    return 0;
}

function handleClick(index) {
    if (!cells[index].innerHTML && winner===null) {
        cells[index].innerHTML = `<img src="./svg/${turn}.svg">`;
        remainingCells-=1;
        turn === "x" ? (points = 1) : (points = -1);
        turn === "x" ? (turn = "o") : (turn = "x");
        board[Math.floor(index / 3)][index % 3] = points;
        console.log(board[1][1]);
        let result = gameOver(Math.floor(index / 3), index % 3, index);
        if (result == 1) {
            // console.log(`${winner} wins!`);
            message.innerHTML = `<img src="./svg/${winner}.svg"> wins!`;
        }
        else if(result == 2) {
            message.innerHTML = `Its a tie!`;
        }
    }
}

for (let i = 0; i < 9; i++) {
    cells[i].addEventListener("click", () => {
        handleClick(i);
    });
}

newGame.addEventListener("click", ()=>{
    for (let i = 0; i < 9; i++) {
        cells[i].innerHTML = "";
    }
    message.innerHTML = "";
    winner = null;
    turn = "x";
    board = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
    ]
    remainingCells = 9;
})



