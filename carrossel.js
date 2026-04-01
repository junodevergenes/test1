const BLOG_URL =
  "https://materiais.moinhoglobo.com.br/acervo-famiglia-venturelli";

const receitas = [
  {
    id: 1,
    title: "Castagnole",
    sub: "da Famiglia Venturelli",
    img: "/img/castagnole.png",
    tag: "castagnole",
  },
  {
    id: 2,
    title: "Sgabei",
    sub: "Massa de pão frita",
    img: "/img/sgabei.png",
    tag: "sgabei",
  },
  {
    id: 3,
    title: "Biscoito Natalino",
    sub: "Lindo e Decorado",
    img: "/img/biscoito-natalino.png",
    tag: "biscoito natalino",
  },
];

// Posições alvo para cada slot (left, center, right)
// x é relativo ao centro do track (translateX a partir do centro do card)
const SLOTS = {
  left: { x: -200, scale: 0.88, opacity: 0.75, zIndex: 1 },
  center: { x: 0, scale: 1.0, opacity: 1.0, zIndex: 2 },
  right: { x: 200, scale: 0.88, opacity: 0.75, zIndex: 1 },
};

let current = 0;
let animating = false;
const selected = new Set();

// Mantém referências aos 3 elementos DOM dos cards
const cardEls = [];

function buildCard(ri) {
  const r = receitas[ri];
  const el = document.createElement("div");
  el.className = `card${selected.has(r.id) ? " selected" : ""}`;
  el.dataset.ri = ri;
  el.innerHTML = `
    <img src="${r.img}" alt="${r.title}" />
    <div class="card-body">
      <div class="card-title">${r.title}</div>
      <div class="card-sub">${r.sub}</div>
      <div class="card-link">
        <span>veja receita completa</span>
        <i class="ri-arrow-right-up-line"></i>
      </div>
      ${selected.has(r.id) ? '<div class="selected-badge">✓ selecionada</div>' : ""}
    </div>
  `;
  return el;
}

function positionCard(el, slot, instant) {
  const s = SLOTS[slot];
  const track = document.getElementById("track");
  const trackW = track.offsetWidth;
  const cardW = 280;
  const centerX = trackW / 2 - cardW / 2;

  if (instant) {
    gsap.set(el, {
      x: centerX + s.x,
      scale: s.scale,
      opacity: s.opacity,
      zIndex: s.zIndex,
    });
  } else {
    gsap.to(el, {
      x: centerX + s.x,
      scale: s.scale,
      opacity: s.opacity,
      zIndex: s.zIndex,
      duration: 0.5,
      ease: "power3.out",
    });
  }

  // Ajusta altura da imagem pelo slot
  const img = el.querySelector("img");
  gsap.to(img, {
    height: slot === "center" ? 280 : 220,
    duration: instant ? 0 : 0.5,
    ease: "power2.out",
  });

  // Título ligeiramente maior no centro
  const title = el.querySelector(".card-title");
  gsap.to(title, {
    fontSize: slot === "center" ? "20px" : "17px",
    duration: instant ? 0 : 0.4,
    ease: "power2.out",
  });
}

function initCarousel() {
  const track = document.getElementById("track");
  track.innerHTML = "";
  cardEls.length = 0;

  const slots = ["left", "center", "right"];
  const indices = [
    (current - 1 + receitas.length) % receitas.length,
    current,
    (current + 1) % receitas.length,
  ];

  slots.forEach((slot, i) => {
    const el = buildCard(indices[i]);
    track.appendChild(el);
    cardEls.push({ el, slot, ri: indices[i] });
    positionCard(el, slot, true);

    if (slot === "center") {
      el.addEventListener("click", () => {
        if (animating) return;
        toggleSelect(indices[i]);
      });
    }
  });

  // Entrada inicial: cards sobem do fundo com stagger
  gsap.from(
    cardEls.map((c) => c.el),
    {
      y: 60,
      opacity: 0,
      duration: 0.7,
      ease: "power3.out",
      stagger: 0.1,
    },
  );
}

