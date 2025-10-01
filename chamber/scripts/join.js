// Set timestamp on page load
document.addEventListener('DOMContentLoaded', () => {
  const timestamp = new Date().toISOString();
  document.getElementById('timestamp').value = timestamp;
});

// Modal functionality
document.addEventListener('DOMContentLoaded', () => {
  // Open modals
  document.querySelectorAll('.card-link').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const modalId = this.closest('.card').getAttribute('data-modal');
      document.getElementById(modalId).style.display = 'block';
    });
  });

  // Close modals
  document.querySelectorAll('.close').forEach(closeBtn => {
    closeBtn.addEventListener('click', function() {
      this.closest('.modal').style.display = 'none';
    });
  });

  // Close modal if clicked outside
  window.addEventListener('click', function(event) {
    document.querySelectorAll('.modal').forEach(modal => {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    });
  });
});