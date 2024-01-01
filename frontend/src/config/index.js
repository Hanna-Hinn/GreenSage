const dev = process.env.NODE_ENV !== "production";

export const server = dev ? "http://localhost:3000" : "";

export const BACKEND_URL = dev
  ? "https://greensage.onrender.com/api"
  : "https://greensage.onrender.com/api";
