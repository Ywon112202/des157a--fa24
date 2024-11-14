(function () {
    "use strict";
    console.log("Reading JavaScript file");

    window.addEventListener('load', function () {
        const sliderContent = document.querySelector('.a');
        if (!sliderContent) {
            console.error("Slider content not found");
            return;
        }

        const sliderWidth = sliderContent.offsetWidth;


        const cloned = sliderContent.cloneNode(true);
        cloned.classList.add("b");
        document.querySelector('.slider').appendChild(cloned);


        const root = document.documentElement;
        const endLeftPos = `-${sliderWidth}px`;
        root.style.setProperty('--sliderwidth', endLeftPos);


        document.querySelector('.slider').classList.add("animate");
    });
})();
