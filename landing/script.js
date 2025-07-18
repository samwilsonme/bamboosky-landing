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

    /* --- SIGNUP MODAL DIALOG LOGIC --- */
    const signupModalOverlay = document.getElementById('signup-modal');
    const openModalBtn1 = document.getElementById('open-signup-modal-1');
    const openModalBtn2 = document.getElementById('open-signup-modal-2');
    const closeSignupModalBtn = document.getElementById('close-signup-modal');

    // Function to open the signup modal
    const openSignupModal = () => {
        signupModalOverlay.classList.add('visible');
        document.body.classList.add('modal-open');
    };

    // Function to close the signup modal
    const closeSignupModal = () => {
        signupModalOverlay.classList.remove('visible');
        document.body.classList.remove('modal-open');
    };

    // Event listeners for signup modal
    if (openModalBtn1 && openModalBtn2 && signupModalOverlay && closeSignupModalBtn) {
        openModalBtn1.addEventListener('click', openSignupModal);
        openModalBtn2.addEventListener('click', openSignupModal);
        closeSignupModalBtn.addEventListener('click', closeSignupModal);

        // Close modal when clicking on the overlay background
        signupModalOverlay.addEventListener('click', (event) => {
            if (event.target === signupModalOverlay) {
                closeSignupModal();
            }
        });
    }

    /* --- RESERVATION MODAL DIALOG LOGIC --- */
    const reservationModal = document.getElementById('reservation-modal');
    const openReservationBtn = document.getElementById('reserve-table');
    const closeReservationBtn = document.getElementById('close-reservation-modal');

    // Function to open the reservation modal
    const openReservationModal = () => {
        reservationModal.classList.add('visible');
        document.body.classList.add('modal-open');
    };

    // Function to close the reservation modal
    const closeReservationModal = () => {
        reservationModal.classList.remove('visible');
        document.body.classList.remove('modal-open');
    };

    // Event listeners for reservation modal
    if (openReservationBtn && reservationModal && closeReservationBtn) {
        openReservationBtn.addEventListener('click', openReservationModal);
        closeReservationBtn.addEventListener('click', closeReservationModal);

        // Close modal when clicking on the overlay background
        reservationModal.addEventListener('click', (event) => {
            if (event.target === reservationModal) {
                closeReservationModal();
            }
        });
    }

    // Global escape key handler for both modals
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            if (signupModalOverlay.classList.contains('visible')) {
                closeSignupModal();
            }
            if (reservationModal.classList.contains('visible')) {
                closeReservationModal();
            }
        }
    });

});