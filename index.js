// Keep the footer copyright year current
document.getElementById("year").textContent = new Date().getFullYear();

// Send the contact form without leaving the page
const form = document.getElementById("contact-form");
const statusText = document.getElementById("form-status");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (form.action.includes("YOUR_FORM_ID")) {
        showStatus("The contact form isn't set up yet. Please call or email us instead.", "error");
        return;
    }

    const button = form.querySelector("button");
    button.disabled = true;
    button.textContent = "Sending...";

    try {
        const response = await fetch(form.action, {
            method: "POST",
            body: new FormData(form),
            headers: { Accept: "application/json" },
        });

        if (!response.ok) throw new Error("Request failed");

        form.reset();
        showStatus("Thanks! Your message was sent. We'll get back to you soon.", "success");
    } catch {
        showStatus("Sorry, something went wrong. Please try again or call us.", "error");
    } finally {
        button.disabled = false;
        button.textContent = "Send Message";
    }
});

function showStatus(message, type) {
    statusText.textContent = message;
    statusText.className = "form-status " + type;
}

// Fade elements up into view as you scroll down to them
const revealTargets = document.querySelectorAll(
    ".section .eyebrow, .section-title, .section-intro, .photo-card, .deal-banner, .menu-card, .menu-hint, .contact-form, .map-frame, .footer-col"
);
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if ("IntersectionObserver" in window && !reduceMotion) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target); // only animate once
            }
        });
    }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });

    revealTargets.forEach((el) => {
        // Cards and footer columns that sit side by side come in one after another
        const siblings = [...el.parentElement.children].filter((child) => child.matches(".photo-card, .menu-card, .footer-col"));
        const position = siblings.indexOf(el);
        if (position > 0) el.style.transitionDelay = (position % 4) * 0.12 + "s"; // restart every row of 4

        el.classList.add("reveal");
        observer.observe(el);
    });
}
