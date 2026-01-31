// Dark Mode Logic
const setupDarkMode = () => {
    const themeToggleButton = document.getElementById('theme-toggle');
    const sunIcon = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');

    // Check for saved theme in localStorage
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        document.documentElement.classList.add('dark');
        moonIcon?.classList.add('hidden');
        sunIcon?.classList.remove('hidden');
    } else {
        document.documentElement.classList.remove('dark');
        sunIcon?.classList.add('hidden');
        moonIcon?.classList.remove('hidden');
    }

    themeToggleButton?.addEventListener('click', () => {
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
            moonIcon?.classList.remove('hidden');
            sunIcon?.classList.add('hidden');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            sunIcon?.classList.remove('hidden');
            moonIcon?.classList.add('hidden');
        }
    });
};

// Mobile Menu Toggle
const setupMobileMenu = () => {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuClose = document.getElementById('mobile-menu-close');

    mobileMenuBtn?.addEventListener('click', () => {
        mobileMenu?.classList.remove('-translate-x-full');
    });

    mobileMenuClose?.addEventListener('click', () => {
        mobileMenu?.classList.add('-translate-x-full');
    });

    // Close on click outside or link click
    mobileMenu?.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            mobileMenu?.classList.add('-translate-x-full');
        }
    });
};

// Active Navigation Highlight
const setupActiveLinks = () => {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath.split('/').pop() || (currentPath === '/' && link.getAttribute('href') === 'index.html')) {
            link.classList.add('active-nav-link');
        }
    });
};

document.addEventListener('DOMContentLoaded', () => {
    setupDarkMode();
    setupMobileMenu();
    setupActiveLinks();
});
