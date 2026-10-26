import type { Schemas } from "./schemas";

// The signed-in user's roles and permissions, grouped by module ("users.read"
// is action "read" of module "users"), and whether they are managed by the
// identity center or the API itself. From the API's contract.
export type UserAccess = Schemas["UserAccess"];
