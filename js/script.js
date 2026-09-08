
function initScrollTicker() {
    const r1 = document.getElementById('row1Track');
    const r2 = document.getElementById('row2Track');

    // Exit safely if ticker elements are not present on the current page
    if (!r1 || !r2) return;

    let x1 = -500;
    let x2 = -300;
    let last = window.scrollY;

    const move = (d) => {
        x1 += d * 0.9;
        x2 -= d * 0.9;

        const w1 = r1.scrollWidth / 2;
        const w2 = r2.scrollWidth / 2;

        if (w1 > 0) {
            if (x1 > 0) x1 -= w1;
            if (x1 < -w1) x1 += w1;
        }

        if (w2 > 0) {
            if (x2 > 0) x2 -= w2;
            if (x2 < -w2) x2 += w2;
        }

        r1.style.transform = `translateX(${x1}px)`;
        r2.style.transform = `translateX(${x2}px)`;
    };

    const handleTickerScroll = () => {
        const currentScroll = window.scrollY;
        move(currentScroll - last);
        last = currentScroll;
    };

    // Remove potential existing listener before binding a new one
    window.removeEventListener('scroll', window._tickerScrollHandler);
    window._tickerScrollHandler = handleTickerScroll;

    window.addEventListener('scroll', window._tickerScrollHandler, { passive: true });
    
    // Initial positioning after DOM render
    move(0);
}

/* ==========================================
   2. HERO VIDEO TOGGLE
   ========================================== */
document.addEventListener("click", function (e) {
  const btn = e.target.closest("#videoToggleBtn");
  if (!btn) return;

  const video = document.getElementById("heroVideo");
  const icon = document.getElementById("videoIcon");

  if (video && video.paused) {
    video.play();
    icon?.setAttribute("name", "pause");
  } else if (video) {
    video.pause();
    icon?.setAttribute("name", "play");
  }
});
