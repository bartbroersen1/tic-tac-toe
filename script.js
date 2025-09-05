

const Gameboard = (function () {
    const rows = 3;
    const columns = rows;
    const board = [];

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            const cell = createCell(i, j);
            board[i].push(cell);
        };
    }

    function createCell (i, j) {

        const cell = document.createElement("div");
        const row = `${i}`;
        const column = `${j}`;
        const value = "0";
        /*
        const cell = document.createElement("div");
        cell.setAttribute("row", `${i}`);
        cell.setAttribute("column", `${j}`);
        cell.setAttribute("value", "0");
        */

        //cell.classList.toggle("value")
        //const cellId = i + ":" + j;
        //let cellValue = 0;
        return {cell, row, column, value};
    }

    console.log(board)

    const winningLines = [];

    for (let k = 0; k < rows; k++) {
        const winningRows = board[k];
        const winningColumns = [];

        for (let i = 0; i < rows; i++) {            
            for (let j = 0; j < columns; j++) {
                if (board[i][j].column === `${k}`) {
                    winningColumns.push(board[i][j]);
                };
            }
        }

        winningLines.push(winningRows);
        winningLines.push(winningColumns);

        //ADD DIAGONALS TO WINNING LINES
    }

    console.log(winningLines);

    function checkWinningLines () {
        const completedWinningLines = winningLines.filter(
            line => line.every(cell => cell.value === "x") 
            || line.every(cell => cell.value === "o")
        );
        
        if (completedWinningLines[0]) {
            return completedWinningLines;
        };
    }

    console.log(checkWinningLines());

    const getCellValue = (row, column) => 
        board[row][column].value;
    const setCellValue = (row, column, playerValue) => 
        board[row][column].value = playerValue; 
    //const getCellId = (row, column) => board[row][column].cellId;
    //const getCellValue = (row, column) => board[row][column].cellValue;
    //const setCellValue = (i, j, value) => board[i][j].cellValue = value; 
    //board.filter(event).map()

    return {getCellValue, setCellValue};
})();

const Players = (function() {
    const createPlayer = function (name, playerValue) {
        const getName = () => name;
        const getPlayerValue = () => playerValue;

        let score = 0;
        const getScore = () => score;
        const giveScore = () => score++;
        return {getName, getPlayerValue, getScore, giveScore};
    }

    const playerOne = createPlayer("bobby", "x");
    const playerTwo = createPlayer("sjon", "o");

    let activePlayer = playerOne;
    const getActivePlayer = () => activePlayer;
    const toggleActivePlayer = () => activePlayer === playerOne ? 
        activePlayer = playerTwo : activePlayer = playerOne;

    return {getActivePlayer, toggleActivePlayer};
})();
/*
const Game = (function() {

    let ActivePlayer
    
    //event listener with click

    const chooseCell = function (e) {
        //e id
        Gameboard.getCellValue(getCellId()) ? return 
        : Gameboard.setCellValue(getCellId(), getPlayerCell());
    }
    //Players.playerOne.getActivePlayer() ?
    Players.playerOne.switchActivePlayer()
    Players.playerTwo.switchActivePlayer()
})();
*/
console.log(Gameboard.getCellValue(1, 1));
//Gameboard.setCellValue(1, 1, "x");
console.log(Gameboard.getCellValue(1, 1));

console.log(Players.getActivePlayer().getPlayerValue());
console.log(Players.getActivePlayer().getName());
Players.toggleActivePlayer();
console.log(Players.getActivePlayer().getName());
console.log(Players.getActivePlayer().getPlayerValue());

//console.log(Players.playerOne.getPlayerCell());
//console.log(Players.playerOne.getActivePlayer());