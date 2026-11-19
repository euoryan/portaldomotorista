/* Portal do Motorista. Interface e conteúdo operacional. */
(() => {
'use strict';
const page = document.body.dataset.page || 'home';
const root = document.body.dataset.depth === '1' ? '../' : './';
const asset = (rel) => `${root}assets/images/${rel}`;
const img = (name) => asset(`${name}.webp`);
const url = (path) => `${root}${path}`;
const favicon = asset('favicon/portal.svg');
const TG = 'https://t.me/oppmotorista';
const icons = {
  bus:'<rect x="4" y="3" width="16" height="16" rx="3"/><path d="M4 11h16M8 19v2m8-2v2M8 15h.01M16 15h.01M8 3v8m8-8v8"/>',
  arrow:'<path d="M5 12h14m-6-6 6 6-6 6"/>', chevron:'<path d="m9 18 6-6-6-6"/>',
  down:'<path d="m6 9 6 6 6-6"/>', menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',
  x:'<path d="M18 6 6 18M6 6l12 12"/>',book:'<path d="M12 7v14m0-14C9.5 5.5 6.7 5 3 5v13c4 0 7 .5 9 2 2-1.5 5-2 9-2V5c-3.7 0-6.5.5-9 2Z"/>',
  shield:'<path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z"/><path d="m9 12 2 2 4-4"/>',
  alert:'<path d="m10.3 3.3-8 14A2 2 0 0 0 4 20h16a2 2 0 0 0 1.7-2.7l-8-14a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4m0 4h.01"/>',
  link:'<path d="M10 13a5 5 0 0 0 7.1 0l2.1-2.1a5 5 0 0 0-7.1-7.1l-1.2 1.2M14 11a5 5 0 0 0-7.1 0l-2.1 2.1a5 5 0 0 0 7.1 7.1l1.2-1.2"/>',
  award:'<circle cx="12" cy="8" r="6"/><path d="m8.2 13-1.4 9 5.2-2.8 5.2 2.8-1.4-9"/>',
  wifi:'<path d="M2 9a15 15 0 0 1 20 0M5 12a10 10 0 0 1 14 0M8.5 15.5a5 5 0 0 1 7 0M12 19h.01"/>',
  clipboard:'<rect x="5" y="5" width="14" height="16" rx="2"/><path d="M9 5.5h6V3H9v2.5Zm0 8 2 2 4-4"/>',
  headset:'<path d="M3 13v-2a9 9 0 0 1 18 0v2M3 13h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Zm18 0h-3a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-5Zm-3 7a5 5 0 0 1-5 2h-1"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  location:'<path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
  message:'<path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5 9 9 0 0 1-4-.9L3 21l1.9-5.5a9 9 0 0 1-.9-4A8.5 8.5 0 0 1 12.5 3 8.5 8.5 0 0 1 21 11.5Z"/>',
  external:'<path d="M14 3h7v7M10 14 21 3"/><path d="M20 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5"/>',
  copy:'<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>',
  check:'<path d="m5 12 4 4L19 6"/>',
  checkcircle:'<circle cx="12" cy="12" r="9"/><path d="m8 12 2.5 2.5L16 9"/>',
  lock:'<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
  search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
  calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4m10-4v4M3 10h18"/>',
  users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/>',
  file:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6M8 13h8m-8 4h8"/>',
  camera:'<path d="M14 4H9L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-4l-2-3Z"/><circle cx="12" cy="13" r="3"/>',
  mic:'<rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 10a7 7 0 0 0 14 0M12 17v5m-4 0h8"/>',
  phone:'<path d="M22 16.9v3a2 2 0 0 1-2.2 2A19.7 19.7 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7l.4 3a2 2 0 0 1-.6 1.7L7 10a16 16 0 0 0 7 7l1.6-1.9a2 2 0 0 1 1.7-.6l3 .4a2 2 0 0 1 1.7 2Z"/>',
  route:'<circle cx="6" cy="18" r="2"/><path d="M9 18h7a4 4 0 0 0 0-8h-8a4 4 0 0 1 0-8h8"/><circle cx="18" cy="2" r="2"/>',
  gift:'<rect x="3" y="9" width="18" height="12" rx="2"/><path d="M12 9v12M3 13h18M12 9S4 9 4 5a3 3 0 0 1 6 0c0 2 2 4 2 4Zm0 0s8 0 8-4a3 3 0 0 0-6 0c0 2-2 4-2 4Z"/>',
  info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v5m0-8h.01"/>',
  settings:'<circle cx="12" cy="12" r="3"/><path d="M19 13.5a1.7 1.7 0 0 0 .3 1.9l.1.1-1.9 1.9-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6V19h-2.8v-.2a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1-1.9-1.9.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.6-1H5v-2.8h.2a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1L8.3 5l.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.6V4h2.8v.2a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19 7.3l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v2.8h-.2a1.7 1.7 0 0 0-1.2.4Z"/>',
  help:'<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 0 1 5 0c0 2-2.5 2-2.5 4m0 4h.01"/>',
  eye:'<path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z"/><circle cx="12" cy="12" r="2.5"/>',
  home:'<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1V10Z"/>',
  megaphone:'<path d="m3 11 14-6v14L3 13v-2Z"/><path d="M11.6 16.7 13 21H8l-1.7-6.1M21 9v6"/>',
  arrowleft:'<path d="M19 12H5m6-6-6 6 6 6"/>',
  heart:'<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0l-1 1-1-1a5.5 5.5 0 1 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/>',
  upload:'<path d="M12 16V3m-5 5 5-5 5 5M4 17v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3"/>'
};
const I=(name,size=20)=>`<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name] || icons.info}</svg>`;
const links = [
 {id:'sinistro',path:'sinistro/',title:'Procedimentos de sinistro',label:'Segurança',tag:'PROCEDIMENTO',desc:'O que fazer em acidente ou colisão, com registro e comunicação ao Operacional.',iconImg:'icons/onibus.png',cover:'sinistro.webp',icon:'alert',category:'operacao',time:'5 min'},
 {id:'guianovos',path:'guianovos/',title:'Guia novos motoristas',label:'Primeiros passos',tag:'INTEGRAÇÃO',desc:'Telegram, bot de rotas, cadastro e contato do operacional.',iconImg:'icons/monchila.png',cover:'integracao.webp',icon:'book',category:'guias',time:'7 min'},
 {id:'nossasregras',path:'nossasregras/',title:'Nossas regras',label:'Manual',tag:'DIRETRIZES',desc:'Normas e procedimentos essenciais do serviço de transporte.',iconImg:'icons/livros.png',cover:'regras.webp',icon:'clipboard',category:'guias',time:'9 min'},
 {id:'diretoriosdelinks',path:'diretoriosdelinks/',title:'Diretório de links',label:'Acessos',tag:'FERRAMENTAS',desc:'Atalhos para sistemas e recursos do dia a dia.',iconImg:'icons/aneis.png',cover:'diretorio.webp',icon:'link',category:'recursos',time:'3 min'},
 {id:'guiaintelbras',path:'guiaintelbras/',title:'Guia Intelbras',label:'Contrato',tag:'GUIA DO CONTRATO',desc:'Portal, início de viagem, cartão de acesso e rotas.',iconImg:'icons/camera.png',cover:'intelbras.webp',icon:'route',category:'operacao',time:'6 min'},
 {id:'beneficios',path:'beneficios/',title:'Benefícios parceiros',label:'Vantagens',tag:'BENEFÍCIOS',desc:'Descontos e vantagens das parcerias da empresa.',iconImg:'icons/descontos.png',cover:'beneficios.webp',icon:'award',category:'recursos',time:'3 min'},
 {id:'wifimotoristas',path:'wifimotoristas/',title:'Wi-Fi motoristas',label:'Conectividade',tag:'REDES WI-FI',desc:'Rede exclusiva com senha e QR Code.',iconImg:'icons/wifi.png',cover:'wifi.webp',icon:'wifi',category:'recursos',time:'2 min'},
 {id:'restrito',path:'bonificacao/',title:'Bonificação',label:'Em configuração',tag:'CONTEÚDO EM REVISÃO',desc:'As regras de bonificação serão publicadas após a revisão do conteúdo.',iconImg:'icons/bonificacao.png',cover:'bonificacao.webp',icon:'award',category:'recursos',time:null}
];
const lookup = Object.fromEntries(links.map(item=>[item.id,item]));
const contactButton=(label='Falar com Operacional',cls='btn btn-primary')=>`<a class="${cls}" href="${TG}" target="_blank" rel="noopener noreferrer">${I('headset',17)}<span>${label}</span></a>`;
const extBtn=(href,label,icon='external')=>`<a class="btn btn-secondary" href="${href}" target="_blank" rel="noopener noreferrer">${I(icon,17)} ${label}</a>`;
const brandLink=()=>`<a class="brand" href="${url('index.html')}" aria-label="Voltar ao início do Portal do Motorista"><span class="brand-symbol"><img src="${favicon}" alt="" width="30" height="30"></span><span class="brand-type"><strong>Portal do Motorista</strong></span></a>`;
function header(){
 return `<header class="site-header" id="top"><div class="container-wide header-inner">
  ${brandLink()}
  <nav class="desktop-nav" aria-label="Navegação principal"><a class="${page==='home'?'nav-active':''}" href="${url('index.html')}">Início</a><a href="${url('index.html#avisos')}">Avisos</a><a href="${url('index.html#conteudos')}">Procedimentos</a><a href="${url('beneficios/')}">Benefícios</a><a href="${url('diretoriosdelinks/')}">Links úteis</a></nav>
  <div class="header-actions"><button class="header-search" type="button" data-open-search>${I('search',16)}<span>Buscar</span><kbd>Ctrl K</kbd></button>${contactButton('Falar com Operacional','btn btn-primary btn-header')}<button class="header-icon mobile-search-trigger" type="button" data-open-search aria-label="Abrir busca">${I('search',19)}</button><button class="menu-toggle" id="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-nav" aria-label="Abrir menu">${I('menu',19)}</button></div>
 </div></header>
 <div id="mobile-nav" class="mobile-drawer" aria-hidden="true" inert><button class="drawer-backdrop" type="button" data-close-menu tabindex="-1" aria-label="Fechar menu"></button><aside class="drawer-panel" role="dialog" aria-modal="true" aria-label="Menu de navegação"><div class="drawer-header">${brandLink()}<button class="header-icon drawer-close" type="button" data-close-menu aria-label="Fechar menu">${I('x',19)}</button></div><button class="drawer-search" type="button" data-open-search>${I('search',17)}<span>Buscar no portal</span><kbd>Ctrl K</kbd></button><nav class="drawer-nav" aria-label="Navegação móvel"><span class="drawer-label">Navegação</span><a href="${url('index.html')}">${I('home',17)}<span>Início</span>${I('chevron',15)}</a><a href="${url('index.html#avisos')}">${I('megaphone',17)}<span>Avisos</span>${I('chevron',15)}</a><a href="${url('index.html#conteudos')}">${I('book',17)}<span>Guias e procedimentos</span>${I('chevron',15)}</a><a href="${url('beneficios/')}">${I('gift',17)}<span>Benefícios</span>${I('chevron',15)}</a><a href="${url('diretoriosdelinks/')}">${I('link',17)}<span>Links úteis</span>${I('chevron',15)}</a></nav><div class="drawer-footer"><span class="drawer-label">Suporte</span>${contactButton('Falar com Operacional','drawer-support')}</div></aside></div>`;
}
function footer(){
  return `<div class="footer-anchor" id="rodape"></div>`;
}
function loadRemoteFooter(){
  const anchor=document.querySelector('.footer-anchor');
  if(!anchor) return;
  const fallback=()=>{
    anchor.innerHTML=`<footer class="footer eu-ft"><div class="eu-ft-in"><span class="eu-ft-c">© Portal do Motorista</span><nav class="eu-ft-nav" aria-label="Rodapé"><a class="eu-ft-a" href="${TG}" target="_blank" rel="noopener noreferrer">Suporte</a></nav></div></footer>`;
  };
  fetch('https://raw.githubusercontent.com/euoryan/euoryan.github.io/refs/heads/main/assets/pages/footer.html')
    .then(r=>r.ok?r.text():Promise.reject())
    .then(html=>{
      const temp=document.createElement('div');
      temp.innerHTML=html.trim();
      const ft=temp.querySelector('footer');
      if(ft){anchor.appendChild(ft);} else {fallback();}
    })
    .catch(fallback);
}
function imgCard(item, compact=false){
  return `<a class="content-card content-card-${item.category} ${compact?'content-card-compact':''}" href="${url(item.path)}">
    <div class="card-cover"><img src="${asset(item.cover)}${item.id==='restrito'?'?v=6':''}" alt="" loading="lazy"/><span class="card-cover-label">${item.label}</span></div>
    <div class="card-content">
      <div class="card-kicker">${item.tag}</div>
      <div class="card-title">${item.title}</div>
      <p>${item.desc}</p>
      <div class="card-foot"><span>${I('clock',13)} ${item.time?item.time+' de leitura':'Em configuração'}</span><span class="card-link">Ver conteúdo ${I('chevron',14)}</span></div>
    </div>
  </a>`;
}
function quickTile(item,label,description){return `<a href="${url(item.path)}" class="quick-tile"><span class="quick-tile-icon"><img src="${asset(item.iconImg)}?v=6" alt="" width="52" height="52"></span><span class="quick-tile-text"><strong>${label||item.title}</strong><small>${description||item.desc}</small></span><span class="quick-tile-arrow">${I('arrow',17)}</span></a>`;}
function contactBand(){return `<section id="contato" class="contact-band">
  <div class="contact-mark contact-support-icon">${I('headset',34)}</div>
  <div class="contact-copy">
    <div class="eyebrow">CONTATO OPERACIONAL</div>
    <h2>Precisa falar com a equipe?</h2>
    <p>Use o Telegram para tirar dúvidas sobre rotas, procedimentos ou a operação.</p>
  </div>
  ${contactButton('Abrir @oppmotorista','btn btn-primary btn-large')}
</section>`;}
function notices(){return `<section id="avisos" class="notices-section" aria-labelledby="notices-title">
  <div class="section-heading notices-heading"><div><div class="eyebrow">AVISOS DA OPERAÇÃO</div><h2 id="notices-title">Comunicados importantes</h2><p>Atualizações e orientações da equipe ficam reunidas aqui.</p></div><span class="status-badge"><span></span> Sem avisos ativos</span></div>
  <div class="notice-card"><span class="notice-icon">${I('info',20)}</span><div><strong>Nenhum aviso publicado no momento</strong><p>Quando a operação publicar um comunicado, ele aparecerá nesta área para consulta rápida.</p></div></div>
</section>`;}
function home(){
 return `<main>
 <section class="home-hero"><div class="container-wide hero-inner">
   <div class="hero-copy">
     <div class="eyebrow"><span class="eyebrow-dot"></span> PORTAL DO MOTORISTA</div>
     <h1>Guia de Jornada</h1>
     <p>Procedimentos, acessos, benefícios e orientações para acompanhar sua rotina de trabalho.</p>
     <div class="hero-actions"><a class="btn btn-primary btn-large" href="${url('index.html#conteudos')}">${I('book',18)} Ver procedimentos ${I('arrow',17)}</a><a class="btn btn-secondary btn-large" href="${url('guianovos/')}">Sou novo por aqui ${I('arrow',17)}</a></div>
     <div class="hero-proof">${I('checkcircle',16)} Feito para consultar pelo celular, onde você estiver</div>
   </div>
   <figure class="hero-visual"><img src="${img('hero-bus')}" alt="Ônibus de transporte rodoviário" fetchpriority="high"/><figcaption><span>${I('checkcircle',15)} Conteúdo organizado para consulta rápida</span><small>Atualizado pela equipe operacional</small></figcaption></figure>
 </div></section>
 <div class="container-wide main-home">
  ${notices()}
  <section class="quick-section" aria-labelledby="quick-label"><div class="section-label" id="quick-label">COMECE POR AQUI <span class="section-label-line"></span></div><div class="quick-grid">${quickTile(lookup.guianovos,'Sou novo por aqui','Primeiros passos e integração.')}${quickTile(lookup.beneficios,'Benefícios e bonificação','Conheça vantagens e condições.')}${quickTile(lookup.diretoriosdelinks,'Preciso de um link','Acesse formulários e sistemas.')}</div></section>
  <section id="conteudos" class="catalog-section" aria-labelledby="catalog-title"><div class="section-heading"><div><div class="eyebrow">CONSULTA RÁPIDA</div><h2 id="catalog-title">Guias e procedimentos</h2><p>Encontre orientações, serviços e acessos organizados por assunto.</p></div><div class="catalog-count">08 CONTEÚDOS</div></div>
    <div class="filter-bar" role="group" aria-label="Filtrar conteúdos"><div class="filter-buttons"><button class="filter-button is-active" data-filter="todos" aria-pressed="true">Todos</button><button class="filter-button" data-filter="guias" aria-pressed="false">Guias</button><button class="filter-button" data-filter="operacao" aria-pressed="false">Operação</button><button class="filter-button" data-filter="recursos" aria-pressed="false">Recursos</button></div><label class="search-field">${I('search',18)}<input id="card-search" aria-label="Pesquisar conteúdos" placeholder="Buscar conteúdo..." autocomplete="off" /></label></div>
    <div id="content-grid" class="content-grid">${links.map(item=>`<div class="filter-item" data-category="${item.category}" data-search="${(item.title+' '+item.desc+' '+item.tag).toLowerCase()}">${imgCard(item)}</div>`).join('')}</div>
    <div id="empty-state" class="empty-state" hidden>${I('search',25)}<strong>Nenhum conteúdo encontrado</strong><span>Tente outra palavra ou escolha uma categoria diferente.</span><button class="btn btn-secondary" id="clear-filters">Limpar filtros</button></div>
  </section>
  ${contactBand()}
 </div></main>`;
}
const breadcrumb=(item)=>`<div class="breadcrumbs"><a href="${url('index.html')}">Início</a>${I('chevron',13)}<span>${item.title}</span></div>`;
const intro=(label,content)=>`<div class="article-intro"><div class="article-intro-label">${I('info',16)} ${label}</div><p>${content}</p></div>`;
const section=(id,title,body,kicker)=>`<section class="article-section" id="${id}">${kicker?`<span class="section-overline">${kicker}</span>`:''}<h2>${title}</h2>${body}</section>`;
const prose=(p)=>`<p>${p}</p>`;
const bullet=(arr)=>`<ul class="article-list">${arr.map(x=>`<li>${I('check',16)}<span>${x}</span></li>`).join('')}</ul>`;
const processSteps=(steps)=>`<div class="steps-list">${steps.map((step,i)=>`<div class="step-row"><div class="step-index">${String(i+1).padStart(2,'0')}</div><div class="step-content"><h3>${step.title}</h3><p>${step.desc}</p>${step.extra||''}</div>${I(step.icon||'checkcircle',19)}</div>`).join('')}</div>`;
const tip=(title,desc,kind='blue')=>`<div class="tip tip-${kind}">${I(kind==='red'?'alert':'info',20)}<div><strong>${title}</strong><p>${desc}</p></div></div>`;
const faq=(items)=>`<div class="faq-list">${items.map((x)=>`<details class="faq-item"><summary>${x[0]}${I('down',18)}</summary><div class="faq-answer">${x[1]}</div></details>`).join('')}</div>`;
const panelLink=(icon,label,desc,href)=>{
  const external=/^https?:\/\//i.test(href);
  const attrs=external?`href="${href}" target="_blank" rel="noopener noreferrer"`:`href="${url(href)}"`;
  return `<a ${attrs} class="resource-link"><span class="resource-icon">${I(icon,21)}</span><span><strong>${label}</strong><small>${desc}</small></span>${I(external?'external':'arrow',17)}</a>`;
};
const wifiCard=(name,pass,qrFile,subtitle)=>`<article class="wifi-card"><div class="wifi-card-main"><div class="wifi-network"><span class="wifi-network-icon">${I('wifi',22)}</span><span><small>REDE DISPONÍVEL</small><strong>${name}</strong></span></div><p>${subtitle}</p><div class="wifi-pass-label">SENHA DE ACESSO</div><div class="password-bar"><code class="password-value" data-secret="${pass}">••••••••••••••</code><button class="show-password" type="button" aria-label="Mostrar senha" data-show-pass="${pass}">${I('eye',17)}</button><button type="button" class="copy-btn" data-copy="${pass}">${I('copy',16)} Copiar</button></div><div class="wifi-note">${I('shield',15)} <span>Rede destinada aos motoristas nas áreas autorizadas.</span></div></div><div class="wifi-qr"><div class="wifi-qr-frame"><img src="${root}assets/images/${qrFile}.png" alt="QR Code para conectar à rede ${name}" loading="lazy"/></div><strong>Conectar por QR Code</strong><span>Abra a câmera do celular e aponte para o código.</span></div></article>`;
const buttonRow=(...btns)=>`<div class="button-row">${btns.join('')}</div>`;
const content = {
 sinistro:{sub:'SEGURANÇA E OPERAÇÃO',heading:'Procedimento em caso de sinistro de trânsito',excerpt:'Siga este procedimento em acidente ou colisão. Prioridade: segurança das pessoas, comunicação ao Operacional e registro correto para apuração.',read:'5 MIN DE LEITURA',toc:[['primeiro','Primeiras medidas'],['passos','Passo a passo'],['orientacoes','Orientações finais'],['dlv','Setor DLV']],body:()=>`
 ${intro('ANTES DE TUDO','A segurança das pessoas vem primeiro. Em qualquer ocorrência, preserve o local, identifique se há feridos e comunique o Operacional assim que for seguro.')}
 <div class="emergency-card"><span class="emergency-icon">${I('phone',24)}</span><div><span>EMERGÊNCIA COM FERIDOS</span><strong>192 <small>SAMU · Atendimento de urgência</small></strong></div><a href="tel:192" class="btn btn-danger">${I('phone',16)} Ligar 192</a></div>
 ${buttonRow(`<a class="btn btn-primary" href="${TG}" target="_blank" rel="noopener noreferrer">${I('message',17)} Comunicar Operacional</a>`,`<a class="btn btn-secondary" href="tel:192">${I('phone',17)} Ligar SAMU 192</a>`)}
 ${section('primeiro','O que fazer primeiro',prose('Siga a ordem abaixo quando houver condições seguras. Em dúvida, priorize a segurança e acione o Operacional.')+bullet(['Avalie a segurança do local antes de sair do veículo.','Acione o SAMU (192) ou outro serviço adequado se houver feridos.','Não discuta responsabilidades, não assuma culpa e não firme compromissos de pagamento no local.']))}
 ${section('passos','Passo a passo',processSteps([
   {title:'Verificação da segurança dos passageiros',desc:'Logo após o acidente, verifique se todos os passageiros estão bem e identifique possíveis feridos. Havendo feridos, acione o SAMU pelo 192. Com segurança, sinalize o local.',icon:'shield',extra:tip('Importante','No local, não discuta responsabilidades, não assuma culpa e não firme compromissos de pagamento.','red')},
   {title:'Comunicação ao setor Operacional',desc:'Comunique imediatamente ao Operacional pelo Telegram. Informe local, condições dos passageiros e circunstâncias conhecidas. Depois, siga as orientações do setor.',icon:'message',extra:buttonRow(`<a class="btn btn-secondary" href="${TG}" target="_blank" rel="noopener noreferrer">${I('message',17)} Abrir Telegram</a>`)},
   {title:'Registro fotográfico da ocorrência',desc:'Assim que for seguro, fotografe o local e os veículos. As fotos devem permitir identificar: posição dos veículos na via e placas; veículos de todos os lados, incluindo danos; danos nos veículos da empresa e de terceiros; CNH e CRLV do terceiro envolvido. Anote também um telefone de contato do terceiro.',icon:'camera',extra:tip('Segurança','Não fotografe se houver risco a você ou a outras pessoas.','red')},
   {title:'Relato inicial do acidente',desc:'Com condições seguras, grave um áudio claro e objetivo contendo: data, horário e local; sentido em que o veículo trafegava; como ocorreu a colisão; identificação dos veículos; danos observados e existência de feridos; outras informações relevantes.',icon:'mic',extra:tip('Dica','Limite-se aos fatos conhecidos, sem suposições sobre responsabilidade.')},
   {title:'Comparecimento ao setor de DLV',desc:'No dia seguinte, compareça ao setor de DLV no prazo de 24 horas úteis. Preste esclarecimentos e faça os registros complementares. Se o setor passar orientações diferentes, siga essas orientações.',icon:'file'}
 ]),'FLUXO OFICIAL')}
 ${section('orientacoes','Orientações finais',prose('A segurança das pessoas vem primeiro. Comunicação imediata e registro correto são fundamentais para a apuração.')+tip('Atenção à bonificação','O não cumprimento deste procedimento acarreta a perda da bonificação.','red'))}
 ${section('dlv','Setor DLV',prose('Responsável pelos registros complementares e continuidade do procedimento.')+buttonRow(`<a class="btn btn-primary" href="${TG}" target="_blank" rel="noopener noreferrer">${I('headset',17)} Falar com Operacional</a>`,`<a class="btn btn-secondary" href="${url('index.html')}">${I('arrowleft',17)} Voltar ao portal</a>`))}
 `},
 guianovos:{sub:'INTEGRAÇÃO',heading:'Guia para novos motoristas',excerpt:'Veja como configurar os canais de comunicação, receber as rotas e começar a usar o portal.',read:'7 MIN DE LEITURA',toc:[['config','Configuração inicial'],['clientes','Nossos clientes'],['procedimentos','Procedimentos operacionais']],body:()=>`
 ${intro('BEM-VINDO À EQUIPE','A comunicação interna e a distribuição das rotas são feitas pelo Telegram. Prepare o celular seguindo a ordem abaixo.')}
 ${section('config','Configuração inicial',prose('Instale o aplicativo, faça o cadastro no bot e salve o contato do Operacional.')+processSteps([
   {title:'Instalar o Telegram',desc:'Baixe o aplicativo no celular, crie sua conta e confirme o número de telefone.',icon:'message',extra:buttonRow(extBtn('https://telegram.org/apps','Baixar Telegram','message'))},
   {title:'Cadastro no bot de rotas',desc:'Cadastre-se no bot oficial (@cadfastbot) para receber as viagens programadas.',icon:'route',extra:buttonRow(extBtn('https://t.me/cadfastbot','Abrir @cadfastbot','message'))},
   {title:'Preencher o cadastro',desc:'Informe seus dados com atenção. O sistema não permite alterações depois da conclusão.',icon:'clipboard',extra:tip('Antes de concluir','Revise os dados preenchidos para evitar erros no cadastro.','red')},
   {title:'Salvar o contato do Operacional',desc:'Adicione o contato oficial à agenda do celular. Aproveite para salvar este portal nos favoritos.',icon:'headset',extra:buttonRow(extBtn(TG,'Abrir @oppmotorista','headset'))}
 ]))}
 ${section('clientes','Nossos clientes',prose('Principais contratos atendidos pela operação:')+`<div class="benefit-list">${['Intelbras','Mercado Livre','Renner','C-Pack','Schaefer','Gerdau','JBS','Liderança','EntreRios','ETE','Sodexo','Quantity','CBA','Visão'].map(c=>`<div class="benefit-row">${I('bus',18)}<span><strong>${c}</strong></span></div>`).join('')}</div>`)}
 ${section('procedimentos','Procedimentos operacionais',prose('Consulte o manual completo sempre que tiver dúvida. Em caso de acidente, abra o procedimento de sinistro.')+`<div class="button-row"><a class="btn btn-secondary" href="${url('nossasregras/')}">${I('clipboard',17)} Nossas regras</a><a class="btn btn-secondary" href="${url('sinistro/')}">${I('alert',17)} Procedimento de sinistro</a></div>`+`<h3 style="margin-top:1.5rem">Grupos</h3>`+bullet(['Avise no grupo quando iniciar a rota','Comunique atrasos aos passageiros e à operação','Compartilhe sua localização quando for necessário','Se houver conflito no grupo, não responda. Procure o Operacional'])+`<h3>Passageiros</h3>`+bullet(['Mantenha um atendimento profissional e respeitoso','Evite conversas privadas, salvo quando o Operacional solicitar','Não prolongue discussões'])+`<h3>Viagem</h3>`+bullet(['Confirme se o passageiro está chegando antes de partir','Espere todos se acomodarem antes de seguir','Mantenha o ar em 22 °C e acenda a luz do corredor quando necessário']))}
 `},
 nossasregras:{sub:'MANUAL OPERACIONAL',heading:'Nossas regras para o dia a dia',excerpt:'Normas e procedimentos essenciais para o serviço de transporte de passageiros.',read:'9 MIN DE LEITURA',toc:[['checklist','Checklist'],['garagem','Garagem'],['passageiros','Passageiros'],['viagem','Durante a viagem'],['comunicacao','Comunicação'],['operacao','Operação'],['emergencia','Emergência'],['folgas','Folgas'],['contato','Contato']],body:()=>`
 ${intro('VISÃO DA EMPRESA','“Ser a melhor empresa de transporte de passageiros do estado de Santa Catarina para nossos clientes, colaboradores e sócios.” José Marciel Neis')}
 ${section('checklist','Checklist do veículo',bullet(['Água e óleo do motor','Pneus calibrados','Óleo diesel e arla','Luzes (freio, seta, faróis)','Registrar avarias e enviar ao operacional','Ar carregado antes de sair']))}
 ${section('garagem','Garagem',bullet(['Entre em primeira marcha com o pisca-alerta ligado','Estacione somente nos locais indicados','Abasteça ao entrar e libere a área em seguida','Desligue o itinerário, os faróis, o ar e o pisca-alerta antes de desligar o veículo','Ao encerrar, organize os cintos, bancos e cortinas']))}
 ${section('passageiros','Passageiros',bullet(['Atendimento profissional, sem discussões','Evite conversas privadas (exceto se o operacional pedir)','Aguarde a acomodação antes de partir','Atenção ao abrir e fechar portas']))}
 ${section('viagem','Durante a viagem',bullet(['Ar em 23°C','Luz de guia no corredor em rotas noturnas','Cumpra horários; nunca passe antes do horário','Comunique atrasos imediatamente','Não altere a rota programada']))}
 ${section('comunicacao','Comunicação nos grupos',bullet(['Avise quando iniciar a rota','Comunique qualquer atraso','Compartilhe sua localização quando for necessário','Se houver conflito, não responda no grupo. Procure o Operacional']))}
 ${section('operacao','Operação',bullet(['Confirme escala/carro antes de iniciar','Siga a planilha/roteiro','Use o itinerário eletrônico corretamente','Na dúvida, acione a supervisão']))}
 ${section('emergencia','Emergência',bullet(['Em caso de socorro, acione o suporte imediatamente','Em caso de acidente, avise a supervisão e siga o procedimento de sinistro'])+`<a class="inline-feature" href="${url('sinistro/')}">${I('alert',21)}<span><strong>Procedimento de sinistro</strong><small>Orientações em caso de ocorrência.</small></span>${I('arrow',18)}</a>`)}
 ${section('folgas','Folgas e dispensas',bullet(['Solicite com antecedência','Aguarde confirmação oficial','Em emergência, comunique o quanto antes']))}
 ${section('contato','Contato',bullet(['Telefone: +55 48 99117-9435',`Telegram: <a href="${TG}" target="_blank" rel="noopener noreferrer">@oppmotorista</a>`])+buttonRow(`<a class="btn btn-primary" href="${TG}" target="_blank" rel="noopener noreferrer">${I('headset',17)} Operacional</a>`))}
 `},
 diretoriosdelinks:{sub:'ACESSOS E SISTEMAS',heading:'Diretório de links',excerpt:'Atalhos para sistemas e recursos do dia a dia.',read:'3 MIN DE LEITURA',toc:[['links','Links úteis'],['notas','Notas']],body:()=>`
 ${intro('ATALHOS DA OPERAÇÃO','Acesso rápido aos formulários, aplicativos e canais usados na rotina.')}
 ${section('links','Links úteis',`<div class="resource-list">${panelLink('clipboard','Ficha mecânica','Formulário oficial','https://euoryan.com/dt/fichamecanica/')}${panelLink('book','Guia novos motoristas','Telegram e bot de rotas','guianovos/')}${panelLink('route','Guia Intelbras','Portal e procedimentos','guiaintelbras/')}${panelLink('message','Receber rotas','@cadfastbot','https://t.me/cadfastbot')}${panelLink('calendar','Registro de crachá','Ausência de crachá','https://bit.ly/registrocrachas')}${panelLink('headset','Operacional','Suporte no Telegram',TG)}</div>`)}
 ${section('notas','Antes de abrir um link',bullet(['A ficha mecânica é obrigatória. Registre os detalhes e os IDs solicitados','Use o bot de rotas somente para as funções disponíveis','Registre toda ausência de crachá']))}
 `},
 guiaintelbras:{sub:'GUIA POR CONTRATO',heading:'Guia Intelbras',excerpt:'Procedimentos e acessos usados no atendimento ao contrato Intelbras.',read:'6 MIN DE LEITURA',toc:[['portal','Portal'],['inicio','Início de viagem'],['gestao','Gestão de rotas'],['acesso','Cartão de acesso']],body:()=>`
 ${intro('INFORMAÇÕES DO CONTRATO','O portal reúne o link da rota, o roteiro e o grupo de WhatsApp utilizado no atendimento.')}
 ${section('portal','Portal',prose('Use o portal oficial para consultar rotas e orientações do contrato.')+buttonRow(extBtn('https://alexandreturismo.com/portalintelbras/','Abrir portal')))}
 ${section('inicio','Início de viagem',bullet(['Avise no grupo da rota ao iniciar','Compartilhar localização é opcional','Em bloqueio, comunique o novo trajeto no grupo'])+prose(`Comunidade dos grupos: <a href="https://chat.whatsapp.com/Fab6eo9YprH2lew2MweLFJ" target="_blank" rel="noopener noreferrer">abrir WhatsApp</a>.`))}
 ${section('gestao','Gestão de rotas',bullet(['Siga as alterações enviadas pelo Operacional','Oriente os passageiros a solicitar mudanças ao DP da Intelbras','Use os pontos de parada como referência para o atendimento']))}
 ${section('acesso','Cartão de acesso',bullet(['O uso do cartão é obrigatório','Se o passageiro esquecer o cartão, registre os dados do funcionário'])+buttonRow(extBtn('https://zfrmz.com/SwdIV1FKbzZp7Eak9P4K','Registrar ocorrência','clipboard'))+prose('“Somos uma equipe unida, o que nos torna prósperos em alcançar resultados positivos.”'))}
 `},
 beneficios:{sub:'VALORIZAÇÃO E PARCERIAS',heading:'Benefícios Parceiros',excerpt:'Consulte os descontos e as vantagens oferecidos pelos parceiros da empresa.',read:'3 MIN DE LEITURA',toc:[['acesso','Como acessar'],['encontrar','O que você encontra'],['usar','Antes de usar']],body:()=>`
 ${intro('ACESSO PARA A EQUIPE','A relação de parceiros, as condições e as orientações de uso ficam disponíveis no Notion.')}
 ${section('acesso','Como acessar',prose('Abra a plataforma no Notion. Lá estão as parcerias ativas, condições e orientações de uso.')+buttonRow(extBtn('https://alexandreroteiros.notion.site/Alexandre-Turismo-Parceiras-12d214b1b1b980e7a645d05ef6231d0f?source=copy_link','Abrir no Notion','gift')))}
 ${section('encontrar','O que você encontra',bullet(['Descontos em estabelecimentos parceiros','Condições especiais negociadas para a equipe','Parceiros selecionados pela empresa','Atualizações quando novas parcerias entram']))}
 ${section('usar','Antes de usar um benefício',prose('Abra a página do parceiro e confira as condições atuais. Alguns benefícios podem exigir identificação ou ter regras próprias.')+tip('Confira antes de ir','As condições podem ser atualizadas. Consulte o Notion no dia em que pretende usar o benefício.'))}
 `},
 wifimotoristas:{sub:'CONECTIVIDADE',heading:'Wi-Fi motoristas',excerpt:'Conecte-se à rede disponível para motoristas usando o QR Code ou a senha.',read:'3 MIN DE LEITURA',toc:[['rede','Rede disponível'],['conectar','Como conectar'],['ajuda','Se não conectar']],body:()=>`
 ${intro('REDE DA UNIDADE','A rede pode ser usada nas áreas de descanso e nos refeitórios destinados aos motoristas.')}
 ${section('rede','Rede disponível',`<div class="wifi-stack">${wifiCard('BLOCO B MOTORISTAS','onibus1001@','wifi-bloco-b','Rede disponível para os motoristas que estão na unidade.')}</div>`)}
 ${section('conectar','Como conectar',processSteps([
   {title:'Abra a câmera do celular',desc:'Aponte a câmera para o QR Code exibido acima e toque na notificação que aparecer.',icon:'camera'},
   {title:'Confirme a conexão',desc:'Escolha a opção para entrar na rede e aguarde o ícone de Wi-Fi aparecer na parte superior da tela.',icon:'wifi'},
   {title:'Use a senha se preferir',desc:'Toque em “Copiar”, abra as configurações de Wi-Fi e cole a senha no campo solicitado.',icon:'copy'}
 ]))}
 ${section('ajuda','Se a conexão não funcionar',bullet(['Confirme se você está próximo das áreas de cobertura','Desative e ative o Wi-Fi do celular','Esqueça a rede salva e tente conectar novamente'])+tip('Ainda sem acesso?','Fale com o Operacional e informe o nome da rede e o local onde tentou conectar.')+buttonRow(`<a class="btn btn-primary" href="${TG}" target="_blank" rel="noopener noreferrer">${I('headset',17)} Falar com o suporte</a>`))}
 `}
};
function searchEntries(){
 return [
  {group:'Navegação',title:'Início',desc:'Página inicial do portal',href:url('index.html'),icon:'home',keywords:'home começo jornada'},
  {group:'Navegação',title:'Avisos',desc:'Comunicados da equipe operacional',href:url('index.html#avisos'),icon:'megaphone',keywords:'comunicados novidades operação'},
  {group:'Navegação',title:'Falar com Operacional',desc:'Suporte pelo Telegram',href:TG,icon:'headset',keywords:'ajuda contato suporte telegram',external:true},
  ...links.map(item=>({group:'Conteúdos',title:item.title,desc:item.desc,href:url(item.path),icon:item.icon,keywords:`${item.tag} ${item.label} ${(content[item.id]?.toc||[]).map(([,title])=>title).join(' ')}`}))
 ];
}
function commandPalette(){return `<div class="command-overlay" id="command-palette" aria-hidden="true" inert><button class="command-backdrop" type="button" data-close-search tabindex="-1" aria-label="Fechar busca"></button><section class="command-dialog" role="dialog" aria-modal="true" aria-labelledby="command-title"><h2 id="command-title" class="sr-only">Busca rápida</h2><div class="command-input-wrap">${I('search',19)}<input id="command-input" type="search" placeholder="Buscar páginas, guias e procedimentos" autocomplete="off" spellcheck="false" aria-label="Buscar no portal"><kbd>Esc</kbd></div><div class="command-results" id="command-results" role="listbox"></div><footer class="command-footer"><span><kbd>↑</kbd><kbd>↓</kbd> navegar</span><span><kbd>Enter</kbd> abrir</span></footer></section></div>`;}
function aside(item){return `<aside class="article-aside"><div class="aside-inner"><div class="toc-box"><div class="toc-label">NESTA PÁGINA</div><nav class="toc-links" aria-label="Nesta página">${item.toc.map(([id,t])=>`<a href="#${id}" data-toc="${id}">${t}</a>`).join('')}</nav></div><div class="aside-contact"><div class="aside-icon">${I('headset',21)}</div><strong>Precisa de ajuda?</strong><p>Fale com o Operacional pelo Telegram.</p>${contactButton('Abrir @oppmotorista','btn btn-outline btn-aside')}</div><a href="${url('index.html#conteudos')}" class="aside-back">${I('arrowleft',15)} Ver todos os conteúdos</a></div></aside>`;}
function relatedItems(current){return links.filter(x=>x.id!==current && x.id!=='restrito').slice(0,3);}
function articlePage(key){const item=lookup[key],data=content[key];return `<main class="article-main"><div class="container-wide">${breadcrumb(item)}<div class="article-layout"><article class="article"><header class="article-header"><p class="hero-kicker">${data.sub}</p><h1>${data.heading}</h1><p class="article-deck">${data.excerpt}</p><div class="article-meta"><span>${data.read}</span></div></header><figure class="article-figure"><img src="${asset(item.cover)}" alt=""/><figcaption>${item.label}</figcaption></figure><div class="article-body">${data.body()}</div></article>${aside(data)}</div><section class="related-section"><div class="related-heading"><h2>Outros conteúdos</h2></div><div class="content-grid related-grid">${relatedItems(key).map(x=>imgCard(x,true)).join('')}</div></section></div></main>`;}
function restricted(){return `<main class="state-main"><div class="container-wide">${breadcrumb(lookup.restrito)}<section class="state-view" aria-labelledby="state-title"><div class="state-icon">${I('settings',27)}</div><span class="state-kicker">Conteúdo em configuração</span><h1 id="state-title">A página de bonificação ainda não está disponível</h1><p>As regras e condições estão sendo revisadas antes da publicação. Assim que o conteúdo estiver concluído, o acesso será liberado aqui no portal.</p><div class="state-actions"><a class="btn btn-primary" href="${url('index.html')}">${I('arrowleft',17)} Voltar ao início</a>${contactButton('Falar com Operacional','btn btn-secondary')}</div><small>Você pode continuar consultando os outros guias normalmente.</small></section></div></main>`;}
function notFound(){return `<main class="state-main"><div class="container-wide"><div class="breadcrumbs"><a href="${url('index.html')}">Início</a>${I('chevron',13)}<span>Página não encontrada</span></div><section class="state-view" aria-labelledby="notfound-title"><div class="state-icon">${I('help',27)}</div><span class="state-kicker">Erro 404</span><h1 id="notfound-title">Página não encontrada</h1><p>O endereço pode ter mudado ou não estar mais disponível. Volte ao início para continuar navegando.</p><div class="state-actions"><a class="btn btn-primary" href="${url('index.html')}">${I('arrowleft',17)} Voltar ao início</a></div></section></div></main>`;}
function toast(message){let x=document.querySelector('.toast');if(!x){x=document.createElement('div');x.className='toast';x.setAttribute('role','status');x.setAttribute('aria-live','polite');document.body.appendChild(x);}x.innerHTML=`${I('info',18)}<span>${message}</span>`;x.classList.add('is-visible');clearTimeout(window.__toastTimeout);window.__toastTimeout=setTimeout(()=>x.classList.remove('is-visible'),4200);}
function bind(){
 const menu=document.getElementById('menu-toggle'),drawer=document.getElementById('mobile-nav'),palette=document.getElementById('command-palette');
 const syncOverlay=()=>document.body.classList.toggle('overlay-open',Boolean(drawer?.classList.contains('is-open')||palette?.classList.contains('is-open')));
 let menuReturnFocus=null;
 const setMenu=(show)=>{if(!menu||!drawer)return;drawer.classList.toggle('is-open',show);drawer.setAttribute('aria-hidden',String(!show));drawer.inert=!show;menu.setAttribute('aria-expanded',String(show));menu.setAttribute('aria-label',show?'Fechar menu':'Abrir menu');if(show){menuReturnFocus=document.activeElement;drawer.querySelector('.drawer-close')?.focus();}else if(drawer.contains(document.activeElement)){menuReturnFocus?.focus();}syncOverlay();};
 if(menu&&drawer){menu.addEventListener('click',()=>setMenu(!drawer.classList.contains('is-open')));drawer.querySelectorAll('[data-close-menu]').forEach(x=>x.addEventListener('click',()=>setMenu(false)));drawer.querySelectorAll('a').forEach(x=>x.addEventListener('click',()=>setMenu(false)));window.addEventListener('resize',()=>{if(window.innerWidth>=900)setMenu(false)});}
 const commandInput=document.getElementById('command-input'),commandResults=document.getElementById('command-results'),entries=searchEntries();
 let selected=0,searchReturnFocus=null;
 const normalize=s=>(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('pt-BR');
 const filteredEntries=()=>{const q=normalize(commandInput?.value).trim();return q?entries.filter(item=>normalize(`${item.title} ${item.desc} ${item.keywords}`).includes(q)):entries;};
 const renderSearch=()=>{if(!commandResults)return;const found=filteredEntries();selected=Math.max(0,Math.min(selected,found.length-1));if(!found.length){commandResults.innerHTML=`<div class="command-empty">${I('search',22)}<strong>Nenhum resultado</strong><span>Tente buscar por outro termo.</span></div>`;return;}commandResults.innerHTML=found.map((item,index)=>`<a class="command-item ${index===selected?'is-selected':''}" href="${item.href}" ${item.external?'target="_blank" rel="noopener noreferrer"':''} role="option" aria-selected="${index===selected}" data-command-index="${index}"><span class="command-icon">${I(item.icon,17)}</span><span><strong>${item.title}</strong><small>${item.desc}</small></span><em>${item.group}</em>${I(item.external?'external':'arrow',15)}</a>`).join('');commandResults.querySelector('.is-selected')?.scrollIntoView({block:'nearest'});};
 const setSearch=(show)=>{if(!palette||!commandInput)return;if(show)setMenu(false);palette.classList.toggle('is-open',show);palette.setAttribute('aria-hidden',String(!show));palette.inert=!show;if(show){searchReturnFocus=document.activeElement;commandInput.value='';selected=0;renderSearch();requestAnimationFrame(()=>commandInput.focus());}else{searchReturnFocus?.focus();}syncOverlay();};
 document.querySelectorAll('[data-open-search]').forEach(x=>x.addEventListener('click',()=>setSearch(true)));
 document.querySelectorAll('[data-close-search]').forEach(x=>x.addEventListener('click',()=>setSearch(false)));
 commandInput?.addEventListener('input',()=>{selected=0;renderSearch();});
 commandResults?.addEventListener('mousemove',e=>{const item=e.target.closest('[data-command-index]');if(!item)return;const next=Number(item.dataset.commandIndex);if(next===selected)return;selected=next;renderSearch();});
 commandResults?.addEventListener('click',()=>setTimeout(()=>setSearch(false),0));
 document.addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();setSearch(!palette?.classList.contains('is-open'));return;}if(e.key==='Escape'){if(palette?.classList.contains('is-open'))setSearch(false);else setMenu(false);return;}if(!palette?.classList.contains('is-open'))return;const found=filteredEntries();if((e.key==='ArrowDown'||e.key==='ArrowUp')&&found.length){e.preventDefault();selected=(selected+(e.key==='ArrowDown'?1:-1)+found.length)%found.length;renderSearch();}if(e.key==='Enter'&&found.length){e.preventDefault();commandResults?.querySelector(`[data-command-index="${selected}"]`)?.click();}});
 document.querySelectorAll('[data-copy]').forEach(b=>b.addEventListener('click',async()=>{let v=b.dataset.copy;try{if(navigator.clipboard&&window.isSecureContext){await navigator.clipboard.writeText(v)}else{const ta=document.createElement('textarea');ta.value=v;ta.style.cssText='position:fixed;top:-9999px;opacity:0';document.body.appendChild(ta);ta.select();document.execCommand('copy');ta.remove()}toast('Senha copiada para a área de transferência.')}catch(e){toast('Não foi possível copiar automaticamente. Selecione a senha e copie manualmente.')}}));
 document.querySelectorAll('[data-show-pass]').forEach(b=>b.addEventListener('click',()=>{let code=b.parentElement.querySelector('.password-value');let hidden=code.textContent.includes('•');code.textContent=hidden?b.dataset.showPass:'••••••••••••••';b.setAttribute('aria-label',hidden?'Ocultar senha':'Mostrar senha');}));
 const filterBtns=[...document.querySelectorAll('.filter-button')], cards=[...document.querySelectorAll('.filter-item')], search=document.getElementById('card-search'),empty=document.getElementById('empty-state');
 if(filterBtns.length){let active='todos';const apply=()=>{const q=(search?.value||'').toLocaleLowerCase('pt-BR').trim();let count=0;cards.forEach(card=>{const match=(active==='todos'||card.dataset.category===active)&&(!q||card.dataset.search.includes(q));card.hidden=!match;if(match)count++});if(empty)empty.hidden=count>0;};filterBtns.forEach(b=>b.addEventListener('click',()=>{active=b.dataset.filter;filterBtns.forEach(n=>{n.classList.toggle('is-active',n===b);n.setAttribute('aria-pressed',String(n===b));});apply()}));search?.addEventListener('input',apply);document.getElementById('clear-filters')?.addEventListener('click',()=>{active='todos';search.value='';filterBtns[0].click();apply();search.focus();});}
 const toc=[...document.querySelectorAll('[data-toc]')];if(toc.length){const obs=new IntersectionObserver((entries)=>{entries.forEach(entry=>{if(entry.isIntersecting){toc.forEach(a=>a.classList.toggle('active',a.dataset.toc===entry.target.id));}})},{rootMargin:'-115px 0px -62% 0px',threshold:0});toc.forEach(a=>{const el=document.getElementById(a.dataset.toc);if(el)obs.observe(el)});}
}
let output=header();if(page==='home')output+=home();else if(content[page])output+=articlePage(page);else if(page==='restrito')output+=restricted();else output+=notFound();output+=footer()+commandPalette();document.getElementById('app').innerHTML=output;bind();loadRemoteFooter();
})();
