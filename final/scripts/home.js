import { createTermCard, toggleFavorite } from "./storage.js";

const container = document.querySelector("#featured-terms");

let featuredTerms = [];

function render() {
  container.replaceChildren();

  featuredTerms.forEach((item) => {
    container.append(
      createTermCard(item, {
        onDetails: () => {
          location.href = `glossary.html?q=${encodeURIComponent(item.term)}`;
        },
        onFavorite: () => {
          toggleFavorite(item.id);
          render();
        },
      })
    );
  });
}

async function load() {
  try {
    const response = await fetch("data/glossary.json");

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }

    const terms = await response.json();

    featuredTerms = terms.filter((term) =>
      ["html", "css", "javascript"].includes(term.id)
    );

    render();
  } catch (error) {
    console.error(error);

    container.innerHTML = `
      <div class="empty-state">
        <h2>Featured terms unavailable</h2>
        <p>Please visit the glossary page to try again.</p>
      </div>
    `;
  }
}

load();
