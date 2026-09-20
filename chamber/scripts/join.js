const timestamp = document.querySelector("#timestamp");

if (timestamp) {
	timestamp.value = new Date().toISOString();
}

const infoButtons = document.querySelectorAll("[data-dialog]");

infoButtons.forEach((button) => {
	button.addEventListener("click", () => {
		const dialog = document.querySelector(`#${button.dataset.dialog}`);
		dialog?.showModal();
	});
});

const closeButtons = document.querySelectorAll(".dialog-close");

closeButtons.forEach((button) => {
	button.addEventListener("click", () => {
		button.closest("dialog")?.close();
	});
});

document.querySelectorAll("dialog").forEach((dialog) => {
	dialog.addEventListener("click", (event) => {
		if (event.target === dialog) {
			dialog.close();
		}
	});
});
