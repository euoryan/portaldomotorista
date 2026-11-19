import { access, copyFile, mkdir, readdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { layout, state } from '../src/layout.mjs';
import { article, home, library, searchText } from '../src/pages.mjs';
import { brand, categoryNames, sectors, urls } from '../src/site.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const source = new URL('../src/guides/', import.meta.url);
const guides = [];
for (const file of (await readdir(source)).filter(name => name.endsWith('.mjs'))) {
  const { default: g } = await import(new URL(file, source));
  if (file !== g.slug + '.mjs' || !categoryNames[g.category] || !g.sectors.length ||
      g.sectors.some(id => !sectors[id]) || new Set(g.sections.map(s=>s.id)).size !== g.sections.length)
    throw new Error('Verifique o cadastro de ' + file);
  await access(resolve(root,'assets/images',g.image));
  guides.push(g);
}
guides.sort((a,b)=>a.title.localeCompare(b.title,'pt-BR'));
async function save(path, value) {
  const dest = resolve(root,path);
  await mkdir(dirname(dest), {recursive:true});
  if (path.endsWith('.html') && path !== '404.html') {
    const prefix = '../'.repeat(path.split('/').length - 1) || './';
    value = value.replace(/(href|src|srcset|action)="\/(?!\/)/g, (_, attribute) => attribute + '="' + prefix);
  }
  await writeFile(dest,value);
}
await save('index.html', layout('', 'Guias, avisos e serviços para a rotina do motorista.', home(guides), '/'));
await save('pesquisa/index.html', layout('Biblioteca','Pesquise os guias e procedimentos por setor ou assunto.',library(guides),'/pesquisa/'));
for (const g of guides) {
  await save(g.slug+'/index.html', layout(g.title,g.summary,article(g,guides),'/'+g.slug+'/'));
}
const bonus = guides.find(g=>g.slug==='bonificacao');
await save('restrito/index.html', layout(bonus.title,bonus.summary,article(bonus,guides),'',true));
for (const [path,title,msg] of [
  ['manutencao/index.html','Página em manutenção','Estamos atualizando esta página. Enquanto isso, você pode consultar os outros guias do portal.'],
  ['404.html','Página não encontrada','Confira o endereço ou volte ao início para encontrar o conteúdo.']
]) await save(path,layout(title,msg,state(title,msg),'',true));
const index = [
  { title:'Início', detail:brand, href:'/', terms:'página inicial jornada' },
  { title:'Biblioteca', detail:'Todos os conteúdos', href:'/pesquisa/', terms:'busca pesquisa procedimentos guias setores' },
  { title:'Avisos', detail:'Comunicados da equipe', href:'/#avisos', terms:'novidades operação' },
  { title:'Falar com o Tráfego', detail:'Atendimento pelo Telegram', href:urls.support, terms:'suporte ajuda contato operacional' },
  ...guides.flatMap(g => [
    { title:g.title, detail:g.sectors.map(id=>sectors[id]).join(' · '), href:'/'+g.slug+'/', terms:searchText(g) },
    ...g.sections.map(s=>({ title:s.title, detail:g.title, href:'/'+g.slug+'/#'+s.id, terms:g.title+' '+s.title }))
  ])
];
await save('assets/search-index.json',JSON.stringify(index)+'\n');
await copyFile(resolve(root,'assets/favicon.svg'),resolve(root,'assets/images/favicon/portal.svg'));
console.log(guides.length+' guias publicados na biblioteca.');
