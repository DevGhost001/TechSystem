// Theme Toggle
const themeBtn = document.getElementById('theme-btn');
const body = document.body;
const icon = themeBtn.querySelector('i');

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    body.classList.add('light-mode');
    icon.classList.replace('ri-sun-line', 'ri-moon-line');
}

themeBtn.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    if (body.classList.contains('light-mode')) {
        icon.classList.replace('ri-sun-line', 'ri-moon-line');
        localStorage.setItem('theme', 'light');
    } else {
        icon.classList.replace('ri-moon-line', 'ri-sun-line');
        localStorage.setItem('theme', 'dark');
    }
});

// Mobile Menu
const mobileBtn = document.getElementById('mobile-menu-btn');
const navbar = document.querySelector('.navbar');

mobileBtn.addEventListener('click', () => {
    if(navbar.style.display === 'flex') {
        navbar.style.display = 'none';
    } else {
        navbar.style.display = 'flex';
        navbar.style.flexDirection = 'column';
        navbar.style.position = 'absolute';
        navbar.style.top = '100%';
        navbar.style.left = '0';
        navbar.style.width = '100%';
        navbar.style.background = 'var(--bg)';
        navbar.style.padding = '20px';
        navbar.style.borderBottom = '1px solid var(--border)';
    }
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
            observer.unobserve(entry.target);
            
            // Counter animation
            if(entry.target.classList.contains('hero-stats') || entry.target.querySelector('.counter')) {
                const counters = entry.target.querySelectorAll('.counter');
                counters.forEach(counter => {
                    const targetText = counter.innerText;
                    const target = parseInt(targetText);
                    const suffix = targetText.replace(target, '');
                    let count = 0;
                    const increment = target / 50;
                    
                    const updateCount = () => {
                        count += increment;
                        if(count < target) {
                            counter.innerText = Math.ceil(count) + suffix;
                            setTimeout(updateCount, 20);
                        } else {
                            counter.innerText = target + suffix;
                        }
                    }
                    updateCount();
                });
            }
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in-up').forEach(el => {
    el.style.animationPlayState = 'paused';
    observer.observe(el);
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.2)';
    } else {
        header.style.boxShadow = 'none';
    }
});
