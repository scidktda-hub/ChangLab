document.addEventListener('DOMContentLoaded', () => {
    // --- HEADER SCROLL EFFECT ---
    const header = document.querySelector('.site-header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- SMOOTH SCROLL FOR ANCHORS ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- REVEAL ON SCROLL (Subtle Animation) ---
    const revealElements = document.querySelectorAll('.split-grid, .feature-card, .hero__content, .guide-card');

    const revealOnScroll = () => {
        const triggerBottom = window.innerHeight * 0.85;

        revealElements.forEach(el => {
            const elTop = el.getBoundingClientRect().top;
            if (elTop < triggerBottom) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    };

    // Set initial state for reveal
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.165, 0.84, 0.44, 1)';
    });

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check

    // --- AI SHOWCASE SLIDER LOGIC ---
    const aiData = [
        {
            name: "Làm chủ NotebookLM",
            desc: "Slide hướng dẫn chi tiết cách ứng dụng NotebookLM để quản lý và tóm tắt kiến thức hiệu quả.",
            img: "AI_LIST/NBLM_dohoa.png",
            link: "AI_Presentation/NotebookLM.pdf"
        },
        {
            name: "ChatGPT",
            desc: "Người bạn đồng hành thông minh, hỗ trợ viết lách và giải đáp mọi thắc mắc.",
            img: "AI_LIST/ChatGPT_Dohoa.png",
            link: "https://drive.google.com/file/d/1lCVYWmCDVJtD4gggHPzxpnHZXKDSrOKT/view?usp=sharing"
        },
        {
            name: "Gamma AI",
            desc: "Tạo bài thuyết trình và trang web chuyên nghiệp chỉ với vài câu lệnh đơn giản.",
            img: "AI_LIST/Gamma_Dohoa.png",
            link: "https://drive.google.com/file/d/1wOCE3EWqq14EyW3AL-Ujd6AcHZ3tFsn4/view?usp=drive_link"
        },
        {
            name: "Notebook LM",
            desc: "Quản lý và tóm tắt kiến thức từ tài liệu cá nhân một cách thông minh.",
            img: "AI_LIST/NBLM_dohoa.png",
            link: "https://drive.google.com/file/d/1qA_QjCAdiMu6Soe852Pu5fqopIGDZzcq/view?usp=drive_link"
        }
    ];

    let currentAIIndex = 0;
    const showcaseImg = document.getElementById('showcase-img');
    const showcaseTitle = document.getElementById('showcase-title');
    const showcaseDesc = document.getElementById('showcase-desc');
    const showcaseLink = document.getElementById('showcase-link');
    const prevBtn = document.getElementById('prev-ai');
    const nextBtn = document.getElementById('next-ai');

    function updateShowcase(index) {
        const ai = aiData[index];

        // Add fade-out effect or simple swap
        const container = document.querySelector('.showcase__content');
        container.classList.remove('fade-in');
        void container.offsetWidth; // Trigger reflow
        container.classList.add('fade-in');

        showcaseImg.src = ai.img;
        showcaseImg.alt = ai.name;
        showcaseTitle.innerText = ai.name;
        showcaseDesc.innerText = ai.desc;
        showcaseLink.href = ai.link;
    }

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            currentAIIndex = (currentAIIndex - 1 + aiData.length) % aiData.length;
            updateShowcase(currentAIIndex);
        });

        nextBtn.addEventListener('click', () => {
            currentAIIndex = (currentAIIndex + 1) % aiData.length;
            updateShowcase(currentAIIndex);
        });
    }

    // --- CONTACT FORM SUBMISSION ---
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const submitBtn = document.getElementById('submit-btn');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // QUAN TRỌNG: URL này phải kết thúc bằng /exec
            const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxbLMJwJaKLwzFFnyGTFarfPFTwMC-Ex7zuB1l9yLLBDoInccLYog51sV0p4FCt9BM95A/exec';

            if (SCRIPT_URL === '' || SCRIPT_URL.includes('YOUR_GOOGLE_APPS_SCRIPT_URL')) {
                showStatus('Vui lòng cấu hình URL Google Script để gửi form.', '#e74c3c');
                return;
            }

            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());
            data.timestamp = new Date().toLocaleString('vi-VN');

            submitBtn.disabled = true;
            submitBtn.innerText = 'Đang gửi...';
            showStatus('Đang xử lý thông tin...', '#3498db');

            try {
                // Sử dụng URLSearchParams để gửi dữ liệu dạng form-encoded
                const params = new URLSearchParams();
                for (const [key, value] of Object.entries(data)) {
                    params.append(key, value);
                }

                await fetch(SCRIPT_URL, {
                    method: 'POST',
                    mode: 'no-cors', // Không đổi 'no-cors' để tránh lỗi CORS
                    body: params,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                });

                // Vì dùng no-cors nên ta không đọc được response, giả định gửi thành công nếu không vào catch
                showStatus('Cảm ơn bạn! Thông tin đã được gửi thành công.', '#27ae60');
                contactForm.reset();

            } catch (error) {
                console.error('Lỗi khi gửi form:', error);
                showStatus('Có lỗi xảy ra. Hãy kiểm tra kết nối mạng.', '#e74c3c');
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerText = 'Gửi thông tin';
            }
        });
    }

    function showStatus(message, color) {
        formStatus.innerText = message;
        formStatus.style.color = color;
        formStatus.style.display = 'block';
    }

    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});
