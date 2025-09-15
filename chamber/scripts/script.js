async function loadMembers() {
  try {
    const response = await fetch('data/members.json');
    const members = await response.json();

    const container = document.getElementById('members-container');
    const gridView = document.getElementById('grid-view');
    const listView = document.getElementById('list-view');

    let currentView = 'grid';

    function renderMembers(view) {
      container.innerHTML = '';
      currentView = view;

      if (view === 'list') {
        container.classList.add('list-view');
      } else {
        container.classList.remove('list-view');
      }

      members.forEach(member => {
        const card = document.createElement('div');
        card.className = 'member-card';

        
        const imgContainer = document.createElement('div');
        imgContainer.className = 'img-container';

        const img = document.createElement('img');
        img.src = member.image || 'images/fallback.jpg';
        img.alt = member.name;

        imgContainer.appendChild(img);
        card.appendChild(imgContainer);

        // MEMBER INFO
        const info = document.createElement('div');
        info.className = 'member-info';

        const name = document.createElement('h3');
        name.textContent = member.name;

        const tagline = document.createElement('p');
        tagline.className = 'tagline';
        tagline.textContent = member.tagline;

        const ul = document.createElement('ul');

        if (member.phone) {
          const phoneLi = document.createElement('li');
          phoneLi.innerHTML = `<strong>PHONE:</strong> ${member.phone}`;
          ul.appendChild(phoneLi);
        }

        if (member.website) {
          const urlLi = document.createElement('li');
          urlLi.innerHTML = `<strong>URL:</strong> <a href="${member.website}" target="_blank">${member.website}</a>`;
          ul.appendChild(urlLi);
        }

        info.appendChild(name);
        info.appendChild(tagline);
        info.appendChild(ul);

        card.appendChild(info);
        container.appendChild(card);
      });
    }

    gridView.addEventListener('click', () => {
      renderMembers('grid');
      gridView.classList.add('active');
      listView.classList.remove('active');
    });

    listView.addEventListener('click', () => {
      renderMembers('list');
      listView.classList.add('active');
      gridView.classList.remove('active');
    });

    renderMembers('grid');

  } catch (error) {
    console.error("Error loading members:", error);
    document.getElementById('members-container').innerHTML = '<p>Error loading members.</p>';
  }
}

// Theme toggle
document.getElementById('theme-toggle').addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

// Footer: copyright year and last modified date
document.getElementById('year').textContent = new Date().getFullYear();

const lastModified = new Date(document.lastModified);
const month = lastModified.getMonth() + 1;     // 0–11 → 1–12
const day = lastModified.getDate();
const year = lastModified.getFullYear();
const hours = lastModified.getHours();         // 0–23 (24-hour)
const minutes = lastModified.getMinutes().toString().padStart(2, '0'); // Ensures "5" → "05"

document.getElementById('last-modified').textContent = `${month}/${day}/${year} ${hours}:${minutes}`;

// Initialize
loadMembers();