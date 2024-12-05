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

        document.querySelector(".slider").classList.add("animate");

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
