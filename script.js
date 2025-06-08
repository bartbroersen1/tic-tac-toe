

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
        cell.setAttribute("row", `${i}`);
        cell.setAttribute("column", `${j}`);
        cell.setAttribute("value", "0");
        //cell.classList.toggle("value")
        //const cellId = i + ":" + j;
        //let cellValue = 0;
        return {cell};
    }

    const winningLines = [];

    for (let k = 0; k < rows; k++) {
        const winningRows = board[k];
        const winningColumns = [];

            for (let i = 0; i < rows; i++) {            
                for (let j = 0; j < columns; j++) {
                    if (board[i][j].cell.getAttribute("column") === `${k}`) {
                        winningColumns.push(board[i][j].cell.getAttribute("column"));
                    };
                }
            }
        
        winningLines.push(winningRows);
        winningLines.push(winningColumns);
    }

    function checkWinningLine () {
        Array.every(Object.getAttribute("value") === "x")
        || Array.every(Object.getAttribute("value") === "o")
        ? true : false;
    }

    function checkWinner () {
        for (let i = 0; i < winningLines.length; i++) {
                winningLines.forEach(checkWinningLine())
            }
    }

    console.log(checkWinner());

    const getCellValue = (row, column) => 
        board[row][column].cell.getAttribute("value");
    const setCellValue = (row, column, playerValue) => 
        board[row][column].cell.setAttribute("value", playerValue); 
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
Gameboard.setCellValue(1, 1, "x");
console.log(Gameboard.getCellValue(1, 1));

console.log(Players.getActivePlayer().getPlayerValue());
console.log(Players.getActivePlayer().getName());
Players.toggleActivePlayer();
console.log(Players.getActivePlayer().getName());
console.log(Players.getActivePlayer().getPlayerValue());

//console.log(Players.playerOne.getPlayerCell());
//console.log(Players.playerOne.getActivePlayer());