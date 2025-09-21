async function loadSpotlights() {
  try {
    const response = await fetch('data/members.json');
    if (!response.ok) throw new Error(`Failed to load members: ${response.status}`);

    const members = await response.json();

    // ✅ FILTER ONLY GOLD (3) AND SILVER (2)
    const goldSilver = members.filter(member => member.membershipLevel >= 2);

    if (goldSilver.length === 0) {
      throw new Error("No Gold or Silver members found in data/members.json");
    }

    // ✅ RANDOMLY SELECT 2 OR 3
    const count = Math.floor(Math.random() * 2) + 2; // 2 or 3
    const spotlights = [];
    const available = [...goldSilver]; 

    while (spotlights.length < count && available.length > 0) {
      const randomIndex = Math.floor(Math.random() * available.length);
      spotlights.push(available[randomIndex]);
      available.splice(randomIndex, 1);
    }

    
    const container = document.getElementById('spotlights-container');
    if (!container) {
      throw new Error("❌ Element with ID 'spotlights-container' not found in DOM");
    }

    container.innerHTML = '';

   
    spotlights.forEach(member => {
      const card = document.createElement('div');
      card.className = 'member-card';

      const img = document.createElement('img');
      img.src = member.image || 'images/fallback.jpg';
      img.alt = member.name;
      img.onerror = () => { img.src = 'images/fallback.jpg'; }; 

      const info = document.createElement('div');
      info.className = 'member-info';

      const name = document.createElement('h3');
      name.textContent = member.name;

      const tagline = document.createElement('p');
      tagline.className = 'tagline';
      tagline.textContent = member.tagline;

      const ul = document.createElement('ul');

      if (member.phone) {
        const li = document.createElement('li');
        li.innerHTML = `<strong>PHONE:</strong> ${member.phone}`;
        ul.appendChild(li);
      }

      if (member.website) {
        const li = document.createElement('li');
        li.innerHTML = `<strong>URL:</strong> <a href="${member.website}" target="_blank">${member.website}</a>`;
        ul.appendChild(li);
      }

      info.appendChild(name);
      info.appendChild(tagline);
      info.appendChild(ul);

      card.appendChild(img);
      card.appendChild(info);
      container.appendChild(card);
    });

    console.log(`✅ Loaded ${spotlights.length} spotlight members:`, spotlights.map(m => m.name));

  } catch (error) {
    console.error("❌ Spotlights failed:", error.message);
    const container = document.getElementById('spotlights-container');
    if (container) {
      container.innerHTML = `<p style="color: red; font-weight: bold;">Error loading spotlights: ${error.message}</p>`;
    }
  }
}


loadSpotlights();