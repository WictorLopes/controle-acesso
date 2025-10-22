# 🔐 Controle de Acesso API

API RESTful desenvolvida em **Node.js (v18+)** com **NestJS**, utilizando **PostgreSQL** como banco de dados e autenticação **JWT (JSON Web Token)**.  

---


## 🧠 Funcionalidades

### 👤 Cadastro de Usuários
- Campos: `id`, `nome`, `email`, `senha`, `perfil` (`admin` | `user`)
- As senhas são **criptografadas com bcrypt**

### 🔐 Autenticação
- Endpoint `/auth/login`
- Retorna um **JWT válido**
- O payload do token contém `sub` (id) e `username`

### 🛡️ Controle de Acesso
- Apenas usuários com `perfil = admin` podem listar todos os usuários
- Middleware/Guard (`JwtAuthGuard`) protege rotas autenticadas

### 🧾 Logs de Acesso
- Cada login é registrado na tabela `logs` com:
  - `data/hora`
  - `usuário`
  - `endereço IP`

---

## 🧩 Instalação Local

### 1️⃣ Clonar o repositório
```bash
git clone https://github.com/seuusuario/controle-acesso.git
cd controle-acesso
```
### 2️⃣ Instalar dependências
```bash
npm install
```
### 3️⃣ Criar o arquivo .env
```bash
Modifique o nome do .envexample para .env e altere de acordo com seu banco
```

### 4️⃣ Rodar o servidor
```bash
npm run start:dev
```
A aplicação rodará em:
```bash
http://localhost:3000
```

### 🧪 Testes (TDD)
Exemplo de testes implementados para autenticação (auth.service.spec.ts):

```bash
npm run test
```
Testes utilizam o Jest com mocks para validar:
```bash
- Login com credenciais válidas/ inválidas

- Criação de JWT

- Verificação de hash de senha
```

📘 Documentação da API
Acesse via Swagger:

```bash
http://localhost:3000/api
```
