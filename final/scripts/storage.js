const KEY = "beginner-glossary-favorites";
export function getFavorites() {
	try {
		return JSON.parse(localStorage.getItem(KEY)) || [];
	} catch (e) {
		console.error(e);
		return [];
	}
}
export function isFavorite(id) {
	return getFavorites().includes(id);
}
export function toggleFavorite(id) {
	const f = getFavorites(),
		i = f.indexOf(id);
	i >= 0 ? f.splice(i, 1) : f.push(id);
	localStorage.setItem(KEY, JSON.stringify(f));
	return f;
}
export function createTermCard(item, { onDetails, onFavorite }) {
	const a = document.createElement("article");
	const fav = isFavorite(item.id);
	a.className = "term-card";
	a.innerHTML = `<div><p class="card-category">${item.category}</p><h3>${item.term}</h3><p>${item.definition}</p></div><p class="badge">${item.difficulty}</p><div class="term-example"><code>${escapeHtml(item.example)}</code></div><div class="card-actions"><button class="details-button" type="button">Learn more</button><button class="favorite-button ${fav ? "is-favorite" : ""}" type="button" aria-pressed="${fav}" aria-label="${fav ? "Remove" : "Save"} ${item.term} ${fav ? "from" : "to"} favorites">${fav ? "★ Saved" : "☆ Save"}</button></div>`;
	a.querySelector(".details-button").addEventListener("click", onDetails);
	a.querySelector(".favorite-button").addEventListener("click", onFavorite);
	return a;
}
function escapeHtml(v) {
	return v
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;")
		.replaceAll('"', "&quot;")
		.replaceAll("'", "&#039;");
}
