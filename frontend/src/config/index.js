const dev = process.env.NODE_ENV !== "production";

export const server = dev ? "http://localhost:3000" : "";

export const BACKEND_URL = dev
  ? "http://localhost:5000"
  : "https://greensage.onrender.com";
