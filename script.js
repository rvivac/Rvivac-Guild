/**
 * RVIVAC GUILD — INTERAÇÕES E COMPOSIÇÃO TÉCNICA DE SISTEMAS
 * Engenharia minimalista, precisão e zero artifícios supérfluos.
 */

document.addEventListener('DOMContentLoaded', () => {
  initBrandSplash();
  initSystemTopologyCanvas();
  initContactInteractions();
  initSmoothNav();
});

/* ==========================================================================
   1. CANVAS DE ARQUITETURA DE SISTEMAS (HERO VISUAL ABSTRATO)
   Inspirado em barramentos de dados, pipelines e topologias de microsserviços.
   Extremamente discreto, técnico e fluido.
   ========================================================================== */
function initSystemTopologyCanvas() {
  const canvas = document.getElementById('architecture-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const container = canvas.parentElement;

  let width = 0;
  let height = 0;
  let dpr = window.devicePixelRatio || 1;
  let animationFrameId = null;

  // Nós do sistema arquitetural (posições normalizadas 0 a 1)
  const systemNodes = [
    { id: 'gw', x: 0.18, y: 0.22, label: 'INGRESS', type: 'rect', size: 12 },
    { id: 'orch', x: 0.50, y: 0.22, label: 'DISPATCH', type: 'circle', size: 10 },
    { id: 'ai', x: 0.82, y: 0.22, label: 'ML_ENGINE', type: 'rect', size: 14 },
    { id: 'core', x: 0.50, y: 0.50, label: 'CORE_LOGIC', type: 'cross', size: 16 },
    { id: 'pipe', x: 0.20, y: 0.78, label: 'DATA_PIPELINE', type: 'rect', size: 12 },
    { id: 'sync', x: 0.50, y: 0.78, label: 'SYNC_BUS', type: 'circle', size: 10 },
    { id: 'api', x: 0.80, y: 0.78, label: 'EXT_SYSTEM', type: 'rect', size: 12 },
  ];

  // Conexões e barramentos entre nós
  const connections = [
    { from: 0, to: 1, flow: true },
    { from: 1, to: 2, flow: true },
    { from: 1, to: 3, flow: true },
    { from: 0, to: 4, flow: false },
    { from: 4, to: 5, flow: true },
    { from: 5, to: 3, flow: true },
    { from: 3, to: 2, flow: true },
    { from: 5, to: 6, flow: true },
    { from: 2, to: 6, flow: false },
  ];

  // Pacotes de dados em trânsito
  const packets = [
    { connIdx: 0, progress: 0.15, speed: 0.007 },
    { connIdx: 1, progress: 0.65, speed: 0.005 },
    { connIdx: 2, progress: 0.35, speed: 0.008 },
    { connIdx: 4, progress: 0.80, speed: 0.006 },
    { connIdx: 5, progress: 0.20, speed: 0.009 },
    { connIdx: 6, progress: 0.50, speed: 0.006 },
    { connIdx: 7, progress: 0.10, speed: 0.007 }
  ];

  // Interação sutil com cursor
  let mouse = { x: -1000, y: -1000, active: false };

  container.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
    mouse.active = true;
  });

  container.addEventListener('mouseleave', () => {
    mouse.active = false;
  });

  function resize() {
    const rect = container.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    dpr = window.devicePixelRatio || 1;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.resetTransform?.();
    ctx.scale(dpr, dpr);
  }

  window.addEventListener('resize', resize);
  resize();

  // Render loop
  let time = 0;

  function render() {
    time += 0.015;
    ctx.clearRect(0, 0, width, height);

    // 1. Grid de coordenadas secundário sutil
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.025)';
    ctx.lineWidth = 1;
    const step = 28;
    for (let x = step; x < width; x += step) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = step; y < height; y += step) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Calcula posições reais com perturbação elástica sutil pelo mouse
    const renderedNodes = systemNodes.map((node) => {
      let px = node.x * width;
      let py = node.y * height;

      if (mouse.active) {
        const dx = mouse.x - px;
        const dy = mouse.y - py;
        const dist = Math.hypot(dx, dy);
        if (dist < 120) {
          const force = (1 - dist / 120) * 8;
          px -= (dx / dist) * force;
          py -= (dy / dist) * force;
        }
      }

      return { ...node, px, py };
    });

    // 2. Linhas de barramento estrutural
    connections.forEach((conn) => {
      const p1 = renderedNodes[conn.from];
      const p2 = renderedNodes[conn.to];

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1;
      ctx.setLineDash([]);

      ctx.beginPath();
      ctx.moveTo(p1.px, p1.py);
      ctx.lineTo(p2.px, p2.py);
      ctx.stroke();
    });

    // 3. Pacotes de sinal elétrico/dados
    packets.forEach((pkt) => {
      pkt.progress = (pkt.progress + pkt.speed) % 1;
      const conn = connections[pkt.connIdx];
      const p1 = renderedNodes[conn.from];
      const p2 = renderedNodes[conn.to];

      const curX = p1.px + (p2.px - p1.px) * pkt.progress;
      const curY = p1.py + (p2.py - p1.py) * pkt.progress;

      // Pacote sutil em tom azul rvivac
      ctx.fillStyle = '#0066FF';
      ctx.shadowColor = '#0066FF';
      ctx.shadowBlur = 6;
      ctx.beginPath();
      ctx.arc(curX, curY, 2.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    });

    // 4. Renderização dos nós técnicos
    renderedNodes.forEach((node) => {
      const isHovered = mouse.active && Math.hypot(mouse.x - node.px, mouse.y - node.py) < 30;

      ctx.strokeStyle = isHovered ? '#38BDF8' : 'rgba(0, 102, 255, 0.55)';
      ctx.fillStyle = isHovered ? 'rgba(0, 102, 255, 0.25)' : '#1e222a';
      ctx.lineWidth = 1.2;

      const s = node.size;

      if (node.type === 'rect') {
        ctx.strokeRect(node.px - s / 2, node.py - s / 2, s, s);
        ctx.fillRect(node.px - s / 2, node.py - s / 2, s, s);
      } else if (node.type === 'circle') {
        ctx.beginPath();
        ctx.arc(node.px, node.py, s / 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      } else if (node.type === 'cross') {
        ctx.beginPath();
        ctx.arc(node.px, node.py, s / 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Linhas internas de precisão
        ctx.strokeStyle = isHovered ? '#38BDF8' : 'rgba(255, 255, 255, 0.35)';
        ctx.beginPath();
        ctx.moveTo(node.px - 3, node.py);
        ctx.lineTo(node.px + 3, node.py);
        ctx.moveTo(node.px, node.py - 3);
        ctx.lineTo(node.px, node.py + 3);
        ctx.stroke();
      }

      // Rótulos mono microscópicos
      ctx.fillStyle = isHovered ? '#F8FAFC' : '#64748B';
      ctx.font = '9px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillText(node.label, node.px, node.py + s + 10);
    });

    animationFrameId = requestAnimationFrame(render);
  }

  // Desativa animação se o usuário prefere redução de movimento
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    animationFrameId = requestAnimationFrame(render);
  } else {
    render(); // Renderiza estático uma vez
  }
}

