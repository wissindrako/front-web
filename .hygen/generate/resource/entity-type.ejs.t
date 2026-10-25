---
to: src/services/api/types/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.ts
---
import type { Schemas } from "./schemas";

// From the API's contract: export it there (npm run openapi:export in
// base-nest) and regenerate the types here (npm run generate:api) first
export type <%= h.pascalName(name) %> = Schemas["<%= h.pascalName(name) %>"];
