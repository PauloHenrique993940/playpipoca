# 🍿 PlayPipoca

**Descubra sua próxima história.** Explore filmes e séries, assista a trailers e organize uma lista pessoal em uma interface em português com identidade visual de cinema.

Aplicação demonstrativa desenvolvida com **React, TypeScript, Sass e Vite**. O catálogo está no código e os favoritos ficam no navegador, sem necessidade de conta ou chave de API.

> O PlayPipoca apresenta informações e trailers. A versão atual não reproduz filmes ou episódios completos.

## Navegação

- [Funcionalidades](#funcionalidades)
- [Executar localmente](#executar-localmente)
- [Comandos](#comandos)
- [Estrutura](#estrutura)
- [Documentação técnica](#documentação-técnica)
- [Limitações](#limitações)
- [Autoria e licença](#autoria-e-licença)

## Funcionalidades

| Recurso | Comportamento |
| --- | --- |
| Catálogo | 24 títulos demonstrativos, entre filmes e séries. |
| Navegação | Início, Filmes, Séries e Minha lista. |
| Destaques | Três títulos, com navegação manual entre os banners. |
| Busca | Consulta por título, gênero ou direção, combinada com os filtros. |
| Gêneros | Filtros por categoria, incluindo uma seleção de aventura. |
| Ordenação | Alterna entre a ordem original do catálogo e nota decrescente. |
| Detalhes | Modal com sinopse, ano, duração ou temporadas, classificação, direção e elenco. |
| Trailers | Abre o YouTube em outra aba; usa uma busca quando não há vídeo cadastrado. |
| Favoritos | Adiciona e remove títulos; mantém a lista após recarregar na mesma origem. |
| Interface | Layout responsivo, estados vazios, avisos de ação e alternativa textual para pôsteres com erro. |

### Teclado e acessibilidade

- `Ctrl + K` ou `Cmd + K`: leva ao catálogo e foca a busca.
- `Escape`: fecha o modal de detalhes.
- Botões, links e busca têm indicação visual de foco.
- Favoritos e filtros usam `aria-pressed`; a quantidade de resultados e os avisos têm anúncios para tecnologias assistivas.
- O modal usa o elemento nativo `dialog` e um título acessível.

Esses recursos estão implementados, mas não constituem uma certificação de acessibilidade. Veja o roteiro de verificação em [Desenvolvimento](docs/DESENVOLVIMENTO.md).

## Executar localmente

### Requisitos

- Git para clonar o repositório.
- Node.js compatível com as dependências do lockfile: `20.19+` na linha 20 ou `22.12+` nas linhas seguintes.
- npm e um navegador moderno com suporte a `dialog` e `localStorage`.

```sh
git clone https://github.com/PauloHenrique993940/playpipoca.git
cd playpipoca
npm ci
npm run dev
```

Abra o endereço exibido no terminal. O servidor está configurado para `127.0.0.1`; a porta é informada pelo Vite.

No PowerShell, se a execução de `npm.ps1` estiver bloqueada, use `npm.cmd ci` e `npm.cmd run dev`.

**Não há arquivo `.env` obrigatório.** A aplicação não consulta uma API de catálogo: os dados são locais. A instalação dos pacotes exige internet, assim como o carregamento das imagens, fontes e trailers externos.

## Comandos

| Comando | Finalidade |
| --- | --- |
| `npm ci` | Instala as versões registradas em `package-lock.json`. |
| `npm run dev` | Inicia o ambiente de desenvolvimento. |
| `npm run typecheck` | Verifica os tipos sem emitir arquivos. |
| `npm run build` | Verifica os tipos e gera a aplicação em `dist/`. |
| `npm run preview` | Serve o build localmente para conferência. Execute o build antes. |

Não há scripts de lint ou testes automatizados configurados nesta versão. O build valida os tipos e a geração dos arquivos; os fluxos de interação precisam de verificação no navegador.

## Estrutura

```text
playpipoca/
├── .openai/hosting.json  # Identidade do Site e diretório de publicação
├── docs/                # Guias técnicos e operacionais
├── src/
│   ├── App.tsx          # Interface, filtros, favoritos e modal
│   ├── films.ts         # Modelo Film e catálogo demonstrativo
│   ├── main.tsx         # Montagem do React e importação dos estilos
│   └── styles.scss      # Tema, componentes e regras responsivas
├── .gitignore
├── CONTRIBUTING.md
├── index.html           # Documento HTML, metadados e ponto de montagem
├── package.json         # Dependências e comandos
├── package-lock.json    # Versões resolvidas
└── tsconfig.json        # Configuração TypeScript com modo estrito
```

`node_modules/` e `dist/` são gerados localmente e ignorados pelo Git.

## Documentação técnica

- [Arquitetura e dados](docs/ARQUITETURA.md): componentes, estado, filtros e persistência.
- [Desenvolvimento](docs/DESENVOLVIMENTO.md): edição do catálogo, estilos, validação e solução de problemas.
- [Publicação](docs/PUBLICACAO.md): build estático, configuração de hospedagem e conferência.
- [Como contribuir](CONTRIBUTING.md): fluxo de trabalho e critérios para pull requests.

## Limitações

- O catálogo e as notas são demonstrativos; não representam dados atualizados em tempo real.
- O botão “Mais populares” representa a ordem dos dados locais, sem cálculo de popularidade.
- A busca ignora maiúsculas e minúsculas, mas não remove acentos.
- A lista pertence ao navegador e à origem atual; não sincroniza entre dispositivos, domínios ou portas.
- Não há backend, contas, pagamentos, reprodução de longas ou suporte offline implementado.
- Imagens são carregadas de `image.tmdb.org`, fontes do Google Fonts e trailers do YouTube. A disponibilidade desses serviços não é controlada pelo projeto.

## Autoria e licença

Projeto de [Paulo Henrique](https://github.com/PauloHenrique993940).

O repositório ainda não possui um arquivo de licença. Não presuma uma licença de código aberto para reutilização ou distribuição. Títulos, pôsteres, imagens e vídeos de terceiros permanecem sujeitos aos direitos e condições de seus titulares.
