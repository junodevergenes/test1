/* ═══════════════════════════════════════════════
   menu.js — Menu hamburguer + dropdown mobile
   Cor: hsla(3, 71%, 44%, 1)
   Logo: /svg/logo-header-branco.svg
   Ícones: RemixIcon
═══════════════════════════════════════════════ */

(function () {
  /* ────────────────────────────────────────────
     1. Injetar overlay no DOM
     ──────────────────────────────────────────── */
  const overlay = document.createElement("div");
  overlay.id = "menu-overlay";
  overlay.innerHTML = `
    <div id="menu-overlay-bg"></div>
    <div id="menu-overlay-inner">

      <div id="menu-logo-wrap">
        <img id="menu-logo" src="/svg/logo-header-branco.svg" alt="Famiglia Venturelli" />
      </div>

      <nav id="menu-overlay-nav">
        <a href="/index.html" class="mob-link">Início</a>

        <!-- Dropdown: Produtos -->
        <div class="mob-dropdown" id="mob-dropdown-produtos">
          <button class="mob-dropdown-btn mob-link" aria-expanded="false">
            Produtos
            <i class="ri-arrow-down-s-line mob-dropdown-icon" aria-hidden="true"></i>
          </button>
          <ul class="mob-dropdown-list" aria-hidden="true">
            <li><a href="/produtos-consumidor1.html">Uso Diário</a></li>
            <li><a href="/produtos-consumidor2.html">Uso Profissional</a></li>
            <li><a href="/alma-italiana.html">Alma Italiana</a></li>
            <li><a href="/produtos-consumidor3.html">Como Comprar</a></li>
          </ul>
        </div>

        <a href="https://materiais.moinhoglobo.com.br/inscricao-momentos-incomparaveis"
           class="mob-link" target="_blank" rel="noopener noreferrer">
           Momentos Incomparáveis
        </a>

        <a href="https://materiais.moinhoglobo.com.br/formulario-materiais"
           class="mob-link" target="_blank" rel="noopener noreferrer">
           Livro de Receitas
        </a>

        <a href="/contato.html" class="mob-link">Contato</a>

        <a href="https://moinhoglobo.com.br/sobre-nos/"
           class="mob-link" target="_blank" rel="noopener noreferrer">
           Trabalhe Conosco
        </a>
      </nav>

      <button id="menu-close" aria-label="Fechar menu">
        <span></span>
        <span></span>
      </button>
    </div>
  `;
  document.body.appendChild(overlay);

  /* ────────────────────────────────────────────
     2. Estilos
     ──────────────────────────────────────────── */
  const style = document.createElement("style");
  style.textContent = `
    /* ── Overlay base ── */
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
      overflow-y: auto;
    }

    /* ── Logo ── */
    #menu-logo-wrap {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      padding-top: 1rem;
      flex-shrink: 0;
    }
    #menu-logo {
      width: clamp(200px, 30vw, 420px);
      will-change: transform;
      display: block;
      opacity: 0;
    }

    /* ── Nav ── */
    #menu-overlay-nav {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 0.2rem;
      width: 100%;
    }

    /* Links e botão dropdown — aparência unificada */
    .mob-link,
    .mob-dropdown-btn {
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
      justify-content: flex-end;
      opacity: 0;
      transform: translateY(14px);
      transition: color 0.2s ease, letter-spacing 0.2s ease;
      width: 100%;
    }
    .mob-link:hover,
    .mob-dropdown-btn:hover {
      color: hsla(228, 59%, 13%, 1);
      letter-spacing: 0.1em;
    }

    /* ── Botão dropdown mobile ── */
    .mob-dropdown-btn {
      all: unset;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 0.4em;
      width: 100%;
      min-height: 44px;
      font-size: clamp(1.15rem, 2.8vw, 1.6rem);
      color: #fff;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      font-weight: 500;
      text-align: right;
      opacity: 0;
      transform: translateY(14px);
      transition: color 0.2s ease, letter-spacing 0.2s ease;
    }
    .mob-dropdown-btn:hover {
      color: hsla(228, 59%, 13%, 1);
      letter-spacing: 0.1em;
    }

    /* Seta do dropdown */
    .mob-dropdown-icon {
      font-size: 1.2em;
      transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
      display: inline-block;
      flex-shrink: 0;
    }
    .mob-dropdown.is-open .mob-dropdown-icon {
      transform: rotate(180deg);
    }

    /* ── Lista de sub-itens ── */
    .mob-dropdown-list {
      list-style: none;
      margin: 0;
      padding: 0;
      width: 100%;
      overflow: hidden;
      height: 0;
    }
    .mob-dropdown-list li {
      display: flex;
      justify-content: flex-end;
    }
    .mob-dropdown-list a {
      display: block;
      padding: 0.55rem 0;
      padding-right: 1.2rem;
      color: hsla(0, 0%, 100%, 0.82);
      text-decoration: none;
      font-size: clamp(0.9rem, 2vw, 1.1rem);
      letter-spacing: 0.04em;
      text-transform: uppercase;
      font-weight: 400;
      text-align: right;
      min-height: 40px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      border-right: 2px solid hsla(0, 0%, 100%, 0.3);
      transition: color 0.2s, border-color 0.2s, padding-right 0.2s;
      opacity: 0;
      transform: translateX(8px);
    }
    .mob-dropdown-list a:hover {
      color: #fff;
      border-color: #fff;
      padding-right: 1.6rem;
    }

    /* ── Botão fechar ── */
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

    /* ── Estados ── */
    #menu-overlay.is-open { pointer-events: all; }
    #menu-overlay.is-open #menu-overlay-inner,
    #menu-overlay.is-open #menu-close { pointer-events: all; }
    body.menu-open { overflow: hidden; }

    /* ── Responsivo ── */
    @media (max-width: 600px) {
      #menu-overlay-inner { padding: 2vh 8vw 8vh; }
      #menu-logo { width: clamp(160px, 60vw, 280px); }
    }
  `;
  document.head.appendChild(style);

  /* ────────────────────────────────────────────
     3. Referências DOM
     ──────────────────────────────────────────── */
  const ham = document.querySelector(".ham");
  const overlayBg = document.getElementById("menu-overlay-bg");
  const overlayIn = document.getElementById("menu-overlay-inner");
  const menuLogo = document.getElementById("menu-logo");
  const closeBtn = document.getElementById("menu-close");

  /* Todos os items animáveis no overlay (links + botão dropdown) */
  const mobItems = document.querySelectorAll(
    "#menu-overlay-nav .mob-link, #menu-overlay-nav .mob-dropdown-btn",
  );

  /* Dropdown mobile */
  const mobDropdownWrap = document.getElementById("mob-dropdown-produtos");
  const mobDropdownBtn = mobDropdownWrap.querySelector(".mob-dropdown-btn");
  const mobDropdownList = mobDropdownWrap.querySelector(".mob-dropdown-list");
  const mobSubLinks = mobDropdownList.querySelectorAll("a");

  let logoAnim = null;
  let isOpen = false;
  let dropdownIsOpen = false;

  /* ────────────────────────────────────────────
     4. Estado inicial
     ──────────────────────────────────────────── */
  gsap.set(overlayBg, { translateY: "-100%" });
  gsap.set(overlayIn, { opacity: 0 });
  gsap.set(menuLogo, { opacity: 0, scale: 0.92 });
  gsap.set(mobItems, { opacity: 0, y: 14 });
  gsap.set(closeBtn, { opacity: 0 });
  gsap.set(mobSubLinks, { opacity: 0, x: 8 });

  /* ────────────────────────────────────────────
     5. Dropdown mobile — abrir / fechar
     ──────────────────────────────────────────── */
  function openMobDropdown() {
    dropdownIsOpen = true;
    mobDropdownWrap.classList.add("is-open");
    mobDropdownBtn.setAttribute("aria-expanded", "true");
    mobDropdownList.setAttribute("aria-hidden", "false");

    /* Calcular altura real da lista para animação */
    gsap.set(mobDropdownList, { height: "auto", opacity: 1 });
    const listH = mobDropdownList.offsetHeight;
    gsap.set(mobDropdownList, { height: 0, opacity: 1 });

    gsap.to(mobDropdownList, {
      height: listH,
      duration: 0.38,
      ease: "power2.out",
    });

    gsap.to(mobSubLinks, {
      opacity: 1,
      x: 0,
      duration: 0.35,
      ease: "power2.out",
      stagger: 0.06,
      delay: 0.08,
    });
  }

  function closeMobDropdown(instant) {
    dropdownIsOpen = false;
    mobDropdownWrap.classList.remove("is-open");
    mobDropdownBtn.setAttribute("aria-expanded", "false");
    mobDropdownList.setAttribute("aria-hidden", "true");

    if (instant) {
      gsap.set(mobDropdownList, { height: 0 });
      gsap.set(mobSubLinks, { opacity: 0, x: 8 });
      return;
    }

    gsap.to(mobSubLinks, {
      opacity: 0,
      x: 8,
      duration: 0.18,
      ease: "power2.in",
      stagger: 0.03,
    });

    gsap.to(mobDropdownList, {
      height: 0,
      duration: 0.3,
      ease: "power2.in",
      delay: 0.1,
    });
  }

  mobDropdownBtn.addEventListener("click", () => {
    if (dropdownIsOpen) closeMobDropdown(false);
    else openMobDropdown();
  });

  /* ────────────────────────────────────────────
     6. Abrir overlay
     ──────────────────────────────────────────── */
  function openMenu() {
    if (isOpen) return;
    isOpen = true;
    overlay.classList.add("is-open");
    document.body.classList.add("menu-open");
    if (ham) ham.setAttribute("aria-expanded", "true");

    const tl = gsap.timeline();

    tl.to(overlayBg, {
      translateY: "0%",
      duration: 0.6,
      ease: "power3.inOut",
    });

    tl.to(overlayIn, { opacity: 1, duration: 0.01 }, "-=0.08");

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
      mobItems,
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

  /* ────────────────────────────────────────────
     7. Fechar overlay
     ──────────────────────────────────────────── */
  function closeMenu() {
    if (!isOpen) return;
    isOpen = false;
    if (ham) ham.setAttribute("aria-expanded", "false");

    /* Fecha dropdown antes de sair */
    if (dropdownIsOpen) closeMobDropdown(true);

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
        gsap.set(mobItems, { opacity: 0, y: 14 });
        gsap.set(closeBtn, { opacity: 0 });
        gsap.set(mobSubLinks, { opacity: 0, x: 8 });
      },
    });

    tl.to([closeBtn, mobItems, menuLogo], {
      opacity: 0,
      duration: 0.2,
      ease: "power2.in",
      stagger: 0.02,
    });

    tl.to(overlayIn, { opacity: 0, duration: 0.1 }, "-=0.05");

    tl.to(overlayBg, {
      translateY: "-100%",
      duration: 0.55,
      ease: "power3.inOut",
    });
  }

  /* ────────────────────────────────────────────
     8. Eventos
     ──────────────────────────────────────────── */
  if (ham) ham.addEventListener("click", openMenu);
  if (closeBtn) closeBtn.addEventListener("click", closeMenu);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOpen) closeMenu();
  });

  /* Fecha o overlay ao clicar em qualquer link (exceto o btn do dropdown) */
  const allMobLinks = document.querySelectorAll("#menu-overlay-nav a");
  allMobLinks.forEach((link) => link.addEventListener("click", closeMenu));

  /* ────────────────────────────────────────────
     9. Dropdown DESKTOP — abrir / fechar com GSAP
        (complementa o CSS puro; garante consistência)
     ──────────────────────────────────────────── */
  const desktopDropdowns = document.querySelectorAll(
    ".nav-dropdown[data-dropdown]",
  );

  desktopDropdowns.forEach((dropdown) => {
    const toggle = dropdown.querySelector(".nav-dropdown-toggle");
    const menu = dropdown.querySelector(".nav-dropdown-menu");
    const items = menu ? menu.querySelectorAll("a") : [];
    let ddOpen = false;
    let ddAnim = null;

    function openDd() {
      ddOpen = true;
      dropdown.classList.add("is-open");
      toggle.setAttribute("aria-expanded", "true");

      if (ddAnim) ddAnim.kill();
      gsap.set(menu, { pointerEvents: "all" });
      ddAnim = gsap.timeline();
      ddAnim.fromTo(
        menu,
        { opacity: 0, y: -8, visibility: "visible" },
        { opacity: 1, y: 0, duration: 0.22, ease: "power2.out" },
      );
      ddAnim.fromTo(
        items,
        { opacity: 0, y: -5 },
        { opacity: 1, y: 0, duration: 0.18, ease: "power2.out", stagger: 0.05 },
        "-=0.1",
      );
    }

    function closeDd() {
      ddOpen = false;
      dropdown.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");

      if (ddAnim) ddAnim.kill();
      ddAnim = gsap.to(menu, {
        opacity: 0,
        y: -8,
        duration: 0.18,
        ease: "power2.in",
        onComplete: () =>
          gsap.set(menu, { pointerEvents: "none", visibility: "hidden" }),
      });
    }

    /* Abre/fecha no click do toggle */
    toggle.addEventListener("click", (e) => {
      e.stopPropagation();
      if (ddOpen) closeDd();
      else openDd();
    });

    /* Fecha ao clicar fora */
    document.addEventListener("click", (e) => {
      if (ddOpen && !dropdown.contains(e.target)) closeDd();
    });

    /* Acessibilidade: Escape fecha o dropdown */
    toggle.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && ddOpen) {
        closeDd();
        toggle.focus();
      }
    });

    /* Estado inicial */
    gsap.set(menu, { visibility: "hidden", pointerEvents: "none" });
  });
})();

