# Frontend do Projeto BCB – Big Chat Brasil

## Descrição

Este projeto é o frontend do sistema BCB – Big Chat Brasil, um enviador de SMS e outras mensagens para clientes brasileiros. Ele foi desenvolvido utilizando Next.js com TailwindCSS. O sistema permite que os clientes enviem mensagens para seus usuários finais.

## Funcionalidades

- Login de clientes
- Cadastro de clientes
- Envio de SMS e mensagens via WhatsApp
- Interface de usuário responsiva

## Tecnologias Utilizadas

- **Frontend**: Next.js 14
- **Estilização**: TailwindCSS
- **Componentes**: Headless UI e Framer Motion

## Pré-requisitos

- Node.js (v14 ou superior)

## Instalação e Execução

Siga os passos abaixo para configurar e executar o projeto.

### 1. Clonar o repositório

```
git clone https://github.com/guilhermevenci/bigchatbrasil-frontend.git
cd bigchatbrasil-frontend
```

### 2. Configurar variáveis de ambiente

Crie um arquivo .env.local na raiz do projeto com as seguintes variáveis:

```
NEXT_PUBLIC_JWT_SECRET="app_secret"
NEXT_PUBLIC_API_URL="http://localhost:3333"
```

### 3. Instalar dependências

```
npm install
```

### 4. Executar o projeto

```
npm run dev
```

## Estrutura do Projeto

```
bigchatbrasil-frontend/
├── public/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   │   ├── page.tsx
│   │   │   ├── signup/
│   │   │   │   ├── page.tsx
│   │   │   ├── actions.ts
│   │   │   ├── client-actions.ts
│   │   │   ├── layout.tsx
│   │   ├── (workspace)/
│   │   │   ├── dashboard/
│   │   │   │   ├── page.tsx
│   │   │   ├── messages/
│   │   │   │   ├── layout.tsx
│   │   │   │   ├── loading.tsx
│   │   │   │   ├── page.tsx
│   │   │   ├── auth-guard.tsx
│   │   │   ├── layout.tsx
│   ├── components/
│   │   ├── custom/
│   │   ├── forms/
│   │   │   ├── client-form.tsx
│   │   │   ├── login-form.tsx
│   │   │   ├── send-message-form.tsx
│   │   │   ├── signup-form.tsx
│   │   │   ├── inputs/
│   │   ├── ui/
│   ├── context/
│   │   ├── messages-context.tsx
│   │   ├── user-context.tsx
│   ├── utils/
│   │   ├── api.ts
│   │   ├── cn.ts
│   ├── middleware.ts
├── .env.local
├── next.config.js
├── package.json
├── README.md
```

## Boas Práticas

- Autenticação em SSR
- Componentes reutilizáveis e modulares
- Estilização consistente com TailwindCSS
