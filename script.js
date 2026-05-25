 // Typing Animation
        const texts = ['Web Designer', 'Frontend Developer', 'Backend Developer'];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        const typingElement = document.querySelector('.typing-text');

        function type() {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                typingElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 50 : 100;

            if (!isDeleting && charIndex === currentText.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typeSpeed = 500;
            }

            setTimeout(type, typeSpeed);
        }

        type();

        // Smooth Scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });

        // Active Navigation
        window.addEventListener('scroll', () => {
            const sections = document.querySelectorAll('section');
            const navLinks = document.querySelectorAll('.nav-links a');
            
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (scrollY >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').substring(1) === current) {
                    link.classList.add('active');
                }
            });
        });

        // Testimonial Carousel
        const wrapper = document.querySelector('.testimonial-wrapper');
        const testimonialContainer = document.querySelector('.testimonial-container');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        let currentSlide = 0;
        const totalSlides = document.querySelectorAll('.testimonial-card').length;
        let autoSlide;
        let isPaused = false;

        function moveSlide(direction) {
            currentSlide += direction;
            if (currentSlide < 0) currentSlide = totalSlides - 1;
            if (currentSlide >= totalSlides) currentSlide = 0;
            wrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
        }

        function startAutoSlide() {
            autoSlide = setInterval(() => {
                if (!isPaused) {
                    moveSlide(1);
                }
            }, 3000);
        }

        prevBtn.addEventListener('click', () => {
            moveSlide(-1);
            clearInterval(autoSlide);
            startAutoSlide();
        });

        nextBtn.addEventListener('click', () => {
            moveSlide(1);
            clearInterval(autoSlide);
            startAutoSlide();
        });

        testimonialContainer.addEventListener('mouseenter', () => {
            isPaused = true;
        });

        testimonialContainer.addEventListener('mouseleave', () => {
            isPaused = false;
        });

        startAutoSlide();

        // Form Submission
        document.querySelector('.contact-form').addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Message sent successfully!');
            this.reset();
        });