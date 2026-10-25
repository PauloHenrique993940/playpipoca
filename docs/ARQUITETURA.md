# Arquitetura e dados

[Voltar ao README](../README.md)

## Visão geral

O PlayPipoca é uma aplicação de página única executada no navegador. O Vite transforma o código e os estilos em arquivos estáticos. Não há servidor de aplicação, banco de dados, roteador ou gerenciador externo de estado.

```text
index.html → main.tsx → App.tsx
                         ├── films.ts → catálogo e metadados
                         ├── styles.scss → apresentação
                         ├── localStorage → favoritos
                         ├── TMDB → imagens
                         └── YouTube → trailers em outra aba
```

O Google Fonts é referenciado pelo arquivo de estilos. O carregamento de imagens não exige uma chamada autenticada à API do TMDB.

## Responsabilidades

| Arquivo ou componente | Responsabilidade |
| --- | --- |
| `index.html` | Idioma `pt-BR`, título, descrição e elemento `root`. |
| `main.tsx` | Monta `App` com `createRoot` e `StrictMode`; importa o Sass. |
| `App` | Mantém o estado, deriva resultados e conecta os componentes. |
| `Brand` | Apresenta a identidade visual e o link com fragmento `#`. |
| `Metadata` | Apresenta nota, ano, classificação, duração e gênero. |
| `MovieCard` | Exibe pôster e dados resumidos; aciona detalhes e favoritos. |
| `MovieDetails` | Abre um `dialog` nativo com detalhes, trailer e favorito. |
| `films.ts` | Define a interface `Film` e os dados usados na interface. |
| `styles.scss` | Define cores, tipografia, layouts e estados visuais. |

Todos os componentes acima, exceto a entrada, estão definidos em `App.tsx`. As abas mudam estado local; não criam URLs próprias nem histórico de navegação.

## Estado e resultados

O componente principal controla a aba (`view`), gênero (`genre`), busca (`query`), ordenação (`sortRating`), favoritos (`saved`), destaque (`heroIndex`), título aberto (`selected`) e aviso temporário (`notice`). Os resultados são calculados a cada renderização, sem alterar o array original do catálogo.

A seleção segue esta sequência:

1. Restringe por aba: filmes, séries ou IDs salvos.
2. Aplica o gênero. “Aventura” também inclui os IDs `1`, `2`, `5` e `12`, definidos explicitamente no código.
3. Remove espaços nas extremidades da consulta e converte consulta e conteúdo para minúsculas com locale `pt-BR`.
4. Procura o texto na combinação de título, gênero e direção.
5. Quando habilitada, aplica a ordenação por nota decrescente.

Gênero, busca e ordenação permanecem ativos ao trocar de aba. “Explorar catálogo”, no estado vazio, volta ao início e limpa gênero e busca; mantém a opção de ordenação.

Os três destaques usam as posições `0`, `1` e `6` de `films`. Reordenar o catálogo muda esses destaques. O banner não avança automaticamente.

## Modelo `Film`

| Campo | Tipo | Uso |
| --- | --- | --- |
| `id` | `number` | Identificador único e estável, usado nos favoritos. |
| `title` | `string` | Título exibido e pesquisável. |
| `year` | `number` | Ano exibido e usado na busca externa de trailer. |
| `genre` | `string` | Gênero principal; precisa corresponder ao filtro para associação direta. |
| `rating` | `number` | Nota demonstrativa, exibida com uma casa decimal. |
| `time` | `string` | Duração ou quantidade de temporadas. |
| `age` | `number \| string` | Classificação indicativa. |
| `poster` | `string` | Caminho da imagem no TMDB, com `/` inicial. |
| `back` | `string`, opcional | Imagem ampla; na ausência, usa o pôster. |
| `trailer` | `string`, opcional | ID do vídeo no YouTube, sem a URL completa. |
| `description` | `string` | Sinopse. |
| `director` | `string` | Direção, também pesquisável. |
| `cast` | `string` | Elenco apresentado no modal. |
| `type` | `'series'`, opcional | Identifica séries; a ausência representa filme. |

## Favoritos e persistência

A chave `playpipoca-list` armazena um array JSON de IDs, como `[1, 7]`.

Na inicialização, `readSaved` tenta ler e interpretar o valor. Se o conteúdo não for um array ou ocorrer um erro, retorna uma lista vazia. Quando é um array, mantém apenas números associados ao catálogo e elimina duplicatas. Essa normalização da leitura não regrava imediatamente o armazenamento.

Ao adicionar ou remover, o aplicativo tenta persistir a próxima lista antes de atualizar o estado. Se a escrita falhar, exibe um aviso e preserva o estado anterior. Portanto, bloquear o armazenamento também impede mudanças na lista pela interface.

Os dados ficam na origem do site: protocolo, host e porta. Abrir a aplicação em outro domínio ou porta cria um contexto de armazenamento separado. Não altere a chave nem recicle IDs sem planejar o impacto nos favoritos existentes. A lista contém apenas IDs; não há conta de usuário.

## Integrações e falhas

- Pôsteres usam `w500`; detalhes usam `w1280`; o banner usa `original` no domínio de imagens do TMDB.
- Um erro no pôster de um card mostra o título como alternativa. Banner e imagem do modal não têm o mesmo fallback implementado.
- O trailer abre uma nova aba com `noopener,noreferrer`. Sem `trailer`, abre uma busca no YouTube por título, ano e trailer oficial legendado.
- Avisos de ação desaparecem após aproximadamente 2,5 segundos.
- Não há cache offline, sincronização entre abas ou integração de autenticação.
