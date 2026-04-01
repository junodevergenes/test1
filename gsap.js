// Registra o plugin no GSAP
gsap.registerPlugin(ScrollTrigger);
let moveDistance = window.innerWidth < 800 ? -100 : -150;

gsap.to("#trigo1", {
  y: moveDistance,
  ease: "none",
  scrollTrigger: {
    trigger: ".section1",
    start: "top bottom",
    end: "bottom top",
    scrub: 6,
  },
});

gsap.to("#trigo2", {
  y: moveDistance,
  ease: "none",
  scrollTrigger: {
    trigger: ".section2",
    start: "top bottom",
    end: "bottom top",
    scrub: 6,
  },
});
