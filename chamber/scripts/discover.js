// Visitor message using localStorage
document.addEventListener('DOMContentLoaded', () => {
  const lastVisit = localStorage.getItem('lastVisit');
  const now = Date.now();
  let message = '';

  if (!lastVisit) {
    message = 'Welcome! Do you have any questions?';
  } else {
    const daysSinceLastVisit = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
    if (daysSinceLastVisit === 0) {
      message = 'Back so soon! Great!';
    } else if (daysSinceLastVisit === 1) {
      message = 'You visited 1 day ago';
    } else {
      message = `You visited ${daysSinceLastVisit} days ago.`;
    }
  }

  localStorage.setItem('lastVisit', now);

  const messageEl = document.getElementById('visit-message');
  messageEl.textContent = message;
  messageEl.classList.add('visit-message');
});