document.addEventListener('DOMContentLoaded', () => {

  /* ===============================
     MENU MOBILE
  =============================== */
  const menuToggle = document.querySelector('.menu-toggle');
  const navbar = document.querySelector('.navbar');
  const isIphone = /iPhone|iPad|iPod/i.test(navigator.userAgent);

  if (menuToggle && navbar) {
    menuToggle.addEventListener('click', () => {
      navbar.classList.toggle('menu-open');
    });
  }

  /* ===============================
     HERO CAROUSEL
  =============================== */
  const slides = document.querySelectorAll('.hero-slide');
  const controls = document.querySelectorAll('.hero-control');

  let current = 0;
  const interval = 8000;
  let timer;

  function playVideoSafely(video) {
    if (video.readyState >= 3) {
      video.currentTime = 0;
      video.play().catch(() => {});
    } else {
      video.addEventListener(
        'loadeddata',
        () => {
          video.currentTime = 0;
          video.play().catch(() => {});
        },
        { once: true }
      );
    }
  }

  function showSlide(index) {
    slides.forEach((slide, i) => {
      const video = slide.querySelector('video');

      if (i === index) {
        slide.classList.add('active');
        playVideoSafely(video);
      } else {
        slide.classList.remove('active');
        video.pause();
        video.currentTime = 0;
      }
    });

    controls.forEach((btn, i) => {
      btn.classList.toggle('active', i === index);
    });

    current = index;
  }

  function startAuto() {
    timer = setInterval(() => {
      const next = (current + 1) % slides.length;
      showSlide(next);
    }, interval);
  }

  function resetAuto() {
    clearInterval(timer);
    startAuto();
  }

  controls.forEach(btn => {
    btn.addEventListener('click', () => {
      const index = Number(btn.dataset.slide);
      showSlide(index);
      resetAuto();
    });
  });

  if (slides.length) {
    showSlide(current);
    startAuto();
  }
});



