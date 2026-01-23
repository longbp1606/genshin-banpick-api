# Copilot Instructions (genshin-banpick-api)

## Project overview

- NestJS API (TypeScript) with TypeORM + MySQL.
- App entry: `main.ts` boots Nest, sets global prefix `/api`, enables CORS, Swagger (optional), helmet, and global validation + exception filter.
- Transactional context enabled via `typeorm-transactional`.

## Path aliases

Use TS path aliases from `tsconfig.json`:

- `@utils`, `@errors`, `@db`, `@modules/*`, `@providers/*`

## Response + error conventions

- Always return standardized responses via `BaseApiResponse.success(...)` or `BaseApiResponse.error(...)` from `@utils`.
- When returning object DTOs from services, prefer `builder-pattern` (e.g., `Builder(TokenResponse)...build()`).
- Throw/return custom errors by extending `ApiError` (`@errors/api-error.ts`).
- Do not throw `ApiError` directly in services. Define module-specific errors under `src/modules/<feature>/errors` and throw those instead.
- Validation errors must use `ApiValidationError` (built from `class-validator` errors) so the global filter can format them.
- The global exception filter is `MyExceptionFilter` in `@utils`. It handles `ApiError` and `HttpException` and returns `BaseApiResponse`.
- Error codes are in `@utils/enums/error-code.ts` (`OK`, `UNKNOWN_ERROR`, `VALIDATION_ERROR`). Add new codes there as needed.

## DTOs + validation

- Define DTOs with `class-validator` and `@nestjs/swagger` decorators.
- Validation is global in `main.ts` using `ValidationPipe` with a custom `exceptionFactory` that wraps errors in `ApiValidationError`.
- Request/response DTO naming: `create-example.request.ts` (`CreateExampleRequest`) and `example.response.ts` (`ExampleResponse`).
- Response DTOs typically implement `fromEntity(...)` and `fromEntities(...)` helpers.
- Do not include audit fields like `createdById`/`updatedById` in request DTOs; populate them in services via `ClsService` using the current account.

## Module structure conventions

- Feature modules live under `src/modules/<feature>` with:
  - `*.module.ts`, `*.service.ts`, `*.controller.ts`
  - `dto/` for request/response DTOs
  - Optional `errors/` for module-specific errors
  - `index.ts` exports public module types
- Providers live under `src/providers/<provider>` with nested `modules/*` for provider sub-features (e.g., OAuth).
- DB layer under `src/db`:
  - `datasource.ts` TypeORM DataSource
  - `db.module.ts` registers TypeORM and transactional datasource
  - `entities/` and `migrations/`
  - `repositories/` for injectable repositories to use in services
  - When adding a new repository, register it in `db.module.ts` (`providers` + `exports`)

## Swagger

- Use `SwaggerBaseApiResponse(...)` from `@utils` for controller responses.
- `BaseApiResponse` defines swagger schema for `data` and `pagination`.

## Authorization + permissions

- Use `@RequirePermission(...)` from `@utils/decorators` on protected endpoints.
- Allowed values are from `PermissionCode` (keys of `PERMISSIONS_MAP` in `@utils/constants`).
- If you add a new permission, update `PERMISSIONS_MAP` accordingly.

## Environment config

- `Env` in `src/utils/env.ts` is the single source for env vars (DB, port, swagger flag). Update it when adding new variables.

## Style conventions

- TypeScript, double quotes, semicolons, tabs for indentation (match existing files).
- Prefer explicit imports from aliases instead of relative deep paths.

## When adding new features

1. Create module under `src/modules/<feature>` with controller/service/module and DTOs.
2. Export module from the feature `index.ts` and add it to `AppModule` imports.
3. Use `BaseApiResponse` for all controller responses.
4. Add/extend errors via `ApiError` + `ErrorCode`.
5. If DB schema changes, add entity under `src/db/entities` and run migrations.
