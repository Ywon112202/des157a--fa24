(function() {
    'use strict';
    console.log('reading js');

    // Game elements
    const startGameButton = document.querySelector('#startGameButton');
    const gameArea = document.querySelector('#game');
    const scoreArea = document.querySelector('#score');

    // Game data structure
    const gameData = {
        wordList: ["javascript", "hangman", "developer", "coding", "challenge"],
        chosenWord: "",
        displayedWord: [],
        guessedLetters: [],
        incorrectGuesses: [],
        maxIncorrectGuesses: 0,
        score: 0
    };

    // Dice roll values (to determine max incorrect guesses)
    const diceImages = [
        "images/1die.jpg", "images/2die.jpg", "images/3die.jpg", 
        "images/4die.jpg", "images/5die.jpg", "images/6die.jpg"
    ];

    // Dice roll to set max incorrect guesses
    function rollDice() {
        const roll = Math.floor(Math.random() * 6) + 1;
        gameData.maxIncorrectGuesses = roll;
        console.log(`Rolled a ${roll}`);
        return roll;
    }

    // Start the game
    startGameButton.addEventListener("click", function() {
        // Roll dice to decide difficulty
        const maxGuesses = rollDice();
        console.log(`Max Incorrect Guesses: ${maxGuesses}`);

        // Randomly pick a word
        gameData.chosenWord = gameData.wordList[Math.floor(Math.random() * gameData.wordList.length)];
        gameData.displayedWord = Array(gameData.chosenWord.length).fill('_');
        gameData.guessedLetters = [];
        gameData.incorrectGuesses = [];
        gameData.score = 0;

        // Update the interface
        gameArea.innerHTML = `
            <p>Word to guess: ${gameData.displayedWord.join(' ')}</p>
            <input type="text" id="guessInput" maxlength="1" />
            <button id="guessButton">Guess Letter</button>
            <p>Incorrect Guesses: ${gameData.incorrectGuesses.join(', ')}</p>
            <p>Max Incorrect Guesses: ${maxGuesses}</p>
        `;
        scoreArea.innerHTML = `Score: ${gameData.score}`;

        // Add event listener for guesses
        document.querySelector('#guessButton').addEventListener('click', handleGuess);
    });

    // Handle the player's guess
    function handleGuess() {
        const guessInput = document.querySelector('#guessInput');
        const guess = guessInput.value.toLowerCase();

        if (gameData.guessedLetters.includes(guess)) {
            alert("You've already guessed that letter!");
            return;
        }

        gameData.guessedLetters.push(guess);

        // Check if the guess is correct
        if (gameData.chosenWord.includes(guess)) {
            // Update displayed word
            for (let i = 0; i < gameData.chosenWord.length; i++) {
                if (gameData.chosenWord[i] === guess) {
                    gameData.displayedWord[i] = guess;
                }
            }
            gameData.score++;
            console.log(`Correct guess: ${gameData.displayedWord.join(' ')}`);
        } else {
            // Incorrect guess
            gameData.incorrectGuesses.push(guess);
            console.log(`Incorrect guess: ${gameData.incorrectGuesses.join(', ')}`);
        }

        // Check for win or loss
        if (gameData.displayedWord.join('') === gameData.chosenWord) {
            gameArea.innerHTML += `<p>You won! The word was: ${gameData.chosenWord}</p>`;
            scoreArea.innerHTML = `Score: ${gameData.score}`;
        } else if (gameData.incorrectGuesses.length >= gameData.maxIncorrectGuesses) {
            gameArea.innerHTML += `<p>Game over! The word was: ${gameData.chosenWord}</p>`;
            scoreArea.innerHTML = `Score: ${gameData.score}`;
        } else {
            gameArea.innerHTML = `
                <p>Word to guess: ${gameData.displayedWord.join(' ')}</p>
                <input type="text" id="guessInput" maxlength="1" />
                <button id="guessButton">Guess Letter</button>
                <p>Incorrect Guesses: ${gameData.incorrectGuesses.join(', ')}</p>
                <p>Max Incorrect Guesses: ${gameData.maxIncorrectGuesses}</p>
            `;
        }
    }
})();



