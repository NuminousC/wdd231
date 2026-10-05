import { isFavorite, toggleFavorite } from "./storage.js";

const dialog = document.querySelector("#term-dialog");
const closeButton = document.querySelector("#dialog-close");
const category = document.querySelector("#dialog-category");
const title = document.querySelector("#dialog-title");
const difficulty = document.querySelector("#dialog-difficulty");
const definition = document.querySelector("#dialog-definition-text");
const example = document.querySelector("#dialog-example-text");
const favorite = document.querySelector("#dialog-favorite");

let active = null;
let opener = null;

export function openTermDialog(term) {
  if (!dialog) return;

  active = term;
  opener = document.activeElement;

  category.textContent = term.category;
  title.textContent = term.term;
  difficulty.textContent = term.difficulty;
  definition.textContent = term.definition;
  example.textContent = term.example;

  update();

  if (typeof dialog.showModal === "function") {
    dialog.showModal();
  }
}

function update() {
  const saved = isFavorite(active.id);

  favorite.textContent = saved
    ? "★ Remove from favorites"
    : "☆ Save to favorites";

  favorite.setAttribute("aria-pressed", String(saved));
}

favorite?.addEventListener("click", () => {
  toggleFavorite(active.id);
  update();
});

closeButton?.addEventListener("click", () => dialog.close());

dialog?.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});

// Return keyboard focus to whatever opened the dialog, for every close path
// (close button, backdrop click, or the browser's own Escape handling).
dialog?.addEventListener("close", () => {
  opener?.focus();
});
