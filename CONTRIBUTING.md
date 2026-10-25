# Como contribuir

Obrigado pelo interesse em melhorar o PlayPipoca. Este guia organiza alterações no código, no catálogo e na documentação.

## Fluxo de trabalho

1. Descreva o problema ou a melhoria em uma issue, quando precisar alinhar escopo.
2. Crie uma branch a partir de `main`, por exemplo `docs/guia-instalacao` ou `fix/filtro-catalogo`.
3. Instale as dependências com `npm ci` e faça a alteração.
4. Execute `npm run build` e confira os fluxos afetados conforme [Desenvolvimento](docs/DESENVOLVIMENTO.md).
5. Atualize a documentação quando mudar comportamento, comandos ou configuração.
6. Abra um pull request para `main`, explicando problema, resultado e validação.

Sem permissão de escrita, trabalhe em um fork e abra o pull request a partir dele.

## Critérios para alterações

- Preserve a tipagem estrita e use o modelo `Film` para o catálogo.
- Use IDs únicos e estáveis; eles vinculam os favoritos aos títulos.
- Mantenha a interface e os textos do produto em português.
- Preserve operação por teclado, rótulos acessíveis e foco visível.
- Inclua o lockfile quando alterar dependências.
- Não versione `node_modules/`, `dist/`, credenciais ou arquivos locais privados.
- Utilize imagens e materiais de terceiros de acordo com os direitos aplicáveis.
- Preserve `.openai/hosting.json` ao trabalhar no Site existente.

O projeto não possui um comando de lint ou uma suíte de testes automatizados. Não declare validações que não foram executadas.

## Informações úteis no pull request

- Problema resolvido e comportamento resultante.
- Arquivos ou áreas afetadas e decisões relevantes.
- Comandos executados e resultado.
- Fluxos conferidos no navegador; imagens comparativas quando a mudança for visual.
- Limitações conhecidas ou verificações ainda pendentes.

## Relatar um problema

Use as [issues do repositório](https://github.com/PauloHenrique993940/playpipoca/issues). Informe passos para reproduzir, resultado esperado, resultado observado, navegador e tamanho aproximado de tela. Para problemas na lista, indique se o endereço ou a porta mudou e se o armazenamento local está disponível.

Não inclua senhas, tokens ou dados pessoais em issues, capturas ou logs. O repositório ainda não define uma licença; consulte a seção correspondente do [README](README.md) antes de reutilizar ou distribuir o código.
