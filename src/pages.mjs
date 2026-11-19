import { categoryNames, guideOrder, notices, workLinks } from './site.mjs';
import { breadcrumbs, sectorCredit, state } from './layout.mjs';
import { escapeHtml, icon, link, supportLink } from './ui.mjs';

const noticeDate = new Intl.DateTimeFormat('pt-BR', {
  day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC'
});

function noticeCard(item) {
  const date = item.date ? `<time datetime="${escapeHtml(item.date)}">${noticeDate.format(new Date(item.date + 'T12:00:00Z'))}</time>` : '';
  const action = item.href ? `<a class="notice-action" href="${escapeHtml(item.href)}"><span>${escapeHtml(item.cta || 'Saiba mais')}</span>${icon('arrow', 14)}</a>` : '';
  const photo = item.image ? `<img class="notice-photo" src="${escapeHtml(item.image)}" alt="" loading="lazy">` : '';
  return `<li class="notice-card" data-tone="${item.tone || 'info'}">${photo}
    <span class="notice-glyph">${icon(item.icon || 'bell', 18)}</span>
    <div class="notice-copy"><div class="notice-head"><div class="notice-title-wrap">${date}<h3>${escapeHtml(item.title)}</h3></div>${action}</div><p>${escapeHtml(item.text)}</p></div></li>`;
}

export function noticeBoard(items) {
  const many = items.length > 1;
  const controls = many ? `<div class="board-nav" hidden data-board-nav><button type="button" class="icon-button" data-prev aria-label="Aviso anterior">${icon('back', 16)}</button><button type="button" class="icon-button" data-next aria-label="Próximo aviso">${icon('arrow', 16)}</button></div>` : '';
  const dots = many ? `<div class="board-dots" hidden data-board-dots>${items.map((_, i) => `<button type="button" aria-label="Aviso ${i + 1}" aria-current="${i === 0}"></button>`).join('')}</div>` : '';
  return `<section id="avisos" class="notice-board${items.length ? '' : ' board-empty'}" aria-labelledby="mural-title"${many ? ' data-carousel' : ''}>
    <div class="board-heading"><span class="board-tag">${icon('bell', 14)}<span id="mural-title">Mural de avisos</span></span>${controls}</div>
    ${items.length ? `<ul class="notice-track" tabindex="0" aria-label="Avisos">${items.map(noticeCard).join('')}</ul>${dots}` : '<p class="notice-empty">Nenhum aviso publicado no momento.</p>'}
  </section>`;
}

function shortcuts() {
  return `<aside class="shortcuts" aria-labelledby="shortcuts-title"><h2 id="shortcuts-title">Acesso rápido</h2><ul>
    ${workLinks.map(item => `<li><a href="${item.href}" target="_blank" rel="noopener noreferrer">${icon(item.icon, 16)}<span>${item.label}</span>${icon('diagonal', 14)}</a></li>`).join('')}
  </ul></aside>`;
}

export function searchText(guide) {
  return [guide.title, guide.summary, guide.terms, categoryNames[guide.category], ...guide.sections.map(s => s.title)].join(' ');
}

function guideEntry(guide, heading) {
  const thumb = guide.cover || guide.slug;
  const cover = `<span class="guide-cover"><img src="/assets/images/pages/${thumb}/thumb/${thumb}.png" alt="" width="500" height="300" loading="lazy" decoding="async"></span>`;
  const illustration = guide.icon
    ? `<img src="/assets/images/atalhos/${guide.icon}.webp" alt="" width="46" height="46" decoding="async">`
    : icon('book', 23);
  return `<li data-guide="${guide.slug}" data-category="${guide.category}" data-terms="${escapeHtml(searchText(guide))}">
    <a class="guide-row" href="/${guide.slug}/" data-tilt>${cover}<span class="guide-art">${illustration}</span>
      <div class="guide-label"><div class="guide-title-row"><${heading}>${escapeHtml(guide.title)}</${heading}>${icon('chevron', 15)}</div>
      <p>${guide.status ? `<span class="guide-status">${escapeHtml(guide.status)}</span>` : escapeHtml(guide.summary)}</p></div></a></li>`;
}

