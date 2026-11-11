# NestJS + Prisma Auth Template

A production-ready **NestJS** starter template featuring **Prisma ORM**, **Passport.js (Local & JWT)**, and a complete authentication flow with **Register/Login** working out of the box.

Stop rebuilding the same auth boilerplate for every project — clone this and start building your features immediately.

---

## ✨ Features

- **NestJS Framework** — Scalable, modular, and dependency-injection–friendly architecture
- **Prisma ORM** — Type-safe database access, schema migrations, and a ready-to-use `User` model
- **Passport.js Integration**
  - **Local Strategy** — email/password authentication
  - **JWT Strategy** — Bearer token authentication for protected routes
- **Authentication Flow** — Fully working Register and Login endpoints
- **JWT Guards** — Protect any route with a single decorator
- **Password Hashing** — Passwords are securely hashed before storage
- **DTO Validation** — Request validation with `class-validator` and `class-transformer`
- **Environment Config** — `.env`-driven configuration via `@nestjs/config`

---

## 🛠 Tech Stack

| Layer            | Technology                          |
| ---------------- | ----------------------------------- |
| Framework        | [NestJS](https://nestjs.com/)       |
| ORM              | [Prisma](https://www.prisma.io/)    |
| Authentication   | [Passport.js](https://www.passportjs.org/) |
| Token            | `@nestjs/jwt` / `passport-jwt`      |
| Validation       | `class-validator`                   |
| Language         | TypeScript                          |
| Database         | SQLite (dev) *(change as needed)*     |

---

## 📋 Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) **v18+**
- npm, yarn, or pnpm
- A running database instance (PostgreSQL by default)

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/AdityaKuril7/nest-template.git
cd nest-template
cd server 
npm i
npx prisma generate 
npx prisma migrate dev --name init