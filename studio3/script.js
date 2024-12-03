(function () {
    'use strict';
    console.log('reading js');

    // Audio elements
    const diceRollSound = document.getElementById('dice-roll-sound');
    const winSound = document.getElementById('win-sound');
    const loseSound = document.getElementById('lose-sound');

    const rollDiceButtonPlayer1 = document.querySelector('#roll-btn-player1');
    const rollDiceButtonPlayer2 = document.querySelector('#roll-btn-player2');
    const guessInputPlayer1 = document.querySelector('#guess-input-player1');
    const guessInputPlayer2 = document.querySelector('#guess-input-player2');
    const diceResultPlayer1 = document.querySelector('#dice-result-player1');
    const diceResultPlayer2 = document.querySelector('#dice-result-player2');
    const gameResultPlayer1 = document.querySelector('#game-result-player1');
    const gameResultPlayer2 = document.querySelector('#game-result-player2');
    const scorePlayer1 = document.querySelector('#score-player1');
    const scorePlayer2 = document.querySelector('#score-player2');
    const diceImagePlayer1 = document.querySelector('#dice-img-player1');
    const diceImagePlayer2 = document.querySelector('#dice-img-player2');

    let currentPlayer = 1;
    let score1 = 0;
    let score2 = 0;

    const gameData = {
        words: ['javascript', 'hangman', 'programming', 'developer', 'internet'],
        currentWord: '',
        hiddenWord: '',
        maxGuesses: 6,
        incorrectGuesses: 0,
        correctGuesses: 0
    };

    // Roll Dice function
    function rollDice(player) {
        const roll = Math.floor(Math.random() * 6) + 1;

        if (player === 1) {
            diceResultPlayer1.textContent = `Player 1 rolled a ${roll}!`;
            updateDiceImage(diceImagePlayer1, roll);
        } else {
            diceResultPlayer2.textContent = `Player 2 rolled a ${roll}!`;
            updateDiceImage(diceImagePlayer2, roll);
        }

        gameData.maxGuesses = roll;
        gameData.incorrectGuesses = 0;

        diceRollSound.play();  // Play the dice roll sound
        startGame(player);
    }

    function updateDiceImage(diceImage, roll) {
        diceImage.src = `image/dice${roll}.png`;
        diceImage.alt = `Dice showing ${roll}`;
    }

    // Start the game for the current player
    function startGame(player) {
        const randomWord = gameData.words[Math.floor(Math.random() * gameData.words.length)];
        gameData.currentWord = randomWord;
        gameData.hiddenWord = randomWord.replace(/[a-zA-Z]/g, '_');

        if (player === 1) {
            gameResultPlayer1.textContent = `Game started! Guess a letter.`;
            diceResultPlayer1.textContent = gameData.hiddenWord;
            guessInputPlayer1.disabled = false;
        } else {
            gameResultPlayer2.textContent = `Game started! Guess a letter.`;
            diceResultPlayer2.textContent = gameData.hiddenWord;
            guessInputPlayer2.disabled = false;
        }
    }

    // Handle letter guesses
    function handleGuess(player) {
        const guessInput = player === 1 ? guessInputPlayer1 : guessInputPlayer2;
        const resultText = player === 1 ? diceResultPlayer1 : diceResultPlayer2;

        const letter = guessInput.value.toLowerCase();
        guessInput.value = ''; 

        if (letter.length !== 1 || !/[a-zA-Z]/.test(letter)) {
            alert("Please enter a valid letter.");
            return;
        }

        let correctGuess = false;
        let updatedWord = '';
        for (let i = 0; i < gameData.currentWord.length; i++) {
            if (gameData.currentWord[i] === letter) {
                updatedWord += letter;
                correctGuess = true;
            } else {
                updatedWord += gameData.hiddenWord[i];
            }
        }

        gameData.hiddenWord = updatedWord;
        resultText.textContent = gameData.hiddenWord;

        if (correctGuess) {
            updateScore(player);
        } else {
            gameData.incorrectGuesses++;
        }

        checkGameStatus(player);
    }

    // Update player's score
    function updateScore(player) {
        if (player === 1) {
            score1++;
            scorePlayer1.textContent = score1;
        } else {
            score2++;
            scorePlayer2.textContent = score2;
        }
    }

    // Check game status
    function checkGameStatus(player) {
        const gameResult = player === 1 ? gameResultPlayer1 : gameResultPlayer2;

        if (gameData.hiddenWord === gameData.currentWord) {
            gameResult.textContent = `Congratulations, Player ${player} wins!`;
            winSound.play();  // Play win sound
            endGame();
        } else if (gameData.incorrectGuesses >= gameData.maxGuesses) {
            gameResult.textContent = `Sorry, Player ${player} loses!`;
            loseSound.play();  // Play lose sound
            endGame();
        } else {
            switchPlayer();
        }
    }

    // Switch to the other player
    function switchPlayer() {
        currentPlayer = currentPlayer === 1 ? 2 : 1;
        rollDiceButtonPlayer1.disabled = currentPlayer !== 1;
        rollDiceButtonPlayer2.disabled = currentPlayer !== 2;
    }

    // End the game
    function endGame() {
        guessInputPlayer1.disabled = true;
        guessInputPlayer2.disabled = true;
        rollDiceButtonPlayer1.disabled = true;
        rollDiceButtonPlayer2.disabled = true;
    }

    // Event Listeners for Dice Rolls and Guesses
    rollDiceButtonPlayer1.addEventListener('click', () => rollDice(1));
    rollDiceButtonPlayer2.addEventListener('click', () => rollDice(2));
    guessInputPlayer1.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') handleGuess(1);
    });
    guessInputPlayer2.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') handleGuess(2);
    });
})();
