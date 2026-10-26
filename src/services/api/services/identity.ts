import { useCallback } from "react";
import useFetch from "../use-fetch";
import { API_URL } from "../config";
import wrapperFetchJsonResponse from "../wrapper-fetch-json-response";
import { IdentitySettings } from "../types/identity-settings";
import { RequestConfigType } from "./types/request-config";

export function useGetIdentitySettingsService() {
  const fetch = useFetch();

  return useCallback(
    (requestConfig?: RequestConfigType) =>
      fetch(`${API_URL}/v1/identity`, { method: "GET", ...requestConfig }).then(
        wrapperFetchJsonResponse<IdentitySettings>
      ),
    [fetch]
  );
}
