# Portal do Motorista — guia de adaptação para Cursor / outra IA

## Objetivo

Este ZIP é **um protótipo visual e navegável**, criado para servir como base de design. O conteúdo é ilustrativo e precisa ser substituído pelas informações oficiais do portal existente.

**Não migre os textos fictícios por cima dos conteúdos reais.** Preserve integralmente os dados, URLs, instruções e regras operacionais já publicados. Adapte apenas a apresentação e a hierarquia visual, com revisão humana antes de colocar em produção.

## Arquitetura entregue

- `index.html`: página inicial, hero, acessos rápidos, biblioteca filtrável e contato.
- `sinistro/index.html`: procedimento de acidente/colisão, 192, cinco etapas e bonificação.
- `guianovos/index.html`: integração, Telegram, bot, cadastro e contratos.
- `nossasregras/index.html`: manual operacional com checklist visual.
- `diretoriosdelinks/index.html`: diretório de acessos e links.
- `guiaintelbras/index.html`: conteúdo de referência de um contrato específico.
- `beneficios/index.html`: parcerias e ponto de acesso a Notion.
- `wifimotoristas/index.html`: senhas fictícias, dois QR Codes reais de demonstração e botão de copiar.
- `restrito/index.html`: página de conteúdo em desenvolvimento.
- `404.html`: página de erro personalizada.
- `assets/js/app.js`: renderização da navegação, componentes, conteúdo demonstrativo e interações.
- `src/input.css`: Tailwind CSS v4, variáveis e componentes visuais/editoriais.
- `assets/css/styles.css`: CSS já compilado e incluído; não depende de CDN.
- `assets/images/`: imagens locais geradas para o protótipo.

## Decisões visuais a preservar

- **Mobile-first**: uma coluna no celular; até quatro cards por linha em desktop amplo.
- **Azul-marinho** como cor de ação (`#103361`, `#0a284e`), sem excessos de gradientes ou sombras.
- Estética corporativa editorial próxima de shadcn / Linear: branco, separadores finos, tipografia Inter, cantos discretos, espaçamento consistente.
- Home orientada a descoberta; páginas internas orientadas à leitura, com título, subtítulo, imagem, blocos semânticos, seções e sumário lateral.
- Imagens de cards em WebP, locais para não depender de sites externos.
- Botões de fontes externas são **demonstrativos** e apresentam aviso. Troque pelos endereços existentes; não mantenha toasts no projeto final.

## Onde alterar

1. **Identidade**: ajuste o texto de marca no método `header()` e as cores no bloco `@theme` do `src/input.css`.
2. **Cards da home**: itens na constante `links` de `assets/js/app.js`, que também define os endereços internos e as imagens.
3. **Artigos**: conteúdo da constante `content` de `assets/js/app.js`; os títulos do sumário correspondem aos IDs das seções.
4. **Contato**: substitua `contactButton()` pelo destino real (Telegram, WhatsApp ou telefone), depois de validar com a operação.
5. **Links de sistemas**: substitua `data-demo` por URLs verificadas, preservando nomes e permissões corretos.
6. **Wi-Fi**: trocar SSIDs, senhas e QR Codes fictícios. **Evite expor redes internas** num site público sem autenticação; se necessário, coloque esta página atrás de autorização.
7. **Publicação**: use a pasta em servidor estático ou incorpore os componentes no projeto existente; mantenha os caminhos relativos ou atualize os helpers `root`, `img`, `url`.

## Como rodar

Sem instalar nada, abra um terminal na pasta e rode:

```bash
python3 -m http.server 4173
```

Acesse `http://localhost:4173/`.

O CSS está pronto; se editar `src/input.css`, instale dependências com `npm install` e execute:

```bash
npm run build:css
```

## Checklist técnico para integração

- [ ] Preservar o conteúdo oficial de cada página e os links reais.
- [ ] Revisar textos, siglas, procedimentos e responsáveis por contrato.
- [ ] Confirmar canal de contato operacional e sistema de recebimento de rotas.
- [ ] Revisar as permissões de cada serviço externo.
- [ ] Proteger dados internos (especialmente Wi-Fi, formulários, pessoas, credenciais).
- [ ] Substituir os QR Codes demonstrativos pelos aprovados.
- [ ] Validar menus, busca, filtros, links, copiar senha e checklists nos navegadores-alvo.
- [ ] Configurar fallback 404 na hospedagem; a existência de `404.html` por si só não configura todos os servidores.
- [ ] Testar dispositivos reais e acessibilidade de teclado/touch.

## Escopo intencional do protótipo

Sem backend, autenticação, analytics ou dependências de API. Não foi criado nenhum contato externo fictício. O botão de emergência 192 usa `tel:192`, destinado ao SAMU no Brasil. A estrutura serve para adaptação, não representa as normas oficiais da empresa.
