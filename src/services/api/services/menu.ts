import { useCallback } from "react";
import useFetch from "../use-fetch";
import { API_URL } from "../config";
import wrapperFetchJsonResponse from "../wrapper-fetch-json-response";
import { MenuItem, MenuItemTree, MenuPermission } from "../types/menu-item";
import { RequestConfigType } from "./types/request-config";
import type { Schemas } from "../types/schemas";

// The signed-in user's menu, already filtered by their permissions
export function useGetMyMenuService() {
  const fetch = useFetch();

  return useCallback(
    (requestConfig?: RequestConfigType) =>
      fetch(`${API_URL}/v1/menu`, { method: "GET", ...requestConfig }).then(
        wrapperFetchJsonResponse<MenuItemTree[]>
      ),
    [fetch]
  );
}

// The whole menu (inactive entries too), for editing it
export function useGetMenuTreeService() {
  const fetch = useFetch();

  return useCallback(
    (requestConfig?: RequestConfigType) =>
      fetch(`${API_URL}/v1/menu-items/tree`, {
        method: "GET",
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<MenuItemTree[]>),
    [fetch]
  );
}

export function useGetMenuPermissionsService() {
  const fetch = useFetch();

  return useCallback(
    (requestConfig?: RequestConfigType) =>
      fetch(`${API_URL}/v1/menu-items/permissions`, {
        method: "GET",
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<MenuPermission[]>),
    [fetch]
  );
}

// order is set by the API when left out (last among its siblings)
export type MenuItemRequest = Omit<Schemas["CreateMenuItemDto"], "order"> & {
  order?: number;
};

export function usePostMenuItemService() {
  const fetch = useFetch();

  return useCallback(
    (data: MenuItemRequest, requestConfig?: RequestConfigType) =>
      fetch(`${API_URL}/v1/menu-items`, {
        method: "POST",
        body: JSON.stringify(data),
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<MenuItem>),
    [fetch]
  );
}

export function usePatchMenuItemService() {
  const fetch = useFetch();

  return useCallback(
    (
      data: { id: string; data: Schemas["UpdateMenuItemDto"] },
      requestConfig?: RequestConfigType
    ) =>
      fetch(`${API_URL}/v1/menu-items/${data.id}`, {
        method: "PATCH",
        body: JSON.stringify(data.data),
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<MenuItem>),
    [fetch]
  );
}

export function useDeleteMenuItemService() {
  const fetch = useFetch();

  return useCallback(
    (data: { id: string }, requestConfig?: RequestConfigType) =>
      fetch(`${API_URL}/v1/menu-items/${data.id}`, {
        method: "DELETE",
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<undefined>),
    [fetch]
  );
}

export type MenuItemPosition = Schemas["MenuItemPositionDto"];

export function usePutMenuOrderService() {
  const fetch = useFetch();

  return useCallback(
    (data: { items: MenuItemPosition[] }, requestConfig?: RequestConfigType) =>
      fetch(`${API_URL}/v1/menu-items/order`, {
        method: "PUT",
        body: JSON.stringify(data),
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<MenuItemTree[]>),
    [fetch]
  );
}
