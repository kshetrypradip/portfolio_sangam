document.addEventListener('DOMContentLoaded', function() {
    initializeThemeToggle();
    initializeSkillBars();
    initializeNavigation();
    initializeAnimations();
});

function initializeThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;

    if (!themeToggle) {
        console.error('Theme toggle button not found!');
        return;
    }

    Object.assign(themeToggle.style, {
        outline: 'none',
        border: 'none',
        background: 'none',
        cursor: 'pointer',
        webkitTapHighlightColor: 'transparent',
        webkitUserSelect: 'none',
        userSelect: 'none'
    });

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.add(savedTheme);
        updateThemeIcon(body, themeToggle);
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark');
        const isDark = body.classList.contains('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        updateThemeIcon(body, themeToggle);
    });
}

function updateThemeIcon(body, themeToggle) {
    themeToggle.innerHTML = body.classList.contains('dark') ? '☀️' : '🌙';
}

function initializeNavigation() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

function initializeSkillBars() {
    const skillBars = document.querySelectorAll('.skill-level');
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-level') || '0%';
        gsap.to(bar, {
            width: width,
            duration: 1.5,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: bar,
                start: 'top 90%'
            }
        });
    });
}

function initializeAnimations() {
    gsap.utils.toArray('section').forEach(section => {
        gsap.from(section.querySelectorAll('.academic-card, .project-card, .research-card, .testimonial-card, .about-content, .contact-form'), {
            y: 30,
            opacity: 0,
            duration: 1,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: section,
                start: 'top 90%'
            }
        });
    });

    gsap.from('.hero-content', {
        scale: 0.9,
        opacity: 0,
        duration: 1.2,
        ease: 'elastic.out(1, 0.5)'
    });
}