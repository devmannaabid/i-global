document.addEventListener('DOMContentLoaded', () => {
  const stickyHeader = document.getElementById('stickyHeader');
  const topHeader = document.querySelector('.top-header') || document.querySelector('header:first-of-type');
  
  // Target the page's first section to determine initial theme
  const firstSection = document.querySelector('main section:first-of-type') || document.querySelector('section:first-of-type');

  if (stickyHeader) {
    let lastScroll = 0;
    const threshold = 10;

    // Detect theme attribute from the first section ('light' or 'dark')
    // Defaults to 'theme-dark' (white text) if no attribute is found
    const sectionTheme = firstSection?.getAttribute('data-header-theme')?.trim().toLowerCase();
    const initialThemeClass = sectionTheme === 'light' ? 'theme-light' : 'theme-dark';

    function handleScroll() {
      const currentScroll = window.scrollY || document.documentElement.scrollTop;

      // 1. At top of page: Apply transparent state + initial section theme class
      if (currentScroll <= 10) {
        if (topHeader && topHeader !== stickyHeader) {
          stickyHeader.style.top = topHeader.offsetHeight + 'px';
        } else {
          stickyHeader.style.top = '0px';
        }

        stickyHeader.classList.add('transparent-header', initialThemeClass);
        stickyHeader.classList.remove('scrolled', 'header-hidden');
        lastScroll = currentScroll;
        return;
      }

      // 2. Scrolled state: Lock to top and switch to standard solid light styling
      stickyHeader.style.top = '0px';
      stickyHeader.classList.remove('transparent-header', 'theme-light', 'theme-dark');
      stickyHeader.classList.add('scrolled');

      // 3. Scroll threshold check
      if (Math.abs(currentScroll - lastScroll) < threshold) return;

      // 4. Show / Hide header based on scroll direction
      if (currentScroll > lastScroll && currentScroll > 80) {
        stickyHeader.classList.add('header-hidden');
      } else if (currentScroll < lastScroll) {
        stickyHeader.classList.remove('header-hidden');
      }

      lastScroll = currentScroll;
    }

    // Attach listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    
    // Initial calculation on page load
    handleScroll();
  }
});