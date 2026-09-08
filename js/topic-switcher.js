const section = document.getElementById('topicSection'),
      title = document.getElementById('sectionTitle'),
      bg = ['bg-tech','bg-economic','bg-geopolitics','bg-politics','bg-climate','bg-public'];

document.querySelectorAll('[data-bs-toggle="tab"]').forEach(tab =>
    tab.addEventListener('shown.bs.tab', () => {
        section.classList.remove(...bg);
        section.classList.add(tab.dataset.bg);
        title.textContent = tab.dataset.title;
    })
);