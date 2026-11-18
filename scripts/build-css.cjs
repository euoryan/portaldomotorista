/** Recompila os utilitários Tailwind v4 usados no projeto, sem CLI. */
const fs = require('node:fs');
const path = require('node:path');
let tailwind;
try {tailwind = require('tailwindcss');}
catch { tailwind = require('/opt/nvm/versions/node/v22.16.0/lib/node_modules/tailwindcss'); }
const base=path.resolve(__dirname,'..');
const candidates=new Set([
 'flex','grid','hidden','inline-flex','items-center','justify-between','gap-2','gap-3',
 'mx-auto','w-full','min-w-0','flex-1','text-left','text-center','font-semibold',
 'text-sm','text-white','bg-brand','rounded-lg','px-4','py-2',
 'sm:grid-cols-2','lg:grid-cols-3','hover:bg-brand-strong'
]);
const scan=(dir)=>{for(const entry of fs.readdirSync(dir,{withFileTypes:true})){
 const p=path.join(dir,entry.name);
 if(entry.isDirectory()){if(!['node_modules','.git'].includes(entry.name))scan(p);continue;}
 if(!['.html','.js'].includes(path.extname(p)))continue;
 const text=fs.readFileSync(p,'utf8');
 // Tailwind discards unsupported candidates; collecting literal tokens also covers HTML injected by JS.
 for(const word of text.match(/[a-zA-Z0-9_:#%/!.[\](),-]+/g)||[])candidates.add(word);
 }};
scan(base);
(async()=>{
 const src=fs.readFileSync(path.join(base,'src/input.css'),'utf8');
 const engine=await tailwind.compile(src);
 const css=engine.build([...candidates]);
 fs.writeFileSync(path.join(base,'assets/css/styles.css'),css);
 console.log(`Tailwind CSS compilado: ${candidates.size} candidatos, ${(css.length/1024).toFixed(1)} KB`);
})().catch(e=>{console.error(e);process.exit(1)});
