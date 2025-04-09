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

        //create element with class or id
        const cellId = i + ":" + j;
        let cellValue = 0;
        return {cellId, cellValue};
    }

    const getCellId = (i, j) => board[i][j].cellId;
    const getCellValue = (i, j) => board[i][j].cellValue;
    const setCellValue = (i, j, value) => board[i][j].cellValue = value; 
    //board.filter(event).map()
    return {getCellId, getCellValue, setCellValue};
})();

const Players = (function() {
    const createPlayer = function (name, playerCell, activePlayer) {
        const getName = () => name;
        const getPlayerCell = () => playerCell;
        const getActivePlayer = () => activePlayer;
        const switchActivePlayer = () => activePlayer ? activePlayer = false : activePlayer = true;

        let score = 0;
        const getScore = () => score;
        const giveScore = () => score++;
        return {getName, getPlayerCell, getActivePlayer, switchActivePlayer, getScore, giveScore};
    }

    const playerOne = createPlayer("bobby", "x", true);
    const playerTwo = createPlayer("sjon", "o", false);

    return {playerOne, playerTwo};
})();
/*
const Game = (function (player, target) {

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
console.log(Gameboard.getCellId(1, 1));
console.log(Gameboard.getCellValue(1, 1));
Gameboard.setCellValue(1, 1, "x");
console.log(Gameboard.getCellValue(1, 1));

Players.playerOne.switchActivePlayer();
//console.log(Players.playerOne.getPlayerCell());
//console.log(Players.playerOne.getActivePlayer());