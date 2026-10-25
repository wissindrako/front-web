import type { Schemas } from "./schemas";

// How the API is set up: with the identity center enabled, users, roles,
// permissions and passwords are managed there (at managementUrl). A union,
// so `enabled` narrows the rest; checked against the API's contract below.
export type IdentitySettings =
  | { enabled: false }
  | { enabled: true; issuer: string; managementUrl: string | null };

// Fails to compile if the contract stops matching this union
export type IdentitySettingsMatchesContract =
  IdentitySettings extends Schemas["IdentitySettingsDto"] ? true : never;
const identitySettingsMatchesContract: IdentitySettingsMatchesContract = true;
void identitySettingsMatchesContract;
