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
    try {
      const index = await getIndex();
      if (version !== drawVersion) return;
      const filtered = tokens.length
        ? index.filter(row => matches(row.title + ' ' + row.detail + ' ' + row.terms, tokens))
            .sort((a, b) => Number(matches(b.title, tokens)) - Number(matches(a.title, tokens)))
        : index.filter(row => row.href === '/#avisos' || row.href.startsWith('https:'));
      const options = filtered.slice(0,16).map((row,i) => {
        const a = $('#command-option').content.firstElementChild.cloneNode(true);
        a.href = row.href.startsWith('/') ? new URL(row.href.slice(1),siteRoot).href : row.href;
        a.id = 'result-'+i;
        if (row.href.startsWith('https:')) { a.target='_blank'; a.rel='noopener noreferrer'; }
        a.querySelector('strong').textContent = row.title;
        a.querySelector('small').textContent = row.detail;
        return a;
      });
      results.replaceChildren(...options);
      status.textContent = options.length ? '' : 'Nenhum resultado. Tente outro assunto.';
      select(0);
    } catch {
      if (version !== drawVersion) return;
      results.replaceChildren(); select(-1);
      status.textContent = 'A pesquisa está indisponível. Consulte a biblioteca abaixo.';
    }
  }
  function openSearch() {
    if (search.open) return;
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

  const sections = all('.reading-section');
  if (sections.length) {
    const toc = all('[data-toc]');
    const mobileToc = $('.mobile-toc');
    toc.forEach(a=>a.addEventListener('click',()=>{ mobileToc.open = false; }));
    let scheduled = false;
    function highlight() {
      const offset = $('.masthead').offsetHeight + 40;
      let current = sections[0];
      for (const section of sections) {
        if (section.getBoundingClientRect().top > offset) break;
        current = section;
      }
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) current = sections.at(-1);
      toc.forEach(a=>{
        if (a.dataset.toc === current.id) a.setAttribute('aria-current','location');
        else a.removeAttribute('aria-current');
      });
      scheduled = false;
    }
    function schedule() { if (!scheduled) { scheduled = true; requestAnimationFrame(highlight); } }
    window.addEventListener('scroll',schedule,{passive:true});
    window.addEventListener('resize',schedule);
    window.addEventListener('load',highlight);
    highlight();
  }
  const password = $('#network-password');
  if (password) {
    if (matchMedia('(max-width: 600px)').matches) $('.wifi-qr').open = false;
    password.type = 'password';
    $('.wifi-actions').hidden = false;
    const toggle = $('[data-toggle-pass]');
    toggle.addEventListener('click',()=>{
      const show = password.type === 'password';
      password.type = show ? 'text' : 'password';
      toggle.textContent = show ? 'Ocultar senha' : 'Mostrar senha';
      toggle.setAttribute('aria-pressed',String(show));
    });
    $('[data-copy]').addEventListener('click',async()=>{
      try { await navigator.clipboard.writeText(password.value); $('.copy-status').textContent = 'Senha copiada.'; }
      catch { if (password.type === 'password') toggle.click(); password.select(); $('.copy-status').textContent = 'Senha selecionada. Use o comando Copiar do celular.'; }
    });
  }
})();
