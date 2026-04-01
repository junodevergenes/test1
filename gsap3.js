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

// Animação para a Farinha (Lado Direito - Seção Atributos)
gsap.to("#farinha1", {
  y: 50, // Um pouco mais rápido para dar profundidade
  ease: "none",
  scrollTrigger: {
    trigger: "section[div='atributos']",
    start: "top bottom",
    end: "bottom top",
    scrub: 6,
  },
});
