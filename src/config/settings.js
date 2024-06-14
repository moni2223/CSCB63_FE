const servers = {
  DEV: "http://127.0.0.1:8000",
  PROD: "---",
};
// export const API_URL = "https://tests.mexus.org";
export const API_URL = import.meta.env.VITE_API_URL || servers.DEV;