// Update year automatically
document.getElementById('year').textContent = new Date().getFullYear();

// Search handler: Filter cards based on selected service
function performSearch() {
  const service = document.getElementById('service').value || '';
  const cards = document.querySelectorAll('.card');

  // Scroll to services section
  document.getElementById('services').scrollIntoView({ behavior: 'smooth' });

  // Show only the card matching the selected service
  cards.forEach(card => {
    if (service === '' || card.getAttribute('data-service') === service) {
      card.classList.remove('hidden');
      card.classList.add('visible');
    } else {
      card.classList.add('hidden');
      card.classList.remove('visible');
    }
  });

  // If no service selected, show all cards
  if (service === '') {
    cards.forEach((card, index) => {
      card.classList.remove('hidden');
      card.classList.add('visible');
      card.style.setProperty('--index', index);
    });
  }
}

// Intersection Observer for fade-in animations on scroll
document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  // Observe section head and cards
  document.querySelector('.section-head').classList.add('animate-on-scroll');
  observer.observe(document.querySelector('.section-head'));

  const cards = document.querySelectorAll('.card');
  cards.forEach((card, index) => {
    card.style.setProperty('--index', index);
    card.classList.add('animate-on-scroll');
    observer.observe(card);
  });
});