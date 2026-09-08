/**
 * Activates an accordion card by ID or falls back to the first available card.
 * @param {number|string} id - The ID number of the card to activate (e.g., 1 for "card-1")
 */
function activateCard(id) {
  // 1. Remove "active" class from all cards
  document.querySelectorAll(".accordion-card").forEach((card) => {
    card.classList.remove("active");
  });

  // 2. Safely find target card by ID, or fall back to the first card on the page
  const targetCard =
    document.getElementById("card-" + id) ||
    document.querySelector(".accordion-card");

  // 3. Add active class safely using optional chaining
  targetCard?.classList.add("active");
}

/**
 * Triggers card activation on hover for desktop/pointer devices only.
 * @param {number|string} id - The ID of the hovered card.
 */
function handleHover(id) {
  if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    activateCard(id);
  }
}

// Ensure the DOM is fully loaded before setting initial active card
document.addEventListener("DOMContentLoaded", () => {
  activateCard(1);
});