"use client";

import type { Tokens } from "@/services/api/types/tokens";

// Sign-in through the identity center (nucleo-admin): OpenID Connect,
// Authorization Code + PKCE, as a public client (no secret in the browser).
export const OIDC_ISSUER = process.env.NEXT_PUBLIC_OIDC_ISSUER ?? "";
export const OIDC_CLIENT_ID = process.env.NEXT_PUBLIC_OIDC_CLIENT_ID ?? "";
// The API the access token is for (it becomes the token's audience)
export const OIDC_RESOURCE = process.env.NEXT_PUBLIC_API_URL ?? "";
// Where users edit their profile, email or sessions
export const OIDC_ACCOUNT_URL = process.env.NEXT_PUBLIC_OIDC_ACCOUNT_URL ?? "";

const SCOPE = "openid profile email offline_access";
const PENDING_KEY = "oidc-pending";
const REFRESH_TIMEOUT_MS = 10000;

type Discovery = {
  authorization_endpoint: string;
  token_endpoint: string;
  end_session_endpoint?: string;
};

type Pending = { state: string; verifier: string; returnTo: string };

type TokenResponse = {
  access_token: string;
  refresh_token?: string;
  id_token?: string;
  expires_in?: number;
};

export class OidcRefreshRejectedError extends Error {}

let discovery: Promise<Discovery> | null = null;

function getDiscovery() {
  discovery ??= fetch(`${OIDC_ISSUER}/.well-known/openid-configuration`)
    .then((response) => {
      if (!response.ok) throw new Error("OIDC discovery failed");
      return response.json() as Promise<Discovery>;
    })
    .catch((error) => {
      discovery = null;
      throw error;
    });

  return discovery;
}

function redirectUri() {
  return `${window.location.origin}/auth/callback`;
}

function randomString() {
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  return base64Url(bytes);
}

function base64Url(bytes: Uint8Array) {
  return btoa(String.fromCharCode(...bytes))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

async function challengeOf(verifier: string) {
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(verifier)
  );
  return base64Url(new Uint8Array(digest));
}

function toTokens(response: TokenResponse, previous?: Tokens | null): Tokens {
  return {
    token: response.access_token,
    // Refresh tokens rotate: keep the old one only if no new one came back
    refreshToken: response.refresh_token ?? previous?.refreshToken,
    idToken: response.id_token ?? previous?.idToken,
    tokenExpires: response.expires_in
      ? Date.now() + response.expires_in * 1000
      : null,
  };
}

async function requestTokens(params: Record<string, string>) {
  const { token_endpoint } = await getDiscovery();

  return fetch(token_endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: OIDC_CLIENT_ID,
      resource: OIDC_RESOURCE,
      ...params,
    }),
    signal: AbortSignal.timeout(REFRESH_TIMEOUT_MS),
  });
}

// Sends the browser to the identity center's sign-in page
export async function startSignIn(returnTo: string) {
  const { authorization_endpoint } = await getDiscovery();
  const pending: Pending = {
    state: randomString(),
    verifier: randomString(),
    returnTo,
  };
  sessionStorage.setItem(PENDING_KEY, JSON.stringify(pending));

  const url = new URL(authorization_endpoint);
  url.search = new URLSearchParams({
    response_type: "code",
    client_id: OIDC_CLIENT_ID,
    redirect_uri: redirectUri(),
    scope: SCOPE,
    state: pending.state,
    code_challenge: await challengeOf(pending.verifier),
    code_challenge_method: "S256",
    resource: OIDC_RESOURCE,
  }).toString();

  window.location.assign(url.toString());
}

// Back from the identity center: exchanges the code for tokens
export async function completeSignIn(
  params: URLSearchParams
): Promise<{ tokens: Tokens; returnTo: string }> {
  const raw = sessionStorage.getItem(PENDING_KEY);
  sessionStorage.removeItem(PENDING_KEY);
  const pending = raw ? (JSON.parse(raw) as Pending) : null;

  const error = params.get("error");
  if (error) throw new Error(params.get("error_description") ?? error);

  const code = params.get("code");
  if (!code || !pending || params.get("state") !== pending.state) {
    throw new Error("Invalid sign-in response");
  }

  const response = await requestTokens({
    grant_type: "authorization_code",
    code,
    redirect_uri: redirectUri(),
    code_verifier: pending.verifier,
  });

  if (!response.ok) throw new Error("Could not complete the sign-in");

  return {
    tokens: toTokens((await response.json()) as TokenResponse),
    returnTo: pending.returnTo,
  };
}

// New access token from the refresh token. Throws OidcRefreshRejectedError
// when the identity center rejects it (the session is over)
export async function refreshTokens(previous: Tokens): Promise<Tokens> {
  const response = await requestTokens({
    grant_type: "refresh_token",
    refresh_token: previous.refreshToken ?? "",
  });

  if (response.status === 400 || response.status === 401) {
    throw new OidcRefreshRejectedError();
  }
  if (!response.ok) throw new Error("Could not refresh the session");

  return toTokens((await response.json()) as TokenResponse, previous);
}

// Ends the identity center session too, then comes back to this app
export async function signOutUrl(idToken: string | null | undefined) {
  const { end_session_endpoint } = await getDiscovery().catch(() => ({
    end_session_endpoint: undefined,
  }));

  if (!end_session_endpoint || !idToken) return null;

  const url = new URL(end_session_endpoint);
  url.search = new URLSearchParams({
    id_token_hint: idToken,
    client_id: OIDC_CLIENT_ID,
    post_logout_redirect_uri: window.location.origin,
  }).toString();

  return url.toString();
}
