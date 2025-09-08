// Course data array
const courses = [
    { code: "CSE 110", name: "Introduction to Programming", credits: 2, completed: true },
    { code: "CSE 111", name: "Programming with Functions", credits: 2, completed: true },
    { code: "CSE 210", name: "Programming with Classes", credits: 2, completed: true },
    { code: "WDD 130", name: "Web Fundamentals", credits: 2, completed: true },
    { code: "WDD 131", name: "Dynamic Web Fundamentals", credits: 2, completed: true },
    { code: "WDD 231", name: "Web Frontend Development I", credits: 2, completed: false },
    { code: "WDD 331", name: "Web Frontend Development II", credits: 3, completed: false },
    { code: "WDD 430", name: "Web Full-Stack Development", credits: 3, completed: false },
    { code: "CSE 340", name: "Web Backend Development", credits: 3, completed: false }
];

// Display courses based on filter
document.addEventListener('DOMContentLoaded', function() {
    const courseContainer = document.getElementById('course-cards');
    const totalCreditsElement = document.getElementById('total-credits');
    const filterButtons = document.querySelectorAll('.filter-btn');

    // Function to display courses
    function displayCourses(filter = 'all') {
        // Clear existing courses
        courseContainer.innerHTML = '';

        // Filter courses
        let filteredCourses = courses;
        if (filter !== 'all') {
            filteredCourses = courses.filter(course =>
                course.code.toLowerCase().includes(filter.toLowerCase())
            );
        }

        // Calculate total credits
        const totalCredits = filteredCourses.reduce((total, course) => total + course.credits, 0);
        totalCreditsElement.textContent = totalCredits;

        // Display courses
        filteredCourses.forEach(course => {
            const courseCard = document.createElement('div');
            courseCard.classList.add('course-card');
            if (course.completed) {
                courseCard.classList.add('completed');
            }

            courseCard.innerHTML = `
                <div class="course-code">${course.code}</div>
                <div class="course-name">${course.name}</div>
                <div class="course-credits">${course.credits} credits</div>
            `;

            courseContainer.appendChild(courseCard);
        });
    }

    // Initial display
    displayCourses();

    // Add event listeners to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));

            // Add active class to clicked button
            this.classList.add('active');

            // Display filtered courses
            const filter = this.getAttribute('data-filter');
            displayCourses(filter);
        });
    });
});