import { brand, sectors } from './site.mjs';
import { escapeHtml, icon, link, supportLink } from './ui.mjs';

// Letra P sólida com a frente de um ônibus em espaço negativo (currentColor: preto no claro, branco no escuro).
const logo = `<svg class="brand-mark" width="26" height="26" viewBox="0 0 32 32" aria-hidden="true" fill="currentColor"><path fill-rule="evenodd" d="M5.5 28.5 9.3 11C10.1 7.2 12.9 4.8 17.3 4.8H20.2C25.2 4.8 28.3 8 28.3 12.4 28.3 17 25.2 20.4 20.4 20.4H11.7L10.1 28.5ZM13.7 8.4H24.3C25.2 8.4 26 9.2 26 10.1V15.4C26 16.3 25.2 17 24.3 17H13.7C12.8 17 12 16.3 12 15.4V10.1C12 9.2 12.8 8.4 13.7 8.4ZM15.1 9.9H22.9C23.4 9.9 23.8 10.3 23.8 10.8V12.9C23.8 13.4 23.4 13.8 22.9 13.8H15.1C14.6 13.8 14.2 13.4 14.2 12.9V10.8C14.2 10.3 14.6 9.9 15.1 9.9Z"/><circle cx="15.6" cy="15.3" r=".8"/><circle cx="22.4" cy="15.3" r=".8"/></svg>`;
const brandLink = `<a class="brand" href="/">${logo}<span>${brand}</span></a>`;
const destinations = [
  ['Início', '/', 'home'],
  ['Mural de avisos', '/#avisos', 'bell'],
  ['Biblioteca', '/pesquisa/', 'guides']
];

function navigation(current, mobile = false) {
  const items = mobile ? [...destinations, ['Benefícios', '/beneficios/', 'badge'], ['Links úteis', '/diretoriosdelinks/', 'external']] : destinations;
  return items.map(([label, href, glyph]) => `<a href="${href}"${current === href ? ' aria-current="page"' : ''}>${mobile ? icon(glyph, 17) : ''}${label}</a>`).join('');
}

const searchTrigger = `<a class="search-trigger" href="/pesquisa/" data-search aria-haspopup="dialog" aria-controls="search-dialog" aria-keyshortcuts="Control+K Meta+K" aria-label="Buscar no portal">
  ${icon('search', 16)}<span>Buscar<span class="wide-label"> no portal</span></span><kbd data-shortcut>Ctrl K</kbd></a>`;

function header(current) {
  return `<header class="masthead"><div class="wrap topbar">${brandLink}
  <nav class="primary-nav" aria-label="Principal">${navigation(current)}</nav>
  <div class="header-tools">${searchTrigger}${supportLink('header-support', 'Falar com o Tráfego')}
  <button type="button" id="menu-toggle" class="icon-button" aria-label="Abrir menu" aria-haspopup="dialog" aria-controls="menu" hidden>${icon('menu', 20)}</button>
  <noscript><a class="icon-button menu-fallback" href="#rodape" aria-label="Ir para a navegação do rodapé">${icon('menu', 20)}</a></noscript></div>
  </div></header>`;
}

function dialogs(current) {
  return `<dialog id="menu" class="menu-dialog" aria-labelledby="menu-title">
    <div class="dialog-head"><h2 id="menu-title">Menu</h2><button class="icon-button" data-close aria-label="Fechar menu">${icon('close', 18)}</button></div>
    <nav aria-label="Menu do celular">${navigation(current, true)}</nav>${supportLink('menu-support')}
  </dialog>
  <dialog id="search-dialog" class="search-dialog" aria-labelledby="search-title">
    <h2 class="sr-only" id="search-title">Busca no portal</h2>
    <div class="command-field">${icon('search', 20)}<input id="command-input" type="search" role="combobox" aria-autocomplete="list" aria-expanded="true" aria-controls="command-results" aria-label="Buscar páginas ou assuntos" placeholder="Buscar páginas ou assuntos…" autocomplete="off" spellcheck="false">
      <button class="command-close" data-close aria-label="Fechar busca"><span>Esc</span>${icon('close', 17)}</button></div>
    <div class="command-group" id="command-group">Sugestões</div>
    <div id="command-results" role="listbox" aria-labelledby="command-group"></div><p class="command-status" role="status"></p>
    <template id="command-option"><a role="option" tabindex="-1"><span class="result-icon">${icon('file', 16)}</span>
      <span class="result-copy"><strong></strong><small></small></span><span class="result-key">${icon('return', 15)}</span></a></template>
    <div class="command-bottom"><div class="keyboard-help"><span><kbd>↑</kbd><kbd>↓</kbd> Navegar</span><span><kbd>↵</kbd> Abrir</span></div>
    ${link('Abrir biblioteca', '/pesquisa/', 'command-library', 'arrow')}</div>
  </dialog>`;
}

