const p = new URLSearchParams(location.search);
for (const [id, key] of [
	["submitted-name", "name"],
	["submitted-email", "email"],
	["submitted-term", "term"],
	["submitted-reason", "reason"],
])
	document.querySelector(`#${id}`).textContent = p.get(key) || "Not provided";
