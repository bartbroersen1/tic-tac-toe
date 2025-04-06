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
        const cellCoord = i + ":" + j;
        let cellValue = 0;

        const getCellValue = () => cellValue;
        const setCellValue = (value) =>  cellValue = value;
        return {cellCoord, getCellValue, setCellValue};
    }

    console.log(board);
    return {board};
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

const Game = (function (player, target) {
    
})();

Gameboard.board[1][1].setCellValue("x");
console.log(Gameboard.board[1][1].cellCoord);
console.log(Gameboard.board[1][1].getCellValue());

Players.playerOne.switchActivePlayer();
console.log(Players.playerOne.getPlayerCell());
console.log(Players.playerOne.getActivePlayer());