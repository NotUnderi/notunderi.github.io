document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.querySelector(".carousel");
  const carouselImages = document.querySelector(".carousel-images");
  const images = document.querySelectorAll(".carousel-images img");
  const prevBtn = document.querySelector(".carousel-btn.prev");
  const nextBtn = document.querySelector(".carousel-btn.next");

  let currentIndex = 0;

  const updateCarousel = () => {
    const currentImage = images[currentIndex];
    const width = currentImage.clientWidth;

    // Update the transform to show the current image
    carouselImages.style.transform = `translateX(-${currentIndex * width}px)`;

    // Dynamically adjust the height of the carousel to match the current image
    carousel.style.height = `${currentImage.clientHeight}px`;
  };

  const showNextImage = () => {
    currentIndex = (currentIndex + 1) % images.length;
    updateCarousel();
  };

  const showPrevImage = () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateCarousel();
  };

  // Event listeners for buttons
  nextBtn.addEventListener("click", showNextImage);
  prevBtn.addEventListener("click", showPrevImage);

  // Adjust carousel on window resize
  window.addEventListener("resize", updateCarousel);

  // Initialize the carousel size on page load
  updateCarousel();
  setInterval(() => {showNextImage();  }, 5000); // Auto-slide every 5 seconds
  // Modal functionality
  const modal = document.getElementById("image-modal");
  const modalImage = document.getElementById("modal-image");
  const closeModal = document.querySelector(".modal .close");

  images.forEach((image) => {
    image.addEventListener("click", () => {
      modal.style.display = "block";
      modalImage.src = image.src; // Set the modal image source to the clicked image
    });
  });

  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Close modal when clicking outside the image
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
});