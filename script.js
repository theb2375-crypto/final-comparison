// Minimalist Intersection Observer for Scroll Fade-ins
function observeElements() {
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                // Stop observing once the element is visible
                obs.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: "0px 0px -20px 0px"
    });

    // Select all elements with the .scroll-anim class that aren't showing yet
    const animElements = document.querySelectorAll('.scroll-anim:not(.show)');
    animElements.forEach((el) => observer.observe(el));
}

// Initialize Observer on page load
document.addEventListener("DOMContentLoaded", observeElements);
