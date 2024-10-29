// Start of the JavaScript file with an IIFE (Immediately Invoked Function Expression)
(function () {
    "use strict";
    console.log("reading js");

    // Capture user input values from the HTML
    const adjNoun = document.getElementById('adjNoun');
    const verb = document.getElementById('verb');
    const noun1 = document.getElementById('noun1');
    const adjNoun2 = document.getElementById('adjNoun2');
    const food = document.getElementById('food');
    const noun2 = document.getElementById('noun2');

    // Select the form and add an event listener for submission
    const form = document.querySelector('form');
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevents the default form submission behavior

        // Process form data here
        const story = `Once upon a time, in a distant land, there was a ${adjNoun.value} who loved ${verb.value}. One day, it decided to go on an adventure to the ${noun1.value}. Along the way, the ${adjNoun2.value} became very hungry and decided to stop for some ${food.value}. It was the best meal it had ever had! After that, the ${noun1.value} continued its journey, happily ${verb.value} all the way to ${noun2.value}. What a fun day for the ${adjNoun2.value}!`;

        // Output the story to the console or to the page
        console.log(story);
        alert(story); // Alternatively, display the story on the page or in an alert
    });

})();
