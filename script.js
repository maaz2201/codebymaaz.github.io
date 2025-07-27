document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;

  // --- INTERACTIVE CUSTOM CURSOR ---
  const cursorDot = document.querySelector(".cursor-dot");
  const cursorOutline = document.querySelector(".cursor-outline");

  if (cursorDot) {
    window.addEventListener("mousemove", (e) => {
      const posX = e.clientX;
      const posY = e.clientY;

      cursorDot.style.left = `${posX}px`;
      cursorDot.style.top = `${posY}px`;

      cursorOutline.animate(
        {
          left: `${posX}px`,
          top: `${posY}px`,
        },
        {
          duration: 500,
          fill: "forwards",
        }
      );
    });

    const interactiveElements = document.querySelectorAll(
      "a, button, .nav-link, .timeline-item, .project-card, .skill-card, .service-card"
    );
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseover", () => {
        cursorOutline.classList.add("cursor-interact");
      });
      el.addEventListener("mouseleave", () => {
        cursorOutline.classList.remove("cursor-interact");
      });
    });
  }

  // --- HERO SECTION TYPEWRITER EFFECT (WITH MULTIPLE SENTENCES) ---
  const h1 = document.getElementById("typewriter-h1");
  if (h1) {
    // --- START OF CUSTOMIZABLE VALUES ---
    const sentences = [
      "I build efficient web solutions.",
      "I create seamless user experiences.",
      "I solve complex problems with code.",
      "I turn ideas into reality.",
    ];
    const typingSpeed = 80; // Time in ms between each character typed
    const deletingSpeed = 50; // Time in ms between each character deleted
    const pauseBeforeDelete = 2000; // Pause in ms after a sentence is fully typed
    const pauseBeforeTyping = 500; // Pause in ms after a sentence is deleted
    // --- END OF CUSTOMIZABLE VALUES ---

    let sentenceIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typewriterLoop() {
      const currentSentence = sentences[sentenceIndex];
      let timeoutDuration = typingSpeed;

      if (isDeleting) {
        // We are deleting
        h1.textContent = currentSentence.substring(0, charIndex - 1);
        charIndex--;
        timeoutDuration = deletingSpeed;
      } else {
        // We are typing
        h1.textContent = currentSentence.substring(0, charIndex + 1);
        charIndex++;
      }

      // Condition to switch state
      if (!isDeleting && charIndex === currentSentence.length) {
        // Finished typing, start deleting after a pause
        isDeleting = true;
        timeoutDuration = pauseBeforeDelete;
      } else if (isDeleting && charIndex === 0) {
        // Finished deleting, move to the next sentence after a pause
        isDeleting = false;
        sentenceIndex = (sentenceIndex + 1) % sentences.length; // Loop back to the start
        timeoutDuration = pauseBeforeTyping;
      }

      setTimeout(typewriterLoop, timeoutDuration);
    }

    // Kick off the loop
    setTimeout(typewriterLoop, pauseBeforeTyping);
  }

  // --- AUTO-HIDING HEADER ---
  let lastScrollTop = 0;
  const header = document.querySelector(".header");
  const scrollOffset = 10;
  window.addEventListener(
    "scroll",
    () => {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > scrollOffset) {
        header.classList.add("header--scrolled");
      } else {
        header.classList.remove("header--scrolled");
      }
      if (scrollTop > lastScrollTop && scrollTop > header.offsetHeight) {
        header.classList.add("header--hidden");
      } else {
        header.classList.remove("header--hidden");
      }
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    },
    { passive: true }
  );

  // --- THEME TOGGLE LOGIC ---
  const themeToggle = document.getElementById("theme-toggle");
  const applyTheme = () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      body.className = savedTheme;
    } else if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: light)").matches
    ) {
      body.className = "light-mode";
    } else {
      body.className = "dark-mode";
    }
  };
  themeToggle.addEventListener("click", () => {
    if (body.classList.contains("dark-mode")) {
      body.className = "light-mode";
      localStorage.setItem("theme", "light-mode");
    } else {
      body.className = "dark-mode";
      localStorage.setItem("theme", "dark-mode");
    }
  });
  applyTheme();

  // --- MOBILE NAVIGATION MENU ---
  const hamburger = document.querySelector(".hamburger");
  const navMenuContainer = document.querySelector(".nav-menu-container");
  if (hamburger && navMenuContainer) {
    hamburger.addEventListener("click", () => {
      const isMenuOpen = navMenuContainer.classList.contains("active");
      hamburger.classList.toggle("active", !isMenuOpen);
      navMenuContainer.classList.toggle("active", !isMenuOpen);
      body.style.overflow = isMenuOpen ? "" : "hidden";
    });

    navMenuContainer.querySelectorAll("a").forEach((link) =>
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenuContainer.classList.remove("active");
        body.style.overflow = "";
      })
    );
  }

  // --- SCROLL-TRIGGERED SECTION ANIMATIONS ---
  const animatedElements = document.querySelectorAll(".animate-on-scroll");
  const sectionObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          const staggerItems = entry.target.querySelectorAll(".stagger-item");
          staggerItems.forEach((item, index) => {
            item.style.transitionDelay = `${index * 100}ms`;
          });
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
    }
  );
  animatedElements.forEach((el) => sectionObserver.observe(el));
});
