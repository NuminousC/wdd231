import { createTermCard, isFavorite, toggleFavorite } from "./storage.js";
import { openTermDialog } from "./modal.js";
const grid = document.querySelector("#glossary-grid"),
	search = document.querySelector("#glossary-search"),
	cat = document.querySelector("#category-filter"),
	diff = document.querySelector("#difficulty-filter"),
	favToggle = document.querySelector("#favorites-toggle"),
	count = document.querySelector("#result-count");
let terms = [],
	favoritesOnly = false;
async function load() {
	try {
		const r = await fetch("data/glossary.json");
		if (!r.ok) throw new Error(`Request failed: ${r.status}`);
		terms = await r.json();
		populate();
		apply();
	} catch (e) {
		console.error(e);
		grid.innerHTML =
			'<div class="empty-state"><h2>Glossary unavailable</h2><p>We could not load the glossary data. Please refresh the page and try again.</p></div>';
		count.textContent = "The glossary could not be loaded.";
	}
}
function populate() {
	[...new Set(terms.map((x) => x.category))].sort().forEach((c) => {
		const o = document.createElement("option");
		o.value = c;
		o.textContent = c;
		cat.append(o);
	});
}
function apply() {
	const q = search.value.trim().toLowerCase(),
		c = cat.value,
		d = diff.value,
		items = terms.filter(
			(x) =>
				[x.term, x.category, x.difficulty, x.definition, x.example]
					.join(" ")
					.toLowerCase()
					.includes(q) &&
				(c === "all" || x.category === c) &&
				(d === "all" || x.difficulty === d) &&
				(!favoritesOnly || isFavorite(x.id)),
		);
	render(items);
}
function render(items) {
	grid.replaceChildren();
	if (!items.length)
		grid.innerHTML =
			'<div class="empty-state"><h2>No matching terms</h2><p>Try another search or change the filters.</p></div>';
	else {
		const f = document.createDocumentFragment();
		items.forEach((item) =>
			f.append(
				createTermCard(item, {
					onDetails: () => openTermDialog(item),
					onFavorite: () => {
						toggleFavorite(item.id);
						apply();
					},
				}),
			),
		);
		grid.append(f);
	}
	count.textContent = `${items.length} of ${terms.length} terms shown`;
}
search.addEventListener("input", apply);
cat.addEventListener("change", apply);
diff.addEventListener("change", apply);
favToggle.addEventListener("click", () => {
	favoritesOnly = !favoritesOnly;
	favToggle.setAttribute("aria-pressed", String(favoritesOnly));
	favToggle.textContent = favoritesOnly
		? "★ Favorites only"
		: "☆ Favorites only";
	apply();
});
const p = new URLSearchParams(location.search),
	q = p.get("q");
if (q) search.value = q;
load();
