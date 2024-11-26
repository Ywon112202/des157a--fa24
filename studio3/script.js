// script.js
(function () {
    "use strict";
    console.log("Reading JS");

    // Game variables
    const words = ["javascript", "hangman", "function", "variable", "closure"];
    let chosenWord = "";
    let hiddenWord = [];
    let usedLetters = [];
    let incorrectGuesses = 0;
    const maxGuesses = 6;

    // DOM Elements
    const hangmanImage = document.getElementById("hangman-image");
    const hiddenWordDisplay = document.getElementById("hidden-word");
    const guessInput = document.getElementById("guess");
    const submitButton = document.getElementById("submit");
    const usedLettersDisplay = document.getElementById("letters");
    const feedback = document.getElementById("feedback");

    // Initialize Game
    function initializeGame() {
        chosenWord = words[Math.floor(Math.random() * words.length)];
        hiddenWord = Array(chosenWord.length).fill("_");
        usedLetters = [];
        incorrectGuesses = 0;
        updateDisplay();
    }

    // Update Display
    function updateDisplay() {
        hiddenWordDisplay.textContent = hiddenWord.join(" ");
        usedLettersDisplay.textContent = usedLetters.join(", ");
        hangmanImage.src = `images/step${incorrectGuesses}.png`;
        feedback.textContent = "";
    }

    // Handle Guess
    function handleGuess(letter) {
        if (usedLetters.includes(letter) || hiddenWord.includes(letter)) {
            feedback.textContent = "Letter already used!";
            return;
        }
        usedLetters.push(letter);

        if (chosenWord.includes(letter)) {
            for (let i = 0; i < chosenWord.length; i++) {
                if (chosenWord[i] === letter) {
                    hiddenWord[i] = letter;
                }
            }
        } else {
            incorrectGuesses++;
        }

        checkGameState();
        updateDisplay();
    }

    // Check Game State
    function checkGameState() {
        if (hiddenWord.join("") === chosenWord) {
            feedback.textContent = "You Win! 🎉";
            submitButton.disabled = true;
        } else if (incorrectGuesses >= maxGuesses) {
            feedback.textContent = `Game Over! The word was "${chosenWord}".`;
            submitButton.disabled = true;
        }
    }

    // Event Listeners
    submitButton.addEventListener("click", () => {
        const guess = guessInput.value.toLowerCase();
        if (guess && guess.length === 1 && /^[a-z]$/.test(guess)) {
            handleGuess(guess);
        }
        guessInput.value = "";
        guessInput.focus();
    });

    // Start the Game
    initializeGame();
})();

