const fs = require('node:fs');
const path = require('node:path');
const { compile } = require('tailwindcss');

async function build() {
  const root = path.resolve(__dirname, '..');
  const source = fs.readFileSync(path.join(root, 'src/input.css'), 'utf8');
  const candidates = new Set();
  // Os HTMLs publicados já contêm todas as classes dos guias e modelos.
  for (const entry of fs.readdirSync(root, {withFileTypes: true})) {
    const page = path.join(root, entry.name, ...(entry.isDirectory() ? ['index.html'] : []));
    if (!page.endsWith('.html') || !fs.existsSync(page)) continue;
    const html = fs.readFileSync(page, 'utf8');
    for (const match of html.matchAll(/class="([^"]+)"/g))
      for (const name of match[1].split(/\s+/)) candidates.add(name);
  }
  const engine = await compile(source);
  fs.writeFileSync(path.join(root,'assets/css/styles.css'), engine.build([...candidates]));
}
build().catch(error => { console.error(error); process.exitCode = 1; });
