/* Portal do Motorista — protótipo visual com conteúdo oficial adaptado. */
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
 {id:'restrito',path:'restrito/',title:'Bonificação',label:'Em breve',tag:'EM PREPARAÇÃO',desc:'Entenda a bonificação e em quais situações ela pode ser perdida.',iconImg:'icons/bonificacao.png',cover:'pages/bonificacao/thumb/bonificacao.png',icon:'clock',category:'recursos',time:'—'}
];
const lookup = Object.fromEntries(links.map(item=>[item.id,item]));
const contactButton=(label='Falar com Operacional',cls='btn btn-primary')=>`<a class="${cls}" href="${TG}" target="_blank" rel="noopener noreferrer">${I('headset',17)}<span>${label}</span></a>`;
const extBtn=(href,label,icon='external')=>`<a class="btn btn-secondary" href="${href}" target="_blank" rel="noopener noreferrer">${I(icon,17)} ${label}</a>`;
function header(){
 return `<header class="site-header" id="top"><div class="container-wide header-inner">
  <a class="brand" href="${url('index.html')}" aria-label="Voltar ao início do Portal do Motorista"><span class="brand-symbol"><img src="${favicon}" alt="" width="28" height="28"></span><span class="brand-type"><strong>Portal do Motorista</strong><small>Central operacional</small></span></a>
  <nav class="desktop-nav" aria-label="Navegação principal"><a class="${page==='home'?'nav-active':''}" href="${url('index.html')}">Início</a><a href="${url('index.html#conteudos')}">Guias e procedimentos</a><a href="${url('diretoriosdelinks/')}">Links úteis</a><a href="${url('index.html#contato')}">Contato</a></nav>
  <div class="header-actions">${contactButton('Falar com Operacional','btn btn-primary btn-header')}<button class="menu-toggle" id="menu-toggle" aria-expanded="false" aria-controls="mobile-nav" aria-label="Abrir menu">${I('menu',22)}</button></div>
 </div><nav id="mobile-nav" class="mobile-nav" aria-label="Navegação móvel" hidden><a href="${url('index.html')}">Início ${I('chevron',16)}</a><a href="${url('index.html#conteudos')}">Guias e procedimentos ${I('chevron',16)}</a><a href="${url('diretoriosdelinks/')}">Links úteis ${I('chevron',16)}</a><a href="${url('index.html#contato')}">Contato ${I('chevron',16)}</a>${contactButton('Contato operacional','btn btn-primary mobile-contact')}</nav></header>`;
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
    <div class="card-cover"><span class="card-cover-icon">${I(item.icon,25)}</span><span class="card-cover-label">${item.label}</span></div>
    <div class="card-content">
      <div class="card-kicker">${item.tag}</div>
      <div class="card-title">${item.title}</div>
      <p>${item.desc}</p>
      <div class="card-foot"><span>${I('clock',13)} ${item.time==='—'?'Em breve':item.time+' de leitura'}</span><span class="card-link">Ver conteúdo ${I('chevron',14)}</span></div>
    </div>
  </a>`;
}
function quickTile(item,label,description){return `<a href="${url(item.path)}" class="quick-tile"><span class="quick-tile-icon">${I(item.icon,22)}</span><span class="quick-tile-text"><strong>${label||item.title}</strong><small>${description||item.desc}</small></span><span class="quick-tile-arrow">${I('arrow',17)}</span></a>`;}
function contactBand(){return `<section id="contato" class="contact-band">
  <div class="contact-mark">${I('message',30)}</div>
  <div class="contact-copy">
    <div class="eyebrow">PRECISA DE APOIO?</div>
    <h2>Estamos por perto quando precisar.</h2>
    <p>Dúvidas sobre a operação, rotas ou procedimentos? Fale com o Operacional no Telegram.</p>
  </div>
  ${contactButton('Abrir @oppmotorista','btn btn-primary btn-large')}
</section>`;}
function home(){
 return `<main>
 <section class="home-hero"><div class="container-wide hero-inner">
   <div class="hero-copy">
     <div class="eyebrow"><span class="eyebrow-dot"></span> SUA CENTRAL DE INFORMAÇÕES</div>
     <h1>Na rota certa,<br/><span>com a informação certa.</span></h1>
     <p>Guias, procedimentos e ferramentas para facilitar o seu dia a dia na operação. Tudo organizado, em um só lugar.</p>
     <div class="hero-actions"><a class="btn btn-primary btn-large" href="${url('guianovos/')}">${I('book',18)} Guia de integração ${I('arrow',17)}</a><a class="btn btn-secondary btn-large" href="${url('nossasregras/')}">Conhecer as regras ${I('arrow',17)}</a></div>
     <div class="hero-proof">${I('checkcircle',16)} Conteúdo claro para consultar sempre que precisar</div>
   </div>
   <div class="hero-visual"><div class="hero-illustration" role="img" aria-label="Ilustração de um ônibus">${I('bus',164)}</div><div class="visual-note"><span class="visual-note-icon">${I('checkcircle',19)}</span><span><strong>Seu dia a dia mais simples</strong><small>Informação que acompanha você.</small></span></div></div>
 </div></section>
 <div class="container-wide main-home">
  <section class="quick-section" aria-labelledby="quick-label"><div class="section-label" id="quick-label">COMECE POR AQUI <span class="section-label-line"></span></div><div class="quick-grid">${quickTile(lookup.guianovos,'Sou novo por aqui','Primeiros passos e integração.')}${quickTile(lookup.beneficios,'Benefícios e bonificação','Conheça vantagens e condições.')}${quickTile(lookup.diretoriosdelinks,'Preciso de um link','Acesse formulários e sistemas.')}</div></section>
  <section id="conteudos" class="catalog-section" aria-labelledby="catalog-title"><div class="section-heading"><div><div class="eyebrow">BIBLIOTECA OPERACIONAL</div><h2 id="catalog-title">Tudo o que você precisa saber.</h2><p>Encontre orientações, serviços e informações organizadas por assunto.</p></div><div class="catalog-count">08 CONTEÚDOS</div></div>
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
const wifiCard=(name,pass,qrFile,subtitle)=>`<article class="wifi-card"><div class="wifi-card-main"><div class="wifi-network-icon">${I('wifi',24)}</div><span class="wifi-eyebrow">REDE DISPONÍVEL</span><h3>${name}</h3><p>${subtitle}</p><div class="wifi-pass-label">SENHA DE ACESSO</div><div class="password-bar"><code class="password-value" data-secret="${pass}">••••••••••••••</code><button class="show-password" type="button" aria-label="Mostrar senha" data-show-pass="${pass}">${I('search',17)}</button><button type="button" class="copy-btn" data-copy="${pass}">${I('copy',16)} Copiar</button></div></div><div class="wifi-qr"><img src="${root}assets/images/${qrFile}.png" alt="QR Code para conectar à rede ${name}" loading="lazy"/><span>Escaneie para conectar</span></div></article>`;
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
 guianovos:{sub:'INTEGRAÇÃO',heading:'Guia para novos motoristas',excerpt:'Configuração inicial e procedimentos básicos. A comunicação e as rotas passam pelo Telegram.',read:'7 MIN DE LEITURA',toc:[['config','Configuração inicial'],['clientes','Nossos clientes'],['procedimentos','Procedimentos operacionais']],body:()=>`
 ${intro('BEM-VINDO À EQUIPE','A empresa usa o Telegram para comunicação interna e distribuição de rotas. Siga os passos abaixo.')}
 ${section('config','Configuração inicial',prose('Siga a ordem sugerida para instalar o app, se cadastrar no bot e salvar o contato do operacional.')+processSteps([
   {title:'Instalar o Telegram',desc:'Interface parecida com o WhatsApp. Instale no celular e faça login.',icon:'message',extra:buttonRow(extBtn('https://telegram.org/apps','Baixar Telegram','message'))},
   {title:'Cadastro no bot de rotas',desc:'Cadastre-se no bot oficial (@cadfastbot) para receber as viagens programadas.',icon:'route',extra:buttonRow(extBtn('https://t.me/cadfastbot','Abrir @cadfastbot','message'))},
   {title:'Preencher o cadastro',desc:'Complete os dados com atenção. Depois de finalizar, o sistema não permite alteração.',icon:'clipboard',extra:tip('Atenção','Confira tudo antes de concluir.','red')},
   {title:'Contato do operacional',desc:'Adicione o contato oficial (não basta só enviar mensagem). Salve também o Portal do Motorista nos favoritos.',icon:'headset',extra:buttonRow(extBtn(TG,'Abrir @oppmotorista','headset'))}
 ]))}
 ${section('clientes','Nossos clientes',prose('Principais contratos atendidos pela operação:')+`<div class="benefit-list">${['Intelbras','Mercado Livre','Renner','C-Pack','Schaefer','Gerdau','JBS','Liderança','EntreRios','ETE','Sodexo','Quantity','CBA','Visão'].map(c=>`<div class="benefit-row">${I('bus',18)}<span><strong>${c}</strong></span></div>`).join('')}</div>`)}
 ${section('procedimentos','Procedimentos operacionais',prose('O detalhamento completo está em nossas regras. Em acidente, veja o procedimento de sinistro.')+`<div class="button-row"><a class="btn btn-secondary" href="${url('nossasregras/')}">${I('clipboard',17)} Nossas regras</a><a class="btn btn-secondary" href="${url('sinistro/')}">${I('alert',17)} Procedimento de sinistro</a></div>`+`<h3 style="margin-top:1.5rem">Grupos</h3>`+bullet(['Informe ao grupo ao iniciar cada rota','Comunique atrasos aos passageiros e à operação','Compartilhe localização quando possível','Em conflito, não responda no grupo — acione o operacional'])+`<h3>Passageiros</h3>`+bullet(['Atendimento profissional e respeitoso','Sem conversas privadas, exceto se o operacional pedir','Não entrar em discussões'])+`<h3>Viagem</h3>`+bullet(['Verifique se o passageiro está chegando antes de partir','Aguarde a acomodação antes de sair','Ar em 22°C; luz de corredor quando necessário']))}
 `},
 nossasregras:{sub:'MANUAL OPERACIONAL',heading:'Nossas regras — manual do motorista',excerpt:'Normas e procedimentos essenciais para o serviço de transporte de passageiros.',read:'9 MIN DE LEITURA',toc:[['checklist','Checklist'],['garagem','Garagem'],['passageiros','Passageiros'],['viagem','Durante a viagem'],['comunicacao','Comunicação'],['operacao','Operação'],['emergencia','Emergência'],['folgas','Folgas'],['contato','Contato']],body:()=>`
 ${intro('VISÃO','“Ser a melhor empresa de transporte de passageiros do estado de Santa Catarina para nossos clientes, colaboradores e sócios.” — José Marciel Neis')}
 ${section('checklist','Checklist do veículo',bullet(['Água e óleo do motor','Pneus calibrados','Óleo diesel e arla','Luzes (freio, seta, faróis)','Registrar avarias e enviar ao operacional','Ar carregado antes de sair']))}
 ${section('garagem','Garagem',bullet(['Entre em 1ª marcha com pisca alerta','Estacione nos locais indicados','Abasteça ao entrar e afaste-se','Desligue itinerário, farol, ar e pisca antes de desligar','Ao encerrar: cintos, bancos e cortinas']))}
 ${section('passageiros','Passageiros',bullet(['Atendimento profissional, sem discussões','Evite conversas privadas (exceto se o operacional pedir)','Aguarde a acomodação antes de partir','Atenção ao abrir e fechar portas']))}
 ${section('viagem','Durante a viagem',bullet(['Ar em 23°C','Luz de guia no corredor em rotas noturnas','Cumpra horários; nunca passe antes do horário','Comunique atrasos imediatamente','Não altere a rota programada']))}
 ${section('comunicacao','Comunicação nos grupos',bullet(['Avise ao iniciar a rota','Comunique atrasos','Compartilhe localização quando possível','Em conflito, acione o operacional — não responda no grupo']))}
 ${section('operacao','Operação',bullet(['Confirme escala/carro antes de iniciar','Siga a planilha/roteiro','Use o itinerário eletrônico corretamente','Na dúvida, acione a supervisão']))}
 ${section('emergencia','Emergência',bullet(['Socorro: acione o suporte imediatamente','Acidentes: relate à supervisão e siga o procedimento de sinistro'])+`<a class="inline-feature" href="${url('sinistro/')}">${I('alert',21)}<span><strong>Procedimento de sinistro</strong><small>Orientações em caso de ocorrência.</small></span>${I('arrow',18)}</a>`)}
 ${section('folgas','Folgas e dispensas',bullet(['Solicite com antecedência','Aguarde confirmação oficial','Em emergência, comunique o quanto antes']))}
 ${section('contato','Contato',bullet(['Telefone: +55 48 99117-9435',`Telegram: <a href="${TG}" target="_blank" rel="noopener noreferrer">@oppmotorista</a>`])+buttonRow(`<a class="btn btn-primary" href="${TG}" target="_blank" rel="noopener noreferrer">${I('headset',17)} Operacional</a>`))}
 `},
 diretoriosdelinks:{sub:'ACESSOS E SISTEMAS',heading:'Diretório de links',excerpt:'Atalhos para sistemas e recursos do dia a dia.',read:'3 MIN DE LEITURA',toc:[['links','Links úteis'],['notas','Notas']],body:()=>`
 ${intro('ATALHOS DA OPERAÇÃO','Acesso rápido aos formulários, aplicativos e canais usados na rotina.')}
 ${section('links','Links úteis',`<div class="resource-list">${panelLink('clipboard','Ficha mecânica','Formulário oficial','https://euoryan.com/dt/fichamecanica/')}${panelLink('book','Guia novos motoristas','Telegram e bot de rotas','guianovos/')}${panelLink('route','Guia Intelbras','Portal e procedimentos','guiaintelbras/')}${panelLink('message','Receber rotas','@cadfastbot','https://t.me/cadfastbot')}${panelLink('calendar','Registro de crachá','Ausência de crachá','https://bit.ly/registrocrachas')}${panelLink('headset','Operacional','Suporte no Telegram',TG)}</div>`)}
 ${section('notas','Notas',bullet(['Ficha mecânica é obrigatória — registre detalhes e IDs','No bot de rotas, evite mensagens aleatórias','Registre toda ausência de crachá, sem exceção']))}
 `},
 guiaintelbras:{sub:'GUIA POR CONTRATO',heading:'Guia Intelbras',excerpt:'Procedimentos para atendimento ao contrato Intelbras.',read:'6 MIN DE LEITURA',toc:[['portal','Portal'],['inicio','Início de viagem'],['gestao','Gestão de rotas'],['acesso','Cartão de acesso']],body:()=>`
 ${intro('INFORMAÇÕES DO CONTRATO','No portal você encontra link da rota, roteiro e grupo do WhatsApp.')}
 ${section('portal','Portal',prose('Use o portal oficial para consultar rotas e orientações do contrato.')+buttonRow(extBtn('https://alexandreturismo.com/portalintelbras/','Abrir portal')))}
 ${section('inicio','Início de viagem',bullet(['Avise no grupo da rota ao iniciar','Compartilhar localização é opcional','Em bloqueio, comunique o novo trajeto no grupo'])+prose(`Comunidade dos grupos: <a href="https://chat.whatsapp.com/Fab6eo9YprH2lew2MweLFJ" target="_blank" rel="noopener noreferrer">abrir WhatsApp</a>.`))}
 ${section('gestao','Gestão de rotas',bullet(['Alterações pelo operacional','Passageiros pedem mudanças via DP Intelbras','Pontos de parada são referências flexíveis']))}
 ${section('acesso','Cartão de acesso',bullet(['Uso obrigatório','Se esquecer, registre os dados do funcionário'])+buttonRow(extBtn('https://zfrmz.com/SwdIV1FKbzZp7Eak9P4K','Registrar ocorrência','clipboard'))+prose('“Somos uma equipe unida, o que nos torna prósperos em alcançar resultados positivos.”'))}
 `},
 beneficios:{sub:'VALORIZAÇÃO E PARCERIAS',heading:'Benefícios Parceiros',excerpt:'Descontos e vantagens disponíveis para a equipe por meio das parcerias da empresa.',read:'3 MIN DE LEITURA',toc:[['acesso','Como acessar'],['encontrar','O que você encontra']],body:()=>`
 ${intro('ACESSO EXCLUSIVO','Benefícios criados para a equipe de motoristas. A plataforma fica no Notion.')}
 ${section('acesso','Como acessar',prose('Abra a plataforma no Notion. Lá estão as parcerias ativas, condições e orientações de uso.')+buttonRow(extBtn('https://alexandreroteiros.notion.site/Alexandre-Turismo-Parceiras-12d214b1b1b980e7a645d05ef6231d0f?source=copy_link','Abrir no Notion','gift')))}
 ${section('encontrar','O que você encontra',bullet(['Descontos em estabelecimentos parceiros','Condições especiais negociadas para a equipe','Parceiros selecionados pela empresa','Atualizações quando novas parcerias entram']))}
 `},
 wifimotoristas:{sub:'CONECTIVIDADE',heading:'Wi-Fi motoristas',excerpt:'Rede exclusiva para motoristas. Use as credenciais ou o QR Code.',read:'2 MIN DE LEITURA',toc:[['rede','Rede disponível'],['orientacao','Orientação']],body:()=>`
 ${intro('REDE DA UNIDADE','Use a rede nas áreas de descanso e refeitórios. Em dúvida, fale com o operacional.')}
 ${section('rede','Rede disponível',`<div class="wifi-stack">${wifiCard('BLOCO B MOTORISTAS','onibus1001@','wifi-bloco-b','Rede exclusiva para motoristas na unidade.')}</div>`)}
 ${section('orientacao','Orientação',prose('Escaneie o QR Code com a câmera do celular ou copie a senha manualmente.')+buttonRow(`<a class="btn btn-primary" href="${TG}" target="_blank" rel="noopener noreferrer">${I('headset',17)} Suporte</a>`))}
 `}
};
function aside(item){return `<aside class="article-aside"><div class="aside-inner"><div class="toc-box"><div class="toc-label">NESTA PÁGINA</div><nav class="toc-links" aria-label="Nesta página">${item.toc.map(([id,t])=>`<a href="#${id}" data-toc="${id}">${t}</a>`).join('')}</nav></div><div class="aside-contact"><div class="aside-icon">${I('message',21)}</div><strong>Precisa de ajuda?</strong><p>Fale com o Operacional no Telegram.</p>${contactButton('Abrir @oppmotorista','btn btn-outline btn-aside')}</div><a href="${url('index.html#conteudos')}" class="aside-back">${I('arrowleft',15)} Ver todos os conteúdos</a></div></aside>`;}
function relatedItems(current){return links.filter(x=>x.id!==current && x.id!=='restrito').slice(0,3);}
function articlePage(key){const item=lookup[key],data=content[key];return `<main class="article-main"><div class="container-wide">${breadcrumb(item)}<div class="article-layout"><article class="article"><header class="article-header"><p class="hero-kicker">${data.sub}</p><h1>${data.heading}</h1><p class="article-deck">${data.excerpt}</p><div class="article-meta"><span>${data.read}</span></div></header><figure class="article-figure"><div class="article-figure-icon">${I(item.icon,34)}</div><figcaption>${item.label}</figcaption></figure><div class="article-body">${data.body()}</div></article>${aside(data)}</div><section class="related-section"><div class="related-heading"><h2>Outros conteúdos</h2></div><div class="content-grid related-grid">${relatedItems(key).map(x=>imgCard(x,true)).join('')}</div></section></div></main>`;}
function restricted(){return `<main class="special-main"><div class="container-wide">${breadcrumb(lookup.restrito)}<div class="special-card"><div class="special-visual">${I('award',42)}</div><p class="hero-kicker">Em breve</p><h1>Bonificação em preparação.</h1><p>Esta área ainda está em desenvolvimento. Em breve, as regras de bonificação estarão disponíveis aqui.</p><a class="btn btn-primary btn-large" href="${url('index.html')}">Voltar à página inicial</a></div><div class="special-foot">Enquanto isso, consulte os <a href="${url('index.html#conteudos')}">demais conteúdos</a>.</div></div></main>`;}
function notFound(){return `<main class="special-main"><div class="container-wide"><div class="special-card notfound-card"><div class="error-number">404<span>.</span></div><div class="eyebrow">PÁGINA NÃO ENCONTRADA</div><h1>Parece que esta rota<br/>não existe.</h1><p>O endereço pode ter mudado ou a página não está mais disponível. Volte ao portal para encontrar o que precisa.</p><a class="btn btn-primary btn-large" href="${url('index.html')}">${I('arrowleft',18)} Voltar ao início</a></div></div></main>`;}
function toast(message){let x=document.querySelector('.toast');if(!x){x=document.createElement('div');x.className='toast';x.setAttribute('role','status');x.setAttribute('aria-live','polite');document.body.appendChild(x);}x.innerHTML=`${I('info',18)}<span>${message}</span>`;x.classList.add('is-visible');clearTimeout(window.__toastTimeout);window.__toastTimeout=setTimeout(()=>x.classList.remove('is-visible'),4200);}
function bind(){
 const menu=document.getElementById('menu-toggle'),mobile=document.getElementById('mobile-nav');
 if(menu&&mobile){const toggle=(show)=>{mobile.hidden=!show;menu.setAttribute('aria-expanded',String(show));menu.innerHTML=I(show?'x':'menu',22);document.body.classList.toggle('menu-open',show);};menu.addEventListener('click',()=>toggle(mobile.hidden));window.addEventListener('resize',()=>{if(window.innerWidth>=900)toggle(false)});mobile.querySelectorAll('a').forEach(x=>x.addEventListener('click',()=>toggle(false)));document.addEventListener('keydown',e=>{if(e.key==='Escape')toggle(false);});}
 document.querySelectorAll('[data-copy]').forEach(b=>b.addEventListener('click',async()=>{let v=b.dataset.copy;try{if(navigator.clipboard&&window.isSecureContext){await navigator.clipboard.writeText(v)}else{const ta=document.createElement('textarea');ta.value=v;ta.style.cssText='position:fixed;top:-9999px;opacity:0';document.body.appendChild(ta);ta.select();document.execCommand('copy');ta.remove()}toast('Senha copiada para a área de transferência.')}catch(e){toast('Não foi possível copiar automaticamente. Selecione a senha e copie manualmente.')}}));
 document.querySelectorAll('[data-show-pass]').forEach(b=>b.addEventListener('click',()=>{let code=b.parentElement.querySelector('.password-value');let hidden=code.textContent.includes('•');code.textContent=hidden?b.dataset.showPass:'••••••••••••••';b.setAttribute('aria-label',hidden?'Ocultar senha':'Mostrar senha');}));
 const filterBtns=[...document.querySelectorAll('.filter-button')], cards=[...document.querySelectorAll('.filter-item')], search=document.getElementById('card-search'),empty=document.getElementById('empty-state');
 if(filterBtns.length){let active='todos';const apply=()=>{const q=(search?.value||'').toLocaleLowerCase('pt-BR').trim();let count=0;cards.forEach(card=>{const match=(active==='todos'||card.dataset.category===active)&&(!q||card.dataset.search.includes(q));card.hidden=!match;if(match)count++});if(empty)empty.hidden=count>0;};filterBtns.forEach(b=>b.addEventListener('click',()=>{active=b.dataset.filter;filterBtns.forEach(n=>{n.classList.toggle('is-active',n===b);n.setAttribute('aria-pressed',String(n===b));});apply()}));search?.addEventListener('input',apply);document.getElementById('clear-filters')?.addEventListener('click',()=>{active='todos';search.value='';filterBtns[0].click();apply();search.focus();});}
 const toc=[...document.querySelectorAll('[data-toc]')];if(toc.length){const obs=new IntersectionObserver((entries)=>{entries.forEach(entry=>{if(entry.isIntersecting){toc.forEach(a=>a.classList.toggle('active',a.dataset.toc===entry.target.id));}})},{rootMargin:'-115px 0px -62% 0px',threshold:0});toc.forEach(a=>{const el=document.getElementById(a.dataset.toc);if(el)obs.observe(el)});}
}
let output=header();if(page==='home')output+=home();else if(content[page])output+=articlePage(page);else if(page==='restrito')output+=restricted();else output+=notFound();output+=footer();document.getElementById('app').innerHTML=output;bind();loadRemoteFooter();
})();
