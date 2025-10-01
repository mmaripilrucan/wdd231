// Display form data from URL query parameters
document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);

  const fields = [
    'firstName',
    'lastName',
    'email',
    'phone',
    'businessName',
    'timestamp'
  ];

  fields.forEach(field => {
    const value = urlParams.get(field);
    const element = document.getElementById(`display-${field}`);
    if (element && value) {
      element.textContent = value;
    }
  });

  // If timestamp is missing, show current date
  const timestampEl = document.getElementById('display-timestamp');
  if (timestampEl && !timestampEl.textContent) {
    timestampEl.textContent = new Date().toLocaleString('es-AR');
  }
});