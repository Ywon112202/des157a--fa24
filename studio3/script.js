(function() {
    'use strict';
    console.log('reading js');

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

    let currentPlayer = 1; // Track the current player (1 or 2)
    let score1 = 0;
    let score2 = 0;
    
    const gameData = {
        words: ['javascript', 'hangman', 'programming', 'developer', 'internet'],
        currentWord: '',
        hiddenWord: '',
        maxGuesses: 6,  // Default max incorrect guesses
        incorrectGuesses: 0,
        correctGuesses: 0
    };

    function rollDice(player) {
        const roll = Math.floor(Math.random() * 6) + 1; // Dice roll between 1 and 6
        if (player === 1) {
            diceResultPlayer1.textContent = `Player 1 rolled a ${roll}!`;
        } else {
            diceResultPlayer2.textContent = `Player 2 rolled a ${roll}!`;
        }

        // Change maxGuesses based on roll (e.g., if you roll 6, you get more incorrect guesses)
        gameData.maxGuesses = roll;
        gameData.incorrectGuesses = 0;  // Reset incorrect guesses for the new round

        startGame(player);
    }

    function startGame(player) {
        const randomWord = gameData.words[Math.floor(Math.random() * gameData.words.length)];
        gameData.currentWord = randomWord;
        gameData.hiddenWord = randomWord.replace(/[a-zA-Z]/g, '_');
        if (player === 1) {
            gameResultPlayer1.textContent = `Game started! Guess a letter.`;
        } else {
            gameResultPlayer2.textContent = `Game started! Guess a letter.`;
        }

        // Enable the guess input for the current player
        if (player === 1) {
            guessInputPlayer1.disabled = false;
        } else {
            guessInputPlayer2.disabled = false;
        }
    }

    function handleGuess(player) {
        const letter = player === 1 ? guessInputPlayer1.value.toLowerCase() : guessInputPlayer2.value.toLowerCase();

        if (letter.length !== 1 || !/[a-zA-Z]/.test(letter)) {
            alert("Please enter a valid letter.");
            return;
        }

        // Clear the input field
        if (player === 1) {
            guessInputPlayer1.value = '';
        } else {
            guessInputPlayer2.value = '';
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
        if (player === 1) {
            diceResultPlayer1.textContent = gameData.hiddenWord;
        } else {
            diceResultPlayer2.textContent = gameData.hiddenWord;
        }

        if (correctGuess) {
            // Update score
            if (player === 1) score1++;
            else score2++;

            // Display new scores
            scorePlayer1.textContent = score1;
            scorePlayer2.textContent = score2;
        } else {
            // If wrong guess, decrease guesses left for the current player
            gameData.incorrectGuesses++;
        }

        // Check for win or loss
        if (gameData.hiddenWord === gameData.currentWord) {
            if (player === 1) {
                gameResultPlayer1.textContent = 'Congratulations, Player 1 wins!';
            } else {
                gameResultPlayer2.textContent = 'Congratulations, Player 2 wins!';
            }
        } else if (gameData.incorrectGuesses >= gameData.maxGuesses) {
            if (player === 1) {
                gameResultPlayer1.textContent = 'Sorry, Player 1 loses!';
            } else {
                gameResultPlayer2.textContent = 'Sorry, Player 2 loses!';
            }
        }

        // Switch player turn
        currentPlayer = currentPlayer === 1 ? 2 : 1;
        if (currentPlayer === 1) {
            rollDiceButtonPlayer1.disabled = false;
            rollDiceButtonPlayer2.disabled = true;
        } else {
            rollDiceButtonPlayer1.disabled = true;
            rollDiceButtonPlayer2.disabled = false;
        }
    }

    // Event Listeners for Dice Rolls and Guesses
    rollDiceButtonPlayer1.addEventListener('click', function() {
        rollDice(1);
    });

    rollDiceButtonPlayer2.addEventListener('click', function() {
        rollDice(2);
    });

    guessInputPlayer1.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            handleGuess(1);
        }
    });

    guessInputPlayer2.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            handleGuess(2);
        }
    });
})();




