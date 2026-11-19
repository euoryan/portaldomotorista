import { cp, mkdir, readdir, rm } from 'node:fs/promises';

const project = new URL('../', import.meta.url);
const dist = new URL('dist/', project);
await rm(dist, { recursive:true, force:true });
await mkdir(dist);

// A pasta de publicação contém apenas as páginas estáticas e seus recursos.
for (const name of ['index.html','404.html','favicon.ico','assets']) {
  await cp(new URL(name, project), new URL(name, dist), { recursive:true, filter: path => !path.endsWith('.zip') });
}

for (const dir of await readdir(project, {withFileTypes:true})) {
  if (!dir.isDirectory() || ['assets','dist','node_modules'].includes(dir.name) || dir.name.startsWith('.')) continue;
  const page = dir.name + '/index.html';
  if (!(await readdir(new URL(dir.name+'/', project))).includes('index.html')) continue;
  await mkdir(new URL(dir.name+'/', dist));
  await cp(new URL(page, project), new URL(page, dist));
}
