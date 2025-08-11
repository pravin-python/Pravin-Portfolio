document.addEventListener('DOMContentLoaded', () => {

    // --- RESPONSIVE NAVBAR ---
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");

    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    });

    document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    }));

    // --- STICKY NAVBAR & ACTIVE LINK HIGHLIGHTING ---
    const header = document.getElementById('navbar');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');

    window.addEventListener('scroll', () => {
        // Sticky header
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(12, 16, 34, 0.8)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.backgroundColor = 'transparent';
            header.style.backdropFilter = 'none';
        }
        
        // Active link highlighting
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 100) {
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

    // --- FADE-IN ANIMATION ON SCROLL ---
    const scrollTargets = document.querySelectorAll('.scroll-target');
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    scrollTargets.forEach(target => {
        observer.observe(target);
    });

    // --- INTERACTIVE MODEL 1: PARTICLES.JS HERO ---
    particlesJS('particles-js', {
        "particles": {
            "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
            "color": { "value": "#ffffff" },
            "shape": { "type": "circle" },
            "opacity": { "value": 0.5, "random": false },
            "size": { "value": 3, "random": true },
            "line_linked": { "enable": true, "distance": 150, "color": "#ffffff", "opacity": 0.4, "width": 1 },
            "move": { "enable": true, "speed": 4, "direction": "none", "random": false, "straight": false, "out_mode": "out" }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": { "onhover": { "enable": true, "mode": "repulse" }, "onclick": { "enable": true, "mode": "push" } },
            "modes": {
                "repulse": { "distance": 100, "duration": 0.4 },
                "push": { "particles_nb": 4 }
            }
        },
        "retina_detect": true
    });

    // --- INTERACTIVE MODEL 2: TAGCLOUD SKILLS ---
    const myTags = [
        'Python', 'JavaScript', 'PyTorch', 'AI/ML',
        'Scikit-learn', 'TensorFlow', 'Django', 'Flask',
        'React', 'Node.js', 'Shopify', 'HTML/CSS', 'PHP', 
        'SQL', 'Docker', 'AWS', 'Git', 'REST API', 'FAST API',
        'Nmap', 'Cybersecurity', 'Wireshark'
    ];

    TagCloud('.skill-cloud', myTags, {
        radius: 170,
        maxSpeed: 'fast',
        initSpeed: 'fast',
        direction: 135,
        keep: true
    });


    // --- INTERACTIVE MODEL 3: MATRIX RAIN FOOTER ---
    const canvas = document.getElementById('matrix-canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = 250; // Footer height

    const matrixChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
    const characters = matrixChars.split('');
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = [];

    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }

    function drawMatrix() {
        ctx.fillStyle = 'rgba(10, 13, 26, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#3a79f0'; // Accent color
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = characters[Math.floor(Math.random() * characters.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    setInterval(drawMatrix, 35);


    // --- CONTACT FORM VALIDATION ---
    const form = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
            formStatus.textContent = 'Please fill out all fields.';
            formStatus.style.color = '#e94560';
            return;
        }

        formStatus.textContent = 'Thank you for your message!';
        formStatus.style.color = '#3a79f0';
        form.reset();
        
        setTimeout(() => {
            formStatus.textContent = '';
        }, 5000);
    });
});