import { useCallback } from "react";
import useFetch from "../use-fetch";
import { API_URL } from "../config";
import { User } from "../types/user";
import { Tokens } from "../types/tokens";
import wrapperFetchJsonResponse from "../wrapper-fetch-json-response";
import { RequestConfigType } from "./types/request-config";
import type { Schemas } from "../types/schemas";

export type AuthLoginRequest = Schemas["AuthEmailLoginDto"];

export type AuthLoginResponse = Schemas["LoginResponseDto"];

export function useAuthLoginService() {
  const fetchBase = useFetch();

  return useCallback(
    (data: AuthLoginRequest) => {
      return fetchBase(`${API_URL}/v1/auth/email/login`, {
        method: "POST",
        body: JSON.stringify(data),
      }).then(wrapperFetchJsonResponse<AuthLoginResponse>);
    },
    [fetchBase]
  );
}

export type AuthGoogleLoginRequest = Schemas["AuthGoogleLoginDto"];

export type AuthGoogleLoginResponse = Schemas["LoginResponseDto"];

export function useAuthGoogleLoginService() {
  const fetchBase = useFetch();

  return useCallback(
    (data: AuthGoogleLoginRequest) => {
      return fetchBase(`${API_URL}/v1/auth/google/login`, {
        method: "POST",
        body: JSON.stringify(data),
      }).then(wrapperFetchJsonResponse<AuthGoogleLoginResponse>);
    },
    [fetchBase]
  );
}

export type AuthFacebookLoginRequest = {
  accessToken: string;
};

export type AuthFacebookLoginResponse = Tokens & {
  user: User;
};

export function useAuthFacebookLoginService() {
  const fetchBase = useFetch();

  return useCallback(
    (data: AuthFacebookLoginRequest, requestConfig?: RequestConfigType) => {
      return fetchBase(`${API_URL}/v1/auth/facebook/login`, {
        method: "POST",
        body: JSON.stringify(data),
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<AuthFacebookLoginResponse>);
    },
    [fetchBase]
  );
}

export type AuthSignUpRequest = Schemas["AuthRegisterLoginDto"];

export type AuthSignUpResponse = void;

export function useAuthSignUpService() {
  const fetchBase = useFetch();

  return useCallback(
    (data: AuthSignUpRequest, requestConfig?: RequestConfigType) => {
      return fetchBase(`${API_URL}/v1/auth/email/register`, {
        method: "POST",
        body: JSON.stringify(data),
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<AuthSignUpResponse>);
    },
    [fetchBase]
  );
}

export type AuthConfirmEmailRequest = Schemas["AuthConfirmEmailDto"];

export type AuthConfirmEmailResponse = void;

export function useAuthConfirmEmailService() {
  const fetchBase = useFetch();

  return useCallback(
    (data: AuthConfirmEmailRequest, requestConfig?: RequestConfigType) => {
      return fetchBase(`${API_URL}/v1/auth/email/confirm`, {
        method: "POST",
        body: JSON.stringify(data),
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<AuthConfirmEmailResponse>);
    },
    [fetchBase]
  );
}

export type AuthConfirmNewEmailRequest = Schemas["AuthConfirmEmailDto"];

export type AuthConfirmNewEmailResponse = void;

export function useAuthConfirmNewEmailService() {
  const fetchBase = useFetch();

  return useCallback(
    (data: AuthConfirmNewEmailRequest, requestConfig?: RequestConfigType) => {
      return fetchBase(`${API_URL}/v1/auth/email/confirm/new`, {
        method: "POST",
        body: JSON.stringify(data),
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<AuthConfirmNewEmailResponse>);
    },
    [fetchBase]
  );
}

export type AuthForgotPasswordRequest = Schemas["AuthForgotPasswordDto"];

export type AuthForgotPasswordResponse = void;

export function useAuthForgotPasswordService() {
  const fetchBase = useFetch();

  return useCallback(
    (data: AuthForgotPasswordRequest, requestConfig?: RequestConfigType) => {
      return fetchBase(`${API_URL}/v1/auth/forgot/password`, {
        method: "POST",
        body: JSON.stringify(data),
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<AuthForgotPasswordResponse>);
    },
    [fetchBase]
  );
}

export type AuthResetPasswordRequest = Schemas["AuthResetPasswordDto"];

export type AuthResetPasswordResponse = void;

export function useAuthResetPasswordService() {
  const fetchBase = useFetch();

  return useCallback(
    (data: AuthResetPasswordRequest, requestConfig?: RequestConfigType) => {
      return fetchBase(`${API_URL}/v1/auth/reset/password`, {
        method: "POST",
        body: JSON.stringify(data),
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<AuthResetPasswordResponse>);
    },
    [fetchBase]
  );
}

export type AuthPatchMeRequest = Schemas["AuthUpdateDto"];

export type AuthPatchMeResponse = User;

export function useAuthPatchMeService() {
  const fetch = useFetch();

  return useCallback(
    (data: AuthPatchMeRequest, requestConfig?: RequestConfigType) => {
      return fetch(`${API_URL}/v1/auth/me`, {
        method: "PATCH",
        body: JSON.stringify(data),
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<AuthPatchMeResponse>);
    },
    [fetch]
  );
}

export type AuthGetMeResponse = User;

export function useAuthGetMeService() {
  const fetch = useFetch();

  return useCallback(
    (requestConfig?: RequestConfigType) => {
      return fetch(`${API_URL}/v1/auth/me`, {
        method: "GET",
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<AuthGetMeResponse>);
    },
    [fetch]
  );
}
