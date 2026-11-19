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
  function openMenu() { menu.showModal(); }
  $('#menu-toggle').addEventListener('click',openMenu);
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
    try {
      const index = await getIndex();
      if (version !== drawVersion) return;
      const filtered = index.filter(row => tokens.length ? matches(row.title+' '+row.detail+' '+row.terms,tokens) : !row.href.includes('#') && row.href !== '/');
      if (tokens.length) filtered.sort((a,b) => Number(matches(b.title,tokens))-Number(matches(a.title,tokens)));
      const options = filtered.slice(0,16).map((row,i) => {
        const a = document.createElement('a');
        a.href = row.href.startsWith('/') ? new URL(row.href.slice(1),siteRoot).href : row.href;
        a.id = 'result-'+i;
        a.tabIndex = -1;
        a.setAttribute('role','option');
        if (row.href.startsWith('https:')) { a.target='_blank'; a.rel='noopener noreferrer'; }
        const title = document.createElement('strong');
        const subtitle = document.createElement('small');
        title.textContent = row.title;
        subtitle.textContent = row.detail;
        a.append(title,subtitle);
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
  input.addEventListener('keydown',e=>{
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); select(selected+(e.key === 'ArrowDown' ? 1 : -1),true); }
    if (e.key === 'Enter' && selected >= 0) { e.preventDefault(); results.children[selected].click(); }
  });

  const filters = $('.filters');
  if (filters) {
    const cards = all('[data-guide]');
    const paramNames = ['q','setor','categoria'];
    function restore() {
      const url = new URL(location.href);
      for (const name of paramNames) filters.elements[name].value = url.searchParams.get(name) || '';
      filter(false);
    }
    function filter(updateURL) {
      const {q,setor,categoria} = filters.elements;
      const tokens = terms(q.value);
      let count = 0;
      for (const card of cards) {
        const data = card.dataset;
        card.hidden = !matches(data.terms,tokens) || (setor.value && !data.sectors.split(' ').includes(setor.value)) || (categoria.value && data.category !== categoria.value);
        if (!card.hidden) count++;
      }
      $('.result-count').textContent = count + (count === 1 ? ' conteúdo' : ' conteúdos');
      $('.no-results').hidden = count > 0;
      if (updateURL) {
        const url = new URL(location.href);
        for (const name of paramNames) {
          const value = filters.elements[name].value.trim();
          if (value) url.searchParams.set(name,value); else url.searchParams.delete(name);
        }
        history.replaceState(null,'',url);
      }
    }
    filters.addEventListener('input',()=>filter(true));
    filters.addEventListener('submit',e=>{ e.preventDefault(); filter(true); });
    window.addEventListener('popstate',restore);
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
