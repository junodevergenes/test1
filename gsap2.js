gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────
   Utilitário
───────────────────────────────────────────── */
function fadeUp(targets, triggerEl, delay = 0) {
  const els = gsap.utils.toArray(targets);
  if (!els.length) return;
  gsap.from(els, {
    scrollTrigger: {
      trigger: triggerEl || els[0],
      start: "top 85%",
      once: true,
    },
    opacity: 0,
    y: 35,
    duration: 0.9,
    ease: "power2.out",
    stagger: 0.12,
    delay,
  });
}

/* ─────────────────────────────────────────────
   Hero
───────────────────────────────────────────── */
if (document.querySelector(".hero img")) {
  gsap.from(".hero img", {
    opacity: 0,
    scale: 1.04,
    duration: 1.4,
    ease: "power2.out",
  });
}

/* ─────────────────────────────────────────────
   Trigos
───────────────────────────────────────────── */
if (document.querySelector("#trigo1")) {
  gsap.from("#trigo1", {
    scrollTrigger: { trigger: ".trigos-wrapper", start: "top 90%", once: true },
    opacity: 0,
    x: -60,
    duration: 1.2,
    ease: "power2.out",
  });
}
if (document.querySelector("#trigo2")) {
  gsap.from("#trigo2", {
    scrollTrigger: { trigger: ".trigos-wrapper", start: "top 90%", once: true },
    opacity: 0,
    x: 60,
    duration: 1.2,
    ease: "power2.out",
  });
}

/* ─────────────────────────────────────────────
   Fade por seção
───────────────────────────────────────────── */
gsap.utils.toArray("section").forEach((section) => {
  const itens = section.querySelectorAll(
    "h1,h2,h3,h4,p,.linha-marca,img:not(.logo):not(.ham):not(.social-icons img, iframe,.produto-card,.produto-card-full,.atributo-item,.tags-destaque,.form-cadastro",
  );
  if (!itens.length) return;
  gsap.from(itens, {
    scrollTrigger: { trigger: section, start: "top 82%", once: true },
    opacity: 0,
    y: 30,
    duration: 0.85,
    ease: "power2.out",
    stagger: 0.1,
  });
});

/* ─────────────────────────────────────────────
   Depoimento
───────────────────────────────────────────── */
if (document.querySelector(".depoimento")) {
  gsap.from(".depoimento", {
    scrollTrigger: {
      trigger: ".section-depoimento",
      start: "top 85%",
      once: true,
    },
    opacity: 0,
    y: 40,
    duration: 1,
    ease: "power2.out",
  });
  gsap.from(".depoimento img, .depoimento p, .depoimento h4", {
    scrollTrigger: {
      trigger: ".section-depoimento",
      start: "top 80%",
      once: true,
    },
    opacity: 0,
    y: 20,
    duration: 0.8,
    ease: "power2.out",
    stagger: 0.15,
    delay: 0.25,
  });
}

/* ─────────────────────────────────────────────
   Footer
───────────────────────────────────────────── */
fadeUp(
  "footer .logo-footer, footer .col1, footer .col2, footer .col3",
  "footer",
);
