const menuButton = document.querySelector(".menu-button");
const siteNav = document.querySelector("#site-nav");
const themeToggle = document.querySelector(".theme-toggle");
menuButton?.addEventListener("click", () => {
	const open = siteNav.classList.toggle("open");
	menuButton.setAttribute("aria-expanded", String(open));
});
siteNav?.querySelectorAll("a").forEach((link) =>
	link.addEventListener("click", () => {
		siteNav.classList.remove("open");
		menuButton?.setAttribute("aria-expanded", "false");
	}),
);
if (localStorage.getItem("glossary-theme") === "dark") {
	document.body.classList.add("dark");
	themeToggle?.setAttribute("aria-pressed", "true");
	themeToggle?.setAttribute("aria-label", "Switch to light mode");
}
themeToggle?.addEventListener("click", () => {
	const dark = document.body.classList.toggle("dark");
	localStorage.setItem("glossary-theme", dark ? "dark" : "light");
	themeToggle.setAttribute("aria-pressed", String(dark));
	themeToggle.setAttribute(
		"aria-label",
		dark ? "Switch to light mode" : "Switch to dark mode",
	);
});
const year = document.querySelector("#current-year");
const modified = document.querySelector("#last-modified");
if (year) year.textContent = new Date().getFullYear();
if (modified) {
	const d = new Date(document.lastModified);
	modified.textContent = Number.isNaN(d.getTime())
		? "Unavailable"
		: d.toLocaleDateString();
}