function catalogue(guides, onHome) {
  const tabs = [['', 'Todos'], ...Object.entries(categoryNames)];
  const filters = `<div class="topic-filters" id="topic-panel" role="group" aria-label="Filtrar por assunto" data-topics hidden>
    ${tabs.map(([id, label]) => `<button type="button" data-topic="${id}" aria-pressed="${id === ''}">${label}</button>`).join('')}
  </div>`;
  const tools = onHome ? '' : `<div class="library-tools"><form class="library-search" role="search" action="/pesquisa/" hidden>${icon('search', 17)}
    <input type="search" name="q" aria-label="Pesquisar na biblioteca" placeholder="Pesquisar por assunto" autocomplete="off"></form>
    <button type="button" class="button button-outline filter-toggle" data-filter-toggle aria-expanded="false" aria-controls="topic-panel" hidden>${icon('filter', 15)}<span>Filtrar</span></button></div>${filters}`;
  const viewToggle = `<div class="view-toggle" role="group" aria-label="Modo de exibição" data-views hidden>
    <button type="button" data-view="cards" aria-pressed="true" aria-label="Ver em cards">${icon('grid', 16)}<span>Cards</span></button>
    <button type="button" data-view="list" aria-pressed="false" aria-label="Ver em lista">${icon('rows', 16)}<span>Lista</span></button></div>`;
  return `<section class="catalogue" id="conteudos" data-catalog data-page-size="${onHome ? 8 : 0}" aria-label="Guias e procedimentos">
    <div class="catalog-toolbar">${onHome ? `<div class="section-title"><h2>Guias e procedimentos</h2><p>Tudo o que você precisa para a rotina de viagem.</p></div>` : `<div class="library-top">${tools}</div>`}${viewToggle}</div>
    <p class="${onHome ? 'sr-only' : 'result-count'}" data-count role="status">${guides.length} conteúdos</p>
    <ul class="guide-list" data-view="cards">${guides.map(g => guideEntry(g, onHome ? 'h3' : 'h2')).join('')}</ul>
    <div class="no-results" hidden>${icon('search', 23)}<h3>Nenhum conteúdo encontrado</h3>
      <p>Tente outro assunto ou limpe a busca.</p>${link('Limpar filtros', onHome ? '/#conteudos' : '/pesquisa/', 'button button-outline')}</div>
    <button class="more-guides button button-outline" type="button" data-more hidden>Mostrar mais ${icon('down', 15)}</button>
  </section>`;
}

export function home(guides) {
  const rank = new Map(guideOrder.map((slug, index) => [slug, index]));
  const ordered = [...guides].sort((a, b) => (rank.get(a.slug) ?? rank.size) - (rank.get(b.slug) ?? rank.size));
  return `<main id="principal" class="home-layout">
    <section class="hero"><div class="wrap">
      <header class="home-heading"><div class="hero-copy"><p class="eyebrow">Portal do Motorista</p><h1>Guia de Jornada</h1>
        <p class="lede">Avisos, procedimentos e serviços para a sua rotina.</p></div>
        <form class="hero-search" role="search" action="/pesquisa/">${icon('search', 18)}<input type="search" name="q" aria-label="Pesquisar no portal" placeholder="Pesquisar guias e procedimentos" autocomplete="off"><button class="button button-primary" type="submit">Buscar</button></form>
      </header>
    </div></section>
    <div class="wrap home-body">${noticeBoard(notices)}${catalogue(ordered, true)}${shortcuts()}</div>
  </main>`;
}

export function library(guides) {
  return `<main id="principal" class="wrap library">${breadcrumbs('Biblioteca', false)}
    <header class="page-heading"><h1>Biblioteca</h1></header>${catalogue(guides, false)}</main>`;
}

export function article(guide, guides) {
  if (guide.status) return state(guide.title, guide.statusMessage || 'As orientações estão em revisão e serão publicadas aqui.', 'Ver outros guias', '/#conteudos', sectorCredit(guide));
  const toc = `<nav class="toc-links" aria-label="Seções do guia">${guide.sections.map((s, i) => `<a href="#${s.id}" data-toc="${s.id}"${i === 0 ? ' aria-current="location"' : ''}>${escapeHtml(s.title)}</a>`).join('')}</nav>`;
  function relevance(g) {
    return Number(g.category === guide.category) + Number(g.sectors.some(id => guide.sectors.includes(id)));
  }
  const related = guides.filter(g => g.slug !== guide.slug && !g.status).sort((a, b) => relevance(b) - relevance(a)).slice(0, 3);
  return `<main id="principal" class="wrap article-shell">${breadcrumbs(guide.title)}
    <div class="article-layout"><article class="reading">
      <header class="reading-head"><h1>${escapeHtml(guide.title)}</h1>
      <p class="deck">${escapeHtml(guide.summary)}</p>
      ${sectorCredit(guide)}</header>
      <details class="mobile-toc"><summary>${icon('list', 16)}<span>Nesta página</span>${icon('down', 14)}</summary>${toc}</details>
      ${guide.sections.map(s => `<section class="reading-section" id="${s.id}"><h2>${escapeHtml(s.title)}</h2>${s.html}</section>`).join('')}
    </article><aside class="rail"><div class="rail-inner"><h2>${icon('list', 15)}<span>Nesta página</span></h2>${toc}
      <div class="rail-help">${supportLink('button button-outline')}</div></div></aside></div>
    <nav class="related" aria-label="Outros guias"><h2>Continue lendo</h2><ul>
      ${related.map(g => {
        const thumb = g.cover || g.slug;
        return `<li><a class="related-card" href="/${g.slug}/"><img src="/assets/images/pages/${thumb}/thumb/${thumb}.png" alt="" width="500" height="300" loading="lazy"><span><strong>${escapeHtml(g.title)}</strong><small>${escapeHtml(g.summary)}</small></span></a></li>`;
      }).join('')}</ul></nav>
  </main>`;
}
