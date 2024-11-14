
window.addEventListener('load', function () {
    'use strict';
    const sliderContent = document.querySelector('.a');

    // Calculate width after images have loaded
    const sliderWidth = sliderContent.scrollWidth;

    // Clone the set of images and assign the class name 'b'
    const cloned = sliderContent.cloneNode(true);
    cloned.className = "b";

    // Append the cloned images to the slider container
    document.querySelector('.slider').appendChild(cloned);

    // Set the end of the left position based on slider width
    document.documentElement.style.setProperty('--sliderwidth', `-${sliderWidth}px`);

    // Add the animate class to start the slider animation
    document.querySelector('.slider').classList.add("animate");
});

