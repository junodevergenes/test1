/* ═══════════════════════════════════════════════
   menu.js — Menu hamburguer animado
   Cor: hsla(3, 71%, 44%, 1)
   Logo: /svg/logo-header-branco.svg
═══════════════════════════════════════════════ */

(function () {
  /* ── 1. Injetar overlay no DOM ── */
  const overlay = document.createElement("div");
  overlay.id = "menu-overlay";
  overlay.innerHTML = `
    <div id="menu-overlay-bg"></div>
    <div id="menu-overlay-inner">
      <div id="menu-logo-wrap">
        <img id="menu-logo" src="/svg/logo-header-branco.svg" alt="Famiglia Venturelli" />
      </div>
      <nav id="menu-overlay-nav">
        <a href="#">Início</a>
        <a href="#">Produtos</a>
        <a href="#">Receitas</a>
        <a href="#">Embaixadores</a>
        <a href="#">Momentos incomparáveis</a>
        <a href="#">Livro de receitas</a>
        <a href="#">Contato</a>
        <a href="#">Trabalhe conosco</a>
      </nav>
      <button id="menu-close" aria-label="Fechar menu">
        <span></span>
        <span></span>
      </button>
    </div>
  `;
  document.body.appendChild(overlay);

  /* ── 2. Estilos ── */
  const style = document.createElement("style");
  style.textContent = `
    #menu-overlay {
      position: fixed;
      inset: 0;
      z-index: 9999;
      pointer-events: none;
      overflow: hidden;
    }

    #menu-overlay-bg {
      position: absolute;
      inset: 0;
      background-color: hsla(3, 71%, 44%, 1);
      transform: translateY(-100%);
      will-change: transform;
    }

    /* Layout: logo fixo no topo, nav ancorada no bottom-right */
    #menu-overlay-inner {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      justify-content: space-between;
      padding: 2.5vh 6vw 6vh;
      opacity: 0;
      pointer-events: none;
    }

    /* Logo — topo, centralizado horizontalmente */
    #menu-logo-wrap {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      padding-top: 1rem;
    }
    #menu-logo {
      width: clamp(200px, 30vw, 420px);
      will-change: transform;
      display: block;
      opacity: 0;
    }

    /* Nav — alinhada à direita, ancorada no bottom */
    #menu-overlay-nav {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 1.4rem;
    }
    #menu-overlay-nav a {
      font-size: clamp(1.15rem, 2.8vw, 1.6rem);
      color: hsla(0, 0%, 100%, 1);
      text-decoration: none;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      font-weight: 500;
      text-align: right;
      min-height: 44px;
      display: flex;
      align-items: center;
      opacity: 0;
      transform: translateY(14px);
      transition: color 0.2s ease, letter-spacing 0.2s ease;
    }
    #menu-overlay-nav a:hover {
      color: hsla(228, 59%, 13%, 1);
      letter-spacing: 0.1em;
    }

    #menu-close {
      all: unset;
      position: absolute;
      top: 1.5rem;
      right: 1.5rem;
      width: 52px;
      height: 52px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      pointer-events: none;
    }
    #menu-close span {
      display: block;
      width: 30px;
      height: 2px;
      background: hsla(0, 0%, 100%, 1);
      border-radius: 2px;
      position: absolute;
      transition: background 0.2s;
    }
    #menu-close span:first-child { transform: rotate(45deg); }
    #menu-close span:last-child  { transform: rotate(-45deg); }
    #menu-close:hover span       { background: hsla(228, 59%, 13%, 1); }

    #menu-overlay.is-open { pointer-events: all; }
    #menu-overlay.is-open #menu-overlay-inner,
    #menu-overlay.is-open #menu-close { pointer-events: all; }

    body.menu-open { overflow: hidden; }

    @media (max-width: 600px) {
      #menu-overlay-inner {
        padding: 2vh 8vw 8vh;
      }
      #menu-logo {
        width: clamp(160px, 60vw, 280px);
      }
      #menu-overlay-nav {
        gap: 1.2rem;
      }
      #menu-overlay-nav a {
        min-height: 48px;
      }
    }
  `;
  document.head.appendChild(style);

  /* ── 3. Referências ── */
  const ham = document.querySelector(".ham");
  const overlayBg = document.getElementById("menu-overlay-bg");
  const overlayIn = document.getElementById("menu-overlay-inner");
  const menuLogo = document.getElementById("menu-logo");
  const menuLinks = document.querySelectorAll("#menu-overlay-nav a");
  const closeBtn = document.getElementById("menu-close");

  let logoAnim = null;
  let isOpen = false;

  /* ── Estado inicial explícito ── */
  gsap.set(overlayBg, { translateY: "-100%" });
  gsap.set(overlayIn, { opacity: 0 });
  gsap.set(menuLogo, { opacity: 0, scale: 0.92 });
  gsap.set(menuLinks, { opacity: 0, y: 14 });
  gsap.set(closeBtn, { opacity: 0 });

  /* ── 4. Abrir ── */
  function openMenu() {
    if (isOpen) return;
    isOpen = true;
    overlay.classList.add("is-open");
    document.body.classList.add("menu-open");

    const tl = gsap.timeline();

    tl.to(overlayBg, {
      translateY: "0%",
      duration: 0.6,
      ease: "power3.inOut",
    });

    tl.to(
      overlayIn,
      {
        opacity: 1,
        duration: 0.01,
      },
      "-=0.08",
    );

    tl.to(
      menuLogo,
      {
        opacity: 1,
        scale: 1,
        duration: 0.7,
        ease: "power2.out",
      },
      "-=0.05",
    );

    tl.call(() => {
      logoAnim = gsap.to(menuLogo, {
        scale: 1.07,
        duration: 3.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    });

    tl.to(
      menuLinks,
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
        stagger: 0.07,
      },
      "-=0.3",
    );

    tl.to(
      closeBtn,
      {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
        pointerEvents: "all",
      },
      "-=0.5",
    );
  }

  /* ── 5. Fechar ── */
  function closeMenu() {
    if (!isOpen) return;
    isOpen = false;

    if (logoAnim) {
      logoAnim.kill();
      logoAnim = null;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        overlay.classList.remove("is-open");
        document.body.classList.remove("menu-open");
        gsap.set(overlayBg, { translateY: "-100%" });
        gsap.set(overlayIn, { opacity: 0 });
        gsap.set(menuLogo, { opacity: 0, scale: 0.92 });
        gsap.set(menuLinks, { opacity: 0, y: 14 });
        gsap.set(closeBtn, { opacity: 0 });
      },
    });

    tl.to([closeBtn, menuLinks, menuLogo], {
      opacity: 0,
      duration: 0.2,
      ease: "power2.in",
      stagger: 0.02,
    });

    tl.to(
      overlayIn,
      {
        opacity: 0,
        duration: 0.1,
      },
      "-=0.05",
    );

    tl.to(overlayBg, {
      translateY: "-100%",
      duration: 0.55,
      ease: "power3.inOut",
    });
  }

  /* ── 6. Eventos ── */
  if (ham) ham.addEventListener("click", openMenu);
  if (closeBtn) closeBtn.addEventListener("click", closeMenu);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOpen) closeMenu();
  });
  menuLinks.forEach((link) => link.addEventListener("click", closeMenu));
})();
