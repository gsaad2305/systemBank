<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>


# System Bank Nest

---
### Funcionalidades do sistema
- Registro de Usuário
    - Nome Completo
    - Email
    - Password
    - Data de Nascimento
    - CPF
- Login de usuário
    - Email
    - Password
    - Validção com token JWT
- Operações Bancárias
  - Depositar
  - Sacar
  - Transferir
  - Investir
---
### Tecnologias
##### Framework:
  - Nestjs
##### Banco de Dados:
 - PostgreSQL
---
### Como iniciar o projeto:
```
pnpm install -D
```
Depois de instalada as dependências, inicie o arquivo docker-compose.yml
````
docker compose up -d
````
Após isso incie o projeto:

```
pnpm start:dev
```

  Quando iniciado o projeto teste as requisições via Postman, Bruno ou qualquer outro semelhante.

---
## Estrutura de pastas:
```
src/
├── account/
│   ├── dto/
│   │   ├── create-account.dto.ts
│   │   └── update-account.dto.ts
│   ├── account.controller.ts
│   ├── account.module.ts
│   └── account.service.ts
│
│
├── app/
│   ├── app.controller.spec.ts
│   ├── app.controller.ts
│   ├── app.module.ts
│   └── app.service.ts
│
├── auth/
│   ├── config/
│   ├── dto/
│   ├── entities/
│   ├── guards/
│   ├── types/
│   ├── auth.controller.ts
│   ├── auth.module.ts
│   ├── auth.service.ts
│   └── jwt.strategy.ts
│
├── common/
│
├── database/
│
├── generated/
│
├── transaction/
│   ├── dto/
│   │   ├── create-transaction.dto.ts
│   │   └── update-transaction.dto.ts
│   ├── transaction.controller.ts
│   ├── transaction.module.ts
│   └── transaction.service.ts
│
├── users/
│   ├── dto/
│   ├── entities/
│   ├── users.controller.ts
│   ├── users.module.ts
│   └── users.service.ts
│
└── main.ts
```

### Organização
O projeto segue a arquitertura modular do **Nestjs** seperando as responsabilidades em diferentes módulos
- **Auth:** autenticação utilizando JWT.
- **Users:** gerenciamento dos usários.
- **Account:** gerenciamento das contas bancárias.
- **Transaction:** operações financeiras e transferências.
- **Database:** comunicação com o banco de dados atráves do Prisma.
- **Common:** recursos compartilhados entre módulos.

---
introdução, visao geral do sistema, requisitos funcionais, requisitos nao funcionais, restrições e dependências
