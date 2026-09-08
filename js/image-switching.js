const themeLinks = document.querySelectorAll('.theme-link');
        const bgLayers = document.querySelectorAll('.theme-bg-layer');
        const defaultBg = document.getElementById('bg-default');

        themeLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                const targetId = link.getAttribute('data-bg');
                bgLayers.forEach(bg => bg.classList.remove('opacity-100'));
                document.getElementById(targetId).classList.add('opacity-100');
            });

            link.addEventListener('mouseleave', () => {
                bgLayers.forEach(bg => bg.classList.remove('opacity-100'));
                defaultBg.classList.add('opacity-100');
            });
        });