/* ==========================================================================
   2. INTERAÇÕES DE CONTATO & MODAL DIALOG
   ========================================================================== */
function initContactInteractions() {
  const contactDialog = document.getElementById('contact-dialog');
  const openModalBtn = document.getElementById('open-contact-btn');
  const closeModalBtn = document.getElementById('close-dialog-btn');
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const copyFeedback = document.getElementById('copy-feedback');
  const contactForm = document.getElementById('contact-form');
  const formSuccessMsg = document.getElementById('form-success-msg');
  const currYearSpan = document.getElementById('curr-year');

  if (currYearSpan) {
    currYearSpan.textContent = new Date().getFullYear();
  }

  // Abertura do modal nativo
  if (openModalBtn && contactDialog) {
    openModalBtn.addEventListener('click', () => {
      contactDialog.showModal();
      document.body.style.overflow = 'hidden';
    });
  }

  // Abertura com pré-seleção a partir dos cards de soluções padronizadas
  const solutionBtns = document.querySelectorAll('.solution-action-btn');
  const solutionSelect = document.getElementById('client-solution');

  solutionBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const solutionKey = btn.getAttribute('data-solution');
      if (solutionSelect && solutionKey) {
        solutionSelect.value = solutionKey;
      }
      if (contactDialog) {
        contactDialog.showModal();
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // Fechamento pelo botão
  if (closeModalBtn && contactDialog) {
    closeModalBtn.addEventListener('click', () => {
      contactDialog.close();
    });
  }

  // Fechamento pelo backdrop (clique fora do card)
  if (contactDialog) {
    contactDialog.addEventListener('click', (e) => {
      const rect = contactDialog.getBoundingClientRect();
      const isInDialog = (
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width
      );
      if (!isInDialog) {
        contactDialog.close();
      }
    });

    contactDialog.addEventListener('close', () => {
      document.body.style.overflow = '';
      if (formSuccessMsg) formSuccessMsg.classList.add('hidden');
    });
  }

  // Cópia de E-mail com feedback instantâneo
  if (copyEmailBtn && copyFeedback) {
    copyEmailBtn.addEventListener('click', async () => {
      const email = 'contato@rvivacguild.com';
      try {
        await navigator.clipboard.writeText(email);
        copyFeedback.textContent = 'Copiado!';
        copyFeedback.classList.add('copied');
        setTimeout(() => {
          copyFeedback.textContent = 'Copiar';
          copyFeedback.classList.remove('copied');
        }, 2200);
      } catch (err) {
        // Fallback
        window.location.href = `mailto:${email}`;
      }
    });
  }

  // Submissão do formulário direto
  if (contactForm && formSuccessMsg) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = document.getElementById('form-submit-btn');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Transmitindo...</span>';
      }

      setTimeout(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<span>Enviar mensagem direta</span>';
        }
        formSuccessMsg.classList.remove('hidden');
        contactForm.reset();

        setTimeout(() => {
          if (contactDialog.open) {
            contactDialog.close();
          }
        }, 2500);
      }, 700);
    });
  }
}

