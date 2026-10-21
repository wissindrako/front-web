"use client";

import { Tokens } from "@/services/api/types/tokens";
import { User } from "@/services/api/types/user";
import { createContext } from "react";

export type TokensInfo = Tokens | null;

export const AuthContext = createContext<{
  user: User | null;
  // Permission codes in the API (e.g. "users.read"), given by the
  // identity center
  permissions: string[];
  isLoaded: boolean;
}>({
  user: null,
  permissions: [],
  isLoaded: true,
});

export const AuthActionsContext = createContext<{
  setUser: (user: User) => void;
  logOut: () => Promise<void>;
}>({
  setUser: () => {},
  logOut: async () => {},
});

export const AuthTokensContext = createContext<{
  setTokensInfo: (tokensInfo: TokensInfo) => void;
}>({
  setTokensInfo: () => {},
});
