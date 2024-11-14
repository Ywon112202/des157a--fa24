(function () {
    "use strict";
    console.log("Reading JS");

    window.addEventListener('load', function () {
        // Slider setup
        const sliderContent = document.querySelector('.slider');
        const images = Array.from(document.querySelectorAll('.image-container'));

        // Adjust slider width based on image count
        const sliderWidth = images.length * 700 + (images.length - 1) * 10; // Adjust as per image width + margin
        sliderContent.style.width = `${sliderWidth}px`;

        // Add animation class if needed
        sliderContent.classList.add("animate");

        // Popup effect for images
        images.forEach(container => {
            container.addEventListener('mouseover', function() {
                const description = container.querySelector('.description');
                description.style.display = 'block';
            });
            container.addEventListener('mouseout', function() {
                const description = container.querySelector('.description');
                description.style.display = 'none';
            });
        });

        // Modal setup
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

        images.forEach(imageContainer => {
            const image = imageContainer.querySelector('.image');
            image.addEventListener('click', function() {
                modal.style.display = 'flex'; // Center modal
                modalContent.src = image.src;
                const descriptionText = imageContainer.querySelector('.description').textContent;
                modalDescription.textContent = descriptionText;
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






