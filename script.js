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

    /* --- MODAL DIALOG LOGIC --- */
    const modalOverlay = document.getElementById('signup-modal');
    const openModalBtn1 = document.getElementById('open-signup-modal-1');
    const openModalBtn2 = document.getElementById('open-signup-modal-2');
    const closeModalBtn = document.getElementById('close-signup-modal');

    // Function to open the modal
    const openModal = () => {
        modalOverlay.classList.add('visible');
        document.body.classList.add('modal-open'); // Prevents background scroll
    };

    // Function to close the modal
    const closeModal = () => {
        modalOverlay.classList.remove('visible');
        document.body.classList.remove('modal-open');
    };

    // Event listeners
    if (openModalBtn1 && openModalBtn2 && modalOverlay && closeModalBtn) {
        openModalBtn1.addEventListener('click', openModal);
        openModalBtn2.addEventListener('click', openModal);
        closeModalBtn.addEventListener('click', closeModal);

        // Close modal when clicking on the overlay background
        modalOverlay.addEventListener('click', (event) => {
            if (event.target === modalOverlay) {
                closeModal();
            }
        });

        // Close modal with the "Escape" key
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && modalOverlay.classList.contains('visible')) {
                closeModal();
            }
        });
    }


});