(function () {
    "use strict";
    console.log("reading js");

    window.addEventListener('load', function () {
        const slider = document.querySelector('.slider');
        const sliderContent = document.querySelector('.a');
        const sliderWidth = sliderContent.scrollWidth;

        const cloned = sliderContent.cloneNode(true);
        cloned.className = "b";
        slider.appendChild(cloned);

        document.documentElement.style.setProperty('--sliderwidth', `-${sliderWidth}px`);
        slider.classList.add("animate");

        // Mouse scroll functionality
        let scrollPosition = 0;
        window.addEventListener('wheel', function(e) {
            if (e.deltaY > 0) {
                // Scroll down, move the slider to the next image
                scrollPosition += 1;
            } else {
                // Scroll up, move the slider to the previous image
                scrollPosition -= 1;
            }

            // Prevent going out of bounds
            if (scrollPosition < 0) {
                scrollPosition = 0;
            } else if (scrollPosition > sliderContent.children.length - 1) {
                scrollPosition = sliderContent.children.length - 1;
            }

            // Move the slider to the correct position
            sliderContent.style.transform = `translateX(-${scrollPosition * 100}%)`;
        });

        // Popup effect for images on hover
        const imageContainers = document.querySelectorAll('.image-container');
        
        imageContainers.forEach(function(container) {
            const image = container.querySelector('.image');
            const description = container.querySelector('.description');

            // Hover effect to show the description
            container.addEventListener('mouseover', function() {
                description.style.display = 'block';  // Show description
            });

            // Hover effect to hide the description
            container.addEventListener('mouseout', function() {
                description.style.display = 'none';  // Hide description
            });

            // Click event to display the description dynamically in a modal
            image.addEventListener('click', function() {
                const modal = document.getElementById('modal');
                const modalImage = document.getElementById('modalImage');
                const caption = document.getElementById('caption');
                
                modal.style.display = 'block';
                modalImage.src = image.src;
                caption.innerText = description.textContent;  // Display the description in the modal
            });
        });

        // Close modal when clicking the 'X'
        const closeModal = document.querySelector('.close');
        closeModal.addEventListener('click', function() {
            const modal = document.getElementById('modal');
            modal.style.display = 'none';  // Hide modal on close
        });
    });

})();



