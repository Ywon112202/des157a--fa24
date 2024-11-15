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
        document.documentElement.style.setProperty('--sliderwidth', `${sliderWidth}px`);

  
        const cloned = sliderContent.cloneNode(true);
        cloned.className = "b"; 
        document.querySelector('.slider').appendChild(cloned);


        document.querySelector('.slider').classList.add("animate");


        const modal = document.querySelector('.modal');
        const modalContent = document.querySelector('.modal-content');
        const modalDescription = document.querySelector('.modal-description');

        const closeButton = document.createElement('button');
        closeButton.classList.add('close');
        closeButton.textContent = 'X';
        modal.appendChild(closeButton);


        const images = document.querySelectorAll('.image-container .image');
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
