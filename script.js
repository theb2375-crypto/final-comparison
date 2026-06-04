const toggleBtn = document.getElementById('langToggle');
const contentEn = document.getElementById('content-en');
const contentHi = document.getElementById('content-hi');
const labelEn = document.getElementById('label-en');
const labelHi = document.getElementById('label-hi');
const body = document.body;
const bgEn = document.getElementById('bg-en');
const bgHi = document.getElementById('bg-hi');
const bubble = document.getElementById('bubble-overlay');

toggleBtn.addEventListener('change', () => {
    
    // 1. Prepare Bubble Color
    if (toggleBtn.checked) {
        bubble.style.background = '#0f766e'; // Emerald color for Hindi theme
    } else {
        bubble.style.background = '#302b63'; // Deep purple for English theme
    }

    // 2. Trigger the Bubble Animation
    bubble.classList.remove('animate');
    void bubble.offsetWidth; // Force a browser reflow to restart animation
    bubble.classList.add('animate');

    // 3. Swap content midway through the bubble expanding (300ms)
    setTimeout(() => {
        if(toggleBtn.checked) {
            // Swap to Hindi
            contentEn.classList.remove('active');
            contentHi.classList.add('active');
            
            body.classList.add('theme-hi');
            labelEn.classList.replace('active-lang', 'inactive-lang');
            labelHi.classList.replace('inactive-lang', 'active-lang');
            bgEn.classList.add('hidden-bg');
            bgHi.classList.remove('hidden-bg');
        } else {
            // Swap to English
            contentHi.classList.remove('active');
            contentEn.classList.add('active');

            body.classList.remove('theme-hi');
            labelHi.classList.replace('active-lang', 'inactive-lang');
            labelEn.classList.replace('inactive-lang', 'active-lang');
            bgHi.classList.add('hidden-bg');
            bgEn.classList.remove('hidden-bg');
        }

        // 4. Reset child scroll animations so they fade up properly
        const nextSection = toggleBtn.checked ? contentHi : contentEn;
        const animElements = nextSection.querySelectorAll('.scroll-anim');
        animElements.forEach(el => el.classList.remove('show'));
        
        // Re-trigger observer
        setTimeout(() => observeElements(), 50);

    }, 300); // 300ms matches the peak of the bubble size
});

// Intersection Observer for Scroll & Stagger Animations
function observeElements() {
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                // Stop observing once it has animated in
                obs.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    // Only observe elements that haven't animated yet
    const animElements = document.querySelectorAll('.scroll-anim:not(.show)');
    animElements.forEach((el) => observer.observe(el));
}

// Initialize Observer on page load
document.addEventListener("DOMContentLoaded", observeElements);
// ==========================================
// ==========================================
