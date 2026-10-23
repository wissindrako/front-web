import { useCallback } from "react";
import useFetch from "../use-fetch";
import { API_URL } from "../config";
import wrapperFetchJsonResponse from "../wrapper-fetch-json-response";
import { UserAccess } from "../types/user-access";
import { RequestConfigType } from "./types/request-config";

export function useGetMyAccessService() {
  const fetch = useFetch();

  return useCallback(
    (requestConfig?: RequestConfigType) =>
      fetch(`${API_URL}/v1/permissions/me/access`, {
        method: "GET",
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<UserAccess>),
    [fetch]
  );
}
