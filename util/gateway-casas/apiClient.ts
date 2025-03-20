import { getApiToken } from "./tokenManager";

export const apiClient = async (url: string, options: RequestInit = {}): Promise<Response> => {
  const apiToken = await getApiToken();

  const headers = {
    ...options.headers,
    Authorization: `Bearer ${apiToken}`,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });
  // console.log("Client Response, ", response);

  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`);
  }

  return response;
};