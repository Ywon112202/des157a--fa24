(function () {
    "use strict";
    console.log("reading js");

    window.addEventListener('load', function () {
        // Slider setup
        const sliderContent = document.querySelector('.a');
        if (!sliderContent) {
            console.error("Element '.a' not found.");
            return;
        }

        const sliderWidth = sliderContent.scrollWidth;
        const cloned = sliderContent.cloneNode(true);
        cloned.className = "b";
        document.querySelector('.slider').appendChild(cloned);

        document.documentElement.style.setProperty('--sliderwidth', `-${sliderWidth}px`);
        document.querySelector('.slider').classList.add("animate");

        // Popup effect for images
        const imageContainers = document.querySelectorAll('.image-container');
        
        imageContainers.forEach(function(container) {
            container.addEventListener('mouseover', function() {
                const description = container.querySelector('.description');
                description.style.display = 'block';
            });
            container.addEventListener('mouseout', function() {
                const description = container.querySelector('.description');
                description.style.display = 'none';
            });
        });
    });

})();


