document.addEventListener('DOMContentLoaded', () => {
    // --- Cookie Banner Logic ---
    const cookieBanner = document.querySelector('.cookie-banner');
    const acceptBtn = document.querySelector('.cookie-accept-btn');

    if (cookieBanner && acceptBtn) {
        // Если куки уже приняты ранее, скрываем баннер
        if (localStorage.getItem('cookieAccepted') === 'true') {
            cookieBanner.classList.add('cookie-hidden');
        }

        // Обработка клика по кнопке "Принять"
        acceptBtn.addEventListener('click', function () {
            cookieBanner.classList.add('cookie-hidden');
            localStorage.setItem('cookieAccepted', 'true');
        });
    }

    // --- Modal Logic ---
    const modal = document.getElementById('ctaModal');
    const priceModal = document.getElementById('priceModal');
    const modalTriggers = document.querySelectorAll('.modal-trigger');
    const priceModalTrigger = document.getElementById('showPriceModal');
    const modalClose = document.getElementById('modalClose');
    const priceModalClose = document.getElementById('priceModalClose');
    const body = document.body;

    const openModal = (e, modalElement) => {
        if (e) e.preventDefault();
        modalElement.classList.add('active');
        body.classList.add('modal-open');
    };

    const closeModal = (modalElement) => {
        modalElement.classList.remove('active');
        // Only remove modal-open if no other modal is active
        const remainingModals = document.querySelectorAll('.modal-overlay.active').length;
        if (remainingModals === 0) {
            body.classList.remove('modal-open');
        }

        if (modalElement.id === 'ctaModal') {
            // Reset form state after ctaModal is fully hidden
            setTimeout(() => {
                document.getElementById('modalFormBody').style.display = 'block';
                document.getElementById('modalFormBody').style.opacity = '1';
                document.getElementById('modalSuccessBody').style.display = 'none';
                const mainForm = document.getElementById('mainForm');
                if (mainForm) {
                    mainForm.reset();
                    const btn = mainForm.querySelector('button[type="submit"]');
                    const inputs = mainForm.querySelectorAll('input');
                    btn.textContent = 'Перезвоните мне';
                    btn.classList.remove('success');
                    btn.disabled = false;
                    inputs.forEach(input => input.disabled = false);
                }
            }, 400);
        }
    };

    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            // Close price modal if it was open when clicking "Order" button inside it
            if (priceModal.classList.contains('active')) {
                closeModal(priceModal);
            }
            openModal(e, modal);
        });
    });

    if (priceModalTrigger) {
        priceModalTrigger.addEventListener('click', (e) => openModal(e, priceModal));
    }

    if (modalClose) modalClose.addEventListener('click', () => closeModal(modal));
    if (priceModalClose) priceModalClose.addEventListener('click', () => closeModal(priceModal));

    [modal, priceModal].forEach(m => {
        if (m) {
            m.addEventListener('click', (e) => {
                if (e.target === m) closeModal(m);
            });
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.modal-overlay.active');
            if (activeModal) closeModal(activeModal);
        }
    });

    // --- Phone Mask Logic ---
    const phoneInputs = document.querySelectorAll('.phone-mask');
    phoneInputs.forEach(input => {
        input.addEventListener('input', (e) => {
            let value = input.value.replace(/\D/g, '');
            if (value.startsWith('7')) value = value.substring(1);
            value = value.substring(0, 10);

            let formatted = '+7 ';
            if (value.length > 0) formatted += '(' + value.substring(0, 3);
            if (value.length >= 3) formatted += ') ';
            if (value.length > 3) formatted += value.substring(3, 6);
            if (value.length >= 6) formatted += '-';
            if (value.length > 6) formatted += value.substring(6, 8);
            if (value.length >= 8) formatted += '-';
            if (value.length > 8) formatted += value.substring(8, 10);
            input.value = value.length === 0 ? '' : formatted;
        });

        input.addEventListener('focus', () => { if (input.value === '') input.value = '+7 '; });
        input.addEventListener('blur', () => { if (input.value === '+7 ') input.value = ''; });
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && input.value.length <= 4) e.preventDefault();
        });
    });

    // --- Form Handling with Compact Success State ---
    const mainForm = document.getElementById('mainForm');
    const formBody = document.getElementById('modalFormBody');
    const successBody = document.getElementById('modalSuccessBody');
    const displayUserData = document.getElementById('displayUserData');

    if (mainForm) {
        mainForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const nameInput = document.getElementById('userName');
            const phoneInput = document.getElementById('userPhone');
            const submitBtn = mainForm.querySelector('button[type="submit"]');

            // Capture Data
            const capturedName = nameInput.value;
            const capturedPhone = phoneInput.value;

            // UI Feedback
            submitBtn.textContent = 'Отправка...';
            submitBtn.disabled = true;

            setTimeout(() => {
                // Prepare successful data display
                if (displayUserData) {
                    displayUserData.textContent = `${capturedName}, ${capturedPhone}`;
                }

                // Smooth Transition: Hide Form, Show Success
                formBody.style.opacity = '0';
                formBody.style.transition = 'opacity 0.3s ease';

                setTimeout(() => {
                    formBody.style.display = 'none';
                    successBody.style.display = 'block';
                    successBody.style.opacity = '0';
                    setTimeout(() => {
                        successBody.style.opacity = '1';
                        successBody.style.transition = 'opacity 0.3s ease';
                    }, 50);
                }, 300);

            }, 800);
        });
    }

    // --- Portfolio Slider Logic ---
    const track = document.querySelector('.portfolio-track');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (track && prevBtn && nextBtn) {
        const getScrollAmount = () => {
            const card = track.querySelector('.portfolio-card');
            if (card) {
                // Return card width + gap (16px)
                return card.offsetWidth + 16;
            }
            return 316; // Fallback
        };

        prevBtn.addEventListener('click', () => {
            track.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
        });

        nextBtn.addEventListener('click', () => {
            track.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
        });
    }
});