/* Footer dropdown */
(function () {
  const wrap = document.getElementById("footer-dropdown-produtos");
  if (!wrap) return; // sai se o footer não estiver na página

  const btn = wrap.querySelector(".footer-dropdown-btn");
  const list = wrap.querySelector(".footer-dropdown-list");
  const items = list.querySelectorAll("a");
  let isOpen = false;
  let anim = null;

  /* Estado inicial */
  gsap.set(list, { height: 0 });
  gsap.set(items, { opacity: 0, x: -6 });

  function open() {
    isOpen = true;
    wrap.classList.add("is-open");
    btn.setAttribute("aria-expanded", "true");
    list.setAttribute("aria-hidden", "false");

    /* Altura real da lista */
    gsap.set(list, { height: "auto" });
    const h = list.offsetHeight;
    gsap.set(list, { height: 0 });

    if (anim) anim.kill();
    anim = gsap.timeline();

    anim.to(list, {
      height: h,
      duration: 0.35,
      ease: "power2.out",
    });

    anim.to(
      items,
      {
        opacity: 1,
        x: 0,
        duration: 0.28,
        ease: "power2.out",
        stagger: 0.06,
      },
      "-=0.15",
    );
  }

  function close() {
    isOpen = false;
    wrap.classList.remove("is-open");
    btn.setAttribute("aria-expanded", "false");
    list.setAttribute("aria-hidden", "true");

    if (anim) anim.kill();
    anim = gsap.timeline();

    anim.to(items, {
      opacity: 0,
      x: -6,
      duration: 0.18,
      ease: "power2.in",
      stagger: 0.03,
    });

    anim.to(
      list,
      {
        height: 0,
        duration: 0.28,
        ease: "power2.in",
      },
      "-=0.08",
    );
  }

  btn.addEventListener("click", () => {
    if (isOpen) close();
    else open();
  });

  /* Acessibilidade: Escape fecha */
  btn.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOpen) {
      close();
      btn.focus();
    }
  });
})();
