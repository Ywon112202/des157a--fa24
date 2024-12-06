(function () {
    "use strict";
    console.log("reading js");

    window.addEventListener("load", function () {
        // Slider functionality
        const sliderContent = document.querySelector(".a");
        if (!sliderContent) {
            console.error("Element '.a' not found.");
            return;
        }

        const sliderWidth = sliderContent.scrollWidth;
        document.documentElement.style.setProperty("--sliderwidth", `${sliderWidth}px`);

        const cloned = sliderContent.cloneNode(true);
        cloned.className = "b";
        document.querySelector(".slider").appendChild(cloned);

        const sliderElement = document.querySelector(".slider");
        sliderElement.classList.add("animate");

        // Stop and Resume Mechanism
        const stopButton = document.createElement("button");
        stopButton.textContent = "Pause";
        stopButton.classList.add("slider-control");
        document.body.appendChild(stopButton);

        let isPaused = false;

        stopButton.addEventListener("click", function () {
            if (isPaused) {
                sliderElement.classList.add("animate");
                stopButton.textContent = "Pause";
            } else {
                sliderElement.classList.remove("animate");
                stopButton.textContent = "Play";
            }
            isPaused = !isPaused;
        });

        // Modal functionality
        const modal = document.querySelector(".modal");
        const modalContent = document.querySelector(".modal-content");
        const modalDescription = document.querySelector(".modal-description");

        if (!modalContent || !modalDescription) {
            console.error("Modal content or description element not found.");
            return;
        }

        const closeButton = document.createElement("button");
        closeButton.classList.add("close");
        closeButton.textContent = "X";
        modal.appendChild(closeButton);

        const images = document.querySelectorAll(".image-container .image");
        images.forEach((image) => {
            image.addEventListener("click", function () {
                modal.style.display = "flex";
                modal.classList.add("show");

               
                modalContent.src = image.src;

                const descriptionElement = image.closest(".image-container").querySelector(".description");
                modalDescription.textContent = descriptionElement ? descriptionElement.textContent : "No description available.";

       
                modalContent.style.margin = "0 auto";
                modalDescription.style.margin = "10px auto";
                modalDescription.style.textAlign = "center";
            });
        });

        closeButton.addEventListener("click", function () {
            modal.style.display = "none";
            modal.classList.remove("show");
        });

        window.addEventListener("click", function (event) {
            if (event.target === modal) {
                modal.style.display = "none";
                modal.classList.remove("show");
            }
        });
    });
})();
