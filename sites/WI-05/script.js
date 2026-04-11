document.addEventListener('DOMContentLoaded', () => {
    const logo = document.querySelector('.logo');
    logo.style.opacity = '0';
    logo.style.transition = 'opacity 1.5s ease-in-out';
    
    setTimeout(() => {
        logo.style.opacity = '1';
    }, 100);
});
