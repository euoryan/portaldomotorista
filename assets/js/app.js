(() => {
  'use strict';
  const $ = selector => document.querySelector(selector);
  const all = selector => [...document.querySelectorAll(selector)];
  const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[-‑]/g,'');
  const terms = query => normalize(query.trim()).split(/\s+/).filter(Boolean);
  const matches = (text, tokens) => tokens.every(word => normalize(text).includes(word));

  const signature = [
    '    ______________________',
    '   / ___  ___  ___  ___  /|',
    '  / /__/ /__/ /__/ /__/ / |',
    ' |  ___  ___  ___  ___  | |   Portal do Motorista',
    ' | |___||___||___||___| | /',
    ' |___(O)_________(O)___|/'
  ].join('\n');
  console.info('%c' + signature, 'color:#558df0;font:600 13px/1.2 monospace');
  console.info('O console é uma ferramenta de desenvolvimento. Colar comandos de terceiros aqui pode expor seus dados.');

  const siteRoot = new URL('../../', document.currentScript.src);
  const menu = $('#menu');
  const search = $('#search-dialog');
  const input = $('#command-input');
  const results = $('#command-results');
  let indexRequest;
  let selected = -1;
  const getIndex = () => {
    if (!indexRequest) indexRequest = fetch(new URL('assets/search-index.json', siteRoot)).then(response => {
      if (!response.ok) throw new Error('Índice indisponível');
      return response.json();
    }).catch(error => { indexRequest = undefined; throw error; });
    return indexRequest;
  };
  const menuToggle = $('#menu-toggle');
  menuToggle.addEventListener('click', () => menu.showModal());
  menuToggle.hidden = false;
  for (const dialog of [menu,search]) {
    dialog.querySelector('[data-close]').addEventListener('click',()=>dialog.close());
    dialog.addEventListener('click', event => {
      if (event.target === dialog) {
        const r = dialog.getBoundingClientRect();
        if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close();
      }
      if (event.target.closest('a[href]')) dialog.close();
    });
  }
  function select(index, scroll = false) {
    const rows = [...results.children];
    selected = rows.length ? (index + rows.length) % rows.length : -1;
    rows.forEach((row,i)=>row.setAttribute('aria-selected',String(i === selected)));
    if (selected === -1) { input.removeAttribute('aria-activedescendant'); return; }
    input.setAttribute('aria-activedescendant', rows[selected].id);
    if (scroll) rows[selected].scrollIntoView({block:'nearest'});
  }
  let drawVersion = 0;
  async function draw() {
    const version = ++drawVersion;
    const tokens = terms(input.value);
    const status = search.querySelector('.command-status');
    $('#command-group').textContent = tokens.length ? 'Resultados' : 'Sugestões';
    let index;
    try { index = await getIndex(); } catch {
      if (version !== drawVersion) return;
      results.replaceChildren();
      select(-1);
      status.textContent = 'Não foi possível carregar a busca. Abra a biblioteca para consultar os guias.';
      return;
    }
    if (version !== drawVersion) return;
    const items = (tokens.length ? index.filter(item => matches(`${item.title} ${item.detail} ${item.terms || ''}`, tokens)) : index).slice(0,8);
    const template = $('#command-option');
    results.replaceChildren(...items.map((item, i) => {
      const link = template.content.firstElementChild.cloneNode(true);
      const external = /^https?:/.test(item.href);
      link.id = 'command-item-' + i;
      link.href = external ? item.href : new URL(item.href.replace(/^\//, ''), siteRoot).href;
      if (external) { link.target = '_blank'; link.rel = 'noopener noreferrer'; }
      link.querySelector('strong').textContent = item.title;
      link.querySelector('small').textContent = item.detail;
      return link;
    }));
    status.textContent = items.length ? '' : 'Nenhum resultado encontrado.';
    select(items.length ? 0 : -1);
  }
  function openSearch() {
    if (menu.open) menu.close();
    input.value = '';
    results.replaceChildren();
    select(-1);
    search.showModal();
    input.focus();
    draw();
  }
  all('[data-search]').forEach(a=>a.addEventListener('click',e=>{ e.preventDefault(); openSearch(); }));
  if (/Mac|iPad|iPhone/.test(navigator.platform)) all('[data-shortcut]').forEach(el=>el.textContent='⌘ K');
  document.addEventListener('keydown',e=>{
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); if(search.open) search.close(); else openSearch(); }
  });
  input.addEventListener('input',draw);
  results.addEventListener('pointermove', event => {
    const option = event.target.closest('[role="option"]');
    if (event.pointerType === 'mouse' && option && option.getAttribute('aria-selected') !== 'true') {
      select([...results.children].indexOf(option));
    }
  });
  input.addEventListener('keydown',e=>{
    if (e.isComposing) return;
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); select(selected+(e.key === 'ArrowDown' ? 1 : -1),true); }
    if (e.key === 'Enter' && selected >= 0) { e.preventDefault(); results.children[selected].click(); }
  });

  const catalog = $('[data-catalog]');
  if (catalog) {
    const guides = [...catalog.querySelectorAll('[data-guide]')];
    const topicButtons = [...catalog.querySelectorAll('[data-topic]')];
    const query = catalog.querySelector('[name="q"]');
    const more = catalog.querySelector('[data-more]');
    const pageSize = Number(catalog.dataset.pageSize) || Infinity;
    let topic = '';
    let limit = pageSize;

    function renderCatalog() {
      const tokens = terms(query?.value || '');
      let count = 0;
      for (const guide of guides) {
        const match = (!topic || guide.dataset.category === topic) && matches(guide.dataset.terms, tokens);
        if (match) count++;
        guide.hidden = !match || count > limit;
      }
      topicButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.topic === topic)));
      catalog.querySelector('[data-count]').textContent = count + (count === 1 ? ' conteúdo' : ' conteúdos');
      catalog.querySelector('.no-results').hidden = count > 0;
      catalog.querySelector('.guide-list').hidden = count === 0;
      more.hidden = count <= limit;
    }

    function changeFilter() {
      limit = pageSize;
      const url = new URL(location.href);
      if (topic) url.searchParams.set('categoria', topic); else url.searchParams.delete('categoria');
      if (query?.value.trim()) url.searchParams.set('q', query.value.trim()); else url.searchParams.delete('q');
      url.searchParams.delete('setor');
      history.replaceState(null, '', url);
      renderCatalog();
    }

    function restore() {
      const params = new URL(location.href).searchParams;
      const requested = params.get('categoria');
      topic = topicButtons.some(button => button.dataset.topic === requested) ? requested : '';
      if (query) query.value = params.get('q') || '';
      limit = pageSize;
      renderCatalog();
    }
    topicButtons.forEach(button => button.addEventListener('click', () => {
      topic = button.dataset.topic;
      changeFilter();
    }));
    query?.addEventListener('input', changeFilter);
    query?.form.addEventListener('submit', event => { event.preventDefault(); changeFilter(); });
    more.addEventListener('click', () => {
      const previous = limit;
      limit += pageSize;
      renderCatalog();
      guides.filter(guide => !guide.hidden)[previous]?.querySelector('a').focus();
    });
    const panel = catalog.querySelector('[data-topics]');
    const toggle = catalog.querySelector('[data-filter-toggle]');
    if (toggle) {
      toggle.hidden = false;
      toggle.addEventListener('click', () => {
        panel.hidden = !panel.hidden;
        toggle.setAttribute('aria-expanded', String(!panel.hidden));
      });
    }
    if (query) query.form.hidden = false;
    window.addEventListener('popstate', restore);
    restore();
  }

  const board = $('[data-carousel]');
  if (board) {
    const track = board.querySelector('.notice-track');
    const cards = [...track.children];
    const dots = [...board.querySelectorAll('[data-board-dots] button')];
    board.querySelector('[data-board-nav]').hidden = false;
    board.querySelector('[data-board-dots]').hidden = false;
    const step = () => Math.max(1, cards[1].offsetLeft - cards[0].offsetLeft);
    const maxScroll = () => Math.max(0, track.scrollWidth - track.clientWidth);
    const current = () => {
      if (track.scrollLeft >= maxScroll() - 8) return cards.length - 1;
      return Math.min(cards.length - 1, Math.round(track.scrollLeft / step()));
    };
    const go = i => {
      const last = cards.length - 1;
      const target = i < 0 ? last : i > last ? 0 : i;
      const left = target === last ? maxScroll() : Math.min(target * step(), maxScroll());
      track.scrollTo({ left, behavior: 'smooth' });
    };
    const sync = () => {
      const index = current();
      dots.forEach((d, i) => d.setAttribute('aria-current', String(i === index)));
    };
    track.addEventListener('scroll', () => requestAnimationFrame(sync), { passive: true });
    board.querySelector('[data-prev]').addEventListener('click', () => go(current() - 1));
    board.querySelector('[data-next]').addEventListener('click', () => go(current() + 1));
    dots.forEach((d, i) => d.addEventListener('click', () => go(i)));
    track.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight') { e.preventDefault(); go(current() + 1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(current() - 1); }
    });
    let drag = null;
    let suppressClick = false;
    track.addEventListener('pointerdown', e => {
      if (e.pointerType !== 'mouse' || e.button !== 0) return;
      drag = { x: e.clientX, left: track.scrollLeft, moved: false };
    });
    window.addEventListener('pointermove', e => {
      if (!drag) return;
      const dx = e.clientX - drag.x;
      if (!drag.moved && Math.abs(dx) > 6) { drag.moved = true; track.classList.add('is-dragging'); }
      if (drag.moved) track.scrollLeft = drag.left - dx;
    });
    window.addEventListener('pointerup', () => {
      if (!drag) return;
      const moved = drag.moved;
      const dx = track.scrollLeft - drag.left;
      drag = null;
      track.classList.remove('is-dragging');
      if (moved) {
        suppressClick = true;
        setTimeout(() => { suppressClick = false; }, 50);
        go(dx > 24 ? 1 : dx < -24 ? 0 : current());
      }
    });
    track.addEventListener('click', e => { if (suppressClick) { e.preventDefault(); e.stopPropagation(); } }, true);
    track.addEventListener('dragstart', e => e.preventDefault());
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
      let paused = false;
      board.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') paused = true; });
      board.addEventListener('pointerleave', () => { paused = false; });
      board.addEventListener('focusin', () => { paused = true; });
      board.addEventListener('focusout', () => { paused = false; });
      setInterval(() => { if (!paused && !drag && !document.hidden) go(current() + 1); }, 10000);
    }
  }

  const viewBox = $('[data-views]');
  const guideList = $('.guide-list');
  if (viewBox && guideList) {
    const resetTilt = () => {
      guideList.querySelectorAll('[data-tilt]').forEach(card => {
        card.style.removeProperty('transform');
        card.style.removeProperty('--mouse-x');
        card.style.removeProperty('--mouse-y');
      });
    };
    const apply = view => {
      guideList.dataset.view = view;
      viewBox.querySelectorAll('[data-view]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.view === view)));
      if (view !== 'cards') resetTilt();
    };
    let saved = 'cards';
    try { saved = localStorage.getItem('portal-view') || 'cards'; } catch {}
    apply(saved === 'list' ? 'list' : 'cards');
    viewBox.hidden = false;
    viewBox.addEventListener('click', e => {
      const b = e.target.closest('[data-view]');
      if (!b) return;
      apply(b.dataset.view);
      try { localStorage.setItem('portal-view', b.dataset.view); } catch {}
    });

    // Efeito 3D de carta ao mover o mouse nos cards
    if (matchMedia('(hover: hover) and (pointer: fine)').matches && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
      guideList.querySelectorAll('[data-tilt]').forEach(card => {
        let frame = 0;
        card.addEventListener('pointermove', e => {
          if (guideList.dataset.view !== 'cards') return;
          if (frame) cancelAnimationFrame(frame);
          frame = requestAnimationFrame(() => {
            const r = card.getBoundingClientRect();
            const px = (e.clientX - r.left) / r.width;
            const py = (e.clientY - r.top) / r.height;
            const rx = ((0.5 - py) * 7).toFixed(2);
            const ry = ((px - 0.5) * 7).toFixed(2);
            card.style.setProperty('--mouse-x', `${(px * 100).toFixed(1)}%`);
            card.style.setProperty('--mouse-y', `${(py * 100).toFixed(1)}%`);
            card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-2px)`;
          });
        });
        card.addEventListener('pointerleave', () => {
          if (frame) cancelAnimationFrame(frame);
          card.style.removeProperty('transform');
        });
      });
    }
  }

  // Navegação por seções na página inicial (Início, Mural de avisos, Guias)
  if (document.body.classList.contains('is-home')) {
    const navLinks = all('[data-nav-link]');
    const homeTargets = [
      { key: '/', el: null },
      { key: '/#avisos', el: $('#avisos') },
      { key: '/#conteudos', el: $('#conteudos') }
    ];
    let navLock = 0;
    const setHomeNav = key => {
      navLinks.forEach(a => {
        if (a.dataset.navLink === key) a.setAttribute('aria-current', 'page');
        else a.removeAttribute('aria-current');
      });
    };
    const scrollToSection = (key, pushHash = true) => {
      const entry = homeTargets.find(t => t.key === key);
      if (!entry) return;
      navLock = Date.now() + 700;
      setHomeNav(key);
      if (menu.open) menu.close();
      const navH = ($('.masthead')?.offsetHeight || 58) + 18;
      const top = entry.el ? Math.max(0, entry.el.getBoundingClientRect().top + window.scrollY - navH) : 0;
      window.scrollTo({ top, behavior: 'smooth' });
      if (pushHash) {
        const hash = key.includes('#') ? key.slice(key.indexOf('#')) : '';
        history.replaceState(null, '', location.pathname + location.search + hash);
      }
    };
    document.addEventListener('click', e => {
      const a = e.target.closest('a[href]');
      if (!a) return;
      const raw = a.getAttribute('href');
      if (raw === './' || raw === '/') {
        e.preventDefault();
        scrollToSection('/');
      } else if (raw === './#avisos' || raw === '/#avisos' || raw === '#avisos') {
        e.preventDefault();
        scrollToSection('/#avisos');
      } else if (raw === './#conteudos' || raw === '/#conteudos' || raw === '#conteudos') {
        e.preventDefault();
        scrollToSection('/#conteudos');
      }
    });
    const syncHomeNav = () => {
      if (Date.now() < navLock) return;
      const offset = ($('.masthead')?.offsetHeight || 58) + 60;
      let active = '/';
      for (const t of homeTargets) {
        if (t.el && t.el.getBoundingClientRect().top <= offset) active = t.key;
      }
      setHomeNav(active);
    };
    window.addEventListener('scroll', () => requestAnimationFrame(syncHomeNav), { passive: true });
    if (location.hash === '#avisos' || location.hash === '#conteudos') {
      requestAnimationFrame(() => scrollToSection('/' + location.hash, false));
    }
  }

  // Índice lateral ("Nesta página") nos guias com travamento ao clicar
  const sections = all('.reading-section');
  if (sections.length) {
    const toc = all('[data-toc]');
    const mobileToc = $('.mobile-toc');
    let lockedId = '';
    let lockTimer = 0;

    function applyCurrent(id) {
      toc.forEach(a => {
        if (a.dataset.toc === id) a.setAttribute('aria-current', 'location');
        else a.removeAttribute('aria-current');
      });
    }

    toc.forEach(a => a.addEventListener('click', e => {
      const id = a.dataset.toc;
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      if (mobileToc) mobileToc.open = false;
      lockedId = id;
      clearTimeout(lockTimer);
      lockTimer = setTimeout(() => { lockedId = ''; }, 800);
      applyCurrent(id);
      const navH = ($('.masthead')?.offsetHeight || 58) + 22;
      const top = Math.max(0, target.getBoundingClientRect().top + window.scrollY - navH);
      window.scrollTo({ top, behavior: 'smooth' });
      history.replaceState(null, '', '#' + id);
    }));

    let scheduled = false;
    function highlight() {
      scheduled = false;
      if (lockedId) {
        applyCurrent(lockedId);
        return;
      }
      const offset = ($('.masthead')?.offsetHeight || 58) + 34;
      let current = sections[0];
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= offset) current = section;
        else break;
      }
      applyCurrent(current.id);
    }
    function schedule() { if (!scheduled) { scheduled = true; requestAnimationFrame(highlight); } }
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    window.addEventListener('load', highlight);
    if (location.hash) {
      const initial = sections.find(s => '#' + s.id === location.hash);
      if (initial) {
        lockedId = initial.id;
        applyCurrent(initial.id);
        setTimeout(() => { lockedId = ''; }, 600);
      }
    } else {
      highlight();
    }
  }

  const wifi = $('[data-wifi]');
  if (wifi) {
    const password = $('#network-password');
    const toggle = wifi.querySelector('[data-toggle-pass]');
    const copy = wifi.querySelector('[data-copy]');
    const status = wifi.querySelector('[data-copy-status]');
    const secret = password.textContent.trim();
    const mask = '•'.repeat(secret.length);
    let shown = false;
    function renderWifi() {
      password.textContent = shown ? secret : mask;
      toggle.textContent = shown ? 'Ocultar senha' : 'Mostrar senha';
      toggle.setAttribute('aria-pressed', String(shown));
    }
    toggle.addEventListener('click', () => { shown = !shown; renderWifi(); });
    copy.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(secret);
        status.textContent = 'Senha copiada para a área de transferência.';
      } catch {
        shown = true;
        renderWifi();
        status.textContent = 'Não foi possível copiar automaticamente. A senha foi exibida acima.';
      }
    });
    wifi.querySelector('.wifi-actions').hidden = false;
    renderWifi();
  }
})();
