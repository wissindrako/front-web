"use client";
import { useRouter } from "next/navigation";
import useAuth from "./use-auth";
import React, { FunctionComponent, useEffect } from "react";
import useLanguage from "../i18n/use-language";

type PropsType = {
  params?: { [key: string]: string | string[] | undefined };
  searchParams?: { [key: string]: string | string[] | undefined };
};

type OptionsType = {
  // Every listed permission is required (granted in the identity center)
  permissions: string[];
};

function withPageRequiredAuth(
  Component: FunctionComponent<PropsType>,
  options?: OptionsType
) {
  const required = options?.permissions ?? [];

  return function WithPageRequiredAuth(props: PropsType) {
    const { user, permissions, isLoaded } = useAuth();
    const router = useRouter();
    const language = useLanguage();
    const isAllowed =
      !!user && required.every((code) => permissions.includes(code));

    useEffect(() => {
      if (isAllowed || !isLoaded) return;

      const currentLocation = window.location.toString();
      const returnToPath =
        currentLocation.replace(new URL(currentLocation).origin, "") ||
        `/${language}`;
      const params = new URLSearchParams({
        returnTo: returnToPath,
      });

      router.replace(
        user ? `/${language}` : `/${language}/sign-in?${params.toString()}`
      );
    }, [isAllowed, user, isLoaded, router, language]);

    return isAllowed ? <Component {...props} /> : null;
  };
}

export default withPageRequiredAuth;
