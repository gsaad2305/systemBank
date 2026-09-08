<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# System Bank Nest

API REST de um sistema bancário desenvolvida com **NestJS**, **PostgreSQL** e **Prisma ORM**.

O projeto foi desenvolvido com o objetivo de praticar conceitos de desenvolvimento backend, arquitetura modular, autenticação, autorização, persistência de dados e implementação de regras de negócio relacionadas a operações bancárias.

---

## Introdução

O **System Bank Nest** é uma API backend que simula o funcionamento básico de um sistema bancário.

A aplicação permite que usuários criem contas bancárias e realizem operações financeiras, como **depósitos, saques e transferências**.

A autenticação dos usuários é realizada utilizando **JWT (JSON Web Token)**, garantindo que operações protegidas sejam executadas apenas por usuários autenticados e autorizados.

O projeto utiliza o **Prisma ORM** para comunicação com o banco de dados PostgreSQL e para gerenciamento dos relacionamentos entre usuários, contas e transações.

---

## Visão do Projeto

A proposta do projeto é representar, de forma simplificada, a estrutura de um sistema bancário através de uma API REST.

O sistema possui três entidades principais:

- **User** — representa o usuário da aplicação.
- **Account** — representa uma conta bancária pertencente a um usuário.
- **Transaction** — representa uma movimentação financeira realizada em uma conta.

Um usuário pode possuir diferentes tipos de conta e realizar operações financeiras respeitando as regras de negócio definidas pela aplicação.

### Fluxo básico

```text
Usuário
   │
   ├── Autenticação
   │       │
   │       └── JWT
   │
   └── Conta Bancária
           │
           ├── Depósito
           ├── Saque
           └── Transferência
                    │
                    └── Conta de destino
````

O saldo da conta é calculado com base nas transações realizadas, considerando os valores recebidos e enviados pela conta.

---

## Objetivo

O principal objetivo do projeto é desenvolver uma API bancária aplicando conceitos fundamentais de backend com NestJS, incluindo:

* Arquitetura modular
* Separação de responsabilidades
* Autenticação e autorização
* Validação de dados
* Regras de negócio
* Persistência de dados
* Relacionamentos entre entidades
* Tratamento de exceções HTTP
* Organização e manutenção de código

---

## Funcionalidades

### Usuários

* Cadastro de usuários
* Validação de email único
* Hash de senha utilizando bcrypt
* Login de usuário
* Autenticação utilizando JWT

### Contas

* Criação de conta bancária
* Contas do tipo `CHECKING`
* Contas do tipo `SAVINGS`
* Geração automática do número da conta
* Restrição de uma conta de cada tipo por usuário

### Operações bancárias

* Depósito
* Saque
* Transferência entre contas
* Consulta de saldo
* Validação de saldo disponível
* Validação de propriedade das contas
* Investimentos
* Retirada dos investimentos

### Regras de negócio

* Usuários não podem acessar contas pertencentes a outros usuários.
* Não é permitido realizar operações com valores negativos.
* Não é possível realizar um saque superior ao saldo disponível.
* Depósitos possuem limite de valor.
* Transferências possuem limite de valor.
* A conta de origem de uma transferência deve pertencer ao usuário autenticado.
* A conta de destino deve existir.
* Um usuário não pode transferir entre duas contas próprias do mesmo tipo.

---

## Tecnologias

### Backend

* NestJS
* TypeScript
* Node.js

### Banco de dados

* PostgreSQL
* Prisma ORM

### Autenticação e segurança

* Passport
* JWT
* bcrypt

### Validação

* class-validator
* class-transformer

### Gerenciamento de pacotes

* pnpm

### Ambiente

* Docker
* Docker Compose

---

## Como iniciar o projeto

### 1. Instalar as dependências

```bash
pnpm install
```

### 2. Iniciar o banco de dados

O projeto utiliza Docker Compose para executar o PostgreSQL.

```bash
docker compose up -d
```

### 3. Configurar as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto contendo as variáveis necessárias para conexão com o banco de dados e configuração da autenticação.

Exemplo:

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/DATABASE"

JWT_SECRET="your-secret"
```

