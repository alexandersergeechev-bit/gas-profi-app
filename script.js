document.addEventListener('DOMContentLoaded', () => {
    // Theme Switcher Logic
    const themeBtn = document.getElementById('themeToggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    document.documentElement.setAttribute('data-theme', currentTheme);
    if(themeBtn) themeBtn.innerText = currentTheme === 'light' ? '🌙 Dark' : '☀️ Light';

    if(themeBtn) {
        themeBtn.addEventListener('click', () => {
            let theme = document.documentElement.getAttribute('data-theme');
            let newTheme = theme === 'light' ? 'dark' : 'light';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            themeBtn.innerText = newTheme === 'light' ? '🌙 Dark' : '☀️ Light';
        });
    }

    // Back to Top Button
    const backBtn = document.getElementById('backToTop');
    window.onscroll = () => {
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            backBtn.style.display = "block";
        } else {
            backBtn.style.display = "none";
        }
    };

    if(backBtn) {
        backBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Smooth Scroll for Nav
    document.querySelectorAll('.nav-item').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if(targetId.startsWith('#')) {
                e.preventDefault();
                document.querySelector(targetId).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Register Service Worker for Offline Work
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js') // Убран ведущий слеш
            .then(reg => console.log('SW registered', reg))
            .catch(err => console.log('SW error', err));
    });
}