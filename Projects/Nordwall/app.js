const menuBtn = document.querySelector("#menu-btn");
const mainNav = document.querySelector("#main-nav");
const revealEls = document.querySelectorAll(".reveal");
const slideImages = document.querySelectorAll(".hero-slider img");
const galleryGrid = document.querySelector("#gallery-grid");
const showMoreBtn = document.querySelector("#show-more-btn");
const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightbox-image");
const closeLightboxBtn = document.querySelector("#close-lightbox");
const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");

if (menuBtn && mainNav) {
  menuBtn.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("is-open");
    menuBtn.setAttribute("aria-expanded", String(isOpen));
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("is-open");
      menuBtn.setAttribute("aria-expanded", "false");
    });
  });
}

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealEls.forEach((el) => observer.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("in-view"));
}

if (slideImages.length) {
  let index = 0;
  slideImages[index].classList.add("is-visible");

  setInterval(() => {
    slideImages[index].classList.remove("is-visible");
    index = (index + 1) % slideImages.length;
    slideImages[index].classList.add("is-visible");
  }, 3500);
}

if (showMoreBtn && galleryGrid) {
  showMoreBtn.addEventListener("click", () => {
    const expanded = galleryGrid.classList.toggle("show-all");
    showMoreBtn.textContent = expanded ? "Show Less" : "Show More";
  });
}

if (lightbox && lightboxImage) {
  document.querySelectorAll(".gallery-item img").forEach((img) => {
    img.addEventListener("click", () => {
      lightboxImage.src = img.src;
      lightboxImage.alt = img.alt;
      lightbox.showModal();
    });
  });

  closeLightboxBtn.addEventListener("click", () => lightbox.close());
  lightbox.addEventListener("click", (event) => {
    const target = event.target;
    if (target === lightbox) {
      lightbox.close();
    }
  });
}

if (contactForm && formStatus) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!contactForm.checkValidity()) {
      formStatus.textContent = "Please complete all required fields correctly.";
      formStatus.style.color = "#a5230f";
      return;
    }

    formStatus.textContent = "Thanks. Your inquiry has been prepared and is ready to send.";
    formStatus.style.color = "#28522f";
    contactForm.reset();
  });
}
