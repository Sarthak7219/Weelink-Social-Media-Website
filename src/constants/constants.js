const isDevelopment = import.meta.env.MODE === "development";
export const SERVER_URL = isDevelopment
  ? import.meta.env.VITE_API_SERVER_URL_LOCAL
  : import.meta.env.VITE_API_SERVER_URL_PROD;
