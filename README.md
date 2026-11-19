# Portal do Motorista

Portal estático com avisos, procedimentos e serviços para motoristas. O conteúdo e os links de cada guia já estão no HTML. A pesquisa global também aceita Ctrl + K ou ⌘ K.

## Desenvolvimento

Com Node.js 22 ou superior, use os comandos abaixo para instalar as dependências, compilar e abrir o servidor local.

```sh
npm ci
npm run build
npm run serve
```

Abra http://localhost:4173. Os HTMLs, o índice de pesquisa e a folha de estilos gerados acompanham o commit. A Vercel executa a compilação e publica a pasta `dist/`.

## Publicar conteúdo

Cada arquivo em `src/guides/` define uma página. Use um dos guias existentes como modelo. O nome do arquivo corresponde ao endereço da página. Cadastre título, resumo, categoria, setores, foto, termos de pesquisa e seções. Mantenha os identificadores das seções já publicadas para preservar links diretos.

A compilação inclui o guia no início, na biblioteca e na busca. A categoria define o filtro por assunto. Os setores identificam os responsáveis no artigo. O campo opcional `icon` aponta para uma miniatura WebP em `assets/images/atalhos/`. O índice da página usa os mesmos títulos e identificadores das seções.

Em `src/site.mjs`, `guideOrder` define a ordem inicial dos guias. A página mostra até oito por vez e oferece “Mostrar mais” quando há outros resultados. O mural usa a lista `notices`, na ordem de leitura. Cada aviso tem `title`, `text` e, opcionalmente, `date` (`AAAA-MM-DD`), `icon` (`cloud`, `alert`, `bell`…), `tone` (`info`, `warn` ou `alert`), `image` (foto de fundo do cartão), `href` e `cta` (botão que leva a uma página).

O layout compartilhado está em `src/layout.mjs`. Edite os estilos em `src/input.css` e compile com `npm run build`.
