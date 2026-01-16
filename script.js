// Lucky Number Game Logic
let luckyNumber;
let attempts = 0;
let highScore = localStorage.getItem('highScore') || null;

// DOM Elements
const guessInput = document.getElementById('guessInput');
const submitButton = document.getElementById('submitGuess');
const resetButton = document.getElementById('resetGame');
const messageElement = document.getElementById('message');
const attemptsElement = document.getElementById('attempts');
const highScoreElement = document.getElementById('highScore');

// Initialize game
function initGame() {
    luckyNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    messageElement.textContent = '';
    attemptsElement.textContent = '';
    guessInput.value = '';
    guessInput.disabled = false;
    submitButton.disabled = false;
    updateHighScore();
}

// Update high score display
function updateHighScore() {
    if (highScore) {
        highScoreElement.textContent = highScore;
    } else {
        highScoreElement.textContent = '-';
    }
}

// Check guess
function checkGuess() {
    const guess = parseInt(guessInput.value);
    
    if (isNaN(guess) || guess < 1 || guess > 100) {
        messageElement.textContent = 'Please enter a valid number between 1 and 100!';
        messageElement.style.color = '#e74c3c';
        return;
    }
    
    attempts++;
    
    if (guess === luckyNumber) {
        messageElement.textContent = `🎉 Congratulations! ${luckyNumber} is the lucky number!`;
        messageElement.style.color = '#27ae60';
        attemptsElement.textContent = `You guessed it in ${attempts} attempts!`;
        guessInput.disabled = true;
        submitButton.disabled = true;
        
        // Update high score
        if (!highScore || attempts < highScore) {
            highScore = attempts;
            localStorage.setItem('highScore', highScore);
            updateHighScore();
            attemptsElement.textContent += ' 🏆 New High Score!';
        }
    } else if (guess < luckyNumber) {
        messageElement.textContent = '📈 Too low! Try a higher number.';
        messageElement.style.color = '#f39c12';
        attemptsElement.textContent = `Attempts: ${attempts}`;
    } else {
        messageElement.textContent = '📉 Too high! Try a lower number.';
        messageElement.style.color = '#f39c12';
        attemptsElement.textContent = `Attempts: ${attempts}`;
    }
    
    guessInput.value = '';
    guessInput.focus();
}

// Event listeners
submitButton.addEventListener('click', checkGuess);
guessInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        checkGuess();
    }
});
resetButton.addEventListener('click', initGame);

// Start game on load
initGame();
