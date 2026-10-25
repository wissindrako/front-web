# API types

The types of the API's data and requests are not written by hand: they are
generated from the API's OpenAPI contract (base-nest's `openapi.json`), so
if the API changes and this app does not follow, it stops compiling.

```bash
npm run generate:api
```

- It reads the contract from `OPENAPI_SPEC` (file path or URL, in the
  environment or `.env.local`); by default `../base-nest/openapi.json`.
  In base-nest, `npm run openapi:export` writes that file.
- It writes `src/services/api/generated/openapi.ts`, which is committed: the
  build does not need the API.
- `src/services/api/types/*` are aliases of its schemas
  (`Schemas["User"]`), and the services type their requests with the API's
  DTOs (`Schemas["CreateUserDto"]`). Use `Schemas` from
  `src/services/api/types/schemas.ts` for new ones.
- Fields with a default (e.g. `isActive`) stay optional in requests: the API
  fills them in.

## New resource

1. In base-nest: `npm run make:feature -- .hygen/fields/<name>.json`, then
   `npm run openapi:export`.
2. Here: `npm run generate:api`, then `npm run generate:resource` and
   `npm run generate:field` for the form fields. The entity type and the
   requests come from the contract; the compiler points out the fields the
   API requires that the form does not send yet.
