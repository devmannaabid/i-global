document.addEventListener('DOMContentLoaded', () => {
  // Replace '.scroll-btn-selector' with your actual button ID or class (e.g. '#scrollTopBtn')
  const scrollBtn = document.querySelector('.scroll-btn-selector');

  if (!scrollBtn) return; // Prevents crash if the element is missing on the current page

  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      scrollBtn.classList.remove('d-none');
    } else {
      scrollBtn.classList.add('d-none');
    }
  });
});