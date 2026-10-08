import { discoverItems } from "../data/discover.mjs";

const gallery = document.querySelector("#discover-gallery");
const visitMessage = document.querySelector("#visit-message");
const dialog = document.querySelector("#discover-dialog");
const dialogTitle = document.querySelector("#discover-dialog-title");
const dialogAddress = document.querySelector("#discover-dialog-address");
const dialogDescription = document.querySelector(
	"#discover-dialog-description",
);
const dialogSource = document.querySelector("#discover-dialog-source");
const dialogClose = document.querySelector("#discover-dialog-close");

function getVisitMessage() {
	const storageKey = "warri-chamber-last-visit";
	const now = Date.now();
	const previousVisit = Number(localStorage.getItem(storageKey));

	if (!previousVisit) {
		localStorage.setItem(storageKey, String(now));
		return "Welcome! Let us know if you have any questions.";
	}

	const millisecondsPerDay = 24 * 60 * 60 * 1000;
	const elapsed = now - previousVisit;
	const days = Math.floor(elapsed / millisecondsPerDay);

	localStorage.setItem(storageKey, String(now));

	if (days < 1) {
		return "Back so soon! Awesome!";
	}

	return `You last visited ${days} ${days === 1 ? "day" : "days"} ago.`;
}

function createCard(item, index) {
	const article = document.createElement("article");
	article.className = `discover-card discover-card--${item.id}`;
	article.dataset.index = index + 1;

	article.innerHTML = `
		<h2>${item.title}</h2>
		<figure>
			<img
				src="images/discover/${item.image}"
				alt="View representing ${item.title} in the Warri area"
				width="300"
				height="200"
				loading="lazy"
				decoding="async"
			>
		</figure>
		<address>${item.address}</address>
		<p>${item.description}</p>
		<button class="discover-more" type="button" data-index="${index}">Learn More</button>
	`;

	return article;
}

function renderCards() {
	const fragment = document.createDocumentFragment();

	discoverItems.forEach((item, index) => {
		fragment.appendChild(createCard(item, index));
	});

	gallery.replaceChildren(fragment);
}

function openDetails(index) {
	const item = discoverItems[index];
	if (!item || !dialog) return;

	dialogTitle.textContent = item.title;
	dialogAddress.textContent = item.address;
	dialogDescription.textContent = item.description;
	dialogSource.textContent = `Source: ${item.source}`;
	dialogSource.href = item.sourceUrl;

	dialog.showModal();
}

gallery.addEventListener("click", (event) => {
	const button = event.target.closest(".discover-more");
	if (!button) return;

	openDetails(Number(button.dataset.index));
});

dialogClose?.addEventListener("click", () => dialog.close());

dialog?.addEventListener("click", (event) => {
	if (event.target === dialog) dialog.close();
});

visitMessage.textContent = getVisitMessage();
renderCards();
