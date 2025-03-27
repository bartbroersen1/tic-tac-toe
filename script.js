const Gameboard = function() {
    const rows = 3;
    const columns = 5;
    const board = [];

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++); {
            board[i].push("1");
        }
    }

    return (board);
}

const play = function (player, target) {
    player.tile 
}

const createPlayer = function (name) {

    let score = 0;
    const getScore = () => score;
    const giveScore = () => score++;

    
}