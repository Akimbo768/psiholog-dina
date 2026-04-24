// ===== 1. Появление блоков при скролле =====
const animatedElements = document.querySelectorAll(
  ".hero__content, .hero__visual, .section-shell, .contact-box"
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

animatedElements.forEach((element) => {
  element.classList.add("fade-up");
  revealObserver.observe(element);
});


// ===== 2. Активное меню =====
const navLinks = document.querySelectorAll("[data-nav-link]");
const sections = Array.from(navLinks)
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const setActiveNavLink = () => {
  const currentSection = sections.find((section) => {
    const rect = section.getBoundingClientRect();
    return rect.top <= 140 && rect.bottom >= 140;
  });

  navLinks.forEach((link) => {
    const isActive =
      currentSection &&
      link.getAttribute("href") === `#${currentSection.id}`;

    link.classList.toggle("is-active", Boolean(isActive));
  });
};


// ===== 3. Кнопка "наверх" =====
const backToTopButton = document.querySelector("[data-back-to-top]");

const toggleBackToTop = () => {
  if (!backToTopButton) return;

  backToTopButton.classList.toggle("is-visible", window.scrollY > 500);
};

if (backToTopButton) {
  backToTopButton.addEventListener("click", () => {
    backToTopButton.classList.add("is-clicked");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    setTimeout(() => {
      backToTopButton.classList.remove("is-clicked");
    }, 250);
  });
}


// ===== 4. Parallax вокруг фото =====
const photoComposition = document.querySelector("[data-parallax-photo]");
const canUseParallax =
  window.matchMedia("(pointer: fine)").matches &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (photoComposition && canUseParallax) {
  photoComposition.classList.add("is-parallax");

  photoComposition.addEventListener("mousemove", (event) => {
    const rect = photoComposition.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    photoComposition.style.setProperty("--move-x", x.toFixed(3));
    photoComposition.style.setProperty("--move-y", y.toFixed(3));
  });

  photoComposition.addEventListener("mouseleave", () => {
    photoComposition.style.setProperty("--move-x", 0);
    photoComposition.style.setProperty("--move-y", 0);
  });
}

// ===== INIT =====
window.addEventListener("scroll", () => {
  setActiveNavLink();
  toggleBackToTop();
});

// первый запуск
setActiveNavLink();
toggleBackToTop();