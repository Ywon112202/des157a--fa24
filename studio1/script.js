(function () {
    "use strict";
    console.log("reading js");

    // Elements for opening and closing overlay
    const openBtn = document.querySelector('.open');
    const closeBtn = document.querySelector('.close');
    const overlay = document.getElementById('overlay');

    // Form elements
    const adjNoun = document.getElementById('adjNoun');
    const verb = document.getElementById('verb');
    const noun1 = document.getElementById('noun1');
    const adjNoun2 = document.getElementById('adjNoun2');
    const food = document.getElementById('food');
    const noun2 = document.getElementById('noun2');
    const storyOutput = document.getElementById('storyOutput');

    // Open overlay
    openBtn.addEventListener('click', function(event) {
        event.preventDefault();
        overlay.classList.add('visible');
    });

    // Close overlay
    closeBtn.addEventListener('click', function() {
        overlay.classList.remove('visible');
    });

    // Form submission
    const form = document.querySelector('form');
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        // Generate story
        const story = `Once upon a time, in a distant land, there was a ${adjNoun.value} who loved ${verb.value}. One day, it decided to go on an adventure to the ${noun1.value}. Along the way, the ${adjNoun2.value} became very hungry and decided to stop for some ${food.value}. It was the best meal it had ever had! After that, the ${noun1.value} continued its journey, happily ${verb.value} all the way to ${noun2.value}. What a fun day for the ${adjNoun2.value}!`;

        // Display story in the storyOutput paragraph
        storyOutput.textContent = story;

        // Close the overlay after submission
        overlay.classList.remove('visible');
    });
})();
