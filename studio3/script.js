
(function () {
    "use strict";
    console.log("reading js");

let wordToGuess = "";
let hiddenWord = [];
let usedLetters = [];
let attempts = 0;
const maxAttempts = 6;


const wordInput = document.getElementById("word-input");
const startGameButton = document.getElementById("start-game");
const setupPhase = document.getElementById("setup-phase");
const gameArea = document.getElementById("game");
const hiddenWordDisplay = document.getElementById("hidden-word");
const hangmanImage = document.getElementById("hangman-image");
const guessInput = document.getElementById("guess");
const submitButton = document.getElementById("submit");
const usedLettersDisplay = document.getElementById("letters");
const feedback = document.getElementById("feedback");


startGameButton.addEventListener("click", () => {
    wordToGuess = wordInput.value.trim().toLowerCase();
    if (wordToGuess === "") {
        feedback.textContent = "Please enter a valid word!";
        return;
    }
    setupPhase.style.display = "none";
    gameArea.style.display = "block";
    initializeGame();
});


function initializeGame() {
    hiddenWord = Array(wordToGuess.length).fill("_");
    hiddenWordDisplay.textContent = hiddenWord.join(" ");
    usedLetters = [];
    attempts = 0;
    hangmanImage.src = `images/step0.png`;
    updateUsedLetters();
}


submitButton.addEventListener("click", () => {
    const guess = guessInput.value.trim().toLowerCase();
    guessInput.value = ""; 
    if (guess === "" || usedLetters.includes(guess) || guess.length !== 1) {
        feedback.textContent = "Invalid or repeated letter!";
        return;
    }

    usedLetters.push(guess);
    updateUsedLetters();

    if (wordToGuess.includes(guess)) {
        updateHiddenWord(guess);
        if (!hiddenWord.includes("_")) {
            feedback.textContent = "Player 2 wins! The word was " + wordToGuess;
            endGame();
        }
    } else {
        attempts++;
        hangmanImage.src = `images/step${attempts}.png`;
        if (attempts >= maxAttempts) {
            feedback.textContent = "Player 1 wins! The word was " + wordToGuess;
            endGame();
        }
    }
});


function updateHiddenWord(letter) {
    for (let i = 0; i < wordToGuess.length; i++) {
        if (wordToGuess[i] === letter) {
            hiddenWord[i] = letter;
        }
    }
    hiddenWordDisplay.textContent = hiddenWord.join(" ");
}


function updateUsedLetters() {
    usedLettersDisplay.textContent = usedLetters.join(", ");
}


function endGame() {
    guessInput.disabled = true;
    submitButton.disabled = true;
}

})();
