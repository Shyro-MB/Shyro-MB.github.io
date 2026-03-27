/*
========================================
SHIRO — main.js
Minimal, propre, portfolio-ready
========================================
*/

(function () {

  /*
  ========================================
  SETTINGS
  ========================================
  */

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;



  /*
  ========================================
  NAVIGATION MOBILE
  ========================================
  */

  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");

  function setNavOpen(isOpen) {

    if (!navToggle || !navMenu) return;

    navToggle.setAttribute("aria-expanded", String(isOpen));

    navMenu.classList.toggle("is-open", isOpen);

  }

  if (navToggle && navMenu) {

    navToggle.addEventListener("click", () => {

      const expanded =
        navToggle.getAttribute("aria-expanded") === "true";

      setNavOpen(!expanded);

    });


    // fermer quand on clique un lien

    document.querySelectorAll(".nav-link").forEach(link => {

      link.addEventListener("click", () => {

        setNavOpen(false);

      });

    });


    // fermer avec escape

    document.addEventListener("keydown", (e) => {

      if (e.key === "Escape") {

        setNavOpen(false);

      }

    });


    // fermer si click extérieur

    document.addEventListener("click", (e) => {

      if (!navMenu.classList.contains("is-open")) return;

      if (
        navMenu.contains(e.target) ||
        navToggle.contains(e.target)
      ) return;

      setNavOpen(false);

    });

  }



  /*
  ========================================
  SMOOTH SCROLL
  ========================================
  */

  if (!prefersReducedMotion) {

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

      anchor.addEventListener("click", function (e) {

        const target = document.querySelector(
          this.getAttribute("href")
        );

        if (!target) return;

        e.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      });

    });

  }



  /*
  ========================================
  REVEAL ANIMATION
  ========================================
  */

  const revealElements =
    document.querySelectorAll(".reveal");

  if (revealElements.length) {

    const observer = new IntersectionObserver(

      (entries) => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target.classList.add("is-visible");

          }

        });

      },

      {
        threshold: 0.12
      }

    );

    revealElements.forEach(el =>
      observer.observe(el)
    );

  }



  /*
  ========================================
  HERO PARALLAX
  ========================================
  */

  const heroBg =
    document.querySelector(".hero-bg");

  if (heroBg && !prefersReducedMotion) {

    let raf = null;

    document.addEventListener("mousemove", (e) => {

      const x =
        (e.clientX / window.innerWidth - 0.5) * 20;

      const y =
        (e.clientY / window.innerHeight - 0.5) * 20;

      if (raf) cancelAnimationFrame(raf);

      raf = requestAnimationFrame(() => {

        heroBg.style.transform =
          `translate(${x}px, ${y}px)`;

      });

    });

  }



  /*
  ========================================
  FOOTER YEAR AUTO
  ========================================
  */

  const yearElement =
    document.getElementById("year");

  if (yearElement) {

    yearElement.textContent =
      new Date().getFullYear();

  }



  /*
  ========================================
  TABLE OF CONTENTS ACTIVE
  ========================================
  */

  const tocLinks =
    document.querySelectorAll('.toc a[href^="#"]');

  if (tocLinks.length) {

    const sections = Array.from(tocLinks)
      .map(link =>
        document.querySelector(
          link.getAttribute("href")
        )
      )
      .filter(Boolean);


    const tocObserver =
      new IntersectionObserver(

        (entries) => {

          entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            tocLinks.forEach(link =>
              link.classList.remove("is-active")
            );

            const active =
              document.querySelector(
                `.toc a[href="#${entry.target.id}"]`
              );

            if (active)
              active.classList.add("is-active");

          });

        },

        {
          rootMargin: "-20% 0px -70% 0px"
        }

      );


    sections.forEach(section =>
      tocObserver.observe(section)
    );

  }



  /*
  ========================================
  COPY BUTTON CODE BLOCKS
  ========================================
  */

  const codeBlocks =
    document.querySelectorAll("pre");

  codeBlocks.forEach(block => {

    if (block.querySelector(".copy-btn"))
      return;


    const button =
      document.createElement("button");

    button.className = "copy-btn";

    button.textContent = "Copier";


    button.style.position = "absolute";

    button.style.top = "8px";

    button.style.right = "8px";

    button.style.padding = "6px 10px";

    button.style.fontSize = "12px";

    button.style.borderRadius = "8px";

    button.style.border =
      "1px solid rgba(255,255,255,0.2)";

    button.style.background =
      "rgba(0,0,0,0.4)";

    button.style.color = "#fff";

    button.style.cursor = "pointer";


    block.style.position = "relative";


    block.appendChild(button);


    button.addEventListener("click", async () => {

      try {

        await navigator.clipboard.writeText(
          block.innerText
        );

        button.textContent = "Copié";

        setTimeout(() => {

          button.textContent = "Copier";

        }, 2000);

      }

      catch {

        button.textContent = "Erreur";

      }

    });

  });



  /*
  ========================================
  NAV ACTIVE LINK (index page)
  ========================================
  */

  const navLinks =
    document.querySelectorAll(".nav-link");

  const sectionsIndex =
    document.querySelectorAll("section[id]");

  if (navLinks.length && sectionsIndex.length) {

    const navObserver =
      new IntersectionObserver(

        entries => {

          entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            navLinks.forEach(link =>
              link.classList.remove("active")
            );

            const active =
              document.querySelector(
                `.nav-link[href="#${entry.target.id}"]`
              );

            if (active)
              active.classList.add("active");

          });

        },

        {
          threshold: 0.3
        }

      );

    sectionsIndex.forEach(section =>
      navObserver.observe(section)
    );

  }


})();
