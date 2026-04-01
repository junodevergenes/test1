gsap.registerPlugin(ScrollTrigger);

function initParallax() {
  const hero = document.querySelector(".hero-parallax");
  if (!hero) return;

  // Anima o layer inteiro, não só a img
  // Assim o z-index dos layers não é afetado por stacking context do GSAP
  const layerBg = hero.querySelector(".layer-bg");
  const layerShape = hero.querySelector(".layer-shape");
  const layerForeground = hero.querySelector(".layer-foreground");
  const content = hero.querySelector(".hero-content");

  // Garante z-index via JS também, para não depender só do CSS
  gsap.set(layerBg, { zIndex: 1 });
  gsap.set(layerShape, { zIndex: 2 });
  gsap.set(layerForeground, { zIndex: 3 });
  if (content) gsap.set(content, { zIndex: 10 });

  // Zoom de entrada
  gsap.from(layerBg, {
    scale: 1.12,
    duration: 1.8,
    ease: "power3.out",
    onComplete: startLoops,
  });

  gsap.from(layerForeground, {
    scale: 1.12,
    duration: 1.8,
    ease: "power3.out",
  });

  gsap.from(layerShape, {
    scale: 1.3,
    yPercent: -4,
    duration: 3,
    delay: 0.3,
    ease: "power3.out",
  });

  if (content) {
    gsap.from(content, {
      y: 20,
      duration: 1.2,
      delay: 0.6,
      ease: "power2.out",
    });
  }

  function startLoops() {
    // Bg e foreground: zoom idêntico e sincronizado
    gsap.to(layerBg, {
      scale: 1.08,
      duration: 7,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });

    gsap.to(layerForeground, {
      scale: 1.08,
      duration: 7,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });

    // Shape: zoom diferente + desce levemente para não cortar o texto
    gsap.to(layerShape, {
      scale: 1.04,
      yPercent: 3,
      duration: 9,
      delay: 0.8,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });
  }
}

initParallax();

let lastBreakpoint = window.innerWidth <= 1000 ? "mobile" : "desktop";
window.addEventListener("resize", () => {
  const current = window.innerWidth <= 1000 ? "mobile" : "desktop";
  if (current !== lastBreakpoint) {
    lastBreakpoint = current;
    ScrollTrigger.refresh();
  }
});