/* ==========================================================================
   3. NAVEGAÇÃO SUAVE
   ========================================================================== */
function initSmoothNav() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

/* ==========================================================================
   4. APRESENTAÇÃO ANIMADA DA MARCA (LOVABLE SPIN & GREET)
   Gerencia a exibição da introdução com o logotipo fatiado, rotação 3D
   do símbolo e entradas laterais dos textos, transicionando para o site.
   ========================================================================== */
function initBrandSplash() {
  const splash = document.getElementById('brand-splash');
  if (!splash) return;

  const skipBtn = document.getElementById('splash-skip');
  let isClosed = false;
  let autoCloseTimer = null;

  // Bloqueia rolagem durante a abertura
  document.body.classList.add('splash-active');

  const closeSplash = () => {
    if (isClosed) return;
    isClosed = true;

    if (autoCloseTimer) {
      clearTimeout(autoCloseTimer);
      autoCloseTimer = null;
    }

    // Inicia fade out da tela de abertura
    splash.classList.add('splash-hidden');
    document.body.classList.remove('splash-active');

    // Desconecta listeners para evitar vazamentos
    document.removeEventListener('keydown', handleKeydown);

    // Oculta completamente do fluxo visual e de foco após a transição
    setTimeout(() => {
      splash.style.display = 'none';
    }, 750);
  };

  const handleKeydown = (e) => {
    if (e.key === 'Escape' || e.code === 'Escape') {
      closeSplash();
    }
  };

  // Botão de pular
  if (skipBtn) {
    skipBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeSplash();
    });
  }

  // Tecla ESC para dispensar
  document.addEventListener('keydown', handleKeydown);

  // Clique na tela de abertura para dispensar
  splash.addEventListener('click', (e) => {
    // Se clicar diretamente no fundo ou elemento, também fecha suavemente
    if (e.target !== skipBtn && !skipBtn?.contains(e.target)) {
      closeSplash();
    }
  });

  // Respeito à preferência por redução de movimento
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const duration = prefersReducedMotion ? 400 : 3200;

  // Fechamento automático sincronizado com o término dos 2 giros (1.85s) + entrada dos textos + contemplação (~1s)
  autoCloseTimer = setTimeout(() => {
    closeSplash();
  }, duration);
}

