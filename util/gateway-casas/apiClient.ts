import { getApiToken } from "./tokenManager";

export const apiClient = async (
  url: string,
  options: RequestInit = {}
): Promise<Response> => {
  const apiToken = await getApiToken();

  const headers = {
    ...options.headers,
    Authorization: `Bearer ${apiToken}`,
  };
  const optionsData = {
    ...options,
    headers,
  };
  console.log("Option data... ", optionsData);
  const response = await fetch(url, optionsData);
  // console.log("Client Response, ", response);
  if (!response.ok) {
    console.log(response);
    throw new Error(`API request failed: ${response.statusText}`);
  }

  return response;
};
