"use client";
import { Button } from "@/components/ui/button";
import withPageRequiredGuest from "@/services/auth/with-page-required-guest";
import getSafeReturnTo from "@/services/auth/get-safe-return-to";
import { startSignIn } from "@/services/auth/oidc";
import useLanguage from "@/services/i18n/use-language";
import { useTranslation } from "@/services/i18n/client";
import { useCallback, useEffect, useRef, useState } from "react";

// Users sign in at the identity center; this page only sends them there
function SignIn() {
  const { t } = useTranslation("sign-in");
  const language = useLanguage();
  const [hasFailed, setHasFailed] = useState(false);
  const started = useRef(false);

  const signIn = useCallback(() => {
    setHasFailed(false);
    const params = new URLSearchParams(window.location.search);
    // Only same-origin paths, or ?returnTo becomes an open redirect
    const returnTo = getSafeReturnTo(params.get("returnTo"), `/${language}`);
    startSignIn(returnTo).catch(() => setHasFailed(true));
  }, [language]);

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    signIn();
  }, [signIn]);

  return (
    <div className="mx-auto w-full max-w-md px-4">
      <div className="mt-6 flex flex-col gap-4">
        <h1 className="text-xl font-semibold">{t("sign-in:title")}</h1>
        <p className="text-muted-foreground" data-testid="sign-in-status">
          {hasFailed
            ? t("sign-in:identity.unavailable")
            : t("sign-in:identity.redirecting")}
        </p>
        <div>
          <Button onClick={signIn} data-testid="sign-in-submit">
            {t("sign-in:identity.button")}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default withPageRequiredGuest(SignIn);
