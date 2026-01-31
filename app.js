// StacksX402 - Interactive Functionality

// Filter services by category
const filterButtons = document.querySelectorAll('.filter-btn');
const serviceCards = document.querySelectorAll('.service-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Get selected category
        const category = button.dataset.category;
        
        // Filter services
        serviceCards.forEach(card => {
            if (category === 'all' || card.dataset.category === category || card.dataset.category === 'all') {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.5s ease-out';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Form submission
const submitForm = document.getElementById('submitForm');

if (submitForm) {
    submitForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(submitForm);
        const data = Object.fromEntries(formData);
        
        // Here you would normally send to a backend
        // For now, we'll just show a success message
        
        alert(`Thank you for submitting ${data.serviceName}! 

We've received your submission and will review it within 48 hours.

Submitted Details:
- Service: ${data.serviceName}
- Endpoint: ${data.serviceEndpoint}
- Category: ${data.serviceCategory}
- Cost: ${data.serviceCost}

We'll contact you at ${data.contactEmail} once approved!`);
        
        // Reset form
        submitForm.reset();
        
        // In production, you'd send to a backend like:
        /*
        try {
            const response = await fetch('/api/submit-service', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            
            if (response.ok) {
                alert('Submission successful!');
                submitForm.reset();
            }
        } catch (error) {
            alert('Error submitting. Please try again.');
        }
        */
    });
}

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
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
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeIn 0.6s ease-out';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Add active state to navigation based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
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
console.log(`
%c🟧 StacksX402 %c
%cThe x402 Directory for Stacks%c

Building something cool with x402? 
Submit your service: ${window.location.origin}#submit

Questions? Feedback? 
Let's chat!

Built with 🟧 for the Stacks community.
`, 
'background: linear-gradient(135deg, #5546FF 0%, #FC6432 100%); color: white; font-size: 20px; font-weight: bold; padding: 10px;',
'',
'color: #5546FF; font-size: 14px;',
''
);
