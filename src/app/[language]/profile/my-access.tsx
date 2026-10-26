"use client";

import ShieldCheck from "lucide-react/dist/esm/icons/shield-check";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetMyAccessService } from "@/services/api/services/access";
import HTTP_CODES_ENUM from "@/services/api/types/http-codes";
import useAuth from "@/services/auth/use-auth";
import { useTranslation } from "@/services/i18n/client";

// The user's roles and what they may do in each module of this system
export default function MyAccess() {
  const { t } = useTranslation("profile");
  const { user } = useAuth();
  const fetchAccess = useGetMyAccessService();

  const access = useQuery({
    queryKey: ["access", "mine", user?.id],
    enabled: !!user,
    queryFn: async ({ signal }) => {
      const { status, data } = await fetchAccess({ signal });
      if (status !== HTTP_CODES_ENUM.OK) throw new Error(String(status));
      return data;
    },
  });

  // Known modules and actions are translated; new ones show their name
  const moduleLabel = (name: string) =>
    t(`profile:access.modules.${name}`, { defaultValue: name });
  const actionLabel = (action: string) =>
    t(`profile:access.actions.${action}`, { defaultValue: action });

  return (
    <section
      className="flex flex-col gap-4 rounded-lg border bg-card p-5"
      data-testid="my-access"
    >
      <div className="flex items-center gap-2">
        <ShieldCheck className="size-4 text-muted-foreground" />
        <h2 className="font-semibold">{t("profile:access.title")}</h2>
      </div>

      {access.isPending ? (
        <div className="flex flex-col gap-2">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-16 w-full" />
        </div>
      ) : access.isError ? (
        <p className="text-sm text-destructive">
          {t("profile:access.loadError")}
        </p>
      ) : (
        <>
          <div className="flex flex-col gap-2">
            <h3 className="text-sm text-muted-foreground">
              {t("profile:access.roles")}
            </h3>
            {access.data.roles.length ? (
              <div className="flex flex-wrap gap-1" data-testid="my-roles">
                {access.data.roles.map((role) => (
                  <Badge key={role}>{role}</Badge>
                ))}
              </div>
            ) : (
              <p className="text-sm">{t("profile:access.noRoles")}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-sm text-muted-foreground">
              {t("profile:access.modulesTitle")}
            </h3>
            {access.data.modules.length ? (
              <ul className="divide-y rounded-md border">
                {access.data.modules.map((module) => (
                  <li
                    key={module.name}
                    className="flex flex-wrap items-center justify-between gap-2 px-3 py-2"
                    data-testid="my-module"
                    data-module={module.name}
                  >
                    <span className="text-sm font-medium">
                      {moduleLabel(module.name)}
                    </span>
                    <span className="flex flex-wrap gap-1">
                      {module.permissions.map((permission) => (
                        <Badge
                          key={permission.code}
                          variant="secondary"
                          title={`${permission.code} · ${permission.description}`}
                        >
                          {actionLabel(permission.action)}
                        </Badge>
                      ))}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm">{t("profile:access.noModules")}</p>
            )}
          </div>

          <p className="text-xs text-muted-foreground">
            {access.data.managedBy === "identity"
              ? t("profile:access.managedByIdentity")
              : t("profile:access.managedByLocal")}
          </p>
        </>
      )}
    </section>
  );
}
