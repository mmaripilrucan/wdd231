async function loadWeather() {
 
  const apiKey = 'd98efd3e01b1f6f6d4173c2b170063c7';
  const city = 'Mar del Plata';
  const units = 'metric';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=${units}&appid=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data = await response.json();

    
    const weatherBox = document.querySelector('.weather-box');
    if (!weatherBox) throw new Error('❌ .weather-box not found');

    const tempEl = weatherBox.querySelector('.temp');
    const descEl = weatherBox.querySelector('.desc');
    const detailsEl = weatherBox.querySelector('.details');

    if (!tempEl || !descEl || !detailsEl) throw new Error('❌ Missing weather elements');

    const temp = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const high = Math.round(data.main.temp_max);
    const low = Math.round(data.main.temp_min);
    const humidity = data.main.humidity;
    const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });
    const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });

    tempEl.textContent = `${temp}°C`;
    descEl.textContent = description.charAt(0).toUpperCase() + description.slice(1);

    const detailPs = detailsEl.querySelectorAll('p');
    detailPs[0].textContent = `High: ${high}°C`;
    detailPs[1].textContent = `Low: ${low}°C`;
    detailPs[2].textContent = `Humidity: ${humidity}%`;
    detailPs[3].textContent = `Sunrise: ${sunrise}`;
    detailPs[4].textContent = `Sunset: ${sunset}`;

    
    const forecast = [24, 23, 22];
    const forecastBox = document.querySelector('.forecast-box');
    if (forecastBox) {
      forecastBox.innerHTML = '';
      forecast.forEach((t, i) => {
        const day = ['Today', 'Wednesday', 'Thursday'][i];
        const p = document.createElement('p');
        p.textContent = `${day}: ${t}°C`;
        forecastBox.appendChild(p);
      });
    }

  } catch (error) {
    console.error("❌ Weather failed:", error.message);
    const weatherBox = document.querySelector('.weather-box');
    if (weatherBox) {
      weatherBox.querySelector('.temp').textContent = "Error";
      weatherBox.querySelector('.desc').textContent = "No se pudo cargar el clima";
      const forecastBox = document.querySelector('.forecast-box');
      if (forecastBox) forecastBox.innerHTML = '<p>Error al cargar la previsión.</p>';
    }
  }
}


loadWeather();