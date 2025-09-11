const Gameboard = (function () {

    const rows = 3;
    const columns = rows;
    const board = [];
    const winningLines = [];
    const completedWinningLines = [];

    const buildWinningLines = () => {
        winningLines.length = 0;

        for (let k = 0; k < rows; k++) {
            const winningRow = board[k];
            const winningColumn = [];

            for (let i = 0; i < rows; i++) {            
                for (let j = 0; j < columns; j++) {
                    if (board[i][j].column === k) {
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
    };

    const checkWinningLines = () => {
        completedWinningLines.length = 0;

        const matches = winningLines.filter(
            line => line.every(cell => cell.value === "x") 
            || line.every(cell => cell.value === "o")
        );
        completedWinningLines.push(...matches);
        
        if (completedWinningLines[0]) {
            return completedWinningLines;
        };
    };

    function createCell (i, j) {
        return { row: i, column: j, value: null };
    };

    const resetBoard = () => {
        board.length = 0;
    
        for (let i = 0; i < rows; i++) {
            board[i] = [];
            for (let j = 0; j < columns; j++) {
                const cell = createCell(i, j);
                board[i].push(cell);
            };
        }

        buildWinningLines();

        return board;
    };

    const checkForTie = () => {
        return board.every(row =>
            row.every(cell => cell.value !== null)
        );
    };

    const getBoard = () => board;
    const getCellValue = (row, column) => 
        board[row][column].value;
    const setCellValue = (row, column, playerValue) => { 
        if (board[row][column].value === null) {
            return board[row][column].value = playerValue;
        } else {
            return;
        }
    };

    return {getBoard, resetBoard, getCellValue, setCellValue, 
        checkWinningLines, checkForTie
    };

})();

const Players = (function() {

    const createPlayer = function (name, playerValue) {
        const getName = () => name;
        const getPlayerValue = () => playerValue;

        return {getName, getPlayerValue};
    };

    const playerOne = createPlayer(prompt("Player one, please enter your name"), "x");
    const playerTwo = createPlayer(prompt("Player two, please enter your name"), "o");

    let activePlayer = playerOne;
    const getActivePlayer = () => activePlayer;
    const toggleActivePlayer = () => activePlayer === playerOne ? 
        activePlayer = playerTwo : activePlayer = playerOne;

    return {getActivePlayer, toggleActivePlayer};

})();


const Gameplay = (function() {

    const playRound = (selectedRow, selectedColumn) => {

        const row = selectedRow;
        const column = selectedColumn;

        if (Gameboard.getCellValue(row, column) !== null) {
            return;
        } else if (Gameboard.checkWinningLines()) {
            return;
        };

        Gameboard.setCellValue(row, column, Players.getActivePlayer().getPlayerValue());

        if (Gameboard.checkWinningLines()) {
            DisplayController.message.textContent = `${Players.getActivePlayer().getName()} is the winner!`;
            Players.toggleActivePlayer();
            return;
        } else if (Gameboard.checkForTie()) {
            DisplayController.message.textContent = "It's a tie! Press restart";
            Players.toggleActivePlayer();
            return;
        } else {
            Players.toggleActivePlayer();
            DisplayController.message.textContent = `${Players.getActivePlayer().getName()}, it's your turn`;
        };
    
    };

    return {playRound};
    
})();


const DisplayController = (function () {

    const cellContainer = document.querySelector("#cellContainer");
    const restartButton = document.querySelector("#restartBtn");
    const message = document.querySelector("#message");

    const updateScreen = () => {

        while (cellContainer.lastChild) {
            cellContainer.removeChild(cellContainer.lastChild);
        }

        Gameboard.getBoard().forEach((row, rowIndex) => {
            row.forEach((cell, columnIndex) => {

                const cellButton = document.createElement("button");
                cellButton.classList.add("cell");
                cellButton.dataset.row = rowIndex;
                cellButton.dataset.column = columnIndex;
                cellButton.textContent = cell.value;
                cellContainer.appendChild(cellButton);
            })
        })
    };

    cellContainer.addEventListener("click", function (e) {

        const selectedRow = +e.target.dataset.row;
        const selectedColumn = +e.target.dataset.column;

        Gameplay.playRound(selectedRow, selectedColumn);
        updateScreen();
    });

    restartButton.addEventListener("click", function (e) {

        Gameboard.resetBoard();
        restartButton.textContent = "Restart";
        message.textContent = `${Players.getActivePlayer().getName()} has the first turn`
        updateScreen();
    });

    return {message};
    
})();