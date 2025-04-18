# Gestão de Atendimentos - Backend (NestJS) #

## 🚀 Como iniciar o backend

1. Certifique-se de que o Docker está instalado.
2. Na raiz do projeto, execute:

```bash
docker compose up --build
```

> O backend será exposto em: [http://localhost:3000](http://localhost:3000)

---

## 📄 Tecnologias utilizadas

- NestJS
- TypeORM
- PostgreSQL
- JWT (autenticação)
- Docker

---

## 🔑 Usuários padrão

Ao subir o container do backend, dois usuários serão criados automaticamente:

### Administrador

- **Email:** admin@admin.com
- **Senha:** admin123

### Usuário comum

- **Email:** usuario@usuario.com
- **Senha:** usuario123

---

## 🔧 Endereço do banco de dados

- **Host:** db
- **Porta:** 5432
- **Usuário:** postgres
- **Senha:** postgres
- **Banco:** atendimentos

---

**Obs:** O banco é inicializado automaticamente com as tabelas necessárias via `synchronize: true` do TypeORM.

---

Se desejar executar localmente fora do Docker, configure o `.env` com as variáveis adequadas e rode `npm run start:dev`.
