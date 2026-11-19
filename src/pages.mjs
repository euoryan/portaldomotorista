import { categoryNames, featuredSlugs, notices, sectors, urls } from './site.mjs';
import { breadcrumbs, guideCard, sectorLinks, state } from './layout.mjs';
import { escapeHtml, icon, link, supportLink } from './ui.mjs';

const libraryLink = link('Ver biblioteca','/pesquisa/','section-link','arrow');

export function home(guides) {
  const shortcuts = [['Ficha mecânica', urls.mechanic], ['Links úteis', '/diretoriosdelinks/'], ['Wi-Fi', '/wifimotoristas/']];
  const highlights = featuredSlugs.map(slug => guideCard(guides.find(g => g.slug === slug))).join('');
  return `<main id="principal">
    <section class="hero"><picture><source media="(max-width: 700px)" srcset="/assets/images/jornada-dd-mobile.webp"><img src="/assets/images/jornada-dd.webp" width="2160" height="720" alt="Ônibus rodoviário de dois andares na estrada" fetchpriority="high"></picture>
    <div class="wrap hero-inner"><div class="hero-copy"><h1>Guia de Jornada</h1><p>Consulte as orientações da sua rota, encontre formulários e acompanhe os avisos da equipe.</p>
    <form class="hero-search" role="search" action="/pesquisa/">${icon('search',20)}<input aria-label="Pesquisar na biblioteca" type="search" name="q" placeholder="O que você precisa encontrar?"><button aria-label="Pesquisar na biblioteca">${icon('arrow',18)}</button></form></div></div></section>
    <div class="quick-strip"><div class="wrap quick-inner"><span>Acesso rápido</span>${shortcuts.map(([label,href]) => link(label,href,'quick-link',href.startsWith('https:') ? 'external' : 'diagonal')).join('')}</div></div>
    <div class="wrap home-content"><section id="conteudos"><div class="section-head"><h2>Guias em destaque</h2>${libraryLink}</div><div class="guides-grid">${highlights}</div></section>
    <div class="home-lower"><section id="avisos"><h2>Avisos</h2>${notices.length ? notices.map(n => `<article class="notice"><h3>${escapeHtml(n.title)}</h3><p>${escapeHtml(n.text)}</p></article>`).join('') : `<div class="notice empty-notice">${icon('announcement',22)}<p>Nenhum aviso no momento.</p></div>`}</section>
    <section><h2>Por setor</h2><div class="sector-directory">${Object.entries(sectors).map(([id,label]) => link(label,`/pesquisa/?setor=${id}`,'sector-row','chevron')).join('')}</div></section></div></div></main>`;
}

export function library(guides) {
  return `<main id="principal" class="wrap library">${breadcrumbs('Biblioteca',false)}<header class="library-head"><h1>Biblioteca</h1><p>Encontre guias, procedimentos e acessos por assunto ou setor.</p></header>
  <form class="filters" role="search" action="/pesquisa/"><label class="library-query">${icon('search')}<input type="search" id="library-query" name="q" aria-label="Pesquisar na biblioteca" placeholder="Pesquisar por assunto"></label>
  <label><span>Setor</span><select name="setor"><option value="">Todos os setores</option>${Object.entries(sectors).map(([id,label]) => `<option value="${id}">${label}</option>`).join('')}</select></label>
  <label><span>Categoria</span><select name="categoria"><option value="">Todas as categorias</option>${Object.entries(categoryNames).map(([id,label]) => `<option value="${id}">${label}</option>`).join('')}</select></label></form>
  <p class="result-count" role="status">${guides.length} conteúdos</p><div class="guides-grid library-grid">${guides.map(g => `<div data-guide="${g.slug}" data-sectors="${g.sectors.join(' ')}" data-category="${g.category}" data-terms="${escapeHtml(searchText(g))}">${guideCard(g)}</div>`).join('')}</div>
  <div class="no-results" hidden><h2>Nenhum conteúdo encontrado</h2><p>Tente outro assunto ou limpe os filtros.</p>${link('Limpar filtros','/pesquisa/','button button-outline')}</div></main>`;
}

export function searchText(g) {
  return [g.title,g.summary,g.terms,...g.sectors.map(id=>sectors[id]),categoryNames[g.category],...g.sections.map(s=>s.title)].join(' ');
}

export function article(guide, guides) {
  if (guide.status) return state(guide.title,guide.statusMessage || 'Este guia está em revisão. Você poderá consultá-lo aqui quando for publicado.','Consultar a biblioteca','/pesquisa/',guide.sectors.map(id=>sectors[id]).join(' · '));
  const toc = `<nav class="toc-links" aria-label="Seções do guia">${guide.sections.map(s => `<a href="#${s.id}" data-toc="${s.id}">${s.title}</a>`).join('')}</nav>`;
  const related = guides.filter(g => g.slug !== guide.slug && !g.status).sort((a,b) => score(b)-score(a)).slice(0,2);
  function score(g) { return Number(g.category === guide.category) + 2 * Number(g.sectors.some(s=>guide.sectors.includes(s))); }
  return `<main id="principal" class="wrap article-shell">${breadcrumbs(guide.title)}<div class="article-layout"><article class="reading">
    <header class="reading-head"><span class="article-type">${categoryNames[guide.category]}</span><h1>${guide.title}</h1><p class="deck">${guide.summary}</p>
    <div class="byline"><span>${guide.sectors.length > 1 ? 'Setores responsáveis' : 'Setor responsável'}</span><div>${sectorLinks(guide)}</div></div></header>
    <details class="mobile-toc"><summary>${icon('list',17)} Nesta página ${icon('down',15)}</summary>${toc}</details>
    ${guide.sections.map(s => `<section class="reading-section" id="${s.id}"><h2>${s.title}</h2>${s.html}</section>`).join('')}
    <nav class="related" aria-label="Continue a leitura"><h2>Continue a leitura</h2>${related.map(g=>link(g.title,`/${g.slug}/`,'sector-row','arrow')).join('')}</nav></article>
    <aside class="rail"><div class="rail-inner"><strong>Nesta página</strong>${toc}<div class="rail-help">${supportLink('foot-link')}</div></div></aside></div></main>`;
}