function navigate(dir) {
  if (animating) return;
  animating = true;

  const track = document.getElementById("track");
  const trackW = track.offsetWidth;
  const cardW = 280;
  const centerX = trackW / 2 - cardW / 2;

  // Card que vai sair (o oposto da direção)
  const exitSlot = dir === 1 ? "left" : "right";
  const exitObj = cardEls.find((c) => c.slot === exitSlot);

  // Anima saída do card que vai embora
  gsap.to(exitObj.el, {
    x: dir === 1 ? centerX - 420 : centerX + 420,
    opacity: 0,
    scale: 0.7,
    duration: 0.4,
    ease: "power2.in",
    onComplete: () => exitObj.el.remove(),
  });

  // Reposiciona os outros dois cards
  const staying = cardEls.filter((c) => c.slot !== exitSlot);
  staying.forEach((c) => {
    const newSlot =
      dir === 1
        ? c.slot === "center"
          ? "left"
          : "center"
        : c.slot === "center"
          ? "right"
          : "center";
    c.slot = newSlot;
    positionCard(c.el, newSlot, false);
  });

  // Novo current
  current = (current + dir + receitas.length) % receitas.length;

  // Novo card entra pelo lado
  const newRi =
    dir === 1
      ? (current + 1) % receitas.length
      : (current - 1 + receitas.length) % receitas.length;
  const newSlot = dir === 1 ? "right" : "left";

  const newEl = buildCard(newRi);
  track.appendChild(newEl);

  // Posição inicial fora da tela
  gsap.set(newEl, {
    x: dir === 1 ? centerX + 420 : centerX - 420,
    scale: 0.7,
    opacity: 0,
    zIndex: 1,
  });

  // Anima entrada
  gsap.to(newEl, {
    x: centerX + SLOTS[newSlot].x,
    scale: SLOTS[newSlot].scale,
    opacity: SLOTS[newSlot].opacity,
    duration: 0.5,
    ease: "power3.out",
    onComplete: () => {
      animating = false;
    },
  });

  // Reattach clicks
  const newEntry = { el: newEl, slot: newSlot, ri: newRi };
  cardEls.length = 0;
  cardEls.push(...staying, newEntry);

  cardEls.forEach((c) => {
    c.el.onclick = null;
    if (c.slot === "center") {
      c.el.addEventListener("click", () => {
        if (animating) return;
        toggleSelect(c.ri);
      });
    }
  });

  updateFooter();
}

function toggleSelect(id) {
  if (selected.has(id)) selected.delete(id);
  else selected.add(id);

  // Atualiza visualmente apenas o card central sem recriar tudo
  const centerObj = cardEls.find((c) => c.slot === "center");
  if (centerObj) {
    centerObj.ri = id;
    const badge = centerObj.el.querySelector(".selected-badge");
    if (selected.has(id)) {
      centerObj.el.classList.add("selected");
      if (!badge) {
        const b = document.createElement("div");
        b.className = "selected-badge";
        b.textContent = "✓ selecionada";
        centerObj.el.querySelector(".card-body").appendChild(b);
        gsap.from(b, { opacity: 0, y: 6, duration: 0.3, ease: "power2.out" });
      }
    } else {
      centerObj.el.classList.remove("selected");
      if (badge) {
        gsap.to(badge, {
          opacity: 0,
          y: 6,
          duration: 0.2,
          onComplete: () => badge.remove(),
        });
      }
    }
  }

  updateFooter();
}

function updateFooter() {
  const btn = document.getElementById("searchBtn");
  const list = document.getElementById("selectedList");
  const names = [...selected]
    .map((id) => receitas.find((r) => r.id === id)?.title)
    .filter(Boolean);
  btn.disabled = names.length < 1;
  list.innerHTML =
    names.length === 0
      ? "Clique nos cards para selecionar receitas"
      : `Selecionadas: <span>${names.join(", ")}</span>`;
}

document.getElementById("prev").addEventListener("click", () => navigate(-1));
document.getElementById("next").addEventListener("click", () => navigate(1));

document.getElementById("searchBtn").addEventListener("click", () => {
  window.open(BLOG_URL, "_blank");
});

initCarousel();
