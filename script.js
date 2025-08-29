// Load Footer
async function loadFooter() {
  const spinner = document.createElement('div');
  spinner.className = 'spinner';
  spinner.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
  document.body.appendChild(spinner);
  try {
    const response = await fetch('footer.html');
    const footerHTML = await response.text();
    document.body.insertAdjacentHTML('beforeend', footerHTML);
    
    applyLanguage();  // Apply language to the newly loaded footer
    
    // Update year after footer is loaded
    const yearElement = document.getElementById('year');
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }
    document.body.removeChild(spinner);
  } catch (error) {
    console.error('Error loading footer:', error);
    document.body.removeChild(spinner);
  }
}

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

// Image Gallery Modal Functions
function showGallery(title, images) {
  const galleryTitle = document.getElementById('gallery-title');
  const galleryImagesContainer = document.getElementById('gallery-images');
  const galleryModal = document.getElementById('galleryModal');
  
  if (galleryModal) {
    galleryTitle.innerText = title;
    galleryImagesContainer.innerHTML = '';
    currentImages = images;
    currentImageIndex = 0;
    const img = document.createElement('img');
    img.src = currentImages[currentImageIndex];
    img.alt = title + ' image';
    galleryImagesContainer.appendChild(img);
    galleryModal.style.display = 'block';
  }
}

function closeGalleryModal() {
  const galleryModal = document.getElementById('galleryModal');
  if (galleryModal) {
    galleryModal.style.display = 'none';
  }
}

// Close modal when clicking outside of it
window.onclick = function(event) {
  const modal = document.getElementById('modal');
  const galleryModal = document.getElementById('galleryModal');
  if (modal && event.target === modal) {
    closeModal();
  }
  if (galleryModal && event.target === galleryModal) {
    closeGalleryModal();
  }
}

// Language Handling
let currentLang = 'en';

function applyLanguage() {
  const langElements = document.querySelectorAll('[data-lang-en]');
  const placeholderElements = document.querySelectorAll('[data-lang-en-placeholder]');
  const body = document.body;
  const currentTitle = document.querySelector('title');
  
  langElements.forEach(el => {
    if (el.tagName === 'SELECT') {
      Array.from(el.options).forEach(option => {
        if (currentLang === 'ar' && option.getAttribute('data-lang-ar')) {
          option.text = option.getAttribute('data-lang-ar');
        } else if (option.getAttribute('data-lang-en')) {
          option.text = option.getAttribute('data-lang-en');
        }
      });
    } else if (el.tagName === 'H1' && el.hasAttribute('data-lang-en') && el.hasAttribute('data-lang-ar')) {
      if (currentLang === 'ar') {
        el.innerHTML = `استمتع بمصر <span class="accent">كالملوك</span>`;
      } else {
        el.innerHTML = `Experience Egypt <span class="accent">Like Royalty</span>`;
      }
    } else if (currentLang === 'ar' && el.getAttribute('data-lang-ar')) {
      el.innerHTML = el.getAttribute('data-lang-ar');
    } else if (el.getAttribute('data-lang-en')) {
      el.innerHTML = el.getAttribute('data-lang-en');
    }
  });

  placeholderElements.forEach(el => {
    if (currentLang === 'ar' && el.getAttribute('data-lang-ar-placeholder')) {
      el.placeholder = el.getAttribute('data-lang-ar-placeholder');
    } else if (el.getAttribute('data-lang-en-placeholder')) {
      el.placeholder = el.getAttribute('data-lang-en-placeholder');
    }
  });

  if (currentLang === 'ar') {
    body.classList.add('rtl');
    if (currentTitle && currentTitle.getAttribute('data-lang-ar')) {
      currentTitle.innerHTML = currentTitle.getAttribute('data-lang-ar');
    }
    window.location.hash = 'ar';
  } else {
    body.classList.remove('rtl');
    if (currentTitle && currentTitle.getAttribute('data-lang-en')) {
      currentTitle.innerHTML = currentTitle.getAttribute('data-lang-en');
    }
    window.location.hash = 'en';
  }
}

function toggleLanguage() {
  const langButton = document.querySelector('.lang-toggle');
  
  if (currentLang === 'en') {
    currentLang = 'ar';
    if (langButton) {
      langButton.innerText = 'AR / EN';
    }
  } else {
    currentLang = 'en';
    if (langButton) {
      langButton.innerText = 'EN / AR';
    }
  }
  applyLanguage();
  localStorage.setItem('lang', currentLang);
}

