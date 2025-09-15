// Declare constants
const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';
const cards = document.querySelector('#cards');

// Async function to get prophet data
async function getProphetData() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // console.table(data.prophets); // For checking data - commented out
        displayProphets(data.prophets);
    } catch (error) {
        console.error('Could not fetch the data:', error);
        cards.innerHTML = `<div class="error">Failed to load prophet data. Please try again later.</div>`;
    }
}

// Function to display prophets
const displayProphets = (prophets) => {
    // Clear loading message
    cards.innerHTML = '';

    prophets.forEach((prophet) => {
        // Create elements
        const card = document.createElement('section');
        card.classList.add('card');

        const fullName = document.createElement('h2');
        const portrait = document.createElement('img');

        const birthDate = document.createElement('p');
        const birthPlace = document.createElement('p');
        birthPlace.classList.add('birthplace');

        const cardContent = document.createElement('div');
        cardContent.classList.add('card-content');

        // Populate elements with data
        fullName.textContent = `${prophet.name} ${prophet.lastname}`;

        portrait.setAttribute('src', prophet.imageurl);
        portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname} - ${prophet.order}° Latter-day President`);
        portrait.setAttribute('loading', 'lazy');
        portrait.setAttribute('width', '340');
        portrait.setAttribute('height', '440');

        birthDate.textContent = `Date of Birth: ${prophet.birthdate}`;
        birthPlace.textContent = `Place of Birth: ${prophet.birthplace}`;

        // Build card structure
        cardContent.appendChild(fullName);
        cardContent.appendChild(birthDate);
        cardContent.appendChild(birthPlace);

        card.appendChild(portrait);
        card.appendChild(cardContent);

        // Add card to the DOM
        cards.appendChild(card);
    });
};

// Call the function to get data
getProphetData();