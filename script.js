let currentSlide = 0;
const slides = document.querySelectorAll(".slide");

// Add hover effect for benefit cards
const benefitCards = document.querySelectorAll(".benefit-card");
benefitCards.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-5px)";
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0)";
  });
});
const totalSlides = slides.length;
const slideNumber = document.querySelector(".slide-number");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

function updateSlide() {
  slides.forEach((slide) => {
    slide.classList.remove("active");
    // Reset opacity for transition
    slide.style.opacity = "0";
  });

  // Add active class and fade in
  slides[currentSlide].classList.add("active");
  setTimeout(() => {
    slides[currentSlide].style.opacity = "1";
  }, 50);

  slideNumber.textContent = `${currentSlide + 1} / ${totalSlides}`;

  // Update button states
  prevBtn.disabled = currentSlide === 0;
  nextBtn.disabled = currentSlide === totalSlides - 1;
}

function nextSlide() {
  if (currentSlide < totalSlides - 1) {
    currentSlide++;
    updateSlide();
  }
}

function prevSlide() {
  if (currentSlide > 0) {
    currentSlide--;
    updateSlide();
  }
}

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") nextSlide();
  if (e.key === "ArrowLeft") prevSlide();
});

// Touch navigation
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener("touchstart", (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  const swipeThreshold = 50; // minimum distance for swipe
  const swipeDistance = touchEndX - touchStartX;

  if (Math.abs(swipeDistance) > swipeThreshold) {
    if (swipeDistance > 0) {
      prevSlide(); // Swipe right
    } else {
      nextSlide(); // Swipe left
    }
  }
}

// Initialize
updateSlide();
