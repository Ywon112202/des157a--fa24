(function () {
    "use strict";
    console.log("Reading JS");

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
        closeButton.style.display = 'none';  // Initially hidden
        modal.appendChild(closeButton);

        images.forEach(image => {
            image.addEventListener('click', function() {
                modal.style.display = 'flex'; // Center modal
                modalContent.src = image.src;
                const descriptionText = image.closest('.image-container').querySelector('.description').textContent;
                modalDescription.textContent = descriptionText; // Display description in modal
                closeButton.style.display = 'block';  // Show the 'X' button when modal is open
            });
        });

        closeButton.addEventListener('click', function() {
            modal.style.display = 'none';
            closeButton.style.display = 'none';  // Hide the 'X' button when closing the modal
        });

        // Close modal when clicking outside the image
        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
                closeButton.style.display = 'none';  // Hide 'X' when clicking outside the modal
            }
        });
    });
})();





