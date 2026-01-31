// StacksX402 - Interactive Functionality

// Filter services by category
const filterButtons = document.querySelectorAll('.filter-btn');
const serviceCards = document.querySelectorAll('.service-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        const category = button.dataset.category;
        
        serviceCards.forEach(card => {
            if (category === 'all' || card.dataset.category === category) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.5s ease-out';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Form submission — fixed ID + short alert
const submitForm = document.getElementById('submit-form');

if (submitForm) {
    submitForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert("Thanks. We'll review your service soon.");
        submitForm.reset();
    });
}

// Smooth scroll for navigation
document.querySelectorAll('a ').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Update service count dynamically
function updateServiceCount() {
    const realServices = document.querySelectorAll('.service-card:not(.placeholder)');
    const countElement = document.getElementById('serviceCount');
    if (countElement) {
        countElement.textContent = realServices.length;
    }
}
updateServiceCount();

// Add animation on scroll
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeIn 0.6s ease-out';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Active nav based on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section ');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.pageYOffset >= sectionTop) {
            current = section.id;
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Console easter egg
console.log(
  '%c🟧 StacksX402 %cThe x402 Directory for Stacks %cSubmit service: ' + window.location.origin + '#submit %cBuilt with 🟧',
  'background: linear-gradient(135deg, #5546FF 0%, #FC6432 100%); color: white; font-size: 20px; font-weight: bold; padding: 10px;',
  '',
  'color: #5546FF; font-size: 14px;',
  ''
);
