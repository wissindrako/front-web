import { useCallback } from "react";
import useFetch from "../use-fetch";
import { API_URL } from "../config";
import wrapperFetchJsonResponse from "../wrapper-fetch-json-response";
import { InfinityPaginationType } from "../types/infinity-pagination";
import { RequestConfigType } from "./types/request-config";
import { Publicacion as Entity } from "../types/publicacion";

export type GetPublicacionesListRequest = {
  page: number;
  limit: number;
};

export type GetPublicacionesListResponse = InfinityPaginationType<Entity>;

export function useGetPublicacionesListService() {
  const fetch = useFetch();

  return useCallback(
    (data: GetPublicacionesListRequest, requestConfig?: RequestConfigType) => {
      const requestUrl = new URL(`${API_URL}/v1/publicaciones`);
      requestUrl.searchParams.append("page", data.page.toString());
      requestUrl.searchParams.append("limit", data.limit.toString());

      return fetch(requestUrl, {
        method: "GET",
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<GetPublicacionesListResponse>);
    },
    [fetch]
  );
}

export type GetPublicacionRequest = {
  id: Entity["id"];
};

export type GetPublicacionResponse = Entity;

export function useGetPublicacionService() {
  const fetch = useFetch();

  return useCallback(
    (data: GetPublicacionRequest, requestConfig?: RequestConfigType) => {
      return fetch(`${API_URL}/v1/publicaciones/${data.id}`, {
        method: "GET",
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<GetPublicacionResponse>);
    },
    [fetch]
  );
}

export type CreatePublicacionRequest = Omit<
  Entity,
  "id" | "createdAt" | "updatedAt"
>;

export type CreatePublicacionResponse = Entity;

export function useCreatePublicacionService() {
  const fetch = useFetch();

  return useCallback(
    (data: CreatePublicacionRequest, requestConfig?: RequestConfigType) => {
      return fetch(`${API_URL}/v1/publicaciones`, {
        method: "POST",
        body: JSON.stringify(data),
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<CreatePublicacionResponse>);
    },
    [fetch]
  );
}

export type EditPublicacionRequest = {
  id: Entity["id"];
  data: Partial<Omit<Entity, "id" | "createdAt" | "updatedAt">>;
};

export type EditPublicacionResponse = Entity;

export function useEditPublicacionService() {
  const fetch = useFetch();

  return useCallback(
    (data: EditPublicacionRequest, requestConfig?: RequestConfigType) => {
      return fetch(`${API_URL}/v1/publicaciones/${data.id}`, {
        method: "PATCH",
        body: JSON.stringify(data.data),
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<EditPublicacionResponse>);
    },
    [fetch]
  );
}

export type DeletePublicacionRequest = {
  id: Entity["id"];
};

export type DeletePublicacionResponse = undefined;

export function useDeletePublicacionService() {
  const fetch = useFetch();

  return useCallback(
    (data: DeletePublicacionRequest, requestConfig?: RequestConfigType) => {
      return fetch(`${API_URL}/v1/publicaciones/${data.id}`, {
        method: "DELETE",
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<DeletePublicacionResponse>);
    },
    [fetch]
  );
}
