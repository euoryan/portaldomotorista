import { brand, sectors } from './site.mjs';
import { escapeHtml, icon, link, supportLink } from './ui.mjs';

const logo = `<img src="/assets/favicon.svg?v=2" width="34" height="34" alt="">`;
const brandLink = `<a class="brand" href="/">${logo}<span>${brand}</span></a>`;
const navItems = [['Início','/'], ['Biblioteca','/pesquisa/'], ['Avisos','/#avisos']];
function nav(current, mobile = false) {
  const items = mobile ? [...navItems, ['Benefícios','/beneficios/'], ['Links úteis','/diretoriosdelinks/']] : navItems;
  return items.map(([label,href]) => `<a href="${href}"${current === href ? ' aria-current="page"' : ''}>${label}</a>`).join('');
}

const searchLink = `<a href="/pesquisa/" class="search-trigger" data-search aria-label="Pesquisar no portal">${icon('search',18)}<span>Pesquisar</span><kbd data-shortcut>Ctrl K</kbd></a>`;
const dialogs = `<dialog id="menu" class="menu-dialog" aria-labelledby="menu-title">
  <div class="dialog-head"><strong id="menu-title">Menu</strong><button type="button" data-close aria-label="Fechar menu">${icon('close')}</button></div>
  <nav aria-label="Menu do celular">${nav('',true)}</nav>${supportLink('button button-outline')}</dialog>
  <dialog id="search-dialog" class="search-dialog" aria-labelledby="search-title"><h2 class="sr-only" id="search-title">Pesquisa no portal</h2>
  <div class="command-field">${icon('search',21)}<input id="command-input" type="search" role="combobox" aria-autocomplete="list" aria-expanded="true" aria-controls="command-results" aria-label="Pesquisar páginas ou assuntos" placeholder="Pesquisar páginas ou assuntos" autocomplete="off"><button type="button" data-close aria-label="Fechar pesquisa">${icon('close')}</button></div>
  <div id="command-results" role="listbox" aria-label="Resultados"></div><p class="command-status" role="status"></p>
  <a class="command-library" href="/pesquisa/">Abrir biblioteca ${icon('arrow',15)}</a></dialog>`;

export function layout(title, description, body, current = '', noindex = false) {
  const pageTitle = escapeHtml(title ? `${title} · ${brand}` : brand);
  return `<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${pageTitle}</title><meta name="description" content="${escapeHtml(description)}"><meta name="application-name" content="${brand}">
<meta name="apple-mobile-web-app-title" content="${brand}"><meta name="theme-color" content="#132334">
<meta property="og:title" content="${pageTitle}"><meta property="og:description" content="${escapeHtml(description)}"><meta property="og:site_name" content="${brand}">
${noindex ? '<meta name="robots" content="noindex">' : ''}<link rel="icon" type="image/svg+xml" href="/assets/favicon.svg?v=2"><link rel="apple-touch-icon" href="/assets/apple-touch-icon.png">
<link rel="preload" href="/assets/fonts/geist-latin.woff2" as="font" type="font/woff2" crossorigin><link rel="stylesheet" href="/assets/css/styles.css"><script src="/assets/js/app.js" defer></script></head>
<body><a class="skip" href="#principal">Pular para o conteúdo</a><header class="masthead"><div class="wrap topbar">${brandLink}
<nav class="primary-nav" aria-label="Principal">${nav(current)}</nav><div class="header-tools">${searchLink}${supportLink('header-support')}<button id="menu-toggle" type="button" aria-label="Abrir menu" aria-haspopup="dialog" aria-controls="menu">${icon('menu',21)}</button></div></div></header>
${body}
<footer id="rodape"><div class="wrap foot"${current === '/' ? ' id="contato"' : ''}><div>${brandLink}</div><nav aria-label="Rodapé">${link('Privacidade','https://euoryan.com/politica/','foot-link')}${link('Termos','https://euoryan.com/termos/','foot-link')}${supportLink('foot-link')}</nav></div></footer>
${dialogs}</body></html>
`;
}

export function breadcrumbs(title, inLibrary = true) {
  return `<nav class="crumbs" aria-label="Caminho da página"><a href="/">Início</a>${icon('chevron',12)}${inLibrary ? `<a href="/pesquisa/">Biblioteca</a>${icon('chevron',12)}` : ''}<span aria-current="page">${escapeHtml(title)}</span></nav>`;
}

export function sectorLinks(guide) {
  return guide.sectors.map(id => link(sectors[id],`/pesquisa/?setor=${id}`,'sector-link')).join('<span aria-hidden="true"> · </span>');
}

export function guideCard(guide) {
  return `<a class="guide-card" href="/${guide.slug}/"><div class="card-cover"><img width="416" height="230" loading="lazy" src="/assets/images/${guide.image}" alt=""></div><div class="card-info">
    <small>${guide.status || guide.sectors.map(id => id === 'dlv' ? 'DLV' : sectors[id]).join(' · ')}</small>
    <h3>${guide.title} ${icon('arrow',17)}</h3><p>${guide.summary}</p></div></a>`;
}

export function state(title, description, action = 'Voltar ao início', href = '/', owner = '') {
  return `<main id="principal" class="state wrap"><img src="/assets/favicon.svg?v=2" alt="" width="44" height="44">
  ${owner ? `<span class="state-owner">${owner}</span>` : ''}<h1>${title}</h1><p>${description}</p>${link(action,href,'button button-outline','arrow')}</main>`;
}
