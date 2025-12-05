document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("image-modal");
  const modalImage = document.getElementById("modal-image");
  const closeModal = document.querySelector(".modal .close");

  const showModal = (img) => {
    if (!modal || !modalImage) return;
    modal.style.display = "block";
    modalImage.src = img.src;
  };

  const hideModal = () => {
    if (!modal) return;
    modal.style.display = "none";
  };

  if (closeModal) {
    closeModal.addEventListener("click", hideModal);
  }

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) hideModal();
    });
  }

  const setupCarousel = (carousel) => {
    const track = carousel.querySelector(".carousel-images");
    const prevBtn = carousel.querySelector(".carousel-btn.prev");
    const nextBtn = carousel.querySelector(".carousel-btn.next");
    if (!track) return;

    // Normalize children so every slide has a wrapper and caption slot.
    const rawChildren = Array.from(track.children);
    const slides = rawChildren.map((child) => {
      if (child.tagName === "IMG") {
        const slide = document.createElement("figure");
        slide.className = "carousel-slide";

        const captionText =
          child.dataset.caption || child.getAttribute("alt") || "";

        slide.appendChild(child);

        if (captionText) {
          const caption = document.createElement("figcaption");
          caption.className = "caption";
          caption.textContent = captionText;
          slide.appendChild(caption);
        }

        return slide;
      }

      child.classList.add("carousel-slide");
      const img = child.querySelector("img");
      const captionText =
        child.dataset.caption ||
        (img ? img.dataset.caption : "") ||
        (img ? img.getAttribute("alt") : "");

      let caption = child.querySelector(".caption");
      if (!caption && captionText) {
        caption = document.createElement("figcaption");
        caption.className = "caption";
        caption.textContent = captionText;
        child.appendChild(caption);
      }

      return child;
    });

    track.innerHTML = "";
    slides.forEach((slide) => track.appendChild(slide));

    let currentIndex = 0;
    let autoTimer = null;

    const goToSlide = (index) => {
      if (!slides.length) return;
      currentIndex = (index + slides.length) % slides.length;
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
    };

    const startAuto = () => {
      if (autoTimer || !slides.length) return;
      autoTimer = setInterval(() => goToSlide(currentIndex + 1), 5000);
    };

    const stopAuto = () => {
      if (!autoTimer) return;
      clearInterval(autoTimer);
      autoTimer = null;
    };

    nextBtn?.addEventListener("click", () => {
      stopAuto();
      goToSlide(currentIndex + 1);
      startAuto();
    });

    prevBtn?.addEventListener("click", () => {
      stopAuto();
      goToSlide(currentIndex - 1);
      startAuto();
    });

    carousel.addEventListener("mouseenter", stopAuto);
    carousel.addEventListener("mouseleave", startAuto);

    slides.forEach((slide) => {
      const img = slide.querySelector("img");
      if (!img) return;
      img.addEventListener("click", () => showModal(img));
    });

    goToSlide(0);
    startAuto();
  };

  document.querySelectorAll(".carousel").forEach(setupCarousel);
});
