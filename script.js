// Modal Functions

function openModal(title, message) {

  const modalTitle = document.getElementById('modal-title');

  const modalMessage = document.getElementById('modal-message');

  const modal = document.getElementById('modal');



  if (modalTitle && modalMessage && modal) {

    modalTitle.innerText = title;

    modalMessage.innerText = message;

    modal.style.display = 'block';

  }

}



function closeModal() {

  const modal = document.getElementById('modal');

  if (modal) {

    modal.style.display = 'none';

  }

}



// Close modal when clicking outside of it

window.onclick = function(event) {

  const modal = document.getElementById('modal');

  if (modal && event.target == modal) {

    closeModal();

  }

}



// Language Toggle

let currentLang = 'en';



function toggleLanguage() {

  const langElements = document.querySelectorAll('[data-lang-en]');

  const body = document.body;

  const logoText = document.querySelector('.brand .title');

  const langButton = document.querySelector('.lang-toggle');

  

  if (currentLang === 'en') {

    langElements.forEach(el => {

      if (el.tagName === 'SELECT') {

        Array.from(el.options).forEach(option => {

          if (option.getAttribute('data-lang-ar')) {

            option.text = option.getAttribute('data-lang-ar');

          }

        });

      } else {

        el.innerHTML = el.getAttribute('data-lang-ar');

      }

    });

    body.classList.add('rtl');

    currentLang = 'ar';

    document.title = document.querySelector('title').getAttribute('data-lang-ar');

    langButton.innerText = 'AR / EN';

  } else {

    langElements.forEach(el => {

      if (el.tagName === 'SELECT') {

        Array.from(el.options).forEach(option => {

          if (option.getAttribute('data-lang-en')) {

            option.text = option.getAttribute('data-lang-en');

          }

        });

      } else {

        el.innerHTML = el.getAttribute('data-lang-en');

      }

    });

    body.classList.remove('rtl');

    currentLang = 'en';

    document.title = document.querySelector('title').getAttribute('data-lang-en');

    langButton.innerText = 'EN / AR';

  }

}



// Update year automatically

document.getElementById('year').textContent = new Date().getFullYear();



// Search handler: Filter cards based on selected service

function performSearch() {

  const service = document.getElementById('service').value || '';

  const cards = document.querySelectorAll('.card');



  // Scroll to services section

  document.getElementById('services').scrollIntoView({ behavior: 'smooth' });



  cards.forEach((card, index) => {

    if (service === '' || card.getAttribute('data-service') === service) {

      card.classList.remove('hidden');

      card.style.setProperty('--index', index);

    } else {

      card.classList.add('hidden');

    }

  });

}



// Reset search

function resetSearch() {

  document.getElementById('location').value = '';

  document.getElementById('service').value = '';

  const cards = document.querySelectorAll('.card');

  cards.forEach((card, index) => {

    card.classList.remove('hidden');

    card.style.setProperty('--index', index);

  });

}



// Toggle menu for mobile

function toggleMenu() {

  const navLinks = document.querySelector('.nav-links');

  navLinks.classList.toggle('active');

}



// Intersection Observer for fade-in animations on scroll

document.addEventListener('DOMContentLoaded', () => {

  const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        entry.target.classList.add('visible');

        observer.unobserve(entry.target); // Stop observing after it becomes visible

      }

    });

  }, { threshold: 0.1 });



  // Observe section head and cards

  const sectionHead = document.querySelector('.section-head');

  if (sectionHead) {

    observer.observe(sectionHead);

  }



  const cards = document.querySelectorAll('.card');

  cards.forEach((card, index) => {

    card.style.setProperty('--index', index);

    observer.observe(card);

  });

  

  // Add scroll event listener for navbar background

  window.addEventListener('scroll', () => {

    const header = document.querySelector('header');

    if (window.scrollY > 50) {

      header.classList.add('scrolled');

    } else {

      header.classList.remove('scrolled');

    }

  });

});