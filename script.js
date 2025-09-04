// Console messages for recruiters
console.log("👋 Hello recruiter! You've unlocked Dev Mode.");
console.log("Need a Salesforce wizard? Contact → preetham@example.com");

// Typing animation for hero section
const typingText = document.getElementById('typing-text');
const phrases = [
    "Turning clicks into magic with LWC ⚡",
    "Flow Whisperer 🌊",
    "Apex Ninja 🥷",
    "Cloud Solutions Architect ☁️"
];

let currentPhraseIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;

function typeWriter() {
    const currentPhrase = phrases[currentPhraseIndex];
    
    if (isDeleting) {
        currentCharIndex--;
        typingText.textContent = currentPhrase.substring(0, currentCharIndex);
        
        if (currentCharIndex === 0) {
            isDeleting = false;
            currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
            setTimeout(typeWriter, 500);
            return;
        }
    } else {
        currentCharIndex++;
        typingText.textContent = currentPhrase.substring(0, currentCharIndex);
        
        if (currentCharIndex === currentPhrase.length) {
            isDeleting = true;
            setTimeout(typeWriter, 2000);
            return;
        }
    }
    
    setTimeout(typeWriter, isDeleting ? 50 : 100);
}

// Start typing animation when page loads
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(typeWriter, 1000);
});

// Mobile menu toggle
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.getElementById('nav-menu');

mobileMenu.addEventListener('click', function() {
    mobileMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navbarHeight = document.getElementById('navbar').offsetHeight;
            const targetPosition = target.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.boxShadow = 'none';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 112, 210, 0.1)';
    }
    
    // Hide/show navbar on scroll
    if (currentScroll > lastScroll && currentScroll > navbar.offsetHeight) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

// Theme toggle functionality
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', currentTheme);

// Update icon based on current theme
if (currentTheme === 'dark') {
    themeIcon.classList.replace('fa-moon', 'fa-sun');
}

themeToggle.addEventListener('click', function() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Update icon
    if (newTheme === 'dark') {
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    } else {
        themeIcon.classList.replace('fa-sun', 'fa-moon');
    }

    // Update hero icon glow dynamically
    const glowColor = getGlowColor();
    floatingIcons.forEach(icon => {
        icon.style.boxShadow = `0 0 20px ${glowColor}, 0 0 40px ${glowColor}`;
    });
});

// Custom cursor
const cursor = document.getElementById('cursor');
const cursorDot = document.getElementById('cursor-dot');

// Only enable custom cursor on desktop
if (window.innerWidth > 768) {
    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        cursorDot.style.left = e.clientX + 'px';
        cursorDot.style.top = e.clientY + 'px';
    });

    // Cursor hover effects
    const hoverElements = document.querySelectorAll('a, button, .skill-card, .project-card, .cert-card');
    
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursor.style.borderColor = 'var(--accent-color)';
            cursorDot.style.transform = 'translate(-50%, -50%) scale(2)';
            cursorDot.style.backgroundColor = 'var(--accent-color)';
        });
        
        element.addEventListener('mouseleave', function() {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.borderColor = 'var(--primary-color)';
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorDot.style.backgroundColor = 'var(--primary-color)';
        });
    });
}

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const revealElements = document.querySelectorAll('.skill-card, .project-card, .cert-card, .about-text, .contact-info, .contact-form-container');
    
    revealElements.forEach(element => {
        element.classList.add('reveal');
        observer.observe(element);
    });
});

// Contact form handling
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    if (!name || !email || !message) {
        alert('Please fill in all fields! 📝');
        return;
    }
    
    const submitButton = contactForm.querySelector('.submit-button');
    const originalText = submitButton.textContent;
    
    submitButton.textContent = 'Sending... 📤';
    submitButton.disabled = true;
    
    setTimeout(() => {
        submitButton.textContent = 'Message Sent! ✅';
        contactForm.reset();
        setTimeout(() => {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 2000);
        alert(`Thanks ${name}! Your message has been sent. I'll get back to you soon! 🚀`);
    }, 2000);
});

