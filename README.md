# Portal do Motorista

Portal estático com avisos, procedimentos e serviços para motoristas. O conteúdo e os links de cada guia já estão no HTML. A pesquisa global também aceita Ctrl + K ou ⌘ K.

## Desenvolvimento

Com Node.js 22 ou superior, use os comandos abaixo para instalar as dependências, compilar e abrir o servidor local.

```sh
npm ci
npm run build
npm run serve
```

Abra http://localhost:4173. Os HTMLs, o índice de pesquisa e a folha de estilos gerados acompanham o commit.

## Publicar conteúdo

Cada arquivo em `src/guides/` define uma página. Use um dos guias existentes como modelo. O nome do arquivo corresponde ao endereço da página. Cadastre título, resumo, categoria, setores, foto, termos de pesquisa e seções. Mantenha os identificadores das seções já publicadas para preservar links diretos.

A compilação inclui o guia na biblioteca, nos filtros e na pesquisa geral. O índice lateral usa as mesmas seções do artigo. Para mudar os setores, os guias em destaque ou os avisos, edite `src/site.mjs`. Cada aviso recebe os campos `title` e `text`.

O layout compartilhado está em `src/layout.mjs`. Edite os estilos em `src/input.css` e compile com `npm run build`.
