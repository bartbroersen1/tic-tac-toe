const cellContainer = document.querySelector("#cellContainer");

const Gameboard = (function () {

    const rows = 3;
    const columns = rows;
    const winningLines = [];

    const layoutBoard = () => {
        const board = [];
    
        for (let i = 0; i < rows; i++) {
            board[i] = [];
            for (let j = 0; j < columns; j++) {
                const cell = createCell(i, j);
                board[i].push(cell);
            };
        }
        return board;
    }
    
    const board = layoutBoard();
    console.log(board);
 
    function createCell (i, j) {

        const cell = document.createElement("div");
        cell.classList.add("cell");
        const row = `${i}`;
        const column = `${j}`;
        const value = 0;
        cellContainer.appendChild(cell);
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
        const winningRow = board[k];
        const winningColumn = [];

        for (let i = 0; i < rows; i++) {            
            for (let j = 0; j < columns; j++) {
                if (board[i][j].column === `${k}`) {
                    winningColumn.push(board[i][j]);
                };
            }
        }

        winningLines.push(winningRow);
        winningLines.push(winningColumn);

    }

    const winningDiagonalOne = [];
    const winningDiagonalTwo = [];

    for (let i = 0; i < rows; i++) {
            winningDiagonalOne.push(board[i][i]);
    }
    for (let i = 0; i < rows; i++) {
            winningDiagonalTwo.push(board[i][board[i].length - 1 - i]);
    }

    winningLines.push(winningDiagonalOne);
    winningLines.push(winningDiagonalTwo);


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
    const setCellValue = function(row, column, playerValue) { 
        if (board[row][column].value === 0) {
            return board[row][column].value = playerValue;
        } else {
            return;
        }
    };

    console.log(" ");
    console.log(" ");
    console.log(" ");    
    console.log(" ");
    console.log(" ");
    console.log(" ");
    console.log(winningLines);

    return {layoutBoard, getCellValue, setCellValue, checkWinningLines};

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

    const playerOne = createPlayer(/*prompt("Player one, please enter your name")*/"bart", "x");
    const playerTwo = createPlayer(/*prompt("Player two, please enter your name")*/"sjon", "o");

    let activePlayer = playerOne;
    const getActivePlayer = () => activePlayer;
    const toggleActivePlayer = () => activePlayer === playerOne ? 
        activePlayer = playerTwo : activePlayer = playerOne;

    return {getActivePlayer, toggleActivePlayer};

})();

const Gameplay = (function() {

    for (let i = 0; i < 9; i++) {

        let row = +prompt("Choose a row");
        let column = +prompt("Choose a column");

        while (Gameboard.getCellValue(row, column)) {
            row = +prompt("choose another value", "row");
            column = +prompt("choose another value", "column");
        };

        Gameboard.setCellValue(row, column, Players.getActivePlayer().getPlayerValue());

        if (Gameboard.checkWinningLines()) {
            Players.getActivePlayer().giveScore();
            console.log(`${row} : ${column}   ${Gameboard.getCellValue(row, column)}`);
            console.log(`${Players.getActivePlayer().getName()} is the winner`);
            console.log(`the winning line is ${Gameboard.checkWinningLines()}`);
            console.log(`${Players.getActivePlayer().getName()}'s score: ${Players.getActivePlayer().getScore()}`);
            return;
        } else {
            console.log(`${row} : ${column}   ${Gameboard.getCellValue(row, column)}`);
            Players.toggleActivePlayer();
        };
    };

    if (!Gameboard.checkWinningLines()) {
        console.log("It's a tie!")
    };
    
})();

const DisplayController = (function () {

    Gameboard.layoutBoard();

})();

//SCOREBOARD?