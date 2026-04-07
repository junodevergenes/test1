// Registra o plugin
gsap.registerPlugin(ScrollTrigger);

// Cálculo da distância baseado na tela
let moveDistance = window.innerWidth < 800 ? -100 : -150;

// Animação para o Trigo 3 (Lado Esquerdo)
gsap.to("#trigo3", {
  y: moveDistance,
  ease: "none",
  scrollTrigger: {
    trigger: ".section6", // Começa a mover quando a seção 'Alma Italiana' aparece
    start: "top bottom",
    end: "bottom top",
    scrub: 6,
  },
});
