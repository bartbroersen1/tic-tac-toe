
const Gameboard = (function () {

    const rows = 3;
    const columns = rows;
    const board = [];
    const winningLines = [];

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

    const checkWinningLines = function() {
        const completedWinningLines = winningLines.filter(
            line => line.every(cell => cell.value === "x") 
            || line.every(cell => cell.value === "o")
        );
        
        if (completedWinningLines[0]) {
            return completedWinningLines;
        };
    }

    const getCellValue = (row, column) => 
        board[row][column].value;
    const setCellValue = (row, column, playerValue) => 
        board[row][column].value = playerValue;

    return {getCellValue, setCellValue, checkWinningLines}; 

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

    const playerOne = createPlayer(prompt("Player one, please enter your name"), "x");
    const playerTwo = createPlayer(prompt("Player two, please enter your name"), "o");

    let activePlayer = playerOne;
    const getActivePlayer = () => activePlayer;
    const toggleActivePlayer = () => activePlayer === playerOne ? 
        activePlayer = playerTwo : activePlayer = playerOne;

    return {getActivePlayer, toggleActivePlayer};

})();

const Game = (function() {

    for (let i = 0; i < 9; i++) {

        Gameboard.setCellValue(
            +prompt("row"), +prompt("column"), Players.getActivePlayer().getPlayerValue()
        );

        //CHECK IF THE CELL ALREADY HAS A VALUE

        if (Gameboard.checkWinningLines()) {
            Players.getActivePlayer().giveScore();
            console.log(`${Players.getActivePlayer().getName()} is the winner`);
            console.log(`${Players.getActivePlayer().getName()}'s score: ${Players.getActivePlayer().getScore()}`);
            return;
        } else {
            Players.toggleActivePlayer();
        };
    };

    if (!Gameboard.checkWinningLines()) {
        console.log("It's a tie!")
    };
    
})();

//SCOREBOARD?