const membersContainer = document.querySelector("#members");

const gridButton = document.querySelector("#grid-button");

const listButton = document.querySelector("#list-button");

/* ------------------------------
   Get JSON Data
------------------------------ */

async function getMembers() {
  try {
    const response = await fetch("data/members.json");

    if (!response.ok) {
      throw new Error(`Unable to load member data: ${response.status}`);
    }

    const members = await response.json();

    displayMembers(members);
  } catch (error) {
    console.error(error);

    membersContainer.innerHTML = `
            <p class="error-message">
                The member directory could not be loaded.
                Please try again later.
            </p>
        `;
  }
}

/* ------------------------------
   Membership Level
------------------------------ */

function membershipLabel(level) {
  const labels = {
    1: "Member",

    2: "Silver Member",

    3: "Gold Member",
  };

  return labels[level] ?? "Member";
}

/* ------------------------------
   Display Members
------------------------------ */

function displayMembers(members) {
  membersContainer.innerHTML = members
    .map(
      (member) => `

            <article class="member-card">

                <img
                    class="member-image"
                    src="images/${member.image}"
                    alt="${member.name} business image"
                    width="640"
                    height="400"
                    loading="lazy"
                >

                <div class="member-content">

                    <h3>
                        ${member.name}
                    </h3>

                    <p class="tagline">
                        ${member.tagline}
                    </p>

                    <div class="member-details">

                        <span>
                            <strong>Address:</strong>
                            ${member.address}
                        </span>

                        <span>
                            <strong>Phone:</strong>

                            <a
                                href="tel:${member.phone.replaceAll(" ", "")}"
                            >
                                ${member.phone}
                            </a>
                        </span>

                        <span>
                            <strong>URL:</strong>

                            <a
                                href="${member.website}"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                ${member.website.replace("https://", "")}
                            </a>
                        </span>

                    </div>

                    <p class="member-description">
                        ${member.description}
                    </p>

                    <span class="membership">
                        ${membershipLabel(member.membershipLevel)}
                    </span>

                </div>

            </article>

        `,
    )
    .join("");
}

/* ------------------------------
   Change View
------------------------------ */

function setView(view) {
  const isList = view === "list";

  membersContainer.classList.toggle("list-view", isList);

  membersContainer.classList.toggle("member-grid", !isList);

  gridButton.classList.toggle("active", !isList);

  listButton.classList.toggle("active", isList);

  gridButton.setAttribute("aria-pressed", String(!isList));

  listButton.setAttribute("aria-pressed", String(isList));
}

/* ------------------------------
   Button Events
------------------------------ */

gridButton.addEventListener("click", () => setView("grid"));

listButton.addEventListener("click", () => setView("list"));

/* ------------------------------
   Start Application
------------------------------ */

getMembers();
