// Load Footer
async function loadFooter() {
    try {
        const response = await fetch('footer.html');
        const footerHTML = await response.text();
        document.body.insertAdjacentHTML('beforeend', footerHTML);
        
        // Update year after footer is loaded
        const yearElement = document.getElementById('year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    } catch (error) {
        console.error('Error loading footer:', error);
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
        images.forEach(src => {
            const img = document.createElement('img');
            img.src = src;
            img.alt = title + ' image';
            galleryImagesContainer.appendChild(img);
        });
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

// Language Toggle
let currentLang = 'en';

function toggleLanguage() {
    const langElements = document.querySelectorAll('[data-lang-en]');
    const body = document.body;
    const langButton = document.querySelector('.lang-toggle');
    const currentTitle = document.querySelector('title');
    
    if (currentLang === 'en') {
        langElements.forEach(el => {
            if (el.tagName === 'SELECT') {
                Array.from(el.options).forEach(option => {
                    if (option.getAttribute('data-lang-ar')) {
                        option.text = option.getAttribute('data-lang-ar');
                    }
                });
            } else if (el.getAttribute('data-lang-ar')) {
                el.innerHTML = el.getAttribute('data-lang-ar');
            }
        });
        body.classList.add('rtl');
        currentLang = 'ar';
        if (currentTitle && currentTitle.getAttribute('data-lang-ar')) {
            currentTitle.innerHTML = currentTitle.getAttribute('data-lang-ar');
        }
        if (langButton) {
            langButton.innerText = 'AR / EN';
        }
    } else {
        langElements.forEach(el => {
            if (el.tagName === 'SELECT') {
                Array.from(el.options).forEach(option => {
                    if (option.getAttribute('data-lang-en')) {
                        option.text = option.getAttribute('data-lang-en');
                    }
                });
            } else if (el.getAttribute('data-lang-en')) {
                el.innerHTML = el.getAttribute('data-lang-en');
            }
        });
        body.classList.remove('rtl');
        currentLang = 'en';
        if (currentTitle && currentTitle.getAttribute('data-lang-en')) {
            currentTitle.innerHTML = currentTitle.getAttribute('data-lang-en');
        }
        if (langButton) {
            langButton.innerText = 'EN / AR';
        }
    }
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
    if (navLinks) {
        navLinks.classList.toggle('active');
    }
}

// Intersection Observer for fade-in animations on scroll
document.addEventListener('DOMContentLoaded', async () => {
    // Load footer first
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

    const sectionHead = document.querySelector('.section-head');
    if (sectionHead) {
        observer.observe(sectionHead);
    }

    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
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