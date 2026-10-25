# PlayPipoca

Plataforma demonstrativa de descoberta de filmes e séries em português, feita com React, TypeScript, Sass e Vite.

## Desenvolvimento

Requer Node.js 20.19+ ou 22.12+ e npm.

```sh
npm install
npm run dev
```

Abra a URL exibida pelo Vite. No PowerShell com scripts desabilitados, use `npm.cmd` no lugar de `npm`.

## Verificação e produção

```sh
npm run typecheck
npm run build
npm run preview
```

O build verifica os tipos e gera o site em `dist/`. Essa pasta é saída gerada: edite os arquivos em `src/` e o `index.html` da raiz. Use um servidor HTTP para abrir o build; abrir `dist/index.html` diretamente como arquivo não carrega os módulos corretamente.

## Estrutura

- `src/main.tsx`: entrada React.
- `src/App.tsx`: navegação, catálogo, destaques, cards e modal de detalhes.
- `src/films.ts`: interface TypeScript e catálogo de 24 títulos.
- `src/styles.scss`: estilos responsivos e variáveis Sass de cores.
- `.openai/hosting.json`: identidade do Site e diretório de publicação preservados.

Inclui busca por título, gênero e direção, filtros, ordenação por avaliação, trailers no YouTube e favoritos persistidos no localStorage. A chave `playpipoca-list` foi preservada para manter favoritos existentes na mesma origem. O atalho Ctrl/Cmd + K foca a busca; o modal fecha com Escape.

Sem backend, autenticação, pagamentos ou distribuição de filmes completos. Favoritos pertencem ao navegador atual. Metadados demonstrativos; imagens do TMDB e fontes do Google Fonts requerem internet. Trailers abrem no YouTube; títulos sem link direto abrem uma busca por trailer. A disponibilização de longas completos exige direitos de distribuição e infraestrutura de vídeo.
