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

    const animElements = document.querySelectorAll('.scroll-anim:not(.show)');
    animElements.forEach((el) => observer.observe(el));
}

// Initialize Observer on page load
document.addEventListener("DOMContentLoaded", observeElements);
