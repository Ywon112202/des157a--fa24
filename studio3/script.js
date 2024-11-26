(function() {
    'use strict';
    console.log('reading js');

    const rollDiceButton = document.querySelector('#roll-dice');
    const diceResultDisplay = document.querySelector('#dice-result');
    const wordDisplay = document.querySelector('#word-display');
    const guessesLeftDisplay = document.querySelector('#guesses-left');
    const guessLetterButton = document.querySelector('#guess-letter');
    const letterGuessInput = document.querySelector('#letter-guess');
    const gameResultDisplay = document.querySelector('#game-result');
    const gameContainer = document.querySelector('#game-container');

    const gameData = {
        words: ['javascript', 'hangman', 'programming', 'developer', 'internet'],
        currentWord: '',
        hiddenWord: '',
        maxGuesses: 6,  // Default max incorrect guesses
        incorrectGuesses: 0,
        correctGuesses: 0
    };

    function rollDice() {
        const roll = Math.floor(Math.random() * 6) + 1; // Dice roll between 1 and 6
        diceResultDisplay.textContent = `You rolled a ${roll}!`;

        // Change maxGuesses based on roll (e.g., if you roll 6, you get more incorrect guesses)
        gameData.maxGuesses = roll;
        guessesLeftDisplay.textContent = gameData.maxGuesses - gameData.incorrectGuesses;

        startGame();
    }

    function startGame() {
        // Pick a random word from the list
        const randomWord = gameData.words[Math.floor(Math.random() * gameData.words.length)];
        gameData.currentWord = randomWord;
        gameData.hiddenWord = randomWord.replace(/[a-zA-Z]/g, '_');
        wordDisplay.textContent = gameData.hiddenWord;
        
        // Show the game controls
        gameContainer.style.display = 'block';
        diceResultDisplay.textContent = `You rolled a ${Math.floor(Math.random() * 6) + 1}!`;

        guessLetterButton.disabled = false;
    }

    function handleGuess() {
        const letter = letterGuessInput.value.toLowerCase();

        if (letter.length !== 1 || !/[a-zA-Z]/.test(letter)) {
            alert("Please enter a valid letter.");
            return;
        }

        letterGuessInput.value = '';  // Clear input

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
        wordDisplay.textContent = gameData.hiddenWord;

        if (correctGuess) {
            gameData.correctGuesses++;
            checkWinCondition();
        } else {
            gameData.incorrectGuesses++;
            guessesLeftDisplay.textContent = gameData.maxGuesses - gameData.incorrectGuesses;
            checkLoseCondition();
        }
    }

    function checkWinCondition() {
        if (gameData.hiddenWord === gameData.currentWord) {
            gameResultDisplay.textContent = 'Congratulations, you guessed the word!';
            guessLetterButton.disabled = true;
        }
    }

    function checkLoseCondition() {
        if (gameData.incorrectGuesses >= gameData.maxGuesses) {
            gameResultDisplay.textContent = 'You lost, too many incorrect guesses!';
            guessLetterButton.disabled = true;
        }
    }

    rollDiceButton.addEventListener('click', rollDice);
    guessLetterButton.addEventListener('click', handleGuess);
})();


