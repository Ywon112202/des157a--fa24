(function () {
    "use strict";
    console.log("reading js");

    window.addEventListener('load', function () {
        const sliderContent = document.querySelector('.a');
        const sliderWidth = sliderContent.scrollWidth;
    
        // Clone the image set and append it for looping
        const cloned = sliderContent.cloneNode(true);
        cloned.className = "b";
        document.querySelector('.slider').appendChild(cloned);
    
        // Set CSS variable for scroll distance
        document.documentElement.style.setProperty('--sliderwidth', `-${sliderWidth}px`);
    
        // Add animation class to start the slide
        document.querySelector('.slider').classList.add("animate");
    });
    


})();