"use client";

import { useCallback } from "react";
import { FetchInputType, FetchInitType } from "./types/fetch-params";
import HTTP_CODES_ENUM from "./types/http-codes";
import type { Tokens } from "./types/tokens";
import useLanguage from "../i18n/use-language";
import { getTokensInfo, setTokensInfo } from "../auth/auth-tokens-info";
import { emitAuthEvent } from "../auth/auth-events";
import type { TokensInfo } from "../auth/auth-context";
import {
  OidcRefreshRejectedError,
  refreshTokens as refreshOidcTokens,
} from "../auth/oidc";

const TOKEN_EXPIRES_SKEW_MS = 60000;
const REFRESH_LOCK_WAIT_MS = 15000;

type RefreshResult = "refreshed" | "unauthorized" | "error";

type StoredTokensChange = "unchanged" | "rotated" | "other-account";

let refreshPromise: Promise<RefreshResult> | null = null;

function isTokenExpiringSoon(tokenExpires: Tokens["tokenExpires"]): boolean {
  return Boolean(
    tokenExpires && tokenExpires - TOKEN_EXPIRES_SKEW_MS <= Date.now()
  );
}

function getTokenAccountId(token: Tokens["token"]): string | null {
  const payload = token?.split(".")[1];

  if (!payload) return null;

  try {
    const claims: unknown = JSON.parse(
      atob(payload.replace(/-/g, "+").replace(/_/g, "/"))
    );

    if (typeof claims !== "object" || claims === null) return null;

    // "sub" in identity center tokens, "id" in the API's own tokens
    const { sub, id } = claims as { sub?: unknown; id?: unknown };
    const accountId = sub ?? id;

    return accountId === null || accountId === undefined
      ? null
      : String(accountId);
  } catch {
    return null;
  }
}

function classifyStoredTokens(before: TokensInfo): StoredTokensChange {
  const after = getTokensInfo();

  if (!after?.refreshToken || after.refreshToken === before?.refreshToken) {
    return "unchanged";
  }

  const beforeAccountId = getTokenAccountId(before?.token);
  const afterAccountId = getTokenAccountId(after.token);

  if (beforeAccountId === null || afterAccountId === null) {
    return "rotated";
  }

  return beforeAccountId === afterAccountId ? "rotated" : "other-account";
}

async function requestNewTokens(): Promise<RefreshResult> {
  const tokens = getTokensInfo();

  if (!tokens?.refreshToken) {
    return "unauthorized";
  }

  try {
    setTokensInfo(await refreshOidcTokens(tokens));

    return "refreshed";
  } catch (error) {
    if (!(error instanceof OidcRefreshRejectedError)) {
      // Network failure or identity center down: keep the session
      return "error";
    }
  }

  const change = classifyStoredTokens(tokens);

  if (change === "rotated") {
    return "refreshed";
  }

  if (change === "other-account") {
    return "error";
  }

  setTokensInfo(null);
  emitAuthEvent({ type: "logout" });

  return "unauthorized";
}

async function refreshTokensExclusive(
  tokensBefore: TokensInfo
): Promise<RefreshResult> {
  const change = classifyStoredTokens(tokensBefore);

  if (change === "rotated") {
    return "refreshed";
  }

  if (change === "other-account") {
    return "error";
  }

  return requestNewTokens();
}

async function refreshTokens(): Promise<RefreshResult> {
  if (refreshPromise) return refreshPromise;

  const tokensBefore = getTokensInfo();

  refreshPromise = (async () => {
    try {
      // The Web Lock serializes refreshes across same-origin tabs so two
      // tabs cannot both consume the single-use refresh token; browsers
      // without navigator.locks still get the per-tab refreshPromise dedupe.
      if (typeof navigator !== "undefined" && navigator.locks) {
        let result: RefreshResult = "error";

        try {
          await navigator.locks.request(
            "auth-token-refresh",
            { signal: AbortSignal.timeout(REFRESH_LOCK_WAIT_MS) },
            async () => {
              result = await refreshTokensExclusive(tokensBefore);
            }
          );
        } catch {
          return classifyStoredTokens(tokensBefore) === "rotated"
            ? "refreshed"
            : "error";
        }

        return result;
      }

      return await refreshTokensExclusive(tokensBefore);
    } catch {
      return "error";
    } finally {
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

function useFetch() {
  const language = useLanguage();

  return useCallback(
    async (input: FetchInputType, init?: FetchInitType) => {
      const doFetch = () => {
        const tokens = getTokensInfo();

        let headers: HeadersInit = {
          "x-custom-lang": language,
        };

        if (!(init?.body instanceof FormData)) {
          headers = {
            ...headers,
            "Content-Type": "application/json",
          };
        }

        if (tokens?.token) {
          headers = {
            ...headers,
            Authorization: `Bearer ${tokens.token}`,
          };
        }

        return fetch(input, {
          ...init,
          headers: {
            ...headers,
            ...init?.headers,
          },
        });
      };

      if (isTokenExpiringSoon(getTokensInfo()?.tokenExpires)) {
        await refreshTokens();
      }

      const response = await doFetch();

      const isRetryable =
        response.status === HTTP_CODES_ENUM.UNAUTHORIZED &&
        Boolean(getTokensInfo()?.refreshToken);

      if (isRetryable && (await refreshTokens()) === "refreshed") {
        return doFetch();
      }

      return response;
    },
    [language]
  );
}

export default useFetch;
