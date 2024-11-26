(function () {
    "use strict";
    console.log("reading js");

    /* ------------------ Hangman Game ------------------ */
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

    let startingPlayer = localStorage.getItem("startingPlayer") === "1" ? "2" : "1";
    localStorage.setItem("startingPlayer", startingPlayer);

    // Start game button for Hangman
    startGameButton.addEventListener("click", function() {
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
        feedback.textContent = ""; // Clear previous feedback
    }

    // Submit button for guessing a letter
    submitButton.addEventListener("click", function () {
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
                feedback.textContent = `Player ${startingPlayer} wins! The word was "${wordToGuess}"`;
                endGame();
            }
        } else {
            attempts++;
            hangmanImage.src = `images/step${attempts}.png`;
            if (attempts >= maxAttempts) {
                feedback.textContent = `Player ${startingPlayer === "1" ? "2" : "1"} wins! The word was "${wordToGuess}"`;
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

    /* ------------------ Pig Dice Game ------------------ */
    const startPigGameButton = document.querySelector("#start-pig-game");
    const gameControl = document.querySelector("#gamecontrol");
    const game = document.querySelector("#game");
    const score = document.querySelector("#score");
    const actionArea = document.querySelector("#actions");

    const gameData = {
        dice: ["images/1die.jpg", "images/2die.jpg", "images/3die.jpg", "images/4die.jpg", "images/5die.jpg", "images/6die.jpg"],
        players: ["Player 1", "Player 2"],
        score: [0, 0],
        roll1: 0,
        roll2: 0,
        rollSum: 0,
        index: 0,
        gameEnd: 29,
    };

    // Button to start the Pig Dice game
    startPigGameButton.addEventListener("click", function () {
        gameControl.innerHTML = '<h2>The Game Has Started!</h2>';
        gameControl.innerHTML += '<button id="quit">Quit</button>';
        document.querySelector("#quit").addEventListener("click", function () {
            location.reload();
        });

        gameData.index = Math.round(Math.random());
        setUpTurn();
    });

    function setUpTurn() {
        game.innerHTML = `<p>Roll the dice for ${gameData.players[gameData.index]}</p>`;
        actionArea.innerHTML = '<button id="roll">Roll the Dice</button>';
        document.getElementById("roll").addEventListener("click", throwDice);
    }

    function throwDice() {
        actionArea.innerHTML = "";
        gameData.roll1 = Math.floor(Math.random() * 6) + 1;
        gameData.roll2 = Math.floor(Math.random() * 6) + 1;
        game.innerHTML = `<p>Rolling dice for ${gameData.players[gameData.index]}...</p>`;
        game.innerHTML += `<img src="${gameData.dice[gameData.roll1 - 1]}">
                           <img src="${gameData.dice[gameData.roll2 - 1]}">`;

        gameData.rollSum = gameData.roll1 + gameData.roll2;

        if (gameData.roll1 === 1 && gameData.roll2 === 1) {
            game.innerHTML += "<p>Snake eyes! Score reset to zero!</p>";
            gameData.score[gameData.index] = 0;
            gameData.index = gameData.index ? 0 : 1;
            setTimeout(setUpTurn, 2000);
        } else if (gameData.roll1 === 1 || gameData.roll2 === 1) {
            game.innerHTML += `<p>Rolled a 1! Switching turns to ${gameData.players[gameData.index ? 0 : 1]}</p>`;
            gameData.index = gameData.index ? 0 : 1;
            setTimeout(setUpTurn, 2000);
        } else {
            gameData.score[gameData.index] += gameData.rollSum;
            actionArea.innerHTML = '<button id="rollagain">Roll Again</button><button id="pass">Pass</button>';
            document.getElementById("rollagain").addEventListener("click", throwDice);
            document.getElementById("pass").addEventListener("click", function () {
                gameData.index = gameData.index ? 0 : 1;
                setUpTurn();
            });
        }

        checkWinningCondition();
    }

    function checkWinningCondition() {
        if (gameData.score[gameData.index] >= gameData.gameEnd) {
            score.innerHTML = `<h2>${gameData.players[gameData.index]} wins with ${gameData.score[gameData.index]} points!</h2>`;
            actionArea.innerHTML = "";
            document.querySelector("#quit").innerHTML = "Start New Game";
        } else {
            score.innerHTML = `<p>${gameData.players[0]}: ${gameData.score[0]} <br> ${gameData.players[1]}: ${gameData.score[1]}</p>`;
        }
    }
})();