Os valores devem ser definidos de acordo com a configuração do ambiente.

### 4. Executar as migrations do Prisma

```bash
pnpm prisma migrate dev
```

### 5. Iniciar a aplicação

```bash
pnpm start:dev
```

Após iniciar a aplicação, as requisições podem ser realizadas utilizando ferramentas como Postman, Bruno ou qualquer outro cliente HTTP.

---

## Estrutura do projeto

```text
src/
│
├── account/
│   ├── dto/
│   │   └── create-account.dto.ts
│   ├── account.controller.ts
│   ├── account.module.ts
│   └── account.service.ts
│
├── auth/
│   ├── config/
│   ├── dto/
│   ├── guards/
│   ├── types/
│   ├── auth.controller.ts
│   ├── auth.module.ts
│   ├── auth.service.ts
│   └── jwt.strategy.ts
│
├── database/
│   └── prisma.service.ts
│
├── generated/
│
├── transaction/
│   ├── balance/
│   │   └── balance.service.ts
│   ├── dto/
│   │   ├── deposit.dto.ts
│   │   ├── sacar.dto.ts
│   │   └── transfer.dto.ts
│   ├── transaction.controller.ts
│   ├── transaction.module.ts
│   └── transaction.service.ts
│
│
├── investiments/
│   ├── dto/
│   ├── investiments.controller.ts
│   ├── investiments.module.ts
│   └── investiments.service.ts
│
│
├── users/
│   ├── dto/
│   ├── users.controller.ts
│   ├── users.module.ts
│   └── users.service.ts
│
├── app.module.ts
└── main.ts
```

---

## Organização

O projeto segue a arquitetura modular do **NestJS**, separando as responsabilidades da aplicação em diferentes módulos.

### Auth

Responsável pela autenticação dos usuários, geração e validação dos tokens JWT e estratégia de autenticação.

### Users

Responsável pelo gerenciamento dos usuários da aplicação.

### Account

Responsável pela criação e gerenciamento das contas bancárias.

### Transaction

Responsável pelas operações financeiras, como:

* Depósitos
* Saques
* Transferências
* Cálculo de saldo

### Database

Responsável pela integração da aplicação com o PostgreSQL através do Prisma ORM.

### Balance

Responsável pelo cálculo do saldo das contas a partir das transações realizadas.

---

## Autenticação

As operações protegidas utilizam autenticação baseada em **JWT**.

Após realizar o login, o usuário recebe um token que deve ser enviado nas requisições protegidas através do header:

```http
Authorization: Bearer <token>
```

O usuário autenticado é utilizado para validar se ele possui acesso à conta que está tentando movimentar.

---

## Modelo das transações

As movimentações financeiras são registradas através da entidade `Transaction`.

```text
                    Transaction
                         │
          ┌──────────────┼──────────────┐
          │              │              │
       DEPOSIT       WITHDRAWAL      TRANSFER
          │              │              │
          ▼              ▼              ▼
      toAccount     fromAccount    fromAccount
                                      │
                                      ▼
                                  toAccount
```

O saldo é calculado utilizando as transações:

```text
Saldo =
Valores recebidos
      -
Valores enviados
```

Dessa forma, o saldo não precisa ser armazenado diretamente na conta.

---

## Objetivo do projeto

Este projeto foi desenvolvido como prática de desenvolvimento backend utilizando NestJS, buscando aplicar conceitos de:

* Arquitetura modular
* APIs REST
* Autenticação e autorização
* JWT
* Prisma ORM
* PostgreSQL
* DTOs
* Validação de dados
* Regras de negócio
* Tratamento de exceções
* Relacionamentos entre entidades
* Organização de código

---
