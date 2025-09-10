const Gameboard = (function () {

    const rows = 3;
    const columns = rows;
    const board = [];
    const winningLines = [];

    const buildWinningLines = () => {

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

    const checkWinningLines = (reset) => {

        const completedWinningLines = winningLines.filter(
            line => line.every(cell => cell.value === "x") 
            || line.every(cell => cell.value === "o")
        );
        
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
    
    resetBoard();

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

    console.log(" ");
    console.log(" ");
    console.log(" ");    
    console.log(" ");
    console.log(" ");
    console.log(" ");
    console.log(getBoard());

    return {getBoard, resetBoard, getCellValue, setCellValue, checkWinningLines};

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

    const playRound = (selectedRow, selectedColumn) => {

        //for (let i = 0; i < 9; i++) {

            const row = selectedRow;
            const column = selectedColumn;

            if (Gameboard.getCellValue(row, column) !== null) {
                return;
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
        //};

        /*if (!Gameboard.checkWinningLines()) {
            console.log("It's a tie!")
        };*/
    
    };

    return {playRound};
    
})();


const DisplayController = (function () {

    const cellContainer = document.querySelector("#cellContainer");
    const restartButton = document.querySelector("#restartBtn");

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
        updateScreen();
        console.log(Gameboard.checkWinningLines());

    });

})();

//SCOREBOARD?