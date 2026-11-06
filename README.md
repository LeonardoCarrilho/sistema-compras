# Fluxo de Compras

Aplicação de portfólio para acompanhar solicitações, fornecedores, cotações e decisões de compra. Usa React, Node.js, Express e MySQL. Dados e contas são fictícios.

## Fluxo

1. O solicitante abre uma solicitação com título, descrição e prazo.
2. O comprador cadastra fornecedores, registra cotações e escolhe uma para enviar à aprovação.
3. O aprovador aprova ou rejeita. Rejeições exigem justificativa.
4. O histórico registra as ações. O painel oferece busca e filtro por status.

As permissões são verificadas na API. Todos os usuários autenticados podem consultar solicitações, fornecedores e histórico; cada perfil possui ações próprias. O histórico é gravado junto com as alterações em transações no banco.

## Executar localmente

Requisitos: Node.js 20 ou superior, npm e MySQL 8. O arquivo `docker-compose.yml` oferece um MySQL local com senha de demonstração; se usar MySQL existente, execute `server/schema.sql` no banco criado para o projeto.

```bash
npm install
```

Copie `.env.example` para `.env` e ajuste as credenciais e o segredo JWT. Para usar Docker:

```bash
docker compose up -d
```

Aguarde o banco iniciar e carregue as contas e fornecedores fictícios:

```bash
npm run seed
npm run dev
```

Acesse o endereço informado pelo Vite. Contas: `solicitante@demo.local`, `comprador@demo.local` e `aprovador@demo.local`. Senha: `demo12345`. O seed redefine as senhas dessas contas e é destinado apenas a ambientes de demonstração.

```bash
npm test
npm run build
```

Para executar o teste de integração, use um banco dedicado de testes, carregue o esquema e o seed, inicie a API com `npm start` em outro terminal e execute `npm run test:integration`. O teste cria registros fictícios no banco e exige as contas do seed. Não use um banco com dados reais.

O servidor de desenvolvimento do Vite encaminha `/api` à API na porta 3000. A build de produção é apenas o front-end: para implantá-la, configure um servidor que sirva `dist` e encaminhe `/api` à API, com HTTPS e configurações apropriadas.

## Limitações

Projeto demonstrativo, ainda não validado com usuários reais. Não há gestão de contas, recuperação de senha, anexos, e-mail, edição de fornecedores ou reabertura de solicitações. Há testes unitários das transições e um teste de integração que exercita autenticação, permissões, cotações, aprovação e histórico com MySQL real. O fluxo também foi verificado no navegador. Não use as credenciais de demonstração ou o segredo do exemplo em produção. A API precisa de revisão de segurança, limitação de tentativas de login e controles adicionais antes de uso com dados reais.



## Segurança e implantação HTTPS

A aplicação é demonstrativa. A implantação requer um domínio e uma máquina com Caddy, certificado válido e portas 80 e 443 disponíveis. `deploy/Caddyfile` é um exemplo: configure `SITE_HOST` com o domínio, compile o front-end em `/srv/compras` e execute a API apenas no endereço de loopback, atrás do proxy. O Caddy obtém certificados e redireciona HTTP para HTTPS quando o domínio e o servidor estão configurados corretamente. Em produção defina `NODE_ENV=production`, `TRUST_PROXY=1`, um `JWT_SECRET` aleatório e forte e credenciais de banco por variáveis de ambiente; nunca use o seed ou as senhas demonstrativas. Restrinja o acesso direto à porta da API e ao banco. Confirme HTTPS, redirecionamento e cabeçalhos após implantar. O exemplo não é um deploy efetuado.

Sessões usam cookie HTTP-only, SameSite estrito e Secure em produção. Entradas são validadas na API, com limites de requisição e de login em memória; em instalações com múltiplas instâncias use armazenamento compartilhado para esses limites. Reveja controles, permissões e gestão de usuários antes de uso com dados reais.

## Observabilidade e testes

O servidor inicializado com `npm start` cria spans básicos sem incluir corpo, credenciais ou parâmetros da URL. Para exportá-los, configure `OTEL_EXPORTER_OTLP_TRACES_ENDPOINT` para um coletor OTLP HTTP e `OTEL_SERVICE_NAME`; sem endpoint a exportação fica desabilitada. Configure autenticação do coletor por variáveis de ambiente, sem incluí-la no repositório. A instrumentação é limitada a traces de requisição; não configura serviço externo, métricas ou alertas.

O CI executa auditoria de dependências, lint, testes unitários, compilação, teste de integração com MySQL e fluxo de navegador. Para reproduzir o teste de navegador, instale o Chromium com `npx playwright install chromium`, suba a API e o Vite e execute `npm run test:e2e`. Os testes de integração e navegador criam dados fictícios e devem usar um banco dedicado.
