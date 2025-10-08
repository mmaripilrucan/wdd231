import { blogData, toolData, testimonialData } from './data.js';
import { saveToStorage, getFromStorage, renderStars, lazyLoadImages } from './utils.js';

// ========== DOM ELEMENTS ==========
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
const modal = document.getElementById('consultation-modal');
const openModalBtn = document.getElementById('open-modal');
const closeModalBtn = document.querySelector('.close-modal');
const blogContainer = document.getElementById('blog-container');
const toolsContainer = document.getElementById('tools-container');
const testimonialsContainer = document.getElementById('testimonials-container');
const categoryFilter = document.getElementById('category-filter');

// ========== NAVIGATION TOGGLE ==========
if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// ========== MODAL ==========
if (openModalBtn && modal) {
    openModalBtn.addEventListener('click', () => {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // prevent background scroll
    });

    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // restore scroll
    };

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

// ========== FETCH SIMULATION + RENDER BLOGS ==========
const renderBlogs = async () => {
    try {
        // Simulate fetch delay
        await new Promise(r => setTimeout(r, 800));
        const blogs = blogData;

        if (blogContainer) {
            blogContainer.innerHTML = blogs.map(blog => `
                <article class="card fade-in-up">
                    <h3>${blog.title}</h3>
                    <p class="meta">${blog.date} • ${blog.readTime}</p>
                    <p>${blog.excerpt}</p>
                    <a href="#" class="btn">Read More</a>
                </article>
            `).join('');
        }
    } catch (error) {
        console.error("Failed to load blog data:", error);
        if (blogContainer) {
            blogContainer.innerHTML = `<p class="error">Failed to load insights. Please try again later.</p>`;
        }
    }
};

// ========== RENDER TOOLS WITH FILTER ==========
const renderTools = (tools) => {
    if (!toolsContainer) return;

    toolsContainer.innerHTML = tools.length > 0
        ? tools.map(tool => `
            <div class="card fade-in-up">
                <h3>${tool.toolName}</h3>
                <p><strong>Category:</strong> ${tool.category}</p>
                <p><strong>Difficulty:</strong> ${tool.difficultyLevel}</p>
                <p>${tool.description}</p>
                <button class="btn tool-detail" data-id="${tool.id}">Details</button>
            </div>
        `).join('')
        : `<p>No tools found in this category.</p>`;
};

const filterTools = () => {
    const selectedCategory = categoryFilter.value;
    const filtered = selectedCategory === 'all'
        ? toolData
        : toolData.filter(tool => tool.category === selectedCategory);

    renderTools(filtered);
    saveToStorage('lastViewedCategory', selectedCategory);
};

if (categoryFilter) {
    categoryFilter.addEventListener('change', filterTools);

    // On load, restore last filter
    const savedCategory = getFromStorage('lastViewedCategory');
    if (savedCategory) {
        categoryFilter.value = savedCategory;
    }
    filterTools(); // initial render
}

// ========== RENDER TESTIMONIALS ==========
const renderTestimonials = () => {
    if (!testimonialsContainer) return;

    testimonialsContainer.innerHTML = testimonialData.map(testimonial => `
        <div class="card fade-in-up">
            <h3>${testimonial.clientName}</h3>
            <div class="star-rating">${renderStars(testimonial.rating)}</div>
            <p><em>${testimonial.testimonial}</em></p>
            <p><strong>Service:</strong> ${testimonial.serviceUsed}</p>
        </div>
    `).join('');

    // Track views
    const views = (getFromStorage('testimonialViews') || 0) + 1;
    saveToStorage('testimonialViews', views);
};

// ========== INITIALIZE PAGE ==========
document.addEventListener('DOMContentLoaded', () => {
    lazyLoadImages();

    // Page-specific initialization
    if (blogContainer) renderBlogs();
    if (testimonialsContainer) renderTestimonials();

    // Highlight active nav link
    const currentPage = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('nav a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
});

// TEAM PAGE: Fetch and render from JSON
document.addEventListener('DOMContentLoaded', () => {
    const teamContainer = document.getElementById('team-container');
    if (!teamContainer) return;

    fetch('./data/team.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(team => {
            teamContainer.innerHTML = team.map(member => `
                <div class="card fade-in-up">
                    <img src="images/${member.photo}"
                         alt="Photo of ${member.name}"
                         loading="lazy"
                         decoding="async">
                    <h3>${member.name}</h3>
                    <p><strong>${member.title}</strong></p>
                </div>
            `).join('');
        })
        .catch(error => {
            console.error('Team fetch failed:', error);
            teamContainer.innerHTML = `<p style="grid-column:1/-1; text-align:center; color:#e74c3c;">Failed to load team: ${error.message}</p>`;
        });
});

// ========== EMAIL VALIDATION ==========
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.querySelector('form[action="contact-form-action.html"]');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            const emailInput = this.querySelector('input[name="email"]');
            const email = emailInput.value.trim();
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
            let isValid = false;

            // Boolean check: is email valid?
            if (emailPattern.test(email)) {
                isValid = true;
            }

            // If invalid, prevent submission and show message
            if (!isValid) {
                e.preventDefault(); // Stop form from submitting

                // Remove any existing error message
                const existingError = this.querySelector('.error-message');
                if (existingError) existingError.remove();

                // Create and show error
                const errorMsg = document.createElement('p');
                errorMsg.className = 'error-message';
                errorMsg.style.color = 'red';
                errorMsg.style.marginTop = '0.5rem';
                errorMsg.textContent = 'Please enter a valid email address (e.g., name@example.com).';

                emailInput.parentNode.insertBefore(errorMsg, emailInput.nextSibling);

                // Focus the field for accessibility
                emailInput.focus();
            }
        });
    }
});

// Export for potential testing or extension
export { renderBlogs, renderTools, renderTestimonials };