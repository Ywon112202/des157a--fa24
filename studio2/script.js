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

            container.addEventListener('click', function() {
                const img = container.querySelector('.image');
                const modal = document.getElementById('modal');
                const modalImg = document.getElementById('modalImage');
                const caption = document.getElementById('caption');
                
                modal.style.display = 'block';
                modalImg.src = img.src;
                caption.innerHTML = container.querySelector('.description').innerHTML;
            });
        });


        const closeBtn = document.querySelector('.close');
        closeBtn.addEventListener('click', function() {
            const modal = document.getElementById('modal');
            modal.style.display = 'none';
        });
    });
})();




