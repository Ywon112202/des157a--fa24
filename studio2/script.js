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
    
        const cloned = sliderContent.cloneNode(true);
        cloned.className = "b";
        document.querySelector('.slider').appendChild(cloned);
    
        document.documentElement.style.setProperty('--sliderwidth', `-${sliderWidth}px`);
        document.querySelector('.slider').classList.add("animate");
    });
    

})();