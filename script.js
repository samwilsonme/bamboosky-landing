document.addEventListener('DOMContentLoaded', function() {

    // --- REVEAL ON SCROLL ---
    // This creates the "flowing" effect as you scroll down the page.
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing after it's visible so it doesn't re-animate
                observer.unobserve(entry.target); 
            }
        });
    }, {
        threshold: 0.1, // Trigger when 10% of the element is visible
    });

    // Attach the observer to every element with the class "reveal"
    const elementsToReveal = document.querySelectorAll('.reveal');
    elementsToReveal.forEach(element => {
        revealObserver.observe(element);
    });


    // --- SMOOTH ACCORDION FOR Q&A ---
    // This enhances the simple <details> element with a smooth animation.
    const allDetails = document.querySelectorAll('.qa-section details');

    allDetails.forEach(detail => {
        detail.addEventListener('toggle', (event) => {
            if (detail.open) {
                // The element has been opened
                const content = detail.querySelector('.faq-content');
                
                const startHeight = 0;
                const endHeight = content.scrollHeight;

                // Animate opening
                content.animate([
                    { height: `${startHeight}px`, opacity: 0 },
                    { height: `${endHeight}px`, opacity: 1 }
                ], {
                    duration: 400,
                    easing: 'cubic-bezier(0.22, 1, 0.36, 1)' // A nice "elastic" ease-out
                });
            }
        });
    });

});