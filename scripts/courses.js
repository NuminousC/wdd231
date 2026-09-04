const courses = [
    {
        subject: "CSE",
        number: 110,
        title: "Introduction to Programming",
        credits: 2,
        completed: false
    },
    {
        subject: "WDD",
        number: 130,
        title: "Web Fundamentals",
        credits: 2,
        completed: true
    },
    {
        subject: "CSE",
        number: 111,
        title: "Programming with Functions",
        credits: 2,
        completed: false
    },
    {
        subject: "CSE",
        number: 210,
        title: "Programming with Classes",
        credits: 2,
        completed: false
    },
    {
        subject: "WDD",
        number: 131,
        title: "Dynamic Web Fundamentals",
        credits: 2,
        completed: true
    },
    {
        subject: "WDD",
        number: 231,
        title: "Web Frontend Development I",
        credits: 2,
        completed: false
    }
];

const courseList = document.querySelector("#course-list");
const creditTotal = document.querySelector("#credit-total");
const filterButtons = document.querySelectorAll(".filter-button");

function displayCourses(courseArray) {
    if (!courseList || !creditTotal) {
        return;
    }

    courseList.innerHTML = "";

    courseArray.forEach((course) => {
        const card = document.createElement("article");
        card.classList.add("course-card");

        if (course.completed) {
            card.classList.add("completed");
        }

        const name = document.createElement("div");
        name.textContent = `${course.subject} ${course.number}`;

        const title = document.createElement("span");
        title.classList.add("course-status");
        title.textContent = course.completed
            ? `${course.title} • Completed`
            : course.title;

        card.append(name, title);
        courseList.appendChild(card);
    });

    const totalCredits = courseArray.reduce(
        (total, course) => total + course.credits,
        0
    );

    creditTotal.textContent =
        `Total credits for courses listed above: ${totalCredits}`;
}

function filterCourses(filter) {
    if (filter === "all") {
        return courses;
    }

    return courses.filter((course) => course.subject === filter);
}

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        filterButtons.forEach((item) => item.classList.remove("active-filter"));
        button.classList.add("active-filter");

        const filter = button.dataset.filter;
        displayCourses(filterCourses(filter));
    });
});

displayCourses(courses);
