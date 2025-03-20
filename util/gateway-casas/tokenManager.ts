import { LOGIN_END_POINT } from "./config";

// utils/tokenCache.ts
let apiToken: string | null = null;
let tokenExpiry: number | null = null;

export const getApiToken = async (): Promise<string> => {
  if (apiToken && tokenExpiry && Date.now() < tokenExpiry) {
    return apiToken;
  }
  const newToken = await generateApiToken();
  apiToken = newToken.token;
  
  const expiryDate = new Date(newToken.expiresIn).getTime();
  tokenExpiry = expiryDate;

  return apiToken;
};

const generateApiToken = async (): Promise<{ token: string; expiresIn: string }> => {
  const { url, method } = LOGIN_END_POINT;
  const options = {
    method,
    headers: { accept: 'application/json', 'content-type': 'application/json' },
    body: JSON.stringify({ authenticationFrom: 'Website', password: '2k23un3h0m35', userName: 'staychain' }),
  };

  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error('Failed to generate API token');
  }

  const data = await response.json();
  return {
    token: data.apiToken,
    expiresIn: data.apiTokenExpireOn,
  };
};



// getApiToken();
// console.log("New API Token:", apiToken);
// console.log("New Expiry time: ", new Date(tokenExpiry).toISOString());