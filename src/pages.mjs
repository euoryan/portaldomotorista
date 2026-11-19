import { categoryNames, guideOrder, notices, workLinks } from './site.mjs';
import { breadcrumbs, sectorCredit, state } from './layout.mjs';
import { escapeHtml, icon, link, supportLink } from './ui.mjs';

const noticeDate = new Intl.DateTimeFormat('pt-BR', {
  day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC'
});

function noticeRow(item, open) {
  const date = item.date ? `<time datetime="${escapeHtml(item.date)}">${noticeDate.format(new Date(item.date + 'T12:00:00Z'))}</time>` : '';
  return `<details class="notice-item"${open ? ' open' : ''}><summary><span>${date}${escapeHtml(item.title)}</span>${icon('down', 15)}</summary>
    <p>${escapeHtml(item.text)}</p></details>`;
}

export function noticeBoard(items) {
  const first = items.slice(0, 2).map((item, i) => noticeRow(item, i === 0)).join('');
  const rest = items.slice(2);
  const more = rest.length ? `<details class="older-notices"><summary>Ver mais avisos (${rest.length}) ${icon('down', 14)}</summary>${rest.map(item => noticeRow(item, false)).join('')}</details>` : '';
  return `<section id="avisos" class="notice-board${items.length ? '' : ' board-empty'}" aria-labelledby="mural-title">
    <div class="board-heading"><span class="board-icon">${icon('bell', 18)}</span><h2 id="mural-title">Mural de avisos</h2></div>
    ${items.length ? `<div class="board-posts">${first}${more}</div>` : '<p class="notice-empty">Nenhum aviso publicado no momento.</p>'}
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
  const illustration = guide.icon
    ? `<img src="/assets/images/atalhos/${guide.icon}.webp" alt="" width="46" height="46" decoding="async">`
    : icon('book', 23);
  return `<li data-guide="${guide.slug}" data-category="${guide.category}" data-terms="${escapeHtml(searchText(guide))}">
    <a class="guide-row" href="/${guide.slug}/"><span class="guide-art">${illustration}</span>
      <div class="guide-label"><${heading}>${escapeHtml(guide.title)}</${heading}>
      <p>${guide.status ? `<span class="guide-status">${escapeHtml(guide.status)}</span>` : escapeHtml(guide.summary)}</p></div>
      ${icon('chevron', 15)}</a></li>`;
}

function catalogue(guides, onHome) {
  const tabs = [['', 'Todos'], ...Object.entries(categoryNames)];
  const filters = `<div class="topic-filters" role="group" aria-label="Filtrar por assunto" data-topics hidden>
    ${tabs.map(([id, label]) => `<button type="button" data-topic="${id}" aria-pressed="${id === ''}">${label}</button>`).join('')}
  </div>`;
  const search = `<form class="library-search" role="search" action="/pesquisa/" hidden>${icon('search', 17)}
    <input type="search" name="q" aria-label="Pesquisar na biblioteca" placeholder="Pesquisar por assunto" autocomplete="off"></form>`;
  return `<section class="catalogue" id="conteudos" data-catalog data-page-size="${onHome ? 8 : 0}" aria-label="Guias e procedimentos">
    <div class="catalog-toolbar">${onHome ? '<h2>Guias e procedimentos</h2>' : search}${filters}</div>
    <p class="${onHome ? 'sr-only' : 'result-count'}" data-count role="status">${guides.length} conteúdos</p>
    <ul class="guide-list">${guides.map(g => guideEntry(g, onHome ? 'h3' : 'h2')).join('')}</ul>
    <div class="no-results" hidden>${icon('search', 23)}<h3>Nenhum conteúdo encontrado</h3>
      <p>Tente outro assunto ou limpe a busca.</p>${link('Limpar filtros', onHome ? '/#conteudos' : '/pesquisa/', 'button button-outline')}</div>
    <button class="more-guides button button-outline" type="button" data-more hidden>Mostrar mais ${icon('down', 15)}</button>
  </section>`;
}

export function home(guides) {
  const rank = new Map(guideOrder.map((slug, index) => [slug, index]));
  const ordered = [...guides].sort((a, b) => (rank.get(a.slug) ?? rank.size) - (rank.get(b.slug) ?? rank.size));
  return `<main id="principal" class="wrap home-layout">
    <header class="home-heading"><h1>Guia de Jornada</h1></header>
    ${noticeBoard(notices)}${catalogue(ordered, true)}${shortcuts()}
  </main>`;
}

export function library(guides) {
  return `<main id="principal" class="wrap library">${breadcrumbs('Biblioteca', false)}
    <header class="page-heading"><h1>Biblioteca</h1></header>${catalogue(guides, false)}</main>`;
}

export function article(guide, guides) {
  if (guide.status) return state(guide.title, guide.statusMessage || 'As orientações estão em revisão e serão publicadas aqui.', 'Ver outros guias', '/#conteudos', sectorCredit(guide));
  const toc = `<nav class="toc-links" aria-label="Seções do guia">${guide.sections.map(s => `<a href="#${s.id}" data-toc="${s.id}">${escapeHtml(s.title)}</a>`).join('')}</nav>`;
  function relevance(g) {
    return Number(g.category === guide.category) + Number(g.sectors.some(id => guide.sectors.includes(id)));
  }
  const related = guides.filter(g => g.slug !== guide.slug && !g.status).sort((a, b) => relevance(b) - relevance(a)).slice(0, 2);
  return `<main id="principal" class="wrap article-shell">${breadcrumbs(guide.title)}
    <div class="article-layout"><article class="reading">
      <header class="reading-head"><div class="doc-intro"><div><h1>${escapeHtml(guide.title)}</h1>
      <p class="deck">${escapeHtml(guide.summary)}</p></div><img class="doc-thumb" src="/assets/images/${guide.image}" width="100" height="76" loading="lazy" alt=""></div>
      ${sectorCredit(guide)}</header>
      <details class="mobile-toc"><summary>${icon('list', 16)} Nesta página ${icon('down', 14)}</summary>${toc}</details>
      ${guide.sections.map(s => `<section class="reading-section" id="${s.id}"><h2>${escapeHtml(s.title)}</h2>${s.html}</section>`).join('')}
      <nav class="related" aria-label="Leituras relacionadas"><h2>Outros guias</h2><div>
        ${related.map(g => link(g.title, `/${g.slug}/`, 'related-link', 'arrow')).join('')}</div></nav>
    </article><aside class="rail"><div class="rail-inner"><h2>${icon('list', 15)}Nesta página</h2>${toc}
      <div class="rail-help">${supportLink('foot-link')}</div></div></aside></div>
  </main>`;
}
