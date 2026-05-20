const header = document.getElementById("siteHeader");
const menuButton = document.getElementById("menuButton");
const navMenu = document.getElementById("navMenu");
const topButton = document.getElementById("topButton");
const whatsappWidget = document.getElementById("whatsappWidget");
const whatsappToggle = document.getElementById("whatsappToggle");

function handleScroll() {
    if (header) header.classList.toggle("scrolled", window.scrollY > 80);
    if (topButton) topButton.classList.toggle("visible", window.scrollY > 500);
}

window.addEventListener("scroll", handleScroll);
handleScroll();

if (menuButton && navMenu) {
    menuButton.addEventListener("click", () => {
        menuButton.classList.toggle("active");
        navMenu.classList.toggle("open");
    });
}

document.querySelectorAll("a[href^='#']").forEach((link) => {
    link.addEventListener("click", (event) => {
        const target = document.querySelector(link.getAttribute("href"));
        if (!target) return;
        event.preventDefault();
        if (navMenu) navMenu.classList.remove("open");
        if (menuButton) menuButton.classList.remove("active");
        target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
});

if (topButton) {
    topButton.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

if (whatsappWidget && whatsappToggle) {
    whatsappToggle.addEventListener("click", (event) => {
        event.preventDefault();
        const isOpen = whatsappWidget.classList.toggle("open");
        whatsappToggle.setAttribute("aria-expanded", String(isOpen));
    });

    document.addEventListener("click", (event) => {
        if (whatsappWidget.contains(event.target)) return;
        whatsappWidget.classList.remove("open");
        whatsappToggle.setAttribute("aria-expanded", "false");
    });
}

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.14 });

document.querySelectorAll(".reveal").forEach((item) => revealObserver.observe(item));

const countObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const item = entry.target;
        const target = Number(item.dataset.count);
        const duration = 1200;
        const start = performance.now();

        function tick(now) {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            item.textContent = Math.round(target * eased);
            if (progress < 1) requestAnimationFrame(tick);
        }

        requestAnimationFrame(tick);
        countObserver.unobserve(item);
    });
}, { threshold: 0.8 });

document.querySelectorAll("[data-count]").forEach((item) => countObserver.observe(item));

document.querySelectorAll(".faq-item").forEach((button) => {
    button.addEventListener("click", () => {
        const panel = button.nextElementSibling;
        const isOpen = button.classList.contains("active");

        document.querySelectorAll(".faq-item").forEach((item) => item.classList.remove("active"));
        document.querySelectorAll(".faq-panel").forEach((item) => item.classList.remove("open"));

        if (!isOpen) {
            button.classList.add("active");
            panel.classList.add("open");
        }
    });
});

const contactForm = document.getElementById("contactForm");
if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const button = event.currentTarget.querySelector("button span");
        const original = button.textContent;
        button.textContent = "Mensagem enviada";
        event.currentTarget.reset();
        setTimeout(() => {
            button.textContent = original;
        }, 2400);
    });
}
