// Dark Mode Logic
const setupDarkMode = () => {
    const themeToggleButtons = document.querySelectorAll('.theme-toggle');

    // Check for saved theme in localStorage
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const updateIcons = (isDark) => {
        const sunIcons = document.querySelectorAll('.sun-icon');
        const moonIcons = document.querySelectorAll('.moon-icon');

        if (isDark) {
            document.documentElement.classList.add('dark');
            moonIcons.forEach(icon => icon.classList.add('hidden'));
            sunIcons.forEach(icon => icon.classList.remove('hidden'));
        } else {
            document.documentElement.classList.remove('dark');
            sunIcons.forEach(icon => icon.classList.add('hidden'));
            moonIcons.forEach(icon => icon.classList.remove('hidden'));
        }
    };

    // Initial load
    const isInitialDark = savedTheme === 'dark' || (!savedTheme && systemPrefersDark);
    updateIcons(isInitialDark);

    themeToggleButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const isDark = document.documentElement.classList.contains('dark');
            if (isDark) {
                localStorage.setItem('theme', 'light');
                updateIcons(false);
            } else {
                localStorage.setItem('theme', 'dark');
                updateIcons(true);
            }
        });
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

// Scroll to Top Logic
const setupScrollToTop = () => {
    // Create button
    const scrollBtn = document.createElement('div');
    scrollBtn.id = 'scroll-up';
    scrollBtn.innerHTML = '<i class="ph ph-arrow-up"></i>';
    document.body.appendChild(scrollBtn);

    // Show/hide button on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollBtn.classList.add('show');
        } else {
            scrollBtn.classList.remove('show');
        }
    });

    // Scroll to top on click
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
};

// Blog Category Filtering
const setupBlogFilters = () => {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const blogPosts = document.querySelectorAll('.blog-post');

    if (filterBtns.length === 0) return;

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');

            // Update button active state
            filterBtns.forEach(b => {
                b.classList.remove('bg-indigo-600', 'text-white');
                b.classList.add('bg-white', 'dark:bg-slate-800');
            });
            btn.classList.add('bg-indigo-600', 'text-white');
            btn.classList.remove('bg-white', 'dark:bg-slate-800');

            // Filter posts with a simple hide/show
            blogPosts.forEach(post => {
                if (filter === 'all' || post.getAttribute('data-category') === filter) {
                    post.classList.remove('hidden');
                } else {
                    post.classList.add('hidden');
                }
            });
        });
    });
};

document.addEventListener('DOMContentLoaded', () => {
    setupDarkMode();
    setupMobileMenu();
    setupActiveLinks();
    setupScrollToTop();
    setupBlogFilters();
});