// Form Validation and WhatsApp Submission
function validateAndSendToWhatsApp(form) {
  const email = form.email.value;
  const phone = form.phone.value;
  // جمع الخدمات المختارة من الـ checkboxes
  const services = Array.from(form.querySelectorAll('input[name="services[]"]:checked')).map(input => 
    currentLang === 'ar' && input.parentElement.getAttribute('data-lang-ar') 
      ? input.parentElement.getAttribute('data-lang-ar') 
      : input.parentElement.getAttribute('data-lang-en') || input.value
  );
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\+?[0-9]{10,15}$/;

  if (!emailRegex.test(email)) {
    openModal(currentLang === 'ar' ? 'خطأ' : 'Error', currentLang === 'ar' ? 'الرجاء إدخال بريد إلكتروني صالح' : 'Please enter a valid email address');
    return;
  }
  if (!phoneRegex.test(phone)) {
    openModal(currentLang === 'ar' ? 'خطأ' : 'Error', currentLang === 'ar' ? 'الرجاء إدخال رقم هاتف صالح' : 'Please enter a valid phone number');
    return;
  }
  if (services.length === 0) {
    openModal(currentLang === 'ar' ? 'خطأ' : 'Error', currentLang === 'ar' ? 'الرجاء اختيار خدمة واحدة على الأقل' : 'Please select at least one service');
    return;
  }

  const message = `
    Booking Request from CrownGate:
    Name: ${form.name.value}
    Phone: ${phone}
    Email: ${email}
    Country: ${form.country.value}
    Services: ${services.join(', ')}
    Arrival: ${form.arrival.value || 'Not specified'}
    Departure: ${form.departure.value || 'Not specified'}
    Details: ${form.details.value || 'None'}
  `;
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/+201004717276?text=${encodedMessage}`;
  window.open(whatsappUrl, '_blank');

  openModal(
    currentLang === 'ar' ? 'تم الإرسال' : 'Submitted',
    currentLang === 'ar' ? 'تم إرسال طلبك! سنتواصل معك عبر واتساب.' : 'Your request has been sent! We will contact you via WhatsApp.'
  );
  form.reset();
}

// Search handler: Filter cards based on selected service
function performSearch() {
  const service = document.getElementById('service')?.value || '';
  const cards = document.querySelectorAll('.card');
  const servicesSection = document.getElementById('services');

  if (servicesSection) {
    servicesSection.scrollIntoView({ behavior: 'smooth' });
  }

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
  const locationSelect = document.getElementById('location');
  const serviceSelect = document.getElementById('service');
  
  if (locationSelect) locationSelect.value = '';
  if (serviceSelect) serviceSelect.value = '';
  
  const cards = document.querySelectorAll('.card');
  cards.forEach((card, index) => {
    card.classList.remove('hidden');
    card.style.setProperty('--index', index);
  });
}

// Toggle menu for mobile
function toggleMenu() {
  const navLinks = document.querySelector('.nav-links');
  const hamburger = document.querySelector('.hamburger');
  if (navLinks && hamburger) {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
    const isExpanded = navLinks.classList.contains('active');
    hamburger.setAttribute('aria-expanded', isExpanded);
    if (isExpanded) {
      document.addEventListener('click', closeMenuOnOutsideClick);
    } else {
      document.removeEventListener('click', closeMenuOnOutsideClick);
    }
  }
}

function closeMenuOnOutsideClick(event) {
  const navLinks = document.querySelector('.nav-links');
  if (!navLinks.contains(event.target) && !event.target.classList.contains('hamburger') && !event.target.closest('.hamburger')) {
    navLinks.classList.remove('active');
    document.querySelector('.hamburger').classList.remove('active');
    document.querySelector('.hamburger').setAttribute('aria-expanded', 'false');
    document.removeEventListener('click', closeMenuOnOutsideClick);
  }
}

// Intersection Observer for fade-in animations on scroll
document.addEventListener('DOMContentLoaded', async () => {
  // Load footer first
  const savedLang = localStorage.getItem('lang');
  if (savedLang) {
    currentLang = savedLang;
    applyLanguage();  // Apply saved language on page load
  }
  await loadFooter();
  
  // Then setup observers and other functionality
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  const sectionHeads = document.querySelectorAll('.section-head');
  sectionHeads.forEach((head, index) => {
    observer.observe(head);
  });

  const cards = document.querySelectorAll('.card');
  cards.forEach((card, index) => {
    card.style.setProperty('--index', index);
    observer.observe(card);
  });

  const carCards = document.querySelectorAll('.car-card');
  carCards.forEach((card, index) => {
    card.style.setProperty('--index', index);
    observer.observe(card);
  });
  
  // Header scroll effect
  window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (header) {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
  });
});

let currentImageIndex = 0;
let currentImages = [];

function showGallery(title, images) {
  const galleryTitle = document.getElementById('gallery-title');
  const galleryImagesContainer = document.getElementById('gallery-images');
  const galleryModal = document.getElementById('galleryModal');
  if (galleryModal) {
    galleryTitle.innerText = title;
    galleryImagesContainer.innerHTML = '';
    currentImages = images;
    currentImageIndex = 0;
    const img = document.createElement('img');
    img.src = currentImages[currentImageIndex];
    img.alt = title + ' image';
    galleryImagesContainer.appendChild(img);
    galleryModal.style.display = 'block';
  }
}

function prevImage() {
  if (currentImageIndex > 0) {
    currentImageIndex--;
    updateGalleryImage();
  }
}

function nextImage() {
  if (currentImageIndex < currentImages.length - 1) {
    currentImageIndex++;
    updateGalleryImage();
  }
}

function updateGalleryImage() {
  const galleryImagesContainer = document.getElementById('gallery-images');
  if (galleryImagesContainer) {
    galleryImagesContainer.innerHTML = '';
    const img = document.createElement('img');
    img.src = currentImages[currentImageIndex];
    img.alt = document.getElementById('gallery-title').innerText + ' image';
    galleryImagesContainer.appendChild(img);
  }
}