import type { Schemas } from "./schemas";

export enum RoleEnum {
  ADMIN = 1,
  USER = 2,
}

// From the API's contract (npm run generate:api)
export type Role = Schemas["Role"];
