const menuButton = document.querySelector("#menu-button");
const primaryNavigation = document.querySelector("#primary-navigation");

const themeToggle = document.querySelector("#theme-toggle");

/* Mobile navigation */

menuButton?.addEventListener("click", () => {
	const isOpen = primaryNavigation.classList.toggle("open");

	menuButton.setAttribute("aria-expanded", String(isOpen));

	menuButton.setAttribute(
		"aria-label",
		isOpen ? "Close navigation menu" : "Open navigation menu",
	);

	menuButton.textContent = isOpen ? "✕" : "☰";
});

/* Dark mode */

themeToggle?.addEventListener("click", () => {
	const darkMode = document.body.classList.toggle("dark");

	themeToggle.setAttribute("aria-pressed", String(darkMode));

	themeToggle.setAttribute(
		"aria-label",
		darkMode ? "Switch to light mode" : "Switch to dark mode",
	);
});
