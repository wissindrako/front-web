"use client";

import { useQuery } from "@tanstack/react-query";
import { useGetMyMenuService } from "@/services/api/services/menu";
import HTTP_CODES_ENUM from "@/services/api/types/http-codes";
import useAuth from "@/services/auth/use-auth";

export const MY_MENU_QUERY_KEY = ["menu", "mine"] as const;

// The navigation menu of the signed-in user (filtered by the API with
// their permissions). Empty while signed out.
export function useMyMenu() {
  const { user } = useAuth();
  const fetchMenu = useGetMyMenuService();

  return useQuery({
    queryKey: [...MY_MENU_QUERY_KEY, user?.id],
    enabled: !!user,
    staleTime: 60_000,
    queryFn: async ({ signal }) => {
      const { status, data } = await fetchMenu({ signal });
      if (status !== HTTP_CODES_ENUM.OK) throw new Error(String(status));
      return data;
    },
  });
}
