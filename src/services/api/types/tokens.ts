export type Tokens = {
  token: string | null | undefined;
  refreshToken: string | null | undefined;
  tokenExpires: number | null | undefined;
  // OIDC id token, needed to end the identity center session on logout
  idToken?: string | null;
};
