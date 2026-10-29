# Express + TypeScript + Prisma

A small Express 5 API starter with TypeScript, Prisma 7 and PostgreSQL. It includes a user/post data model, repository interfaces, dependency injection with Inversify and Vitest configuration.

This is a starting point for backend experiments, not a production-ready authentication or CRUD service.

## Stack

| Layer | Tools |
| --- | --- |
| HTTP | Express 5 |
| Language | TypeScript 5, ES modules, strict type checking |
| Persistence | Prisma 7, PostgreSQL, `@prisma/adapter-pg` |
| Dependency injection | Inversify |
| Development | tsx, ESLint, Prettier, Vitest |

## Request flow

```mermaid
flowchart LR
    HTTP[HTTP request] --> Router[User router]
    Router --> Controller[User controller]
    Controller --> Repository[User repository]
    Repository --> Prisma[Prisma client / pg adapter]
    Prisma --> PostgreSQL[(PostgreSQL)]
```

The container binds `DbContext` as a singleton and resolves the user repository and controller. The schema defines users with unique email addresses and related posts. Creating a user can create posts in the same Prisma nested write.

## Local setup

Use the Node.js version in [`.nvmrc`](.nvmrc), npm and a running PostgreSQL database. Create a dedicated development database before applying migrations.

```sh
git clone https://github.com/igor64BR/express-ts-prisma-template.git
cd express-ts-prisma-template
nvm use
npm ci
cp .env.example .env
```

Set these values in `.env` (the current example file only lists `PORT`; add `DATABASE_URL`):

```dotenv
PORT=3000
DATABASE_URL=postgresql://USER:PASSWORD@localhost:5432/express_prisma
```

Generate the client, apply the committed migrations to your development database and start the server:

```sh
npx prisma generate
npx prisma migrate deploy
npm run dev
```

Prisma configuration lives in `prisma.config.ts`. The generated client is written to `src/prisma/generated/prisma` and is imported by the database context.

## Routes

| Method | Path | Current behavior |
| --- | --- | --- |
| GET | `/` | Returns `Hello World!` |
| GET | `/users` | Returns users with their posts |
| GET | `/users/:id` | Looks up one user with posts; see the missing-user limitation below |
| POST | `/users` | Creates a user and nested posts |

Example request to a disposable local database:

```sh
curl -X POST http://localhost:3000/users \
  -H 'Content-Type: application/json' \
  -d '{"name":"Example User","email":"example@example.com","posts":[{"title":"First post","content":"Example content","published":false}]}'
```

Repository methods for updating and deleting records exist, but the router does not expose corresponding HTTP endpoints. The post repository is not exposed through a standalone router.

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Watch TypeScript source with tsx |
| `npm run build` | Compile TypeScript into `dist` |
| `npm start` | Build, then run `dist/server.js` |
| `npm run type-check` | Run TypeScript without emitting files |
| `npm run lint` | Run ESLint |
| `npm run format:check` | Check formatting |
| `npm run test:run` | Run Vitest once |
| `npm test` | Run Vitest in watch mode |
| `npm run converage` | Run coverage; the script name is currently spelled `converage` |

Generate the Prisma client before building or type-checking a fresh checkout. The test suite currently contains a single arithmetic example; it does not validate API or database behavior.

## Project layout

```text
prisma.config.ts
src/
  container.ts           Dependency bindings
  server.ts              Express application and listener
  routers/               HTTP routes
  controllers/           User operations
  interfaces/            Repository contracts and request types
  repositories/          Prisma-backed persistence
  prisma/                Schema, migrations and database context
  dtos/                  DTO types and mappers
  middlewares/           Middleware extension points
  errors/                Database error type
  __tests__/             Example test
```

## Current limitations

- `authMiddleware` calls `next()` without authenticating requests.
- Request bodies and route parameters have no runtime schema validation. TypeScript request types do not validate incoming JSON.
- The missing-user branch sets status 404 but does not send or end the response.
- The server has no application-specific error handler or graceful database shutdown.
- DTO mappers exist, but user routes currently return repository results directly.
- Integration tests, API tests and a production deployment setup are not included.

Review these gaps before using the template as the basis of an exposed service. This README describes the source as it exists; it does not imply that the setup or production path has passed an end-to-end test.