function footer(onHome) {
  const year = new Date().getUTCFullYear();
  return `<footer id="rodape"><div class="wrap">
    <div class="foot-main"${onHome ? ' id="contato"' : ''}>
      <div class="foot-id">${brandLink}<p>Guias, avisos e serviços para a rotina de quem dirige.</p></div>
      <nav class="foot-nav" aria-label="Navegação do rodapé">
        ${link('Início', '/', 'foot-link')}${link('Mural de avisos', '/#avisos', 'foot-link')}${link('Guias e procedimentos', '/#conteudos', 'foot-link')}${link('Links úteis', '/diretoriosdelinks/', 'foot-link')}
      </nav>
      ${supportLink('button button-outline foot-support', 'Falar com o Tráfego')}
    </div>
    <div class="foot-legal"><small>© ${year} ${brand}</small><nav aria-label="Informações legais">
      ${link('Privacidade', 'https://euoryan.com/politica/', 'foot-link')}${link('Termos de uso', 'https://euoryan.com/termos/', 'foot-link')}
    </nav></div>
  </div></footer>`;
}

export function layout(title, description, body, current = '', noindex = false) {
  const pageTitle = escapeHtml(title ? `${title} · ${brand}` : brand);
  return `<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${pageTitle}</title><meta name="description" content="${escapeHtml(description)}"><meta name="application-name" content="${brand}">
<meta name="apple-mobile-web-app-title" content="${brand}"><meta name="theme-color" content="#fafafb" media="(prefers-color-scheme: light)"><meta name="theme-color" content="#121316" media="(prefers-color-scheme: dark)">
<meta property="og:title" content="${pageTitle}"><meta property="og:description" content="${escapeHtml(description)}"><meta property="og:site_name" content="${brand}">
${noindex ? '<meta name="robots" content="noindex">' : ''}<link rel="icon" type="image/svg+xml" href="/assets/favicon.svg?v=5"><link rel="apple-touch-icon" href="/assets/apple-touch-icon.png?v=5">
<link rel="preload" href="/assets/fonts/geist-latin.woff2" as="font" type="font/woff2" crossorigin><link rel="stylesheet" href="/assets/css/styles.css"><script src="/assets/js/app.js" defer></script></head>
<body class="${current === '/' ? 'is-home' : 'is-inner'}"><a class="skip" href="#principal">Pular para o conteúdo</a>${header(current)}
${body}
${footer(current === '/')}${dialogs(current)}</body></html>
`;
}

export function breadcrumbs(title, inLibrary = true) {
  return `<nav class="crumbs" aria-label="Caminho da página"><a href="/">Início</a>${icon('chevron', 12)}${inLibrary ? `<a href="/pesquisa/">Biblioteca</a>${icon('chevron', 12)}` : ''}<span aria-current="page">${escapeHtml(title)}</span></nav>`;
}

export function sectorCredit(guide) {
  const names = guide.sectors.map(id => sectors[id]);
  return `<dl class="credit"><dt>${icon('layers', 14)}${names.length > 1 ? 'Setores responsáveis' : 'Setor responsável'}</dt>${names.map(name => `<dd>${escapeHtml(name)}</dd>`).join('')}</dl>`;
}

export function state(title, description, action = 'Voltar ao início', href = '/', credit = '') {
  return `<main id="principal" class="state wrap">${logo}<h1>${escapeHtml(title)}</h1><p>${escapeHtml(description)}</p>${credit}${link(action, href, 'button button-outline', 'arrow')}</main>`;
}
