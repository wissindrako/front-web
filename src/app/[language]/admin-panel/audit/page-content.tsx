"use client";

import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import ChevronDown from "lucide-react/dist/esm/icons/chevron-down";
import ChevronRight from "lucide-react/dist/esm/icons/chevron-right";
import History from "lucide-react/dist/esm/icons/history";
import X from "lucide-react/dist/esm/icons/x";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Fragment, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AuditLogsFilter,
  useGetAuditedTablesService,
  useGetAuditLogsService,
} from "@/services/api/services/audit-logs";
import { AuditActionEnum, AuditLog } from "@/services/api/types/audit-log";
import HTTP_CODES_ENUM from "@/services/api/types/http-codes";
import withPageRequiredAuth from "@/services/auth/with-page-required-auth";
import { useTranslation } from "@/services/i18n/client";
import useLanguage from "@/services/i18n/use-language";

const PAGE_SIZE = 25;
const ALL = "all";
const FILTER_KEYS = [
  "tableName",
  "recordId",
  "userId",
  "action",
  "from",
  "to",
] as const;

const ACTION_VARIANT: Record<
  AuditActionEnum,
  "default" | "secondary" | "destructive" | "outline"
> = {
  [AuditActionEnum.INSERT]: "default",
  [AuditActionEnum.UPDATE]: "secondary",
  [AuditActionEnum.DELETE]: "destructive",
  [AuditActionEnum.SOFT_DELETE]: "destructive",
  [AuditActionEnum.RESTORE]: "outline",
};

// The filters live in the URL, so a filtered view can be shared or reloaded
function useFilter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const filter = useMemo(() => {
    const value: AuditLogsFilter = {};
    for (const key of FILTER_KEYS) {
      const param = searchParams.get(key);
      if (param) Object.assign(value, { [key]: param });
    }
    return value;
  }, [searchParams]);

  const setFilter = (changes: Partial<AuditLogsFilter>) => {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(changes)) {
      if (value) params.set(key, value);
      else params.delete(key);
    }
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname);
  };

  return { filter, setFilter };
}

function formatValue(value: unknown) {
  if (value === null || value === undefined) return "—";
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
}

function userLabel(log: AuditLog) {
  if (!log.user) return null;
  const name = [log.user.firstName, log.user.lastName]
    .filter(Boolean)
    .join(" ");
  return name || log.user.email || `#${log.user.id}`;
}

