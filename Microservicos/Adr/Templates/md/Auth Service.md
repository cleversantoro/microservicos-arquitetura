# Modelo C4 - Auth Service

## 🔹 Nível 1: Diagrama de Contexto

**Descrição:**
O Auth Service é responsável por autenticação e autorização dos usuários na plataforma de e-commerce.

### 📌 Principais elementos:

- **Usuário** → Interage com a plataforma e requer autenticação.
- **Auth Service** → Gerencia login, tokens e autorização.
- **Serviços Externos** → Integra com Identity Providers (Google, Facebook, etc.).

### 📌 Diagrama de Contexto:

```
+----------------------------+
|       Usuário             |
+----------------------------+
            |
            v
+--------------------------------+
|        Auth Service            |
|--------------------------------|
| - Gerencia tokens JWT          |
| - Autenticação via OAuth/SAML  |
| - Controle de acesso RBAC      |
+--------------------------------+
            |
            v
+-----------------------------+
|  Identity Providers (Google, Facebook) |
+-----------------------------+
```

---

## 🔹 Nível 2: Diagrama de Contêineres

**Descrição:**
Mostra os principais componentes do Auth Service e sua interação com o restante do sistema.

### 📌 Contêineres do Sistema:

- **Frontend Web** (React/Next.js) → UI para login e autenticação.
- **API Gateway** (NestJS ou Spring Cloud Gateway) → Roteia requisições para Auth Service.
- **Auth Service** (Node.js/NestJS ou Spring Boot) → Processa autenticação.
- **Banco de Dados** (PostgreSQL ou MongoDB) → Armazena credenciais seguras.
- **Serviços Externos** (Google OAuth, Facebook Login, etc.).

### 📌 Diagrama de Contêineres:

```
+--------------------------------------+
|        Sistema de E-commerce        |
|--------------------------------------|
|  +--------+   +-----------------+   |
|  | WebApp |   | API Gateway      |   |
|  +--------+   +-----------------+   |
|      |              |               |
|      v              v               v
|  +------------+   +------------+   +------------+
|  | AuthSvc    |   | UserSvc    |   | OrderSvc   |
|  +------------+   +------------+   +------------+
|      |              |               |
|      v              v               v
|  +------------+   +------------+   +------------+
|  | PostgreSQL |   | Redis      |   | Identity   |
|  | / MongoDB  |   |            |   | Providers |
|  +------------+   +------------+   +------------+
+-------------------------------------------------+
```

---

## 🔹 Nível 3: Diagrama de Componentes

**Descrição:**
Mostra a estrutura interna do Auth Service.

### 📌 Componentes do Auth Service:

- **AuthController** → Expõe endpoints de autenticação.
- **AuthService** → Contém a lógica de autenticação e autorização.
- **TokenService** → Gera e valida tokens JWT.
- **UserRepository** → Acessa o banco de dados de usuários.
- **IdentityProviderClient** → Interage com provedores externos.

### 📌 Diagrama de Componentes:

```
+----------------------+
|    Auth Service     |
+----------------------+
      |        |         |
      v        v         v
+------------+ +------------+ +----------------+
| AuthCtrl   | | AuthSrv    | | TokenService   |
+------------+ +------------+ +----------------+
      |               |                 |
      v               v                 v
+------------+   +------------+   +------------+
| UserRepo   |   | IdentityCl |   | JWT Handler|
+------------+   +------------+   +------------+
      |                 |
      v                 v
+------------+   +------------+
| PostgreSQL |   | OAuth/SAML |
+------------+   +------------+
```

---

## 🔹 Nível 4: Código

### 📌 1️⃣ AuthController.js

```javascript
const express = require("express");
const AuthService = require("../services/AuthService");
const router = express.Router();

router.post("/login", async (req, res) => {
    try {
        const token = await AuthService.authenticate(req.body);
        res.status(200).json({ token });
    } catch (err) {
        res.status(401).json({ error: err.message });
    }
});

module.exports = router;
```

### 📌 2️⃣ AuthService.js

```javascript
const UserRepository = require("../repositories/UserRepository");
const TokenService = require("../services/TokenService");
const IdentityProviderClient = require("../clients/IdentityProviderClient");

class AuthService {
    static async authenticate(credentials) {
        const user = await UserRepository.findByEmail(credentials.email);
        if (!user || user.password !== credentials.password) {
            throw new Error("Credenciais inválidas");
        }
        return TokenService.generateToken(user);
    }
}

module.exports = AuthService;
```

### 📌 3️⃣ TokenService.js

```javascript
const jwt = require("jsonwebtoken");

class TokenService {
    static generateToken(user) {
        return jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );
    }
}

module.exports = TokenService;
```

---

## 🎯 Conclusão

Agora temos um modelo completo C4 para o **Auth Service**, incluindo:
✅ **Nível 1 - Contexto** → Interação do usuário com o serviço.
✅ **Nível 2 - Contêineres** → Infraestrutura de serviços.
✅ **Nível 3 - Componentes** → Estrutura interna do Auth Service.
✅ **Nível 4 - Código** → Implementação real.

🚀 Essa arquitetura modular permite escalabilidade e segurança para a autenticação dos usuários!



