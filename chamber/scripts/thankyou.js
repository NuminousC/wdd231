const params = new URLSearchParams(window.location.search);

const submittedFields = {
	"submitted-first-name": params.get("firstName"),
	"submitted-last-name": params.get("lastName"),
	"submitted-email": params.get("email"),
	"submitted-phone": params.get("phone"),
	"submitted-organization": params.get("organization"),
	"submitted-timestamp": params.get("timestamp"),
};

Object.entries(submittedFields).forEach(([id, value]) => {
	const element = document.querySelector(`#${id}`);

	if (element && value) {
		element.textContent = value;
	}
});
