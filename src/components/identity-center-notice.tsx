"use client";

import ExternalLink from "lucide-react/dist/esm/icons/external-link";
import ShieldCheck from "lucide-react/dist/esm/icons/shield-check";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/services/i18n/client";

// Says that something is managed in the identity center, with a link to
// its admin console when the API gives one
export default function IdentityCenterNotice({
  message,
  managementUrl,
}: {
  message: string;
  managementUrl: string | null;
}) {
  const { t } = useTranslation("common");

  return (
    <div
      className="flex flex-col gap-3 rounded-md border bg-card p-4 text-sm"
      data-testid="identity-center-notice"
    >
      <div className="flex items-start gap-2">
        <ShieldCheck className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
        <div className="flex flex-col gap-1">
          <p className="font-medium">{t("common:identityCenter.title")}</p>
          <p className="text-muted-foreground">{message}</p>
        </div>
      </div>
      {managementUrl && (
        <Button asChild variant="outline" size="sm" className="self-start">
          <a href={managementUrl} target="_blank" rel="noreferrer">
            {t("common:identityCenter.open")}
            <ExternalLink />
          </a>
        </Button>
      )}
    </div>
  );
}
