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
  const masthead = $('.masthead');
  new ResizeObserver(() => {
    document.documentElement.style.setProperty('--header-height', masthead.offsetHeight + 'px');
  }).observe(masthead);
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
    const nav = board.querySelector('[data-board-nav]');
    const indicators = board.querySelector('[data-board-dots]');
    const dots = [...indicators.children];
    let stops = [];
    board.dataset.ready = '';

    function position() {
      return stops.reduce((nearest, left, i) =>
        Math.abs(left - track.scrollLeft) < Math.abs(stops[nearest] - track.scrollLeft) ? i : nearest, 0);
    }

    function markPosition() {
      const active = position();
      dots.forEach((dot, i) => dot.setAttribute('aria-current', String(i === active)));
    }

    function measure() {
      const last = Math.max(0, track.scrollWidth - track.clientWidth);
      const start = cards[0].offsetLeft;
      stops = [];
      for (const card of cards) {
        const left = Math.min(last, card.offsetLeft - start);
        if (!stops.length || left - stops.at(-1) > 1) stops.push(left);
      }
      const scrolls = stops.length > 1;
      nav.hidden = indicators.hidden = !scrolls;
      if (scrolls) track.tabIndex = 0;
      else track.removeAttribute('tabindex');
      dots.forEach((dot, i) => { dot.hidden = i >= stops.length; });
      markPosition();
    }

    function go(index) {
      const target = (index + stops.length) % stops.length;
      track.scrollTo({ left: stops[target], behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    }

    measure();
    new ResizeObserver(measure).observe(track);
    track.addEventListener('scroll', markPosition, { passive: true });
    nav.querySelector('[data-prev]').addEventListener('click', () => go(position() - 1));
    nav.querySelector('[data-next]').addEventListener('click', () => go(position() + 1));
    dots.forEach((dot, i) => dot.addEventListener('click', () => go(i)));
    track.addEventListener('keydown', event => {
      if (stops.length < 2 || !['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
      event.preventDefault();
      go(position() + (event.key === 'ArrowRight' ? 1 : -1));
    });

    let drag;
    let suppressClick = false;
    track.addEventListener('pointerdown', event => {
      if (event.pointerType === 'mouse' && event.button === 0 && stops.length > 1)
        drag = { x: event.clientX, left: track.scrollLeft, index: position() };
    });
    window.addEventListener('pointermove', event => {
      if (!drag) return;
      const delta = drag.x - event.clientX;
      if (Math.abs(delta) > 6) track.classList.add('is-dragging');
      if (track.classList.contains('is-dragging')) track.scrollLeft = drag.left + delta;
    });
    window.addEventListener('pointerup', () => {
      if (drag && track.classList.contains('is-dragging')) {
        const delta = track.scrollLeft - drag.left;
        const target = Math.abs(delta) > 24 ? drag.index + Math.sign(delta) : position();
        track.classList.remove('is-dragging');
        go(target);
        suppressClick = true;
        setTimeout(() => { suppressClick = false; }, 0);
      }
      drag = null;
    });
    track.addEventListener('click', event => {
      if (suppressClick) { event.preventDefault(); event.stopPropagation(); }
    }, true);
    track.addEventListener('dragstart', event => event.preventDefault());
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

  const sections = all('.reading-section');
  if (sections.length) {
    const toc = all('[data-toc]');
    const index = $('.article-index');
    let scheduled = false;
    function highlight() {
      scheduled = false;
      const offset = masthead.getBoundingClientRect().bottom + 38;
      let active = sections[0];
      for (const section of sections) {
        if (section.getBoundingClientRect().top > offset) break;
        active = section;
      }
      toc.forEach(link => {
        if (link.dataset.toc === active.id) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }
    function schedule() {
      if (!scheduled) { scheduled = true; requestAnimationFrame(highlight); }
    }
    index.addEventListener('click', event => {
      const link = event.target.closest('[data-toc]');
      if (!link) return;
      index.open = false;
      document.getElementById(link.dataset.toc).focus({ preventScroll: true });
    });
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    window.addEventListener('pageshow', schedule);
    highlight();
  }

  const wifi = $('.wifi-access');
  if (wifi) {
    const password = wifi.querySelector('#network-password');
    const toggle = wifi.querySelector('[data-toggle-pass]');
    const status = wifi.querySelector('.copy-status');
    function showPassword(show) {
      password.type = show ? 'text' : 'password';
      toggle.textContent = show ? 'Ocultar senha' : 'Mostrar senha';
      toggle.setAttribute('aria-pressed', String(show));
    }
    showPassword(false);
    toggle.addEventListener('click', () => showPassword(password.type === 'password'));
    wifi.querySelector('[data-copy]').addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(password.value);
        status.textContent = 'Senha copiada.';
      } catch {
        showPassword(true);
        password.select();
        status.textContent = 'Senha selecionada. Use a opção Copiar do celular.';
      }
    });
    wifi.querySelector('.wifi-actions').hidden = false;
  }
})();
