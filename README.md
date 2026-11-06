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


