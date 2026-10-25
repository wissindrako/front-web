import type { components } from "../generated/openapi";

// The API's schemas, from its OpenAPI contract (npm run generate:api):
// Schemas["User"], Schemas["CreatePublicacionDto"]...
export type Schemas = components["schemas"];
