# Portal do Motorista

Portal estático para motoristas: guias, procedimentos, links e orientações operacionais.

A navegação inclui busca global por páginas e procedimentos com `Ctrl + K`.

## Rodar local

```bash
python3 -m http.server 8765
```

Abra `http://127.0.0.1:8765/`.

## Estrutura

- `assets/js/app.js`: navegação, conteúdo oficial e interações
- `assets/css/styles.css`: tema escuro (fonte: `src/input.css`)
- Pastas por página (`sinistro/`, `guianovos/`, …) com shell HTML
- `_archive-original/`: snapshot da versão anterior à migração

## CSS

Edite `src/input.css` e execute `npm run build:css`. O comando recompila `assets/css/styles.css` com Tailwind CSS 4.