function Changes({ log }: { log: AuditLog }) {
  const { t } = useTranslation("admin-panel-audit");
  const columns = Array.from(
    new Set([
      ...Object.keys(log.oldValues ?? {}),
      ...Object.keys(log.newValues ?? {}),
    ])
  ).sort();

  if (!columns.length) {
    return (
      <p className="text-sm text-muted-foreground">
        {t("admin-panel-audit:detail.noChanges")}
      </p>
    );
  }

  const showOld = !!log.oldValues;
  const showNew = !!log.newValues;

  return (
    <table className="w-full text-xs" data-testid="audit-changes">
      <thead>
        <tr className="text-left text-muted-foreground">
          <th className="py-1 pe-4 font-medium">
            {t("admin-panel-audit:detail.column")}
          </th>
          {showOld && (
            <th className="py-1 pe-4 font-medium">
              {t("admin-panel-audit:detail.before")}
            </th>
          )}
          {showNew && (
            <th className="py-1 font-medium">
              {t("admin-panel-audit:detail.after")}
            </th>
          )}
        </tr>
      </thead>
      <tbody className="font-mono">
        {columns.map((column) => (
          <tr key={column} className="border-t align-top">
            <td className="py-1 pe-4 font-sans font-medium">{column}</td>
            {showOld && (
              <td className="py-1 pe-4 break-all text-destructive">
                {formatValue(log.oldValues?.[column])}
              </td>
            )}
            {showNew && (
              <td className="py-1 break-all text-success">
                {formatValue(log.newValues?.[column])}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function AuditRow({
  log,
  onShowRecord,
  onShowUser,
}: {
  log: AuditLog;
  onShowRecord: () => void;
  onShowUser: () => void;
}) {
  const { t } = useTranslation("admin-panel-audit");
  const language = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const user = userLabel(log);

  return (
    <Fragment>
      <tr
        className="cursor-pointer border-b hover:bg-muted/50"
        onClick={() => setIsOpen((value) => !value)}
        data-testid="audit-row"
      >
        <td className="w-8 py-2 ps-3">
          {isOpen ? (
            <ChevronDown className="size-4" />
          ) : (
            <ChevronRight className="size-4" />
          )}
        </td>
        <td className="py-2 pe-4 whitespace-nowrap">
          {new Date(log.createdAt).toLocaleString(language)}
        </td>
        <td className="py-2 pe-4">
          <Badge variant={ACTION_VARIANT[log.action]}>
            {t(`admin-panel-audit:actions.${log.action}`)}
          </Badge>
        </td>
        <td className="py-2 pe-4">
          <button
            type="button"
            className="font-mono text-xs underline-offset-2 hover:underline"
            title={t("admin-panel-audit:list.recordHistory")}
            onClick={(event) => {
              event.stopPropagation();
              onShowRecord();
            }}
          >
            {log.tableName}
            {log.recordId ? ` #${log.recordId}` : ""}
          </button>
        </td>
        <td className="py-2 pe-4">
          {user ? (
            <button
              type="button"
              className="underline-offset-2 hover:underline"
              title={t("admin-panel-audit:list.userChanges")}
              onClick={(event) => {
                event.stopPropagation();
                onShowUser();
              }}
            >
              {user}
            </button>
          ) : (
            <span className="text-muted-foreground">
              {log.userId
                ? `#${log.userId}`
                : t("admin-panel-audit:list.system")}
            </span>
          )}
        </td>
        <td className="py-2 pe-3 text-muted-foreground max-md:hidden">
          {log.ip ?? "—"}
        </td>
      </tr>
      {isOpen && (
        <tr className="border-b bg-muted/30">
          <td />
          <td colSpan={5} className="py-3 pe-3">
            <Changes log={log} />
            <p className="mt-2 text-xs text-muted-foreground">
              {t("admin-panel-audit:detail.meta", {
                id: log.id,
                dbUser: log.dbUser,
              })}
            </p>
          </td>
        </tr>
      )}
    </Fragment>
  );
}

function Audit() {
  const { t } = useTranslation("admin-panel-audit");
  const { filter, setFilter } = useFilter();
  const fetchLogs = useGetAuditLogsService();
  const fetchTables = useGetAuditedTablesService();

  const tablesQuery = useQuery({
    queryKey: ["audit-logs", "tables"],
    queryFn: async () => {
      const { status, data } = await fetchTables();
      return status === HTTP_CODES_ENUM.OK ? data : [];
    },
  });

  const logsQuery = useInfiniteQuery({
    queryKey: ["audit-logs", "list", filter],
    initialPageParam: 1,
    queryFn: async ({ pageParam, signal }) => {
      const { status, data } = await fetchLogs(
        { page: pageParam, limit: PAGE_SIZE, filter },
        { signal }
      );
      if (status !== HTTP_CODES_ENUM.OK) throw new Error(String(status));
      return {
        data: data.data,
        nextPage: data.hasNextPage ? pageParam + 1 : undefined,
      };
    },
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  const logs = logsQuery.data?.pages.flatMap((page) => page.data) ?? [];
  const hasFilters = Object.keys(filter).length > 0;

  return (
    <div className="mx-auto w-full max-w-screen-xl px-4">
      <div className="flex flex-col gap-6 pt-6">
        <div className="flex flex-col gap-1">
          <h3 className="flex items-center gap-2 text-3xl font-semibold">
            <History className="size-7" />
            {t("admin-panel-audit:title")}
          </h3>
          <p className="text-sm text-muted-foreground">
            {t("admin-panel-audit:description")}
          </p>
        </div>

        <div
          className="grid grid-cols-2 gap-2 md:grid-cols-6"
          data-testid="audit-filters"
        >
          <Select
            value={filter.tableName ?? ALL}
            onValueChange={(value) =>
              setFilter({
                tableName: value === ALL ? undefined : value,
                recordId: undefined,
              })
            }
          >
            <SelectTrigger
              className="w-full"
              aria-label={t("admin-panel-audit:filters.table")}
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL}>
                {t("admin-panel-audit:filters.allTables")}
              </SelectItem>
              {(tablesQuery.data ?? []).map((table) => (
                <SelectItem key={table} value={table}>
                  {table}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={filter.action ?? ALL}
            onValueChange={(value) =>
              setFilter({
                action: value === ALL ? undefined : (value as AuditActionEnum),
              })
            }
          >
            <SelectTrigger
              className="w-full"
              aria-label={t("admin-panel-audit:filters.action")}
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL}>
                {t("admin-panel-audit:filters.allActions")}
              </SelectItem>
              {Object.values(AuditActionEnum).map((action) => (
                <SelectItem key={action} value={action}>
                  {t(`admin-panel-audit:actions.${action}`)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            placeholder={t("admin-panel-audit:filters.recordId")}
            aria-label={t("admin-panel-audit:filters.recordId")}
            value={filter.recordId ?? ""}
            onChange={(event) => setFilter({ recordId: event.target.value })}
          />
          <Input
            placeholder={t("admin-panel-audit:filters.userId")}
            aria-label={t("admin-panel-audit:filters.userId")}
            inputMode="numeric"
            value={filter.userId ?? ""}
            onChange={(event) =>
              setFilter({ userId: event.target.value.replace(/\D/g, "") })
            }
          />
          <Input
            type="date"
            aria-label={t("admin-panel-audit:filters.from")}
            title={t("admin-panel-audit:filters.from")}
            value={filter.from ?? ""}
            onChange={(event) => setFilter({ from: event.target.value })}
          />
          <Input
            type="date"
            aria-label={t("admin-panel-audit:filters.to")}
            title={t("admin-panel-audit:filters.to")}
            value={filter.to ?? ""}
            onChange={(event) => setFilter({ to: event.target.value })}
          />
        </div>
        {hasFilters && (
          <div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() =>
                setFilter(
                  Object.fromEntries(FILTER_KEYS.map((key) => [key, undefined]))
                )
              }
            >
              <X />
              {t("admin-panel-audit:filters.clear")}
            </Button>
          </div>
        )}

        <div className="mb-6 overflow-x-auto rounded-md border bg-card">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left text-muted-foreground">
                <th className="w-8" />
                <th className="py-2 pe-4 font-medium">
                  {t("admin-panel-audit:list.date")}
                </th>
                <th className="py-2 pe-4 font-medium">
                  {t("admin-panel-audit:list.action")}
                </th>
                <th className="py-2 pe-4 font-medium">
                  {t("admin-panel-audit:list.record")}
                </th>
                <th className="py-2 pe-4 font-medium">
                  {t("admin-panel-audit:list.user")}
                </th>
                <th className="py-2 pe-3 font-medium max-md:hidden">IP</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <AuditRow
                  key={log.id}
                  log={log}
                  onShowRecord={() =>
                    setFilter({
                      tableName: log.tableName,
                      recordId: log.recordId ?? undefined,
                    })
                  }
                  onShowUser={() =>
                    setFilter({ userId: String(log.userId ?? "") })
                  }
                />
              ))}
            </tbody>
          </table>
          {logsQuery.isPending && (
            <p className="p-4 text-sm text-muted-foreground">
              {t("admin-panel-audit:list.loading")}
            </p>
          )}
          {logsQuery.isError && (
            <p className="p-4 text-sm text-destructive">
              {t("admin-panel-audit:list.error")}
            </p>
          )}
          {logsQuery.isSuccess && !logs.length && (
            <p className="p-4 text-sm text-muted-foreground">
              {t("admin-panel-audit:list.empty")}
            </p>
          )}
          {logsQuery.hasNextPage && (
            <div className="border-t p-2 text-center">
              <Button
                variant="ghost"
                size="sm"
                disabled={logsQuery.isFetchingNextPage}
                onClick={() => logsQuery.fetchNextPage()}
              >
                {t("admin-panel-audit:list.more")}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default withPageRequiredAuth(Audit, { permissions: ["audit.read"] });
