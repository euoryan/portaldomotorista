import { brand, sectors } from './site.mjs';
import { escapeHtml, icon, link, supportLink } from './ui.mjs';

// Marca do portal: PNG transparente usado como máscara, então segue a cor do texto (preto no claro, branco no escuro).
const logo = '<span class="brand-mark" aria-hidden="true"></span>';
const brandLink = `<a class="brand" href="/">${logo}<span>${brand}</span></a>`;
const destinations = [
  ['Início', '/', 'home'],
  ['Mural de avisos', '/#avisos', 'bell'],
  ['Guias', '/#conteudos', 'book'],
  ['Biblioteca', '/pesquisa/', 'guides']
];

const sidebarGuides = [
  ['Guia para novos motoristas', '/guianovos/'],
  ['Em caso de sinistro', '/sinistro/'],
  ['Nossas regras', '/nossasregras/'],
  ['Guia Intelbras', '/guiaintelbras/'],
  ['Diretório de links', '/diretoriosdelinks/'],
  ['Benefícios e parceiros', '/beneficios/'],
  ['Wi-Fi dos motoristas', '/wifimotoristas/'],
  ['Bonificação', '/bonificacao/']
];

function navigation(current) {
  return destinations.map(([label, href]) => `<a href="${href}" data-nav-link="${href}"${current === href ? ' aria-current="page"' : ''}>${label}</a>`).join('');
}

function sidebarNav(current) {
  const mainLinks = destinations.map(([label, href, glyph]) =>
    `<a href="${href}" data-nav-link="${href}"${current === href ? ' aria-current="page"' : ''}>${icon(glyph, 16)}<span>${label}</span></a>`).join('');
  const guideLinks = sidebarGuides.map(([label, href]) =>
    `<a href="${href}"${current === href ? ' aria-current="page"' : ''}>${icon('file', 15)}<span>${label}</span></a>`).join('');
  return `<div class="sidebar-group"><p class="sidebar-label">Navegação</p><nav aria-label="Navegação principal">${mainLinks}</nav></div>
    <div class="sidebar-group"><p class="sidebar-label">Guias e páginas</p><nav aria-label="Guias do portal">${guideLinks}</nav></div>`;
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
    <div class="dialog-head">${brandLink}<span class="sr-only" id="menu-title">Menu de navegação</span><button class="icon-button" data-close aria-label="Fechar menu">${icon('close', 18)}</button></div>
    <div class="sidebar-body">${sidebarNav(current)}</div>
    <div class="sidebar-foot">${supportLink('button button-outline menu-support', 'Falar com o Tráfego')}</div>
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
      <div class="foot-id">${brandLink}<p>Guias, avisos e serviços para a rotina de quem dirige.</p>${supportLink('button button-outline foot-support', 'Falar com o Tráfego')}</div>
      <div class="foot-cols">
        <div class="foot-col"><h3>Portal</h3><nav aria-label="Seções do portal">
          ${link('Início', '/', 'foot-link')}${link('Mural de avisos', '/#avisos', 'foot-link')}${link('Guias e procedimentos', '/#conteudos', 'foot-link')}${link('Biblioteca', '/pesquisa/', 'foot-link')}
        </nav></div>
        <div class="foot-col"><h3>Guias</h3><nav aria-label="Guias operacionais">
          ${link('Novos motoristas', '/guianovos/', 'foot-link')}${link('Em caso de sinistro', '/sinistro/', 'foot-link')}${link('Nossas regras', '/nossasregras/', 'foot-link')}${link('Guia Intelbras', '/guiaintelbras/', 'foot-link')}
        </nav></div>
        <div class="foot-col"><h3>Serviços</h3><nav aria-label="Serviços e recursos">
          ${link('Diretório de links', '/diretoriosdelinks/', 'foot-link')}${link('Benefícios e parceiros', '/beneficios/', 'foot-link')}${link('Wi-Fi dos motoristas', '/wifimotoristas/', 'foot-link')}${link('Bonificação', '/bonificacao/', 'foot-link')}
        </nav></div>
      </div>
    </div>
    <div class="foot-sub"><span class="foot-copy">${logo}<small>© ${year} ${brand}</small></span><nav aria-label="Informações legais">
      ${link('Privacidade', 'https://euoryan.com/politica/', 'foot-link')}${link('Termos', 'https://euoryan.com/termos/', 'foot-link')}
    </nav></div>
  </div></footer>`;
}

export function layout(title, description, body, current = '', noindex = false) {
  const pageTitle = escapeHtml(title ? `${title} · ${brand}` : brand);
  return `<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${pageTitle}</title><meta name="description" content="${escapeHtml(description)}"><meta name="application-name" content="${brand}">
<meta name="apple-mobile-web-app-title" content="${brand}"><meta name="theme-color" content="#fafafa" media="(prefers-color-scheme: light)"><meta name="theme-color" content="#09090b" media="(prefers-color-scheme: dark)">
<meta property="og:title" content="${pageTitle}"><meta property="og:description" content="${escapeHtml(description)}"><meta property="og:site_name" content="${brand}">
${noindex ? '<meta name="robots" content="noindex">' : ''}<link rel="icon" type="image/svg+xml" href="/assets/favicon.svg?v=6"><link rel="apple-touch-icon" href="/assets/apple-touch-icon.png?v=6">
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
