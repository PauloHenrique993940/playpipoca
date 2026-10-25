# Desenvolvimento e verificação

[Voltar ao README](../README.md)

## Preparar o ambiente

Execute os comandos na raiz do projeto, onde está `package.json`:

```sh
npm ci
npm run dev
```

Use o lockfile versionado para reproduzir as dependências. Ao alterar dependências intencionalmente com npm, inclua `package.json` e `package-lock.json` no mesmo commit. Não edite arquivos gerados em `dist/`.

## Adicionar um título

Edite o array `films` em `src/films.ts`. Exemplo ilustrativo de estrutura; substitua os caminhos pelos recursos que pretende utilizar:

```ts
{
  id: 25,
  title: 'Título de exemplo',
  year: 2026,
  genre: 'Drama',
  rating: 8.0,
  time: '1h 50min',
  age: 12,
  poster: '/caminho-do-poster.jpg',
  description: 'Sinopse do título.',
  director: 'Nome da direção',
  cast: 'Pessoa A, Pessoa B'
}
```

Use um ID único. Para séries, adicione `type: 'series'`. `back` e `trailer` são opcionais; o trailer recebe apenas o ID do vídeo. Sem trailer, a interface abre uma busca no YouTube.

Para novos gêneros, atualize também `genres` em `src/App.tsx`. Confira a associação especial de aventura e as posições dos destaques descritas em [Arquitetura](ARQUITETURA.md). Ao mudar a quantidade de títulos, atualize a apresentação no README.

## Alterar a interface

- **Layout e interações:** `src/App.tsx`.
- **Cores e aparência:** variáveis Sass `$accent` e `$background`, propriedades CSS em `:root` e regras de `src/styles.scss`.
- **Responsividade:** regras existentes para largura mínima de 1600 px e máximas de 1000 px e 650 px.
- **Título e descrição da página:** `index.html`.
- **Fontes:** importação no início de `src/styles.scss`.

Preserve nomes acessíveis, foco visível e navegação por teclado ao alterar botões e modal. As preferências de movimento reduzido ainda não possuem uma regra específica no Sass.

## Validação antes de entregar

```sh
npm run build
npm run preview
```

O build já executa a checagem de tipos. Para verificar apenas TypeScript, use `npm run typecheck`. Não há suíte automatizada de testes nem lint configurados; faça a conferência funcional abaixo no navegador.

| Fluxo | Resultado esperado |
| --- | --- |
| Abrir a página | Banner, catálogo e contador são apresentados. |
| Trocar destaques | As setas percorrem três títulos e atualizam os metadados. |
| Trocar abas | Filmes exclui séries; Séries exibe séries; Minha lista usa os favoritos. |
| Buscar título, gênero e direção | A lista combina consulta, aba e gênero; limpar restaura os resultados desses filtros. |
| Pesquisar com e sem acento | Maiúsculas não alteram a busca; acentos continuam significativos. |
| Filtrar e ordenar | Categoria restringe resultados; “Melhor avaliação” ordena por nota decrescente. |
| Abrir e fechar detalhes | Card abre o modal; botão, Escape e clique na área externa o fecham. |
| Assistir trailer | Nova aba com vídeo ou busca do YouTube. |
| Favoritar e recarregar | Título permanece em Minha lista na mesma origem; remover atualiza o contador. |
| Nenhum resultado | Estado vazio oferece retorno ao catálogo. |
| Usar teclado | Tab mostra foco; Ctrl/Cmd + K foca a busca; modal pode ser fechado com Escape. |
| Redimensionar | Conferir celular, tablet e desktop, incluindo filtros, menu e modal. |
| Falha de pôster | Card mostra alternativa textual. |

Para testar armazenamento inválido ou bloqueado, use um perfil de navegador de teste. Não limpe dados de uma origem utilizada normalmente sem considerar a perda dos favoritos. Com escrita bloqueada, deve aparecer um aviso e a lista não deve mudar.

## Solução de problemas

| Sintoma | Verificação ou ação |
| --- | --- |
| `npm.ps1` não pode ser executado | Use `npm.cmd` no PowerShell. |
| Instalação informa engine incompatível | Confira `node --version` e os requisitos do README. |
| `npm ci` informa divergência no lockfile | Confira se os dois arquivos de dependências pertencem à mesma revisão; alterações intencionais precisam atualizar o lockfile. |
| Página em branco ao abrir um HTML direto | Use `npm run dev` ou o build servido por `npm run preview`, via HTTP. |
| Imagens ou fontes ausentes | Confira rede, bloqueadores e requisições externas nas ferramentas do navegador. |
| Favoritos desapareceram | Confira domínio, protocolo, porta, perfil do navegador e limpeza de dados locais. |
| Minha lista parece incompleta | Busca e gênero permanecem ativos entre abas. Limpe os filtros. |
| Alteração no código não aparece no preview | Rode `npm run build` novamente; preview serve a saída já gerada. |
| Trailer não abre | Confira bloqueio de novas abas e disponibilidade do vídeo no YouTube. |

## Escopo das verificações

Uma compilação bem-sucedida confirma a tipagem e a geração do bundle. Ela não verifica automaticamente links externos, acessibilidade, persistência, comportamento visual ou funcionamento de trailers. Registre separadamente o que foi conferido no navegador.