// Download resume functionality
const downloadResumeButton = document.getElementById('download-resume');
downloadResumeButton.addEventListener('click', function(e) {
    e.preventDefault();
    alert('Resume download would start here! 📄');
    console.log('Resume download requested');
});

// Hero floating icons with glow
function getGlowColor() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    return currentTheme === 'dark' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(59, 130, 246, 0.6)';
}

const floatingIcons = document.querySelectorAll('.floating-icon');
floatingIcons.forEach((icon, index) => {
    icon.classList.add('animate-float'); 
    icon.style.animationDelay = `${index * 1.5}s`;
    icon.style.fontSize = '3rem';
    icon.style.zIndex = '2';
    icon.style.display = 'inline-block';
    icon.style.background = 'rgba(255, 255, 255, 0.2)';
    icon.style.borderRadius = '50%';
    icon.style.padding = '0.5rem';
    icon.style.textShadow = '0 0 10px rgba(0,0,0,0.3), 0 0 5px rgba(0,0,0,0.2)';
    icon.style.boxShadow = `0 0 20px ${getGlowColor()}, 0 0 40px ${getGlowColor()}`;
});

// Hover sparkle effect for skill cards
const skillCards = document.querySelectorAll('.skill-card');
skillCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        const sparkle = document.createElement('div');
        sparkle.innerHTML = '✨';
        sparkle.style.position = 'absolute';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.fontSize = '1.5rem';
        sparkle.style.animation = 'sparkle 1s ease forwards';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '10';
        this.style.position = 'relative';
        this.appendChild(sparkle);
        setTimeout(() => {
            if (sparkle.parentNode) sparkle.remove();
        }, 1000);
    });
});

// Sparkle animation
const style = document.createElement('style');
style.textContent = `
@keyframes sparkle {
    0% { opacity: 0; transform: scale(0) rotate(0deg); }
    50% { opacity: 1; transform: scale(1) rotate(180deg); }
    100% { opacity: 0; transform: scale(0) rotate(360deg); }
}`;
document.head.appendChild(style);

// Easter eggs
let clickCount = 0;
const logo = document.querySelector('.nav-logo');
logo.addEventListener('click', function() {
    clickCount++;
    if (clickCount === 5) {
        alert('🎉 You found an Easter egg!');
        clickCount = 0;
    }
});

// Konami code Easter egg
let konamiCode = [];
const konamiSequence = [
    'ArrowUp','ArrowUp','ArrowDown','ArrowDown',
    'ArrowLeft','ArrowRight','ArrowLeft','ArrowRight',
    'KeyB','KeyA'
];
document.addEventListener('keydown', function(e) {
    konamiCode.push(e.code);
    if (konamiCode.length > konamiSequence.length) konamiCode.shift();
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        document.body.style.animation = 'rainbow 2s ease infinite';
        alert('🌈 KONAMI CODE ACTIVATED!');
        setTimeout(() => { document.body.style.animation = ''; }, 4000);
        konamiCode = [];
    }
});

// Rainbow animation
const rainbowStyle = document.createElement('style');
rainbowStyle.textContent = `
@keyframes rainbow {
    0% { filter: hue-rotate(0deg); }
    25% { filter: hue-rotate(90deg); }
    50% { filter: hue-rotate(180deg); }
    75% { filter: hue-rotate(270deg); }
    100% { filter: hue-rotate(360deg); }
}`;
document.head.appendChild(rainbowStyle);

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        const later = () => { clearTimeout(timeout); func(...args); };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
const debouncedScrollHandler = debounce(function(){}, 10);
window.addEventListener('scroll', debouncedScrollHandler);

// Preload fonts
document.addEventListener('DOMContentLoaded', function() {
    const fontLink = document.createElement('link');
    fontLink.rel = 'preload';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap';
    fontLink.as = 'style';
    document.head.appendChild(fontLink);
    console.log('🚀 Portfolio loaded successfully!');
    console.log('💡 Pro tip: Try the Konami code for a surprise!');
});
