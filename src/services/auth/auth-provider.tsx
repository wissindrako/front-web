"use client";

import { User } from "@/services/api/types/user";
import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  AuthActionsContext,
  AuthContext,
  AuthTokensContext,
  TokensInfo,
} from "./auth-context";
import useFetch from "@/services/api/use-fetch";
import { AUTH_ME_URL, AUTH_PERMISSIONS_URL } from "@/services/api/config";
import HTTP_CODES_ENUM from "../api/types/http-codes";
import {
  getTokensInfo,
  setTokensInfo as setTokensInfoToStorage,
} from "./auth-tokens-info";
import { broadcastAuthEvent, emitAuthEvent, onAuthEvent } from "./auth-events";
import queryClient from "@/services/react-query/query-client";
import { signOutUrl } from "./oidc";

function AuthProvider(props: PropsWithChildren) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [permissions, setPermissions] = useState<string[]>([]);
  const fetchBase = useFetch();

  const setTokensInfo = useCallback((tokensInfo: TokensInfo) => {
    setTokensInfoToStorage(tokensInfo);

    if (tokensInfo) {
      emitAuthEvent({ type: "login" });
    } else {
      setUser(null);
      emitAuthEvent({ type: "logout" });
    }
  }, []);

  const logOut = useCallback(async () => {
    const tokens = getTokensInfo();
    const url = await signOutUrl(tokens?.idToken);

    if (!url) {
      setTokensInfo(null);
      return;
    }

    // Also ends the identity center session, or the next sign-in would
    // silently reuse it. This tab is leaving: updating its state now would
    // let a protected page start a new sign-in that cancels this navigation
    setTokensInfoToStorage(null);
    broadcastAuthEvent({ type: "logout" });
    window.location.assign(url);
  }, [setTokensInfo]);

  const loadData = useCallback(async () => {
    const tokens = getTokensInfo();

    try {
      if (tokens?.token) {
        const response = await fetchBase(AUTH_ME_URL, {
          method: "GET",
        });

        if (response.status === HTTP_CODES_ENUM.UNAUTHORIZED) {
          logOut();
          return;
        }

        const data = await response.json();
        const permissionsResponse = await fetchBase(AUTH_PERMISSIONS_URL, {
          method: "GET",
        });
        setPermissions(
          permissionsResponse.ok ? await permissionsResponse.json() : []
        );
        setUser(data);
      }
    } finally {
      setIsLoaded(true);
    }
  }, [fetchBase, logOut]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    return onAuthEvent((event) => {
      if (event.type === "logout") {
        setUser(null);
        setPermissions([]);
        // Cached queries belong to the previous user; keeping them would
        // show that user's data to the next account on this machine.
        queryClient.clear();
      } else {
        loadData();
      }
    });
  }, [loadData]);

  const contextValue = useMemo(
    () => ({
      isLoaded,
      user,
      permissions,
    }),
    [isLoaded, user, permissions]
  );

  const contextActionsValue = useMemo(
    () => ({
      setUser,
      logOut,
    }),
    [logOut]
  );

  const contextTokensValue = useMemo(
    () => ({
      setTokensInfo,
    }),
    [setTokensInfo]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      <AuthActionsContext.Provider value={contextActionsValue}>
        <AuthTokensContext.Provider value={contextTokensValue}>
          {props.children}
        </AuthTokensContext.Provider>
      </AuthActionsContext.Provider>
    </AuthContext.Provider>
  );
}

export default AuthProvider;
