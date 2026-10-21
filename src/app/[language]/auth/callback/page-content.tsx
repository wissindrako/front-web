"use client";
import { Button } from "@/components/ui/button";
import Link from "@/components/link";
import useAuthTokens from "@/services/auth/use-auth-tokens";
import getSafeReturnTo from "@/services/auth/get-safe-return-to";
import { completeSignIn } from "@/services/auth/oidc";
import useLanguage from "@/services/i18n/use-language";
import { useTranslation } from "@/services/i18n/client";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

// The identity center sends the user back here with a one-time code
function AuthCallback() {
  const { t } = useTranslation("sign-in");
  const { setTokensInfo } = useAuthTokens();
  const router = useRouter();
  const language = useLanguage();
  const [error, setError] = useState<string | null>(null);
  // The code can only be exchanged once (React runs effects twice in dev)
  const handled = useRef(false);

  useEffect(() => {
    if (handled.current) return;
    handled.current = true;

    completeSignIn(new URLSearchParams(window.location.search))
      .then(({ tokens, returnTo }) => {
        setTokensInfo(tokens);
        router.replace(getSafeReturnTo(returnTo, `/${language}`));
      })
      .catch((reason: Error) => setError(reason.message));
  }, [setTokensInfo, router, language]);

  return (
    <div className="mx-auto w-full max-w-md px-4">
      <div className="mt-6 flex flex-col gap-4">
        <h1 className="text-xl font-semibold">{t("sign-in:title")}</h1>
        {error ? (
          <>
            <p className="text-destructive" data-testid="sign-in-error">
              {t("sign-in:identity.failed")} {error}
            </p>
            <div>
              <Button asChild>
                <Link href="/sign-in">{t("sign-in:identity.retry")}</Link>
              </Button>
            </div>
          </>
        ) : (
          <p className="text-muted-foreground">
            {t("sign-in:identity.completing")}
          </p>
        )}
      </div>
    </div>
  );
}

export default AuthCallback;
