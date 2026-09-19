import "./weather.js";

const spotlightContainer = document.querySelector("#spotlights");

async function getMembers() {
	try {
		const response = await fetch("data/members.json");

		if (!response.ok) {
			throw new Error(`Member data request failed: ${response.status}`);
		}

		const members = await response.json();

		displaySpotlights(members);
	} catch (error) {
		console.error("Spotlight error:", error);

		spotlightContainer.innerHTML = `
            <p class="error-message">
                Member spotlights could not be loaded.
            </p>
        `;
	}
}

function getEligibleMembers(members) {
	return members.filter(
		(member) => member.membershipLevel === 2 || member.membershipLevel === 3,
	);
}

function getRandomMembers(members, number) {
	const shuffled = [...members].sort(() => Math.random() - 0.5);

	return shuffled.slice(0, number);
}

function membershipLabel(level) {
	const labels = {
		2: "Silver Member",
		3: "Gold Member",
	};

	return labels[level] ?? "Member";
}

function displaySpotlights(members) {
	const eligibleMembers = getEligibleMembers(members);

	const numberToDisplay = Math.min(3, Math.max(2, eligibleMembers.length));

	const selectedMembers = getRandomMembers(eligibleMembers, numberToDisplay);

	spotlightContainer.innerHTML = selectedMembers
		.map(
			(member) => `
            <article class="spotlight-card">

                <img
                    class="spotlight-logo"
                    src="images/${member.image}"
                    alt="${member.name} logo"
                    width="100"
                    height="100"
                    loading="lazy"
                >

                <div class="spotlight-content">

                    <h3>
                        ${member.name}
                    </h3>

                    <p>
                        ${member.address}
                    </p>

                    <p>
                        <strong>Phone:</strong>
                        <a href="tel:${member.phone.replace(/\s/g, "")}">
                            ${member.phone}
                        </a>
                    </p>

                    <p>
                        <strong>Website:</strong>
                        <a
                            href="${member.website}"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Visit website
                        </a>
                    </p>

                    <span class="spotlight-membership">
                        ${membershipLabel(member.membershipLevel)}
                    </span>

                </div>

            </article>
        `,
		)
		.join("");
}

getMembers();
