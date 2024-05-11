const servers = {
  DEV: "localhost:5000",
  PROD: "---",
};
// export const API_URL = "https://tests.mexus.org";
export const API_URL = import.meta.env.VITE_API_URL || servers.DEV;