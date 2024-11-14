(function () {
    "use strict";
    console.log("reading js");

    window.addEventListener('load', function () {
        const sliderContent = document.querySelector('.a');
        if (!sliderContent) {
            console.error("Element '.a' not found.");
            return;
        }

        const sliderWidth = sliderContent.scrollWidth;
    
        // Clone the slider content for the looping effect
        const cloned = sliderContent.cloneNode(true);
        cloned.className = "b";
        document.querySelector('.slider').appendChild(cloned);

        // Set the necessary width for the slider container
        document.documentElement.style.setProperty('--sliderwidth', `${sliderWidth}px`);

        // Apply animation class to start the slider
        document.querySelector('.slider').classList.add("animate");
    });
})();











