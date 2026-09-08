function getPageName() {
    return new URLSearchParams(location.search).get('page') || 'index';
}

async function loadPage() {
    const page = getPageName();
    const content = document.getElementById('app-content');
    const title = document.getElementById('page-title');

    try {
        const res = await fetch(`components/${page}.html`);
        if (!res.ok) throw new Error();

        content.innerHTML = await res.text();

        if (title) {
            title.textContent = `${page.charAt(0).toUpperCase() + page.slice(1)} - My Website`;
        }

        updateActiveNav(page);

        // --- HERO SLIDER HOOK ---
        if ((page === 'index' || page === 'home' || page === 'index.html') && typeof window.loadHeroSliderData === 'function') {
            window.loadHeroSliderData();
        }

        // --- INSIGHTS PAGE HOOK (Updated to loadPublicationsData) ---
        if ((page === 'insights' || page === 'insights.html') && typeof window.loadPublicationsData === 'function') {
            window.loadPublicationsData();
        }

        // --- EXPERTS PAGE HOOK ---
        if ((page === 'experts' || page === 'experts.html') && typeof window.loadExpertsData === 'function') {
            window.loadExpertsData();
        }

        // --- GALLERY PAGE HOOK ---
        if ((page === 'gallery' || page === 'gallary') && typeof fetchGalleryData === 'function') {
            fetchGalleryData();
        }

        initHeaderTheme();
        initScrollTicker();

    } catch (err) {
        console.error("Page Load Error:", err);
        content.innerHTML = `
            <div class="alert alert-danger text-center my-5">
                <h2>404 - Page Not Found</h2>
                <p>The page you are looking for does not exist.</p>
                <a href="layout.html?page=index" class="btn btn-primary mt-2">
                    Go to Home
                </a>
            </div>`;
    }
}

function updateActiveNav(page) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.toggle(
            'active',
            link.getAttribute('href')?.includes(`page=${page}`)
        );
    });
}

function initHeaderTheme() {
    const stickyHeader = document.getElementById('stickyHeader');
    const topHeader = document.querySelector('.top-header') || document.querySelector('header:first-of-type');
    
    // Query section AFTER HTML is injected into the DOM
    const firstSection = document.querySelector('main section:first-of-type') || document.querySelector('section:first-of-type');

    if (!stickyHeader) return;

    let lastScroll = 0;
    const threshold = 10;

    // Supports 'white', 'light', or 'theme-light'
    const sectionTheme = firstSection?.getAttribute('data-header-theme')?.trim().toLowerCase();
    const isLight = sectionTheme === 'light' || sectionTheme === 'white';
    const initialThemeClass = isLight ? 'theme-light' : 'theme-dark';

    function handleScroll() {
        const currentScroll = window.scrollY || document.documentElement.scrollTop;

        // 1. At top of page: Apply transparent state + section theme class
        if (currentScroll <= 10) {
            stickyHeader.style.top = (topHeader && topHeader !== stickyHeader) 
                ? topHeader.offsetHeight + 'px' 
                : '0px';

            stickyHeader.classList.add('transparent-header', initialThemeClass);
            stickyHeader.classList.remove('scrolled', 'header-hidden', isLight ? 'theme-dark' : 'theme-light');
            lastScroll = currentScroll;
            return;
        }

        // 2. Scrolled state: Lock to top and switch to solid styling
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

    // Remove active listeners across SPA route changes before binding new references
    if (window._headerScrollHandler) {
        window.removeEventListener('scroll', window._headerScrollHandler);
        window.removeEventListener('resize', window._headerScrollHandler);
    }

    window._headerScrollHandler = handleScroll;

    // Attach listeners
    window.addEventListener('scroll', window._headerScrollHandler, { passive: true });
    window.addEventListener('resize', window._headerScrollHandler);
    
    // Initial calculation
    handleScroll();
}

// Single entry point on initial load
document.addEventListener('DOMContentLoaded', loadPage);