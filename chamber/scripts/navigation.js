// Theme toggle
document.getElementById('theme-toggle').addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

// Footer: copyright year and last modified date
document.getElementById('year').textContent = new Date().getFullYear();

const lastModified = new Date(document.lastModified);
const month = lastModified.getMonth() + 1;
const day = lastModified.getDate();
const year = lastModified.getFullYear();
const hours = lastModified.getHours();
const minutes = lastModified.getMinutes().toString().padStart(2, '0');

document.getElementById('last-modified').textContent = `${month}/${day}/${year} ${hours}:${minutes}`;