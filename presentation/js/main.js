// ==========================================
// НАВИГАЦИЯ
// ==========================================

let savedSlide = localStorage.getItem('cu_current_slide');
let currentSlide = savedSlide ? parseInt(savedSlide) : 0;

const slides = document.querySelectorAll('.slide');
const totalSlidesEl = document.getElementById('totalSlide');
const currSlideEl = document.getElementById('currSlide');
const slideCounter = document.querySelector('.slide-counter');
const progressBar = document.querySelector('.progress-bar');

totalSlidesEl.innerText = slides.length < 10 ? '0' + slides.length : slides.length;

function updateCounter() {
  let num = currentSlide + 1;
  currSlideEl.innerText = num < 10 ? '0' + num : num;
}

function updateProgress() {
  if (!progressBar) return;
  const pct = ((currentSlide + 1) / slides.length) * 100;
  progressBar.style.width = pct + '%';
}

function showSlide(index) {
  if (index < 0) index = 0;
  if (index >= slides.length) index = slides.length - 1;

  currentSlide = index;
  localStorage.setItem('cu_current_slide', currentSlide);

  // Hide counter on first and last slides
  if (slideCounter) {
    slideCounter.style.display = (index === 0 || index >= slides.length - 1) ? 'none' : '';
  }

  slides.forEach((slide, i) => {
    slide.classList.remove('active');
    if (i === index) {
      slide.classList.add('active');
      slide.scrollTop = 0;
    }
  });

  updateCounter();
  updateProgress();
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
}

// ==========================================
// KEYBOARD
// ==========================================
document.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    e.preventDefault();
    nextSlide();
  } else if (e.key === 'ArrowRight') {
    nextSlide();
  } else if (e.key === 'ArrowLeft') {
    prevSlide();
  } else if (e.key === 'Home') {
    showSlide(0);
  } else if (e.key === 'End') {
    showSlide(slides.length - 1);
  } else if (e.key === 'f' || e.key === 'F') {
    toggleFullscreen();
  }
});

// ==========================================
// TOUCH / SWIPE
// ==========================================
let touchStartX = 0;

document.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
  const touchEndX = e.changedTouches[0].screenX;
  if (touchEndX < touchStartX - 50) nextSlide();
  if (touchEndX > touchStartX + 50) prevSlide();
});

// ==========================================
// FULLSCREEN
// ==========================================
function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(() => {});
  } else {
    document.exitFullscreen().catch(() => {});
  }
}

// ==========================================
// INIT
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  showSlide(currentSlide);
});
