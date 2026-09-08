window.loadExpertsData = async function () {
  try {
    const response = await fetch("data/experts.json");

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const experts = await response.json();

    // Target all section rows
    const sections = document.querySelectorAll(".expert-section");

    sections.forEach((section) => {
      const categoryName = section.getAttribute("data-category");
      // Section-er vitorer template khuja hocche
      const template = section.querySelector(".section-template");

      if (!template) {
        console.error(`Template missing for section category: ${categoryName}`);
        return;
      }

      // Purano dynamic cards clear kora (re-load handle korar jonno)
      section
        .querySelectorAll(".dynamic-card")
        .forEach((card) => card.remove());

      // Section context high-performance fragment creation
      const fragment = document.createDocumentFragment();

      // Filter data for this category
      const categoryData = experts.filter(
        (item) => item.category === categoryName,
      );

      categoryData.forEach((expert) => {
        const clone = template.content.cloneNode(true);
        const col = clone.querySelector(".col");
        if (col) col.classList.add("dynamic-card");

        // Query the anchor wrapper tag inside the clone
        const cardLink = clone.querySelector("a");
        if (cardLink && expert.link) {
          cardLink.href = expert.link;
        }

        const img = clone.querySelector("img");
        const h2 = clone.querySelector("h2");
        const p = clone.querySelector(".card-body .card-text");

        if (img) {
          img.src =
            expert.image && expert.image.trim() !== ""
              ? expert.image
              : "https://via.placeholder.com/600x800";
          img.alt = expert.name || "Expert Image";
        }
        if (h2) h2.textContent = expert.name;
        if (p) p.textContent = expert.role;

        fragment.appendChild(clone);
      });
      // Append cards to section row
      section.appendChild(fragment);
    });
  } catch (error) {
    console.error("Error rendering experts data:", error);
  }
};
