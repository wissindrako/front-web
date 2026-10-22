"use client";

import { useQuery } from "@tanstack/react-query";
import { useGetIdentitySettingsService } from "@/services/api/services/identity";
import HTTP_CODES_ENUM from "@/services/api/types/http-codes";

export const IDENTITY_SETTINGS_QUERY_KEY = ["identity", "settings"] as const;

// Whether the API's identity center manages roles, privileges and
// passwords. `managed` is undefined until the API answers, so screens can
// wait instead of showing controls that may not apply.
export function useIdentitySettings() {
  const fetchSettings = useGetIdentitySettingsService();

  const query = useQuery({
    queryKey: IDENTITY_SETTINGS_QUERY_KEY,
    staleTime: Infinity,
    queryFn: async ({ signal }) => {
      const { status, data } = await fetchSettings({ signal });
      if (status !== HTTP_CODES_ENUM.OK) throw new Error(String(status));
      return data;
    },
  });

  return {
    managed: query.data?.enabled,
    managementUrl: query.data?.enabled ? query.data.managementUrl : null,
    isLoading: query.isPending,
  };
}
