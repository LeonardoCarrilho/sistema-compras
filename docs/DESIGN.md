# Interface do Fluxo de Compras

A área de trabalho usa verde escuro na navegação, superfícies claras e uma faixa de indicadores. A entrada apresenta as etapas da compra. No celular, a navegação passa para o topo, os indicadores ocupam duas colunas e as solicitações mostram o status abaixo do título.

`web/style.css` aplica o mesmo sistema ao painel, nova solicitação, fornecedores, detalhes, cotações, decisão e histórico. Preserve os nomes dos campos e os papéis de solicitante, comprador e aprovador. As ações continuam ligadas à API existente e à sessão HttpOnly.

Formulários têm rótulos visíveis, preenchimento automático no login, foco destacado e botões de pelo menos 44 px. Estados vazios e erros compartilham a mesma apresentação. A navegação por teclado oferece um atalho para o conteúdo.

A issue #7 acompanha esta rodada. Os testes de regras e o build rodam sem banco. `npm run build && npm run test:ui` abre as telas com respostas de API isoladas para verificar a interface; esse teste não valida autenticação, transações nem persistência. O fluxo real de `npm run test:e2e` e `npm run test:integration` exige MySQL e o seed documentado no README.
