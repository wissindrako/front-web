import type { Schemas } from "./schemas";

export enum UserProviderEnum {
  EMAIL = "email",
  GOOGLE = "google",
  // Signed in at the identity center
  IDENTITY = "identity",
}

// From the API's contract (npm run generate:api)
export type User = Schemas["User"];
