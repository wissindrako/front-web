import { useCallback } from "react";
import useFetch from "../use-fetch";
import { API_URL } from "../config";
import wrapperFetchJsonResponse from "../wrapper-fetch-json-response";
import { AuditActionEnum, AuditLog } from "../types/audit-log";
import { InfinityPaginationType } from "../types/infinity-pagination";
import { RequestConfigType } from "./types/request-config";

export type AuditLogsFilter = {
  tableName?: string;
  recordId?: string;
  userId?: string;
  action?: AuditActionEnum;
  // Dates as YYYY-MM-DD; "to" includes that whole day
  from?: string;
  to?: string;
};

export type AuditLogsRequest = {
  page: number;
  limit: number;
  filter?: AuditLogsFilter;
};

export type AuditLogsResponse = InfinityPaginationType<AuditLog>;

const nextDay = (date: string) => {
  const day = new Date(`${date}T00:00:00`);
  day.setDate(day.getDate() + 1);
  return day.toISOString();
};

export function useGetAuditLogsService() {
  const fetch = useFetch();

  return useCallback(
    (data: AuditLogsRequest, requestConfig?: RequestConfigType) => {
      const requestUrl = new URL(`${API_URL}/v1/audit-logs`);
      requestUrl.searchParams.append("page", data.page.toString());
      requestUrl.searchParams.append("limit", data.limit.toString());
      const { from, to, ...rest } = data.filter ?? {};
      for (const [key, value] of Object.entries(rest)) {
        if (value) requestUrl.searchParams.append(key, value);
      }
      if (from) {
        requestUrl.searchParams.append(
          "from",
          new Date(`${from}T00:00:00`).toISOString()
        );
      }
      if (to) requestUrl.searchParams.append("to", nextDay(to));

      return fetch(requestUrl, {
        method: "GET",
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<AuditLogsResponse>);
    },
    [fetch]
  );
}

export function useGetAuditedTablesService() {
  const fetch = useFetch();

  return useCallback(
    (requestConfig?: RequestConfigType) =>
      fetch(`${API_URL}/v1/audit-logs/tables`, {
        method: "GET",
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<string[]>),
    [fetch]
  );
}
