const board = document.getElementById('game-board');
const messageElement = document.getElementById('message');
const restartButton = document.getElementById('restart-btn');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];  // Empty game state

// Function to create game grid
function createBoard() {
    board.innerHTML = '';
    gameBoard.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('game-cell');
        cellElement.setAttribute('data-index', index);
        cellElement.innerText = cell;
        cellElement.addEventListener('click', handleCellClick);
        board.appendChild(cellElement);
    });
}

// Handle cell click
function handleCellClick(event) {
    const index = event.target.getAttribute('data-index');
    
    if (gameBoard[index] !== '' || isGameOver()) return;  // Ignore click if cell is already filled or game over

    gameBoard[index] = currentPlayer;
    createBoard();
    if (checkWinner()) {
        messageElement.innerText = `${currentPlayer} Wins!`;
        return;
    }
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

// Check if there's a winner
function checkWinner() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
    });
}

// Check if game is over (either win or draw)
function isGameOver() {
    return checkWinner() || gameBoard.every(cell => cell !== '');
}

// Restart the game
function restartGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    messageElement.innerText = '';
    createBoard();
}

// Initialize the board on page load
createBoard();
