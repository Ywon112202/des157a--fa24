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

        // Image click to show in modal
        const images = document.querySelectorAll('.image-container .image');
        const modal = document.createElement('div');
        modal.classList.add('modal');
        document.body.appendChild(modal);

        const modalContent = document.createElement('img');
        modalContent.classList.add('modal-content');
        modal.appendChild(modalContent);

        const modalDescription = document.createElement('div');
        modalDescription.classList.add('modal-content-description');
        modal.appendChild(modalDescription);

        const closeButton = document.createElement('button');
        closeButton.classList.add('close');
        closeButton.textContent = 'X';
        modal.appendChild(closeButton);

        images.forEach(image => {
            image.addEventListener('click', function() {
                modal.style.display = 'block';
                modalContent.src = image.src;
                const descriptionText = image.closest('.image-container').querySelector('.description').textContent;
                modalDescription.textContent = descriptionText;
            });
        });

        closeButton.addEventListener('click', function() {
            modal.style.display = 'none';
        });

        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    });
})();









