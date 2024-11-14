(function () {
    "use strict";
    console.log("Reading JS");

    window.addEventListener('load', function () {
        const sliderContent = document.querySelector('.a');
        const slider = document.querySelector('.slider');

        // Clone the slider content
        const cloned = sliderContent.cloneNode(true);
        cloned.classList.add("b");
        slider.appendChild(cloned);

        // Get the width of the slider content for animation
        const sliderWidth = sliderContent.offsetWidth;
        document.documentElement.style.setProperty('--slider-width', `${-sliderWidth}px`);

        // Add the animation class
        slider.classList.add("animate");
    });

})();
