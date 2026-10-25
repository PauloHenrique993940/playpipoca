# Publicação

[Voltar ao README](../README.md)

## Artefato de produção

O projeto gera um site estático. O ambiente de build precisa de Node.js e npm; a hospedagem final serve HTML, CSS e JavaScript.

```sh
npm ci
npm run build
npm run preview
```

Confira o endereço exibido pelo preview antes de publicar.

| Configuração | Valor do projeto |
| --- | --- |
| Diretório raiz | Pasta que contém `package.json`. |
| Instalação | `npm ci`. |
| Build | `npm run build`. |
| Diretório de saída | `dist`. |
| Variáveis obrigatórias | Nenhuma na versão atual. |
| Backend | Não necessário. |

Publique o conteúdo gerado em `dist/`, incluindo a pasta `assets/`. Não envie `node_modules/` como conteúdo público. `npm run dev` e `npm run preview` são ferramentas locais de desenvolvimento e conferência.

## Caminho de publicação

O projeto usa a base padrão do Vite e referencia a entrada a partir da raiz. A configuração atual foi preparada para servir a aplicação na raiz de um domínio.

Se o destino for um subdiretório, gere o bundle com a base correspondente, por exemplo:

```sh
npm run build -- --base=/playpipoca/
```

Esse comando define a base somente para aquela compilação. Confira os caminhos dos assets no ambiente de destino e registre a opção no processo de publicação se ela for necessária sempre.

As abas da aplicação são estado interno, sem rotas próprias. Na implementação atual, não é necessário cadastrar rotas distintas para Filmes, Séries ou Minha lista.

## Configuração de Site existente

O arquivo `.openai/hosting.json` registra a identidade do Site associado ao projeto e aponta `static.directory` para `dist`. Preserve a identidade ao trabalhar no mesmo Site. Essa configuração não publica o site por si só e não é necessária para executar a aplicação localmente.

O envio ao GitHub também não comprova uma publicação do site. Este guia descreve o artefato e as configurações do projeto; não pressupõe uma integração automática de deploy.

## Conferência após publicar

1. Abra a URL publicada e recarregue a página.
2. Confira carregamento dos arquivos de `assets/`, pôsteres e fontes.
3. Verifique busca, filtros, navegação e modal em desktop e celular.
4. Salve um título e recarregue para conferir a persistência nessa origem.
5. Abra um trailer e confira o destino externo.
6. Verifique erros no console e requisições malsucedidas.

Favoritos de `localhost`, `127.0.0.1`, previews e produção não são compartilhados. Uma lista vazia no primeiro acesso ao domínio publicado é esperada.

## Atualização e recuperação

Para atualizar, compile a revisão desejada e publique o conjunto completo dos arquivos gerados. Evite misturar o HTML de uma versão com assets de outra. Para recuperar uma versão anterior, use a revisão anterior conhecida do Git, execute a instalação pelo lockfile e gere novamente o build, ou restaure o artefato correspondente se sua hospedagem o conservar.

Nenhuma migração de banco é necessária. Mudanças nos IDs do catálogo ou na chave `playpipoca-list` podem afetar favoritos já salvos no navegador.
