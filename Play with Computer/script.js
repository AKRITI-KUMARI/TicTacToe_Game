const HUMAN = 'O';
const AI = 'X';
let board = Array(9).fill('');
let boxes = document.querySelectorAll(".box");
let msgContainer = document.querySelector(".msg-container");
let msg = document.getElementById("msg");
let resetBtn = document.getElementById("reset-btn");
let newGameBtn = document.getElementById("new-btn");
let currentPlayer = HUMAN;

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        if (board[index] === '' && currentPlayer === HUMAN) {
            board[index] = HUMAN;
            box.innerText = HUMAN;
            box.classList.add("red");
            let winner = checkWinner(board);
            if (winner) {
                showMessage(winner);
                return;
            }
            currentPlayer = AI;
            setTimeout(aiMove, 500);
        }
    });
});

// Reset the Game
resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);


// Function to check the winner
function checkWinner(board) {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
    return board.includes('') ? null : 'Draw';
}

// Display Winner Message
function showMessage(winner) {
    msgContainer.classList.remove("hide");
    msg.innerText = winner === 'Draw' ? "It's a Draw!" : `${winner} Wins!`;
}

// AI Makes Its Move
function aiMove() {
    let move = findBestMove();
    if (move !== undefined) {
        board[move] = AI;
        boxes[move].innerText = AI;
        boxes[move].classList.add("blue");
        let winner = checkWinner(board);
        if (winner) {
            showMessage(winner);
        } else {
            currentPlayer = HUMAN;
        }
    }
}

// Function to find the best move for AI
function findBestMove() {
    let bestScore = -Infinity;
    let move;
    for (let i = 0; i < board.length; i++) {
        if (board[i] === '') {
            board[i] = AI;
            let score = minimax(board, 0, false, -Infinity, Infinity);
            board[i] = '';
            if (score > bestScore) {
                bestScore = score;
                move = i;
            }
        }
    }
    return move;
}

// Minimax Algorithm with Alpha-Beta Pruning
function minimax(board, depth, isMaximizing, alpha, beta) {
    let result = checkWinner(board);
    if (result === AI) return 10 - depth;
    if (result === HUMAN) return depth - 10;
    if (result === 'Draw') return 0;
    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === '') {
                board[i] = AI;
                let score = minimax(board, depth + 1, false, alpha, beta);
                board[i] = '';
                bestScore = Math.max(score, bestScore);
                alpha = Math.max(alpha, bestScore);
                if (beta <= alpha) break;
            }
        }
        return bestScore;
    } 
    else {
        let bestScore = Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === '') {
                board[i] = HUMAN;
                let score = minimax(board, depth + 1, true, alpha, beta);
                board[i] = '';
                bestScore = Math.min(score, bestScore);
                beta = Math.min(beta, bestScore);
                if (beta <= alpha) break;
            }
        }
        return bestScore;
    }
}

function resetGame() {
    board.fill('');
    boxes.forEach((box) => {
        box.innerText = '';
        box.classList.remove("red", "blue");
    });
    msgContainer.classList.add("hide");
    currentPlayer = HUMAN;
}