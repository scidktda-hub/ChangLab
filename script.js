document.addEventListener('DOMContentLoaded', () => {

    // --- ACCORDION LOGIC ---
    const accordionItems = document.querySelectorAll('.accordion__item');

    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion__header');

        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all items
            accordionItems.forEach(i => i.classList.remove('active'));

            // If the clicked item wasn't active, open it
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // --- AI SLIDER LOGIC ---
    const sliderWrapper = document.getElementById('ai-slider');
    const dots = document.querySelectorAll('.slider-dot');
    const flipCards = document.querySelectorAll('.ai-flip-card');

    if (sliderWrapper && dots.length > 0) {
        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                const index = dot.getAttribute('data-index');

                // Move slider
                sliderWrapper.style.transform = `translateX(-${index * 100}%)`;

                // Update dots
                dots.forEach(d => d.classList.remove('active'));
                dot.classList.add('active');

                // Reset all flips when changing slide
                flipCards.forEach(card => card.classList.remove('flipped'));
            });
        });
    }

    // --- AI FLIP LOGIC ---
    flipCards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });
    });

    // --- FORM SUBMISSION PLACEHOLDER ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Cảm ơn bạn đã để lại thông tin! Chang sẽ sớm phản hồi cho bạn qua email/số điện thoại nhé.');
            contactForm.reset();
        });
    }

    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});
