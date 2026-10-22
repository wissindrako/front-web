// How the API is set up: with the identity center enabled, users, roles,
// permissions and passwords are managed there (at managementUrl)
export type IdentitySettings =
  | { enabled: false }
  | { enabled: true; issuer: string; managementUrl: string | null };
